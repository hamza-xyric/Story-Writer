import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db/index.js';
import { leads } from '../db/schema.js';
import { authenticate } from '../middleware/auth.js';
import { eq, and } from 'drizzle-orm';
import type { ApiResponse, Lead } from '../types/index.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/leads - List leads with optional status filter
router.get('/', async (req, res) => {
  try {
    const { status, limit } = req.query;
    const userId = req.userId!;

    let query = db.select().from(leads).where(eq(leads.userId, userId));

    // Filter by status if provided
    if (status && typeof status === 'string') {
      const validStatuses = ['unexplored', 'questioned', 'captured', 'dismissed'];
      if (validStatuses.includes(status)) {
        query = db
          .select()
          .from(leads)
          .where(and(eq(leads.userId, userId), eq(leads.status, status)));
      }
    }

    let results = await query;

    // Apply limit if provided
    if (limit && !isNaN(parseInt(limit as string))) {
      results = results.slice(0, parseInt(limit as string));
    }

    // Transform to Lead type
    const formattedLeads: Lead[] = results.map((l) => ({
      id: l.leadId,
      name: l.name,
      type: l.type as Lead['type'],
      quote: l.quote || '',
      potentialStory: l.potentialStory || '',
      status: l.status as Lead['status'],
      capturedIn: l.capturedIn,
      notes: l.notes || '',
      createdAt: l.createdAt,
      updatedAt: l.updatedAt,
    }));

    const response: ApiResponse<{ leads: Lead[]; total: number }> = {
      success: true,
      data: {
        leads: formattedLeads,
        total: formattedLeads.length,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leads',
    });
  }
});

// GET /api/leads/:id - Get a single lead
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const [lead] = await db
      .select()
      .from(leads)
      .where(and(eq(leads.leadId, id), eq(leads.userId, userId)));

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    const formattedLead: Lead = {
      id: lead.leadId,
      name: lead.name,
      type: lead.type as Lead['type'],
      quote: lead.quote || '',
      potentialStory: lead.potentialStory || '',
      status: lead.status as Lead['status'],
      capturedIn: lead.capturedIn,
      notes: lead.notes || '',
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    };

    const response: ApiResponse<Lead> = {
      success: true,
      data: formattedLead,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lead',
    });
  }
});

// PUT /api/leads/:id - Update a lead
const updateLeadSchema = z.object({
  status: z.enum(['unexplored', 'questioned', 'captured', 'dismissed']).optional(),
  capturedIn: z.string().optional(),
  notes: z.string().optional(),
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const validation = updateLeadSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body',
        details: validation.error.errors,
      });
    }

    const { status, capturedIn, notes } = validation.data;

    // Check if lead exists
    const [existing] = await db
      .select()
      .from(leads)
      .where(and(eq(leads.leadId, id), eq(leads.userId, userId)));

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    // Build update object
    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };

    if (status !== undefined) updateData.status = status;
    if (capturedIn !== undefined) updateData.capturedIn = capturedIn;
    if (notes !== undefined) updateData.notes = notes;

    // Update lead
    await db
      .update(leads)
      .set(updateData)
      .where(and(eq(leads.leadId, id), eq(leads.userId, userId)));

    // Fetch updated lead
    const [updated] = await db
      .select()
      .from(leads)
      .where(and(eq(leads.leadId, id), eq(leads.userId, userId)));

    const formattedLead: Lead = {
      id: updated.leadId,
      name: updated.name,
      type: updated.type as Lead['type'],
      quote: updated.quote || '',
      potentialStory: updated.potentialStory || '',
      status: updated.status as Lead['status'],
      capturedIn: updated.capturedIn,
      notes: updated.notes || '',
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };

    const response: ApiResponse<Lead> = {
      success: true,
      data: formattedLead,
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update lead',
    });
  }
});

// POST /api/leads - Create a new lead
const createLeadSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['person', 'place', 'event', 'theme', 'expansion']),
  context: z.string().optional(),
  quote: z.string().optional(),
  potentialStory: z.string().optional(),
  sourceTranscript: z.string().optional(),
});

router.post('/', async (req, res) => {
  try {
    const userId = req.userId!;

    const validation = createLeadSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body',
        details: validation.error.errors,
      });
    }

    const { name, type, context, quote, potentialStory, sourceTranscript } = validation.data;

    // Generate lead ID
    const year = new Date().getFullYear();
    const existingLeads = await db.select().from(leads).where(eq(leads.userId, userId));
    const leadNum = existingLeads.length + 1;
    const leadId = `L-${year}-${leadNum.toString().padStart(3, '0')}`;

    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    await db.insert(leads).values({
      id,
      userId,
      leadId,
      name,
      type,
      context: context || null,
      quote: quote || null,
      potentialStory: potentialStory || null,
      sourceTranscript: sourceTranscript || null,
      status: 'unexplored',
      discoveredAt: now,
      createdAt: now,
      updatedAt: now,
    });

    const [created] = await db.select().from(leads).where(eq(leads.id, id));

    const formattedLead: Lead = {
      id: created.leadId,
      name: created.name,
      type: created.type as Lead['type'],
      quote: created.quote || '',
      potentialStory: created.potentialStory || '',
      status: created.status as Lead['status'],
      capturedIn: created.capturedIn,
      notes: created.notes || '',
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };

    const response: ApiResponse<Lead> = {
      success: true,
      data: formattedLead,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lead',
    });
  }
});

export default router;

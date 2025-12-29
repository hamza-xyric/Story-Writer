import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { db, schema } from '../db/index.js';
import { eq, and, desc } from 'drizzle-orm';
import { authenticate } from '../middleware/auth.js';
import { AppError } from '../middleware/error.js';
import { createDraftSchema } from '../types/index.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Generate draft ID in D-YYYY-NNN format
function generateDraftId(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `D-${year}-${num}`;
}

// Count words in content
function countWords(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

// GET /api/drafts - List all drafts for user
router.get('/', async (req, res, next) => {
  try {
    const drafts = await db.query.drafts.findMany({
      where: eq(schema.drafts.userId, req.userId!),
      orderBy: [desc(schema.drafts.capturedAt)],
    });

    res.json({
      success: true,
      data: drafts.map((d) => ({
        id: d.id,
        draftId: d.draftId,
        captureType: d.captureType,
        topic: d.topic,
        status: d.status,
        wordCount: d.wordCount,
        capturedAt: d.capturedAt,
        processedAt: d.processedAt,
        preview: d.content.slice(0, 200) + (d.content.length > 200 ? '...' : ''),
      })),
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/drafts/:id - Get single draft
router.get('/:id', async (req, res, next) => {
  try {
    const draft = await db.query.drafts.findFirst({
      where: and(
        eq(schema.drafts.id, req.params.id),
        eq(schema.drafts.userId, req.userId!)
      ),
    });

    if (!draft) {
      throw new AppError(404, 'Draft not found');
    }

    res.json({
      success: true,
      data: draft,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/drafts - Create new draft
router.post('/', async (req, res, next) => {
  try {
    const { content, captureType, topic } = createDraftSchema.parse(req.body);
    const now = new Date().toISOString();

    const draft = {
      id: uuid(),
      userId: req.userId!,
      draftId: generateDraftId(),
      content,
      captureType,
      topic: topic ?? null,
      status: 'raw' as const,
      wordCount: countWords(content),
      capturedAt: now,
      createdAt: now,
      updatedAt: now,
    };

    await db.insert(schema.drafts).values(draft);

    res.status(201).json({
      success: true,
      data: draft,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/drafts/:id - Delete draft
router.delete('/:id', async (req, res, next) => {
  try {
    const draft = await db.query.drafts.findFirst({
      where: and(
        eq(schema.drafts.id, req.params.id),
        eq(schema.drafts.userId, req.userId!)
      ),
    });

    if (!draft) {
      throw new AppError(404, 'Draft not found');
    }

    await db.delete(schema.drafts).where(eq(schema.drafts.id, req.params.id));

    res.json({
      success: true,
      message: 'Draft deleted',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

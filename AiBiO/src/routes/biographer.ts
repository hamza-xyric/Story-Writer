import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db/index.js';
import { biographerSessions, leads, voiceProfiles, drafts } from '../db/schema.js';
import { authenticate } from '../middleware/auth.js';
import { eq, and, desc } from 'drizzle-orm';
import { handleBiographerConversation, callClaude, biographerTools } from '../services/claude.js';
import { buildBiographerPrompt, buildOpeningMessage } from '../services/biographer-prompt.js';
import type { ApiResponse, Message, BiographerSession, Lead, VoiceProfile } from '../types/index.js';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Helper to transform DB row to BiographerSession type
function transformSession(row: typeof biographerSessions.$inferSelect): BiographerSession {
  return {
    sessionId: row.sessionId,
    userId: row.userId,
    status: row.status as BiographerSession['status'],
    mode: row.mode as BiographerSession['mode'],
    messages: JSON.parse(row.messages) as Message[],
    questionsAsked: row.questionsAsked,
    topic: row.topic || '',
    charactersMentioned: JSON.parse(row.charactersMentioned) as string[],
    locationsMentioned: JSON.parse(row.locationsMentioned) as string[],
    emotionalTone: row.emotionalTone || '',
    timePeriodDiscussed: row.timePeriodDiscussed || '',
    exploringLeads: JSON.parse(row.exploringLeads) as string[],
    lastQuestion: row.lastQuestion || '',
    lastResponseSummary: row.lastResponseSummary || '',
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

// POST /api/biographer/start - Start a new biographer session
const startSessionSchema = z.object({
  mode: z.enum(['guided', 'memory_recovery', 'period', 'open']).default('open'),
  topic: z.string().optional(),
});

router.post('/start', async (req, res) => {
  try {
    const userId = req.userId!;

    const validation = startSessionSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body',
        details: validation.error.errors,
      });
    }

    const { mode, topic } = validation.data;

    // Load voice profile
    const [profileRow] = await db
      .select()
      .from(voiceProfiles)
      .where(eq(voiceProfiles.userId, userId));

    const voiceProfile: VoiceProfile | undefined = profileRow
      ? JSON.parse(profileRow.profileData)
      : undefined;

    // Load unexplored leads for suggestions
    const leadRows = await db
      .select()
      .from(leads)
      .where(and(eq(leads.userId, userId), eq(leads.status, 'unexplored')))
      .limit(3);

    const unexploredLeads: Lead[] = leadRows.map((l) => ({
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

    // Generate session ID
    const year = new Date().getFullYear();
    const existingSessions = await db
      .select()
      .from(biographerSessions)
      .where(eq(biographerSessions.userId, userId));
    const sessionNum = existingSessions.length + 1;
    const sessionId = `S-${year}-${sessionNum.toString().padStart(3, '0')}`;

    // Generate opening message
    const openingMessage = buildOpeningMessage(mode, unexploredLeads, topic);

    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    const initialMessages: Message[] = [
      {
        role: 'assistant',
        content: openingMessage,
        timestamp: now,
      },
    ];

    // Create session in database
    await db.insert(biographerSessions).values({
      id,
      userId,
      sessionId,
      status: 'active',
      mode,
      messages: JSON.stringify(initialMessages),
      questionsAsked: 1,
      topic: topic || null,
      charactersMentioned: '[]',
      locationsMentioned: '[]',
      emotionalTone: null,
      timePeriodDiscussed: null,
      exploringLeads: '[]',
      lastQuestion: openingMessage,
      lastResponseSummary: null,
      createdAt: now,
      updatedAt: now,
    });

    const [created] = await db
      .select()
      .from(biographerSessions)
      .where(eq(biographerSessions.id, id));

    const session = transformSession(created);

    const response: ApiResponse<{
      session: BiographerSession;
      openingMessage: string;
    }> = {
      success: true,
      data: {
        session,
        openingMessage,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error starting biographer session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start biographer session',
    });
  }
});

// POST /api/biographer/:id/message - Send a message in a biographer session
const sendMessageSchema = z.object({
  content: z.string().min(1),
});

router.post('/:id/message', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const validation = sendMessageSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body',
        details: validation.error.errors,
      });
    }

    const { content } = validation.data;

    // Get session
    const [sessionRow] = await db
      .select()
      .from(biographerSessions)
      .where(and(eq(biographerSessions.sessionId, id), eq(biographerSessions.userId, userId)));

    if (!sessionRow) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    if (sessionRow.status !== 'active') {
      return res.status(400).json({
        success: false,
        error: `Session is ${sessionRow.status}, cannot send messages`,
      });
    }

    // Load voice profile
    const [profileRow] = await db
      .select()
      .from(voiceProfiles)
      .where(eq(voiceProfiles.userId, userId));

    const voiceProfile: VoiceProfile | undefined = profileRow
      ? JSON.parse(profileRow.profileData)
      : undefined;

    // Load unexplored leads
    const leadRows = await db
      .select()
      .from(leads)
      .where(and(eq(leads.userId, userId), eq(leads.status, 'unexplored')))
      .limit(3);

    const unexploredLeads: Lead[] = leadRows.map((l) => ({
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

    // Build biographer prompt
    const systemPrompt = buildBiographerPrompt(
      voiceProfile,
      sessionRow.mode as 'guided' | 'memory_recovery' | 'period' | 'open',
      unexploredLeads,
      sessionRow.topic || undefined
    );

    // Parse existing messages and convert to Claude format
    const existingMessages: Message[] = JSON.parse(sessionRow.messages);
    const conversationHistory: MessageParam[] = existingMessages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    // Add user message to conversation
    const now = new Date().toISOString();
    conversationHistory.push({
      role: 'user',
      content,
    });

    // Tool call loop - keep calling Claude until we get a final text response
    let finalResponse = '';
    let allToolCalls: Array<{ name: string; input: Record<string, unknown> }> = [];
    let savedDraftId: string | null = null;
    let maxIterations = 5; // Prevent infinite loops

    while (maxIterations > 0) {
      maxIterations--;

      const claudeResponse = await callClaude(systemPrompt, conversationHistory, biographerTools);

      // If we got tool calls, handle them and continue
      if (claudeResponse.toolCalls.length > 0) {
        allToolCalls = [...allToolCalls, ...claudeResponse.toolCalls];

        // Add assistant message with tool use to history
        const toolUseBlocks = claudeResponse.toolCalls.map((tc) => ({
          type: 'tool_use' as const,
          id: crypto.randomUUID(),
          name: tc.name,
          input: tc.input,
        }));

        conversationHistory.push({
          role: 'assistant',
          content: toolUseBlocks,
        });

        // Process each tool call and add results
        const toolResults: Array<{
          type: 'tool_result';
          tool_use_id: string;
          content: string;
        }> = [];

        for (let i = 0; i < claudeResponse.toolCalls.length; i++) {
          const toolCall = claudeResponse.toolCalls[i];
          const toolUseId = toolUseBlocks[i].id;

          if (toolCall.name === 'read_leads') {
            const input = toolCall.input as { status?: string; limit?: number };
            const status = input.status || 'unexplored';
            const limit = input.limit || 3;

            const leadRows = await db
              .select()
              .from(leads)
              .where(and(eq(leads.userId, userId), eq(leads.status, status)))
              .limit(limit);

            const leadsData = leadRows.map((l) => ({
              id: l.leadId,
              name: l.name,
              type: l.type,
              quote: l.quote || '',
              potentialStory: l.potentialStory || '',
            }));

            toolResults.push({
              type: 'tool_result',
              tool_use_id: toolUseId,
              content: JSON.stringify(leadsData),
            });
          } else if (toolCall.name === 'save_draft') {
            const input = toolCall.input as {
              content: string;
              capture_type: string;
              topic?: string;
              word_count: number;
            };

            // Generate draft ID
            const year = new Date().getFullYear();
            const existingDrafts = await db.select().from(drafts).where(eq(drafts.userId, userId));
            const draftNum = existingDrafts.length + 1;
            const draftId = `D-${year}-${draftNum.toString().padStart(3, '0')}`;

            await db.insert(drafts).values({
              id: crypto.randomUUID(),
              userId,
              draftId,
              content: input.content,
              captureType: input.capture_type,
              topic: input.topic || sessionRow.topic || null,
              status: 'raw',
              wordCount: input.word_count,
              conversationState: JSON.stringify({
                sessionId: sessionRow.sessionId,
                questionsAsked: sessionRow.questionsAsked + 1,
              }),
              capturedAt: now,
              createdAt: now,
              updatedAt: now,
            });

            savedDraftId = draftId;
            toolResults.push({
              type: 'tool_result',
              tool_use_id: toolUseId,
              content: `Draft saved as ${draftId}`,
            });
          } else if (toolCall.name === 'update_lead') {
            const input = toolCall.input as {
              lead_id: string;
              status: string;
              captured_in?: string;
              notes?: string;
            };

            await db
              .update(leads)
              .set({
                status: input.status,
                capturedIn: input.captured_in || null,
                notes: input.notes || null,
                updatedAt: now,
              })
              .where(and(eq(leads.leadId, input.lead_id), eq(leads.userId, userId)));

            toolResults.push({
              type: 'tool_result',
              tool_use_id: toolUseId,
              content: `Lead ${input.lead_id} updated to ${input.status}`,
            });
          }
        }

        // Add tool results to conversation
        conversationHistory.push({
          role: 'user',
          content: toolResults,
        });
      } else {
        // No more tool calls, we have the final response
        finalResponse = claudeResponse.text;
        break;
      }
    }

    // Build final messages list for storage
    const newMessages: Message[] = [
      ...existingMessages,
      {
        role: 'user',
        content,
        timestamp: now,
      },
      {
        role: 'assistant',
        content: finalResponse,
        timestamp: now,
      },
    ];

    // Update session
    await db
      .update(biographerSessions)
      .set({
        messages: JSON.stringify(newMessages),
        questionsAsked: sessionRow.questionsAsked + 1,
        lastQuestion: finalResponse,
        updatedAt: now,
      })
      .where(eq(biographerSessions.id, sessionRow.id));

    // Fetch updated session
    const [updated] = await db
      .select()
      .from(biographerSessions)
      .where(eq(biographerSessions.id, sessionRow.id));

    const session = transformSession(updated);

    const response: ApiResponse<{
      session: BiographerSession;
      response: string;
      savedDraftId: string | null;
      toolCalls: typeof allToolCalls;
    }> = {
      success: true,
      data: {
        session,
        response: finalResponse,
        savedDraftId,
        toolCalls: allToolCalls,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message',
    });
  }
});

// POST /api/biographer/:id/pause - Pause a session
router.post('/:id/pause', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const [sessionRow] = await db
      .select()
      .from(biographerSessions)
      .where(and(eq(biographerSessions.sessionId, id), eq(biographerSessions.userId, userId)));

    if (!sessionRow) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    if (sessionRow.status !== 'active') {
      return res.status(400).json({
        success: false,
        error: `Session is already ${sessionRow.status}`,
      });
    }

    const now = new Date().toISOString();
    await db
      .update(biographerSessions)
      .set({
        status: 'paused',
        updatedAt: now,
      })
      .where(eq(biographerSessions.id, sessionRow.id));

    const [updated] = await db
      .select()
      .from(biographerSessions)
      .where(eq(biographerSessions.id, sessionRow.id));

    const session = transformSession(updated);

    const response: ApiResponse<{ session: BiographerSession; message: string }> = {
      success: true,
      data: {
        session,
        message: `Session paused. We were exploring ${session.topic || 'your memories'}. When you're ready to continue, just resume.`,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error pausing session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to pause session',
    });
  }
});

// POST /api/biographer/:id/resume - Resume a paused session
router.post('/:id/resume', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const [sessionRow] = await db
      .select()
      .from(biographerSessions)
      .where(and(eq(biographerSessions.sessionId, id), eq(biographerSessions.userId, userId)));

    if (!sessionRow) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    if (sessionRow.status !== 'paused') {
      return res.status(400).json({
        success: false,
        error: `Session is ${sessionRow.status}, cannot resume`,
      });
    }

    const now = new Date().toISOString();

    // Add a resume message
    const messages: Message[] = JSON.parse(sessionRow.messages);
    const resumeMessage = `Welcome back. Last time, we were exploring ${sessionRow.topic || 'your memories'}. ${sessionRow.lastQuestion ? `I had asked: "${sessionRow.lastQuestion.slice(0, 100)}..."` : ''}\n\nWant to pick up where we left off, or go somewhere new?`;

    messages.push({
      role: 'assistant',
      content: resumeMessage,
      timestamp: now,
    });

    await db
      .update(biographerSessions)
      .set({
        status: 'active',
        messages: JSON.stringify(messages),
        questionsAsked: sessionRow.questionsAsked + 1,
        lastQuestion: resumeMessage,
        updatedAt: now,
      })
      .where(eq(biographerSessions.id, sessionRow.id));

    const [updated] = await db
      .select()
      .from(biographerSessions)
      .where(eq(biographerSessions.id, sessionRow.id));

    const session = transformSession(updated);

    const response: ApiResponse<{ session: BiographerSession; resumeMessage: string }> = {
      success: true,
      data: {
        session,
        resumeMessage,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error resuming session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to resume session',
    });
  }
});

// POST /api/biographer/:id/complete - Complete a session and save as draft
router.post('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const [sessionRow] = await db
      .select()
      .from(biographerSessions)
      .where(and(eq(biographerSessions.sessionId, id), eq(biographerSessions.userId, userId)));

    if (!sessionRow) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    if (sessionRow.status === 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Session is already completed',
      });
    }

    const messages: Message[] = JSON.parse(sessionRow.messages);
    const now = new Date().toISOString();

    // Format conversation as draft content
    const draftContent = formatConversationAsDraft(messages, sessionRow.topic || 'Biographer Session');

    // Generate draft ID
    const year = new Date().getFullYear();
    const existingDrafts = await db.select().from(drafts).where(eq(drafts.userId, userId));
    const draftNum = existingDrafts.length + 1;
    const draftId = `D-${year}-${draftNum.toString().padStart(3, '0')}`;

    const wordCount = draftContent.split(/\s+/).length;

    // Save as draft
    await db.insert(drafts).values({
      id: crypto.randomUUID(),
      userId,
      draftId,
      content: draftContent,
      captureType: 'conversation',
      topic: sessionRow.topic || null,
      status: 'raw',
      wordCount,
      conversationState: JSON.stringify({
        sessionId: sessionRow.sessionId,
        questionsAsked: sessionRow.questionsAsked,
        mode: sessionRow.mode,
      }),
      capturedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    // Mark session as completed
    await db
      .update(biographerSessions)
      .set({
        status: 'completed',
        updatedAt: now,
      })
      .where(eq(biographerSessions.id, sessionRow.id));

    const [updated] = await db
      .select()
      .from(biographerSessions)
      .where(eq(biographerSessions.id, sessionRow.id));

    const session = transformSession(updated);

    const response: ApiResponse<{
      session: BiographerSession;
      draftId: string;
      message: string;
    }> = {
      success: true,
      data: {
        session,
        draftId,
        message: `Session complete. ${wordCount} words saved as draft ${draftId}. When you're ready, you can process it into a story entry.`,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error completing session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to complete session',
    });
  }
});

// GET /api/biographer/sessions - List user's biographer sessions
router.get('/sessions', async (req, res) => {
  try {
    const userId = req.userId!;
    const { status } = req.query;

    let sessionRows;
    if (status && typeof status === 'string') {
      sessionRows = await db
        .select()
        .from(biographerSessions)
        .where(and(eq(biographerSessions.userId, userId), eq(biographerSessions.status, status)))
        .orderBy(desc(biographerSessions.createdAt));
    } else {
      sessionRows = await db
        .select()
        .from(biographerSessions)
        .where(eq(biographerSessions.userId, userId))
        .orderBy(desc(biographerSessions.createdAt));
    }

    const sessions = sessionRows.map(transformSession);

    const response: ApiResponse<{ sessions: BiographerSession[]; total: number }> = {
      success: true,
      data: {
        sessions,
        total: sessions.length,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sessions',
    });
  }
});

// GET /api/biographer/:id - Get a specific session
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const [sessionRow] = await db
      .select()
      .from(biographerSessions)
      .where(and(eq(biographerSessions.sessionId, id), eq(biographerSessions.userId, userId)));

    if (!sessionRow) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    const session = transformSession(sessionRow);

    const response: ApiResponse<BiographerSession> = {
      success: true,
      data: session,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch session',
    });
  }
});

// Helper function to format conversation as draft
function formatConversationAsDraft(messages: Message[], topic: string): string {
  const conversationLog = messages
    .map((m) => {
      const role = m.role === 'assistant' ? 'AI' : 'Hamza';
      return `**${role}**: ${m.content}`;
    })
    .join('\n\n');

  return `## Conversation Log

${conversationLog}

---

*Biographer session | Topic: ${topic} | ${messages.length} exchanges*`;
}

export default router;

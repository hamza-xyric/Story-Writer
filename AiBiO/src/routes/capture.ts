import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { db, schema } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { authenticate } from '../middleware/auth.js';
import { handleFreeformCapture } from '../services/claude.js';
import type { VoiceProfile } from '../types/index.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

const freeformInputSchema = z.object({
  content: z.string().min(1),
  isStart: z.boolean().optional().default(false),
});

// Generate draft ID in D-YYYY-NNN format
function generateDraftId(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `D-${year}-${num}`;
}

// POST /api/capture/freeform - Freeform capture with Claude
router.post('/freeform', async (req, res, next) => {
  try {
    const { content, isStart } = freeformInputSchema.parse(req.body);

    // Get user's voice profile
    const profileRow = await db.query.voiceProfiles.findFirst({
      where: eq(schema.voiceProfiles.userId, req.userId!),
    });

    const voiceProfile = profileRow
      ? (JSON.parse(profileRow.profileData) as VoiceProfile)
      : undefined;

    // Call Claude for freeform capture
    const response = await handleFreeformCapture(content, voiceProfile, isStart);

    // Check if Claude called save_draft tool
    let savedDraft = null;
    for (const toolCall of response.toolCalls) {
      if (toolCall.name === 'save_draft') {
        const now = new Date().toISOString();
        const draftContent = toolCall.input.content as string;
        const wordCount = toolCall.input.word_count as number;

        const draft = {
          id: uuid(),
          userId: req.userId!,
          draftId: generateDraftId(),
          content: draftContent,
          captureType: (toolCall.input.capture_type as string) || 'freeform',
          topic: (toolCall.input.topic as string) ?? null,
          status: 'raw' as const,
          wordCount,
          capturedAt: now,
          createdAt: now,
          updatedAt: now,
        };

        await db.insert(schema.drafts).values(draft);
        savedDraft = draft;

        // Update voice profile analytics
        if (profileRow) {
          const profile = JSON.parse(profileRow.profileData) as VoiceProfile;
          const totalCaptures = (profile as any).inputAnalytics?.totalFreeformCaptures ?? 0;
          const avgLength = (profile as any).inputAnalytics?.avgFreeformLength ?? 0;
          const newAvg = Math.round((avgLength * totalCaptures + wordCount) / (totalCaptures + 1));

          const updatedProfile = {
            ...profile,
            inputAnalytics: {
              ...((profile as any).inputAnalytics ?? {}),
              totalFreeformCaptures: totalCaptures + 1,
              avgFreeformLength: newAvg,
            },
            totalSessions: profile.totalSessions + 1,
          };

          await db
            .update(schema.voiceProfiles)
            .set({
              profileData: JSON.stringify(updatedProfile),
              updatedAt: now,
            })
            .where(eq(schema.voiceProfiles.userId, req.userId!));
        }
      }
    }

    res.json({
      success: true,
      data: {
        message: response.text,
        draft: savedDraft
          ? {
              id: savedDraft.id,
              draftId: savedDraft.draftId,
              wordCount: savedDraft.wordCount,
              capturedAt: savedDraft.capturedAt,
            }
          : null,
        toolCalls: response.toolCalls,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/capture/start - Start a freeform capture session
router.post('/start', async (req, res) => {
  res.json({
    success: true,
    data: {
      message: "Go ahead. I'm just listening - no questions, no processing.",
      sessionStarted: true,
    },
  });
});

export default router;

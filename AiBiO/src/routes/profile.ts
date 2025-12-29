import { Router } from 'express';
import { db, schema } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { authenticate } from '../middleware/auth.js';
import { AppError } from '../middleware/error.js';
import type { VoiceProfile } from '../types/index.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/profile - Get user's voice profile
router.get('/', async (req, res, next) => {
  try {
    const profile = await db.query.voiceProfiles.findFirst({
      where: eq(schema.voiceProfiles.userId, req.userId!),
    });

    if (!profile) {
      throw new AppError(404, 'Voice profile not found');
    }

    const profileData = JSON.parse(profile.profileData) as VoiceProfile;

    res.json({
      success: true,
      data: {
        id: profile.id,
        version: profile.version,
        profile: profileData,
        updatedAt: profile.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/profile - Update voice profile
router.put('/', async (req, res, next) => {
  try {
    const profile = await db.query.voiceProfiles.findFirst({
      where: eq(schema.voiceProfiles.userId, req.userId!),
    });

    if (!profile) {
      throw new AppError(404, 'Voice profile not found');
    }

    const currentProfile = JSON.parse(profile.profileData) as VoiceProfile;
    const updatedProfile = {
      ...currentProfile,
      ...req.body.profile,
    };

    const now = new Date().toISOString();

    await db
      .update(schema.voiceProfiles)
      .set({
        profileData: JSON.stringify(updatedProfile),
        version: req.body.version ?? profile.version,
        updatedAt: now,
      })
      .where(eq(schema.voiceProfiles.userId, req.userId!));

    res.json({
      success: true,
      data: {
        id: profile.id,
        version: req.body.version ?? profile.version,
        profile: updatedProfile,
        updatedAt: now,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

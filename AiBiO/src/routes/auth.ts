import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { db, schema } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { registerSchema, loginSchema } from '../types/index.js';
import { generateToken, authenticate } from '../middleware/auth.js';
import { AppError } from '../middleware/error.js';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (existingUser) {
      throw new AppError(400, 'Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();
    const userId = uuid();

    // Create user
    await db.insert(schema.users).values({
      id: userId,
      email,
      passwordHash,
      name,
      createdAt: now,
      updatedAt: now,
    });

    // Create initial voice profile
    const defaultProfile = {
      name,
      preferredName: name.split(' ')[0] ?? name,
      writingStyle: {
        tone: '[TO BE LEARNED]',
        lengthPreference: '[TO BE LEARNED]',
        pov: 'first-person',
        tense: 'past for memories, present for reflections',
      },
      voicePatterns: {
        writing: {
          storyStarters: [],
          commonPhrases: [],
          humorStyle: '[TO BE LEARNED]',
        },
        speaking: {
          fillerPatterns: [],
          tangentSignals: [],
          emotionalMarkers: [],
        },
      },
      vocabularyPatterns: {
        highFrequencyWords: [],
        signaturePhrases: [],
        emotionalVocabulary: {},
      },
      sensoryTendencies: {
        visual: 'moderate',
        auditory: 'moderate',
        conceptualEmotional: 'moderate',
      },
      preferences: {
        deepeningStyle: 'one question at a time',
        feedbackStyle: 'specific, not hollow',
        sessionLength: 'adaptive',
      },
      profileVersion: '1.0',
      totalSessions: 0,
      totalEntries: 0,
      totalWords: 0,
    };

    await db.insert(schema.voiceProfiles).values({
      id: uuid(),
      userId,
      profileData: JSON.stringify(defaultProfile),
      version: '1.0',
      createdAt: now,
      updatedAt: now,
    });

    // Generate token
    const token = generateToken({ userId, email });

    res.status(201).json({
      success: true,
      data: {
        token,
        user: { id: userId, email, name },
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (!user) {
      throw new AppError(401, 'Invalid email or password');
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      throw new AppError(401, 'Invalid email or password');
    }

    // Generate token
    const token = generateToken({ userId: user.id, email: user.email });

    res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email, name: user.name },
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, req.userId!),
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

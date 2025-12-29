import { z } from 'zod';

// ============ AUTH ============

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export interface AuthPayload {
  userId: string;
  email: string;
}

// ============ DRAFTS ============

export const captureTypes = ['freeform', 'conversation', 'voice', 'journal'] as const;
export type CaptureType = (typeof captureTypes)[number];

export const draftStatuses = ['raw', 'in_progress', 'processed'] as const;
export type DraftStatus = (typeof draftStatuses)[number];

export const createDraftSchema = z.object({
  content: z.string().min(1),
  captureType: z.enum(captureTypes),
  topic: z.string().optional(),
});

export type CreateDraftInput = z.infer<typeof createDraftSchema>;

// ============ ENTRIES ============

export const timePeriodPrecisions = ['day', 'month', 'year', 'period', 'decade'] as const;
export type TimePeriodPrecision = (typeof timePeriodPrecisions)[number];

export const completenessLevels = ['brief', 'partial', 'detailed'] as const;
export type CompletenessLevel = (typeof completenessLevels)[number];

export const writingModes = ['freeform', 'prompted', 'conversation', 'voice'] as const;
export type WritingMode = (typeof writingModes)[number];

export const createEntrySchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  timePeriod: z.string(),
  timePeriodPrecision: z.enum(timePeriodPrecisions),
  characters: z.array(z.object({
    id: z.string(),
    role: z.enum(['protagonist', 'supporting', 'mentioned']),
  })).default([]),
  locations: z.array(z.object({
    name: z.string(),
    type: z.string(),
  })).default([]),
  themes: z.array(z.string()).default([]),
  emotionTags: z.array(z.string()).default([]),
  domains: z.array(z.string()).default([]),
  completeness: z.enum(completenessLevels).default('brief'),
  writingMode: z.enum(writingModes).default('freeform'),
  origin: z.object({
    type: z.enum(['direct', 'freeform', 'conversation', 'voice']),
    draftId: z.string().optional(),
    captureDate: z.string().optional(),
    processingDate: z.string().optional(),
  }).optional(),
});

export type CreateEntryInput = z.infer<typeof createEntrySchema>;

// ============ VOICE PROFILE ============

export interface VoiceProfile {
  name: string;
  preferredName: string;
  writingStyle: {
    tone: string;
    lengthPreference: string;
    pov: string;
    tense: string;
  };
  voicePatterns: {
    writing: {
      storyStarters: string[];
      commonPhrases: string[];
      humorStyle: string;
    };
    speaking: {
      fillerPatterns: string[];
      tangentSignals: string[];
      emotionalMarkers: string[];
    };
  };
  vocabularyPatterns: {
    highFrequencyWords: string[];
    signaturePhrases: string[];
    emotionalVocabulary: Record<string, string[]>;
  };
  sensoryTendencies: {
    visual: 'high' | 'moderate' | 'low';
    auditory: 'high' | 'moderate' | 'low';
    conceptualEmotional: 'high' | 'moderate' | 'low';
  };
  preferences: {
    deepeningStyle: string;
    feedbackStyle: string;
    sessionLength: string;
  };
  profileVersion: string;
  totalSessions: number;
  totalEntries: number;
  totalWords: number;
}

// ============ BIOGRAPHER SESSION ============

export const sessionModes = ['guided', 'memory_recovery', 'period', 'open'] as const;
export type SessionMode = (typeof sessionModes)[number];

export const sessionStatuses = ['active', 'paused', 'completed'] as const;
export type SessionStatus = (typeof sessionStatuses)[number];

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface BiographerSession {
  sessionId: string;
  userId: string;
  status: SessionStatus;
  mode: SessionMode;
  messages: Message[];
  questionsAsked: number;
  topic: string;
  charactersMentioned: string[];
  locationsMentioned: string[];
  emotionalTone: string;
  timePeriodDiscussed: string;
  exploringLeads: string[];
  lastQuestion: string;
  lastResponseSummary: string;
  createdAt: string;
  updatedAt: string;
}

// ============ LEADS ============

export const leadTypes = ['person', 'place', 'event', 'theme', 'expansion'] as const;
export type LeadType = (typeof leadTypes)[number];

export const leadStatuses = ['unexplored', 'questioned', 'captured', 'dismissed'] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export interface Lead {
  id: string;
  name: string;
  type: LeadType;
  quote: string;
  potentialStory: string;
  status: LeadStatus;
  capturedIn: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// ============ API RESPONSES ============

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============ EXPRESS EXTENSIONS ============

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}

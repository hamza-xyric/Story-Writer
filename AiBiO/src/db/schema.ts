import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// ============ USERS ============

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// ============ VOICE PROFILES ============

export const voiceProfiles = sqliteTable('voice_profiles', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  profileData: text('profile_data').notNull(), // JSON
  version: text('version').notNull().default('1.0'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// ============ DRAFTS ============

export const drafts = sqliteTable('drafts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  draftId: text('draft_id').notNull(), // D-YYYY-NNN format
  content: text('content').notNull(),
  captureType: text('capture_type').notNull(), // freeform, conversation, voice, journal
  topic: text('topic'),
  status: text('status').notNull().default('raw'), // raw, in_progress, processed
  wordCount: integer('word_count').notNull().default(0),
  conversationState: text('conversation_state'), // JSON for biographer sessions
  resultingEntries: text('resulting_entries'), // JSON array of entry IDs
  capturedAt: text('captured_at').notNull(),
  processedAt: text('processed_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// ============ ENTRIES ============

export const entries = sqliteTable('entries', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  entryId: text('entry_id').notNull(), // E-YYYY-NNN format
  title: text('title').notNull(),
  content: text('content').notNull(),
  timePeriod: text('time_period').notNull(),
  timePeriodPrecision: text('time_period_precision').notNull(), // day, month, year, period, decade
  characters: text('characters').notNull().default('[]'), // JSON
  locations: text('locations').notNull().default('[]'), // JSON
  themes: text('themes').notNull().default('[]'), // JSON
  emotionTags: text('emotion_tags').notNull().default('[]'), // JSON
  domains: text('domains').notNull().default('[]'), // JSON (dreams, trading, problems)
  completeness: text('completeness').notNull().default('brief'), // brief, partial, detailed
  writingMode: text('writing_mode').notNull().default('freeform'),
  promptUsed: text('prompt_used'),
  revisitCount: integer('revisit_count').notNull().default(0),
  wordCount: integer('word_count').notNull().default(0),
  chapterId: text('chapter_id'),
  origin: text('origin'), // JSON
  aiNotes: text('ai_notes'), // JSON (questions, connections, flags)
  dateWritten: text('date_written').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// ============ JOURNALS ============

export const journals = sqliteTable('journals', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  journalId: text('journal_id').notNull(), // J-YYYY-NNN format
  journalDate: text('journal_date').notNull(), // YYYY-MM-DD
  content: text('content').notNull(),
  mood: text('mood'),
  energyLevel: integer('energy_level'),
  notableEvents: text('notable_events'), // JSON
  triggeredMemories: text('triggered_memories'), // JSON
  bookWorthy: text('book_worthy'), // false, seed, maybe, yes
  promotedTo: text('promoted_to'), // draft ID if extracted
  domains: text('domains').notNull().default('[]'), // JSON
  wordCount: integer('word_count').notNull().default(0),
  entriesCount: integer('entries_count').notNull().default(1),
  aiNotes: text('ai_notes'), // JSON
  capturedAt: text('captured_at').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// ============ CHARACTERS ============

export const characters = sqliteTable('characters', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  characterId: text('character_id').notNull(), // category/name format
  name: text('name').notNull(),
  aliases: text('aliases').notNull().default('[]'), // JSON
  relationship: text('relationship').notNull(),
  relationshipCategory: text('relationship_category').notNull(), // family, friend, mentor, etc.
  birthYear: integer('birth_year'),
  deathYear: integer('death_year'),
  periodActive: text('period_active'), // JSON
  traits: text('traits').notNull().default('[]'), // JSON
  physicalDescription: text('physical_description'),
  voiceCharacteristics: text('voice_characteristics'),
  definingMannerisms: text('defining_mannerisms'),
  progressions: text('progressions'), // JSON
  relations: text('relations'), // JSON
  aiVisibility: text('ai_visibility').notNull().default('when_detected'),
  aiPriority: text('ai_priority').notNull().default('medium'),
  firstMentionedIn: text('first_mentioned_in'),
  entriesFeatured: text('entries_featured').notNull().default('[]'), // JSON
  mentionCount: integer('mention_count').notNull().default(0),
  content: text('content'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// ============ LOCATIONS ============

export const locations = sqliteTable('locations', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  locationId: text('location_id').notNull(), // type/name format
  name: text('name').notNull(),
  aliases: text('aliases').notNull().default('[]'), // JSON
  type: text('type').notNull(), // home, school, workplace, city, etc.
  address: text('address'),
  city: text('city'),
  country: text('country'),
  coordinates: text('coordinates'),
  periodActive: text('period_active'), // JSON
  progressions: text('progressions'), // JSON
  relations: text('relations'), // JSON
  physicalDescription: text('physical_description'),
  sensoryDetails: text('sensory_details'), // JSON
  aiVisibility: text('ai_visibility').notNull().default('when_detected'),
  aiPriority: text('ai_priority').notNull().default('medium'),
  firstMentionedIn: text('first_mentioned_in'),
  entriesFeatured: text('entries_featured').notNull().default('[]'), // JSON
  mentionCount: integer('mention_count').notNull().default(0),
  content: text('content'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// ============ BOOKS ============

export const books = sqliteTable('books', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  bookId: text('book_id').notNull(), // B-NNN format
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  author: text('author').notNull(),
  status: text('status').notNull().default('planning'), // planning, drafting, revision, complete
  structureType: text('structure_type').notNull().default('hybrid'),
  targetWordCount: integer('target_word_count').notNull().default(80000),
  currentWordCount: integer('current_word_count').notNull().default(0),
  lifePhases: text('life_phases'), // JSON
  thematicThreads: text('thematic_threads'), // JSON
  progress: text('progress'), // JSON
  aiVisibility: text('ai_visibility').notNull().default('always'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// ============ CHAPTERS ============

export const chapters = sqliteTable('chapters', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  chapterId: text('chapter_id').notNull(), // C-BBB-PP-CC format
  bookId: text('book_id').notNull(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  chapterNumber: integer('chapter_number').notNull(),
  sectionId: text('section_id'),
  status: text('status').notNull().default('outline'),
  timePeriod: text('time_period'), // JSON
  targetWordCount: integer('target_word_count').notNull().default(5000),
  currentWordCount: integer('current_word_count').notNull().default(0),
  estimatedReadTime: integer('estimated_read_time'),
  entries: text('entries').notNull().default('[]'), // JSON
  characters: text('characters').notNull().default('[]'), // JSON
  locations: text('locations').notNull().default('[]'), // JSON
  themes: text('themes').notNull().default('[]'), // JSON
  narrativeArc: text('narrative_arc'), // JSON
  sections: text('sections'), // JSON
  aiNotes: text('ai_notes'), // JSON
  aiVisibility: text('ai_visibility').notNull().default('always'),
  aiPriority: text('ai_priority').notNull().default('high'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// ============ BIOGRAPHER SESSIONS ============

export const biographerSessions = sqliteTable('biographer_sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  sessionId: text('session_id').notNull(), // S-YYYY-NNN format
  status: text('status').notNull().default('active'), // active, paused, completed
  mode: text('mode').notNull().default('open'), // guided, memory_recovery, period, open
  messages: text('messages').notNull().default('[]'), // JSON
  questionsAsked: integer('questions_asked').notNull().default(0),
  topic: text('topic'),
  charactersMentioned: text('characters_mentioned').notNull().default('[]'), // JSON
  locationsMentioned: text('locations_mentioned').notNull().default('[]'), // JSON
  emotionalTone: text('emotional_tone'),
  timePeriodDiscussed: text('time_period_discussed'),
  exploringLeads: text('exploring_leads').notNull().default('[]'), // JSON
  lastQuestion: text('last_question'),
  lastResponseSummary: text('last_response_summary'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// ============ LEADS ============

export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  leadId: text('lead_id').notNull(), // L-YYYY-NNN format
  name: text('name').notNull(),
  type: text('type').notNull(), // person, place, event, theme, expansion
  context: text('context'),
  quote: text('quote'),
  potentialStory: text('potential_story'),
  sourceTranscript: text('source_transcript'),
  status: text('status').notNull().default('unexplored'),
  capturedIn: text('captured_in'), // entry ID if captured
  notes: text('notes'),
  rating: integer('rating'), // 1-5
  discoveredAt: text('discovered_at').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// ============ TRANSCRIPTS ============

export const transcripts = sqliteTable('transcripts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  transcriptId: text('transcript_id').notNull(), // T-YYYY-NNN format
  sourceFile: text('source_file'),
  content: text('content').notNull(),
  sourceTool: text('source_tool'), // gemini, whisper, etc.
  duration: text('duration'),
  participants: text('participants'), // JSON
  status: text('status').notNull().default('ingested'),
  analysisRuns: text('analysis_runs'), // JSON
  capturedAt: text('captured_at').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Type exports for Drizzle
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type VoiceProfileRow = typeof voiceProfiles.$inferSelect;
export type Draft = typeof drafts.$inferSelect;
export type NewDraft = typeof drafts.$inferInsert;
export type Entry = typeof entries.$inferSelect;
export type NewEntry = typeof entries.$inferInsert;
export type Journal = typeof journals.$inferSelect;
export type Character = typeof characters.$inferSelect;
export type Location = typeof locations.$inferSelect;
export type Book = typeof books.$inferSelect;
export type Chapter = typeof chapters.$inferSelect;
export type BiographerSessionRow = typeof biographerSessions.$inferSelect;
export type LeadRow = typeof leads.$inferSelect;
export type Transcript = typeof transcripts.$inferSelect;

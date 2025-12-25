// Entry data model

export type TimePrecision = 'decade' | 'year' | 'month' | 'day';
export type Completeness = 'brief' | 'partial' | 'detailed';
export type WritingMode = 'freeform' | 'prompted' | 'conversation' | 'voice';
export type OriginType = 'direct' | 'freeform' | 'conversation' | 'voice';
export type CleanupLevel = 'raw' | 'light' | 'processed';

export interface EntryOrigin {
  type: OriginType;
  draft_id: string | null;
  capture_date: string | null;
  processing_date: string | null;
  fragments_combined: number;
  questions_asked: number;
  cleanup_level: CleanupLevel | null;
}

export interface AINotesSection {
  questions_to_explore: string[];
  connections_found: string[];
  consistency_flags: string[];
}

export interface Entry {
  // Frontmatter
  entry_id: string;
  title: string;
  date_written: string;
  time_period: string;
  time_period_precision: TimePrecision;
  characters: string[];
  locations: string[];
  themes: string[];
  emotion_tags: string[];
  completeness: Completeness;
  writing_mode: WritingMode;
  prompt_used: string | null;
  revisit_count: number;
  word_count: number;
  origin: EntryOrigin;

  // Chapter assignments (optional - for book organization)
  chapter_assignments?: ChapterAssignment[];

  // Content
  content: string;

  // AI Notes (parsed from markdown)
  ai_notes?: AINotesSection;

  // File metadata
  filePath: string;
}

// Entry-to-chapter assignment
export interface ChapterAssignment {
  chapter_id: string;
  section_id?: string;
  role: 'primary' | 'supporting' | 'reference';
}

// Journal data model

export type BookWorthy = 'false' | 'seed' | 'maybe' | 'yes' | null;

export interface JournalAINotes {
  memory_triggers: string[];
  suggested_exploration: string[];
  added_to_question_bank: string[];
  connections: string[];
}

// Individual entry within a journal (a journal can have multiple entries per day)
export interface JournalEntry {
  entryNumber: number;
  timestamp: string | null;  // e.g., "3:00 AM", "3:35 AM" - extracted from header
  content: string;
  ai_notes?: JournalAINotes;
}

export interface Journal {
  // Frontmatter
  journal_id: string;
  journal_date: string;
  mood: string | null;
  captured_at: string;
  word_count: number;

  // Enriched later (optional)
  energy_level: number | null;
  notable_events: string[];
  triggered_memories: string[];
  book_worthy: BookWorthy;
  promoted_to: string | null;

  // Content (raw - kept for backwards compatibility)
  content: string;

  // Parsed entries (a journal can have multiple entries per day)
  entries: JournalEntry[];

  // AI Notes (parsed from markdown - for single-entry journals or combined)
  ai_notes?: JournalAINotes;

  // File metadata
  filePath: string;
}

// Journal data model

export type BookWorthy = 'false' | 'seed' | 'maybe' | 'yes' | null;

export interface JournalAINotes {
  memory_triggers: string[];
  suggested_exploration: string[];
  added_to_question_bank: string[];
  connections: string[];
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

  // Content
  content: string;

  // AI Notes (parsed from markdown)
  ai_notes?: JournalAINotes;

  // File metadata
  filePath: string;
}

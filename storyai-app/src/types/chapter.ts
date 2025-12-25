// Chapter data model

import type { AIVisibility, AIPriority } from './common';

export type ChapterStatus = 'outline' | 'drafting' | 'review' | 'revised' | 'complete';
export type Pacing = 'slow' | 'medium' | 'fast';
export type ChapterTimePrecision = 'decade' | 'year' | 'month' | 'day' | 'period';

export interface ChapterTimePeriod {
  start: string;
  end: string;
  precision: ChapterTimePrecision;
}

export interface NarrativeArc {
  opening_hook: string;
  key_moments: string[];
  closing: string;
}

export interface ChapterSection {
  section_id: string;
  title: string;
  order: number;
  entries: string[];
  status: 'outline' | 'drafted' | 'complete';
  word_count: number;
  summary: string;
}

export interface ChapterAINotes {
  writing_guidance: string;
  tone: string;
  pacing: Pacing;
  sensory_focus: string[];
}

export interface Chapter {
  // Identity
  chapter_id: string;
  book_id: string;
  title: string;
  subtitle: string;
  chapter_number: number;
  section_id: string;

  // Status
  status: ChapterStatus;
  created_date: string;
  last_updated: string;

  // Time period
  time_period: ChapterTimePeriod;

  // Word counts
  target_word_count: number;
  current_word_count: number;
  estimated_read_time: number;

  // Content links
  entries: string[];
  characters: string[];
  locations: string[];
  themes: string[];

  // Structure
  narrative_arc: NarrativeArc;
  sections: ChapterSection[];

  // Connections
  requires_chapters: string[];
  connects_to: string[];
  follows_up: string[];

  // AI context
  ai_notes: ChapterAINotes;
  ai_visibility: AIVisibility;
  ai_priority: AIPriority;

  // Content (markdown body)
  content: string;

  // File metadata
  filePath: string;
  section_folder: string;  // e.g., "03-digital-worlds"
}

// Computed chapter statistics
export interface ChapterProgress {
  chapter_id: string;
  title: string;
  status: ChapterStatus;
  word_count: number;
  target_word_count: number;
  percentage: number;
  entries_count: number;
  has_prose: boolean;
}

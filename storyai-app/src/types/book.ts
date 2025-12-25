// Book data model

import type { AIVisibility } from './common';

export type BookStatus = 'planning' | 'drafting' | 'revising' | 'complete';
export type StructureType = 'chronological' | 'thematic' | 'hybrid';

export interface LifePhase {
  phase_id: string;
  name: string;
  period_start: string;
  period_end: string;
  order: number;
  description: string;
  chapters: string[];  // chapter_ids
}

export interface ThematicThread {
  thread_id: string;
  name: string;
  description: string;
  chapters: string[];  // chapter_ids
}

export interface BookProgress {
  total_chapters: number;
  chapters_outlined: number;
  chapters_drafted: number;
  chapters_revised: number;
  chapters_complete: number;
  completion_percentage: number;
}

export interface Book {
  // Identity
  book_id: string;
  title: string;
  subtitle: string;
  author: string;
  status: BookStatus;
  created_date: string;
  last_updated: string;

  // Structure
  structure_type: StructureType;
  target_word_count: number;
  current_word_count: number;

  // Organization
  life_phases: LifePhase[];
  thematic_threads: ThematicThread[];

  // Progress
  progress: BookProgress;

  // AI context
  ai_visibility: AIVisibility;

  // Content (markdown body)
  content: string;

  // File metadata
  filePath: string;
}

// Computed book statistics
export interface BookStats {
  totalWords: number;
  targetWords: number;
  wordPercentage: number;
  chaptersTotal: number;
  chaptersByStatus: Record<string, number>;
  phasesWithContent: number;
  phasesEmpty: number;
  entriesAssigned: number;
  entriesUnassigned: number;
}

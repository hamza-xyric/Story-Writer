// Re-export all types

export * from './common';
export * from './entry';
export * from './character';
export * from './location';
export * from './book';
export * from './chapter';
export * from './journal';

// Additional types for the app

export interface ThemeData {
  name: string;
  count: number;
  entries: string[];
}

export interface EmotionTagData {
  name: string;
  count: number;
  entries: string[];
}

export interface StoryStats {
  totalEntries: number;
  totalCharacters: number;
  totalLocations: number;
  totalWords: number;
  totalThemes: number;
  dateRange: {
    earliest: string | null;
    latest: string | null;
  };
}

export interface SearchResult {
  type: 'entry' | 'character' | 'location';
  id: string;
  title: string;
  subtitle?: string;
  score: number;
  matches?: Array<{
    key: string;
    indices: Array<[number, number]>;
  }>;
}

// Data loader using Vite glob imports

import type { Entry, Character, Location, Book, Chapter, Journal } from '../types';
import { parseEntry, parseCharacter, parseLocation, parseBook, parseChapter, parseJournal } from './parser';

// Vite glob imports for markdown files
// Note: Using symlink at project root that points to ../story-data
const entryModules = import.meta.glob<string>('../../story-data/entries/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const characterModules = import.meta.glob<string>('../../story-data/characters/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const locationModules = import.meta.glob<string>('../../story-data/locations/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const bookModules = import.meta.glob<string>('../../story-data/books/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const chapterModules = import.meta.glob<string>('../../story-data/chapters/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const journalModules = import.meta.glob<string>('../../story-data/journals/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Filter out template files
function isNotTemplate(path: string): boolean {
  return !path.includes('_TEMPLATE') && !path.includes('_README');
}

// Load all entries
export function loadEntries(): Entry[] {
  return Object.entries(entryModules)
    .filter(([path]) => isNotTemplate(path))
    .map(([path, raw]) => parseEntry(raw, path))
    .sort((a, b) => {
      // Sort by date_written descending (newest first)
      if (a.date_written && b.date_written) {
        return b.date_written.localeCompare(a.date_written);
      }
      return 0;
    });
}

// Load all characters
export function loadCharacters(): Character[] {
  return Object.entries(characterModules)
    .filter(([path]) => isNotTemplate(path))
    .map(([path, raw]) => parseCharacter(raw, path))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Load all locations
export function loadLocations(): Location[] {
  return Object.entries(locationModules)
    .filter(([path]) => isNotTemplate(path))
    .map(([path, raw]) => parseLocation(raw, path))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Load all books
export function loadBooks(): Book[] {
  return Object.entries(bookModules)
    .filter(([path]) => isNotTemplate(path))
    .map(([path, raw]) => parseBook(raw, path))
    .sort((a, b) => a.title.localeCompare(b.title));
}

// Load all chapters
export function loadChapters(): Chapter[] {
  return Object.entries(chapterModules)
    .filter(([path]) => isNotTemplate(path))
    .map(([path, raw]) => parseChapter(raw, path))
    .sort((a, b) => {
      // Sort by book_id, then by chapter_number
      if (a.book_id !== b.book_id) {
        return a.book_id.localeCompare(b.book_id);
      }
      return a.chapter_number - b.chapter_number;
    });
}

// Load all journals
export function loadJournals(): Journal[] {
  return Object.entries(journalModules)
    .filter(([path]) => isNotTemplate(path))
    .map(([path, raw]) => parseJournal(raw, path))
    .sort((a, b) => {
      // Sort by journal_date descending (newest first)
      if (a.journal_date && b.journal_date) {
        return b.journal_date.localeCompare(a.journal_date);
      }
      return 0;
    });
}

// Load all data at once
export interface AllData {
  entries: Entry[];
  characters: Character[];
  locations: Location[];
  books: Book[];
  chapters: Chapter[];
  journals: Journal[];
}

export function loadAllData(): AllData {
  return {
    entries: loadEntries(),
    characters: loadCharacters(),
    locations: loadLocations(),
    books: loadBooks(),
    chapters: loadChapters(),
    journals: loadJournals(),
  };
}

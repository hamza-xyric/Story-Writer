// React Context data store for the StoryAI viewer

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import Fuse from 'fuse.js';
import type { Entry, Character, Location, Book, Chapter, Journal, ThemeData, EmotionTagData, StoryStats, SearchResult } from '../types';
import { loadAllData } from './loader';

interface DataStore {
  // Core data
  entries: Entry[];
  characters: Character[];
  locations: Location[];
  books: Book[];
  chapters: Chapter[];
  journals: Journal[];

  // Computed/aggregated data
  themes: ThemeData[];
  emotionTags: EmotionTagData[];

  // Search
  search: (query: string) => SearchResult[];

  // Lookup functions
  getEntry: (id: string) => Entry | undefined;
  getCharacter: (id: string) => Character | undefined;
  getLocation: (id: string) => Location | undefined;
  getBook: (id: string) => Book | undefined;
  getChapter: (id: string) => Chapter | undefined;
  getCharacterByName: (name: string) => Character | undefined;
  getEntriesForCharacter: (characterId: string) => Entry[];
  getEntriesForLocation: (locationId: string) => Entry[];
  getEntriesForTheme: (theme: string) => Entry[];
  getEntriesForEmotionTag: (tag: string) => Entry[];
  getRelatedEntries: (entryId: string) => Entry[];
  getChaptersForBook: (bookId: string) => Chapter[];
  getEntriesForChapter: (chapterId: string) => Entry[];
  getChapterForEntry: (entryId: string) => Chapter | undefined;
  getUnassignedEntries: (bookId: string) => Entry[];

  // Journal lookups
  getJournal: (id: string) => Journal | undefined;
  getJournalByDate: (date: string) => Journal | undefined;
  getJournalsForMonth: (year: number, month: number) => Journal[];

  // Stats
  stats: StoryStats;
}

const DataContext = createContext<DataStore | null>(null);

// Build search index
interface SearchableItem {
  type: 'entry' | 'character' | 'location';
  id: string;
  title: string;
  subtitle: string;
  content: string;
  themes: string[];
}

function buildSearchIndex(
  entries: Entry[],
  characters: Character[],
  locations: Location[]
): Fuse<SearchableItem> {
  const items: SearchableItem[] = [
    ...entries.map(e => ({
      type: 'entry' as const,
      id: e.entry_id,
      title: e.title,
      subtitle: e.time_period,
      content: e.content,
      themes: [...e.themes, ...e.emotion_tags],
    })),
    ...characters.map(c => ({
      type: 'character' as const,
      id: c.character_id,
      title: c.name,
      subtitle: c.relationship,
      content: c.content,
      themes: c.traits,
    })),
    ...locations.map(l => ({
      type: 'location' as const,
      id: l.location_id,
      title: l.name,
      subtitle: `${l.city}${l.country ? `, ${l.country}` : ''}`,
      content: l.content,
      themes: [],
    })),
  ];

  return new Fuse(items, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'content', weight: 1 },
      { name: 'themes', weight: 1.5 },
      { name: 'subtitle', weight: 0.5 },
    ],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
  });
}

export function DataProvider({ children }: { children: ReactNode }) {
  // Load data eagerly (at module load time via Vite)
  const data = useMemo(() => loadAllData(), []);

  // Build search index
  const searchIndex = useMemo(
    () => buildSearchIndex(data.entries, data.characters, data.locations),
    [data]
  );

  // Aggregate themes with counts
  const themes = useMemo(() => {
    const themeMap = new Map<string, { count: number; entries: string[] }>();
    data.entries.forEach(entry => {
      entry.themes.forEach(theme => {
        const existing = themeMap.get(theme);
        if (existing) {
          existing.count++;
          existing.entries.push(entry.entry_id);
        } else {
          themeMap.set(theme, { count: 1, entries: [entry.entry_id] });
        }
      });
    });
    return Array.from(themeMap.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);
  }, [data.entries]);

  // Aggregate emotion tags with counts
  const emotionTags = useMemo(() => {
    const tagMap = new Map<string, { count: number; entries: string[] }>();
    data.entries.forEach(entry => {
      entry.emotion_tags.forEach(tag => {
        const existing = tagMap.get(tag);
        if (existing) {
          existing.count++;
          existing.entries.push(entry.entry_id);
        } else {
          tagMap.set(tag, { count: 1, entries: [entry.entry_id] });
        }
      });
    });
    return Array.from(tagMap.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);
  }, [data.entries]);

  // Search function
  const search = (query: string): SearchResult[] => {
    if (!query.trim()) return [];
    const results = searchIndex.search(query);
    return results.map(r => ({
      type: r.item.type,
      id: r.item.id,
      title: r.item.title,
      subtitle: r.item.subtitle,
      score: r.score ?? 1,
      matches: r.matches?.map(m => ({
        key: m.key ?? '',
        indices: m.indices as Array<[number, number]>,
      })),
    }));
  };

  // Lookup functions
  const getEntry = (id: string) => data.entries.find(e => e.entry_id === id);

  const getCharacter = (id: string) =>
    data.characters.find(c => c.character_id === id);

  const getCharacterByName = (name: string) =>
    data.characters.find(c =>
      c.name.toLowerCase() === name.toLowerCase() ||
      c.aliases.some(a => a.toLowerCase() === name.toLowerCase())
    );

  const getLocation = (id: string) =>
    data.locations.find(l => l.location_id === id);

  const getBook = (id: string) =>
    data.books.find(b => b.book_id === id);

  const getChapter = (id: string) =>
    data.chapters.find(c => c.chapter_id === id);

  const getEntriesForCharacter = (characterId: string) =>
    data.entries.filter(e => e.characters.includes(characterId));

  const getEntriesForLocation = (locationId: string) =>
    data.entries.filter(e => e.locations.includes(locationId));

  const getEntriesForTheme = (theme: string) =>
    data.entries.filter(e => e.themes.includes(theme));

  const getEntriesForEmotionTag = (tag: string) =>
    data.entries.filter(e => e.emotion_tags.includes(tag));

  // Get related entries (share characters or themes)
  const getRelatedEntries = (entryId: string): Entry[] => {
    const entry = getEntry(entryId);
    if (!entry) return [];

    const related = data.entries.filter(e => {
      if (e.entry_id === entryId) return false;

      // Check for shared characters
      const sharedCharacters = e.characters.some(c => entry.characters.includes(c));
      if (sharedCharacters) return true;

      // Check for shared themes
      const sharedThemes = e.themes.some(t => entry.themes.includes(t));
      if (sharedThemes) return true;

      return false;
    });

    return related.slice(0, 5); // Return top 5 related
  };

  // Book/Chapter lookup functions
  const getChaptersForBook = (bookId: string): Chapter[] =>
    data.chapters
      .filter(c => c.book_id === bookId)
      .sort((a, b) => a.chapter_number - b.chapter_number);

  const getEntriesForChapter = (chapterId: string): Entry[] => {
    const chapter = getChapter(chapterId);
    if (!chapter) return [];
    return chapter.entries
      .map(entryId => getEntry(entryId))
      .filter((e): e is Entry => e !== undefined);
  };

  const getChapterForEntry = (entryId: string): Chapter | undefined =>
    data.chapters.find(c => c.entries.includes(entryId));

  const getUnassignedEntries = (bookId: string): Entry[] => {
    // Get all entry IDs that are assigned to any chapter in this book
    const assignedEntryIds = new Set(
      data.chapters
        .filter(c => c.book_id === bookId)
        .flatMap(c => c.entries)
    );
    // Return entries not in any chapter
    return data.entries.filter(e => !assignedEntryIds.has(e.entry_id));
  };

  // Journal lookup functions
  const getJournal = (id: string) =>
    data.journals.find(j => j.journal_id === id);

  const getJournalByDate = (date: string) =>
    data.journals.find(j => j.journal_date === date);

  const getJournalsForMonth = (year: number, month: number): Journal[] => {
    const monthStr = `${year}-${String(month).padStart(2, '0')}`;
    return data.journals.filter(j => j.journal_date.startsWith(monthStr));
  };

  // Calculate stats
  const stats = useMemo<StoryStats>(() => {
    const dates = data.entries
      .map(e => e.date_written)
      .filter(Boolean)
      .sort();

    return {
      totalEntries: data.entries.length,
      totalCharacters: data.characters.length,
      totalLocations: data.locations.length,
      totalWords: data.entries.reduce((sum, e) => sum + e.word_count, 0),
      totalThemes: themes.length,
      dateRange: {
        earliest: dates[0] || null,
        latest: dates[dates.length - 1] || null,
      },
    };
  }, [data, themes]);

  const value: DataStore = {
    ...data,
    themes,
    emotionTags,
    search,
    getEntry,
    getCharacter,
    getCharacterByName,
    getLocation,
    getBook,
    getChapter,
    getEntriesForCharacter,
    getEntriesForLocation,
    getEntriesForTheme,
    getEntriesForEmotionTag,
    getRelatedEntries,
    getChaptersForBook,
    getEntriesForChapter,
    getChapterForEntry,
    getUnassignedEntries,
    getJournal,
    getJournalByDate,
    getJournalsForMonth,
    stats,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataStore {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

// Convenience hooks
export function useEntries() {
  const { entries } = useData();
  return entries;
}

export function useCharacters() {
  const { characters } = useData();
  return characters;
}

export function useLocations() {
  const { locations } = useData();
  return locations;
}

export function useThemes() {
  const { themes } = useData();
  return themes;
}

export function useStats() {
  const { stats } = useData();
  return stats;
}

export function useSearch() {
  const { search } = useData();
  return search;
}

export function useBooks() {
  const { books } = useData();
  return books;
}

export function useChapters() {
  const { chapters } = useData();
  return chapters;
}

export function useBook(bookId: string) {
  const { getBook, getChaptersForBook, getUnassignedEntries } = useData();
  const book = getBook(bookId);
  const chapters = getChaptersForBook(bookId);
  const unassignedEntries = getUnassignedEntries(bookId);
  return { book, chapters, unassignedEntries };
}

export function useChapter(chapterId: string) {
  const { getChapter, getEntriesForChapter } = useData();
  const chapter = getChapter(chapterId);
  const entries = getEntriesForChapter(chapterId);
  return { chapter, entries };
}

export function useJournals() {
  const { journals } = useData();
  return journals;
}

export function useJournalsForMonth(year: number, month: number) {
  const { getJournalsForMonth } = useData();
  return getJournalsForMonth(year, month);
}

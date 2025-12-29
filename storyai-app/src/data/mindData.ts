// Mind visualization data hook
// Aggregates themes, quotes, and profile data for the constellation view

import { useMemo } from 'react';
import { useEntries, useThemes, useData } from './store';
import type { Entry } from '../types';

// Types for mind visualization
export interface MindNode {
  id: string;
  type: 'theme' | 'lead' | 'center';
  name: string;
  count: number;
  status?: 'explored' | 'unexplored';
}

export interface MindQuote {
  id: string;
  text: string;
  source: 'entry' | 'profile' | 'transcript';
  sourceId?: string;
  theme?: string;
}

export interface MindData {
  nodes: MindNode[];
  quotes: MindQuote[];
  getEntriesForTheme: (theme: string) => Entry[];
}

// Profile signature phrases (from hamza-profile.md)
const PROFILE_PHRASES: Array<{ text: string; source: 'profile' }> = [
  { text: '"slavery mindset"', source: 'profile' },
  { text: '"I like to work really fast, like really really fast"', source: 'profile' },
  { text: '"core memories"', source: 'profile' },
  { text: '"the matrix"', source: 'profile' },
  { text: '"a lot, a lot, a lot"', source: 'profile' },
  { text: '"that dream is just a dream"', source: 'profile' },
  { text: '"100%"', source: 'profile' },
];

// Extract quotable sentences from entry content
function extractEntryQuotes(entries: Entry[]): MindQuote[] {
  const quotes: MindQuote[] = [];

  entries.forEach(entry => {
    // Split content into sentences
    const sentences = entry.content.match(/[^.!?]+[.!?]+/g) || [];

    // Filter for quotable sentences
    const quotables = sentences.filter(s => {
      const trimmed = s.trim();
      return (
        trimmed.length > 20 &&
        trimmed.length < 100 &&
        (trimmed.includes('remember') ||
          trimmed.includes('feel') ||
          trimmed.includes('think') ||
          trimmed.includes('want') ||
          trimmed.includes('love') ||
          /^I [a-z]+/i.test(trimmed))
      );
    });

    // Take at most 1 quote per entry
    quotables.slice(0, 1).forEach(text => {
      quotes.push({
        id: `entry-${entry.entry_id}-${quotes.length}`,
        text: text.trim(),
        source: 'entry',
        sourceId: entry.entry_id,
      });
    });
  });

  return quotes;
}

// Build the combined quotes list
function buildMindQuotes(entries: Entry[]): MindQuote[] {
  const quotes: MindQuote[] = [];

  // 1. Add profile signature phrases (5-7)
  PROFILE_PHRASES.forEach((phrase, i) => {
    quotes.push({
      id: `profile-${i}`,
      text: phrase.text,
      source: phrase.source,
    });
  });

  // 2. Add extracted entry quotes (up to 8)
  const entryQuotes = extractEntryQuotes(entries);
  quotes.push(...entryQuotes.slice(0, 8));

  // Cap at 15 total for MVP
  return quotes.slice(0, 15);
}

// Convert themes to mind nodes
function buildMindNodes(themes: Array<{ name: string; count: number }>): MindNode[] {
  return themes.map(theme => ({
    id: `theme-${theme.name.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'theme' as const,
    name: theme.name,
    count: theme.count,
  }));
}

// Main hook
export function useMindData(): MindData {
  const entries = useEntries();
  const themes = useThemes();
  const { getEntriesForTheme } = useData();

  // Build nodes from themes
  const nodes = useMemo(() => {
    return buildMindNodes(themes);
  }, [themes]);

  // Build quotes from profile + entries
  const quotes = useMemo(() => {
    return buildMindQuotes(entries);
  }, [entries]);

  return {
    nodes,
    quotes,
    getEntriesForTheme,
  };
}

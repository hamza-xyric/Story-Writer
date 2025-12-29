// Parsing utilities for markdown files with YAML frontmatter

import matter from 'gray-matter';
import type { Entry, Character, Location, AINotesSection, Book, Chapter, Journal, JournalAINotes, JournalEntry } from '../types';

// Convert date to ISO string format (handles Date objects from YAML)
// Uses local time to avoid timezone issues
function toDateString(value: unknown): string {
  if (!value) return '';
  if (value instanceof Date) {
    // Use local time components to avoid UTC conversion issues
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  if (typeof value === 'string') return value;
  return String(value);
}

// Extract AI Notes section from markdown content
function extractAINotes(content: string): AINotesSection | undefined {
  const aiNotesMatch = content.match(/## AI Notes[\s\S]*?(?=---|\Z)/);
  if (!aiNotesMatch) return undefined;

  const aiNotesSection = aiNotesMatch[0];

  const extractList = (section: string, header: string): string[] => {
    const regex = new RegExp(`### ${header}[\\s\\S]*?(?=###|$)`);
    const match = section.match(regex);
    if (!match) return [];

    return match[0]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(item => item.length > 0);
  };

  return {
    questions_to_explore: extractList(aiNotesSection, 'Questions to Explore'),
    connections_found: extractList(aiNotesSection, 'Connections Found'),
    consistency_flags: extractList(aiNotesSection, 'Consistency Flags'),
  };
}

// Clean content by removing AI Notes section
function cleanContent(content: string): string {
  return content.replace(/---\s*## AI Notes[\s\S]*$/, '').trim();
}

// Extract category folder from file path (e.g., "family" from ".../characters/family/dad.md")
function extractCategoryFromPath(filePath: string): string {
  const parts = filePath.split('/');
  const charactersIndex = parts.findIndex(p => p === 'characters');
  if (charactersIndex >= 0 && parts.length > charactersIndex + 1) {
    return parts[charactersIndex + 1];
  }
  return 'other';
}

// Extract type folder from file path for locations
function extractTypeFromPath(filePath: string): string {
  const parts = filePath.split('/');
  const locationsIndex = parts.findIndex(p => p === 'locations');
  if (locationsIndex >= 0 && parts.length > locationsIndex + 1) {
    return parts[locationsIndex + 1];
  }
  return 'other';
}

// Parse entry from raw markdown
export function parseEntry(raw: string, filePath: string): Entry {
  const { data, content } = matter(raw);
  const aiNotes = extractAINotes(content);

  return {
    entry_id: data.entry_id || '',
    title: data.title || '',
    date_written: toDateString(data.date_written),
    time_period: data.time_period || '',
    time_period_precision: data.time_period_precision || 'year',
    characters: data.characters || [],
    locations: data.locations || [],
    themes: data.themes || [],
    emotion_tags: data.emotion_tags || [],
    completeness: data.completeness || 'brief',
    writing_mode: data.writing_mode || 'freeform',
    prompt_used: data.prompt_used || null,
    revisit_count: data.revisit_count || 0,
    word_count: data.word_count || 0,
    origin: data.origin || {
      type: 'direct',
      draft_id: null,
      capture_date: null,
      processing_date: null,
      fragments_combined: 0,
      questions_asked: 0,
      cleanup_level: null,
    },
    content: cleanContent(content),
    ai_notes: aiNotes,
    filePath,
  };
}

// Parse character from raw markdown
export function parseCharacter(raw: string, filePath: string): Character {
  const { data, content } = matter(raw);

  return {
    character_id: data.character_id || '',
    name: data.name || '',
    aliases: data.aliases || [],
    relationship: data.relationship || '',
    relationship_category: data.relationship_category || 'other',
    birth_year: data.birth_year || null,
    death_year: data.death_year || null,
    period_active: data.period_active || [],
    traits: data.traits || [],
    physical_description: data.physical_description || '',
    voice_characteristics: data.voice_characteristics || '',
    defining_mannerisms: data.defining_mannerisms || '',
    progressions: data.progressions || [],
    relations: data.relations || [],
    ai_visibility: data.ai_visibility || 'when_detected',
    ai_priority: data.ai_priority || 'medium',
    connections: data.connections || [],
    first_mentioned_in: data.first_mentioned_in || '',
    entries_featured: data.entries_featured || [],
    mention_count: data.mention_count || 0,
    last_updated: toDateString(data.last_updated),
    content,
    filePath,
    category_folder: extractCategoryFromPath(filePath),
  };
}

// Parse location from raw markdown
export function parseLocation(raw: string, filePath: string): Location {
  const { data, content } = matter(raw);

  return {
    location_id: data.location_id || '',
    name: data.name || '',
    aliases: data.aliases || [],
    type: data.type || 'other',
    address: data.address || '',
    city: data.city || '',
    country: data.country || '',
    coordinates: data.coordinates || '',
    period_active: data.period_active || [],
    progressions: data.progressions || [],
    relations: data.relations || [],
    physical_description: data.physical_description || '',
    sensory_details: data.sensory_details || {
      sight: '',
      sound: '',
      smell: '',
      texture: '',
    },
    ai_visibility: data.ai_visibility || 'when_detected',
    ai_priority: data.ai_priority || 'medium',
    first_mentioned_in: data.first_mentioned_in || '',
    entries_featured: data.entries_featured || [],
    mention_count: data.mention_count || 0,
    last_updated: toDateString(data.last_updated),
    content,
    filePath,
    type_folder: extractTypeFromPath(filePath),
  };
}

// Extract section folder from chapter file path (e.g., "03-digital-worlds" from ".../chapters/03-digital-worlds/01-file.md")
function extractSectionFromPath(filePath: string): string {
  const parts = filePath.split('/');
  const chaptersIndex = parts.findIndex(p => p === 'chapters');
  if (chaptersIndex >= 0 && parts.length > chaptersIndex + 1) {
    return parts[chaptersIndex + 1];
  }
  return '';
}

// Parse book from raw markdown
export function parseBook(raw: string, filePath: string): Book {
  const { data, content } = matter(raw);

  return {
    book_id: data.book_id || '',
    title: data.title || '',
    subtitle: data.subtitle || '',
    author: data.author || 'Hamza',
    status: data.status || 'planning',
    created_date: toDateString(data.created_date),
    last_updated: toDateString(data.last_updated),
    structure_type: data.structure_type || 'hybrid',
    target_word_count: data.target_word_count || 0,
    current_word_count: data.current_word_count || 0,
    life_phases: data.life_phases || [],
    thematic_threads: data.thematic_threads || [],
    progress: data.progress || {
      total_chapters: 0,
      chapters_outlined: 0,
      chapters_drafted: 0,
      chapters_revised: 0,
      chapters_complete: 0,
      completion_percentage: 0,
    },
    ai_visibility: data.ai_visibility || 'always',
    content,
    filePath,
  };
}

// Parse chapter from raw markdown
export function parseChapter(raw: string, filePath: string): Chapter {
  const { data, content } = matter(raw);

  return {
    chapter_id: data.chapter_id || '',
    book_id: data.book_id || '',
    title: data.title || '',
    subtitle: data.subtitle || '',
    chapter_number: data.chapter_number || 0,
    section_id: data.section_id || '',
    status: data.status || 'outline',
    created_date: toDateString(data.created_date),
    last_updated: toDateString(data.last_updated),
    time_period: data.time_period || { start: '', end: '', precision: 'year' },
    target_word_count: data.target_word_count || 0,
    current_word_count: data.current_word_count || 0,
    estimated_read_time: data.estimated_read_time || 0,
    entries: data.entries || [],
    characters: data.characters || [],
    locations: data.locations || [],
    themes: data.themes || [],
    narrative_arc: data.narrative_arc || { opening_hook: '', key_moments: [], closing: '' },
    sections: data.sections || [],
    requires_chapters: data.requires_chapters || [],
    connects_to: data.connects_to || [],
    follows_up: data.follows_up || [],
    ai_notes: data.ai_notes || {
      writing_guidance: '',
      tone: '',
      pacing: 'medium',
      sensory_focus: [],
    },
    ai_visibility: data.ai_visibility || 'always',
    ai_priority: data.ai_priority || 'medium',
    content,
    filePath,
    section_folder: extractSectionFromPath(filePath),
  };
}

// Extract nested bullets under a section header in AI Notes
// Handles two formats:
//
// Format A (Entry 1 style - bulleted headers, indented content):
// - **Memory triggers detected:**
//   - **Rabia** - Content here...
//
// Format B (Entry 2 style - non-bulleted headers, non-indented content):
// **Memory triggers detected:**
// - **Rabia** - Content here...
//
function extractSectionBullets(aiNotesSection: string, headerPattern: RegExp): string[] {
  const lines = aiNotesSection.split('\n');
  const results: string[] = [];
  let inSection = false;
  let headerIsIndented = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this is the section header we're looking for
    if (headerPattern.test(line)) {
      inSection = true;
      // Detect if header is bulleted (Format A) or not (Format B)
      headerIsIndented = /^-\s*\*\*/.test(line.trim());
      continue;
    }

    // If we're in the section, collect bullets
    if (inSection) {
      const trimmedLine = line.trim();

      if (headerIsIndented) {
        // Format A: Look for indented bullets (starts with spaces then -)
        if (/^\s{2,}-/.test(line)) {
          const bulletContent = line.replace(/^\s*-\s*/, '').trim();
          if (bulletContent) {
            results.push(bulletContent);
          }
        }
        // Check if we've hit another top-level bulleted section header
        else if (/^-\s*\*\*/.test(trimmedLine)) {
          inSection = false;
        }
      } else {
        // Format B: Look for non-indented bullets (line starts with -)
        if (trimmedLine.startsWith('-')) {
          const bulletContent = trimmedLine.replace(/^-\s*/, '').trim();
          if (bulletContent) {
            results.push(bulletContent);
          }
        }
        // Check if we've hit another section header (bold text at start of line, not a bullet)
        else if (/^\*\*[^*]+\*\*/.test(trimmedLine) && !trimmedLine.startsWith('-')) {
          inSection = false;
        }
      }
    }
  }

  return results;
}

// Extract journal AI Notes section from markdown content
function extractJournalAINotes(content: string): JournalAINotes | undefined {
  const aiNotesMatch = content.match(/## AI Notes[\s\S]*?(?=---|\Z)/);
  if (!aiNotesMatch) return undefined;

  const aiNotesSection = aiNotesMatch[0];

  return {
    memory_triggers: extractSectionBullets(aiNotesSection, /^-\s*\*\*Memory triggers?( detected)?:?\*\*/i),
    suggested_exploration: extractSectionBullets(aiNotesSection, /^-\s*\*\*Suggested exploration:?\*\*/i),
    added_to_question_bank: extractSectionBullets(aiNotesSection, /^-\s*\*\*Added to question bank:?\*\*/i),
    connections: extractSectionBullets(aiNotesSection, /^-\s*\*\*Connections?:?\*\*/i),
  };
}

// Clean journal content by removing AI Notes section
function cleanJournalContent(content: string): string {
  return content.replace(/---\s*## AI Notes[\s\S]*$/, '').trim();
}

// Extract AI Notes for a specific entry (handles "## AI Notes (Entry N)" format)
function extractEntryAINotes(content: string, entryNumber: number): JournalAINotes | undefined {
  // For entry 1, look for generic "## AI Notes" (not followed by "(Entry")
  // For entry N, look for "## AI Notes (Entry N)"
  let aiNotesMatch: RegExpMatchArray | null;

  if (entryNumber === 1) {
    // Match "## AI Notes" that's NOT followed by "(Entry" to get the first entry's notes
    aiNotesMatch = content.match(/## AI Notes(?!\s*\(Entry)[\s\S]*?(?=---\s*## Entry|\Z|$)/);
  } else {
    // Match "## AI Notes (Entry N)" for subsequent entries
    const pattern = new RegExp(`## AI Notes \\(Entry ${entryNumber}\\)[\\s\\S]*?(?=---|\\Z|$)`);
    aiNotesMatch = content.match(pattern);
  }

  if (!aiNotesMatch) return undefined;

  const aiNotesSection = aiNotesMatch[0];

  return {
    memory_triggers: extractSectionBullets(aiNotesSection, /^-?\s*\*\*Memory triggers?( detected)?:?\*\*/i),
    suggested_exploration: extractSectionBullets(aiNotesSection, /^-?\s*\*\*Suggested exploration:?\*\*/i),
    added_to_question_bank: extractSectionBullets(aiNotesSection, /^-?\s*\*\*(Added to )?question(s for the)? bank:?\*\*/i),
    connections: extractSectionBullets(aiNotesSection, /^-?\s*\*\*Connections?:?\*\*/i),
  };
}

// Parse multiple entries from journal content
// Format: First content block is Entry 1, then "## Entry 2: timestamp", "## Entry 3: timestamp", etc.
function parseJournalEntries(content: string): JournalEntry[] {
  const entries: JournalEntry[] = [];

  // Split by "## Entry N:" pattern (lookahead to keep the delimiter)
  const entryPattern = /(?=## Entry \d+:)/;
  const parts = content.split(entryPattern);

  if (parts.length === 0) {
    // No content at all
    return [{
      entryNumber: 1,
      timestamp: null,
      content: '',
      ai_notes: undefined,
    }];
  }

  // First part (before any "## Entry N:") is Entry 1
  const firstPart = parts[0].trim();
  if (firstPart) {
    // Clean the first entry content (remove AI Notes section)
    const cleanedFirst = firstPart.replace(/---\s*## AI Notes(?!\s*\(Entry)[\s\S]*$/, '').trim();
    entries.push({
      entryNumber: 1,
      timestamp: null,  // First entry gets timestamp from frontmatter
      content: cleanedFirst,
      ai_notes: extractEntryAINotes(content, 1),
    });
  }

  // Process subsequent entries (## Entry 2:, ## Entry 3:, etc.)
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];

    // Extract entry number and timestamp from header
    // Format: "## Entry 2: 3:35 AM (Late Night Continuation)"
    const headerMatch = part.match(/## Entry (\d+):\s*(.+?)(?:\n|$)/);

    if (headerMatch) {
      const entryNumber = parseInt(headerMatch[1], 10);
      const headerText = headerMatch[2].trim();

      // Extract timestamp - look for time patterns like "3:35 AM", "10:00 PM"
      const timeMatch = headerText.match(/(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)/i);
      const timestamp = timeMatch ? timeMatch[1].trim() : null;

      // Get content after the header, clean AI Notes section for this entry
      const contentAfterHeader = part.substring(headerMatch[0].length);
      const cleanedContent = contentAfterHeader
        .replace(/---\s*## AI Notes \(Entry \d+\)[\s\S]*$/, '')
        .trim();

      entries.push({
        entryNumber,
        timestamp,
        content: cleanedContent,
        ai_notes: extractEntryAINotes(content, entryNumber),
      });
    }
  }

  // If no entries were parsed, create a default entry 1 with all content
  if (entries.length === 0) {
    entries.push({
      entryNumber: 1,
      timestamp: null,
      content: cleanJournalContent(content),
      ai_notes: extractJournalAINotes(content),
    });
  }

  return entries;
}

// Parse journal from raw markdown
export function parseJournal(raw: string, filePath: string): Journal {
  const { data, content } = matter(raw);
  const aiNotes = extractJournalAINotes(content);
  const entries = parseJournalEntries(content);

  return {
    journal_id: data.journal_id || '',
    journal_date: toDateString(data.journal_date),
    mood: data.mood || null,
    captured_at: toDateString(data.captured_at),
    word_count: data.word_count || 0,
    energy_level: data.energy_level || null,
    notable_events: data.notable_events || [],
    triggered_memories: data.triggered_memories || [],
    book_worthy: data.book_worthy || null,
    promoted_to: data.promoted_to || null,
    content: cleanJournalContent(content),
    entries,
    ai_notes: aiNotes,
    filePath,
  };
}

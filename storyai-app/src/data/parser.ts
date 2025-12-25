// Parsing utilities for markdown files with YAML frontmatter

import matter from 'gray-matter';
import type { Entry, Character, Location, AINotesSection, Book, Chapter, Journal, JournalAINotes } from '../types';

// Convert date to ISO string format (handles Date objects from YAML)
function toDateString(value: unknown): string {
  if (!value) return '';
  if (value instanceof Date) {
    return value.toISOString().split('T')[0]; // YYYY-MM-DD
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

// Extract journal AI Notes section from markdown content
function extractJournalAINotes(content: string): JournalAINotes | undefined {
  const aiNotesMatch = content.match(/## AI Notes[\s\S]*?(?=---|\Z)/);
  if (!aiNotesMatch) return undefined;

  const aiNotesSection = aiNotesMatch[0];

  // Parse bullet points from AI Notes
  const bullets = aiNotesSection
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.replace(/^-\s*/, '').trim());

  return {
    memory_triggers: bullets.filter(b => b.toLowerCase().includes('memory trigger') || b.toLowerCase().includes('triggers:')).map(b => b.replace(/memory triggers?:?\s*/i, '')),
    suggested_exploration: bullets.filter(b => b.toLowerCase().includes('suggested') || b.toLowerCase().includes('/biographer')),
    added_to_question_bank: bullets.filter(b => b.toLowerCase().includes('question bank') || b.toLowerCase().includes('added to')),
    connections: bullets.filter(b => b.toLowerCase().includes('connection') || b.toLowerCase().includes('similar')),
  };
}

// Clean journal content by removing AI Notes section
function cleanJournalContent(content: string): string {
  return content.replace(/---\s*## AI Notes[\s\S]*$/, '').trim();
}

// Parse journal from raw markdown
export function parseJournal(raw: string, filePath: string): Journal {
  const { data, content } = matter(raw);
  const aiNotes = extractJournalAINotes(content);

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
    ai_notes: aiNotes,
    filePath,
  };
}

// EntryBrowser - main view for browsing and reading entries

import { useState, useMemo, useCallback } from 'react';
import { useEntries } from '../../data';
import { PageHeader } from '../../components/layout';
import { EntryCard, EntryReader } from '../../components/entry';
import { Input, Tag } from '../../components/primitives';
import { cn } from '../../utils';
import type { Entry } from '../../types';

type ViewMode = 'corkboard' | 'outliner';
type SortBy = 'date_written' | 'time_period' | 'word_count' | 'title';

export function EntryBrowser() {
  const entries = useEntries();
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('corkboard');
  const [sortBy, setSortBy] = useState<SortBy>('date_written');
  const [filterTheme, setFilterTheme] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all unique themes for filtering
  const allThemes = useMemo(() => {
    const themes = new Set<string>();
    entries.forEach(e => e.themes.forEach(t => themes.add(t)));
    return Array.from(themes).sort();
  }, [entries]);

  // Filter and sort entries
  const filteredEntries = useMemo(() => {
    let result = [...entries];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        e =>
          e.title.toLowerCase().includes(query) ||
          e.content.toLowerCase().includes(query) ||
          e.themes.some(t => t.toLowerCase().includes(query))
      );
    }

    // Apply theme filter
    if (filterTheme) {
      result = result.filter(e => e.themes.includes(filterTheme));
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date_written':
          return b.date_written.localeCompare(a.date_written);
        case 'time_period':
          return a.time_period.localeCompare(b.time_period);
        case 'word_count':
          return b.word_count - a.word_count;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [entries, searchQuery, filterTheme, sortBy]);

  // Navigation for reader
  const currentIndex = selectedEntry
    ? filteredEntries.findIndex(e => e.entry_id === selectedEntry.entry_id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < filteredEntries.length - 1;

  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      if (direction === 'prev' && hasPrev) {
        setSelectedEntry(filteredEntries[currentIndex - 1]);
      } else if (direction === 'next' && hasNext) {
        setSelectedEntry(filteredEntries[currentIndex + 1]);
      }
    },
    [currentIndex, hasPrev, hasNext, filteredEntries]
  );

  return (
    <div className="h-screen flex flex-col">
      <PageHeader
        title="Entries"
        subtitle={`${filteredEntries.length} ${filteredEntries.length === 1 ? 'story' : 'stories'} captured`}
      />

      {/* Toolbar */}
      <div className="px-8 py-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)] flex items-center gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>

        {/* Theme Filter */}
        <div className="flex items-center gap-2">
          {filterTheme && (
            <Tag variant="theme" removable onRemove={() => setFilterTheme(null)}>
              {filterTheme}
            </Tag>
          )}
          <select
            value={filterTheme || ''}
            onChange={(e) => setFilterTheme(e.target.value || null)}
            className={cn(
              'px-3 py-2 text-sm rounded-lg',
              'bg-[var(--color-surface-elevated)]',
              'border border-[var(--color-border-default)]',
              'text-[var(--color-text-primary)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-terracotta)]/20'
            )}
          >
            <option value="">All Themes</option>
            {allThemes.map(theme => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className={cn(
            'px-3 py-2 text-sm rounded-lg',
            'bg-[var(--color-surface-elevated)]',
            'border border-[var(--color-border-default)]',
            'text-[var(--color-text-primary)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-terracotta)]/20'
          )}
        >
          <option value="date_written">Newest First</option>
          <option value="time_period">By Period</option>
          <option value="word_count">By Length</option>
          <option value="title">Alphabetical</option>
        </select>

        {/* View Toggle */}
        <div className="flex rounded-lg border border-[var(--color-border-default)] overflow-hidden">
          <button
            onClick={() => setViewMode('corkboard')}
            className={cn(
              'px-3 py-2 text-sm',
              'transition-colors',
              viewMode === 'corkboard'
                ? 'bg-[var(--color-accent-terracotta)] text-white'
                : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-tertiary)]'
            )}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('outliner')}
            className={cn(
              'px-3 py-2 text-sm',
              'transition-colors',
              viewMode === 'outliner'
                ? 'bg-[var(--color-accent-terracotta)] text-white'
                : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-tertiary)]'
            )}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Entry List */}
        <div
          className={cn(
            'overflow-y-auto p-6',
            selectedEntry ? 'w-1/2 border-r border-[var(--color-border-subtle)]' : 'w-full'
          )}
        >
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[var(--color-text-muted)]">No entries found</p>
            </div>
          ) : viewMode === 'corkboard' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredEntries.map((entry, index) => (
                <div
                  key={entry.entry_id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <EntryCard
                    entry={entry}
                    onSelect={setSelectedEntry}
                    isSelected={selectedEntry?.entry_id === entry.entry_id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 bg-[var(--color-surface-primary)]">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] border-b border-[var(--color-border-default)]">
                  <th className="pb-3 px-4">Title</th>
                  <th className="pb-3 px-4">Period</th>
                  <th className="pb-3 px-4">Themes</th>
                  <th className="pb-3 px-4 text-right">Words</th>
                  <th className="pb-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr
                    key={entry.entry_id}
                    onClick={() => setSelectedEntry(entry)}
                    className={cn(
                      'cursor-pointer border-b border-[var(--color-border-subtle)]',
                      'hover:bg-[var(--color-surface-secondary)]',
                      'transition-colors',
                      selectedEntry?.entry_id === entry.entry_id && 'bg-[var(--color-accent-terracotta)]/5'
                    )}
                  >
                    <td className="py-3 px-4">
                      <span className="font-medium text-[var(--color-text-primary)]">
                        {entry.title || 'Untitled'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--color-text-secondary)]">
                      {entry.time_period}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 flex-wrap">
                        {entry.themes.slice(0, 2).map(theme => (
                          <Tag key={theme} variant="theme" size="sm">{theme}</Tag>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--color-text-muted)] text-right">
                      {entry.word_count.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          'text-xs font-medium px-2 py-0.5 rounded-full',
                          entry.completeness === 'detailed' && 'bg-[var(--color-detailed)]/10 text-[var(--color-detailed)]',
                          entry.completeness === 'partial' && 'bg-[var(--color-partial)]/10 text-[var(--color-partial)]',
                          entry.completeness === 'brief' && 'bg-[var(--color-brief)]/10 text-[var(--color-brief)]'
                        )}
                      >
                        {entry.completeness}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Reader Panel */}
        {selectedEntry && (
          <div className="w-1/2 overflow-hidden">
            <EntryReader
              entry={selectedEntry}
              onClose={() => setSelectedEntry(null)}
              onNavigate={handleNavigate}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          </div>
        )}
      </div>
    </div>
  );
}

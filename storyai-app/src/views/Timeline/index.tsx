// Timeline view - D3.js interactive timeline

import { useState } from 'react';
import { PageHeader } from '../../components/layout';
import { TimelineCanvas } from '../../components/timeline';
import { EntryReader } from '../../components/entry';
import { useEntries } from '../../data';
import type { Entry } from '../../types';
import { cn } from '../../utils';

export function Timeline() {
  const entries = useEntries();
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const handleSelectEntry = (entry: Entry) => {
    setSelectedEntry(entry);
  };

  const handleCloseReader = () => {
    setSelectedEntry(null);
  };

  // Get filtered entries index for navigation
  const currentIndex = selectedEntry
    ? entries.findIndex(e => e.entry_id === selectedEntry.entry_id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < entries.length - 1;

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && hasPrev) {
      setSelectedEntry(entries[currentIndex - 1]);
    } else if (direction === 'next' && hasNext) {
      setSelectedEntry(entries[currentIndex + 1]);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <PageHeader
        title="Timeline"
        subtitle="Your life journey through time"
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Timeline Canvas */}
        <div
          className={cn(
            'flex-1 p-6 overflow-hidden',
            selectedEntry && 'border-r border-[var(--color-border-subtle)]'
          )}
        >
          {entries.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center py-12 px-8 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border-subtle)]">
                <svg className="w-16 h-16 mx-auto text-[var(--color-text-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <h2 className="font-heading text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                  No Entries Yet
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
                  Add some entries to see them on your timeline.
                </p>
              </div>
            </div>
          ) : (
            <TimelineCanvas
              entries={entries}
              onSelectEntry={handleSelectEntry}
              selectedEntryId={selectedEntry?.entry_id}
            />
          )}
        </div>

        {/* Reader Panel */}
        {selectedEntry && (
          <div className="w-1/2 overflow-hidden">
            <EntryReader
              entry={selectedEntry}
              onClose={handleCloseReader}
              onNavigate={handleNavigate}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="px-6 py-3 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)]">
        <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
          <span>{entries.length} entries on timeline</span>
          {entries.length > 0 && (
            <>
              <span>|</span>
              <span>Click markers to read entries</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

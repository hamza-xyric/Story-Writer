// Mind view - Constellation visualization of themes and quotes

import { useState } from 'react';
import { useMindData } from '../../data/mindData';
import { MindCanvas } from '../../components/mind';
import { Card } from '../../components/primitives';
import type { Entry } from '../../types';

export function Mind() {
  const mindData = useMindData();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const themeEntries = selectedTheme ? mindData.getEntriesForTheme(selectedTheme) : [];

  const handleClosePanel = () => {
    setSelectedTheme(null);
  };

  return (
    <div className="h-screen flex">
      {/* Full-screen canvas */}
      <div className="flex-1 relative">
        <MindCanvas
          data={mindData}
          onSelectTheme={setSelectedTheme}
          selectedTheme={selectedTheme}
        />

        {/* Floating header */}
        <div className="absolute top-6 left-6 pointer-events-none">
          <h1 className="font-heading text-2xl font-semibold text-white/90">
            Explore the Mind
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Your thoughts as constellations
          </p>
        </div>

        {/* Theme count indicator */}
        <div className="absolute top-6 right-6 text-sm text-white/50 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {mindData.nodes.length} themes · {mindData.quotes.length} fragments
        </div>
      </div>

      {/* Side panel: Entry previews when theme selected */}
      {selectedTheme && (
        <div className="w-96 border-l border-white/10 bg-[var(--color-surface-primary)] overflow-y-auto animate-slide-in-right">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-xl font-semibold text-[var(--color-text-primary)]">
                  {selectedTheme}
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  {themeEntries.length} {themeEntries.length === 1 ? 'entry' : 'entries'}
                </p>
              </div>
              <button
                onClick={handleClosePanel}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-2xl leading-none"
                aria-label="Close panel"
              >
                &times;
              </button>
            </div>

            {/* Entry cards */}
            {themeEntries.length === 0 ? (
              <Card variant="outlined" padding="lg">
                <p className="text-center text-[var(--color-text-muted)]">
                  No entries found for this theme.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {themeEntries.map((entry, index) => (
                  <div
                    key={entry.entry_id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <EntryPreviewCard entry={entry} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Entry preview card component
function EntryPreviewCard({ entry }: { entry: Entry }) {
  // Truncate content for preview
  const preview = entry.content.slice(0, 150).trim();
  const needsEllipsis = entry.content.length > 150;

  return (
    <Card variant="default" padding="md" interactive>
      <h3 className="font-heading font-semibold text-[var(--color-text-primary)]">
        {entry.title}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] mt-1">
        {entry.time_period}
      </p>
      <p className="text-sm text-[var(--color-text-secondary)] mt-3 leading-relaxed">
        {preview}{needsEllipsis && '...'}
      </p>

      {/* Theme tags */}
      {entry.themes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {entry.themes.slice(0, 3).map(theme => (
            <span
              key={theme}
              className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]"
            >
              {theme}
            </span>
          ))}
          {entry.themes.length > 3 && (
            <span className="text-xs text-[var(--color-text-muted)]">
              +{entry.themes.length - 3} more
            </span>
          )}
        </div>
      )}
    </Card>
  );
}

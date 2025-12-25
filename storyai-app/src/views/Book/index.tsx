// Book - main view for the book structure and chapters

import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks, useChapters, useData } from '../../data';
import { PageHeader } from '../../components/layout';
import { ChapterList, BookProgressBar, ExportModal, LifePhaseTimeline } from '../../components/book';
import { Card, Tag, Button } from '../../components/primitives';
import { cn } from '../../utils';
import type { Chapter, Entry } from '../../types';

export function Book() {
  const navigate = useNavigate();
  const books = useBooks();
  const chapters = useChapters();
  const { getUnassignedEntries, entries } = useData();

  const [showExportModal, setShowExportModal] = useState(false);

  const handleSelectChapter = useCallback((chapter: Chapter) => {
    navigate(`/book/read/${chapter.chapter_id}`);
  }, [navigate]);

  // Get the first (and likely only) book
  const book = books[0];
  const bookChapters = useMemo(
    () => (book ? chapters.filter(c => c.book_id === book.book_id) : []),
    [book, chapters]
  );
  const unassignedEntries = useMemo(
    () => (book ? getUnassignedEntries(book.book_id) : []),
    [book, getUnassignedEntries]
  );

  // Calculate book stats
  const stats = useMemo(() => {
    const totalWords = bookChapters.reduce((sum, c) => sum + c.current_word_count, 0);
    const totalEntries = bookChapters.reduce((sum, c) => sum + c.entries.length, 0);
    const allCharacters = new Set(bookChapters.flatMap(c => c.characters));
    const allLocations = new Set(bookChapters.flatMap(c => c.locations));
    const allThemes = new Set(bookChapters.flatMap(c => c.themes));

    return {
      totalWords,
      totalEntries,
      totalChapters: bookChapters.length,
      totalCharacters: allCharacters.size,
      totalLocations: allLocations.size,
      totalThemes: allThemes.size,
    };
  }, [bookChapters]);

  if (!book) {
    return (
      <div className="h-screen flex flex-col">
        <PageHeader
          title="Book"
          subtitle="No book created yet"
        />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-lg">
            {/* Animated book icon */}
            <div className="mb-8 animate-fade-in">
              <div className={cn(
                'w-24 h-24 mx-auto rounded-2xl',
                'bg-gradient-to-br from-[var(--color-accent-terracotta)]/20 to-[var(--color-accent-dusty-rose)]/20',
                'flex items-center justify-center',
                'border border-[var(--color-border-subtle)]'
              )}>
                <svg
                  className="w-12 h-12 text-[var(--color-accent-terracotta)] animate-gentle-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
            </div>

            {/* Title and description */}
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h2 className="text-2xl font-heading font-semibold text-[var(--color-text-primary)] mb-3">
                Begin Your Memoir
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                Transform your memories into a beautifully structured book. Claude will help organize your life story into chapters and phases.
              </p>
            </div>

            {/* Call to action */}
            <div className="animate-fade-in mb-6" style={{ animationDelay: '200ms' }}>
              <div className={cn(
                'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg',
                'bg-[var(--color-accent-terracotta)]/10',
                'border border-[var(--color-accent-terracotta)]/30',
                'text-[var(--color-accent-terracotta)]'
              )}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium">Use</span>
                <code className="px-2 py-0.5 bg-[var(--color-surface-tertiary)] rounded text-sm font-mono">
                  /book-create
                </code>
                <span className="font-medium">to get started</span>
              </div>
            </div>

            {/* Entry count card */}
            {entries.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Card
                  variant="elevated"
                  padding="md"
                  className="inline-block"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      'bg-[var(--color-accent-sage)]/20'
                    )}>
                      <svg className="w-5 h-5 text-[var(--color-accent-sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-semibold text-[var(--color-text-primary)]">
                        {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                      </div>
                      <div className="text-sm text-[var(--color-text-muted)]">
                        ready to organize into chapters
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {entries.length === 0 && (
              <p className="text-sm text-[var(--color-text-muted)] animate-fade-in" style={{ animationDelay: '300ms' }}>
                Start by capturing memories with <code className="px-1.5 py-0.5 bg-[var(--color-surface-tertiary)] rounded">/freeform</code> or <code className="px-1.5 py-0.5 bg-[var(--color-surface-tertiary)] rounded">/biographer</code>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <PageHeader
        title={book.title}
        subtitle={book.subtitle || `${stats.totalChapters} chapters, ${stats.totalWords.toLocaleString()} words`}
        action={
          <Button onClick={() => setShowExportModal(true)}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Export
          </Button>
        }
      />

      <ExportModal
        book={book}
        chapters={bookChapters}
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content - Chapter List */}
        <div className="flex-1 overflow-y-auto p-6">
          <ChapterList
            book={book}
            chapters={bookChapters}
            selectedChapter={null}
            onSelectChapter={handleSelectChapter}
          />
        </div>

        {/* Sidebar - Timeline, Progress & Unassigned */}
        <aside
          className={cn(
            'w-80 border-l border-[var(--color-border-subtle)]',
            'bg-[var(--color-surface-secondary)]',
            'overflow-y-auto'
          )}
        >
          {/* Life Phase Timeline */}
          <section className="p-4 border-b border-[var(--color-border-subtle)]">
            <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-4">
              Life Phases
            </h3>
            <LifePhaseTimeline
              book={book}
              chapters={bookChapters}
            />
          </section>

          {/* Progress Section */}
          <section className="p-4 border-b border-[var(--color-border-subtle)]">
            <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-4">
              Progress
            </h3>
            <BookProgressBar book={book} chapters={bookChapters} />
          </section>

          {/* Book Stats */}
          <section className="p-4 border-b border-[var(--color-border-subtle)]">
            <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-3">
              Stats
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Chapters" value={stats.totalChapters} />
              <StatCard label="Entries" value={stats.totalEntries} />
              <StatCard label="Words" value={stats.totalWords.toLocaleString()} />
              <StatCard label="Characters" value={stats.totalCharacters} />
            </div>
          </section>

          {/* Unassigned Entries */}
          <section className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-[var(--color-text-primary)]">
                Unassigned Entries
              </h3>
              <Tag variant="default" size="sm">
                {unassignedEntries.length}
              </Tag>
            </div>

            {unassignedEntries.length > 0 ? (
              <div className="space-y-2">
                {unassignedEntries.map(entry => (
                  <UnassignedEntryCard key={entry.entry_id} entry={entry} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--color-text-muted)] text-center py-4">
                All entries are assigned to chapters
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}

// Small stat card component
function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[var(--color-surface-elevated)] rounded-lg p-3">
      <div className="text-lg font-semibold text-[var(--color-text-primary)]">{value}</div>
      <div className="text-xs text-[var(--color-text-muted)]">{label}</div>
    </div>
  );
}

// Unassigned entry card
function UnassignedEntryCard({ entry }: { entry: Entry }) {
  return (
    <Card variant="outlined" padding="sm" className="cursor-pointer hover:bg-[var(--color-surface-tertiary)]">
      <div className="text-sm font-medium text-[var(--color-text-primary)] line-clamp-1">
        {entry.title || 'Untitled'}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-[var(--color-text-muted)]">{entry.time_period}</span>
        <span className="text-xs text-[var(--color-text-muted)]">{entry.word_count} words</span>
      </div>
    </Card>
  );
}

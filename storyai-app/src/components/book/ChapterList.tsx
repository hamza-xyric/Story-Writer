// ChapterList - list of chapters organized by life phase

import type { Book, Chapter, LifePhase } from '../../types';
import { ChapterCard } from './ChapterCard';
import { cn } from '../../utils';

interface ChapterListProps {
  book: Book;
  chapters: Chapter[];
  selectedChapter: Chapter | null;
  onSelectChapter: (chapter: Chapter) => void;
}

interface PhaseWithChapters {
  phase: LifePhase;
  chapters: Chapter[];
}

export function ChapterList({ book, chapters, selectedChapter, onSelectChapter }: ChapterListProps) {
  // Group chapters by life phase
  const phaseGroups: PhaseWithChapters[] = book.life_phases
    .sort((a, b) => a.order - b.order)
    .map(phase => ({
      phase,
      chapters: chapters
        .filter(c => phase.chapters.includes(c.chapter_id))
        .sort((a, b) => a.chapter_number - b.chapter_number),
    }));

  // Calculate stats per phase
  const getPhaseStats = (phaseChapters: Chapter[]) => {
    const totalWords = phaseChapters.reduce((sum, c) => sum + c.current_word_count, 0);
    const totalEntries = phaseChapters.reduce((sum, c) => sum + c.entries.length, 0);
    return { totalWords, totalEntries };
  };

  return (
    <div className="space-y-8">
      {phaseGroups.map(({ phase, chapters: phaseChapters }) => {
        const stats = getPhaseStats(phaseChapters);
        const hasChapters = phaseChapters.length > 0;

        return (
          <section key={phase.phase_id}>
            {/* Phase Header */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <h2 className="font-heading text-lg font-semibold text-[var(--color-text-primary)]">
                  {phase.name}
                </h2>
                <span className="text-sm text-[var(--color-text-muted)]">
                  {phase.period_start} - {phase.period_end}
                </span>
              </div>
              {phase.description && (
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  {phase.description}
                </p>
              )}
              {hasChapters && (
                <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-text-muted)]">
                  <span>{phaseChapters.length} chapter{phaseChapters.length !== 1 ? 's' : ''}</span>
                  <span>{stats.totalEntries} entries</span>
                  <span>{stats.totalWords.toLocaleString()} words</span>
                </div>
              )}
            </div>

            {/* Chapter Cards */}
            {hasChapters ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phaseChapters.map((chapter, index) => (
                  <div
                    key={chapter.chapter_id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ChapterCard
                      chapter={chapter}
                      onSelect={onSelectChapter}
                      isSelected={selectedChapter?.chapter_id === chapter.chapter_id}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={cn(
                  'py-10 px-6 rounded-xl',
                  'bg-[var(--color-surface-secondary)]',
                  'border border-dashed border-[var(--color-border-default)]',
                  'text-center',
                  'animate-fade-in'
                )}
              >
                {/* Icon container */}
                <div className="mb-4">
                  <div className={cn(
                    'w-14 h-14 mx-auto rounded-xl',
                    'bg-[var(--color-surface-tertiary)]',
                    'flex items-center justify-center',
                    'border border-[var(--color-border-subtle)]'
                  )}>
                    <svg
                      className="w-7 h-7 text-[var(--color-text-muted)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                </div>

                {/* Context-aware message */}
                <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  No chapters in "{phase.name}"
                </h4>
                <p className="text-xs text-[var(--color-text-muted)] mb-4 max-w-xs mx-auto">
                  This life phase ({phase.period_start}–{phase.period_end}) doesn't have any chapters yet.
                </p>

                {/* Command hint */}
                <div className={cn(
                  'inline-flex items-center gap-2 px-3 py-1.5 rounded-md',
                  'bg-[var(--color-surface-tertiary)]',
                  'text-xs text-[var(--color-text-muted)]'
                )}>
                  <span>Use</span>
                  <code className="px-1.5 py-0.5 bg-[var(--color-surface-elevated)] rounded font-mono">
                    /book add-chapter
                  </code>
                  <span>to add one</span>
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

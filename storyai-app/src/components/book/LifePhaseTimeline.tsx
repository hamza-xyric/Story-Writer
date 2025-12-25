// LifePhaseTimeline - vertical timeline of life phases in the book

import { useMemo } from 'react';
import type { LifePhase, Book } from '../../types';
import type { Chapter } from '../../types/chapter';
import { cn } from '../../utils';

interface LifePhaseTimelineProps {
  book: Book;
  chapters: Chapter[];
  onPhaseClick?: (phase: LifePhase) => void;
  highlightedPhaseId?: string;
}

// Get the dominant status for a phase based on its chapters
function getPhaseStatus(phaseChapters: Chapter[]): 'complete' | 'partial' | 'outline' | 'empty' {
  if (phaseChapters.length === 0) return 'empty';

  const statuses = phaseChapters.map(c => c.status);

  // If all chapters are complete/revised, phase is complete
  if (statuses.every(s => s === 'complete' || s === 'revised')) {
    return 'complete';
  }

  // If any chapter has content (drafting, review, revised, complete), it's partial
  if (statuses.some(s => s !== 'outline')) {
    return 'partial';
  }

  // Otherwise it's just outlined
  return 'outline';
}

// Map status to color classes for the marker
const statusColors: Record<string, string> = {
  complete: 'bg-[var(--color-detailed)]',
  partial: 'bg-[var(--color-partial)]',
  outline: 'bg-[var(--color-brief)]',
  empty: 'bg-[var(--color-text-muted)]',
};

export function LifePhaseTimeline({
  book,
  chapters,
  onPhaseClick,
  highlightedPhaseId,
}: LifePhaseTimelineProps) {
  // Calculate phase data with chapters
  const phaseData = useMemo(() => {
    return book.life_phases
      .sort((a, b) => a.order - b.order)
      .map(phase => {
        const phaseChapters = chapters.filter(c =>
          phase.chapters.includes(c.chapter_id)
        );
        const status = getPhaseStatus(phaseChapters);
        const wordCount = phaseChapters.reduce((sum, c) => sum + c.current_word_count, 0);

        return {
          phase,
          chapters: phaseChapters,
          status,
          wordCount,
          chapterCount: phaseChapters.length,
        };
      });
  }, [book.life_phases, chapters]);

  // If no phases, show empty state
  if (phaseData.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-[var(--color-text-muted)]">
        No life phases defined yet
      </div>
    );
  }

  return (
    <div className="relative pl-4">
      {/* Vertical line */}
      <div
        className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-[var(--color-border-default)]"
        aria-hidden="true"
      />

      {/* Phases */}
      <div className="space-y-3">
        {phaseData.map(({ phase, status, chapterCount }) => {
          const isHighlighted = highlightedPhaseId === phase.phase_id;

          return (
            <button
              key={phase.phase_id}
              onClick={() => onPhaseClick?.(phase)}
              className={cn(
                'relative w-full text-left group',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-terracotta)] focus-visible:ring-offset-2 rounded-lg'
              )}
            >
              {/* Marker */}
              <div
                className={cn(
                  'absolute left-0 w-3.5 h-3.5 rounded-full',
                  'transition-transform duration-150',
                  'group-hover:scale-125',
                  statusColors[status],
                  isHighlighted && 'ring-2 ring-[var(--color-accent-terracotta)] ring-offset-2'
                )}
                style={{
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />

              {/* Card */}
              <div
                className={cn(
                  'ml-6 p-3 rounded-lg',
                  'bg-[var(--color-surface-elevated)]',
                  'border border-[var(--color-border-subtle)]',
                  'transition-shadow duration-150',
                  'group-hover:shadow-[var(--shadow-sm)]',
                  isHighlighted && 'border-[var(--color-accent-terracotta)] shadow-[var(--shadow-sm)]'
                )}
              >
                {/* Phase name */}
                <div
                  className={cn(
                    'font-medium text-sm',
                    isHighlighted
                      ? 'text-[var(--color-accent-terracotta)]'
                      : 'text-[var(--color-text-primary)]'
                  )}
                >
                  {phase.name}
                </div>

                {/* Period and chapter count */}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {phase.period_start} – {phase.period_end}
                  </span>
                  <span
                    className={cn(
                      'text-xs px-1.5 py-0.5 rounded-full',
                      chapterCount > 0
                        ? 'bg-[var(--color-accent-terracotta)]/10 text-[var(--color-accent-terracotta)]'
                        : 'bg-[var(--color-surface-tertiary)] text-[var(--color-text-muted)]'
                    )}
                  >
                    {chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

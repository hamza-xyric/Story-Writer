// LifePhaseTimeline - visual timeline of life phases in the book

import { useMemo } from 'react';
import type { LifePhase, Book } from '../../types';
import type { Chapter, ChapterStatus } from '../../types/chapter';
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

// Map status to color classes
const statusColors: Record<string, { bg: string; border: string; dot: string }> = {
  complete: {
    bg: 'bg-[var(--color-detailed)]',
    border: 'border-[var(--color-detailed)]',
    dot: 'bg-[var(--color-detailed)]',
  },
  partial: {
    bg: 'bg-[var(--color-partial)]',
    border: 'border-[var(--color-partial)]',
    dot: 'bg-[var(--color-partial)]',
  },
  outline: {
    bg: 'bg-[var(--color-brief)]/50',
    border: 'border-[var(--color-brief)]',
    dot: 'bg-[var(--color-brief)]',
  },
  empty: {
    bg: 'bg-[var(--color-surface-tertiary)]',
    border: 'border-[var(--color-border-default)]',
    dot: 'bg-[var(--color-text-muted)]',
  },
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

  // Calculate total words for proportional widths
  const totalWords = useMemo(() => {
    const total = phaseData.reduce((sum, p) => sum + p.wordCount, 0);
    return total > 0 ? total : 1; // Avoid division by zero
  }, [phaseData]);

  // If no phases, show empty state
  if (phaseData.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-[var(--color-text-muted)]">
        No life phases defined yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Timeline bar */}
      <div className="relative">
        <div className="flex h-8 rounded-full overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-surface-tertiary)]">
          {phaseData.map(({ phase, status, wordCount, chapterCount }, index) => {
            // Calculate width - minimum 15% to be visible, proportional to word count
            const minWidth = 15;
            const proportionalWidth = (wordCount / totalWords) * 100;
            const width = Math.max(minWidth, proportionalWidth);
            const colors = statusColors[status];
            const isHighlighted = highlightedPhaseId === phase.phase_id;

            return (
              <button
                key={phase.phase_id}
                onClick={() => onPhaseClick?.(phase)}
                className={cn(
                  'relative h-full transition-all duration-normal',
                  'hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-terracotta)] focus-visible:ring-offset-2',
                  colors.bg,
                  isHighlighted && 'ring-2 ring-[var(--color-accent-terracotta)] ring-offset-1',
                  // Add separator between phases
                  index > 0 && 'border-l border-white/30'
                )}
                style={{ width: `${width}%` }}
                title={`${phase.name}: ${chapterCount} chapter${chapterCount !== 1 ? 's' : ''}`}
              >
                {/* Chapter dots */}
                {chapterCount > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center gap-1 px-1">
                    {Array.from({ length: Math.min(chapterCount, 5) }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          'bg-white/70'
                        )}
                      />
                    ))}
                    {chapterCount > 5 && (
                      <span className="text-[10px] text-white/80 font-medium">
                        +{chapterCount - 5}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Phase labels */}
      <div className="flex text-xs">
        {phaseData.map(({ phase, status, chapterCount }) => {
          const colors = statusColors[status];
          const isHighlighted = highlightedPhaseId === phase.phase_id;

          // Calculate width to match the bar segments above
          const wordCount = phaseData.find(p => p.phase.phase_id === phase.phase_id)?.wordCount || 0;
          const minWidth = 15;
          const proportionalWidth = (wordCount / totalWords) * 100;
          const width = Math.max(minWidth, proportionalWidth);

          return (
            <div
              key={phase.phase_id}
              className="text-center overflow-hidden"
              style={{ width: `${width}%` }}
            >
              <div
                className={cn(
                  'font-medium truncate px-1',
                  isHighlighted
                    ? 'text-[var(--color-accent-terracotta)]'
                    : 'text-[var(--color-text-secondary)]'
                )}
                title={phase.name}
              >
                {phase.name}
              </div>
              <div className="text-[var(--color-text-muted)] truncate">
                {phase.period_start}–{phase.period_end}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-1.5">
          <div className={cn('w-2.5 h-2.5 rounded-full', statusColors.complete.bg)} />
          <span>Complete</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn('w-2.5 h-2.5 rounded-full', statusColors.partial.bg)} />
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn('w-2.5 h-2.5 rounded-full', statusColors.outline.bg)} />
          <span>Outlined</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn('w-2.5 h-2.5 rounded-full', statusColors.empty.bg)} />
          <span>Empty</span>
        </div>
      </div>
    </div>
  );
}

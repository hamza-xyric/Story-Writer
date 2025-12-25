// BookProgressBar - visual completion indicator for book progress

import type { Book, Chapter } from '../../types';
import { cn } from '../../utils';

interface BookProgressBarProps {
  book: Book;
  chapters: Chapter[];
  className?: string;
}

export function BookProgressBar({ book, chapters, className }: BookProgressBarProps) {
  const totalWords = chapters.reduce((sum, c) => sum + c.current_word_count, 0);
  const targetWords = book.target_word_count || 80000;
  const wordPercentage = Math.min(Math.round((totalWords / targetWords) * 100), 100);

  // Calculate chapter progress
  const totalChapters = chapters.length;
  const completedChapters = chapters.filter(c => c.status === 'complete').length;

  // Status breakdown
  const statusCounts = {
    outline: chapters.filter(c => c.status === 'outline').length,
    drafting: chapters.filter(c => c.status === 'drafting').length,
    review: chapters.filter(c => c.status === 'review').length,
    revised: chapters.filter(c => c.status === 'revised').length,
    complete: chapters.filter(c => c.status === 'complete').length,
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Word Count Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--color-text-primary)]">
            Word Progress
          </span>
          <span className="text-sm text-[var(--color-text-muted)]">
            {totalWords.toLocaleString()} / {targetWords.toLocaleString()}
          </span>
        </div>
        <div className="h-3 bg-[var(--color-surface-tertiary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-accent-terracotta)] to-[var(--color-accent-dusty-rose)] rounded-full transition-all duration-500"
            style={{ width: `${wordPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-[var(--color-text-muted)]">
          <span>{wordPercentage}% complete</span>
          <span>{(targetWords - totalWords).toLocaleString()} words to go</span>
        </div>
      </div>

      {/* Chapter Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--color-text-primary)]">
            Chapters
          </span>
          <span className="text-sm text-[var(--color-text-muted)]">
            {completedChapters} / {totalChapters} complete
          </span>
        </div>

        {/* Segmented progress bar */}
        <div className="h-3 bg-[var(--color-surface-tertiary)] rounded-full overflow-hidden flex">
          {totalChapters > 0 && (
            <>
              {/* Complete segments */}
              {statusCounts.complete > 0 && (
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${(statusCounts.complete / totalChapters) * 100}%` }}
                  title={`${statusCounts.complete} complete`}
                />
              )}
              {/* Revised segments */}
              {statusCounts.revised > 0 && (
                <div
                  className="h-full bg-[var(--color-detailed)]"
                  style={{ width: `${(statusCounts.revised / totalChapters) * 100}%` }}
                  title={`${statusCounts.revised} revised`}
                />
              )}
              {/* Review segments */}
              {statusCounts.review > 0 && (
                <div
                  className="h-full bg-amber-500"
                  style={{ width: `${(statusCounts.review / totalChapters) * 100}%` }}
                  title={`${statusCounts.review} in review`}
                />
              )}
              {/* Drafting segments */}
              {statusCounts.drafting > 0 && (
                <div
                  className="h-full bg-[var(--color-partial)]"
                  style={{ width: `${(statusCounts.drafting / totalChapters) * 100}%` }}
                  title={`${statusCounts.drafting} drafting`}
                />
              )}
              {/* Outline segments (subtle) */}
              {statusCounts.outline > 0 && (
                <div
                  className="h-full bg-[var(--color-brief)]/30"
                  style={{ width: `${(statusCounts.outline / totalChapters) * 100}%` }}
                  title={`${statusCounts.outline} outlined`}
                />
              )}
            </>
          )}
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap gap-3 mt-2">
          {statusCounts.complete > 0 && (
            <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{statusCounts.complete} complete</span>
            </div>
          )}
          {statusCounts.revised > 0 && (
            <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-detailed)]" />
              <span>{statusCounts.revised} revised</span>
            </div>
          )}
          {statusCounts.review > 0 && (
            <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{statusCounts.review} review</span>
            </div>
          )}
          {statusCounts.drafting > 0 && (
            <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-partial)]" />
              <span>{statusCounts.drafting} drafting</span>
            </div>
          )}
          {statusCounts.outline > 0 && (
            <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brief)]" />
              <span>{statusCounts.outline} outlined</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

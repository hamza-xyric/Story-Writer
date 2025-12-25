// ChapterCard - card representation of a chapter

import type { Chapter, ChapterStatus } from '../../types';
import { Card, Tag } from '../primitives';
import { cn } from '../../utils';

interface ChapterCardProps {
  chapter: Chapter;
  onSelect: (chapter: Chapter) => void;
  isSelected?: boolean;
  entriesCount?: number;
}

const statusConfig: Record<ChapterStatus, { label: string; className: string }> = {
  outline: {
    label: 'Outline',
    className: 'bg-[var(--color-brief)]/10 text-[var(--color-brief)]',
  },
  drafting: {
    label: 'Drafting',
    className: 'bg-[var(--color-partial)]/10 text-[var(--color-partial)]',
  },
  review: {
    label: 'Review',
    className: 'bg-amber-500/10 text-amber-600',
  },
  revised: {
    label: 'Revised',
    className: 'bg-[var(--color-detailed)]/10 text-[var(--color-detailed)]',
  },
  complete: {
    label: 'Complete',
    className: 'bg-emerald-500/10 text-emerald-600',
  },
};

export function ChapterCard({ chapter, onSelect, isSelected, entriesCount }: ChapterCardProps) {
  const status = statusConfig[chapter.status];
  const progress = chapter.target_word_count > 0
    ? Math.round((chapter.current_word_count / chapter.target_word_count) * 100)
    : 0;

  return (
    <Card
      variant="asymmetric"
      padding="md"
      interactive
      selected={isSelected}
      onClick={() => onSelect(chapter)}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-[var(--color-accent-terracotta)]">
                Chapter {chapter.chapter_number}
              </span>
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', status.className)}>
                {status.label}
              </span>
            </div>
            <h3 className="font-heading font-semibold text-[var(--color-text-primary)] leading-tight">
              {chapter.title}
            </h3>
            {chapter.subtitle && (
              <p className="text-sm text-[var(--color-text-muted)] mt-0.5 italic">
                {chapter.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Narrative Arc Preview */}
      {chapter.narrative_arc.opening_hook && (
        <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
          "{chapter.narrative_arc.opening_hook}"
        </p>
      )}

      {/* Themes */}
      {chapter.themes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {chapter.themes.slice(0, 3).map((theme) => (
            <Tag key={theme} variant="theme" size="sm">
              {theme}
            </Tag>
          ))}
          {chapter.themes.length > 3 && (
            <Tag variant="default" size="sm">
              +{chapter.themes.length - 3}
            </Tag>
          )}
        </div>
      )}

      {/* Progress Bar (if drafting or beyond) */}
      {chapter.status !== 'outline' && chapter.target_word_count > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-1">
            <span>{chapter.current_word_count.toLocaleString()} words</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-[var(--color-surface-tertiary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-accent-terracotta)] rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
          {/* Entries count */}
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            {entriesCount ?? chapter.entries.length} entries
          </span>

          {/* Characters count */}
          {chapter.characters.length > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              {chapter.characters.length}
            </span>
          )}
        </div>

        {/* Time period */}
        <span className="text-xs text-[var(--color-text-muted)]">
          {chapter.time_period.start}
          {chapter.time_period.end && chapter.time_period.end !== chapter.time_period.start &&
            ` - ${chapter.time_period.end}`}
        </span>
      </div>
    </Card>
  );
}

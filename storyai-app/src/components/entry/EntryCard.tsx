// EntryCard - card representation of an entry for the corkboard

import type { Entry } from '../../types';
import { Card, Tag } from '../primitives';
import { cn, formatDateShort } from '../../utils';

interface EntryCardProps {
  entry: Entry;
  onSelect: (entry: Entry) => void;
  isSelected?: boolean;
  showPreview?: boolean;
}

export function EntryCard({ entry, onSelect, isSelected, showPreview = true }: EntryCardProps) {
  const previewText = entry.content.slice(0, 120).trim() + (entry.content.length > 120 ? '...' : '');

  return (
    <Card
      variant="asymmetric"
      padding="md"
      interactive
      selected={isSelected}
      onClick={() => onSelect(entry)}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="mb-3">
        <h3 className="font-heading font-semibold text-[var(--color-text-primary)] leading-tight truncate-2">
          {entry.title || 'Untitled'}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-sm text-[var(--color-text-muted)]">
          <span>{entry.time_period}</span>
          <span className="text-[var(--color-border-strong)]">·</span>
          <span>{formatDateShort(entry.date_written)}</span>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <p className="text-sm text-[var(--color-text-secondary)] truncate-3 mb-3 flex-1">
          {previewText}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {entry.themes.slice(0, 2).map((theme) => (
          <Tag key={theme} variant="theme" size="sm">
            {theme}
          </Tag>
        ))}
        {entry.emotion_tags.slice(0, 2).map((tag) => (
          <Tag key={tag} variant="emotion" size="sm">
            {tag}
          </Tag>
        ))}
        {(entry.themes.length + entry.emotion_tags.length > 4) && (
          <Tag variant="default" size="sm">
            +{entry.themes.length + entry.emotion_tags.length - 4}
          </Tag>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border-subtle)]">
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
        <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          {entry.word_count.toLocaleString()}
        </span>
      </div>
    </Card>
  );
}

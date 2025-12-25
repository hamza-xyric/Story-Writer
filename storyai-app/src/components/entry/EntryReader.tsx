// EntryReader - full reading experience for an entry

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Entry } from '../../types';
import { Tag, Button } from '../primitives';
import { cn, formatDate } from '../../utils';

interface EntryReaderProps {
  entry: Entry;
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function EntryReader({
  entry,
  onClose,
  onNavigate,
  hasPrev,
  hasNext,
}: EntryReaderProps) {
  const [showAINotes, setShowAINotes] = useState(false);

  return (
    <div className="h-full flex flex-col bg-[var(--color-surface-elevated)] animate-slide-in-right">
      {/* Header */}
      <header className="flex-shrink-0 px-8 py-6 border-b border-[var(--color-border-subtle)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="font-heading text-2xl font-semibold text-[var(--color-text-primary)] leading-tight">
              {entry.title || 'Untitled'}
            </h2>
            <div className="flex items-center gap-3 mt-2 text-sm text-[var(--color-text-muted)]">
              <span className="font-medium text-[var(--color-text-secondary)]">
                {entry.time_period}
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]" />
              <span>Written {formatDate(entry.date_written)}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]" />
              <span>{entry.word_count.toLocaleString()} words</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={cn(
              'p-2 rounded-lg',
              'text-[var(--color-text-muted)]',
              'hover:bg-[var(--color-surface-tertiary)]',
              'hover:text-[var(--color-text-primary)]',
              'transition-colors'
            )}
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {entry.themes.map((theme) => (
            <Tag key={theme} variant="theme">
              {theme}
            </Tag>
          ))}
          {entry.emotion_tags.map((tag) => (
            <Tag key={tag} variant="emotion">
              {tag}
            </Tag>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <article className="px-8 py-8 max-w-[var(--reader-max-width)] mx-auto">
          <div className="prose-journal">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {entry.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* AI Notes */}
        {entry.ai_notes && (
          <div className="px-8 py-6 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-secondary)]">
            <button
              onClick={() => setShowAINotes(!showAINotes)}
              className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              <svg
                className={cn('w-4 h-4 transition-transform', showAINotes && 'rotate-90')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              AI Notes
            </button>

            {showAINotes && (
              <div className="mt-4 space-y-4 animate-fade-in">
                {entry.ai_notes.questions_to_explore.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                      Questions to Explore
                    </h4>
                    <ul className="space-y-1">
                      {entry.ai_notes.questions_to_explore.map((q, i) => (
                        <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                          <span className="text-[var(--color-accent-terracotta)]">?</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.ai_notes.connections_found.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                      Connections Found
                    </h4>
                    <ul className="space-y-1">
                      {entry.ai_notes.connections_found.map((c, i) => (
                        <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                          <span className="text-[var(--color-accent-sage)]">→</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.ai_notes.consistency_flags.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                      Consistency Flags
                    </h4>
                    <ul className="space-y-1">
                      {entry.ai_notes.consistency_flags.map((f, i) => (
                        <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                          <span className="text-[var(--color-accent-golden)]">!</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      {onNavigate && (hasPrev || hasNext) && (
        <footer className="flex-shrink-0 px-8 py-4 border-t border-[var(--color-border-subtle)] flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            disabled={!hasPrev}
            onClick={() => onNavigate('prev')}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            }
          >
            Previous
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={!hasNext}
            onClick={() => onNavigate('next')}
            rightIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            }
          >
            Next
          </Button>
        </footer>
      )}
    </div>
  );
}

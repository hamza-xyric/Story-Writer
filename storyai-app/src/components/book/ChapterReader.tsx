// ChapterReader - continuous reading experience for a chapter

import { useEffect, useCallback, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Chapter, Entry } from '../../types';
import { Tag, Button } from '../primitives';
import { cn } from '../../utils';

interface ChapterReaderProps {
  chapter: Chapter;
  entries: Entry[];
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function ChapterReader({
  chapter,
  entries,
  onClose,
  onNavigate,
  hasPrev,
  hasNext,
}: ChapterReaderProps) {
  // Scroll progress tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll > 0) {
      const progress = (scrollTop / maxScroll) * 100;
      setScrollProgress(Math.min(progress, 100));

      if (!hasScrolled && scrollTop > 10) {
        setHasScrolled(true);
      }
    }
  }, [hasScrolled]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!onNavigate) return;

      if ((e.key === 'ArrowLeft' || e.key === 'k') && hasPrev) {
        onNavigate('prev');
      } else if ((e.key === 'ArrowRight' || e.key === 'j') && hasNext) {
        onNavigate('next');
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [onNavigate, onClose, hasPrev, hasNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Reset scroll progress when chapter changes
  useEffect(() => {
    setScrollProgress(0);
    setHasScrolled(false);
    scrollContainerRef.current?.scrollTo(0, 0);
  }, [chapter.chapter_id]);

  const totalWords = entries.reduce((sum, e) => sum + e.word_count, 0);
  const estimatedReadTime = Math.ceil(totalWords / 200); // ~200 wpm reading speed

  return (
    <div className="h-full flex flex-col bg-[var(--color-surface-elevated)] animate-slide-in-right">
      {/* Header */}
      <header className="flex-shrink-0 px-8 py-6 border-b border-[var(--color-border-subtle)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-[var(--color-accent-terracotta)]">
                Chapter {chapter.chapter_number}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-surface-tertiary)] text-[var(--color-text-muted)]">
                {chapter.status}
              </span>
            </div>
            <h2 className="font-heading text-2xl font-semibold text-[var(--color-text-primary)] leading-tight">
              {chapter.title}
            </h2>
            {chapter.subtitle && (
              <p className="text-[var(--color-text-secondary)] italic mt-1">
                {chapter.subtitle}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2 text-sm text-[var(--color-text-muted)]">
              <span>{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]" />
              <span>{totalWords.toLocaleString()} words</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]" />
              <span>{estimatedReadTime} min read</span>
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

        {/* Themes */}
        {chapter.themes.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {chapter.themes.map((theme) => (
              <Tag key={theme} variant="theme">
                {theme}
              </Tag>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto relative"
      >
        {/* Scroll Progress Bar */}
        <div
          className={cn(
            'sticky top-0 left-0 right-0 h-[3px] z-10',
            'transition-opacity duration-normal',
            hasScrolled ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden="true"
        >
          <div
            className="h-full bg-gradient-to-r from-[var(--color-accent-terracotta)] to-[var(--color-accent-dusty-rose)]"
            style={{
              width: `${scrollProgress}%`,
              transition: 'width 100ms ease-out',
            }}
          />
        </div>

        {/* Chapter Opening */}
        {chapter.narrative_arc.opening_hook && (
          <div className="px-8 py-6 bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-subtle)]">
            <p className="text-lg italic text-[var(--color-text-secondary)] text-center max-w-2xl mx-auto">
              "{chapter.narrative_arc.opening_hook}"
            </p>
          </div>
        )}

        {/* Entries */}
        <div className="px-8 py-8 max-w-[var(--reader-max-width)] mx-auto">
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <article key={entry.entry_id} className="mb-12 last:mb-0">
                {/* Entry header (subtle) */}
                <div className="flex items-center gap-3 mb-4 text-sm text-[var(--color-text-muted)]">
                  <span className="font-medium text-[var(--color-text-secondary)]">
                    {entry.time_period}
                  </span>
                  {entry.title && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]" />
                      <span>{entry.title}</span>
                    </>
                  )}
                </div>

                {/* Entry content */}
                <div className="prose-journal">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {entry.content}
                  </ReactMarkdown>
                </div>

                {/* Entry emotion tags */}
                {entry.emotion_tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {entry.emotion_tags.map((tag) => (
                      <Tag key={tag} variant="emotion" size="sm">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                )}

                {/* Decorative separator between entries */}
                {index < entries.length - 1 && (
                  <div className="flex items-center justify-center my-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-px bg-[var(--color-border-default)]" />
                      <svg className="w-4 h-4 text-[var(--color-accent-terracotta)]/50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4l1.41 1.41L7.83 11H20v2H7.83l5.58 5.59L12 20l-8-8z" transform="rotate(180 12 12)" />
                      </svg>
                      <div className="w-12 h-px bg-[var(--color-border-default)]" />
                    </div>
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[var(--color-text-muted)]">
                No entries in this chapter yet
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mt-2">
                Use <code className="px-1.5 py-0.5 bg-[var(--color-surface-tertiary)] rounded">/book move-entry</code> to add entries
              </p>
            </div>
          )}
        </div>

        {/* Chapter Closing */}
        {chapter.narrative_arc.closing && (
          <div className="px-8 py-6 bg-[var(--color-surface-secondary)] border-t border-[var(--color-border-subtle)]">
            <p className="text-sm italic text-[var(--color-text-muted)] text-center max-w-2xl mx-auto">
              {chapter.narrative_arc.closing}
            </p>
          </div>
        )}

        {/* AI Notes for chapter */}
        {chapter.ai_notes && (chapter.ai_notes.writing_guidance || chapter.ai_notes.tone) && (
          <div className="px-8 py-6 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-secondary)]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
              Chapter Notes
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {chapter.ai_notes.tone && (
                <div>
                  <span className="text-[var(--color-text-muted)]">Tone:</span>{' '}
                  <span className="text-[var(--color-text-secondary)]">{chapter.ai_notes.tone}</span>
                </div>
              )}
              {chapter.ai_notes.pacing && (
                <div>
                  <span className="text-[var(--color-text-muted)]">Pacing:</span>{' '}
                  <span className="text-[var(--color-text-secondary)]">{chapter.ai_notes.pacing}</span>
                </div>
              )}
            </div>
            {chapter.ai_notes.writing_guidance && (
              <p className="text-sm text-[var(--color-text-secondary)] mt-3">
                {chapter.ai_notes.writing_guidance}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      {onNavigate && (hasPrev || hasNext) && (
        <footer className="flex-shrink-0 px-8 py-4 border-t border-[var(--color-border-subtle)] flex justify-between items-center">
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
            Previous Chapter
          </Button>
          <span className="text-xs text-[var(--color-text-muted)]">
            Use ← → or j/k to navigate
          </span>
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
            Next Chapter
          </Button>
        </footer>
      )}
    </div>
  );
}

// ExportModal - modal for exporting book to PDF/EPUB

import { useState, useEffect } from 'react';
import type { Book, Chapter } from '../../types';
import { Button } from '../primitives';
import { cn } from '../../utils';

interface ExportModalProps {
  book: Book;
  chapters: Chapter[];
  isOpen: boolean;
  onClose: () => void;
}

type ExportFormat = 'pdf' | 'epub' | 'both';
type ExportPhase = 'idle' | 'preparing' | 'generating' | 'complete';

interface ExportOptions {
  format: ExportFormat;
  includeTableOfContents: boolean;
  includeCoverPage: boolean;
  chaptersToExport: 'all' | 'complete' | 'custom';
  selectedChapters: string[];
}

const phaseMessages: Record<ExportPhase, string> = {
  idle: '',
  preparing: 'Gathering your memories...',
  generating: 'Creating your memoir...',
  complete: 'Your memoir is ready!',
};

export function ExportModal({ book, chapters, isOpen, onClose }: ExportModalProps) {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeTableOfContents: true,
    includeCoverPage: true,
    chaptersToExport: 'all',
    selectedChapters: chapters.map(c => c.chapter_id),
  });
  const [exportPhase, setExportPhase] = useState<ExportPhase>('idle');
  const [progress, setProgress] = useState(0);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setExportPhase('idle');
      setProgress(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate stats
  const completeChapters = chapters.filter(c => ['revised', 'complete'].includes(c.status));
  const draftChapters = chapters.filter(c => c.status === 'drafting');
  const outlineChapters = chapters.filter(c => c.status === 'outline');

  const selectedChaptersData = options.chaptersToExport === 'all'
    ? chapters
    : options.chaptersToExport === 'complete'
      ? completeChapters
      : chapters.filter(c => options.selectedChapters.includes(c.chapter_id));

  const totalWords = selectedChaptersData.reduce((sum, c) => sum + c.current_word_count, 0);

  const handleExport = async () => {
    // Phase 1: Preparing (0-30%)
    setExportPhase('preparing');
    setProgress(0);

    // Simulate preparation progress
    for (let i = 0; i <= 30; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress(i);
    }

    // Phase 2: Generating (30-90%)
    setExportPhase('generating');

    // Simulate generation progress
    for (let i = 30; i <= 90; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }

    // Phase 3: Complete (100%)
    setProgress(100);
    setExportPhase('complete');
  };

  const handleClose = () => {
    if (exportPhase === 'complete') {
      // Reset and close
      setExportPhase('idle');
      setProgress(0);
    }
    onClose();
  };

  // Render exporting/complete state
  if (exportPhase !== 'idle') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <div
          className={cn(
            'relative z-10 w-full max-w-md',
            'bg-[var(--color-surface-elevated)]',
            'rounded-xl shadow-xl',
            'border border-[var(--color-border-subtle)]',
            'p-8',
            'animate-fade-in'
          )}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            {exportPhase === 'complete' ? (
              // Success checkmark
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-sage)]/20 flex items-center justify-center animate-scale-in">
                <svg
                  className="w-8 h-8 text-[var(--color-accent-sage)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ) : (
              // Book icon with loading animation
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-terracotta)]/20 flex items-center justify-center">
                <svg
                  className={cn(
                    'w-8 h-8 text-[var(--color-accent-terracotta)]',
                    exportPhase === 'preparing' && 'animate-pulse'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Message */}
          <h3 className="text-lg font-heading font-semibold text-[var(--color-text-primary)] text-center mb-2">
            {exportPhase === 'complete' ? 'Export Complete!' : 'Exporting...'}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">
            {phaseMessages[exportPhase]}
          </p>

          {/* Progress bar */}
          {exportPhase !== 'complete' && (
            <div className="mb-6">
              <div className="h-2 bg-[var(--color-surface-tertiary)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-accent-terracotta)] to-[var(--color-accent-dusty-rose)] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-[var(--color-text-muted)] text-center mt-2">
                {progress}% complete
              </p>
            </div>
          )}

          {/* Success details */}
          {exportPhase === 'complete' && (
            <div className="mb-6 p-4 rounded-lg bg-[var(--color-surface-secondary)] border border-[var(--color-border-subtle)]">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-[var(--color-text-muted)]">Format:</span>{' '}
                  <span className="text-[var(--color-text-primary)] font-medium">
                    {options.format === 'both' ? 'PDF + EPUB' : options.format.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)]">Chapters:</span>{' '}
                  <span className="text-[var(--color-text-primary)] font-medium">
                    {selectedChaptersData.length}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)]">Words:</span>{' '}
                  <span className="text-[var(--color-text-primary)] font-medium">
                    {totalWords.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)]">Pages:</span>{' '}
                  <span className="text-[var(--color-text-primary)] font-medium">
                    ~{Math.ceil(totalWords / 250)}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-3 text-center">
                Use <code className="px-1.5 py-0.5 bg-[var(--color-surface-tertiary)] rounded">/export {options.format}</code> in Claude to generate files
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-3">
            {exportPhase === 'complete' ? (
              <>
                <Button variant="ghost" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setExportPhase('idle');
                    setProgress(0);
                  }}
                  className="animate-pulse-glow"
                >
                  Export Another Format
                </Button>
              </>
            ) : (
              <Button variant="ghost" disabled>
                Please wait...
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative z-10 w-full max-w-lg',
          'bg-[var(--color-surface-elevated)]',
          'rounded-xl shadow-xl',
          'border border-[var(--color-border-subtle)]',
          'animate-fade-in'
        )}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border-subtle)]">
          <h2 className="font-heading text-xl font-semibold text-[var(--color-text-primary)]">
            Export Book
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Generate a publishable version of your memoir
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['pdf', 'epub', 'both'] as ExportFormat[]).map(format => (
                <button
                  key={format}
                  onClick={() => setOptions(o => ({ ...o, format }))}
                  className={cn(
                    'px-4 py-3 rounded-lg border text-sm font-medium transition-all',
                    options.format === format
                      ? 'border-[var(--color-accent-terracotta)] bg-[var(--color-accent-terracotta)]/10 text-[var(--color-accent-terracotta)]'
                      : 'border-[var(--color-border-default)] bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                  )}
                >
                  {format === 'both' ? 'PDF + EPUB' : format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Chapters to Export
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="chapters"
                  checked={options.chaptersToExport === 'all'}
                  onChange={() => setOptions(o => ({ ...o, chaptersToExport: 'all' }))}
                  className="w-4 h-4 text-[var(--color-accent-terracotta)]"
                />
                <span className="text-sm text-[var(--color-text-primary)]">
                  All chapters ({chapters.length})
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="chapters"
                  checked={options.chaptersToExport === 'complete'}
                  onChange={() => setOptions(o => ({ ...o, chaptersToExport: 'complete' }))}
                  className="w-4 h-4 text-[var(--color-accent-terracotta)]"
                />
                <span className="text-sm text-[var(--color-text-primary)]">
                  Only revised/complete ({completeChapters.length})
                </span>
              </label>
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Options
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeCoverPage}
                  onChange={e => setOptions(o => ({ ...o, includeCoverPage: e.target.checked }))}
                  className="w-4 h-4 rounded text-[var(--color-accent-terracotta)]"
                />
                <span className="text-sm text-[var(--color-text-primary)]">
                  Include title page
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeTableOfContents}
                  onChange={e => setOptions(o => ({ ...o, includeTableOfContents: e.target.checked }))}
                  className="w-4 h-4 rounded text-[var(--color-accent-terracotta)]"
                />
                <span className="text-sm text-[var(--color-text-primary)]">
                  Include table of contents
                </span>
              </label>
            </div>
          </div>

          {/* Preview Stats */}
          <div className="p-4 rounded-lg bg-[var(--color-surface-secondary)] border border-[var(--color-border-subtle)]">
            <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Export Preview
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[var(--color-text-muted)]">Chapters:</span>{' '}
                <span className="text-[var(--color-text-primary)]">{selectedChaptersData.length}</span>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)]">Words:</span>{' '}
                <span className="text-[var(--color-text-primary)]">{totalWords.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)]">Est. pages:</span>{' '}
                <span className="text-[var(--color-text-primary)]">~{Math.ceil(totalWords / 250)}</span>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)]">Format:</span>{' '}
                <span className="text-[var(--color-text-primary)]">
                  {options.format === 'both' ? 'PDF + EPUB' : options.format.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Warnings */}
            {draftChapters.length > 0 && options.chaptersToExport === 'all' && (
              <div className="mt-3 p-2 rounded bg-amber-500/10 text-amber-700 text-xs">
                {draftChapters.length} chapter(s) still in drafting - consider polishing first
              </div>
            )}
            {outlineChapters.length > 0 && options.chaptersToExport === 'all' && (
              <div className="mt-2 p-2 rounded bg-[var(--color-brief)]/10 text-[var(--color-brief)] text-xs">
                {outlineChapters.length} chapter(s) are outlines only (no prose content)
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--color-border-subtle)] flex justify-between">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={selectedChaptersData.length === 0}
          >
            Export {options.format === 'both' ? 'Both' : options.format.toUpperCase()}
          </Button>
        </div>
      </div>
    </div>
  );
}

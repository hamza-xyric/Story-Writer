// ChapterReaderView - route handler for reading a chapter

import { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../data';
import { ChapterReader } from '../../components/book';
import { PageHeader } from '../../components/layout';

export function ChapterReaderView() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { getChapter, getEntriesForChapter, getChaptersForBook } = useData();

  const chapter = chapterId ? getChapter(chapterId) : undefined;
  const entries = chapterId ? getEntriesForChapter(chapterId) : [];

  // Get all chapters in the same book for navigation
  const bookChapters = useMemo(() => {
    if (!chapter) return [];
    return getChaptersForBook(chapter.book_id);
  }, [chapter, getChaptersForBook]);

  // Find current position and navigation state
  const currentIndex = chapter
    ? bookChapters.findIndex(c => c.chapter_id === chapter.chapter_id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < bookChapters.length - 1;

  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      if (direction === 'prev' && hasPrev) {
        navigate(`/book/read/${bookChapters[currentIndex - 1].chapter_id}`);
      } else if (direction === 'next' && hasNext) {
        navigate(`/book/read/${bookChapters[currentIndex + 1].chapter_id}`);
      }
    },
    [navigate, bookChapters, currentIndex, hasPrev, hasNext]
  );

  const handleClose = useCallback(() => {
    navigate('/book');
  }, [navigate]);

  if (!chapter) {
    return (
      <div className="h-screen flex flex-col">
        <PageHeader
          title="Chapter Not Found"
          subtitle="The requested chapter could not be found"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[var(--color-text-muted)]">
              Chapter ID: {chapterId || 'none'}
            </p>
            <button
              onClick={() => navigate('/book')}
              className="mt-4 px-4 py-2 bg-[var(--color-accent-terracotta)] text-white rounded-lg hover:bg-[var(--color-accent-terracotta)]/90 transition-colors"
            >
              Back to Book
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <ChapterReader
        chapter={chapter}
        entries={entries}
        onClose={handleClose}
        onNavigate={handleNavigate}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </div>
  );
}

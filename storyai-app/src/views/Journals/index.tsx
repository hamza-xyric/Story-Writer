// Journals view with calendar display

import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PageHeader } from '../../components/layout';
import { Card, Tag } from '../../components/primitives';
import { useJournals } from '../../data';
import { cn } from '../../utils';
import type { Journal } from '../../types';

// Mood colors
const moodColors: Record<string, string> = {
  reflective: 'bg-blue-500/20 text-blue-400',
  grateful: 'bg-green-500/20 text-green-400',
  tired: 'bg-gray-500/20 text-gray-400',
  anxious: 'bg-yellow-500/20 text-yellow-400',
  energized: 'bg-orange-500/20 text-orange-400',
  nostalgic: 'bg-purple-500/20 text-purple-400',
  happy: 'bg-pink-500/20 text-pink-400',
  sad: 'bg-indigo-500/20 text-indigo-400',
};

// Book worthy indicator colors
const bookWorthyColors: Record<string, string> = {
  yes: 'bg-green-500',
  maybe: 'bg-yellow-500',
  seed: 'bg-blue-500',
  false: 'bg-gray-500',
};

interface CalendarDayProps {
  date: Date;
  journal: Journal | undefined;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
}

function CalendarDay({ date, journal, isCurrentMonth, isToday, isSelected, onClick }: CalendarDayProps) {
  const dayNumber = date.getDate();

  return (
    <button
      onClick={onClick}
      className={cn(
        'aspect-square p-1 rounded-lg transition-all relative',
        'flex flex-col items-center justify-center gap-0.5',
        'hover:bg-[var(--color-surface-tertiary)]',
        !isCurrentMonth && 'opacity-30',
        isToday && 'ring-2 ring-[var(--color-accent-terracotta)]',
        isSelected && 'bg-[var(--color-accent-terracotta)]/20'
      )}
    >
      <span
        className={cn(
          'text-sm font-medium',
          isCurrentMonth
            ? 'text-[var(--color-text-primary)]'
            : 'text-[var(--color-text-muted)]'
        )}
      >
        {dayNumber}
      </span>
      {journal && (
        <div className="flex items-center gap-0.5">
          {/* Mood indicator */}
          <div
            className={cn(
              'w-2 h-2 rounded-full',
              journal.mood
                ? moodColors[journal.mood]?.split(' ')[0] || 'bg-[var(--color-accent-terracotta)]'
                : 'bg-[var(--color-accent-terracotta)]'
            )}
            title={journal.mood || 'Journal entry'}
          />
          {/* Book worthy indicator */}
          {journal.book_worthy && journal.book_worthy !== 'false' && (
            <div
              className={cn('w-1.5 h-1.5 rounded-full', bookWorthyColors[journal.book_worthy])}
              title={`Book worthy: ${journal.book_worthy}`}
            />
          )}
        </div>
      )}
    </button>
  );
}

interface CalendarProps {
  journals: Journal[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  currentMonth: Date;
  onChangeMonth: (date: Date) => void;
}

function Calendar({ journals, selectedDate, onSelectDate, currentMonth, onChangeMonth }: CalendarProps) {
  const journalsByDate = useMemo(() => {
    const map = new Map<string, Journal>();
    journals.forEach(j => {
      if (j.journal_date) {
        map.set(j.journal_date, j);
      }
    });
    return map;
  }, [journals]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of month
    const firstDay = new Date(year, month, 1);
    // Last day of month
    const lastDay = new Date(year, month + 1, 0);

    // Start from Sunday of the week containing the first day
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // End on Saturday of the week containing the last day
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const days: Date[] = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }, [currentMonth]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPrevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    onChangeMonth(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    onChangeMonth(next);
  };

  const goToToday = () => {
    onChangeMonth(new Date());
  };

  return (
    <Card className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPrevMonth}
          className="p-2 rounded hover:bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <button
            onClick={goToToday}
            className="text-xs px-2 py-1 rounded bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            Today
          </button>
        </div>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded hover:bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div
            key={day}
            className="text-center text-xs font-medium text-[var(--color-text-muted)] py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, i) => {
          const dateStr = date.toISOString().split('T')[0];
          const journal = journalsByDate.get(dateStr);
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isToday = date.getTime() === today.getTime();
          const isSelected = dateStr === selectedDate;

          return (
            <CalendarDay
              key={i}
              date={date}
              journal={journal}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => onSelectDate(dateStr)}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)] flex flex-wrap gap-3 text-xs text-[var(--color-text-muted)]">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[var(--color-accent-terracotta)]" />
          <span>Has journal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span>Book worthy</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>Story seed</span>
        </div>
      </div>
    </Card>
  );
}

interface JournalReaderProps {
  journal: Journal;
}

function JournalReader({ journal }: JournalReaderProps) {
  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-heading font-semibold text-[var(--color-text-primary)]">
            {new Date(journal.journal_date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h2>
          {journal.word_count > 0 && (
            <span className="text-sm text-[var(--color-text-muted)]">
              {journal.word_count} words
            </span>
          )}
        </div>

        {/* Tags row */}
        <div className="flex flex-wrap gap-2">
          {journal.mood && (
            <Tag className={moodColors[journal.mood] || 'bg-[var(--color-surface-tertiary)]'}>
              {journal.mood}
            </Tag>
          )}
          {journal.energy_level && (
            <Tag className="bg-[var(--color-surface-tertiary)]">
              Energy: {journal.energy_level}/5
            </Tag>
          )}
          {journal.book_worthy && journal.book_worthy !== 'false' && (
            <Tag className={cn(
              journal.book_worthy === 'yes' && 'bg-green-500/20 text-green-400',
              journal.book_worthy === 'maybe' && 'bg-yellow-500/20 text-yellow-400',
              journal.book_worthy === 'seed' && 'bg-blue-500/20 text-blue-400'
            )}>
              {journal.book_worthy === 'seed' ? 'Story seed' : `Book worthy: ${journal.book_worthy}`}
            </Tag>
          )}
          {journal.promoted_to && (
            <Tag className="bg-purple-500/20 text-purple-400">
              Promoted to: {journal.promoted_to}
            </Tag>
          )}
        </div>

        {/* Notable events */}
        {journal.notable_events.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {journal.notable_events.map((event, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)]"
              >
                {event}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{journal.content}</ReactMarkdown>
      </div>

      {/* AI Notes */}
      {journal.ai_notes && (
        <div className="mt-6 pt-6 border-t border-[var(--color-border-subtle)]">
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
              AI Notes
            </summary>
            <div className="mt-3 space-y-3 text-sm text-[var(--color-text-muted)]">
              {journal.ai_notes.memory_triggers.length > 0 && (
                <div>
                  <span className="font-medium">Memory triggers:</span>
                  <ul className="list-disc list-inside mt-1">
                    {journal.ai_notes.memory_triggers.map((trigger, i) => (
                      <li key={i}>{trigger}</li>
                    ))}
                  </ul>
                </div>
              )}
              {journal.ai_notes.suggested_exploration.length > 0 && (
                <div>
                  <span className="font-medium">Suggested exploration:</span>
                  <ul className="list-disc list-inside mt-1">
                    {journal.ai_notes.suggested_exploration.map((suggestion, i) => (
                      <li key={i}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              {journal.ai_notes.connections.length > 0 && (
                <div>
                  <span className="font-medium">Connections:</span>
                  <ul className="list-disc list-inside mt-1">
                    {journal.ai_notes.connections.map((connection, i) => (
                      <li key={i}>{connection}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </details>
        </div>
      )}

      {/* Triggered memories */}
      {journal.triggered_memories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
          <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Triggered Memories
          </h4>
          <div className="flex flex-wrap gap-2">
            {journal.triggered_memories.map((memory, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400"
              >
                {memory}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

export function Journals() {
  const journals = useJournals();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const selectedJournal = useMemo(() => {
    if (!selectedDate) return null;
    return journals.find(j => j.journal_date === selectedDate) || null;
  }, [journals, selectedDate]);

  const stats = useMemo(() => {
    const moods = new Map<string, number>();
    journals.forEach(j => {
      if (j.mood) {
        moods.set(j.mood, (moods.get(j.mood) || 0) + 1);
      }
    });
    const topMoods = Array.from(moods.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return {
      total: journals.length,
      totalWords: journals.reduce((sum, j) => sum + j.word_count, 0),
      withSeeds: journals.filter(j => j.book_worthy === 'seed' || j.book_worthy === 'yes' || j.book_worthy === 'maybe').length,
      promoted: journals.filter(j => j.promoted_to).length,
      topMoods,
    };
  }, [journals]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Journals"
        subtitle={`${stats.total} entries | ${stats.totalWords.toLocaleString()} words`}
      />

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-[var(--color-text-primary)]">{stats.total}</div>
          <div className="text-sm text-[var(--color-text-muted)]">Total Journals</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-[var(--color-text-primary)]">{stats.totalWords.toLocaleString()}</div>
          <div className="text-sm text-[var(--color-text-muted)]">Words</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.withSeeds}</div>
          <div className="text-sm text-[var(--color-text-muted)]">Story Seeds</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{stats.promoted}</div>
          <div className="text-sm text-[var(--color-text-muted)]">Promoted</div>
        </Card>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <Calendar
            journals={journals}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            currentMonth={currentMonth}
            onChangeMonth={setCurrentMonth}
          />
        </div>

        {/* Journal reader */}
        <div className="lg:col-span-2">
          {selectedJournal ? (
            <JournalReader journal={selectedJournal} />
          ) : (
            <Card className="p-8 text-center">
              <div className="text-[var(--color-text-muted)]">
                {journals.length > 0 ? (
                  <>
                    <p className="mb-2">Select a date to view a journal entry</p>
                    <p className="text-sm">
                      Dots on the calendar indicate days with journal entries
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mb-2">No journals yet</p>
                    <p className="text-sm">
                      Use <code className="px-1 py-0.5 rounded bg-[var(--color-surface-tertiary)]">/journal</code> in Claude to start capturing your daily reflections
                    </p>
                  </>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

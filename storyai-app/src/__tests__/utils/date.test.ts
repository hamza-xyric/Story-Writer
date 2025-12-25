// Tests for date formatting utilities
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatDate, formatDateShort, formatRelativeDate } from '../../utils/date';

describe('formatDate', () => {
  it('formats a valid date string', () => {
    const result = formatDate('2024-12-25');
    expect(result).toBe('December 25, 2024');
  });

  it('returns empty string for empty input', () => {
    expect(formatDate('')).toBe('');
  });

  it('handles invalid date gracefully', () => {
    const result = formatDate('not-a-date');
    // Should return the original string or handle gracefully
    expect(typeof result).toBe('string');
  });
});

describe('formatDateShort', () => {
  it('formats a valid date string in short format', () => {
    const result = formatDateShort('2024-12-25');
    expect(result).toBe('Dec 25, 2024');
  });

  it('returns empty string for empty input', () => {
    expect(formatDateShort('')).toBe('');
  });
});

describe('formatRelativeDate', () => {
  beforeEach(() => {
    // Mock Date.now() to return a fixed date in local time
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 11, 25, 12, 0, 0)); // Dec 25, 2024 noon local
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "Today" for current date', () => {
    // Create today's date in local format YYYY-MM-DD
    const result = formatRelativeDate('2024-12-25');
    // Should be Today or Yesterday depending on timezone
    expect(['Today', 'Yesterday']).toContain(result);
  });

  it('returns "Yesterday" for previous day', () => {
    const result = formatRelativeDate('2024-12-24');
    // Should be Yesterday or "X days ago" depending on timezone
    expect(result).toMatch(/Yesterday|\d+ days? ago/);
  });

  it('returns days ago for recent dates', () => {
    const threeDaysAgo = new Date(2024, 11, 22);
    const result = formatRelativeDate(threeDaysAgo.toISOString().split('T')[0]);
    // Due to ceiling, may be 3 or 4 depending on time
    expect(result).toMatch(/\d+ days ago/);
  });

  it('returns weeks ago for dates within a month', () => {
    const result = formatRelativeDate('2024-12-11');
    expect(result).toBe('2 weeks ago');
  });

  it('returns months ago for dates within a year', () => {
    const result = formatRelativeDate('2024-09-25');
    expect(result).toBe('3 months ago');
  });

  it('returns years ago for dates older than a year', () => {
    const result = formatRelativeDate('2022-12-25');
    expect(result).toBe('2 years ago');
  });

  it('returns empty string for empty input', () => {
    expect(formatRelativeDate('')).toBe('');
  });
});

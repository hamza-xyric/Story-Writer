// Timeline utilities for parsing time periods

export interface TimelinePoint {
  id: string;
  title: string;
  startYear: number;
  endYear: number;
  precision: string;
  themes: string[];
  completeness: string;
}

/**
 * Parse a time_period string into start and end years
 * Handles formats like:
 * - "2024 - Present"
 * - "Late 2000s - Early 2010s"
 * - "1990s"
 * - "December 2019"
 * - "2015"
 */
export function parseTimePeriod(timePeriod: string): { startYear: number; endYear: number } {
  const currentYear = new Date().getFullYear();
  const text = timePeriod.toLowerCase().trim();

  // Handle "Present"
  if (text.includes('present')) {
    const parts = text.split('-').map(s => s.trim());
    const startPart = parts[0];
    const startYear = extractYear(startPart) || currentYear;
    return { startYear, endYear: currentYear };
  }

  // Handle range with dash
  if (text.includes('-')) {
    const parts = text.split('-').map(s => s.trim());
    const startYear = extractYear(parts[0]) || currentYear;
    const endYear = extractYear(parts[1]) || startYear;
    return { startYear, endYear };
  }

  // Single period
  const year = extractYear(text);
  return { startYear: year || currentYear, endYear: year || currentYear };
}

/**
 * Extract a year from a string
 */
function extractYear(text: string): number | null {
  const lowerText = text.toLowerCase();

  // Handle decade references like "2000s", "1990s"
  const decadeMatch = text.match(/(\d{4})s/);
  if (decadeMatch) {
    const decade = parseInt(decadeMatch[1], 10);
    if (lowerText.includes('early')) return decade;
    if (lowerText.includes('mid')) return decade + 5;
    if (lowerText.includes('late')) return decade + 7;
    return decade + 5; // Default to mid-decade
  }

  // Handle plain year like "2024"
  const yearMatch = text.match(/\b(19|20)\d{2}\b/);
  if (yearMatch) {
    return parseInt(yearMatch[0], 10);
  }

  return null;
}

/**
 * Get a color for a completeness level
 */
export function getCompletenessColor(completeness: string): string {
  switch (completeness) {
    case 'detailed':
      return 'var(--color-detailed)';
    case 'partial':
      return 'var(--color-partial)';
    case 'brief':
      return 'var(--color-brief)';
    default:
      return 'var(--color-text-muted)';
  }
}

/**
 * Get a theme color based on theme name
 */
export function getThemeColor(theme: string): string {
  // Simple hash to get consistent colors
  let hash = 0;
  for (let i = 0; i < theme.length; i++) {
    hash = theme.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    'var(--color-accent-terracotta)',
    'var(--color-accent-sage)',
    'var(--color-accent-slate)',
    '#8b7355',
    '#6b8e23',
    '#708090',
  ];

  return colors[Math.abs(hash) % colors.length];
}

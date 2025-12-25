// Color utilities for relationship categories and status

import type { RelationshipCategory, Completeness } from '../types';

export const relationshipColors: Record<RelationshipCategory, string> = {
  family: 'var(--color-family)',
  friend: 'var(--color-friend)',
  mentor: 'var(--color-mentor)',
  colleague: 'var(--color-colleague)',
  romantic: 'var(--color-romantic)',
  other: 'var(--color-other)',
};

export const relationshipBgClasses: Record<RelationshipCategory, string> = {
  family: 'bg-[#8b6b61]/10 text-[#8b6b61]',
  friend: 'bg-[#6b8b7a]/10 text-[#6b8b7a]',
  mentor: 'bg-[#7a6b8b]/10 text-[#7a6b8b]',
  colleague: 'bg-[#8b8a6b]/10 text-[#8b8a6b]',
  romantic: 'bg-[#b87a7a]/10 text-[#b87a7a]',
  other: 'bg-[#7a8b8b]/10 text-[#7a8b8b]',
};

export const completenessColors: Record<Completeness, string> = {
  detailed: 'var(--color-detailed)',
  partial: 'var(--color-partial)',
  brief: 'var(--color-brief)',
};

export const completenessBgClasses: Record<Completeness, string> = {
  detailed: 'bg-[#7d9b7a]/10 text-[#7d9b7a]',
  partial: 'bg-[#c9a959]/10 text-[#c9a959]',
  brief: 'bg-[#b88b8b]/10 text-[#b88b8b]',
};

export const completenessLabels: Record<Completeness, string> = {
  detailed: 'Detailed',
  partial: 'Partial',
  brief: 'Brief',
};

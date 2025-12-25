// Character data model

import type { Period, Progression, Relation, AIVisibility, AIPriority, BaseTracking } from './common';

export type RelationshipCategory = 'family' | 'friend' | 'mentor' | 'colleague' | 'romantic' | 'other';

// Legacy connections format (still supported)
export interface LegacyConnection {
  character_id: string;
  relationship: string;
  period: string;
}

export interface Character extends BaseTracking {
  character_id: string;
  name: string;
  aliases: string[];
  relationship: string;
  relationship_category: RelationshipCategory;
  birth_year: number | null;
  death_year: number | null;
  period_active: Period[];
  traits: string[];
  physical_description: string;
  voice_characteristics: string;
  defining_mannerisms: string;

  // v1.1 additions
  progressions: Progression[];
  relations: Relation[];
  ai_visibility: AIVisibility;
  ai_priority: AIPriority;

  // Legacy (still supported)
  connections: LegacyConnection[];

  // Content
  content: string;

  // File metadata
  filePath: string;
  category_folder: string;
}

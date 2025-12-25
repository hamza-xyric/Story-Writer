// Location data model

import type { Period, Progression, Relation, AIVisibility, AIPriority, BaseTracking } from './common';

export type LocationType = 'home' | 'school' | 'workplace' | 'city' | 'country' | 'neighborhood' | 'landmark' | 'other';

export interface SensoryDetails {
  sight: string;
  sound: string;
  smell: string;
  texture: string;
}

export interface Location extends BaseTracking {
  location_id: string;
  name: string;
  aliases: string[];
  type: LocationType;
  address: string;
  city: string;
  country: string;
  coordinates: string;

  period_active: Period[];
  progressions: Progression[];
  relations: Relation[];

  physical_description: string;
  sensory_details: SensoryDetails;

  ai_visibility: AIVisibility;
  ai_priority: AIPriority;

  // Content
  content: string;

  // File metadata
  filePath: string;
  type_folder: string;
}

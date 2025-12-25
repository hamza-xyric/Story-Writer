// Common types shared across the data model

// Time period representation
export interface Period {
  start: string;
  end: string | null;
  role?: string;
}

// How something changed over time (characters/locations)
export interface Progression {
  period: string;
  description: string;
  traits?: string[];
  relationship_quality?: string;  // For characters
  physical_state?: string;        // For locations
  emotional_association?: string; // For locations
}

// Relation to another entity
export interface Relation {
  target_type?: 'character' | 'location';
  target_id: string;
  relationship: string;
  direction?: string;
  period?: string;
  notes?: string;
}

// AI context control
export type AIVisibility = 'always' | 'when_detected' | 'never';
export type AIPriority = 'high' | 'medium' | 'low';

// Base tracking fields all entities share
export interface BaseTracking {
  last_updated: string;
  first_mentioned_in?: string;
  entries_featured: string[];
  mention_count: number;
}

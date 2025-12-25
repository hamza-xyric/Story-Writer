// Relationships view - Interactive relationship graph

import { useState } from 'react';
import { PageHeader } from '../../components/layout';
import { RelationshipGraph } from '../../components/graph';
import { useCharacters } from '../../data';
import type { Character, RelationshipCategory } from '../../types';
import { Card, Tag } from '../../components/primitives';
import { cn } from '../../utils';

const categoryLabels: Record<RelationshipCategory, string> = {
  family: 'Family',
  friend: 'Friends',
  mentor: 'Mentors',
  colleague: 'Colleagues',
  romantic: 'Romantic',
  other: 'Other',
};

const categoryColors: Record<RelationshipCategory, string> = {
  family: '#c4704b',
  friend: '#7d9b7a',
  mentor: '#708090',
  colleague: '#8b7355',
  romantic: '#c97a8b',
  other: '#9ca3af',
};

export function Relationships() {
  const characters = useCharacters();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleCloseDetail = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <PageHeader
        title="Relationships"
        subtitle="Connections between the people in your life"
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Graph Canvas */}
        <div
          className={cn(
            'flex-1 p-6 overflow-hidden',
            selectedCharacter && 'border-r border-[var(--color-border-subtle)]'
          )}
        >
          {characters.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center py-12 px-8 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border-subtle)]">
                <svg className="w-16 h-16 mx-auto text-[var(--color-text-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                <h2 className="font-heading text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                  No Relationships Yet
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
                  Add characters to your entries to see their relationships mapped here.
                </p>
              </div>
            </div>
          ) : characters.length === 1 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center py-12 px-8 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border-subtle)]">
                <svg className="w-16 h-16 mx-auto text-[var(--color-text-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 className="font-heading text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                  Add More Characters
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
                  You have 1 character. Add more to see their relationships visualized here.
                </p>
              </div>
            </div>
          ) : (
            <RelationshipGraph
              characters={characters}
              onSelectCharacter={handleSelectCharacter}
              selectedCharacterId={selectedCharacter?.character_id}
            />
          )}
        </div>

        {/* Character Detail Panel */}
        {selectedCharacter && (
          <div className="w-1/3 overflow-y-auto bg-[var(--color-surface-secondary)]">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: categoryColors[selectedCharacter.relationship_category || 'other'] }}
                    />
                    <span className="text-sm text-[var(--color-text-muted)]">
                      {categoryLabels[selectedCharacter.relationship_category || 'other']}
                    </span>
                  </div>
                  <h2 className="font-heading text-xl font-bold text-[var(--color-text-primary)]">
                    {selectedCharacter.name}
                  </h2>
                  {selectedCharacter.relationship && (
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      {selectedCharacter.relationship}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleCloseDetail}
                  className="p-2 rounded-lg hover:bg-[var(--color-surface-tertiary)] transition-colors"
                >
                  <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Traits */}
              {selectedCharacter.traits.length > 0 && (
                <section className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
                    Traits
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedCharacter.traits.map(trait => (
                      <Tag key={trait} variant="outline" size="sm">
                        {trait}
                      </Tag>
                    ))}
                  </div>
                </section>
              )}

              {/* Relations */}
              {selectedCharacter.relations && selectedCharacter.relations.length > 0 && (
                <section className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
                    Connections
                  </h3>
                  <div className="space-y-2">
                    {selectedCharacter.relations.map((rel, idx) => (
                      <Card key={idx} variant="default" padding="sm">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[var(--color-text-primary)]">
                            {rel.target_id.split('/').pop()}
                          </span>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {rel.relationship}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Period Active */}
              {selectedCharacter.period_active.length > 0 && (
                <section className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
                    Active Periods
                  </h3>
                  <div className="space-y-1">
                    {selectedCharacter.period_active.map((period, idx) => (
                      <p key={idx} className="text-sm text-[var(--color-text-secondary)]">
                        {period.start}
                        {period.end && period.end !== period.start && ` – ${period.end}`}
                      </p>
                    ))}
                  </div>
                </section>
              )}

              {/* Stats */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2">
                  Stats
                </h3>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  <p>{selectedCharacter.mention_count || 0} mentions in entries</p>
                  {selectedCharacter.entries_featured && (
                    <p className="mt-1">{selectedCharacter.entries_featured.length} entries featuring them</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="px-6 py-3 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)]">
        <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
          <span>{characters.length} characters</span>
          {characters.length >= 2 && (
            <>
              <span>|</span>
              <span>Drag nodes to rearrange · Scroll to zoom</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

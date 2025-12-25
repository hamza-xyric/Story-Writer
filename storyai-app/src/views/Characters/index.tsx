// Characters view - Character explorer with profiles

import { useState, useMemo } from 'react';
import { useCharacters, useEntries } from '../../data';
import { PageHeader } from '../../components/layout';
import { Card, Tag } from '../../components/primitives';
import { cn } from '../../utils';
import type { Character, RelationshipCategory } from '../../types';

const categoryLabels: Record<RelationshipCategory, string> = {
  family: 'Family',
  friend: 'Friends',
  mentor: 'Mentors',
  colleague: 'Colleagues',
  romantic: 'Romantic',
  other: 'Other',
};

const categoryColors: Record<RelationshipCategory, string> = {
  family: 'var(--color-accent-terracotta)',
  friend: 'var(--color-accent-sage)',
  mentor: 'var(--color-accent-slate)',
  colleague: '#8b7355',
  romantic: '#c97a8b',
  other: 'var(--color-text-muted)',
};

export function Characters() {
  const characters = useCharacters();
  const entries = useEntries();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Group characters by category
  const groupedCharacters = useMemo(() => {
    const groups = new Map<RelationshipCategory, Character[]>();

    characters.forEach(char => {
      const category = char.relationship_category || 'other';
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)!.push(char);
    });

    // Sort each group by mention count
    groups.forEach((chars) => {
      chars.sort((a, b) => (b.mention_count || 0) - (a.mention_count || 0));
    });

    return groups;
  }, [characters]);

  // Get entries featuring selected character
  const characterEntries = useMemo(() => {
    if (!selectedCharacter) return [];
    return entries.filter(e =>
      e.characters.includes(selectedCharacter.character_id) ||
      e.characters.includes(selectedCharacter.name)
    );
  }, [selectedCharacter, entries]);

  return (
    <div className="h-screen flex flex-col">
      <PageHeader
        title="Characters"
        subtitle={`${characters.length} ${characters.length === 1 ? 'person' : 'people'} in your story`}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Character Grid */}
        <div
          className={cn(
            'flex-1 overflow-y-auto p-6',
            selectedCharacter && 'border-r border-[var(--color-border-subtle)]'
          )}
        >
          {characters.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center py-12 px-8 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border-subtle)]">
                <svg className="w-16 h-16 mx-auto text-[var(--color-text-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 className="font-heading text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                  No Characters Yet
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
                  Characters are added when you mention people in your entries.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              {Array.from(groupedCharacters.entries()).map(([category, chars]) => (
                <section key={category}>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: categoryColors[category] }}
                    />
                    <h2 className="font-heading text-lg font-semibold text-[var(--color-text-primary)]">
                      {categoryLabels[category]}
                    </h2>
                    <span className="text-sm text-[var(--color-text-muted)]">
                      ({chars.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chars.map((char, index) => (
                      <div
                        key={char.character_id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Card
                          variant={selectedCharacter?.character_id === char.character_id ? 'elevated' : 'default'}
                          padding="md"
                          interactive
                          onClick={() => setSelectedCharacter(char)}
                          className={cn(
                            'relative overflow-hidden',
                            selectedCharacter?.character_id === char.character_id &&
                              'ring-2 ring-[var(--color-accent-terracotta)]'
                          )}
                        >
                          {/* Category accent */}
                          <div
                            className="absolute top-0 left-0 w-1 h-full"
                            style={{ backgroundColor: categoryColors[category] }}
                          />

                          <div className="pl-3">
                            <h3 className="font-heading font-semibold text-[var(--color-text-primary)]">
                              {char.name}
                            </h3>
                            {char.relationship && (
                              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                                {char.relationship}
                              </p>
                            )}

                            {/* Traits */}
                            {char.traits.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {char.traits.slice(0, 3).map(trait => (
                                  <Tag key={trait} variant="outline" size="sm">
                                    {trait}
                                  </Tag>
                                ))}
                              </div>
                            )}

                            {/* Stats */}
                            <div className="flex items-center gap-3 mt-3 text-xs text-[var(--color-text-muted)]">
                              <span>{char.mention_count || 0} mentions</span>
                              {char.period_active.length > 0 && (
                                <>
                                  <span>·</span>
                                  <span>{char.period_active[0]?.start}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        {/* Character Detail Panel */}
        {selectedCharacter && (
          <div className="w-1/2 overflow-y-auto bg-[var(--color-surface-secondary)]">
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
                  <h2 className="font-heading text-2xl font-bold text-[var(--color-text-primary)]">
                    {selectedCharacter.name}
                  </h2>
                  {selectedCharacter.relationship && (
                    <p className="text-[var(--color-text-secondary)] mt-1">
                      {selectedCharacter.relationship}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCharacter(null)}
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
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
                    Traits
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCharacter.traits.map(trait => (
                      <Tag key={trait} variant="outline" size="md">
                        {trait}
                      </Tag>
                    ))}
                  </div>
                </section>
              )}

              {/* Period Active */}
              {selectedCharacter.period_active.length > 0 && (
                <section className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
                    Active Periods
                  </h3>
                  <div className="space-y-2">
                    {selectedCharacter.period_active.map((period, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent-sage)]" />
                        <span className="text-[var(--color-text-primary)]">
                          {period.start}
                          {period.end && period.end !== period.start && ` – ${period.end}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Progressions */}
              {selectedCharacter.progressions && selectedCharacter.progressions.length > 0 && (
                <section className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
                    Character Arc
                  </h3>
                  <div className="space-y-4">
                    {selectedCharacter.progressions.map((prog, idx) => (
                      <div key={idx} className="pl-4 border-l-2 border-[var(--color-border-default)]">
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {prog.period}
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                          {prog.description}
                        </p>
                        {prog.relationship_quality && (
                          <p className="text-xs text-[var(--color-text-muted)] mt-1">
                            {prog.relationship_quality}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Content/Bio */}
              {selectedCharacter.content && (
                <section className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
                    About
                  </h3>
                  <div className="prose-journal text-sm">
                    {selectedCharacter.content.split('\n\n').slice(0, 3).map((para, idx) => (
                      <p key={idx} className="text-[var(--color-text-secondary)] mb-2">
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              )}

              {/* Entries featuring this character */}
              {characterEntries.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
                    Featured In
                  </h3>
                  <div className="space-y-2">
                    {characterEntries.map(entry => (
                      <Card key={entry.entry_id} variant="default" padding="sm" interactive>
                        <h4 className="font-medium text-[var(--color-text-primary)]">
                          {entry.title || 'Untitled'}
                        </h4>
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">
                          {entry.time_period}
                        </p>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

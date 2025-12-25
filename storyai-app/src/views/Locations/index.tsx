// Locations view - placeholder

import { useLocations } from '../../data';
import { PageHeader } from '../../components/layout';
import { Card, Tag } from '../../components/primitives';

export function Locations() {
  const locations = useLocations();

  return (
    <div className="h-screen flex flex-col">
      <PageHeader
        title="Locations"
        subtitle={`${locations.length} ${locations.length === 1 ? 'place' : 'places'} in your story`}
      />

      <div className="flex-1 overflow-y-auto p-8">
        {locations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-muted)]">No locations yet</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Locations are added when you mention places in your entries
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location) => (
              <Card key={location.location_id} variant="default" padding="lg" interactive>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-tertiary)] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-[var(--color-text-primary)]">
                      {location.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                      {[location.city, location.country].filter(Boolean).join(', ') || location.type}
                    </p>

                    <Tag variant="category" size="sm" className="mt-2">
                      {location.type}
                    </Tag>

                    <p className="text-xs text-[var(--color-text-muted)] mt-3">
                      {location.mention_count} mention{location.mention_count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

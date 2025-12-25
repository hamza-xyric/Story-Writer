// Search view

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch, useData } from '../../data';
import { PageHeader } from '../../components/layout';
import { Input, Card, Tag } from '../../components/primitives';
import { cn } from '../../utils';

export function Search() {
  const [query, setQuery] = useState('');
  const search = useSearch();
  const { entries, characters, locations } = useData();
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return search(query);
  }, [query, search]);

  const handleResultClick = (result: { type: string; id: string }) => {
    switch (result.type) {
      case 'entry':
        navigate(`/?entry=${result.id}`);
        break;
      case 'character':
        navigate(`/characters?id=${result.id}`);
        break;
      case 'location':
        navigate(`/locations?id=${result.id}`);
        break;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <PageHeader
        title="Search"
        subtitle="Find anything in your story"
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto">
          {/* Search Input */}
          <div className="mb-8">
            <Input
              placeholder="Search entries, characters, locations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              className="text-lg py-3"
            />
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface-tertiary)] text-xs">Cmd+K</kbd> anywhere to open quick search
            </p>
          </div>

          {/* Results */}
          {query.trim() && (
            <div className="space-y-4">
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[var(--color-text-muted)]">
                    No results found for "{query}"
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {results.length} result{results.length !== 1 ? 's' : ''}
                  </p>
                  {results.map((result, index) => (
                    <Card
                      key={`${result.type}-${result.id}`}
                      variant="default"
                      padding="md"
                      interactive
                      onClick={() => handleResultClick(result)}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                            result.type === 'entry' && 'bg-[var(--color-accent-terracotta)]/10 text-[var(--color-accent-terracotta)]',
                            result.type === 'character' && 'bg-[var(--color-accent-sage)]/10 text-[var(--color-accent-sage)]',
                            result.type === 'location' && 'bg-[var(--color-accent-slate)]/10 text-[var(--color-accent-slate)]'
                          )}
                        >
                          {result.type === 'entry' && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                          )}
                          {result.type === 'character' && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                          {result.type === 'location' && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[var(--color-text-primary)]">
                            {result.title}
                          </h3>
                          {result.subtitle && (
                            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                              {result.subtitle}
                            </p>
                          )}
                          <Tag variant="outline" size="sm" className="mt-2">
                            {result.type}
                          </Tag>
                        </div>
                      </div>
                    </Card>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Empty state */}
          {!query.trim() && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="font-heading text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                Search your story
              </h2>
              <p className="text-[var(--color-text-muted)] max-w-sm mx-auto">
                Find entries, characters, and locations by searching for titles, content, themes, or names.
              </p>
              <div className="mt-6 flex justify-center gap-4 text-sm text-[var(--color-text-muted)]">
                <span>{entries.length} entries</span>
                <span>·</span>
                <span>{characters.length} characters</span>
                <span>·</span>
                <span>{locations.length} locations</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

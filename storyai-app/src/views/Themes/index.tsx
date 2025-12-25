// Themes view

import { useThemes, useEntries } from '../../data';
import { PageHeader } from '../../components/layout';
import { Card, Tag } from '../../components/primitives';
import { cn } from '../../utils';

export function Themes() {
  const themes = useThemes();
  const entries = useEntries();

  // Get emotion tags too
  const emotionTags = new Map<string, number>();
  entries.forEach(entry => {
    entry.emotion_tags.forEach(tag => {
      emotionTags.set(tag, (emotionTags.get(tag) || 0) + 1);
    });
  });
  const sortedEmotionTags = Array.from(emotionTags.entries())
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="h-screen flex flex-col">
      <PageHeader
        title="Themes"
        subtitle="Patterns woven through your story"
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Themes Section */}
          <section>
            <h2 className="font-heading text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Story Themes
            </h2>
            {themes.length === 0 ? (
              <Card variant="outlined" padding="lg">
                <p className="text-center text-[var(--color-text-muted)]">
                  No themes yet. Themes are added when you tag your entries.
                </p>
              </Card>
            ) : (
              <div className="flex flex-wrap gap-3">
                {themes.map((theme, index) => (
                  <div
                    key={theme.name}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <Card variant="default" padding="md" interactive className="flex items-center gap-3">
                      <span
                        className={cn(
                          'font-heading font-semibold',
                          theme.count >= 3 ? 'text-xl' : theme.count >= 2 ? 'text-lg' : 'text-base'
                        )}
                      >
                        {theme.name}
                      </span>
                      <span className="text-sm text-[var(--color-text-muted)]">
                        {theme.count} {theme.count === 1 ? 'entry' : 'entries'}
                      </span>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Emotion Tags Section */}
          <section>
            <h2 className="font-heading text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Emotions
            </h2>
            {sortedEmotionTags.length === 0 ? (
              <Card variant="outlined" padding="lg">
                <p className="text-center text-[var(--color-text-muted)]">
                  No emotion tags yet.
                </p>
              </Card>
            ) : (
              <div className="flex flex-wrap gap-2">
                {sortedEmotionTags.map(([tag, count], index) => (
                  <div
                    key={tag}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <Tag
                      variant="emotion"
                      size="md"
                      className={cn(
                        count >= 3 && 'text-base px-4 py-1.5',
                        count >= 2 && count < 3 && 'text-sm'
                      )}
                    >
                      {tag}
                      <span className="ml-1 opacity-60">({count})</span>
                    </Tag>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

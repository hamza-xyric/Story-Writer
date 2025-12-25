// Sidebar navigation component

import { NavLink } from 'react-router-dom';
import { useStats } from '../../data';
import { cn } from '../../utils';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
}

function NavItem({ to, icon, label, count }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg',
          'text-[var(--color-text-secondary)]',
          'transition-all duration-200',
          'group',
          isActive
            ? [
                'bg-[var(--color-accent-terracotta)]/10',
                'text-[var(--color-accent-terracotta)]',
              ]
            : ['hover:bg-[var(--color-surface-tertiary)]', 'hover:text-[var(--color-text-primary)]']
        )
      }
    >
      <span className="w-5 h-5 flex-shrink-0">{icon}</span>
      <span className="font-medium flex-1">{label}</span>
      {count !== undefined && count > 0 && (
        <span
          className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full',
            'bg-[var(--color-surface-tertiary)]',
            'group-[.active]:bg-[var(--color-accent-terracotta)]/20'
          )}
        >
          {count}
        </span>
      )}
    </NavLink>
  );
}

// Icons (simple SVG icons)
const icons = {
  entries: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  ),
  characters: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  ),
  locations: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  ),
  timeline: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  ),
  themes: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  ),
  relationships: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  ),
  book: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  ),
  search: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  ),
  journals: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
      />
    </svg>
  ),
};

export function Sidebar() {
  const stats = useStats();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0',
        'w-[var(--sidebar-width)]',
        'bg-[var(--color-surface-secondary)]',
        'border-r border-[var(--color-border-subtle)]',
        'flex flex-col',
        'z-10'
      )}
    >
      {/* Logo & Title */}
      <div className="px-4 py-6 border-b border-[var(--color-border-subtle)]">
        <h1 className="font-heading text-xl font-semibold text-[var(--color-text-primary)]">
          My Life Story
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          {stats.totalWords.toLocaleString()} words captured
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <NavItem to="/" icon={icons.entries} label="Entries" count={stats.totalEntries} />
        <NavItem
          to="/characters"
          icon={icons.characters}
          label="Characters"
          count={stats.totalCharacters}
        />
        <NavItem
          to="/locations"
          icon={icons.locations}
          label="Locations"
          count={stats.totalLocations}
        />
        <NavItem to="/timeline" icon={icons.timeline} label="Timeline" />
        <NavItem to="/themes" icon={icons.themes} label="Themes" count={stats.totalThemes} />
        <NavItem to="/relationships" icon={icons.relationships} label="Relationships" />

        <div className="pt-4 mt-4 border-t border-[var(--color-border-subtle)]">
          <NavItem to="/journals" icon={icons.journals} label="Journals" />
          <NavItem to="/book" icon={icons.book} label="Book" />
          <NavItem to="/search" icon={icons.search} label="Search" />
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[var(--color-border-subtle)]">
        <p className="text-xs text-[var(--color-text-muted)]">StoryAI v1.0</p>
      </div>
    </aside>
  );
}

# StoryAI App

A personal memoir viewer with a warm, journal-like aesthetic. Built with React, TypeScript, and Vite.

## Features

- **Entry Browser** - Browse story entries in corkboard or outliner views
- **Timeline** - D3.js-powered visualization of your life's timeline
- **Characters** - Track people in your stories with relationship mapping
- **Locations** - Geographic context for your memories
- **Themes** - Explore recurring themes and patterns
- **Relationships** - Visual graph of character connections
- **Full-text Search** - Find memories across all entries

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Testing

```bash
npm test           # Run unit tests in watch mode
npm run test:run   # Run unit tests once
npm run test:coverage  # Run with coverage report
npm run test:e2e   # Run Playwright E2E tests
npm run test:e2e:ui  # Run E2E tests with UI
```

See [TESTING.md](./TESTING.md) for detailed testing documentation.

## Project Structure

```
storyai-app/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── layout/     # AppShell, Sidebar, PageHeader
│   │   ├── primitives/ # Card, Button, Tag, Input
│   │   └── entry/      # EntryCard, EntryReader
│   ├── data/           # Data layer
│   │   ├── loader.ts   # Vite glob imports for markdown
│   │   ├── parser.ts   # YAML frontmatter parsing
│   │   └── store.tsx   # React Context data store
│   ├── views/          # Page components
│   │   ├── EntryBrowser/
│   │   ├── Characters/
│   │   ├── Locations/
│   │   ├── Timeline/
│   │   ├── Themes/
│   │   ├── Relationships/
│   │   └── Search/
│   ├── styles/         # CSS design system
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript definitions
├── e2e/                # Playwright E2E tests
└── story-data/         # Symlink to ../story-data
```

## Data Location

The app reads markdown files from `../story-data/` (sibling folder).

A symlink `story-data/` in the project root points to this location.

### Data Structure

```
story-data/
├── entries/     # Story entries (markdown with YAML frontmatter)
├── characters/  # Character profiles
└── locations/   # Location profiles
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool with fast HMR
- **Tailwind CSS 4** - Styling
- **D3.js** - Timeline visualization
- **Fuse.js** - Full-text search
- **gray-matter** - YAML frontmatter parsing
- **React Router** - Navigation
- **Vitest** - Unit testing
- **Playwright** - E2E testing

## Design Philosophy

- **Warm aesthetic** - Journal-like feel with serif fonts and earthy colors
- **Personal touch** - Designed for memoir viewing, not generic content
- **Accessible** - Keyboard navigation and screen reader support
- **Responsive** - Works on desktop and tablet

## License

Private project - All rights reserved.

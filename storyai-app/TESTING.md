# Testing Documentation

This document describes the testing strategy and practices for the StoryAI App.

## Testing Pyramid

The project follows a testing pyramid approach:

| Layer        | Percentage | Tools      | Purpose                          |
|--------------|-----------|------------|----------------------------------|
| Unit         | 70%       | Vitest     | Components, utilities, data layer |
| Integration  | 20%       | Vitest     | Data loading, context providers   |
| E2E          | 10%       | Playwright | Critical user flows               |

## Quick Start

```bash
# Run all unit tests in watch mode
npm test

# Run unit tests once
npm run test:run

# Run with coverage report
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## Test Structure

```
storyai-app/
├── src/
│   └── __tests__/              # Unit and integration tests
│       ├── setup.ts            # Test setup (polyfills, mocks)
│       ├── data/
│       │   └── parser.test.ts  # Data parsing tests
│       └── utils/
│           ├── cn.test.ts      # Class name utility tests
│           └── date.test.ts    # Date formatting tests
└── e2e/                        # End-to-end tests
    └── entry-browser.spec.ts   # Entry browser flow tests
```

## Unit Tests

### Configuration

Unit tests use Vitest with the following configuration in `vitest.config.ts`:

- **Environment**: jsdom (for DOM testing)
- **Setup**: `src/__tests__/setup.ts` (polyfills, mocks)
- **Coverage**: V8 provider with thresholds

### Running Tests

```bash
# Watch mode (reruns on file changes)
npm test

# Single run
npm run test:run

# With coverage
npm run test:coverage

# With UI (interactive)
npm run test:ui
```

### Coverage Targets

| Metric     | Target |
|------------|--------|
| Statements | 80%    |
| Branches   | 75%    |
| Functions  | 85%    |
| Lines      | 80%    |

### Writing Unit Tests

Tests are co-located in `src/__tests__/` mirroring the source structure:

```typescript
// src/__tests__/utils/cn.test.ts
import { describe, it, expect } from 'vitest';
import { cn } from '../../utils/cn';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });
});
```

### Mocking

The setup file (`src/__tests__/setup.ts`) provides:

- Buffer polyfill (for gray-matter)
- ResizeObserver mock
- matchMedia mock

## E2E Tests

### Configuration

E2E tests use Playwright with configuration in `playwright.config.ts`:

- **Browsers**: Chromium, Firefox, WebKit
- **Base URL**: http://localhost:5173
- **Web Server**: Auto-starts `npm run dev`

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run specific browser
npx playwright test --project=chromium

# Run specific test file
npx playwright test e2e/entry-browser.spec.ts
```

### Writing E2E Tests

```typescript
// e2e/entry-browser.spec.ts
import { test, expect } from '@playwright/test';

test('loads homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'My Life Story' })).toBeVisible();
});
```

### Best Practices

1. **Use role selectors** over CSS selectors
   ```typescript
   // Good
   page.getByRole('button', { name: 'Submit' })

   // Avoid
   page.locator('.submit-btn')
   ```

2. **Wait for network idle** before assertions
   ```typescript
   await page.goto('/');
   await page.waitForLoadState('networkidle');
   ```

3. **Use test fixtures** for common setup
   ```typescript
   test.beforeEach(async ({ page }) => {
     await page.goto('/');
   });
   ```

## CI Integration

Tests can be run in CI environments:

```bash
# Unit tests with coverage
npm run test:coverage

# E2E tests (headless)
CI=true npm run test:e2e
```

## Debugging Tests

### Unit Tests

```bash
# Run with verbose output
npm test -- --reporter=verbose

# Run specific test file
npm test -- src/__tests__/utils/cn.test.ts

# Run tests matching pattern
npm test -- -t "merges class"
```

### E2E Tests

```bash
# Run with headed browser (visible)
npx playwright test --headed

# Run with trace viewer
npx playwright test --trace on

# Debug mode (step through)
npx playwright test --debug
```

## Test Files Explained

### `src/__tests__/setup.ts`

Global test setup that runs before each test file:
- Imports jest-dom matchers
- Sets up Buffer polyfill for gray-matter
- Mocks browser APIs (ResizeObserver, matchMedia)

### `src/__tests__/data/parser.test.ts`

Tests for the markdown parser:
- YAML frontmatter extraction
- Date handling (Date objects to strings)
- AI notes section extraction
- Default value handling

### `src/__tests__/utils/cn.test.ts`

Tests for the class name utility:
- Class merging
- Conditional classes
- Tailwind conflict resolution

### `src/__tests__/utils/date.test.ts`

Tests for date formatting:
- Full date format
- Short date format
- Relative dates ("Today", "2 days ago")

### `e2e/entry-browser.spec.ts`

E2E tests for the entry browser:
- Homepage loading
- Sidebar navigation
- Entry display
- Search functionality
- View switching

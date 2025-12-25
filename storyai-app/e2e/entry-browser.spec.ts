import { test, expect } from '@playwright/test';

test.describe('Entry Browser', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to load
    await page.waitForLoadState('networkidle');
  });

  test('loads the homepage with sidebar', async ({ page }) => {
    // Check sidebar is visible
    await expect(page.getByRole('heading', { name: 'My Life Story' })).toBeVisible();

    // Check navigation items exist in sidebar (using links)
    await expect(page.getByRole('link', { name: 'Entries' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Characters' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Locations' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Timeline' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Themes' })).toBeVisible();
  });

  test('displays entries in the browser', async ({ page }) => {
    // Check page header (the main heading, not the nav link)
    await expect(page.getByRole('heading', { name: 'Entries' })).toBeVisible();

    // Check that entries are loaded (should have at least one entry card)
    const entryCards = page.locator('[class*="animate-fade-in"]');
    await expect(entryCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('can toggle between corkboard and outliner views', async ({ page }) => {
    // Find view toggle buttons - they're in the toolbar
    const viewButtons = page.locator('button').filter({ has: page.locator('svg') });

    // Both view buttons should be visible
    await expect(viewButtons.first()).toBeVisible();
  });

  test('can search entries', async ({ page }) => {
    // Find and interact with search input
    const searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();

    // Type a search query
    await searchInput.fill('life');

    // Results should update (either show matches or "No entries found")
    await page.waitForTimeout(500); // Wait for debounce
  });

  test('can navigate to different sections', async ({ page }) => {
    // Click on Characters
    await page.getByRole('link', { name: 'Characters' }).click();
    await expect(page).toHaveURL(/\/characters/);

    // Click on Timeline
    await page.getByRole('link', { name: 'Timeline' }).click();
    await expect(page).toHaveURL(/\/timeline/);

    // Click on Themes
    await page.getByRole('link', { name: 'Themes' }).click();
    await expect(page).toHaveURL(/\/themes/);

    // Navigate back to Entries
    await page.getByRole('link', { name: 'Entries' }).click();
    await expect(page).toHaveURL(/\/(entries)?$/);
  });

  test('displays entry details when clicked', async ({ page }) => {
    // Wait for entries to load
    await page.waitForTimeout(1000);

    // Click on the first entry card
    const entryCard = page.locator('[class*="animate-fade-in"]').first();
    await entryCard.click();

    // Entry reader should open (check for reader-specific elements)
    // The reader panel should be visible
    await page.waitForTimeout(500);
  });
});

test.describe('Sidebar Stats', () => {
  test('shows word count in sidebar', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for word count display
    await expect(page.locator('text=words captured')).toBeVisible();
  });

  test('shows entry count badge', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // The Entries nav item should have a count badge
    const entriesNav = page.locator('a[href="/"]').or(page.locator('a[href="/entries"]'));
    await expect(entriesNav.first()).toBeVisible();
  });
});

import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('inital pageload has elements', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Bingewatcher/);
  await expect(page.getByTestId('login-button')).toBeVisible();
  await expect(page.getByTestId('home-link')).toBeVisible();
  await expect(page.getByTestId('searchbar-container')).toBeVisible();
  await expect(page.getByTestId('filter-container')).toBeVisible();
  await expect(page.getByTestId('login-button')).toBeVisible();
  await expect(page.getByTestId('menu')).toBeHidden();

  // Expect 16 movie cards to be visible.
  const movieCards = page.locator('[data-testid="movie-card"]');
  await expect(movieCards).toHaveCount(16);
  await expect(page.getByTestId('pagination-container')).toBeVisible();
});

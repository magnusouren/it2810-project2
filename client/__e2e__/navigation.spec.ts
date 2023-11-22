import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('should navigate to home when clicking on home button', async ({ page }) => {
  const baseURL = page.url();
  await page.getByTestId('home-link').click();
  expect(page.waitForURL(baseURL)).toBeTruthy();
});

test('should navigate to a movie when clicking on a movie', async ({ page }) => {
  await page.getByRole('link', { name: 'Blue Beetle poster. title: Blue Beetle.' }).click();
  expect(page.waitForURL('**/movie/565770')).toBeTruthy();
});

test('should navigate to a watchlist', async ({ page }) => {
  await page.getByTestId('login-button').click();
  await page.getByTestId('menu').click();
  await page.getByTestId('watchlist-link').click();
  expect(page.waitForURL('**/watchlist')).toBeTruthy();
});

test('pagination', async ({ page }) => {
  const movieCards = page.locator('[data-testid="movie-card"]');
  await expect(movieCards).toHaveCount(16);
  await expect(page.getByTestId('pagination-container')).toBeVisible();

  // Change page
  await page.locator('button:has-text("2")').first().click();
  const movieCards2 = page.locator('[data-testid="movie-card"]');
  await expect(movieCards2).toHaveCount(13);
});

test('shows working scroll to top button', async ({ page }) => {
  await page.goto('/project2/movie/852436');
  await page.getByTestId('vote-count').scrollIntoViewIfNeeded({ timeout: 1000 });
  await page.waitForTimeout(1000);
  await page.keyboard.press('End');
  const scrollToTopButton = page.getByTestId('scroll-to-top-button');
  await expect(scrollToTopButton).toBeVisible();
  await scrollToTopButton.click();
  await expect(scrollToTopButton).not.toBeVisible();
});

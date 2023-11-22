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
  // Get the second pagination navigation element and scroll to it
  page.getByLabel('pagination navigation').nth(1).scrollIntoViewIfNeeded({ timeout: 1000 });

  // If the scroll button still isn't visible, press "End" to scroll to the bottom of the page
  // This depends on what elements have been loaded.
  const scrollToTopButton = page.getByTestId('scroll-to-top-button');
  if (!scrollToTopButton.isVisible()) {
    page.keyboard.press('End');
  }
  await expect(scrollToTopButton).toBeVisible();
  scrollToTopButton.click();
  await expect(scrollToTopButton).not.toBeVisible();
});

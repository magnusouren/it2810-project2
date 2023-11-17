import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('generates a user', async ({ page }) => {
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('user-name')).toBeVisible();
});

test('watchlist toggles appear/disappear', async ({ page }) => {
  expect(page.getByTestId('watchlist-toggle-button')).not.toBeVisible();
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('watchlist-toggle-button').first()).toBeVisible();
});

test('logs out and into the same user', async ({ page }) => {
  // Logging in
  expect(page.getByTestId('login-button')).toBeVisible();
  await page.getByTestId('login-button').click();
  expect(page.getByTestId('menu')).toBeVisible();
  expect(page.getByTestId('user-name')).toBeVisible();
  const username = await page.getByTestId('user-name').textContent();

  // Logging out
  await page.getByTestId('menu').click();
  await page.getByTestId('logout').click();
  expect(page.getByTestId('menu')).toBeHidden();
  expect(page.getByTestId('user-name')).toBeHidden();
  expect(page.getByTestId('login-button')).toBeVisible();

  // Logging in again
  await page.getByTestId('login-button').click();
  expect(page.getByTestId('menu')).toBeVisible();
  expect(page.getByTestId('user-name')).toBeVisible();
  expect(await page.getByTestId('user-name').textContent()).toBe(username);
});

test('generates a completely new user', async ({ page }) => {
  // Logging in
  await page.getByTestId('login-button').click();
  expect(page.getByTestId('user-name')).toBeVisible();
  const username = await page.getByTestId('user-name').textContent();

  // Deleting user
  await page.getByTestId('menu').click();
  await page.getByTestId('delete-user').click();
  expect(page.getByTestId('user-name')).toBeHidden();
  expect(page.getByTestId('login-button')).toBeVisible();

  // Logging in again
  await page.getByTestId('login-button').click();
  expect(page.getByTestId('user-name')).toBeVisible();
  expect(await page.getByTestId('user-name').textContent()).not.toBe(username);
});

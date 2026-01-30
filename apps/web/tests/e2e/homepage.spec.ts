import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AITools/);
  });

  test('displays tool directory', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /AI Tools/i })).toBeVisible();
  });
});

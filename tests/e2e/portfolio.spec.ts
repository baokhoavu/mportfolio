import { test, expect } from '@playwright/test';

test.describe('Bob Smith Portfolio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load homepage with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Bob Smith/);
    await expect(page.locator('h1')).toContainText('Bob');
  });

  test('should navigate to about page', async ({ page }) => {
    await page.click('text=About');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1')).toContainText('About');
  });

  test('should navigate to work page', async ({ page }) => {
    await page.click('text=Work');
    await expect(page).toHaveURL(/.*work/);
  });

  test('should switch between Developer and Gamer themes', async ({ page }) => {
    // Test theme switcher
    await page.click('[data-testid="theme-switcher"] button:has-text("Gamer")');
    
    // Check if gamer theme is applied
    await expect(page.locator('html')).toHaveClass(/theme-violet-neon/);
    
    // Switch back to developer theme
    await page.click('[data-testid="theme-switcher"] button:has-text("Developer")');
    
    // Check if default theme is applied
    await expect(page.locator('html')).not.toHaveClass(/theme-violet-neon/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should load all critical resources', async ({ page }) => {
    const response = await page.goto('http://localhost:3000');
    expect(response?.status()).toBe(200);
    
    // Check for critical images
    await expect(page.locator('img[src*="avatar"]')).toBeVisible();
  });

  test('should handle 404 errors gracefully', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/non-existent-page');
    expect(response?.status()).toBe(404);
  });
});
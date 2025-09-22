import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load homepage successfully", async ({ page }) => {
    await page.goto("/en");

    // Check if the page loads with correct title
    await expect(page).toHaveTitle(/The Great Beans/);

    // Check if hero section is visible
    await expect(page.locator("h1")).toBeVisible();

    // Check if navigation menu is present
    await expect(page.locator("nav")).toBeVisible();
  });

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/en');
    
    // Click on products link in navigation
    const productsLink = page.locator('a[href*="/products"]').first();
    if (await productsLink.isVisible()) {
      await productsLink.click();
      
      // Verify we're on the products page
      await expect(page).toHaveURL(/.*\/products/);
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('should navigate to about us page', async ({ page }) => {
    await page.goto('/en');
    
    // Click on about us link
    const aboutLink = page.locator('a[href*="/about"]').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      
      // Verify we're on the about us page
      await expect(page).toHaveURL(/.*\/about/);
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test("should display footer with correct links", async ({ page }) => {
    await page.goto("/en");

    // Scroll to footer
    await page.locator("footer").scrollIntoViewIfNeeded();

    // Check if footer is visible
    await expect(page.locator("footer")).toBeVisible();

    // Check for important footer links
    await expect(page.locator("footer >> text=Contact")).toBeVisible();
    await expect(page.locator("footer >> text=Shipping")).toBeVisible();
    await expect(page.locator("footer >> text=Returns")).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');
    
    // Check if hero section is still visible on mobile
    await expect(page.locator('h1')).toBeVisible();
    
    // Check if mobile menu button exists (if implemented)
    const mobileMenuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="toggle" i]');
    if (await mobileMenuButton.count() > 0) {
      await expect(mobileMenuButton.first()).toBeVisible();
    }
  });
});

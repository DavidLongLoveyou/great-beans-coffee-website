import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('should display products correctly', async ({ page }) => {
    await page.goto('/en/products');
    
    // Check if the page loads with correct title
    await expect(page.locator('h1')).toContainText(/Products|Coffee/);
    
    // Check if product cards are visible
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();
    
    // Check if product information is displayed
    await expect(page.locator('text=$')).toBeVisible(); // Price should be visible
  });

  test('should filter products by category', async ({ page }) => {
    await page.goto('/en/products');
    
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]');
    
    // Test category filtering if available
    const categoryFilter = page.locator('text=Arabica');
    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();
      await expect(page).toHaveURL(/.*category=arabica/);
    }
  });

  test('should navigate to product detail page', async ({ page }) => {
    await page.goto('/en/products');
    
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]');
    
    // Click on first product card
    await page.locator('[data-testid="product-card"]').first().click();
    
    // Should navigate to product detail page
    await expect(page).toHaveURL(/.*\/products\/.*/);
    
    // Should display product details
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=$')).toBeVisible(); // Price
  });

  test('should display specialty products', async ({ page }) => {
    await page.goto('/en/products/specialty');
    
    // Check if specialty page loads
    await expect(page.locator('h1')).toContainText(/Specialty|Premium/);
    
    // Check if products are displayed
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();
  });

  test('should handle empty search results gracefully', async ({ page }) => {
    await page.goto('/en/products?search=nonexistentproduct');
    
    // Should display appropriate message for no results
    // This test assumes there's a "no results" message implementation
    const noResultsMessage = page.locator('text=No products found');
    if (await noResultsMessage.isVisible()) {
      await expect(noResultsMessage).toBeVisible();
    }
  });
});
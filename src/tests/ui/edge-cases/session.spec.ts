import { test, expect } from '../../../fixtures/customFixtures';

test.describe('Edge Cases - Session', () => {
    
    // ✅ FIXED: Use regular login instead of authenticatedPage
    test('EDGE-001: Session persists after page reload @smoke', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
        
        console.log('🔄 Testing session persistence after page reload...');
        
        // Login
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        console.log('✅ Logged in successfully');
        
        // ✅ Reload the page
        await page.reload();
        console.log('🔄 Page reloaded');
        
        // ✅ Verify we're still on inventory page
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
        console.log('✅ Session survived page reload');
    });

    test('EDGE-002: Session persists after navigating away and back', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
        
        console.log('🔄 Testing session persistence after navigation...');
        
        // Login
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        console.log('✅ Logged in successfully');
        
        // Navigate to cart
        await page.goto('/cart.html');
        await expect(page).toHaveURL(/cart.html/);
        console.log('✅ Navigated to cart');
        
        // Navigate back to inventory
        await page.goto('/inventory.html');
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
        console.log('✅ Session survived navigation');
    });

    test('EDGE-003: Logout clears session', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
        
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        
        console.log('🔄 Attempting to logout...');
        
        // Click the menu button with force
        await page.click('[data-test="open-menu"]', { force: true });
        console.log('✅ Menu opened');
        
        // Wait for the logout link
        await page.waitForSelector('[data-test="logout-sidebar-link"]', { state: 'visible' });
        
        // Click logout
        await page.click('[data-test="logout-sidebar-link"]');
        console.log('✅ Logout clicked');
        
        // Wait for navigation
        await page.waitForURL(/saucedemo.com/, { timeout: 10000 });
        
        // Should be on login page
        await expect(page).toHaveURL(/saucedemo.com/);
        await expect(page.locator('[data-test="username"]')).toBeVisible();
        console.log('✅ Logout successful - session cleared');
    });
});
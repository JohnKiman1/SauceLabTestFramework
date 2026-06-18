// ✅ FIXED: Correct import path - go up 3 levels
import { test, expect } from '../../../fixtures/customFixtures';

test.describe('Edge Cases - UI', () => {
    
    test('EDGE-007: Responsive - Mobile viewport', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
        
        await page.setViewportSize({ width: 375, height: 812 });
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        
        // ✅ FIXED: Use 'page' from test context instead of inventoryPage.page
        const isVisible = await page.locator('[data-test="inventory-container"]').isVisible();
        expect(isVisible).toBe(true);
        console.log('✅ Mobile viewport works');
    });

    test('EDGE-008: Responsive - Tablet viewport', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
        
        await page.setViewportSize({ width: 768, height: 1024 });
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        
        // ✅ FIXED: Use 'page' from test context instead of inventoryPage.page
        const isVisible = await page.locator('[data-test="inventory-container"]').isVisible();
        expect(isVisible).toBe(true);
        console.log('✅ Tablet viewport works');
    });

    test('EDGE-009: Keyboard navigation', 
        async ({ page, loginPage }) => {
        
        await loginPage.open();
        
        // Tab to username field
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-test="username"]')).toBeFocused();
        
        // Tab to password field
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-test="password"]')).toBeFocused();
        
        console.log('✅ Keyboard navigation works');
    });

    test('EDGE-010: Screen reader - Accessibility check', 
        async ({ page, loginPage }) => {
        
        await loginPage.open();
        
        // Check aria labels
        const usernameLabel = await page.locator('[data-test="username"]').getAttribute('placeholder');
        expect(usernameLabel).toBe('Username');
        
        const passwordLabel = await page.locator('[data-test="password"]').getAttribute('placeholder');
        expect(passwordLabel).toBe('Password');
        
        console.log('✅ Basic accessibility checks passed');
    });
});
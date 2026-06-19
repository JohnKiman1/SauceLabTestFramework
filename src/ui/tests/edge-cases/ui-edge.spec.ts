import { test, expect } from '../../fixtures/customFixtures';
import testData from '../../fixtures/test-data.json';

test.describe('Edge Cases - UI', () => {
    
    test('EDGE-007: Responsive - Mobile viewport', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
 
        await page.setViewportSize(testData.viewport.mobile);
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        
        const isVisible = await page.locator('[data-test="inventory-container"]').isVisible();
        expect(isVisible).toBe(true);
        console.log('✅ Mobile viewport works');
    });

    test('EDGE-008: Responsive - Tablet viewport', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
 
        await page.setViewportSize(testData.viewport.tablet);
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        
        const isVisible = await page.locator('[data-test="inventory-container"]').isVisible();
        expect(isVisible).toBe(true);
        console.log('✅ Tablet viewport works');
    });

    test('EDGE-009: Keyboard navigation', 
        async ({ page, loginPage }) => {
        
        await loginPage.open();
        
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-test="username"]')).toBeFocused();
        
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-test="password"]')).toBeFocused();
        
        console.log('✅ Keyboard navigation works');
    });

    test('EDGE-010: Screen reader - Accessibility check', 
        async ({ page, loginPage }) => {
        
        await loginPage.open();
        
        const usernameLabel = await page.locator('[data-test="username"]').getAttribute('placeholder');
        expect(usernameLabel).toBe('Username');
        
        const passwordLabel = await page.locator('[data-test="password"]').getAttribute('placeholder');
        expect(passwordLabel).toBe('Password');
        
        console.log('✅ Basic accessibility checks passed');
    });
});
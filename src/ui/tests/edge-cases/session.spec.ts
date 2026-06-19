import { test, expect } from '../../fixtures/customFixtures';
import testData from '../../fixtures/test-data.json';

test.describe('Edge Cases - Session', () => {
    
    test('EDGE-001: Session persists after page reload @smoke', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
        
        console.log('🔄 Testing session persistence after page reload...');
        
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        console.log('✅ Logged in successfully');
        
        await page.reload();
        console.log('🔄 Page reloaded');
        
        await expect(page).toHaveURL(testData.urls.inventory);
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
        console.log('✅ Session survived page reload');
    });

    test('EDGE-002: Session persists after navigating away and back', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
        
        console.log('🔄 Testing session persistence after navigation...');
        
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        console.log('✅ Logged in successfully');
        
        await page.goto(testData.urls.cart);
        await expect(page).toHaveURL(testData.urls.cart);
        console.log('✅ Navigated to cart');
        
        await page.goto(testData.urls.inventory);
        await expect(page).toHaveURL(testData.urls.inventory);
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
        console.log('✅ Session survived navigation');
    });

    test('EDGE-003: Logout clears session', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
        
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        
        console.log('🔄 Attempting to logout...');
        
        await page.click('[data-test="open-menu"]', { force: true });
        console.log('✅ Menu opened');
        
        await page.waitForSelector('[data-test="logout-sidebar-link"]', { 
            state: 'visible',
            timeout: testData.timeouts.medium
        });
        
        await page.click('[data-test="logout-sidebar-link"]');
        console.log('✅ Logout clicked');
        
        await page.waitForURL(testData.urls.base, { timeout: testData.timeouts.medium });
        
        await expect(page).toHaveURL(testData.urls.base);
        await expect(page.locator('[data-test="username"]')).toBeVisible();
        console.log('✅ Logout successful - session cleared');
    });
});
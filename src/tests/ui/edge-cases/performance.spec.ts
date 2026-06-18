import { test, expect } from '../../../fixtures/customFixtures';

test.describe('Edge Cases - Performance', () => {
    
    test('EDGE-004: Performance glitch user - slow loading', 
        async ({ loginPage, inventoryPage }) => {
        
        const startTime = Date.now();
        await loginPage.open();
        await loginPage.login('performance_glitch_user', 'secret_sauce');
        await inventoryPage.verifyPage();
        const endTime = Date.now();
        
        const loadTime = endTime - startTime;
        console.log(`⏱️ Load time: ${loadTime}ms`);
        
        // Should still load eventually (just slower)
        expect(loadTime).toBeGreaterThan(1000);
        console.log('✅ Performance glitch user handled');
    });

    test('EDGE-005: Rapid navigation between pages', 
        async ({ authenticatedPage }) => {
        
        const pages = ['/inventory.html', '/cart.html', '/inventory.html', '/cart.html'];
        for (const pageUrl of pages) {
            await authenticatedPage.goto(pageUrl);
            await authenticatedPage.waitForLoadState('domcontentloaded');
            console.log(`✅ Navigated to ${pageUrl}`);
        }
        
        await expect(authenticatedPage).toHaveURL(/cart.html/);
    });

    test('EDGE-006: Multiple quick clicks on add to cart', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
        
        console.log('🔄 Testing multiple quick clicks on Add to Cart...');
        
        // Step 1: Login
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        
        // ✅ Step 2: Get the "Add to cart" button for the item
        const itemName = 'Sauce Labs Backpack';
        console.log(`📦 Testing "${itemName}"...`);
        
        // Find the item and its Add to Cart button
        const item = page.locator(`[data-test="inventory-item"]:has-text("${itemName}")`);
        const addButton = item.locator('button:has-text("Add to cart")');
        
        // ✅ Step 3: Click the button multiple times quickly
        console.log('🖱️ Clicking Add to Cart 5 times quickly...');
        for (let i = 0; i < 5; i++) {
            // Click the button (it will be removed after first click)
            await addButton.click({ force: true, timeout: 1000 }).catch(() => {
                console.log(`  Click ${i + 1}: Button already changed to "Remove"`);
            });
            console.log(`  Click ${i + 1}/5`);
        }
        
        // ✅ Step 4: Verify it only added once
        const count = await inventoryPage.getCartCount();
        console.log(`📊 Cart count: ${count}`);
        expect(count).toBe(1);
        console.log('✅ Duplicate clicks prevented - only one item in cart');
    });
});
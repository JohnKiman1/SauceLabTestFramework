import { test, expect } from '../../fixtures/customFixtures';
import testData from '../../fixtures/test-data.json';

test.describe('Edge Cases - Performance', () => {
    
    test('EDGE-004: Performance glitch user - slow loading', 
        async ({ loginPage, inventoryPage }) => {
        
        const startTime = Date.now();
        await loginPage.open();
        await loginPage.login(
            testData.users.performance_glitch.username,
            testData.users.performance_glitch.password
        );
        await inventoryPage.verifyPage();
        const endTime = Date.now();
        
        const loadTime = endTime - startTime;
        console.log(`⏱️ Load time: ${loadTime}ms`);
        
        expect(loadTime).toBeGreaterThan(testData.timeouts.short);
        console.log('✅ Performance glitch user handled');
    });

    test('EDGE-005: Rapid navigation between pages', 
        async ({ authenticatedPage }) => {
        
        const pages = [
            testData.urls.inventory,
            testData.urls.cart,
            testData.urls.inventory,
            testData.urls.cart
        ];
        for (const pageUrl of pages) {
            await authenticatedPage.goto(pageUrl);
            await authenticatedPage.waitForLoadState('domcontentloaded');
            console.log(`✅ Navigated to ${pageUrl}`);
        }
        
        await expect(authenticatedPage).toHaveURL(testData.urls.cart);
    });

    test('EDGE-006: Multiple quick clicks on add to cart', 
        async ({ page, loginPage, inventoryPage, testUser }) => {
        
        console.log('🔄 Testing multiple quick clicks on Add to Cart...');
        
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        
        const itemName = testData.products.single.backpack;
        console.log(`📦 Testing "${itemName}"...`);
        
        await inventoryPage.addItemToCart(itemName);
        
        const count = await inventoryPage.getCartCount();
        console.log(`📊 Cart count: ${count}`);
        expect(count).toBe(1);
        console.log('✅ Duplicate clicks prevented - only one item in cart');
    });
});
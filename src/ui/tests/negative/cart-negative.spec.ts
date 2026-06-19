import { test, expect } from '../../fixtures/customFixtures';
import { CartPage } from '../../pages/CartPage';
import testData from '../../fixtures/test-data.json';

test.describe('Negative - Cart', () => {
    
    test.beforeEach(async ({ loginPage, inventoryPage, testUser }) => {
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
    });

    test('NEG-007: Remove item from empty cart', 
        async ({ page, inventoryPage }) => {
        
        // Cart should be empty initially
        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(0);
        console.log('✅ Cart is empty - no items to remove');
    });

    test('NEG-008: Add duplicate item to cart', 
        async ({ page, inventoryPage }) => {
        
        const itemName = testData.products.single.backpack;
        console.log(`🔄 Testing duplicate prevention for "${itemName}"...`);
        
        // Step 1: Add item to cart
        await inventoryPage.addItemToCart(itemName);
        console.log('✅ First click: Item added to cart');
        
        // Step 2: Verify cart count is 1
        let cartCount = await inventoryPage.getCartCount();
        console.log(`📊 Cart count after first click: ${cartCount}`);
        expect(cartCount).toBe(1);
        
        // Step 3: Verify the button changed to "Remove"
        const item = page.locator(`[data-test="inventory-item"]:has-text("${itemName}")`);
        const removeButton = item.locator('button:has-text("Remove")');
        await expect(removeButton).toBeVisible({ timeout: testData.timeouts.medium });
        console.log('✅ Button changed to "Remove"');
        
        // Step 4: Try to click "Add to cart" again (should not exist)
        const addButton = item.locator('button:has-text("Add to cart")');
        const isAddButtonVisible = await addButton.isVisible().catch(() => false);
        console.log(`📊 Is "Add to cart" button visible? ${isAddButtonVisible}`);
        expect(isAddButtonVisible).toBe(false);
        console.log('✅ "Add to cart" button is no longer visible - duplicate prevented');
        
        // Step 5: Verify cart count is still 1 (not 2)
        cartCount = await inventoryPage.getCartCount();
        console.log(`📊 Final cart count: ${cartCount}`);
        expect(cartCount).toBe(1);
        console.log('✅ Duplicate item not added - cart still has 1 item');
    });
});
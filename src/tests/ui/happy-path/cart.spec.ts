import { test, expect } from '../../../fixtures/customFixtures';
import { CartPage } from '../../../pages/CartPage';

test.describe('Happy Path - Cart', () => {
    
    test.beforeEach(async ({ loginPage, inventoryPage, testUser }) => {
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
    });

    test('HP-010: Add item to cart @smoke', 
        async ({ page, inventoryPage }) => {
        
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(1);
        console.log(`✅ Cart has ${cartCount} item`);
    });

    test('HP-011: Add multiple items to cart @smoke', 
        async ({ page, inventoryPage }) => {
        
        const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
        for (const item of items) {
            await inventoryPage.addItemToCart(item);
        }
        
        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(3);
        console.log(`✅ Cart has ${cartCount} items`);
    });

    test('HP-012: Remove item from cart', 
        async ({ page, inventoryPage }) => {
        
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
        
        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(0);
        console.log('✅ Item removed from cart');
    });

     //HP-013 - Navigate to cart with better assertions
    test('HP-013: Navigate to cart', 
        async ({ page, inventoryPage }) => {
        
        console.log('🛒 Testing navigation to cart...');
        
        const itemName = 'Sauce Labs Backpack';
        
        // Step 1: Add item to cart
        await inventoryPage.addItemToCart(itemName);
        console.log('✅ Item added to cart');
        
        // Step 2: Verify cart badge shows 1
        const badgeCount = await inventoryPage.getCartCount();
        expect(badgeCount).toBe(1);
        console.log(`✅ Cart badge shows ${badgeCount} item`);
        
        // Step 3: Navigate to cart
        await inventoryPage.goToCart();
        console.log('✅ Navigated to cart page');
        
        // Step 4: Create cart page object
        const cartPage = new CartPage(page);
        
        // Step 5: Wait for cart page to load
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(500);
        
        // Step 6: Verify cart page
        await cartPage.verifyCartPage();
        
        // Step 7: Verify cart has items - using the FIXED selector
        await cartPage.verifyCartHasItems(1);
        console.log('✅ Cart has 1 item');
        
        // Step 8: Verify the specific item is in cart
        await cartPage.verifyItemInCart(itemName);
        
        // Step 9: Get and log all items in cart
        const itemNames = await cartPage.getCartItemNames();
        console.log(`📦 Items in cart: ${itemNames.join(', ')}`);
        
        // Step 10: Get and log quantities
        const quantities = await cartPage.getCartItemQuantities();
        console.log(`📊 Quantities: ${quantities.join(', ')}`);
        
        console.log('✅ Cart navigation and verification successful');
    });
});
import { test, expect } from '../../fixtures/customFixtures';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import testData from '../../fixtures/test-data.json';

test.describe('Happy Path - Checkout', () => {
    
    test.beforeEach(async ({ loginPage, inventoryPage, testUser }) => {
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
    });

    test('HP-014: Complete checkout flow @smoke', 
        async ({ page, inventoryPage }) => {
        
        console.log('🛒 Testing complete checkout flow...');
        
        // Step 1: Add item to cart
        await inventoryPage.addItemToCart(testData.products.single.backpack);
        await inventoryPage.goToCart();
        console.log('✅ Item added to cart');
        
        // Step 2: Proceed to checkout
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        console.log('✅ Proceeded to checkout');
        
        // Step 3: Fill checkout info
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInfo(
            testData.checkout.valid.first_name,
            testData.checkout.valid.last_name,
            testData.checkout.valid.postal_code
        );
        await checkoutPage.continueCheckout();
        console.log('✅ Checkout info filled');
        
        // Step 4: Verify overview
        await checkoutPage.verifyCheckoutOverview();
        await checkoutPage.verifyItemsExist();
        console.log('✅ Overview verified');
        
        // Step 5: Finish checkout
        await checkoutPage.finishCheckout();
        await checkoutPage.verifyCheckoutComplete();
        console.log('✅ Checkout completed');
        
        // Step 6: Verify success message
        const header = await checkoutPage.getCompleteHeader();
        expect(header).toContain(testData.messages.success.checkout_complete);
        console.log('✅ Checkout completed successfully');
    });

    test('HP-015: Checkout with empty cart', 
        async ({ page, inventoryPage }) => {
        
        console.log('🛒 Testing checkout with empty cart...');
        
        // Step 1: Go to cart directly (should be empty)
        await inventoryPage.goToCart();
        const cartPage = new CartPage(page);
        await cartPage.verifyCartPage();
        
        // Step 2: Verify cart is empty
        const count = await cartPage.getCartItemCount();
        console.log(`📊 Cart has ${count} items`);
        expect(count).toBe(0);
        console.log('✅ Cart is empty');
        
        // Step 3: Proceed to checkout with empty cart
        await cartPage.proceedToCheckout();
        console.log('✅ Proceeded to checkout with empty cart');
        
        // Step 4: Fill checkout info
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInfo(
            testData.checkout.valid.first_name,
            testData.checkout.valid.last_name,
            testData.checkout.valid.postal_code
        );
        await checkoutPage.continueCheckout();
        console.log('✅ Checkout info filled');
        
        // Step 5: Verify overview page
        await checkoutPage.verifyCheckoutOverview();
        
        // Step 6: Verify no items in checkout
        const itemCount = await checkoutPage.getItemCount();
        console.log(`📊 Checkout overview has ${itemCount} items`);
        expect(itemCount).toBe(0);
        console.log('✅ Empty cart checkout works');
        
        // Step 7: Finish checkout
        await checkoutPage.finishCheckout();
        await checkoutPage.verifyCheckoutComplete();
        
        const header = await checkoutPage.getCompleteHeader();
        expect(header).toContain(testData.messages.success.checkout_complete);
        console.log('✅ Empty cart checkout completed successfully');
    });
});
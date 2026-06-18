import { test, expect } from '../../../fixtures/customFixtures';
import { CartPage } from '../../../pages/CartPage';
import { CheckoutPage } from '../../../pages/CheckoutPage';

test.describe('Negative - Checkout', () => {
    
    test.beforeEach(async ({ page, loginPage, inventoryPage, testUser }) => {
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();
    });

    test('NEG-009: Checkout with missing first name', 
        async ({ page }) => {
        
        console.log('🔄 Testing checkout with missing first name...');
        
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        console.log('✅ Navigated to checkout');
        
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInfo('', 'Doe', '12345');
        console.log('✅ Filled checkout info (missing first name)');
        
        // ✅ FIXED: Expect validation error (not success)
        await checkoutPage.continueCheckout(false);
        console.log('✅ Continue clicked - validation error expected');
        
        // ✅ Verify error message
        await checkoutPage.verifyError('First Name is required');
        console.log('✅ First name validation works');
    });

    test('NEG-010: Checkout with missing last name', 
        async ({ page }) => {
        
        console.log('🔄 Testing checkout with missing last name...');
        
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        console.log('✅ Navigated to checkout');
        
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInfo('John', '', '12345');
        console.log('✅ Filled checkout info (missing last name)');
        
        // ✅ FIXED: Expect validation error
        await checkoutPage.continueCheckout(false);
        console.log('✅ Continue clicked - validation error expected');
        
        await checkoutPage.verifyError('Last Name is required');
        console.log('✅ Last name validation works');
    });

    test('NEG-011: Checkout with missing postal code', 
        async ({ page }) => {
        
        console.log('🔄 Testing checkout with missing postal code...');
        
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        console.log('✅ Navigated to checkout');
        
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInfo('John', 'Doe', '');
        console.log('✅ Filled checkout info (missing postal code)');
        
        // ✅ FIXED: Expect validation error
        await checkoutPage.continueCheckout(false);
        console.log('✅ Continue clicked - validation error expected');
        
        await checkoutPage.verifyError('Postal Code is required');
        console.log('✅ Postal code validation works');
    });

    test('NEG-012: Checkout with all fields empty', 
        async ({ page }) => {
        
        console.log('🔄 Testing checkout with all fields empty...');
        
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        console.log('✅ Navigated to checkout');
        
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInfo('', '', '');
        console.log('✅ Filled checkout info (all fields empty)');
        
        // ✅ FIXED: Expect validation error
        await checkoutPage.continueCheckout(false);
        console.log('✅ Continue clicked - validation error expected');
        
        await checkoutPage.verifyError('First Name is required');
        console.log('✅ Empty fields validation works');
    });

    test('NEG-013: Cancel checkout', 
        async ({ page }) => {
        
        console.log('🔄 Testing cancel checkout...');
        
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        console.log('✅ Navigated to checkout');
        
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.cancelCheckout();
        console.log('✅ Cancelled checkout');
        
        // Should go back to cart
        await expect(page).toHaveURL(/cart.html/);
        console.log('✅ Checkout cancelled successfully - returned to cart');
    });
});
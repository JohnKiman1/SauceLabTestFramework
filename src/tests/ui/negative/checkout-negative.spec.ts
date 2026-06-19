import { test, expect } from '../../../fixtures/customFixtures';
import { CartPage } from '../../../pages/CartPage';
import { CheckoutPage } from '../../../pages/CheckoutPage';
import testData from '../../../fixtures/test-data.json';

test.describe('Negative - Checkout', () => {
    
    test.beforeEach(async ({ page, loginPage, inventoryPage, testUser }) => {
        await loginPage.open();
        await loginPage.login(testUser.username, testUser.password);
        await inventoryPage.verifyPage();
        await inventoryPage.addItemToCart(testData.products.single.backpack);
        await inventoryPage.goToCart();
    });

    test('NEG-009: Checkout with missing first name', 
        async ({ page }) => {
        
        console.log('🔄 Testing checkout with missing first name...');
        
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        console.log('✅ Navigated to checkout');
        
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInfo('', testData.checkout.valid.last_name, testData.checkout.valid.postal_code);
        console.log('✅ Filled checkout info (missing first name)');
        
        await checkoutPage.continueCheckout(false);
        console.log('✅ Continue clicked - validation error expected');
        
        await checkoutPage.verifyError(testData.messages.error.first_name_required);
        console.log('✅ First name validation works');
    });

    test('NEG-010: Checkout with missing last name', 
        async ({ page }) => {
        
        console.log('🔄 Testing checkout with missing last name...');
        
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        console.log('✅ Navigated to checkout');
        
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInfo(testData.checkout.valid.first_name, '', testData.checkout.valid.postal_code);
        console.log('✅ Filled checkout info (missing last name)');
        
        await checkoutPage.continueCheckout(false);
        console.log('✅ Continue clicked - validation error expected');
        
        await checkoutPage.verifyError(testData.messages.error.last_name_required);
        console.log('✅ Last name validation works');
    });

    test('NEG-011: Checkout with missing postal code', 
        async ({ page }) => {
        
        console.log('🔄 Testing checkout with missing postal code...');
        
        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        console.log('✅ Navigated to checkout');
        
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInfo(testData.checkout.valid.first_name, testData.checkout.valid.last_name, '');
        console.log('✅ Filled checkout info (missing postal code)');
        
        await checkoutPage.continueCheckout(false);
        console.log('✅ Continue clicked - validation error expected');
        
        await checkoutPage.verifyError(testData.messages.error.postal_code_required);
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
        
        await checkoutPage.continueCheckout(false);
        console.log('✅ Continue clicked - validation error expected');
        
        await checkoutPage.verifyError(testData.messages.error.first_name_required);
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
        await expect(page).toHaveURL(testData.urls.cart);
        console.log('✅ Checkout cancelled successfully - returned to cart');
    });
});
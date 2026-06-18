import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // SELECTORS
    // ✅ FIXED: Cart items use data-test="inventory-item" on cart page
    private get cartItems() {
        return this.page.locator('[data-test="inventory-item"]');
    }
    
    private get cartItemQuantities() {
        return this.page.locator('[data-test="item-quantity"]');
    }
    
    private get cartItemNames() {
        return this.page.locator('[data-test="inventory-item-name"]');
    }
    
    private get cartItemDescriptions() {
        return this.page.locator('[data-test="inventory-item-desc"]');
    }
    
    private get cartItemPrices() {
        return this.page.locator('[data-test="inventory-item-price"]');
    }
    
    private get checkoutButton() {
        return this.page.locator('[data-test="checkout"]');
    }
    
    private get continueShoppingButton() {
        return this.page.locator('[data-test="continue-shopping"]');
    }
    
    private get cartBadge() {
        return this.page.locator('[data-test="shopping-cart-badge"]');
    }

    // ACTIONS
    async open() {
        await this.page.goto('/cart.html');
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.checkoutButton).toBeVisible({ timeout: 10000 });
    }

    // ✅ FIXED: Get cart item count using the correct selector
    async getCartItemCount(): Promise<number> {
        try {
            // Wait for cart items to be visible
            await this.cartItems.first().waitFor({ 
                state: 'visible', 
                timeout: 5000 
            });
            return await this.cartItems.count();
        } catch (error) {
            // If no items found, return 0
            console.log('⚠️ No cart items found');
            return 0;
        }
    }

    // ✅ NEW: Get cart item quantities
    async getCartItemQuantities(): Promise<string[]> {
        return await this.cartItemQuantities.allTextContents();
    }

    // ✅ NEW: Get cart item names
    async getCartItemNames(): Promise<string[]> {
        return await this.cartItemNames.allTextContents();
    }

    // ✅ NEW: Get cart item prices
    async getCartItemPrices(): Promise<string[]> {
        return await this.cartItemPrices.allTextContents();
    }

    // ✅ NEW: Check if specific item exists in cart
    async isItemInCart(itemName: string): Promise<boolean> {
        const names = await this.getCartItemNames();
        return names.some(name => name.includes(itemName));
    }

    // ✅ NEW: Verify specific item is in cart
    async verifyItemInCart(itemName: string) {
        const isInCart = await this.isItemInCart(itemName);
        expect(isInCart).toBe(true);
        console.log(`✅ "${itemName}" found in cart`);
    }

    async getCartBadgeCount(): Promise<number> {
        const badge = this.cartBadge;
        if (await badge.isVisible().catch(() => false)) {
            return parseInt(await badge.textContent() || '0');
        }
        return 0;
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
        await expect(this.page).toHaveURL(/checkout-step-one/, { timeout: 10000 });
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
        await expect(this.page).toHaveURL(/inventory.html/, { timeout: 10000 });
    }

    // ✅ FIXED: Remove item by name
    async removeItem(itemName: string) {
        // The remove button has data-test like "remove-sauce-labs-backpack"
        const removeId = `remove-${itemName.toLowerCase().replace(/ /g, '-')}`;
        const removeButton = this.page.locator(`[data-test="${removeId}"]`);
        await removeButton.click();
    }

    // VERIFICATIONS
    async verifyCartPage() {
        await expect(this.page).toHaveURL(/cart.html/);
        await expect(this.checkoutButton).toBeVisible({ timeout: 10000 });
        console.log('✅ Cart page verified');
    }

    // ✅ FIXED: Verify cart has expected number of items
    async verifyCartHasItems(expectedCount: number) {
        // Wait a moment for items to render
        await this.page.waitForTimeout(500);
        
        // Get count using the correct selector
        const count = await this.getCartItemCount();
        console.log(`📊 Found ${count} items in cart, expected ${expectedCount}`);
        
        expect(count).toBe(expectedCount);
    }

    // ✅ NEW: Verify cart has specific item with quantity
    async verifyCartItem(itemName: string, expectedQuantity: number = 1) {
        // Check if item exists
        const isInCart = await this.isItemInCart(itemName);
        expect(isInCart).toBe(true);
        console.log(`✅ "${itemName}" found in cart`);
        
        // Check quantity if needed
        const quantities = await this.getCartItemQuantities();
        const index = (await this.getCartItemNames()).findIndex(name => name.includes(itemName));
        if (index !== -1 && expectedQuantity) {
            expect(quantities[index]).toBe(expectedQuantity.toString());
            console.log(`✅ Quantity is ${expectedQuantity}`);
        }
    }

    async verifyCartEmpty() {
        const count = await this.getCartItemCount();
        expect(count).toBe(0);
        await expect(this.cartItems).not.toBeVisible();
    }
}
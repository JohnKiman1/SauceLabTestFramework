import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // ========== SELECTORS ==========
    
    private get inventoryPageTitle() {
        return this.page.getByText('Products', { exact: true });
    }
    
    private get inventoryContainer() {
        return this.page.locator('[data-test="inventory-container"]');
    }
    
    private get inventoryItems() {
        return this.page.locator('[data-test="inventory-item"]');
    }
    
    private get shoppingCart() {
        return this.page.locator('[data-test="shopping-cart-link"]');
    }
    
    private get shoppingCartBadge() {
        return this.page.locator('[data-test="shopping-cart-badge"]');
    }
    
    private get sortDropdown() {
        return this.page.locator('[data-test="product-sort-container"]');
    }

    private get inventoryItemNames() {
        return this.page.locator('[data-test="inventory-item-name"]');
    }

    private get inventoryItemPrices() {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    // ========== VERIFICATION METHODS ==========

    async verifyPage(): Promise<void> {
        await expect(this.inventoryContainer).toBeVisible();
        await expect(this.page).toHaveURL(/inventory.html/);
        await expect(this.inventoryPageTitle).toBeVisible();
    }

    async assertInventoryPage(): Promise<void> {
        await this.verifyPage();
    }

    // ========== ITEM METHODS ==========

    async getItemCount(): Promise<number> {
        try {
            await this.inventoryItems.first().waitFor({ 
                state: 'visible', 
                timeout: 5000 
            });
            return await this.inventoryItems.count();
        } catch (error) {
            console.log('⚠️ No inventory items found');
            return 0;
        }
    }

    async getItemNames(): Promise<string[]> {
        const items = await this.inventoryItems.all();
        const names = [];
        for (const item of items) {
            const name = await item.locator('[data-test="inventory-item-name"]').textContent();
            if (name) names.push(name);
        }
        return names;
    }

    // ✅ NEW: Get item prices as numbers
    async getItemPrices(): Promise<number[]> {
        const prices = await this.inventoryItemPrices.allTextContents();
        return prices.map(p => parseFloat(p.replace('$', '')));
    }

    async getItemPriceValues(): Promise<string[]> {
        return await this.inventoryItemPrices.allTextContents();
    }

    async getFirstItemName(): Promise<string> {
        const names = await this.getItemNames();
        if (names.length === 0) {
            throw new Error('No items found in inventory');
        }
        return names[0];
    }

    // ========== ACTION METHODS ==========

    
    async addItemToCart(itemName: string): Promise<boolean> {
        try {
            // Find the item
            const item = this.page.locator(`[data-test="inventory-item"]:has-text("${itemName}")`);
            const addButton = item.locator('button:has-text("Add to cart")');
            
            // Check if the "Add to cart" button exists and is visible
            const isAddButtonVisible = await addButton.isVisible().catch(() => false);
            
            if (!isAddButtonVisible) {
                // Item is already in cart
                console.log(`ℹ️ "${itemName}" is already in cart`);
                return false;
            }
            
            // Click the button
            await addButton.click({ force: true });
            console.log(`✅ Added "${itemName}" to cart`);
            return true;
            
        } catch (error) {
            console.log(`❌ Failed to add "${itemName}" to cart:`, error);
            
            // Alternative: Check if it's already in cart
            const item = this.page.locator(`[data-test="inventory-item"]:has-text("${itemName}")`);
            const removeButton = item.locator('button:has-text("Remove")');
            const isRemoveVisible = await removeButton.isVisible().catch(() => false);
            
            if (isRemoveVisible) {
                console.log(`ℹ️ "${itemName}" is already in cart (remove button visible)`);
                return false;
            }
            
            throw new Error(`Could not find item: ${itemName}`);
        }
    }

    async removeItemFromCart(itemName: string): Promise<void> {
        const item = this.page.locator(`[data-test="inventory-item"]:has-text("${itemName}")`);
        const removeButton = item.locator('button:has-text("Remove")');
        await removeButton.click();
    }

    async clickItemByName(itemName: string): Promise<void> {
        const item = this.page.locator(`[data-test="inventory-item-name"]:has-text("${itemName}")`);
        await item.click();
    }

    getItemLocator(itemName: string) {
        return this.page.locator(`[data-test="inventory-item"]:has-text("${itemName}")`);
    }

    async getCartCount(): Promise<number> {
        const badge = this.shoppingCartBadge;
        if (await badge.isVisible()) {
            return parseInt(await badge.textContent() || '0');
        }
        return 0;
    }

    async goToCart(): Promise<void> {
        await this.shoppingCart.click();
    }

    // ========== SORT METHODS ==========

    async sortItems(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.sortDropdown.selectOption(option);
        await this.page.waitForTimeout(500);
    }

    // ========== WAIT METHODS ==========

    async waitForInventoryLoad(): Promise<void> {
        console.log('⏳ Waiting for inventory to load...');
        await this.page.waitForSelector('[data-test="inventory-container"]', { 
            timeout: 15000,
            state: 'visible' 
        });
        await this.page.waitForSelector('[data-test="inventory-item"]', { 
            timeout: 10000,
            state: 'visible' 
        });
        await this.page.waitForLoadState('networkidle');
        console.log('✅ Inventory loaded');
    }
}
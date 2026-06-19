import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // SELECTORS
    private get productName() {
        return this.page.locator('[data-test="inventory-item-name"]');
    }
    
    private get productPrice() {
        return this.page.locator('[data-test="inventory-item-price"]');
    }
    
    private get productDescription() {
        return this.page.locator('[data-test="inventory-item-desc"]');
    }
    
    private get addToCartButton() {
        return this.page.locator('[data-test="add-to-cart"]');
    }
    
    private get removeFromCartButton() {
        return this.page.locator('[data-test="remove"]');
    }
    
    private get backButton() {
        return this.page.locator('[data-test="back-to-products"]');
    }

    // ACTIONS
    async open(productId: string) {
        await this.page.goto(`/inventory-item.html?id=${productId}`);
        await this.waitForLoad();
    }

    async getProductName(): Promise<string> {
        return await this.productName.textContent() || '';
    }

    async getProductPrice(): Promise<string> {
        return await this.productPrice.textContent() || '';
    }

    async getProductDescription(): Promise<string> {
        return await this.productDescription.textContent() || '';
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async removeFromCart() {
        await this.removeFromCartButton.click();
    }

    async goBack() {
        await this.backButton.click();
    }

    async verifyProductPage() {
        await expect(this.productName).toBeVisible();
        await expect(this.productPrice).toBeVisible();
    }
}
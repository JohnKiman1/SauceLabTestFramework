import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // SELECTORS
    private get firstNameInput() {
        return this.page.locator('[data-test="firstName"]');
    }
    
    private get lastNameInput() {
        return this.page.locator('[data-test="lastName"]');
    }
    
    private get postalCodeInput() {
        return this.page.locator('[data-test="postalCode"]');
    }
    
    private get continueButton() {
        return this.page.locator('[data-test="continue"]');
    }
    
    private get cancelButton() {
        return this.page.locator('[data-test="cancel"]');
    }
    
    private get finishButton() {
        return this.page.locator('[data-test="finish"]');
    }
    
    private get checkoutItems() {
        return this.page.locator('[data-test="inventory-item"]');
    }
    
    private get checkoutItemNames() {
        return this.page.locator('[data-test="inventory-item-name"]');
    }
    
    private get checkoutItemQuantities() {
        return this.page.locator('[data-test="item-quantity"]');
    }
    
    private get checkoutItemPrices() {
        return this.page.locator('[data-test="inventory-item-price"]');
    }
    
    private get subtotalLabel() {
        return this.page.locator('[data-test="subtotal-label"]');
    }
    
    private get taxLabel() {
        return this.page.locator('[data-test="tax-label"]');
    }
    
    private get totalLabel() {
        return this.page.locator('[data-test="total-label"]');
    }
    
    // Get error message
    private get errorMessage() {
        return this.page.locator('[data-test="error"]');
    }
    
    private get completeHeader() {
        return this.page.locator('[data-test="complete-header"]');
    }
    
    private get completeText() {
        return this.page.locator('[data-test="complete-text"]');
    }

    // ACTIONS
    async open() {
        await this.page.goto('/checkout-step-one.html');
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.firstNameInput).toBeVisible({ timeout: 10000 });
    }

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    // Continue checkout
    async continueCheckout(expectSuccess: boolean = true) {
        await this.continueButton.click();
        
        if (expectSuccess) {
            // ✅ If we expect success, wait for overview page
            await this.page.waitForURL(/checkout-step-two/, { timeout: 10000 });
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(500);
        } else {
            // ✅ If we expect validation error, wait for error message
            // The error message is inside h3[data-test="error"]
            await this.page.waitForSelector('[data-test="error"]', { 
                state: 'visible', 
                timeout: 5000 
            });
        }
    }

    async finishCheckout() {
        await this.finishButton.click();
        await this.page.waitForURL(/checkout-complete/, { timeout: 10000 });
        await this.page.waitForLoadState('domcontentloaded');
    }

    async cancelCheckout() {
        await this.cancelButton.click();
        await this.page.waitForURL(/cart.html/, { timeout: 10000 });
    }

    async getItemCount(): Promise<number> {
        try {
            await this.checkoutItems.first().waitFor({ 
                state: 'visible', 
                timeout: 5000 
            });
            return await this.checkoutItems.count();
        } catch (error) {
            console.log('⚠️ No checkout items found');
            return 0;
        }
    }

    async getCheckoutItemNames(): Promise<string[]> {
        return await this.checkoutItemNames.allTextContents();
    }

    async getCheckoutItemQuantities(): Promise<string[]> {
        return await this.checkoutItemQuantities.allTextContents();
    }

    async getCheckoutItemPrices(): Promise<string[]> {
        return await this.checkoutItemPrices.allTextContents();
    }

    async getSubtotal(): Promise<string> {
        return await this.subtotalLabel.textContent() || '';
    }

    async getTotal(): Promise<string> {
        return await this.totalLabel.textContent() || '';
    }

    // Get error message
    async getErrorMessage(): Promise<string> {
        try {
            await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
            const errorText = await this.errorMessage.textContent() || '';
            return errorText.trim();
        } catch (error) {
            return '';
        }
    }

    async getCompleteHeader(): Promise<string> {
        return await this.completeHeader.textContent() || '';
    }

    async getCompleteText(): Promise<string> {
        return await this.completeText.textContent() || '';
    }

    // VERIFICATIONS
    async verifyCheckoutPage() {
        await expect(this.page).toHaveURL(/checkout-step-one/);
        await expect(this.firstNameInput).toBeVisible({ timeout: 10000 });
        console.log('✅ Checkout page verified');
    }

    async verifyCheckoutOverview() {
        await expect(this.page).toHaveURL(/checkout-step-two/);
        await expect(this.finishButton).toBeVisible({ timeout: 10000 });
        console.log('✅ Checkout overview verified');
    }

    async verifyCheckoutComplete() {
        await expect(this.page).toHaveURL(/checkout-complete/);
        await expect(this.completeHeader).toBeVisible({ timeout: 10000 });
        console.log('✅ Checkout complete verified');
    }

    async verifyItemsExist() {
        await this.page.waitForTimeout(500);
        const count = await this.getItemCount();
        console.log(`📊 Found ${count} items in checkout overview`);
        expect(count).toBeGreaterThan(0);
    }

    async verifyItemInCheckout(itemName: string) {
        const names = await this.getCheckoutItemNames();
        const found = names.some(name => name.includes(itemName));
        expect(found).toBe(true);
        console.log(`✅ "${itemName}" found in checkout`);
    }

     //Verify error message
    async verifyError(expectedError: string) {
        const error = await this.getErrorMessage();
        console.log(`📊 Error message: "${error}"`);
        expect(error).toContain(expectedError);
    }
}
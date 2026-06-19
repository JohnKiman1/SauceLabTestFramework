import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // SELECTORS
    private get usernameInput() {
        return this.page.locator('[data-test="username"]');
    }
    
    private get passwordInput() {
        return this.page.locator('[data-test="password"]');
    }
    
    private get loginButton() {
        return this.page.locator('[data-test="login-button"]');
    }
    
    private get errorMessage() {
        return this.page.locator('[data-test="error"]');
    }
    
    private get loginLogo() {
        return this.page.locator('.login_logo');
    }

    // ACTIONS

    async open() {
        const baseURL = 'https://www.saucedemo.com';
        await this.page.goto(baseURL);
        await this.waitForLoad();
        await expect(this.loginLogo).toBeVisible();
        console.log('✅ Login page loaded');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        console.log(`🔑 Logged in as: ${username}`);
    }

    async loginAndVerify(username: string, password: string) {
        await this.login(username, password);
        await this.verifyLoginSuccess();
    }

    // VERIFICATIONS

    async verifyLoginSuccess() {
        await expect(this.page).toHaveURL(/inventory.html/);
        await this.page.waitForSelector('[data-test="inventory-container"]');
        console.log('✅ Login verified');
    }

    async getErrorMessage(): Promise<string> {
        await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
        return await this.errorMessage.textContent() || '';
    }

    async isErrorDisplayed(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    async waitForError() {
        await this.errorMessage.waitFor({ state: 'visible' });
    }

    async verifyErrorMessage(expectedMessage: string) {
        const actualMessage = await this.getErrorMessage();
        expect(actualMessage).toContain(expectedMessage);
    }

    async clearUsername() {
        await this.usernameInput.clear();
    }

    async clearPassword() {
        await this.passwordInput.clear();
    }

    async isUsernameVisible(): Promise<boolean> {
        return await this.usernameInput.isVisible();
    }

    async isLoginButtonEnabled(): Promise<boolean> {
        return await this.loginButton.isEnabled();
    }

         //Wait for login to complete
    async waitForLoginComplete() {
        await this.page.waitForURL(/inventory.html/, { timeout: 5000 });
        console.log('✅ Navigation to inventory complete');
    }

     //Wait for specific URL pattern
    async waitForURL(pattern: string | RegExp, timeout: number = 5000) {
        await this.page.waitForURL(pattern, { timeout });
    }
}
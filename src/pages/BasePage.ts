import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        if (!page) {
            throw new Error('Page is required!');
        }
        this.page = page;
    }

    /**
     * Wait for the page to load
     * ✅ FIXED: Don't use networkidle - use domcontentloaded instead
     */
    async waitForLoad() {
        // ✅ Changed from 'networkidle' to 'domcontentloaded' to avoid timeout
        await this.page.waitForLoadState('domcontentloaded');
        // Small wait to ensure dynamic content loads
        await this.page.waitForTimeout(500);
    }

    /**
     * Take a screenshot (useful for debugging)
     */
    async takeScreenshot(name: string) {
        await this.page.screenshot({
            path: `reports/ui/screenshots/${name}.png`,
            fullPage: true
        });
    }

    /**
     * Get the current page title
     */
    async getTitle() {
        return await this.page.title();
    }

    /**
     * Wait for a specific selector to be visible
     */
    async waitForSelector(selector: string, timeout: number = 10000) {
        await this.page.waitForSelector(selector, { 
            state: 'visible', 
            timeout 
        });
    }
}
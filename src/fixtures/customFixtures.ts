import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import testData from './test-data.json';
import type { BrowserContext, Page } from '@playwright/test';
import fs from 'fs';

// Define the types for our fixtures
interface CustomFixtures {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    testUser: { username: string; password: string };
    authenticatedPage: Page;
    authenticatedContext: BrowserContext; // For better cleanup
}

// Extend the base test with our custom fixtures
export const test = base.extend<CustomFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    testUser: async ({}, use) => {
        await use({
            username: testData.users.standard.username,
            password: testData.users.standard.password
        });
    },

    //Create a reusable authenticated context
    authenticatedContext: async ({ browser }, use) => {
        const storagePath = 'reports/auth/storage-state.json';
        const baseURL = 'https://www.saucedemo.com';
        
        // Ensure session exists
        if (!fs.existsSync(storagePath)) {
            const tempContext = await browser.newContext();
            const tempPage = await tempContext.newPage();
            await tempPage.goto(baseURL);
            await tempPage.fill('[data-test="username"]', 'standard_user');
            await tempPage.fill('[data-test="password"]', 'secret_sauce');
            await tempPage.click('[data-test="login-button"]');
            await tempPage.waitForURL(/inventory.html/);
            await tempContext.storageState({ path: storagePath });
            await tempContext.close();
        }
        
        // Create authenticated context
        const context = await browser.newContext({
            storageState: storagePath
        });
        
        console.log('✅ Authenticated context created (single window)');
        
        // Use the context
        await use(context);
        
        // Clean up after test
        await context.close();
    },

    // Use the authenticated context
    authenticatedPage: async ({ authenticatedContext }, use) => {
        // Create a single page from the authenticated context
        const page = await authenticatedContext.newPage();
        
        // Navigate to inventory
        await page.goto('/inventory.html');
        
        // Wait for load
        await page.waitForSelector('[data-test="inventory-container"]', {
            timeout: 10000,
            state: 'visible'
        });
        
        console.log('✅ Authenticated page ready (single tab)');
        
        await use(page);
        
        // Page will be closed when context is closed
    },
});

export { expect } from '@playwright/test';
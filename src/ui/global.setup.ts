import { FullConfig } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import fs from 'fs';

async function globalSetup(config: FullConfig) {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 GLOBAL SETUP - Running once before all tests');
    console.log('='.repeat(60) + '\n');

    // Create auth directory
    const authDir = 'reports/auth';
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }

    // Import playwright
    const { chromium } = require('@playwright/test');
    
    // Launch browser
    const browser = await chromium.launch({
        headless: true,
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        console.log('📝 Logging in as standard_user...');
        
        // Use LoginPage with the page
        const loginPage = new LoginPage(page);
        
        // Open the login page (uses the open method which handles navigation)
        await loginPage.open();
        
        // Login with valid credentials
        await loginPage.login('standard_user', 'secret_sauce');
        
        // Wait for login to complete
        await page.waitForURL(/inventory.html/, { timeout: 10000 });
        
        // Verify login worked
        const isLoggedIn = await page.locator('[data-test="inventory-container"]').isVisible();
        if (!isLoggedIn) {
            throw new Error('Login failed - could not verify inventory page');
        }
        
        // Save session
        const storagePath = 'reports/auth/storage-state.json';
        await context.storageState({ path: storagePath });
        
        console.log(`✅ Session saved: ${storagePath}`);
        console.log('🎯 All tests will reuse this authenticated session\n');
        
    } catch (error) {
        console.error('❌ Global setup failed:', error);
        throw error;
    } finally {
        await browser.close();
    }
    
    console.log('='.repeat(60));
    console.log('✅ GLOBAL SETUP COMPLETE');
    console.log('='.repeat(60) + '\n');
}

export default globalSetup;
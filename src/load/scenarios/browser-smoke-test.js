/**
 * BROWSER SMOKE TEST
 * Uses K6's built-in browser module (k6/browser)
 * Purpose: Quick sanity check with real browser interactions
 * Users: 1
 * Duration: ~30 seconds
 */

import { browser } from 'k6/browser';  // ✅ Updated import
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';  // ✅ Updated check import

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
      vus: 1,
      iterations: 1,
      maxDuration: '30s',
    },
  },
};

export default async function () {  // ✅ Added async
  const context = await browser.newContext();  // ✅ Added await
  const page = await context.newPage();  // ✅ Added await
  
  try {
    console.log('🔐 Navigating to SauceDemo...');
    await page.goto('https://www.saucedemo.com/');  // ✅ Added await
    
    // Wait for page to load
    await page.waitForSelector('[data-test="username"]');  // ✅ Added await
    
    // Fill login form
    await page.locator('[data-test="username"]').fill('standard_user');  // ✅ Added await
    await page.locator('[data-test="password"]').fill('secret_sauce');  // ✅ Added await
    
    // Click login
    await page.locator('[data-test="login-button"]').click();  // ✅ Added await
    
    // Wait for inventory page
    await page.waitForSelector('[data-test="inventory-container"]', {  // ✅ Added await
      timeout: '10s',
    });
    
    // Verify login success
    const isLoggedIn = await page.url().includes('inventory.html');  // ✅ Added await
    await check(isLoggedIn, {  // ✅ Updated check usage
      '✅ Logged in successfully': (is) => is === true,
    });
    
    console.log('✅ Test completed successfully');
    
  } catch (error) {
    console.error(`❌ Test failed: ${error}`);
  } finally {
    await page.close();  // ✅ Added await
    await context.close();  // ✅ Added await
  }
}

export function setup() {
  console.log('🔬 Starting Browser Smoke Test...');
  console.log('='.repeat(60));
}

export function teardown() {
  console.log('✅ Browser Smoke Test Completed!');
  console.log('='.repeat(60));
}
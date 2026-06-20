/**
 * BROWSER SMOKE TEST
 * Uses K6's built-in browser module (k6/browser)
 * Purpose: Quick sanity check with real browser interactions
 * Users: 1
 * Duration: ~30 seconds
 */

import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
          // ✅ Fix: Disable GPU acceleration in CI
          args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
        },
      },
      vus: 1,
      iterations: 1,
      maxDuration: '30s',
    },
  },
};

export default async function () {
  const context = await browser.newContext({
    // ✅ Fix: Add viewport and other options
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();
  
  try {
    console.log('🔐 Navigating to SauceDemo...');
    await page.goto('https://www.saucedemo.com/');
    
    // Wait for page to load
    await page.waitForSelector('[data-test="username"]');
    
    // Fill login form
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Click login
    await page.locator('[data-test="login-button"]').click();
    
    // Wait for inventory page
    await page.waitForSelector('[data-test="inventory-container"]', {
      timeout: '10s',
    });
    
    // Verify login success
    const isLoggedIn = await page.url().includes('inventory.html');
    await check(isLoggedIn, {
      '✅ Logged in successfully': (is) => is === true,
    });
    
    console.log('✅ Test completed successfully');
    
  } catch (error) {
    console.error(`❌ Test failed: ${error}`);
  } finally {
    await page.close();
    await context.close();
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
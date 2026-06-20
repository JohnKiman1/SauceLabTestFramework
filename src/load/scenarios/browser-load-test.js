/**
 * BROWSER LOAD TEST
 * Uses K6's built-in browser module (k6/browser)
 * Purpose: Simulate real user traffic with browser interactions
 * Users: 1-3
 * Duration: ~2 minutes
 */

import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 2,
      maxDuration: '2m',
      options: {
        browser: {
          type: 'chromium',
          // ✅ Fix: Disable GPU acceleration in CI
          args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
        },
      },
    },
  },
};

export default async function () {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();
  
  try {
    // 1. Login
    console.log('🔐 Logging in...');
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.waitForSelector('[data-test="inventory-container"]', { timeout: '10s' });
    console.log('✅ Logged in');
    
    // 2. Add to cart
    console.log('🛒 Adding item to cart...');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    sleep(1);
    
    // 3. Go to cart
    console.log('🛒 Going to cart...');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.waitForSelector('[data-test="cart-item"]', { timeout: '10s' });
    console.log('✅ Cart loaded');
    
    // 4. Checkout
    console.log('📦 Starting checkout...');
    await page.locator('[data-test="checkout"]').click();
    await page.waitForSelector('[data-test="firstName"]', { timeout: '5s' });
    
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    
    await page.waitForSelector('[data-test="finish"]', { timeout: '10s' });
    await page.locator('[data-test="finish"]').click();
    await page.waitForSelector('[data-test="complete-header"]', { timeout: '10s' });
    console.log('✅ Checkout completed');
    
    sleep(1);
    
  } catch (error) {
    console.error(`❌ Test failed: ${error.message}`);
  } finally {
    await page.close();
    await context.close();
  }
}

export function setup() {
  console.log('📊 Starting Browser Load Test...');
  console.log('📈 Target: 1 user, 2 iterations');
  console.log('='.repeat(60));
}

export function teardown() {
  console.log('✅ Browser Load Test Completed!');
  console.log('='.repeat(60));
}
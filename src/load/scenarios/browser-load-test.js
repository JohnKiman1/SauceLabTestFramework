/**
 * BROWSER SIMPLIFIED FULL FLOW TEST
 * Uses class selectors instead of data-test
 */

import { browser } from 'k6/browser';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 3,
      maxDuration: '2m',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // 1. Login using ID selectors
    console.log('🔐 Logging in...');
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.waitForSelector('.inventory_list', { timeout: '10s' });
    console.log('✅ Logged in');
    
    // 2. Add to cart - using class selector
    console.log('🛒 Adding item to cart...');
    await page.locator('.btn_inventory').first().click();
    sleep(1);
    
    // 3. Go to cart - using class selector
    console.log('🛒 Going to cart...');
    await page.locator('.shopping_cart_link').click();
    await page.waitForSelector('.cart_item', { timeout: '10s' });
    console.log('✅ Cart loaded');
    
    // 4. Checkout - using ID selectors
    console.log('📦 Starting checkout...');
    await page.locator('#checkout').click();
    await page.waitForSelector('#first-name', { timeout: '5s' });
    
    await page.locator('#first-name').fill('John');
    await page.locator('#last-name').fill('Doe');
    await page.locator('#postal-code').fill('12345');
    await page.locator('#continue').click();
    
    await page.waitForSelector('#finish', { timeout: '10s' });
    await page.locator('#finish').click();
    await page.waitForSelector('.complete-header', { timeout: '10s' });
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
  console.log('🛒 Starting Simplified Full Flow Test...');
  console.log('='.repeat(60));
}

export function teardown() {
  console.log('✅ Simplified Full Flow Test Completed!');
  console.log('='.repeat(60));
}
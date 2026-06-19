/**
 * BROWSER STRESS TEST
 * Purpose: Find the breaking point
 * Users: 1 → 3 → 5
 * Duration: ~2 minutes
 */

import { browser } from 'k6/browser';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    browser: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 1 },
        { duration: '30s', target: 3 },
        { duration: '30s', target: 5 },
        { duration: '20s', target: 0 },
      ],
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
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.waitForSelector('.inventory_list', { timeout: '10s' });
    console.log(`✅ VU ${__VU}: Logged in under stress`);
    
    // Add to cart
    await page.locator('.btn_inventory').first().click();
    sleep(1);
    
    // Go to cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForSelector('.cart_item', { timeout: '5s' });
    console.log(`✅ VU ${__VU}: Cart loaded under stress`);
    
  } catch (error) {
    console.error(`❌ VU ${__VU}: Failed under stress`);
  } finally {
    await page.close();
    await context.close();
  }
}

export function setup() {
  console.log('💥 Starting Stress Test...');
  console.log('📈 Target: Up to 5 concurrent users');
  console.log('='.repeat(60));
}

export function teardown() {
  console.log('✅ Stress Test Completed!');
  console.log('='.repeat(60));
}
/**
 * BROWSER ENDURANCE TEST
 * Purpose: Test long-term stability
 * Users: 1-2
 * Duration: 5-10 minutes
 */

import { browser } from 'k6/browser';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      vus: 1,
      duration: '5m',  // ✅ Start with 5 minutes
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
    console.log(`✅ VU ${__VU}: Logged in (endurance)`);
    
    // Browse inventory
    await page.locator('.inventory_item').first().click();
    sleep(2);
    
    // Go back
    await page.locator('#back-to-products').click();
    sleep(1);
    
    console.log(`✅ VU ${__VU}: Completed endurance cycle`);
    
  } catch (error) {
    console.error(`❌ VU ${__VU}: Failed during endurance`);
  } finally {
    await page.close();
    await context.close();
  }
}

export function setup() {
  console.log('🕐 Starting Endurance Test...');
  console.log('📈 Target: 1 user, 5 minutes');
  console.log('🎯 Goal: Check for memory leaks');
  console.log('='.repeat(60));
}

export function teardown() {
  console.log('✅ Endurance Test Completed!');
  console.log('='.repeat(60));
}
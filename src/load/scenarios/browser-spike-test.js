/**
 * BROWSER SPIKE TEST
 * Purpose: Test behavior under sudden traffic spikes
 * Users: 1 → 5 → 1
 * Duration: ~1 minute
 */

import { browser } from 'k6/browser';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    browser: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 1 },
        { duration: '10s', target: 5 },   // SPIKE!
        { duration: '10s', target: 5 },   // Hold
        { duration: '10s', target: 0 },   // Drop
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
    console.log(`✅ VU ${__VU}: Logged in during spike`);
    
    // Short think time
    sleep(0.5);
    
  } catch (error) {
    console.error(`❌ VU ${__VU}: Failed during spike`);
  } finally {
    await page.close();
    await context.close();
  }
}

export function setup() {
  console.log('⚡ Starting Spike Test...');
  console.log('📈 Target: Sudden surge to 5 users');
  console.log('='.repeat(60));
}

export function teardown() {
  console.log('✅ Spike Test Completed!');
  console.log('='.repeat(60));
}
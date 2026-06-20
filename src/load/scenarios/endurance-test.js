/**
 * ENDURANCE TEST
 * Purpose: Test system stability over long periods
 * Users: 20-30
 * Duration: 1 hour
 */

import { sleep } from 'k6';
import { K6_CONFIG } from '../config/k6-config.js';
import { login } from '../scripts/login-flow.js.js';
import { browseSession } from '../scripts/browse-flow.js.js';
import { fullCheckoutJourney } from '../scripts/checkout-flow.js.js';
import { getThinkTime, getRandomUser, probability } from '../scripts/helpers.js.js';

export const options = {
  stages: [
    { duration: '5m', target: 20 },
    { duration: '45m', target: 20 },
    { duration: '5m', target: 30 },
    { duration: '5m', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000', 'p(99)<6000'],
    http_req_failed: ['rate<0.03'],
    checkout_success_rate: ['rate>0.96']
  }
};

export default function () {
  const user = getRandomUser();
  const vuId = __VU;
  
  console.log(`ℹ️ VU ${vuId}: Starting endurance test iteration`);
  
  const loginResult = login(user.username, user.password);
  
  if (!loginResult.success) {
    console.error(`❌ VU ${vuId}: Login failed`);
    return;
  }
  
  console.log(`✅ VU ${vuId}: Login successful`);
  
  // 80% of users browse
  if (probability(0.8)) {
    const browseResult = browseSession();
    if (browseResult) {
      console.log(`✅ VU ${vuId}: Browsing completed`);
    }
  }
  
  // 30% of users complete checkout
  if (probability(0.3)) {
    const checkoutResult = fullCheckoutJourney();
    if (checkoutResult) {
      console.log(`✅ VU ${vuId}: Checkout completed`);
    } else {
      console.error(`❌ VU ${vuId}: Checkout failed`);
    }
  }
  
  // Longer think time for endurance (5-10 seconds)
  const thinkTime = getThinkTime(5, 10);
  sleep(thinkTime);
}

export function setup() {
  console.log('🕐 Starting Endurance Test...');
  console.log('📈 Target: 20-30 concurrent users');
  console.log('⏱️ Duration: ~1 hour');
  console.log('🎯 Goal: Detect memory leaks and stability issues');
  console.log('='.repeat(60));
}

export function teardown() {
  console.log('✅ Endurance Test Completed!');
  console.log('='.repeat(60));
}
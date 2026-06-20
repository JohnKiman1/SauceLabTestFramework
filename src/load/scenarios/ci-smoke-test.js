/**
 * CI SMOKE TEST - HTTP Only
 * For GitHub Actions environment
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.1'], // ✅ Allow 10% failure for CI
  },
};

export default function () {
  // ✅ Try the login endpoint directly
  const loginPayload = {
    username: 'standard_user',
    password: 'secret_sauce',
  };

  const loginRes = http.post('https://www.saucedemo.com/login', loginPayload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirects: 5,
  });

  check(loginRes, {
    'Login successful': (r) => r.status === 200 || r.status === 302,
  });

  // ✅ Always check inventory page
  const inventoryRes = http.get('https://www.saucedemo.com/inventory.html');
  
  check(inventoryRes, {
    'Inventory loaded': (r) => r.status === 200,
  });

  // ✅ Check cart page
  const cartRes = http.get('https://www.saucedemo.com/cart.html');
  
  check(cartRes, {
    'Cart loaded': (r) => r.status === 200,
  });

  sleep(1);
}

export function setup() {
  console.log('🔬 Starting CI Smoke Test (HTTP)...');
  console.log('='.repeat(60));
}

export function teardown() {
  console.log('✅ CI Smoke Test Completed!');
  console.log('='.repeat(60));
}
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
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // Login
  const loginPayload = {
    username: 'standard_user',
    password: 'secret_sauce',
  };

  const loginRes = http.post('https://www.saucedemo.com/', loginPayload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirects: 5,
  });

  check(loginRes, {
    'Login successful': (r) => r.status === 200 && r.url.includes('inventory.html'),
  });

  // Inventory
  const inventoryRes = http.get('https://www.saucedemo.com/inventory.html');
  check(inventoryRes, {
    'Inventory loaded': (r) => r.status === 200,
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
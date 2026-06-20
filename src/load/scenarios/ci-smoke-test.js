/**
 * CI SMOKE TEST - HTTP Only (No Login)
 * For GitHub Actions environment
 * SauceDemo is a React SPA - only the root page exists
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.5'], // ✅ Allow 50% for CI
  },
};

export default function () {
  // ✅ Only check the home page - React SPA serves everything from root
  const homeRes = http.get('https://www.saucedemo.com/');
  check(homeRes, {
    'Home page loaded': (r) => r.status === 200,
  });

  sleep(1);
}

export function setup() {
  console.log('🔬 Starting CI Smoke Test...');
}

export function teardown() {
  console.log('✅ CI Smoke Test Completed!');
}
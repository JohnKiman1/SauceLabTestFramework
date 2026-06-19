/**
 * Login flow for K6 load tests
 */

import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';
import { K6_CONFIG } from '../config/k6-config.js';

export const loginDuration = new Trend('login_duration');

export function login(username, password) {
  const startTime = Date.now();

  // ✅ First, GET the login page to establish session
  const loginPageResponse = http.get(`${K6_CONFIG.baseURL}/`);

  // ✅ Then POST to the login endpoint
  const loginUrl = `${K6_CONFIG.baseURL}/login`;
  
  const payload = {
    username: username,
    password: password,
  };

  const response = http.post(loginUrl, payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    // ✅ Allow redirects (login should redirect to inventory)
    redirects: 10,
  });

  const duration = Date.now() - startTime;
  loginDuration.add(duration);

  // ✅ Check for successful login (redirected to inventory page)
  const success = check(response, {
    'Login successful': (r) => r.status === 200 && r.url.includes('inventory.html'),
    'Login response fast': (r) => duration < 2000,
  });

  if (!success) {
    let errorBody = 'Unable to read response body';
    if (response.body && typeof response.body === 'string') {
      errorBody = response.body.substring(0, 200);
    }
    console.error(`❌ Login failed: ${response.status} - ${errorBody}`);
    console.error(`📌 Response URL: ${response.url}`);
  }

  return {
    success: success,
    status: response.status,
    duration: duration,
    cookies: response.cookies,
    body: response.body,
    url: response.url,
  };
}

export function verifyLoggedIn() {
  const response = http.get(`${K6_CONFIG.baseURL}/inventory.html`);

  const success = check(response, {
    'Inventory page accessible': (r) => r.status === 200,
    'Inventory loaded quickly': (r) => r.timings.duration < 3000,
  });

  return {
    success: success,
    status: response.status,
    duration: response.timings.duration,
  };
}
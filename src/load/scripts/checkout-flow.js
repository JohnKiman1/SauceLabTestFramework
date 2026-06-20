/**
 * Checkout flow for K6 load tests
 */

import http from 'k6/http';
import { check } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { K6_CONFIG } from '../config/k6-config.js';
import { getRandomProduct, getRandomPostalCode } from './helpers.js';

export const checkoutSuccessRate = new Rate('checkout_success_rate');
export const cartDuration = new Trend('cart_duration');
export const checkoutDuration = new Trend('checkout_duration');

export function addToCart(itemName) {
  const startTime = Date.now();

  const payload = `item=${encodeURIComponent(itemName)}&quantity=1`;
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = http.post(`${K6_CONFIG.baseURL}/add-to-cart`, payload, { headers });

  const duration = Date.now() - startTime;
  cartDuration.add(duration);

  const success = check(response, {
    'Item added to cart': (r) => r.status === 200,
    'Cart operation fast': (r) => duration < 1000,
  });

  if (!success) {
    let errorBody = 'Unable to read response';
    if (response.body && typeof response.body === 'string') {
      errorBody = response.body.substring(0, 100);
    }
    console.error(`❌ Add to cart failed: ${response.status} - ${errorBody}`);
  }

  return { success, status: response.status, duration };
}

export function viewCart() {
  const startTime = Date.now();
  const response = http.get(`${K6_CONFIG.baseURL}/cart.html`);
  const duration = Date.now() - startTime;
  cartDuration.add(duration);

  const success = check(response, {
    'Cart loaded': (r) => r.status === 200,
    'Cart loaded fast': (r) => duration < 1500,
  });

  return { success, status: response.status, duration };
}

export function completeCheckout() {
  const startTime = Date.now();

  const payload = `firstName=John&lastName=Doe&postalCode=${getRandomPostalCode()}`;
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = http.post(`${K6_CONFIG.baseURL}/checkout`, payload, { headers });

  const duration = Date.now() - startTime;
  checkoutDuration.add(duration);

  const success = response.status === 200;
  checkoutSuccessRate.add(success);

  const verified = check(response, {
    'Checkout completed': (r) => r.status === 200,
    'Checkout fast': (r) => duration < 3000,
  });

  if (!verified) {
    let errorBody = 'Unable to read response';
    if (response.body && typeof response.body === 'string') {
      errorBody = response.body.substring(0, 100);
    }
    console.error(`❌ Checkout failed: ${response.status} - ${errorBody}`);
  }

  return {
    success: success,
    status: response.status,
    duration: duration,
    body: response.body,
  };
}

export function fullCheckoutJourney() {
  const item = getRandomProduct();
  const addResult = addToCart(item);

  if (!addResult.success) {
    console.error('❌ Failed to add item to cart');
    return false;
  }

  const viewResult = viewCart();

  if (!viewResult.success) {
    console.error('❌ Failed to view cart');
    return false;
  }

  const checkoutResult = completeCheckout();
  return checkoutResult.success;
}
/**
 * Browsing flow for K6 load tests
 */

import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';
import { K6_CONFIG } from '../config/k6-config.js';
import { randomInt } from './helpers.js';

export const inventoryDuration = new Trend('inventory_duration');

export function browseInventory() {
  const startTime = Date.now();
  
  const response = http.get(`${K6_CONFIG.baseURL}/inventory.html`);
  
  const duration = Date.now() - startTime;
  inventoryDuration.add(duration);
  
  const success = check(response, {
    'Inventory page loaded': (r) => r.status === 200,
    'Inventory loaded fast': (r) => duration < 2000
  });
  
  return { success, status: response.status, duration };
}

export function browseProduct(productIndex = 0) {
  const response = http.get(`${K6_CONFIG.baseURL}/inventory-item.html?id=${productIndex}`);
  
  const success = check(response, {
    'Product details loaded': (r) => r.status === 200
  });
  
  return { success, status: response.status };
}

export function browseSession() {
  const inventoryResult = browseInventory();
  
  if (!inventoryResult.success) {
    return false;
  }
  
  const randomIndex = randomInt(0, 5);
  const productResult = browseProduct(randomIndex);
  
  return productResult.success;
}
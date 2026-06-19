/**
 * Helper functions for K6 load tests
 */

import { sleep } from 'k6';
import { K6_CONFIG } from '../config/k6-config.js';

export function getRandomUser() {
  const users = [
    K6_CONFIG.users.standard,
    K6_CONFIG.users.performance
  ];
  return users[Math.floor(Math.random() * users.length)];
}

export function getRandomProduct() {
  const products = [
    K6_CONFIG.products.backpack,
    K6_CONFIG.products.bikeLight,
    K6_CONFIG.products.boltTshirt,
    K6_CONFIG.products.fleeceJacket,
    K6_CONFIG.products.onesie
  ];
  return products[Math.floor(Math.random() * products.length)];
}

export function getThinkTime(min = 1, max = 5) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomPostalCode() {
  return `${Math.floor(Math.random() * 90000) + 10000}`;
}

export function randomSleep(minSeconds = 1, maxSeconds = 5) {
  const seconds = getThinkTime(minSeconds, maxSeconds);
  sleep(seconds);
}

export function isSuccess(status) {
  return status >= 200 && status < 300;
}

export function logMetrics(label, duration, status) {
  console.log(`📊 ${label}: ${duration}ms (${status})`);
}

export function probability(p) {
  return Math.random() < p;
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
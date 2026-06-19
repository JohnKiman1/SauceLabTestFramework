/**
 * K6 Load Test Configuration
 */
export const K6_CONFIG = {
  baseURL: 'https://www.saucedemo.com',
  
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    performance: {
      username: 'performance_glitch_user',
      password: 'secret_sauce'
    },
    locked: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    },
    problem: {
      username: 'problem_user',
      password: 'secret_sauce'
    }
  },
  
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    boltTshirt: 'Sauce Labs Bolt T-Shirt',
    fleeceJacket: 'Sauce Labs Fleece Jacket',
    onesie: 'Sauce Labs Onesie',
    tshirtRed: 'Test.allTheThings() T-Shirt (Red)'
  },
  
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<5000'],
    http_req_failed: ['rate<0.05'],
    checkout_success_rate: ['rate>0.95'],
    login_duration: ['p(95)<3000'],
    cart_duration: ['p(95)<1500']
  },
  
  profiles: {
    smoke: {
      stages: [
        { duration: '10s', target: 1 },
        { duration: '20s', target: 5 },
        { duration: '10s', target: 0 }
      ]
    },
    load: {
      stages: [
        { duration: '1m', target: 10 },
        { duration: '2m', target: 50 },
        { duration: '3m', target: 50 },
        { duration: '1m', target: 0 }
      ]
    },
    stress: {
      stages: [
        { duration: '2m', target: 50 },
        { duration: '3m', target: 100 },
        { duration: '3m', target: 200 },
        { duration: '3m', target: 300 },
        { duration: '2m', target: 0 }
      ]
    },
    spike: {
      stages: [
        { duration: '1m', target: 50 },
        { duration: '30s', target: 200 },
        { duration: '2m', target: 200 },
        { duration: '30s', target: 50 },
        { duration: '1m', target: 0 }
      ]
    },
    endurance: {
      stages: [
        { duration: '5m', target: 20 },
        { duration: '45m', target: 20 },
        { duration: '5m', target: 30 },
        { duration: '5m', target: 0 }
      ]
    }
  }
};
import { defineConfig, devices } from '@playwright/test';
import config from './src/utils/config';

export default defineConfig({
  testDir: './src/tests',
  outputDir: 'reports/ui/test-results', 

  timeout: 60000,
  globalTimeout: 5400000,

  fullyParallel: false,
  forbidOnly: config.isCI,
  retries: config.isCI ? 2 : 1,
  workers: config.isCI ? 1 : 2,

  reporter: [
    ['list'],
    ['allure-playwright', {
      resultsDir: 'reports/ui/allure-results',
      detail: true,
      suiteTitle: true,
      attachments: true,
    }],
    ['html', { outputFolder: 'reports/ui/html-report' }],  
    ['json', { outputFile: 'reports/ui/test-results.json' }]  
  ],

  use: {
    baseURL: config.baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    contextOptions: {
      viewport: { width: 1280, height: 720 },
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  globalSetup: './src/tests/global.setup.ts',
});
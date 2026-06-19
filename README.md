# 🧪 SauceDemo Test Automation Framework

A **high-standard, production-ready** test automation framework for the SauceDemo website using **Playwright** (UI) and **K6** (Load Testing).

[![Playwright Tests](https://github.com/JohnKiman1/SauceLabTestFramework/actions/workflows/playwright.yml/badge.svg)](https://github.com/JohnKiman1/SauceLabTestFramework/actions/workflows/playwright.yml)
[![Allure Report](https://img.shields.io/badge/📊-Allure_Report-blue)](https://johnkiman1.github.io/SauceLabTestFramework/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org/)
[![K6](https://img.shields.io/badge/K6-Load%20Testing-7D64B4)](https://k6.io/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Live Reports](#live-reports)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [CI/CD Pipeline](#cicd-pipeline)
- [Test Categories](#test-categories)
- [Writing Tests](#writing-tests)
- [Load Testing](#load-testing)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [FAQ](#faq)
- [Author](#author)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 📖 Overview

This framework automates testing for the [SauceDemo](https://www.saucedemo.com/) e-commerce website with two powerful testing layers:

- **UI Testing** (Playwright) - Functional and visual validation
- **Load Testing** (K6) - Performance and scalability validation

It demonstrates best practices in test automation including:

- **Page Object Model** for maintainable code
- **Session Reuse** for faster test execution
- **Allure Reporting** for beautiful test reports
- **Cross-browser testing** (Chrome, Firefox, WebKit)
- **Comprehensive test coverage** (141+ UI tests)
- **Load Testing** (Smoke, Load, Stress, Spike, Endurance)
- **Enterprise-grade CI/CD** with GitHub Actions

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ✅ **Session Reuse** | Login once, run all tests faster (saves 50% execution time) |
| ✅ **Page Object Model** | Clean, maintainable, and reusable code |
| ✅ **TypeScript** | Type-safe and robust |
| ✅ **Allure Reports** | Beautiful, detailed test reports published to GitHub Pages |
| ✅ **Parallel Testing** | Run tests faster with 3 parallel shards |
| ✅ **Cross-Browser** | Test on Chrome, Firefox, and WebKit |
| ✅ **141+ UI Tests** | Comprehensive coverage across all categories |
| ✅ **Load Testing** | K6-based performance testing with multiple scenarios |
| ✅ **CI/CD Ready** | GitHub Actions with automatic scheduling |
| ✅ **Auto-Deployment** | Reports automatically deployed to GitHub Pages |

---

## 📊 Live Reports

The latest test results are automatically published after each CI run:

🔗 **[View Allure Report](https://johnkiman1.github.io/SauceLabTestFramework/)**

| Report Type | URL |
| ----------- | --- |
| Allure Report | [Allure Report](https://johnkiman1.github.io/SauceLabTestFramework/) |
| GitHub Actions | [Actions](https://github.com/JohnKiman1/SauceLabTestFramework/actions) |
| Repository | [Repository](https://github.com/JohnKiman1/SauceLabTestFramework) |

---

## 📁 Project Structure


```
SauceDemoFramework/
├── 📂 src/
│ ├── 📂 ui/ # UI Tests (Playwright)
│ │ ├── 📂 pages/ # Page Object Model
│ │ │ ├── BasePage.ts # Base page with common methods
│ │ │ ├── LoginPage.ts # Login page actions
│ │ │ ├── InventoryPage.ts # Inventory page actions
│ │ │ ├── CartPage.ts # Cart page actions
│ │ │ └── CheckoutPage.ts # Checkout page actions
│ │ ├── 📂 fixtures/ # Custom fixtures & test data
│ │ │ ├── test-data.json # Test data (users, credentials)
│ │ │ └── customFixtures.ts # Custom fixtures with session reuse
│ │ ├── 📂 tests/ # Test files
│ │ │ ├── 📂 happy-path/ # Happy path tests
│ │ │ ├── 📂 negative/ # Negative tests
│ │ │ ├── 📂 edge-cases/ # Edge case tests
│ │ │ └── 📂 regression/ # Regression tests
│ │ └── global.setup.ts # Global setup (session creation)
│ ├── 📂 load/ # Load Tests (K6)
│ │ ├── 📂 config/ # Load test configuration
│ │ │ └── k6-config.ts # K6 thresholds & stages
│ │ ├── 📂 scenarios/ # Test scenarios
│ │ │ ├── smoke-test.ts # Smoke test (1-5 users)
│ │ │ ├── load-test.ts # Load test (50-100 users)
│ │ │ ├── stress-test.ts # Stress test (200-500 users)
│ │ │ ├── spike-test.ts # Spike test (sudden surges)
│ │ │ └── endurance-test.ts # Endurance test (1 hour)
│ │ ├── 📂 scripts/ # Reusable scripts
│ │ │ ├── login-flow.ts # Login flow
│ │ │ ├── checkout-flow.ts # Checkout flow
│ │ │ ├── browse-flow.ts # Browse flow
│ │ │ └── helpers.ts # Helper functions
│ │ └── 📂 utils/ # Utilities
│ │ └── logger.ts # Logging
│ └── 📂 utils/ # Shared utilities
│ ├── logger.ts # Logging
│ └── config.ts # Environment config
├── 📂 reports/ # Test reports
│ ├── 📂 ui/ # UI test reports
│ │ ├── 📂 allure-results/ # Allure raw results
│ │ ├── 📂 allure-report/ # Allure HTML report
│ │ ├── 📂 test-results/ # Playwright test results
│ │ ├── 📂 html-report/ # Playwright HTML report
│ │ └── 📂 auth/ # Session storage
│ └── 📂 load/ # Load test reports
│ ├── 📂 json/ # K6 JSON reports
│ ├── 📂 html/ # K6 HTML reports
│ └── 📂 summary/ # Test summaries
├── 📂 .github/workflows/ # CI/CD pipelines
│ ├── playwright.yml # UI tests CI/CD
│ └── load-tests.yml # Load tests CI/CD
├── playwright.config.ts # Playwright configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Dependencies and scripts
├── .gitignore # Git ignore file
└── README.md # This file          # This file
```

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

| Tool     | Version          | Installation Link |
|----------|------------------|-------------------|
| Node.js  | v16 or higher    | [Download Node.js](https://nodejs.org/) |
| pnpm     | v8 or higher     | `npm install -g pnpm` |
| Git      | Latest           | [Download Git](https://git-scm.com/) |
| K6       | v1.5.0 or higher | [Download K6](https://k6.io/docs/get-started/installation/) |

### Verify Installation

```bash
# Check Node.js version
node --version

# Check pnpm version
pnpm --version

# Check Git version
git --version

# Check K6 version
k6 --version
```

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/JohnKiman1/SauceLabTestFramework.git
cd SauceLabTestFramework
```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Install Playwright Browsers

```bash
pnpm run install:playwright
```

### Step 4: Verify Installation

```bash
pnpm run test:smoke
```

---

## 🎯 Running Tests

### Quick Start

```bash
# Run all tests
pnpm test

# Run smoke tests (fastest, covers critical paths)
pnpm run test:smoke
```

### All Test Commands

| Command | Description |
| ------- | ----------- |
| `pnpm test` | Run all tests |
| `pnpm run test:smoke` | Run smoke tests |
| `pnpm run test:regression` | Run regression tests |
| `pnpm run test:negative` | Run negative tests |
| `pnpm run test:edge` | Run edge case tests |
| `pnpm run test:happy` | Run happy path tests |
| `pnpm run test:ui` | Run with UI mode |
| `pnpm run test:headed` | Run with browser visible |
| `pnpm run test:debug` | Run in debug mode |
| `pnpm run test:chrome` | Run only Chrome |
| `pnpm run test:firefox` | Run only Firefox |
| `pnpm run test:webkit` | Run only WebKit |

### Advanced Commands

```bash
# Run a specific UI test file
pnpm exec playwright test src/ui/tests/happy-path/login.spec.ts

# Run a specific UI test by name
pnpm exec playwright test --grep "HP-001"

# Run UI tests with specific tag
pnpm exec playwright test --grep "@smoke"

# Run UI tests with specific browser project
pnpm exec playwright test --project=chromium

# Run UI tests with specific worker count
pnpm exec playwright test --workers=4

# Run UI tests in headed mode (see the browser)
pnpm exec playwright test --headed

# Show trace for failed UI test
pnpm exec playwright show-trace reports/ui/test-results/.../trace.zip

# Generate and open Allure report
pnpm run report:allure

# Run a specific load test
k6 run src/load/scenarios/smoke-test.ts

# Run load test with custom virtual users
k6 run src/load/scenarios/load-test.ts --vus 100 --duration 5m

# Generate K6 HTML report
k6 run src/load/scenarios/load-test.ts --out html=reports/load/html/report.html

# Generate K6 JSON report
k6 run src/load/scenarios/load-test.ts --out json=reports/load/json/report.json

# Run K6 with thresholds enabled
k6 run src/load/scenarios/load-test.ts --thresholds 'http_req_duration(p(95))<2000'
```

---

## 📊 Test Reports

### Allure Reports

```bash
# Generate and open Allure report
pnpm run report:allure

# Serve Allure report (alternative)
pnpm run report:serve
```

### Playwright HTML Reports

```bash
# Open Playwright HTML report
pnpm run report:html
```

### Playwright HTML Reports

```bash
# Generate K6 HTML report
k6 run src/load/scenarios/load-test.ts --out html=reports/load/html/report.html

# Generate K6 JSON report
k6 run src/load/scenarios/load-test.ts --out json=reports/load/json/report.json

```
### Where to Find Reports

| Report Type | Location |
| ------------ | -------- |
| Allure Report (Local) | `reports/ui/allure-report/index.html` |
| Allure Report (Live) | [https://johnkiman1.github.io/SauceLabTestFramework/](https://johnkiman1.github.io/SauceLabTestFramework/) |
| Playwright HTML Report | `reports/ui/html-report/index.html` |
| UI Test Results | `reports/ui/test-results/` |
| Load Test JSON Report | `reports/ui/html-report/index.html` |
| Load Test HTML Report | `reports/ui/test-results/` |

---

## 🚀 CI/CD Pipeline

The framework uses GitHub Actions for continuous integration and deployment.

### UI Tests Pipeline

| Feature | Description |
| ------- | ----------- |
| Auto-Run | Tests run every 10 minutes |
| On Push | Triggers on push to main and develop |
| On PR | Triggers on pull requests |
| Parallel Sharding | 3 shards for faster execution |
| Session Reuse | Auth state cached between runs |
| Cross-Browser | Chromium, Firefox, WebKit |
| Allure Reports | Auto-generated and deployed |
| GitHub Pages | Reports published automatically |

### Load Tests Pipeline

| Feature | Description |
| ------- | ----------- |
| Auto-Run | Tests run every 10 minutes |
| Manual Trigger | Can be triggered manually |
| Reports | JSON and HTML reports generated |
| Artifacts | Reports saved as artifacts |

### Workflow Structure

```
UI Tests:
  auth → Generate session once, cache auth state
    ↓
  test → 3 parallel shards, run tests with cached session
    ↓
  allure-report → Merge results, generate Allure report
    ↓
  deploy → Deploy report to GitHub Pages (main branch only)
    ↓
  notify → Send completion notification

Load Tests:
  smoke-test → Quick sanity check (1-5 users)
    ↓
  load-test → Expected traffic (50-100 users)
    ↓
  stress-test → Find breaking point (200-500 users)
    ↓
  report → Generate and upload reports
```

**Access CI/CD**

- **Actions**: https://github.com/JohnKiman1/SauceLabTestFramework/actions
- **Report**: https://johnkiman1.github.io/SauceLabTestFramework/

---

## 🏷️ Test Categories & Tags

### Available Tags

| Tag            | Description                    |
|----------------|--------------------------------|
| `@smoke`       | Critical path tests            |
| `@regression`  | Full regression suite          |
| `@negative`    | Negative test scenarios        |
| `@edge`        | Edge cases                     |
| `@happy-path`  | Positive test scenarios        |
| `@fast`        | Fast-running tests             |

### Test Coverage

| Test Category | Count | Tags |
| ------------- | ----- | ---- |
| Happy Path | 15 | `@happy-path`, `@smoke` |
| Negative | 13 | `@negative` |
| Edge Cases | 10 | `@edge` |
| Regression | 2 | `@regression` |
| **Total** | **40** | - |

---

## ✍️ Writing Tests

### Example: Happy Path Test

```typescript
import { test, expect } from '../../../fixtures/customFixtures';

test('HP-001: Login with valid credentials @smoke', 
    async ({ loginPage, inventoryPage, testUser }) => {
    
    await loginPage.open();
    await loginPage.login(testUser.username, testUser.password);
    await inventoryPage.verifyPage();
    console.log('✅ Login successful!');
});
```

### Example: Negative Test

```typescript
test('NEG-001: Login with invalid credentials @negative', 
    async ({ loginPage }) => {
    
    await loginPage.open();
    await loginPage.login('invalid_user', 'wrong_password');
    
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Username and password do not match');
    console.log('✅ Error message displayed correctly');
});
```

### Example: Test with Session Reuse

```typescript
test('EDGE-001: Session persists after page reload @smoke', 
    async ({ authenticatedPage }) => {
    
    await authenticatedPage.reload();
    await expect(authenticatedPage).toHaveURL(/inventory.html/);
    console.log('✅ Session survived page reload');
});
```

### 🏋️ Load Testing

### Test Types

| Test Type | Users | Duration | Purpose |
| ------------- | ----- | ---- | ------- |
| Smoke Test | 1-5 | 1 min | Quick sanity check |
| Load Test | 50-100 | 8 min | Expected traffic simulation |
| Stress Test | 200-500 | 12 min | Find breaking point |
| Spike Test | 0→200→0 | 5 min | Sudden traffic surges |
| Endurance Test | 20-50 | 1 hour | Long-term stability |

---

### Performance Goals

| Metric | Goal |
| ------------- | ----- |
| Response Time (95th) | < 2 seconds |
| Error Rate | < 5% |
| Checkout Success Rate | > 95% |
| Login Duration (95th) | < 3 seconds |

---

### Running Load Tests

```bash
# Run all load tests
pnpm run test:load:smoke && pnpm run test:load:load && pnpm run test:load:stress

# Run with specific users
k6 run src/load/scenarios/load-test.ts --vus 100 --duration 3m

# Generate load test report
pnpm run test:load:report

```

### Example Load Test Script

```typescript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '3m', target: 50 },
    { duration: '1m', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.05']
  }
};

export default function () {
  // Login
  const loginRes = http.post('https://www.saucedemo.com/login', {
    username: 'standard_user',
    password: 'secret_sauce'
  });
  
  check(loginRes, { 'Login successful': (r) => r.status === 200 });
  
  sleep(2);
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```bash
BASE_URL=https://www.saucedemo.com
TEST_ENV=development
PARALLEL_WORKERS=2
RETRY_COUNT=1
```

### Playwright Configuration

```typescript
export default defineConfig({
  testDir: './src/tests',
  fullyParallel: false,
  retries: 1,
  workers: 2,
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Workflow

```bash
pnpm install
pnpm run test:debug
pnpm exec playwright test src/tests/ui/happy-path/login.spec.ts --headed
pnpm run report:allure
```

---

## ❓ FAQ

**Q: Why are UI tests running slow?**  
**A:** Try running with `--workers=4` or use session reuse tests (`@fast` tag).

**Q: How do I debug a failing UI test?**  
**A:** Use `pnpm run test:ui` or `pnpm run test:headed`.

**Q: How do I add a new UI test?**  
**A:** Create a new `.spec.ts` file in the appropriate category folder.

**Q: How do I run UI tests on a specific browser?**  
**A:** Use `pnpm run test:chrome`, `pnpm run test:firefox`, or `pnpm run test:webkit`.

**Q: Where are the UI test reports?**  
**A:** Reports are in the `reports/ui/` folder. Use `pnpm run report:allure` to open.

**Q: How often does CI run?**  
**A:** Every Monday at 12AM via cron schedule, plus on every push and pull request.

**Q: Where can I see the live Allure report?**  
**A:**  https://johnkiman1.github.io/SauceLabTestFramework/

**Q:  What is K6?**  
**A:** K6 is an open-source load testing tool by Grafana Labs for performance testing.

**Q: Where can I see the live report?**  
**A:** K6 is an open-source load testing tool by Grafana Labs for performance testing.

**Q: How do I run load tests locally?**  
**A:** Install K6 (brew install k6) and run pnpm run test:load:smoke.

**Q: What load test types are available?**  
**A:** Smoke, Load, Stress, Spike, and Endurance tests are available.

---

## 📝 License

ISC

## 👤 Author

**John Kimani**

- GitHub: [@JohnKiman1](https://github.com/JohnKiman1)
- LinkedIn: John Kimani
  
### 🙏 Acknowledgments

- [Sauce Labs](https://saucelabs.com/) for the test application
- [Playwright](https://playwright.dev/) for the amazing testing framework
- [Allure](https://allurereport.org/) for beautiful test reports
- [K6](https://k6.io/) for load testing capabilities
- [GitHub Actions](https://github.com/features/actions) for CI/CD

---

## 📊 Quick Reference Card

```bash
# Setup
git clone https://github.com/JohnKiman1/SauceLabTestFramework.git
cd SauceLabTestFramework
pnpm install
pnpm run install:playwright

# UI Test Commands
pnpm test                    # All UI tests
pnpm run test:smoke          # UI smoke tests
pnpm run test:regression     # UI regression tests
pnpm run test:negative       # UI negative tests
pnpm run test:edge           # UI edge cases
pnpm run test:happy          # UI happy path tests

# Load Test Commands
pnpm run test:load:smoke     # K6 smoke test
pnpm run test:load:load      # K6 load test
pnpm run test:load:stress    # K6 stress test
pnpm run test:load:report    # K6 with JSON report

# Reports
pnpm run report:allure       # Allure report
pnpm run report:html         # HTML report

# Debugging
pnpm run test:ui             # UI mode
pnpm run test:headed         # Headed mode
pnpm run test:debug          # Debug mode

# Live Reports
# UI: https://johnkiman1.github.io/SauceLabTestFramework/
# Load: reports/load/html/report.html
```

**Happy Testing!** 🚀

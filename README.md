# 🧪 SauceDemo Test Automation Framework

A **high-standard, production-ready** test automation framework for the SauceDemo website using **Playwright** and **TypeScript**.

[![Playwright Tests](https://github.com/JohnKiman1/SauceLabTestFramework/actions/workflows/playwright.yml/badge.svg)](https://github.com/JohnKiman1/SauceLabTestFramework/actions/workflows/playwright.yml)
[![Allure Report](https://img.shields.io/badge/📊-Allure_Report-blue)](https://johnkiman1.github.io/SauceLabTestFramework/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org/)

---

## 📋 Table of Contents

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
- [Configuration](#configuration)
- [Contributing](#contributing)
- [FAQ](#faq)
- [Author](#author)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## 📖 Overview

This framework automates testing for the [SauceDemo](https://www.saucedemo.com/) e-commerce website. It demonstrates best practices in test automation including:

- **Page Object Model** for maintainable code
- **Session Reuse** for faster test execution
- **Allure Reporting** for beautiful test reports
- **Cross-browser testing** (Chrome, Firefox, WebKit)
- **Comprehensive test coverage** (141+ tests)
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
| ✅ **141+ Tests** | Comprehensive coverage across all categories |
| ✅ **CI/CD Ready** | GitHub Actions with automatic scheduling every 10 minutes |
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
│   ├── 📂 pages/                  # Page Object Model
│   │   ├── BasePage.ts            # Base page with common methods
│   │   ├── LoginPage.ts           # Login page actions
│   │   ├── InventoryPage.ts       # Inventory page actions
│   │   ├── CartPage.ts            # Cart page actions
│   │   └── CheckoutPage.ts        # Checkout page actions
│   ├── 📂 fixtures/               # Custom fixtures
│   │   ├── test-data.json         # Test data (users, credentials)
│   │   └── customFixtures.ts      # Custom fixtures with session reuse
│   ├── 📂 tests/                  # Test files
│   │   ├── 📂 ui/
│   │   │   ├── 📂 happy-path/     # Happy path tests
│   │   │   ├── 📂 negative/       # Negative tests
│   │   │   ├── 📂 edge-cases/     # Edge case tests
│   │   │   └── 📂 regression/     # Regression tests
│   │   └── global.setup.ts        # Global setup (session creation)
│   └── 📂 utils/                  # Utility functions
├── 📂 reports/                    # Test reports
│   ├── 📂 allure-results/         # Allure raw results
│   ├── 📂 allure-report/          # Allure HTML report
│   ├── 📂 test-results/           # Playwright test results
│   └── 📂 auth/                   # Session storage
├── 📂 .github/workflows/          # CI/CD pipelines
│   └── playwright.yml             # Enterprise CI/CD workflow
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
├── .gitignore                     # Git ignore file
└── README.md                      # This file
```

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

| Tool     | Version          | Installation Link |
|----------|------------------|-------------------|
| Node.js  | v16 or higher    | [Download Node.js](https://nodejs.org/) |
| pnpm     | v8 or higher     | `npm install -g pnpm` |
| Git      | Latest           | [Download Git](https://git-scm.com/) |

### Verify Installation

```bash
# Check Node.js version
node --version

# Check pnpm version
pnpm --version

# Check Git version
git --version
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
# Run a specific test file
pnpm exec playwright test src/tests/ui/happy-path/login.spec.ts

# Run a specific test by name
pnpm exec playwright test --grep "HP-001"

# Run tests with specific tag
pnpm exec playwright test --grep "@smoke"

# Run tests with specific project
pnpm exec playwright test --project=chromium

# Show trace for failed test
pnpm exec playwright show-trace reports/ui/test-results/.../trace.zip
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

### Where to Find Reports

| Report Type | Location |
| ------------ | -------- |
| Allure Report (Local) | `reports/ui/allure-report/index.html` |
| Allure Report (Live) | [https://johnkiman1.github.io/SauceLabTestFramework/](https://johnkiman1.github.io/SauceLabTestFramework/) |
| Playwright HTML Report | `reports/ui/html-report/index.html` |
| Test Results | `reports/ui/test-results/` |

---

## 🚀 CI/CD Pipeline

The framework uses GitHub Actions for continuous integration and deployment.

### Pipeline Features

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

### Workflow Structure

```
auth → Generate session once, cache auth state
  ↓
test → 3 parallel shards, run tests with cached session
  ↓
allure-report → Merge results, generate Allure report
  ↓
deploy → Deploy report to GitHub Pages (main branch only)
  ↓
notify → Send completion notification
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

---

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

**Q: Why are tests running slow?**  
**A:** Try running with `--workers=4` or use session reuse tests (`@fast` tag).

**Q: How do I debug a failing test?**  
**A:** Use `pnpm run test:ui` or `pnpm run test:headed`.

**Q: How do I add a new test?**  
**A:** Create a new `.spec.ts` file in the appropriate category folder.

**Q: How do I run tests on a specific browser?**  
**A:** Use `pnpm run test:chrome`, `pnpm run test:firefox`, or `pnpm run test:webkit`.

**Q: Where are the test reports?**  
**A:** Reports are in the `reports/ui/` folder. Use `pnpm run report:allure` to open.

**Q: How often does CI run?**  
**A:** Every 10 minutes via cron schedule, plus on every push and pull request.

**Q: Where can I see the live report?**  
**A:** https://johnkiman1.github.io/SauceLabTestFramework/

---

## 📝 License

ISC

## 👤 Author

**John Kimani**

- GitHub: [@JohnKiman1](https://github.com/JohnKiman1)
- LinkedIn: John Kimani

## 🙏 Acknowledgments

- Sauce Labs for the test application
- Playwright for the amazing testing framework
- Allure for beautiful test reports
- GitHub Actions for CI/CD

---

## 📊 Quick Reference Card

```bash
# Setup
git clone https://github.com/JohnKiman1/SauceLabTestFramework.git
cd SauceLabTestFramework
pnpm install
pnpm run install:playwright

# Test Commands
pnpm test                    # All tests
pnpm run test:smoke          # Smoke tests
pnpm run test:regression     # Regression tests
pnpm run test:negative       # Negative tests
pnpm run test:edge           # Edge cases
pnpm run test:happy          # Happy path tests

# Reports
pnpm run report:allure       # Allure report
pnpm run report:html         # HTML report

# Debugging
pnpm run test:ui             # UI mode
pnpm run test:headed         # Headed mode
pnpm run test:debug          # Debug mode

# Live Report
# https://johnkiman1.github.io/SauceLabTestFramework/
```

**Happy Testing!** 🚀

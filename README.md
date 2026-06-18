# 🧪 SauceDemo Test Automation Framework

A **high-standard, production-ready** test automation framework for the SauceDemo website using **Playwright** and **TypeScript**.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Test Categories](#test-categories)
- [Writing Tests](#writing-tests)
- [Contributing](#contributing)
- [Author](#author)

---

## 📖 Overview

This framework automates testing for the [SauceDemo](https://www.saucedemo.com/) e-commerce website. It demonstrates best practices in test automation including:

- **Page Object Model** for maintainable code
- **Session Reuse** for faster test execution
- **Allure Reporting** for beautiful test reports
- **Cross-browser testing** (Chrome, Firefox, WebKit)
- **Comprehensive test coverage** (40+ tests)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ✅ **Session Reuse** | Login once, run all tests faster (saves 50% execution time) |
| ✅ **Page Object Model** | Clean, maintainable, and reusable code |
| ✅ **TypeScript** | Type-safe and robust |
| ✅ **Allure Reports** | Beautiful, detailed test reports |
| ✅ **Parallel Testing** | Run tests faster with parallel execution |
| ✅ **Cross-Browser** | Test on Chrome, Firefox, and WebKit |
| ✅ **40+ Tests** | Happy path, negative, edge cases, and regression |
| ✅ **CI/CD Ready** | Easy integration with GitHub Actions, Jenkins, etc. |

---

## 📁 Project Structure
SourceDemoFramework/
├── 📂 src/
│ ├── 📂 pages/ # Page Object Model
│ │ ├── BasePage.ts # Base page with common methods
│ │ ├── LoginPage.ts # Login page actions
│ │ ├── InventoryPage.ts # Inventory page actions
│ │ ├── CartPage.ts # Cart page actions
│ │ └── CheckoutPage.ts # Checkout page actions
│ ├── 📂 fixtures/ # Custom fixtures
│ │ ├── test-data.json # Test data (users, credentials)
│ │ └── customFixtures.ts # Custom fixtures with session reuse
│ ├── 📂 tests/ # Test files
│ │ ├── 📂 ui/
│ │ │ ├── 📂 happy-path/ # Happy path tests (15 tests)
│ │ │ ├── 📂 negative/ # Negative tests (13 tests)
│ │ │ ├── 📂 edge-cases/ # Edge case tests (10 tests)
│ │ │ └── 📂 regression/ # Regression tests (2 tests)
│ │ └── global.setup.ts # Global setup (session creation)
│ └── 📂 utils/ # Utility functions
├── 📂 reports/ # Test reports
│ ├── 📂 allure-results/ # Allure raw results
│ ├── 📂 allure-report/ # Allure HTML report
│ ├── 📂 test-results/ # Playwright test results
│ └── 📂 auth/ # Session storage
├── playwright.config.ts # Playwright configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Dependencies and scripts
├── .gitignore # Git ignore file
└── README.md # This file

text

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Installation Link |
|------|---------|-------------------|
| Node.js | v16 or higher | [Download Node.js](https://nodejs.org/) |
| npm | v8 or higher | Included with Node.js |
| Git | Latest | [Download Git](https://git-scm.com/) |

### **Verify Installation**

```bash
# Check Node.js version
node --version
# Should output: v16.x.x or higher

# Check npm version
npm --version
# Should output: v8.x.x or higher

# Check Git version
git --version
# Should output: git version 2.x.x or higher
🚀 Installation
Step 1: Clone the Repository
bash
# Clone the repository
git clone https://github.com/JohnKiman1/SauceLabTestFramework.git

# Navigate to the project directory
cd SauceLabTestFramework
Step 2: Install Dependencies
bash
# Install all dependencies
npm install
Step 3: Install Playwright Browsers
bash
# Download and install Playwright browsers
npx playwright install

# Install specific browsers (optional)
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
Step 4: Verify Installation
bash
# Run a quick test to verify everything works
npm test
🎯 Running Tests
Quick Start
bash
# Run all tests
npm test

# Run smoke tests (fastest, covers critical paths)
npm run test:smoke
All Test Commands
Command	Description	When to Use
npm test	Run all tests	Full test suite
npm run test:smoke	Run smoke tests	Quick sanity check
npm run test:regression	Run regression tests	Full regression suite
npm run test:negative	Run negative tests	Test error handling
npm run test:edge	Run edge case tests	Test boundary scenarios
npm run test:happy	Run happy path tests	Test positive scenarios
npm run test:ui	Run with UI mode	Debugging tests
npm run test:headed	Run with browser visible	See what's happening
npm run test:debug	Run in debug mode	Step through tests
npm run test:chrome	Run only Chrome	Browser-specific testing
npm run test:firefox	Run only Firefox	Browser-specific testing
npm run test:webkit	Run only WebKit	Browser-specific testing
Advanced Test Commands
bash
# Run a specific test file
npx playwright test src/tests/ui/happy-path/login.spec.ts

# Run a specific test by name
npx playwright test --grep "HP-001"

# Run tests with specific tag
npx playwright test --grep "@smoke"

# Run tests with specific project
npx playwright test --project=chromium

# Run tests with specific worker count
npx playwright test --workers=4

# Run tests with video recording
npx playwright test --video=on

# Run tests with trace viewer
npx playwright test --trace=on

# Show trace for failed test
npx playwright show-trace reports/ui/test-results/.../trace.zip
📊 Test Reports
Allure Reports (Beautiful HTML Reports)
bash
# Generate and open Allure report
npm run report:allure

# Serve Allure report (alternative)
npm run report:serve
Playwright HTML Reports
bash
# Open Playwright HTML report
npm run report:html

# Or manually
npx playwright show-report
Where to Find Reports
Report Type	Location
Allure Report	reports/ui/allure-report/index.html
Playwright HTML Report	reports/ui/html-report/index.html
Test Results	reports/ui/test-results/
Screenshots (on failure)	reports/ui/test-results/
Videos (on failure)	reports/ui/test-results/
Traces (on failure)	reports/ui/test-results/
🏷️ Test Categories & Tags
Available Tags
Tag	Description	Used In
@smoke	Critical path tests	All categories
@regression	Full regression suite	Regression tests
@negative	Negative test scenarios	Negative tests
@edge	Edge cases	Edge case tests
@happy-path	Positive test scenarios	Happy path tests
@fast	Fast-running tests	Session reuse tests
Test Coverage
Category	Test Count	Tags
Happy Path	15	@happy-path, @smoke
Negative	13	@negative
Edge Cases	10	@edge
Regression	2	@regression
Total	40	
✍️ Writing Tests
Example: Happy Path Test
typescript
import { test, expect } from '../../../fixtures/customFixtures';

test('HP-001: Login with valid credentials @smoke', 
    async ({ loginPage, inventoryPage, testUser }) => {
    
    // Step 1: Navigate to login page
    await loginPage.open();
    
    // Step 2: Login with valid credentials
    await loginPage.login(testUser.username, testUser.password);
    
    // Step 3: Verify successful login
    await inventoryPage.verifyPage();
    console.log('✅ Login successful!');
});
Example: Negative Test
typescript
test('NEG-001: Login with invalid credentials @negative', 
    async ({ loginPage }) => {
    
    await loginPage.open();
    await loginPage.login('invalid_user', 'wrong_password');
    
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Username and password do not match');
    console.log('✅ Error message displayed correctly');
});
Example: Test with Session Reuse
typescript
test('EDGE-001: Session persists after page reload @smoke', 
    async ({ authenticatedPage }) => {
    
    await authenticatedPage.reload();
    await expect(authenticatedPage).toHaveURL(/inventory.html/);
    console.log('✅ Session survived page reload');
});
🔧 Configuration
Environment Variables
Create a .env file in the root directory:

bash
# .env
BASE_URL=https://www.saucedemo.com
TEST_ENV=development
PARALLEL_WORKERS=2
RETRY_COUNT=1
Playwright Configuration
The main configuration is in playwright.config.ts:

typescript
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
🤝 Contributing
Fork the repository

Create your feature branch: git checkout -b feature/amazing-feature

Commit your changes: git commit -m 'Add some amazing feature'

Push to the branch: git push origin feature/amazing-feature

Open a Pull Request

Development Workflow
bash
# Install dependencies
npm install

# Run tests during development
npm run test:debug

# Run specific test while developing
npx playwright test src/tests/ui/happy-path/login.spec.ts --headed

# Generate report before committing
npm run report:allure
❓ FAQ
Q: Why are tests running slow?
A: Try running with --workers=4 or use session reuse tests (@fast tag).

Q: How do I debug a failing test?
A: Use npm run test:ui for interactive debugging or npm run test:headed to see the browser.

Q: How do I add a new test?
A: Create a new .spec.ts file in the appropriate category folder under src/tests/ui/.

Q: How do I run tests on a specific browser?
A: Use npm run test:chrome, npm run test:firefox, or npm run test:webkit.

Q: Where are the test reports?
A: Reports are in reports/ui/ folder. Use npm run report:allure to open.

📝 License
ISC

👤 Author
John Kimani

GitHub: @JohnKiman1

LinkedIn: John Kimani

🙏 Acknowledgments
Sauce Labs for the test application

Playwright for the amazing testing framework

Allure for beautiful test reports

📊 Quick Reference Card
bash
# Setup
git clone https://github.com/JohnKiman1/SauceLabTestFramework.git
cd SauceLabTestFramework
npm install
npx playwright install

# Test Commands
npm test                    # All tests
npm run test:smoke          # Smoke tests
npm run test:regression     # Regression tests
npm run test:negative       # Negative tests
npm run test:edge           # Edge cases
npm run test:happy          # Happy path tests

# Reports
npm run report:allure       # Allure report
npm run report:html         # HTML report

# Debugging
npm run test:ui             # UI mode
npm run test:headed         # Headed mode
npm run test:debug          # Debug mode
Happy Testing! 🚀

text

---

## 📝 **Summary**

This README includes:

1. ✅ **Table of Contents** - Easy navigation
2. ✅ **Overview** - What the project does
3. ✅ **Features** - Key capabilities
4. ✅ **Project Structure** - Clear directory tree
5. ✅ **Prerequisites** - What you need installed
6. ✅ **Installation** - Step-by-step setup
7. ✅ **Running Tests** - All commands with descriptions
8. ✅ **Test Reports** - How to view reports
9. ✅ **Test Categories** - Tags and coverage
10. ✅ **Writing Tests** - Examples with explanations
11. ✅ **Configuration** - Environment variables
12. ✅ **FAQ** - Common questions
13. ✅ **Quick Reference** - Command cheat sheet

Now you're ready to push to GitHub! 🚀
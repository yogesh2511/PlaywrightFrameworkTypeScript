Medishop Automation Framework
This repository contains the end-to-end (E2E) testing framework for Medishop, built using Playwright and TypeScript. It utilizes a robust Page Object Model (POM) architecture, custom fixtures, multi-environment configurations, and handles complex authentication states (Local Storage + Session Storage).

Prerequisites
Node.js: v18 or v20+ recommended.

npm: Installed alongside Node.js.

Installation
Clone the repository:

Bash
git clone <repository-url>
cd MedishopAutomation
Install dependencies:

Bash
npm install
Install Playwright browsers:

Bash
npx playwright install --with-deps
Project Structure
Plaintext
MedishopAutomation/
├── .github/workflows/       # GitHub Actions CI/CD pipelines (playwright.yml)
├── env-files/               # Environment-specific configuration files (.env.demo, .env.stage)
├── fixture/                 # Custom Playwright fixtures (pom-fixtures, hooks, multi-role)
├── pages/                   # Page Object Model (POM) classes (LoginPage, ShopPage, etc.)
├── playwright/.auth/        # Auto-generated saved authentication states (user.json, session.json)
├── test-data/               # JSON/CSV files containing static test data
├── tests/                   # E2E test files (*.spec.ts) and Global Setup (auth.setup.ts)
├── utils/                   # Reusable utility functions (common-utils.ts)
├── playwright.config.ts     # Main Playwright configuration file
└── package.json             # Project dependencies and custom npm run scripts
Configuration
This framework uses dotenv and cross-env to manage environments. Variables are loaded from the env-files/ directory based on the ENV_NAME passed during execution.

Ensure you have the required environment files set up (e.g., env-files/.env.demo):

Properties
BASE_URL=https://your-demo-url.com
USERNAME=demo_user
PASSWORD=demo_pass
Authentication & State Management
The framework uses Playwright's Setup Project pattern.

tests/auth.setup.ts runs first, logging into the application.

It saves both standard state (Cookies/Local Storage) to playwright/.auth/user.json and custom Session Storage to session.json.

Custom fixtures inject this saved state into the browser context, ensuring all subsequent tests begin fully authenticated without repeating the UI login flow.

Running Tests
Tests can be executed using the custom scripts defined in package.json.

Run Demo Environment Tests
Bash
# Run headless (background)
npm run test_demo

# Run headed (visible browser)
npm run test_demo_cr_hd

# Run with Playwright UI mode (Recommended for debugging)
npm run test_demo_ui
Advanced Execution
Bash
# Run tests tagged with @UAT
npm run test_uat_cr_hd

# Run only tests that failed in the previous run
npm run test_demo_cr_hd_lf

# Run against the Staging environment
npm run test_stage
CI/CD Pipeline (GitHub Actions)
This project includes a continuous integration workflow located at .github/workflows/playwright.yml.

Triggers: Automatically runs on push and pull_request to the main or master branches.

Sharding: The test suite is sharded across 4 parallel runners to drastically reduce execution time.

Blob Reporting: Each shard generates a blob report. A final merge job consolidates all blob files into a single, cohesive HTML report.

Artifacts: The final HTML report is uploaded as a GitHub Artifact accessible on the Actions run summary page and is retained for 14 days.
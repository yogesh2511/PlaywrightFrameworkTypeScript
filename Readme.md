# Medishop Automation Framework

This repository contains the end-to-end (E2E) testing framework for Medishop, built using [Playwright](https://playwright.dev/) and TypeScript. It utilizes a robust Page Object Model (POM) architecture, custom fixtures, multi-environment configurations, and handles complex authentication states (Local Storage + Session Storage).

## Prerequisites

- **Node.js:** v18 or v20+ recommended.
- **npm:** Installed alongside Node.js.

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MedishopAutomation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install --with-deps
```

## Project Structure

```text
MedishopAutomation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── env-files/
│   ├── .env.demo
│   └── .env.stage
├── fixture/
│   ├── pom-fixtures/
│   ├── hooks/
│   └── multi-role/
├── pages/
│   ├── LoginPage.ts
│   └── ShopPage.ts
├── playwright/
│   └── .auth/
│       ├── user.json
│       └── session.json
├── test-data/
├── tests/
│   ├── *.spec.ts
│   └── auth.setup.ts
├── utils/
│   └── common-utils.ts
├── playwright.config.ts
└── package.json
```

## Configuration

This framework uses `dotenv` and `cross-env` to manage environments. Variables are loaded from the `env-files/` directory based on the `ENV_NAME` passed during execution.

Create the required environment file, such as `env-files/.env.demo`.

Example: `env-files/.env.demo`

```dotenv
BASE_URL=https://your-demo-url.com
USERNAME=demo_user
PASSWORD=demo_pass
```

Replace the example values with your actual test environment details. Never commit real credentials to GitHub.

## Authentication & State Management

The framework uses Playwright's Setup Project pattern.

1. `tests/auth.setup.ts` runs first and logs into the application.
2. Standard authentication state (Cookies and Local Storage) is saved to `playwright/.auth/user.json`.
3. Custom Session Storage is saved to `playwright/.auth/session.json`.
4. Custom fixtures restore the saved state so subsequent tests begin authenticated without repeating the UI login flow.

**Security:** Keep generated authentication files out of version control because they may contain sensitive session information.

## Running Tests

Tests can be executed using the custom scripts defined in `package.json`.

### Run Demo Environment Tests

**Headless mode:**

```bash
npm run test_demo
```

**Headed mode (visible browser):**

```bash
npm run test_demo_cr_hd
```

**Playwright UI mode (recommended for debugging):**

```bash
npm run test_demo_ui
```

## Advanced Execution

**Run tests tagged with `@UAT`:**

```bash
npm run test_uat_cr_hd
```

**Run tests that failed in the previous run:**

```bash
npm run test_demo_cr_hd_lf
```

**Run against the Staging environment:**

```bash
npm run test_stage
```

## CI/CD Pipeline (GitHub Actions)

This project includes a continuous integration workflow located at `.github/workflows/playwright.yml`.

### Pipeline Features

- **Triggers:** Automatically runs on `push` and `pull_request` to the `main` or `master` branches.
- **Sharding:** The test suite is distributed across four parallel runners to reduce execution time.
- **Blob Reporting:** Each shard generates a Playwright blob report.
- **Report Merging:** A final job combines the blob reports into a single HTML report.
- **Artifacts:** The final HTML report is uploaded as a GitHub Actions artifact and retained for 14 days, as configured in the workflow.

## Key Features

- Playwright and TypeScript E2E testing
- Page Object Model (POM) architecture
- Reusable fixtures and utility functions
- Environment-specific configuration
- Authentication state reuse
- Parallel test execution
- Consolidated HTML reporting

---

**Built with Playwright and TypeScript.**

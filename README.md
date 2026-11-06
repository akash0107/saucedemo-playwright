# SauceDemo Playwright Tests

End-to-end UI tests for [saucedemo.com](https://www.saucedemo.com), written with [Playwright](https://playwright.dev) using the Page Object Model. Results go to Playwright's HTML report and to [Allure](https://allurereport.org).

## Features

- **Page Object Model**: locators and actions live in `pages/`, so tests read like user flows.
- **Custom fixtures**: page objects are injected straight into tests (`inventory`, `cart`, `checkout`).
- **One login per run**: a `setup` project logs in once and saves the session, and every test reuses it.
- **Screenshot after every step**: the `step` fixture attaches a full-page screenshot when each step finishes.
- **Artifacts on failure**: a failed test keeps its trace, screenshot and video.
- **Reports**: Playwright HTML report and Allure report.
- **CI**: GitHub Actions runs the suite on every push or pull request to `main`.
- **Docker**: the suite can run in the official Playwright image.

## Project structure

```
.
├── .github/workflows/playwright.yml   # CI pipeline
├── data/users.js                      # Test users (env-overridable)
├── fixtures/test.fixture.js           # Page object fixtures + screenshot `step` helper
├── pages/                             # Page objects
│   ├── login.page.js
│   ├── inventory.page.js
│   ├── cart.page.js
│   └── checkout.page.js
├── tests/
│   ├── auth.setup.js                  # Logs in once, saves storage state
│   └── e2e/checkout.spec.js           # Checkout happy path
├── Dockerfile
└── playwright.config.js
```

## Prerequisites

- Node.js 18 or newer (LTS recommended)
- Java 8 or newer, only needed to generate the Allure report

## Getting started

```bash
git clone https://github.com/akash0107/saucedemo-playwright.git
cd saucedemo-playwright
npm ci
npx playwright install --with-deps chromium
```

## Running tests

| Command               | What it does                          |
| --------------------- | ------------------------------------- |
| `npm test`            | Run the whole suite (headless)        |
| `npm run test:smoke`  | Run only tests tagged `@smoke`        |
| `npm run test:headed` | Run with a visible browser            |
| `npm run test:ui`     | Open Playwright's interactive UI mode |

## Reports

**Playwright HTML report**

```bash
npm run report
```

Each step shows its screenshot. For a failed test, the report also has the failure screenshot and video, plus a trace you can open in the Trace Viewer.

**Allure report**

```bash
npm run allure
```

This generates `allure-report/` from `allure-results/` and opens it in your browser.

## Writing tests

Import `test` and `expect` from the custom fixture, not from `@playwright/test`. Wrap each logical action in `step` to get a screenshot when it finishes:

```js
const { test, expect } = require('../../fixtures/test.fixture');

test('add item to cart', async ({ inventory, step }) => {
  await inventory.gotoInventory();

  await step('Add backpack to cart', async () => {
    await inventory.addProductByName('Sauce Labs Backpack');
  });
});
```

## Configuration

The test user defaults to SauceDemo's public demo account (`standard_user` / `secret_sauce`). To use a different account, set these environment variables:

```bash
SAUCE_USERNAME=problem_user SAUCE_PASSWORD=secret_sauce npm test
```

## Docker

```bash
docker build -t saucedemo-playwright .
docker run --rm \
  -v "$(pwd)/playwright-report:/app/playwright-report" \
  -v "$(pwd)/allure-results:/app/allure-results" \
  saucedemo-playwright
```

The volume mounts copy the reports back to your machine.

## CI

`.github/workflows/playwright.yml` installs dependencies and browsers, then runs the suite. It uploads the HTML report as the `playwright-report` artifact, and keeps it for 30 days. On CI, failed tests are retried up to 2 times.

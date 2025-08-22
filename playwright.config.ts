import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left `test.only` in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Configure projects for major browsers
  projects: [
    // I only test with profiles that I actually use day to day. If other people
    // start using this project, these profiles should likely expand to include
    // at least a Chrome.
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 11'] },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },

  testDir: 'e2e',
});

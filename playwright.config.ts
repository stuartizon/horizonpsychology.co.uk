import { defineConfig, devices } from "@playwright/test";

const port = 4322;

export default defineConfig({
  testDir: "e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "chromium-phone", use: { ...devices["iPhone SE"], browserName: "chromium" } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "webkit-phone", use: { ...devices["iPhone SE"] } },
  ],
  webServer: {
    command: `astro build && astro preview --host 127.0.0.1 --port ${port}`,
    env: { ASTRO_TELEMETRY_DISABLED: "1" },
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
  },
});

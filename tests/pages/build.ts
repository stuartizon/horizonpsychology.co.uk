import { execSync } from "node:child_process";

/**
 * Builds the site before the page tests read it. CI tests the build that gets
 * deployed, which the job downloads from the build job, so it doesn't build again.
 */
export default function setup() {
  if (!process.env.CI) {
    execSync("astro build", {
      stdio: "ignore",
      env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
    });
  }
}

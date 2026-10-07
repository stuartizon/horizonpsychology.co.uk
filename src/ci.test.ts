import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

// The browser test jobs run in the Playwright container, whose browsers only work with the
// matching version of @playwright/test. A Playwright upgrade updates both.
test("the browser test jobs use the Playwright image for the installed version", () => {
  const { version } = JSON.parse(
    readFileSync("node_modules/@playwright/test/package.json", "utf8"),
  );
  const workflow = readFileSync(".github/workflows/ci.yml", "utf8");
  expect(workflow).toContain(`mcr.microsoft.com/playwright:v${version}-noble`);
});

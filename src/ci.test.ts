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

// Astro refuses to run on a Node version older than its minimum, which can rise in a patch
// release. CI installs the version in .nvmrc, and package.json states the same minimum.
test("the Node version in .nvmrc meets Astro's minimum", () => {
  const minimum = minimumNode("node_modules/astro/package.json");
  const nvmrc = readFileSync(".nvmrc", "utf8").trim();
  expect(nvmrc).toBe(minimum);
  expect(minimumNode("package.json")).toBe(minimum);
});

function minimumNode(packageJson: string) {
  const { engines } = JSON.parse(readFileSync(packageJson, "utf8"));
  return engines.node.replace(/^>=/, "");
}

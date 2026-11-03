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
// release. CI installs the version in .nvmrc, so it must meet that minimum.
test("the Node version in .nvmrc meets Astro's minimum", () => {
  const minimum = minimumNode("node_modules/astro/package.json");
  expect(compareVersions(nvmrc(), minimum)).toBeGreaterThanOrEqual(0);
});

// package.json states the Node version CI runs on as the site's minimum, and the Node types
// match its major version. Dependabot skips major @types/node updates, so they move by hand.
test("package.json's Node version and types match .nvmrc", () => {
  expect(minimumNode("package.json")).toBe(nvmrc());
  const { devDependencies } = JSON.parse(readFileSync("package.json", "utf8"));
  const typesMajor = devDependencies["@types/node"]
    .replace(/^\^/, "")
    .split(".")[0];
  expect(typesMajor).toBe(nvmrc().split(".")[0]);
});

function nvmrc() {
  return readFileSync(".nvmrc", "utf8").trim();
}

function minimumNode(packageJson: string) {
  const { engines } = JSON.parse(readFileSync(packageJson, "utf8"));
  return engines.node.replace(/^>=/, "");
}

function compareVersions(a: string, b: string) {
  const [x, y] = [a, b].map((version) => version.split(".").map(Number));
  for (let i = 0; i < 3; i++) {
    if (x[i] !== y[i]) return x[i] - y[i];
  }
  return 0;
}

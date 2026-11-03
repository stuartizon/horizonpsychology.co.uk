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

// package.json states the Node version CI runs on as the site's minimum, and the Node types
// match its major version. Dependabot skips major @types/node updates, so they move by hand.
test("package.json's Node version and types match .nvmrc", () => {
  const nvmrc = readFileSync(".nvmrc", "utf8").trim();
  const { engines, devDependencies } = JSON.parse(
    readFileSync("package.json", "utf8"),
  );
  expect(engines.node).toBe(`>=${nvmrc}`);
  const typesMajor = devDependencies["@types/node"]
    .replace(/^\^/, "")
    .split(".")[0];
  expect(typesMajor).toBe(nvmrc.split(".")[0]);
});

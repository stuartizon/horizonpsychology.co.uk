import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, test } from "vitest";

const breakpoints = ["(min-width: 48rem)", "(min-width: 64rem)"];

// Files from before the redesign that still use their own widths, with the issue that
// redesigns each one. Remove a file from this list when its test starts passing.
const notYetRedesigned: Record<string, number> = {};

const stylesheets = readdirSync("src", { recursive: true, encoding: "utf8" })
  .filter((path) => /\.(astro|css)$/.test(path))
  .map((path) => `src/${path}`)
  .sort();

function widthQueries(path: string) {
  const css = readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  return [...css.matchAll(/@media([^{]*)\{/g)].flatMap(([, query]) =>
    [...query.matchAll(/\([^)]*width[^)]*\)/g)].map(([feature]) =>
      feature.replace(/\s+/g, " ").replace(/ ?: ?/, ": "),
    ),
  );
}

describe("media queries use only the site breakpoints", () => {
  for (const path of stylesheets) {
    const issue = notYetRedesigned[path];
    (issue ? test.fails : test)(issue ? `${path} (#${issue})` : path, () => {
      expect(
        widthQueries(path).filter((query) => !breakpoints.includes(query)),
      ).toEqual([]);
    });
  }
});

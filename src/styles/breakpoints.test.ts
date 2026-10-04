import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, test } from "vitest";

const breakpoints = ["(min-width: 48rem)", "(min-width: 64rem)"];

const stylesheets = readdirSync("src", { recursive: true, encoding: "utf8" })
  .filter((path) => /\.(astro|css)$/.test(path))
  .map((path) => `src/${path}`)
  .sort();

function widthQueries(path: string) {
  const css = readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  return [...css.matchAll(/@media([^{]*)\{/g)].flatMap(([, query]) =>
    [...query.matchAll(/\([^)]*width[^)]*\)/g)].map(([feature]) => feature.replace(/\s+/g, " ").replace(/ ?: ?/, ": ")),
  );
}

describe("media queries use only the site breakpoints", () => {
  for (const path of stylesheets) {
    test(path, () => {
      expect(widthQueries(path).filter((query) => !breakpoints.includes(query))).toEqual([]);
    });
  }
});

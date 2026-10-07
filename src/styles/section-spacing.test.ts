import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, test } from "vitest";

// Vertical padding of 36px or more is section spacing, which comes from
// --section-y or --section-y-tight in global.css rather than each file's own value.
const sectionSize = 36;

const stylesheets = readdirSync("src", { recursive: true, encoding: "utf8" })
  .filter((path) => /\.(astro|css)$/.test(path))
  .map((path) => `src/${path}`)
  .filter((path) => path !== "src/styles/global.css")
  .sort();

/** The CSS in the file at `path`: a component's `<style>` blocks, so a glob such as
 * `"../icons/*.svg"` in its script isn't read as the start of a comment. */
function styles(path: string) {
  const source = readFileSync(path, "utf8");
  if (path.endsWith(".css")) return source;
  return [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
    .map(([, css]) => css)
    .join("\n");
}

/** The vertical padding declarations in the file at `path` with a length of 36px or more. */
function sectionSizedPadding(path: string) {
  const css = styles(path).replace(/\/\*[\s\S]*?\*\//g, "");
  return [
    ...css.matchAll(
      /padding-(?:block(?:-start|-end)?|top|bottom)\s*:([^;]*);/g,
    ),
  ]
    .filter(([, value]) =>
      [...value.matchAll(/(\d+(?:\.\d+)?)px/g)].some(
        ([, px]) => Number(px) >= sectionSize,
      ),
    )
    .map(([declaration]) => declaration.replace(/\s+/g, " "));
}

describe("vertical section padding uses the section spacing tokens", () => {
  for (const path of stylesheets) {
    test(path, () => {
      expect(sectionSizedPadding(path)).toEqual([]);
    });
  }
});

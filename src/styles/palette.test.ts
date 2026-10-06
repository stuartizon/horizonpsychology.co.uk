import { readFileSync, readdirSync } from "node:fs";
import { expect, test } from "vitest";

// The logo's sun gradient is part of the brand mark, so its colours aren't in the palette.
const brandColours: Record<string, string[]> = {
  "src/components/Logo.astro": ["#f5b25a", "#e5872f", "#c15a1e"],
};

const global = readFileSync("src/styles/global.css", "utf8");

/** The hex colours in `css`, lowercased, ignoring comments. */
function hexColours(css: string) {
  return [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b/gi)].map(
    ([hex]) => hex.toLowerCase(),
  );
}

const palette = [...global.matchAll(/--color-[\w-]+:\s*(#[0-9a-f]+);/gi)].map(([, hex]) => hex.toLowerCase());

test("global.css only gives hex colours in palette custom properties", () => {
  expect(hexColours(global).length).toBe(palette.length);
});

const files = readdirSync("src", { recursive: true, encoding: "utf8" })
  .filter((path) => /\.(astro|css)$/.test(path))
  .map((path) => `src/${path}`)
  .filter((path) => path !== "src/styles/global.css")
  .sort();

for (const path of files) {
  test(`${path} uses palette colours, not hex values`, () => {
    const allowed = brandColours[path] ?? [];
    expect(hexColours(readFileSync(path, "utf8")).filter((hex) => !allowed.includes(hex))).toEqual([]);
  });
}

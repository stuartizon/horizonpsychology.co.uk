import { readdirSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { file, page, pages } from "./pages";

/** Every font file the built stylesheets ask for. */
const fontsInStyles = readdirSync("dist/_astro")
  .filter((name) => name.endsWith(".css"))
  .flatMap((name) => [
    ...file(`/_astro/${name}`).matchAll(/url\((\/_astro\/[^)]+\.woff2)\)/g),
  ])
  .map((match) => match[1]);

describe.each(pages())("%s", (path) => {
  const preloads = [
    ...page(path).querySelectorAll('link[rel="preload"][as="font"]'),
  ];

  test("preloads the Latin Lora and Source Sans 3 the stylesheet uses", () => {
    expect(
      preloads.map((link) =>
        link.getAttribute("href")!.replace(/\.[^.]+\.woff2$/, ""),
      ),
    ).toEqual([
      "/_astro/lora-latin-400-normal",
      "/_astro/source-sans-3-latin-wght-normal",
    ]);
    for (const link of preloads) {
      expect(fontsInStyles).toContain(link.getAttribute("href"));
      expect(link.getAttribute("type")).toBe("font/woff2");
      expect(link.hasAttribute("crossorigin")).toBe(true);
    }
  });
});

import { existsSync } from "node:fs";
import { expect, test } from "vitest";
import { page, pages } from "./pages";

/** Each internal link's path, without any query or fragment, and the pages that link to it. */
const links = new Map<string, string[]>();
for (const path of pages()) {
  for (const link of page(path).querySelectorAll('a[href^="/"]')) {
    const href = new URL(link.getAttribute("href")!, "https://example.com")
      .pathname;
    links.set(href, [...new Set([...(links.get(href) ?? []), path])]);
  }
}

test("pages link to other pages", () => {
  expect(links.size).toBeGreaterThan(1);
});

for (const [href, from] of [...links].sort()) {
  test(`${href} opens a page`, () => {
    const file = `dist${href.endsWith("/") ? `${href}index.html` : href}`;
    expect(existsSync(file), `${href}, linked from ${from.join(", ")}`).toBe(
      true,
    );
  });
}

test("every link to another site opens in a new tab, and says so", () => {
  const unmarked = pages().flatMap((path) =>
    [...page(path).querySelectorAll('a[href^="http"]')]
      .filter(
        (link) =>
          new URL(link.getAttribute("href")!).hostname !==
          "horizonpsychology.co.uk",
      )
      .filter(
        (link) =>
          link.getAttribute("target") !== "_blank" ||
          link.getAttribute("rel") !== "noopener" ||
          !link.textContent?.includes("(opens in a new tab)"),
      )
      .map((link) => `${link.getAttribute("href")} on ${path}`),
  );

  expect(unmarked).toEqual([]);
});

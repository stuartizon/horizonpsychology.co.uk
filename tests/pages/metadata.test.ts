import { existsSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { page, pages } from "./pages";

const site = "https://horizonpsychology.co.uk";

/** The `content` of the `<meta>` in `document` matching `selector`. */
function meta(document: Document, selector: string) {
  return document.querySelector(`meta${selector}`)?.getAttribute("content");
}

const documents = pages().map((path) => ({ path, document: page(path) }));

describe.each(documents)("$path", ({ path, document }) => {
  const description = meta(document, '[name="description"]');

  test("has a title ending in the site name", () => {
    expect(document.title).toMatch(/(^| \| )Horizon Psychology$/);
  });

  test("has a description short enough for search results", () => {
    expect(description).toBeTruthy();
    expect(description!.length).toBeLessThanOrEqual(160);
  });

  test("has Open Graph tags matching its title and description", () => {
    expect(meta(document, '[property="og:title"]')).toBe(document.title);
    expect(meta(document, '[property="og:description"]')).toBe(description);
  });

  test("has a share image on the site's domain, with alt text", () => {
    const image = meta(document, '[property="og:image"]');

    expect(image).toMatch(new RegExp(`^${site}/`));
    expect(existsSync(`dist${new URL(image!).pathname}`)).toBe(true);
    expect(meta(document, '[property="og:image:alt"]')).toBeTruthy();
    expect(meta(document, '[name="twitter:card"]')).toBe("summary_large_image");
  });

  if (path === "/404.html") {
    test("has no canonical URL, since it's shown at any missing path", () => {
      expect(document.querySelector('link[rel="canonical"]')).toBeNull();
      expect(document.querySelector('meta[property="og:url"]')).toBeNull();
    });
  } else {
    test("has a canonical URL on the site's domain matching its path", () => {
      expect(
        document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      ).toBe(site + path);
      expect(meta(document, '[property="og:url"]')).toBe(site + path);
    });
  }
});

test("every page has its own title and description", () => {
  const titles = documents.map(({ document }) => document.title);
  const descriptions = documents.map(({ document }) =>
    meta(document, '[name="description"]'),
  );

  expect(new Set(titles).size).toBe(titles.length);
  expect(new Set(descriptions).size).toBe(descriptions.length);
});

test("no page has placeholder copy in its description", () => {
  for (const { document } of documents) {
    expect(meta(document, '[name="description"]')).not.toMatch(
      /personal website|projects, and notes/i,
    );
  }
});

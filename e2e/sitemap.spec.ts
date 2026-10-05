import { expect, test, type APIRequestContext } from "@playwright/test";
import { services } from "../src/data/services";

const site = "https://horizonpsychology.co.uk";

test.skip(
  ({ browserName, isMobile }) => browserName !== "chromium" || isMobile,
  "The sitemap and robots.txt are the same in every browser",
);

/** The `<loc>` URLs in the XML file at `path`. */
async function locations(request: APIRequestContext, path: string): Promise<string[]> {
  const response = await request.get(path);
  expect(response.status(), path).toBe(200);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

test("the sitemap lists every page on the site's domain", async ({ request }) => {
  const sitemaps = await locations(request, "/sitemap-index.xml");
  const pages = [];
  for (const sitemap of sitemaps) {
    pages.push(...(await locations(request, new URL(sitemap).pathname)));
  }

  expect(pages.sort()).toEqual(
    [
      "/",
      "/about/",
      "/contact/",
      "/projects/",
      ...services.map((service) => `/${service.id}/`),
    ]
      .map((path) => site + path)
      .sort(),
  );
});

test("robots.txt points to the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");

  expect(await response.text()).toContain(`Sitemap: ${site}/sitemap-index.xml`);
});

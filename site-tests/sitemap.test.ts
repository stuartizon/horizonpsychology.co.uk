import { services } from "@/data/services";
import { expect, test } from "vitest";
import { file } from "./site";

const site = "https://horizonpsychology.co.uk";

/** The `<loc>` URLs in the built XML file at `path`. */
function locations(path: string) {
  return [...file(path).matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

test("the sitemap lists every page on the site's domain", () => {
  const pages = locations("/sitemap-index.xml").flatMap((sitemap) => locations(new URL(sitemap).pathname));

  expect(pages.sort()).toEqual(
    ["/", "/about/", "/contact/", "/faqs/", "/projects/", ...services.map((service) => `/${service.id}/`)]
      .map((path) => site + path)
      .sort(),
  );
});

test("robots.txt points to the sitemap", () => {
  expect(file("/robots.txt")).toContain(`Sitemap: ${site}/sitemap-index.xml`);
});

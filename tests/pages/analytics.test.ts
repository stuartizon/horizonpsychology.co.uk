import { describe, expect, test } from "vitest";
import { ANALYTICS_DOMAINS, ANALYTICS_WEBSITE_ID } from "@/consts";
import { page, pages } from "./pages";

describe.each(pages())("%s", (path) => {
  const scripts = [
    ...page(path).querySelectorAll(
      'script[src="https://cloud.umami.is/script.js"]',
    ),
  ];

  test("loads Umami's analytics, without query strings and respecting Do Not Track", () => {
    expect(scripts).toHaveLength(1);
    const [script] = scripts;
    expect(script.hasAttribute("defer")).toBe(true);
    expect(script.getAttribute("data-website-id")).toBe(ANALYTICS_WEBSITE_ID);
    expect(script.getAttribute("data-domains")).toBe(
      ANALYTICS_DOMAINS.join(","),
    );
    expect(script.getAttribute("data-do-not-track")).toBe("true");
    expect(script.getAttribute("data-exclude-search")).toBe("true");
  });
});

test("doesn't count visits to the live site until the privacy policy describes it", () => {
  expect(ANALYTICS_DOMAINS).toEqual([
    "analytics-trial.horizonpsychology.pages.dev",
  ]);
});

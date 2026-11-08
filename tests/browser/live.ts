import type { Page } from "@playwright/test";

/** The live site's address, where visits are counted (see `countsVisits`). */
export const LIVE = "https://horizonpsychology.co.uk";

/**
 * Serves the build under test at `origin`, such as the live site's address,
 * and stubs Umami's script, so a test never reaches the real Umami or counts
 * a visit.
 */
export async function serveAt(
  page: Page,
  baseURL: string | undefined,
  origin = LIVE,
  umami = "",
) {
  await page.route("https://cloud.umami.is/**", (route) =>
    route.fulfill({ contentType: "text/javascript", body: umami }),
  );
  await page.route(`${origin}/**`, async (route) => {
    const { pathname, search } = new URL(route.request().url());
    if (route.request().method() !== "GET") return route.fallback();
    route.fulfill({
      response: await route.fetch({
        url: new URL(pathname + search, baseURL).href,
      }),
    });
  });
}

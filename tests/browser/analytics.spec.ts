import { expect, test, type Page } from "@playwright/test";
import { ANALYTICS_WEBSITE_ID } from "@/consts";
import { PREVIEW, serveAt } from "./preview";

// Visits are only counted on previews for now, so these tests serve the
// build at a preview's address, with Umami's script stubbed.

/**
 * Serves the build at a preview's address, with a stub of Umami's script that
 * records each event, and returns the events recorded so far.
 */
async function recordEvents(page: Page, baseURL: string | undefined) {
  await serveAt(
    page,
    baseURL,
    PREVIEW,
    "window.umami = { track: (...args) => window.tracked.push(args) };",
  );
  await page.addInitScript(() => {
    (window as unknown as { tracked: unknown[] }).tracked = [];
  });
  return () =>
    page.evaluate(() => (window as unknown as { tracked: unknown[] }).tracked);
}

/** Waits for the stubbed analytics, so nothing happens before they can count it. */
const analyticsLoaded = (page: Page) =>
  page.waitForFunction(() => "umami" in window);

/** Records requests for Umami's script, stubbed or not. */
function umamiRequests(page: Page) {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().startsWith("https://cloud.umami.is/"))
      requests.push(request.url());
  });
  return requests;
}

const umamiScript = (page: Page) =>
  page.locator('script[src^="https://cloud.umami.is/"]');

async function sendEnquiry(page: Page, status: number) {
  await page.route(`${PREVIEW}/api/enquiry`, (route) =>
    route.fulfill({ status, json: {} }),
  );
  await page.goto(`${PREVIEW}/contact/`);
  await analyticsLoaded(page);
  await page.getByLabel("Your name").fill("Sam");
  await page.getByLabel("Email").fill("sam@example.com");
  await page.getByLabel("Write a message").fill("Something private");
  await page.getByLabel("I have read the privacy policy").check();
  await page.getByRole("button", { name: "Send enquiry" }).click();
}

test("a sent enquiry is counted, with nothing from the form", async ({
  page,
  baseURL,
}) => {
  const events = await recordEvents(page, baseURL);

  await sendEnquiry(page, 204);

  await expect(
    page.getByRole("heading", {
      name: "Thank you — your enquiry has been sent",
    }),
  ).toBeVisible();
  expect(await events()).toEqual([["Enquiry sent"]]);
});

test("an enquiry that fails to send isn't counted", async ({
  page,
  baseURL,
}) => {
  const events = await recordEvents(page, baseURL);

  await sendEnquiry(page, 502);

  await expect(page.getByRole("alert")).not.toBeEmpty();
  expect(await events()).toEqual([]);
});

test("clicking an email link is counted", async ({ page, baseURL }) => {
  const events = await recordEvents(page, baseURL);
  // Not the home page, whose footer moves as the header shrinks, so a click
  // there can land before the footer has settled.
  await page.goto(`${PREVIEW}/faqs/`);
  await analyticsLoaded(page);
  // Stops the click opening an email app, after the page has seen it.
  await page.evaluate(() =>
    window.addEventListener("click", (event) => event.preventDefault()),
  );

  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "hello@horizonpsychology.co.uk" })
    .click();

  await expect.poll(events).toEqual([["Email link clicked"]]);
});

test("loads Umami's analytics with the site's settings, leaving out query strings", async ({
  page,
  baseURL,
}) => {
  await recordEvents(page, baseURL);
  await page.goto(`${PREVIEW}/faqs/`);
  await analyticsLoaded(page);

  await expect(umamiScript(page)).toHaveCount(1);
  await expect(umamiScript(page)).toHaveAttribute(
    "data-website-id",
    ANALYTICS_WEBSITE_ID,
  );
  await expect(umamiScript(page)).toHaveAttribute(
    "data-exclude-search",
    "true",
  );
});

for (const [signal, property, value] of [
  ["Global Privacy Control", "globalPrivacyControl", true],
  ["Do Not Track", "doNotTrack", "1"],
] as const) {
  test(`doesn't load the analytics when the browser sends ${signal}`, async ({
    page,
    baseURL,
  }) => {
    const requests = umamiRequests(page);
    await serveAt(page, baseURL);
    await page.addInitScript(
      ([property, value]) =>
        Object.defineProperty(Navigator.prototype, property, {
          get: () => value,
        }),
      [property, value] as const,
    );

    await page.goto(`${PREVIEW}/faqs/`);
    await page.waitForLoadState("load");

    await expect(umamiScript(page)).toHaveCount(0);
    expect(requests).toEqual([]);
  });
}

for (const [where, origin] of [
  ["the live site", "https://horizonpsychology.co.uk"],
  ["the live site's Pages address", "https://horizonpsychology.pages.dev"],
  ["a local build", undefined],
] as const) {
  test(`on ${where}, the analytics aren't loaded and the privacy policy has no switch, until it describes them`, async ({
    page,
    baseURL,
  }) => {
    const requests = umamiRequests(page);
    await serveAt(page, baseURL, origin);

    await page.goto(`${origin ?? ""}/privacy-policy/`);
    await page.waitForLoadState("load");

    await expect(page.getByRole("switch")).toHaveCount(0);
    await expect(umamiScript(page)).toHaveCount(0);
    expect(requests).toEqual([]);
  });
}

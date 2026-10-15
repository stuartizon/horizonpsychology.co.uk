import { expect, test, type Page } from "@playwright/test";

/**
 * Replaces Umami's script with a stub that records each event, so the tests
 * send nothing, and returns the events recorded so far.
 */
async function recordEvents(page: Page) {
  await page.route("https://cloud.umami.is/**", (route) =>
    route.fulfill({
      contentType: "text/javascript",
      body: "window.umami = { track: (...args) => window.tracked.push(args) };",
    }),
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

async function sendEnquiry(page: Page, status: number) {
  await page.route("**/api/enquiry", (route) =>
    route.fulfill({ status, json: {} }),
  );
  await page.goto("/contact/");
  await analyticsLoaded(page);
  await page.getByLabel("Your name").fill("Sam");
  await page.getByLabel("Email").fill("sam@example.com");
  await page.getByLabel("Write a message").fill("Something private");
  await page.getByLabel("I have read the privacy policy").check();
  await page.getByRole("button", { name: "Send enquiry" }).click();
}

test("a sent enquiry is counted, with nothing from the form", async ({
  page,
}) => {
  const events = await recordEvents(page);

  await sendEnquiry(page, 204);

  await expect(
    page.getByRole("heading", {
      name: "Thank you — your enquiry has been sent",
    }),
  ).toBeVisible();
  expect(await events()).toEqual([["Enquiry sent"]]);
});

test("an enquiry that fails to send isn't counted", async ({ page }) => {
  const events = await recordEvents(page);

  await sendEnquiry(page, 502);

  await expect(page.getByRole("alert")).not.toBeEmpty();
  expect(await events()).toEqual([]);
});

test("clicking an email link is counted", async ({ page }) => {
  const events = await recordEvents(page);
  // Not the home page, whose footer moves as the header shrinks, so a click
  // there can land before the footer has settled.
  await page.goto("/faqs/");
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

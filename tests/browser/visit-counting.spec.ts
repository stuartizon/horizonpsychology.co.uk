import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// The privacy policy's control for whether this browser's visits are counted
// (#240). Umami's script is stubbed out, so the tests send nothing.
test.beforeEach(async ({ page }) => {
  await page.route("https://cloud.umami.is/**", (route) =>
    route.fulfill({ contentType: "text/javascript", body: "" }),
  );
});

const control = (page: Page) => page.locator(".visit-counting");
const status = (page: Page) => control(page).getByRole("status");
const stop = (page: Page) =>
  page.getByRole("button", { name: "Stop counting my visits" });
const restart = (page: Page) =>
  page.getByRole("button", { name: "Count my visits again" });
const optedOut = (page: Page) =>
  page.evaluate(() => localStorage.getItem("umami.disabled"));

test("says visits are counted, with a button to stop counting them", async ({
  page,
}) => {
  await page.goto("/privacy-policy/");

  await expect(status(page)).toHaveText(
    "Your visits to this website are counted anonymously.",
  );
  await expect(stop(page)).toBeVisible();
});

test("stopping and restarting counting changes the sentence and the button, and lasts across a reload", async ({
  page,
}) => {
  await page.goto("/privacy-policy/");

  // From the keyboard, as Safari doesn't focus a button that's clicked.
  await stop(page).focus();
  await page.keyboard.press("Enter");
  await expect(status(page)).toHaveText(
    "Your visits to this website aren’t counted in this browser.",
  );
  await expect(restart(page)).toBeFocused();
  expect(await optedOut(page)).toBeTruthy();

  await page.reload();
  await expect(restart(page)).toBeVisible();

  await restart(page).focus();
  await page.keyboard.press("Enter");
  await expect(status(page)).toHaveText(
    "Your visits to this website are counted anonymously.",
  );
  await expect(stop(page)).toBeFocused();
  expect(await optedOut(page)).toBeNull();
});

test("sits at the end of the section on cookies and website usage", async ({
  page,
}) => {
  await page.goto("/privacy-policy/");
  await expect(control(page)).toBeVisible();

  const [after, before] = await control(page).evaluate((control) => {
    const headings = [...document.querySelectorAll("h2")];
    const section = headings.findIndex((h) =>
      h.textContent!.includes("Cookies and website usage"),
    );
    const next = headings[section + 1];
    return [
      !!(
        headings[section].compareDocumentPosition(control) &
        Node.DOCUMENT_POSITION_FOLLOWING
      ),
      !!(
        next.compareDocumentPosition(control) & Node.DOCUMENT_POSITION_PRECEDING
      ),
    ];
  });
  expect(after).toBe(true);
  expect(before).toBe(true);
});

test("when the browser asks not to be tracked, says visits aren't counted, with no button", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(Navigator.prototype, "globalPrivacyControl", {
      get: () => true,
    }),
  );
  await page.goto("/privacy-policy/");

  await expect(status(page)).toHaveText(
    "Your browser asks websites not to track you, so your visits aren’t counted.",
  );
  await expect(control(page).getByRole("button")).toHaveCount(0);
});

test("has no detectable accessibility violations once counting is stopped", async ({
  page,
}) => {
  await page.goto("/privacy-policy/");
  await stop(page).click();
  await expect(restart(page)).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("isn't shown, as the button can't work", async ({ page }) => {
    await page.goto("/privacy-policy/");

    await expect(stop(page)).toBeHidden();
    await expect(control(page)).toBeHidden();
  });
});

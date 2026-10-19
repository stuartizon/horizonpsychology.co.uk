import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { PREVIEW, serveAt } from "./preview";

// The privacy policy's control for whether this browser's visits are counted
// (#240). It's only shown where visits are counted, on previews for now, so
// the tests serve the build at a preview's address, with Umami's script
// stubbed out.
test.beforeEach(async ({ page, baseURL }) => {
  await serveAt(page, baseURL);
});

const control = (page: Page) => page.locator(".visit-counting");
const toggle = (page: Page) =>
  page.getByRole("switch", { name: "Count my visits to this website" });
const ON =
  "Your visits are counted anonymously. No cookies or personal details are stored.";
const OFF = "Your visits aren’t counted on this browser.";
const optedOut = (page: Page) =>
  page.evaluate(() => localStorage.getItem("umami.disabled"));

test("has a switch, on, for counting this browser's visits", async ({
  page,
}) => {
  await page.goto(`${PREVIEW}/privacy-policy/`);

  await expect(toggle(page)).toBeVisible();
  await expect(toggle(page)).toBeChecked();
  await expect(toggle(page)).toBeEnabled();
  await expect(toggle(page)).toHaveAccessibleDescription(ON);
});

test("shows only the hint, which changes with the switch, beside it", async ({
  page,
}) => {
  await page.goto(`${PREVIEW}/privacy-policy/`);
  const text = async () =>
    (await control(page).innerText()).replace(/\s+/g, " ").trim();

  expect(await text()).toBe(ON);
  await toggle(page).click();
  await expect(toggle(page)).not.toBeChecked();
  expect(await text()).toBe(OFF);

  const track = (await toggle(page).boundingBox())!;
  const hint = (await control(page).locator(".switch__hint").boundingBox())!;
  expect(hint.x).toBeGreaterThan(track.x + track.width);
  expect(hint.y).toBeLessThan(track.y + track.height);
});

test("switching counting off and on again changes Umami's opt-out, and lasts across a reload", async ({
  page,
}) => {
  await page.goto(`${PREVIEW}/privacy-policy/`);

  await toggle(page).focus();
  await page.keyboard.press("Space");
  await expect(toggle(page)).not.toBeChecked();
  await expect(toggle(page)).toBeFocused();
  await expect(toggle(page)).toHaveAccessibleDescription(OFF);
  expect(await optedOut(page)).toBeTruthy();

  await page.reload();
  await expect(toggle(page)).not.toBeChecked();

  await toggle(page).click();
  await expect(toggle(page)).toBeChecked();
  await expect(toggle(page)).toHaveAccessibleDescription(ON);
  expect(await optedOut(page)).toBeNull();
});

test("sits at the end of the section on cookies and website usage", async ({
  page,
}) => {
  await page.goto(`${PREVIEW}/privacy-policy/`);
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

test("when the browser asks not to be tracked, the switch is off and can't be changed, and says why", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(Navigator.prototype, "globalPrivacyControl", {
      get: () => true,
    }),
  );
  await page.goto(`${PREVIEW}/privacy-policy/`);

  await expect(toggle(page)).not.toBeChecked();
  await expect(toggle(page)).toBeDisabled();
  await expect(toggle(page)).toHaveAccessibleDescription(
    "Your browser asks websites not to track you, so your visits aren’t counted.",
  );
});

test("has no detectable accessibility violations, on or off", async ({
  page,
}) => {
  const violations = async () =>
    (await new AxeBuilder({ page }).include(".visit-counting").analyze())
      .violations;
  await page.goto(`${PREVIEW}/privacy-policy/`);

  expect(await violations()).toEqual([]);
  await toggle(page).click();
  await expect(toggle(page)).not.toBeChecked();
  expect(await violations()).toEqual([]);
});

test("on a phone the label wraps beside the switch, inside the page", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Phones only");
  await page.goto(`${PREVIEW}/privacy-policy/`);
  const box = (await control(page).boundingBox())!;
  const track = (await toggle(page).boundingBox())!;
  expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  expect(track.width).toBe(44);
  expect(track.height).toBe(26);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("isn't shown, as the button can't work", async ({ page }) => {
    await page.goto(`${PREVIEW}/privacy-policy/`);

    await expect(control(page)).toBeHidden();
  });
});

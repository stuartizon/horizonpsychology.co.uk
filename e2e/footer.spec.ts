import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Footer links to pages that haven't been built yet, with the issue that builds each one.
// Remove a page from this list when it exists, and its test below will start passing.
const notYetBuilt: Record<string, number> = {
  "/faqs/": 8,
  "/terms-and-conditions/": 10,
  "/confidentiality/": 10,
  "/privacy-policy/": 10,
  "/complaints/": 10,
};

const footer = (page: Page) => page.getByRole("contentinfo");
const groups = (page: Page) => footer(page).getByRole("navigation");

test("footer links open their pages", async ({ page }) => {
  await page.goto("/");
  const hrefs = await footer(page)
    .getByRole("link")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
  expect(hrefs.length).toBeGreaterThan(0);

  for (const href of hrefs.filter((href) => href.startsWith("/") && !(href in notYetBuilt))) {
    const response = await page.request.get(href);
    expect(response.status(), href).toBe(200);
  }
});

for (const [href, issue] of Object.entries(notYetBuilt)) {
  test(`the footer link to ${href} opens a page (#${issue})`, async ({ page }) => {
    test.fail(true, `The page is built in #${issue}`);
    await page.goto("/");

    await expect(footer(page).locator(`a[href="${href}"]`)).toHaveCount(1);
    const response = await page.request.get(href);
    expect(response.status(), href).toBe(200);
  });
}

test("on a phone the footer is a single column", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phone layout only");
  await page.goto("/");

  const boxes = await groups(page).evaluateAll((navs) => navs.map((nav) => nav.getBoundingClientRect()));
  expect(boxes).toHaveLength(3);
  for (let i = 1; i < boxes.length; i++) {
    expect(boxes[i].top).toBeGreaterThanOrEqual(boxes[i - 1].bottom);
    expect(boxes[i].left).toBe(boxes[0].left);
  }
});

test("on a desktop the link groups sit side by side", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop layout only");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const boxes = await groups(page).evaluateAll((navs) => navs.map((nav) => nav.getBoundingClientRect()));
  expect(boxes).toHaveLength(3);
  for (let i = 1; i < boxes.length; i++) {
    expect(boxes[i].top).toBe(boxes[0].top);
    expect(boxes[i].left).toBeGreaterThan(boxes[i - 1].right);
  }
});

test("the footer has no detectable accessibility violations", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).include("footer").analyze();

  expect(results.violations).toEqual([]);
});

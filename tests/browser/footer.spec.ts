import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const footer = (page: Page) => page.getByRole("contentinfo");
const groups = (page: Page) => footer(page).getByRole("navigation");

test("on a phone the footer is a single column", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phone layout only");
  await page.goto("/");

  const boxes = await groups(page).evaluateAll((navs) =>
    navs.map((nav) => nav.getBoundingClientRect()),
  );
  expect(boxes).toHaveLength(3);
  for (let i = 1; i < boxes.length; i++) {
    expect(boxes[i].top).toBeGreaterThanOrEqual(boxes[i - 1].bottom);
    expect(boxes[i].left).toBe(boxes[0].left);
  }
});

test("on a tablet the link groups sit side by side, below the logo and email", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Tablet layout only");
  await page.setViewportSize({ width: 768, height: 800 });
  await page.goto("/");

  const email = await footer(page)
    .getByRole("link", { name: "hello@horizonpsychology.co.uk" })
    .boundingBox();
  const boxes = await groups(page).evaluateAll((navs) =>
    navs.map((nav) => nav.getBoundingClientRect()),
  );
  expect(boxes).toHaveLength(3);
  expect(boxes[0].top).toBeGreaterThan(email!.y + email!.height);
  for (let i = 1; i < boxes.length; i++) {
    expect(boxes[i].top).toBe(boxes[0].top);
    expect(boxes[i].left).toBeGreaterThan(boxes[i - 1].right);
  }
});

test("on a desktop the link groups sit side by side", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop layout only");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const boxes = await groups(page).evaluateAll((navs) =>
    navs.map((nav) => nav.getBoundingClientRect()),
  );
  expect(boxes).toHaveLength(3);
  for (let i = 1; i < boxes.length; i++) {
    expect(boxes[i].top).toBe(boxes[0].top);
    expect(boxes[i].left).toBeGreaterThan(boxes[i - 1].right);
  }
});

test("the footer has no detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).include("footer").analyze();

  expect(results.violations).toEqual([]);
});

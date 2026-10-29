import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const footer = (page: Page) => page.getByRole("contentinfo");
const groups = (page: Page) => footer(page).getByRole("navigation");

/** The boxes of the footer's links, in order, leaving out the email address. */
const linkBoxes = (page: Page) =>
  footer(page)
    .getByRole("navigation")
    .getByRole("link")
    .evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getBoundingClientRect()),
    );

test("on a phone the link groups have no visible headings, but keep their names", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Phone layout only");
  await page.goto("/");

  for (const name of ["Work together", "About Horizon", "Information"]) {
    await expect(footer(page).getByRole("navigation", { name })).toBeAttached();
    await expect(footer(page).getByText(name, { exact: true })).toBeHidden();
  }
});

test("on the narrowest phones the links are a single column", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Phone layout only");
  await page.goto("/");

  const links = await linkBoxes(page);
  expect(links).toHaveLength(12);
  for (let i = 1; i < links.length; i++) {
    expect(links[i].top).toBeGreaterThan(links[i - 1].bottom);
    expect(links[i].left).toBe(links[0].left);
  }
});

// From about 352px up to the tablet breakpoint, the links are one evenly spaced list in two
// equal columns.
for (const width of [360, 740]) {
  test(`on a ${width}px phone the links are one list in two equal columns`, async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Phone layout only");
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");

    const email = await footer(page)
      .getByRole("link", { name: "hello@horizonpsychology.co.uk" })
      .boundingBox();
    const container = await footer(page)
      .locator(".container")
      .evaluate((element) => {
        const { left, width } = element.getBoundingClientRect();
        const padding = parseFloat(getComputedStyle(element).paddingLeft);
        return { left: left + padding, width: width - padding * 2 };
      });
    const middle = container.left + container.width / 2;

    const links = await linkBoxes(page);
    expect(links).toHaveLength(12);
    const rowGap = links[2].top - links[0].top;
    for (const [i, link] of links.entries()) {
      const row = Math.floor(i / 2);
      expect(link.top).toBeCloseTo(links[0].top + row * rowGap, 0);
      if (i % 2 === 0) {
        expect(link.left).toBe(container.left);
      } else {
        expect(link.left).toBeGreaterThan(middle);
        expect(link.left).toBeLessThan(middle + 20);
      }
    }
    expect(links[0].top).toBeGreaterThan(email!.y + email!.height);
  });
}

test("on a tablet the link groups sit side by side, below the logo and email", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Tablet layout only");
  await page.setViewportSize({ width: 768, height: 800 });
  await page.goto("/");
  for (const name of ["Work together", "About Horizon", "Information"]) {
    await expect(footer(page).getByText(name, { exact: true })).toBeVisible();
  }

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

test("the copyright line shows the visitor's current year, not the year the site was built", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2031-06-01T12:00:00Z"));
  await page.goto("/");

  await expect(footer(page)).toContainText("© 2031 Horizon Psychology");
});

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

// From about 352px up to the tablet breakpoint, each link group is stacked across the full
// width, with its links in two rows of two.
for (const width of [360, 740]) {
  test(`on a ${width}px phone each link group has its links in two equal columns`, async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Phone layout only");
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");

    const boxes = await groups(page).evaluateAll((navs) =>
      navs.map((nav) => nav.getBoundingClientRect()),
    );
    expect(boxes).toHaveLength(3);
    for (let i = 1; i < boxes.length; i++) {
      expect(boxes[i].top).toBeGreaterThanOrEqual(boxes[i - 1].bottom);
      expect(boxes[i].left).toBe(boxes[0].left);
      expect(boxes[i].width).toBe(boxes[0].width);
    }

    for (const [i, group] of boxes.entries()) {
      const links = await groups(page)
        .nth(i)
        .getByRole("link")
        .evaluateAll((anchors) =>
          anchors.map((anchor) => anchor.getBoundingClientRect()),
        );
      const middle = group.left + group.width / 2;
      expect(links).toHaveLength(4);
      expect(links[0].left).toBe(group.left);
      expect(links[1].top).toBe(links[0].top);
      expect(links[1].left).toBeGreaterThan(middle);
      expect(links[1].left).toBeLessThan(middle + 20);
      expect(links[2].left).toBe(links[0].left);
      expect(links[2].top).toBeGreaterThan(links[0].bottom);
      expect(links[3].top).toBe(links[2].top);
      expect(links[3].left).toBe(links[1].left);
    }
  });
}

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

test("the copyright line shows the visitor's current year, not the year the site was built", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2031-06-01T12:00:00Z"));
  await page.goto("/");

  await expect(footer(page)).toContainText("© 2031 Horizon Psychology");
});

import { expect, test, type Locator } from "@playwright/test";

const focusRing = (button: Locator) =>
  button.evaluate((el) => {
    const { outlineStyle, outlineWidth, boxShadow, borderTopLeftRadius } =
      getComputedStyle(el);
    return { outlineStyle, outlineWidth, boxShadow, borderTopLeftRadius };
  });

test("a primary button shows the focus ring and halo, and keeps its pill shape", async ({
  page,
}) => {
  await page.goto("/about/");
  const button = page.locator("main a.button--primary").first();

  await button.focus();

  const ring = await focusRing(button);
  expect(ring).toMatchObject({ outlineStyle: "solid", outlineWidth: "2px" });
  expect(ring.boxShadow).toContain("5px");
  expect(parseFloat(ring.borderTopLeftRadius)).toBeGreaterThan(20);
});

test("a link button is underlined, and shows the focus ring and halo", async ({
  page,
}) => {
  await page.goto("/");
  const button = page.getByRole("link", { name: "More about Emma" });

  await button.focus();

  const ring = await focusRing(button);
  expect(ring).toMatchObject({ outlineStyle: "solid", outlineWidth: "2px" });
  expect(ring.boxShadow).toContain("5px");
  expect(
    await button.evaluate((el) => getComputedStyle(el).textDecorationLine),
  ).toBe("underline");
});

test("a secondary button shows the focus ring and halo, and keeps its pill shape", async ({
  page,
}) => {
  await page.goto("/about/");
  const button = page.locator("main a.button--secondary").first();

  await button.focus();

  const ring = await focusRing(button);
  expect(ring).toMatchObject({ outlineStyle: "solid", outlineWidth: "2px" });
  expect(ring.boxShadow).toContain("5px");
  expect(parseFloat(ring.borderTopLeftRadius)).toBeGreaterThan(20);
});

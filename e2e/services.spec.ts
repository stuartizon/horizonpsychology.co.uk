import { expect, test } from "@playwright/test";
import { faqs } from "../src/data/faqs";
import { services } from "../src/data/services";

test("the home page links to each service with its summary", async ({ page }) => {
  await page.goto("/");

  for (const service of services) {
    const card = page.getByRole("article").filter({ hasText: service.name });
    await expect(card.getByRole("heading")).toHaveText(service.name);
    await expect(card).toContainText(service.summary);
    await expect(card.getByRole("link")).toHaveAttribute("href", `/${service.id}/`);
  }
});

test("clicking anywhere on a service card opens its page", async ({ page }) => {
  await page.goto("/");
  const [service] = services;

  // Away from the link text: the link covers the whole card.
  await page.getByRole("article").filter({ hasText: service.name }).click({ position: { x: 20, y: 20 } });

  await expect(page).toHaveURL(`/${service.id}/`);
});

test("on a wide screen every service card title fits on one line", async ({ page, isMobile }) => {
  test.skip(isMobile, "Wide screens only");
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const lines = await page.locator(".service-card h3").evaluateAll((titles) =>
    titles.map((title) => {
      const range = document.createRange();
      range.selectNodeContents(title);
      return range.getClientRects().length;
    }),
  );
  expect(lines).toEqual(services.map(() => 1));
});

for (const service of services) {
  test(`the ${service.name} page shows the service's details`, async ({ page }) => {
    await page.goto(`/${service.id}/`);

    await expect(page).toHaveTitle(new RegExp(`^${service.name} \\|`));
    await expect(page.getByRole("heading", { level: 1, name: service.name, exact: true })).toBeVisible();
    await expect(page.getByText(service.summary, { exact: true })).toBeVisible();
    for (const paragraph of service.description) {
      await expect(page.getByText(paragraph)).toBeVisible();
    }
  });

  test(`the ${service.name} page shows its fees and links to the contact form`, async ({ page }) => {
    await page.goto(`/${service.id}/`);

    const fees = page.getByRole("complementary", { name: "Fees and practicalities" });
    await expect(fees.getByText(`£${service.price}`, { exact: true })).toBeVisible();
    await expect(fees.getByText(`${service.minutes}-minute session`, { exact: true })).toBeVisible();
    for (const item of service.practical) {
      await expect(fees.getByText(item, { exact: true })).toBeVisible();
    }
    await expect(fees.getByRole("link", { name: "Schedule" })).toHaveAttribute(
      "href",
      `/contact/?topic=${service.id}`,
    );
  });
}

for (const service of services) {
  test(`the ${service.name} page shows its own questions`, async ({ page }) => {
    await page.goto(`/${service.id}/`);

    const section = page.getByRole("region", { name: "Before you get in touch" });
    await expect(section.getByRole("button")).toHaveText(service.faqs.map((id) => faqs[id].question));
    await expect(section.getByRole("link", { name: "All frequently asked questions" })).toHaveAttribute(
      "href",
      "/faqs/",
    );
  });

  test(`the ${service.name} page links to the other three services`, async ({ page }) => {
    await page.goto(`/${service.id}/`);

    const others = services.filter((other) => other.id !== service.id);
    const section = page.getByRole("region", { name: "Also available" });
    await expect(section.getByRole("article").getByRole("heading")).toHaveText(others.map((other) => other.name));
    for (const other of others) {
      await expect(section.getByRole("article").filter({ hasText: other.name }).getByRole("link")).toHaveAttribute(
        "href",
        `/${other.id}/`,
      );
    }
  });
}

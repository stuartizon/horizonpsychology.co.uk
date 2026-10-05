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

  await page.getByRole("article").filter({ hasText: service.name }).getByText(service.summary).click();

  await expect(page).toHaveURL(`/${service.id}/`);
});

for (const service of services) {
  test(`the ${service.name} page shows the service's details`, async ({ page }) => {
    await page.goto(`/${service.id}/`);

    await expect(page).toHaveTitle(new RegExp(`^${service.name} \\|`));
    await expect(page.getByRole("heading", { name: service.name })).toBeVisible();
    for (const paragraph of service.description) {
      await expect(page.getByText(paragraph)).toBeVisible();
    }
    await expect(page.getByText(`£${service.price} for a ${service.minutes}-minute session`)).toBeVisible();
    for (const item of service.practical) {
      await expect(page.getByText(item, { exact: true })).toBeVisible();
    }
  });
}

for (const service of services) {
  test(`the ${service.name} page shows its own questions`, async ({ page }) => {
    await page.goto(`/${service.id}/`);

    const questions = page.getByRole("region", { name: "Got questions?" }).getByRole("button");
    await expect(questions).toHaveText(service.faqs.map((id) => faqs[id].question));
  });
}

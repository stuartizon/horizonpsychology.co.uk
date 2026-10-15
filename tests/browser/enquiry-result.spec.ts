import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of ["/contact/sent/", "/contact/not-sent/"]) {
  test(`${path} has no detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
}

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("sending the form shows the thank-you page", async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === "webkit",
      "Playwright can't answer a request with a redirect in WebKit",
    );
    // Answered as the enquiry function answers the browser's own submission,
    // so no enquiry is sent.
    await page.route("**/api/enquiry", (route) =>
      route.fulfill({ status: 303, headers: { Location: "/contact/sent/" } }),
    );
    await page.goto("/contact/");
    await page.getByLabel("Your name").fill("Sam");
    await page.getByLabel("Email").fill("sam@example.com");
    await page.getByLabel("I have read the privacy policy").check();

    await page.getByRole("button", { name: "Send enquiry" }).click();

    await expect(page).toHaveURL(/\/contact\/sent\/$/);
    await expect(
      page.getByRole("heading", {
        name: "Thank you — your enquiry has been sent",
      }),
    ).toBeVisible();
  });
});

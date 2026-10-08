import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type Request } from "@playwright/test";

/**
 * Answers the form's submission with `status`, so no enquiry is sent, and
 * returns the requests it answered.
 */
async function answerEnquiries(page: Page, status: number) {
  const requests: Request[] = [];
  await page.route("**/*", async (route) => {
    if (route.request().method() !== "POST") return route.fallback();
    requests.push(route.request());
    await route.fulfill({ status, json: {} });
  });
  return requests;
}

/**
 * Like `answerEnquiries`, but holds each submission unanswered until
 * `release` is called, so a test can see the form while it's sending.
 */
async function holdEnquiries(page: Page, status: number) {
  const requests: Request[] = [];
  let release!: () => void;
  const released = new Promise<void>((resolve) => (release = resolve));
  await page.route("**/*", async (route) => {
    if (route.request().method() !== "POST") return route.fallback();
    requests.push(route.request());
    await released;
    await route.fulfill({ status, json: {} });
  });
  return { requests, release };
}

async function fillIn(page: Page) {
  await page.getByLabel("Your name").fill("Sam");
  await page.getByLabel("Email").fill("sam@example.com");
  await page.getByLabel("I have read the privacy policy").check();
}

const send = (page: Page) =>
  page.getByRole("button", { name: "Send enquiry" }).click();

test.beforeEach(async ({ page }) => {
  await page.goto("/contact/");
});

test("the required fields stop an empty enquiry, with errors linked to each", async ({
  page,
}) => {
  const requests = await answerEnquiries(page, 200);

  await send(page);

  for (const [label, error] of [
    ["Your name", "Please enter your name."],
    ["Email", "Please enter your email address."],
    [
      "I have read the privacy policy",
      "Please confirm you have read the privacy policy.",
    ],
  ]) {
    const field = page.getByLabel(label);
    await expect(field).toHaveAttribute("aria-invalid", "true");
    await expect(field).toHaveAccessibleDescription(error);
    await expect(page.getByText(error)).toBeVisible();
  }
  await expect(page.getByLabel("Your name")).toBeFocused();
  expect(requests).toEqual([]);
});

test("focus moves to the first field with an error", async ({ page }) => {
  await page.getByLabel("Your name").fill("Sam");

  await send(page);

  await expect(page.getByLabel("Email")).toBeFocused();
});

test("an email address without a domain is an error", async ({ page }) => {
  await fillIn(page);
  await page.getByLabel("Email").fill("sam@example");

  await send(page);

  await expect(page.getByLabel("Email")).toHaveAccessibleDescription(
    "Please enter a valid email address, like you@example.com.",
  );
});

test("an error clears once its field is filled in", async ({ page }) => {
  await send(page);

  await page.getByLabel("Your name").fill("Sam");

  await expect(page.getByLabel("Your name")).not.toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Your name")).toHaveAccessibleDescription("");
  await expect(page.getByText("Please enter your name.")).toBeHidden();
});

test("the message keeps its hint as its description", async ({ page }) => {
  await expect(page.getByLabel("Write a message")).toHaveAccessibleDescription(
    "Only as much as you feel comfortable sharing.",
  );
});

test("a topic in the address picks what the enquiry is about", async ({
  page,
}) => {
  await page.goto("/contact/?topic=research-supervision");

  await expect(page.getByLabel("What are you enquiring about?")).toHaveValue(
    "research-supervision",
  );
});

test("an unknown topic in the address leaves the first one picked", async ({
  page,
}) => {
  await page.goto("/contact/?topic=nonsense");

  await expect(page.getByLabel("What are you enquiring about?")).toHaveValue(
    "individual-therapy",
  );
});

test("a sent enquiry posts the form and says thank you", async ({ page }) => {
  const requests = await answerEnquiries(page, 200);
  await fillIn(page);
  await page.getByLabel("What are you enquiring about?").selectOption("other");
  await page.getByLabel("Online or face-to-face?").selectOption("Not sure yet");
  await page.getByLabel("Write a message").fill("Hello");

  await send(page);

  const thanks = page.getByRole("heading", {
    name: "Thank you — your enquiry has been sent",
  });
  await expect(thanks).toBeVisible();
  await expect(thanks).toBeFocused();
  await expect(page.getByLabel("Your name")).toBeHidden();
  expect(requests).toHaveLength(1);
  const sent = new URLSearchParams(requests[0].postData() ?? "");
  expect(Object.fromEntries(sent)).toEqual({
    name: "Sam",
    email: "sam@example.com",
    topic: "other",
    format: "Not sure yet",
    message: "Hello",
    consent: "yes",
    leave_empty: "",
  });
});

test("the field for spam bots is hidden from people", async ({ page }) => {
  const trap = page.locator('[name="leave_empty"]');
  await expect(trap).toHaveCount(1);
  await expect(trap).toBeHidden();
  await expect(page.getByLabel("Leave this empty")).toBeHidden();
});

test("after sending, another enquiry starts from an empty form", async ({
  page,
}) => {
  await answerEnquiries(page, 200);
  await fillIn(page);
  await send(page);

  await page.getByRole("button", { name: "Send another enquiry" }).click();

  await expect(page.getByLabel("Your name")).toBeVisible();
  await expect(page.getByLabel("Your name")).toHaveValue("");
  await expect(page.getByLabel("Your name")).toBeFocused();
});

test("an enquiry that fails to send says so, and keeps what was written", async ({
  page,
}) => {
  await answerEnquiries(page, 500);
  await fillIn(page);

  await send(page);

  await expect(page.getByRole("alert")).toContainText(
    "Sorry, your enquiry couldn’t be sent. Please try again, or email hello@horizonpsychology.co.uk.",
  );
  await expect(page.getByLabel("Your name")).toHaveValue("Sam");
  await expect(
    page.getByRole("heading", {
      name: "Thank you — your enquiry has been sent",
    }),
  ).toBeHidden();
});

for (const width of [320, 768, 1280]) {
  test(`at ${width}px the send button is centred in the form`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1024 });

    const form = (await page.locator("main form").boundingBox())!;
    const button = (await page
      .getByRole("button", { name: "Send enquiry" })
      .boundingBox())!;

    expect(
      Math.abs(button.x + button.width / 2 - (form.x + form.width / 2)),
    ).toBeLessThanOrEqual(1);
  });
}

test("at tablet width and up the form sits beside the heading", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "On a phone the form follows the heading");
  await page.setViewportSize({ width: 768, height: 1024 });

  const heading = (await page
    .getByRole("heading", { level: 1 })
    .boundingBox())!;
  const form = (await page.locator("main form").boundingBox())!;

  expect(form.x).toBeGreaterThan(heading.x + heading.width);
});

test("the Contact page has no detectable accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("the Contact page has no detectable accessibility violations with errors showing", async ({
  page,
}) => {
  await send(page);
  await expect(page.getByLabel("Your name")).toHaveAttribute(
    "aria-invalid",
    "true",
  );

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("the Contact page has no detectable accessibility violations once sent", async ({
  page,
}) => {
  await answerEnquiries(page, 200);
  await fillIn(page);
  await send(page);
  await expect(
    page.getByRole("heading", {
      name: "Thank you — your enquiry has been sent",
    }),
  ).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

const sendButton = (page: Page) =>
  page.getByRole("button", { name: "Send enquiry" });
const sending = (page: Page) => page.getByText("Sending…", { exact: true });

test("while an enquiry sends, the button says so and doesn't send it twice", async ({
  page,
}) => {
  const { requests, release } = await holdEnquiries(page, 200);
  await fillIn(page);
  await send(page);

  await expect(sendButton(page)).toHaveAttribute("aria-disabled", "true");
  await expect(sending(page)).toHaveCSS("opacity", "1");
  await expect(page.getByRole("status")).toHaveText("Sending your enquiry…");
  await sendButton(page).click({ force: true });
  expect(requests).toHaveLength(1);

  release();
  await expect(
    page.getByRole("heading", {
      name: "Thank you — your enquiry has been sent",
    }),
  ).toBeVisible();
});

test("the button keeps focus while the enquiry sends", async ({ page }) => {
  const { release } = await holdEnquiries(page, 200);
  await fillIn(page);
  await sendButton(page).focus();
  await page.keyboard.press("Enter");

  await expect(sendButton(page)).toHaveAttribute("aria-disabled", "true");
  await expect(sendButton(page)).toBeFocused();
  release();
});

test("the spinner turns while sending, and stays still with reduced motion", async ({
  page,
}) => {
  const { release } = await holdEnquiries(page, 200);
  await fillIn(page);
  await send(page);
  await expect(sending(page).locator("svg")).not.toHaveCSS(
    "animation-name",
    "none",
  );

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(sending(page).locator("svg")).toHaveCSS(
    "animation-name",
    "none",
  );
  release();
});

test("after an enquiry fails to send, the button can send it again", async ({
  page,
}) => {
  const { requests, release } = await holdEnquiries(page, 500);
  await fillIn(page);
  await send(page);
  release();

  await expect(page.getByRole("alert")).toContainText(
    "Sorry, your enquiry couldn’t be sent.",
  );
  await expect(sendButton(page)).not.toHaveAttribute("aria-disabled");
  await expect(sending(page)).toHaveCSS("opacity", "0");
  await send(page);
  await expect.poll(() => requests.length).toBe(2);
});

test("the Contact page has no detectable accessibility violations while sending", async ({
  page,
}) => {
  const { release } = await holdEnquiries(page, 200);
  await fillIn(page);
  await send(page);
  await expect(sendButton(page)).toHaveAttribute("aria-disabled", "true");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
  release();
});

test("once sent, the button to send another is centred in the panel", async ({
  page,
}) => {
  await answerEnquiries(page, 200);
  await fillIn(page);
  await send(page);

  const again = page.getByRole("button", { name: "Send another enquiry" });
  await expect(again).toBeVisible();
  const button = (await again.boundingBox())!;
  const panel = (await page.locator(".enquiry").boundingBox())!;

  expect(
    Math.abs(button.x + button.width / 2 - (panel.x + panel.width / 2)),
  ).toBeLessThanOrEqual(1);
});

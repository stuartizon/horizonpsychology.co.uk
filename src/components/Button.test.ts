import { render } from "@/test/render";
import { expect, test } from "vitest";
import Button from "./Button.astro";

test.each(["primary", "secondary", "link"] as const)(
  "the %s variant renders a link with its class",
  async (variant) => {
    const link = (
      await render(Button, {
        href: "/about/",
        label: "More about Emma",
        variant,
      })
    ).querySelector("a");

    expect(link?.getAttribute("href")).toBe("/about/");
    expect(link?.textContent).toBe("More about Emma");
    expect(link?.classList.contains(`button--${variant}`)).toBe(true);
  },
);

test("is primary by default", async () => {
  const link = (
    await render(Button, { href: "/contact/", label: "Contact Us" })
  ).querySelector("a");

  expect(link?.classList.contains("button--primary")).toBe(true);
});

test("without an href it renders a submit button", async () => {
  const button = (
    await render(Button, { label: "Send enquiry" })
  ).querySelector("button");

  expect(button?.getAttribute("type")).toBe("submit");
  expect(button?.textContent?.trim()).toBe("Send enquiry");
  expect(button?.classList.contains("button--primary")).toBe(true);
});

test("its type can make it a plain button rather than a submit button", async () => {
  const button = (
    await render(Button, { label: "Send another enquiry", type: "button" })
  ).querySelector("button");

  expect(button?.getAttribute("type")).toBe("button");
});

test("with a busy label it has a spinner and that label, hidden until it's busy", async () => {
  const button = (
    await render(Button, { label: "Send enquiry", busyLabel: "Sending…" })
  ).querySelector("button")!;
  const busy = [...button.querySelectorAll('[aria-hidden="true"]')].find(
    (element) => element.textContent?.trim() === "Sending…",
  );

  expect(busy?.querySelector("svg")).toBeTruthy();
  expect(button.hasAttribute("data-busy")).toBe(false);
});

test("without a busy label it has no busy state", async () => {
  const button = (
    await render(Button, { label: "Send enquiry" })
  ).querySelector("button")!;

  expect(button.querySelector("svg")).toBeNull();
});

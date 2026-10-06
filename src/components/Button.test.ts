import { render } from "@/test/render";
import { expect, test } from "vitest";
import Button from "./Button.astro";

test.each(["primary", "secondary", "link"] as const)(
  "the %s variant renders a link with its class",
  async (type) => {
    const link = (
      await render(Button, { href: "/about/", label: "More about Emma", type })
    ).querySelector("a");

    expect(link?.getAttribute("href")).toBe("/about/");
    expect(link?.textContent).toBe("More about Emma");
    expect(link?.classList.contains(`button--${type}`)).toBe(true);
  },
);

test("is primary by default", async () => {
  const link = (
    await render(Button, { href: "/contact/", label: "Contact Us" })
  ).querySelector("a");

  expect(link?.classList.contains("button--primary")).toBe(true);
});

import { render } from "@/test/render";
import { expect, test } from "vitest";
import Callout from "./Callout.astro";

test("with a title, is an aside labelled by it", async () => {
  const aside = (
    await render(Callout, { variant: "warning", title: "If you need help now" })
  ).querySelector("aside")!;
  const title = aside.querySelector(
    `#${aside.getAttribute("aria-labelledby")}`,
  );

  expect(title?.textContent?.trim()).toBe("If you need help now");
});

test("its title is an eyebrow", async () => {
  const aside = (
    await render(Callout, { variant: "info", title: "Fees and practicalities" })
  ).querySelector("aside")!;

  expect(
    aside.querySelector(`#${aside.getAttribute("aria-labelledby")} .eyebrow`),
  ).not.toBeNull();
});

test("without a title, is a plain panel rather than an aside", async () => {
  const body = await render(Callout, { variant: "info" });

  expect(body.querySelector("aside")).toBeNull();
  expect(body.querySelector("div.callout")).not.toBeNull();
});

test.each(["info", "warning"] as const)(
  "the %s variant has its class",
  async (variant) => {
    const callout = (await render(Callout, { variant })).querySelector(
      ".callout",
    )!;

    expect(callout.classList.contains(`callout--${variant}`)).toBe(true);
  },
);

import { render } from "@/test/render";
import { expect, test } from "vitest";
import HelpNowNotice from "./HelpNowNotice.astro";

const aside = (await render(HelpNowNotice)).querySelector("aside")!;

test("is an aside labelled by its eyebrow", () => {
  const label = aside.querySelector(
    `#${aside.getAttribute("aria-labelledby")}`,
  );

  expect(label?.textContent?.trim()).toBe("If you need help now");
  expect(label?.querySelector(".eyebrow")).not.toBeNull();
});

test("says where to get help in an emergency", () => {
  expect(
    aside
      .querySelector("p:not([id])")
      ?.textContent?.replace(/\s+/g, " ")
      .trim(),
  ).toBe(
    "Therapy is not an emergency service. If you need support today, contact your GP, call NHS 111, or call the Samaritans free on 116 123.",
  );
});

test("sits on an amber panel", () => {
  expect(aside.querySelector(".panel--amber")).not.toBeNull();
});

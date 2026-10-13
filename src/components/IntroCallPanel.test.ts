import { render } from "@/test/render";
import { expect, test } from "vitest";
import IntroCallPanel from "./IntroCallPanel.astro";

test("invites a free 15-minute call", async () => {
  const panel = await render(IntroCallPanel);

  expect(panel.querySelector("h2")?.textContent).toBe(
    "Start with a free 15-minute call",
  );
  expect(
    panel.querySelector("p")?.textContent?.replace(/\s+/g, " ").trim(),
  ).toBe(
    "Taking the first step can feel daunting. We offer a free, no-obligation call to discuss your needs, answer questions and explore how we can help.",
  );
});

test("links to the contact page", async () => {
  const link = (await render(IntroCallPanel)).querySelector("a")!;

  expect(link.getAttribute("href")).toBe("/contact/");
  expect(link.textContent).toBe("Book a free call");
});

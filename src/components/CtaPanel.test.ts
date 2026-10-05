import { render } from "@/test/render";
import { expect, test } from "vitest";
import CtaPanel from "./CtaPanel.astro";

test("invites a free 15-minute call", async () => {
  const panel = await render(CtaPanel);

  expect(panel.querySelector("h2")?.textContent).toBe("Start with a free 15-minute call");
  expect(panel.querySelector("p")?.textContent).toBe(
    "A short, no-obligation conversation to ask questions and see whether working together feels right.",
  );
});

test("links to the contact page", async () => {
  const link = (await render(CtaPanel)).querySelector("a")!;

  expect(link.getAttribute("href")).toBe("/contact/");
  expect(link.textContent).toBe("Book a free call");
});

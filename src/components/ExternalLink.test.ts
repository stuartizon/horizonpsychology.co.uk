import { render } from "@/test/render";
import { expect, test } from "vitest";
import ExternalLink from "./ExternalLink.astro";

const link = async () =>
  (
    await render(ExternalLink, {
      href: "https://www.researchgate.net/profile/Emma-Izon",
      label: "ResearchGate",
    })
  ).querySelector("a")!;

test("links to the page, opening it in a new tab", async () => {
  const element = await link();

  expect(element.getAttribute("href")).toBe(
    "https://www.researchgate.net/profile/Emma-Izon",
  );
  expect(element.getAttribute("target")).toBe("_blank");
  expect(element.getAttribute("rel")).toBe("noopener");
});

test("says it opens in a new tab, for screen readers only", async () => {
  const element = await link();

  expect(element.textContent?.replace(/\s+/g, " ").trim()).toBe(
    "ResearchGate (opens in a new tab)",
  );
  expect(element.querySelector(".visually-hidden")?.textContent?.trim()).toBe(
    "(opens in a new tab)",
  );
});

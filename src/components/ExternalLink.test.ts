import { iconPath } from "@/test/icon";
import { render } from "@/test/render";
import arrowIcon from "@phosphor-icons/core/regular/arrow-up-right.svg?raw";
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

test("shows an arrow after the label, hidden from screen readers", async () => {
  const icon = (await link()).querySelector("svg");

  expect(iconPath(icon)).toBe(iconPath(arrowIcon));
  expect(icon?.closest("[aria-hidden]")?.getAttribute("aria-hidden")).toBe(
    "true",
  );
});

test("keeps the arrow on the same line as the label's last word", async () => {
  const element = (
    await render(ExternalLink, {
      href: "https://doi.org/10.1002/cpp.2921",
      label: "A systematic narrative review across cultures.",
    })
  ).querySelector("a")!;
  const end = element.querySelector(".external-link__end");

  expect(end?.textContent?.trim()).toBe("cultures.");
  expect(end?.querySelector("svg")).not.toBeNull();
});

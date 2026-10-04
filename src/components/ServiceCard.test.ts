import { render } from "@/test/render";
import { expect, test } from "vitest";
import ServiceCard from "./ServiceCard.astro";

test("links to the service page", async () => {
  const card = await render(ServiceCard, {
    title: "Couples Therapy",
    description: "Support for couples.",
    href: "/couples-therapy",
    icon: "<svg></svg>",
  });

  expect(card.querySelector("h3")?.textContent).toBe("Couples Therapy");
  const link = card.querySelector("a");
  expect(link?.getAttribute("href")).toBe("/couples-therapy");
  expect(link?.textContent).toContain("Find out more");
});

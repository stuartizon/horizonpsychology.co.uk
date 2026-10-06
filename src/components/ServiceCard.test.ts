import { services } from "@/data/services";
import individualIcon from "@/icons/individual-therapy.svg?raw";
import { iconPath } from "@/test/icon";
import { render } from "@/test/render";
import { expect, test } from "vitest";
import ServiceCard from "./ServiceCard.astro";

const individual = services.find(
  (service) => service.id === "individual-therapy",
)!;

async function renderCard() {
  return (await render(ServiceCard, { service: individual })).querySelector(
    "article",
  )!;
}

test("shows the service's name, summary, and price and session length", async () => {
  const card = await renderCard();

  expect(card.querySelector("h3")?.textContent).toBe("Individual Therapy");
  const text = [...card.querySelectorAll("p")].map((p) => p.textContent);
  expect(text).toEqual([individual.summary, "£100 · 50 minutes"]);
});

test("shows the service's icon", async () => {
  const card = await renderCard();

  expect(iconPath(card.querySelector("svg"))).toBe(iconPath(individualIcon));
});

test("links to the service page with Find out more", async () => {
  const link = (await renderCard()).querySelector("a")!;

  expect(link.getAttribute("href")).toBe("/individual-therapy/");
  expect(link.textContent?.replace(/\s+/g, " ")).toMatch(/^Find out more/);
  expect(link.querySelector('[aria-hidden="true"]')?.textContent).toBe("→");
});

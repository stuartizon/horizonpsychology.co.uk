import { services } from "@/data/services";
import { render } from "@/test/render";
import { expect, test } from "vitest";
import FeesPanel from "./FeesPanel.astro";

const couples = services.find((service) => service.id === "couples-therapy")!;

async function renderPanel() {
  return (await render(FeesPanel, { service: couples })).querySelector(".fees-panel")!;
}

test("shows the price and session length", async () => {
  const panel = await renderPanel();

  expect(panel.querySelector("h2")?.textContent).toBe("Fees and practicalities");
  expect(panel.querySelector(".fees-panel__price")?.textContent?.replace(/\s+/g, " ").trim()).toBe(
    "£120 per 60-minute session",
  );
});

test("lists the service's practicalities", async () => {
  const items = [...(await renderPanel()).querySelectorAll("li")].map((item) => item.textContent?.trim());

  expect(items).toEqual(couples.practical);
});

test("links to the contact form with the service as its topic", async () => {
  const link = (await renderPanel()).querySelector("a")!;

  expect(link.getAttribute("href")).toBe("/contact/?topic=couples-therapy");
  expect(link.textContent).toBe("Get in touch");
});

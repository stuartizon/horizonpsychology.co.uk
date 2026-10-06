import { services } from "@/data/services";
import { render } from "@/test/render";
import { expect, test } from "vitest";
import FeesPanel from "./FeesPanel.astro";

const couples = services.find((service) => service.id === "couples-therapy")!;

async function renderPanel() {
  return (await render(FeesPanel, { service: couples })).querySelector(
    "aside",
  )!;
}

test("is labelled by its eyebrow", async () => {
  const panel = await renderPanel();
  const label = panel.querySelector(
    `#${panel.getAttribute("aria-labelledby")}`,
  );

  expect(label?.textContent?.trim()).toBe("Fees and practicalities");
  expect(label?.querySelector(".eyebrow")).not.toBeNull();
});

test("shows the price and session length", async () => {
  const text = [...(await renderPanel()).querySelectorAll("p")].map((p) =>
    p.textContent?.trim(),
  );

  expect(text).toEqual([
    "Fees and practicalities",
    "£120",
    "60-minute session",
  ]);
});

test("lists the service's practicalities", async () => {
  const items = [
    ...(await renderPanel()).querySelectorAll("li > span:not([aria-hidden])"),
  ].map((item) => item.textContent);

  expect(items).toEqual(couples.practical);
});

test("links to the contact form with the service as its topic", async () => {
  const link = (await renderPanel()).querySelector("a")!;

  expect(link.getAttribute("href")).toBe("/contact/?topic=couples-therapy");
  expect(link.textContent).toBe("Schedule");
});

import { render } from "@/test/render";
import { expect, test } from "vitest";
import SectionHeading from "./SectionHeading.astro";

test("shows the eyebrow above an h2 by default", async () => {
  const heading = (await render(SectionHeading, { eyebrow: "Services", title: "Four ways of working together" }))
    .firstElementChild!;

  expect(heading.querySelector(".eyebrow")?.textContent).toBe("Services");
  expect(heading.querySelector("h2")?.textContent).toBe("Four ways of working together");
  expect(heading.querySelector("h1")).toBeNull();
});

test("uses an h1 when asked", async () => {
  const heading = (await render(SectionHeading, { eyebrow: "Research", title: "Published work", as: "h1" }))
    .firstElementChild!;

  expect(heading.querySelector("h1")?.textContent).toBe("Published work");
  expect(heading.querySelector("h2")).toBeNull();
});

test("shows the lead only when given", async () => {
  const withLead = await render(SectionHeading, {
    eyebrow: "Research",
    title: "Published work",
    lead: "Dr Izon publishes in peer-reviewed journals.",
  });
  const withoutLead = await render(SectionHeading, { eyebrow: "Research", title: "Published work" });

  expect(withLead.querySelector("p")?.textContent).toBe("Dr Izon publishes in peer-reviewed journals.");
  expect(withoutLead.querySelector("p")).toBeNull();
});

test("sets the lead's maximum width when given", async () => {
  const heading = await render(SectionHeading, {
    eyebrow: "Services",
    title: "Four ways of working together",
    lead: "Every service begins with a free 15-minute call.",
    leadMaxWidth: "none",
  });

  expect(heading.querySelector("p")?.getAttribute("style")).toMatch(/max-width:\s*none/);
});

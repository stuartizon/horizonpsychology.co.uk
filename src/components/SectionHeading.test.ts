import { render } from "@/test/render";
import { expect, test } from "vitest";
import SectionHeading from "./SectionHeading.astro";

test("groups the eyebrow with an h2 by default", async () => {
  const group = (await render(SectionHeading, { eyebrow: "Services", title: "Four ways of working together" }))
    .firstElementChild!;

  expect(group.tagName).toBe("HGROUP");
  expect([...group.children].map((child) => child.tagName)).toEqual(["P", "H2"]);
  expect(group.querySelector("p .eyebrow")?.textContent).toBe("Services");
  expect(group.querySelector("h2")?.textContent).toBe("Four ways of working together");
});

test("uses an h1 when asked", async () => {
  const group = (await render(SectionHeading, { eyebrow: "Research", title: "Published work", level: "h1" }))
    .firstElementChild!;

  expect(group.querySelector("h1")?.textContent).toBe("Published work");
  expect(group.querySelector("h2")).toBeNull();
});

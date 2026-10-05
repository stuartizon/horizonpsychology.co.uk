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

test("gives the heading an id when asked, so a section can be labelled by it", async () => {
  const group = (await render(SectionHeading, { eyebrow: "Questions", title: "Before you get in touch", id: "questions" }))
    .firstElementChild!;

  expect(group.querySelector("h2")?.id).toBe("questions");
});

test("leaves out the eyebrow when there isn't one", async () => {
  const group = (await render(SectionHeading, { title: "Before you begin" })).firstElementChild!;

  expect([...group.children].map((child) => child.tagName)).toEqual(["H2"]);
  expect(group.querySelector(".eyebrow")).toBeNull();
});

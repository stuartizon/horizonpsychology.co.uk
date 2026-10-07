import { expect, test } from "vitest";
import { publications } from "./publications";

test("publications are listed newest first", () => {
  const years = publications.map(({ year }) => year);

  expect(years).toEqual(years.toSorted((a, b) => b - a));
});

test("every publication links to its DOI", () => {
  for (const { title, href } of publications) {
    expect(href, title).toMatch(/^https:\/\/doi\.org\/10\.\d+\//);
  }
});

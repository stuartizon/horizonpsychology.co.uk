import { expect, test } from "vitest";
import { publications } from "./publications";

test("publications are listed newest first", () => {
  const years = publications.map(({ year }) => year);

  expect(years).toEqual(years.toSorted((a, b) => b - a));
});

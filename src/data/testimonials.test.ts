import { expect, test } from "vitest";
import { testimonials } from "./testimonials";

// The carousel is as tall as the longest testimonial, so one long quote makes
// it too tall on a phone. A longer testimonial is quoted as an excerpt.
test("every testimonial is at most 500 characters", () => {
  const long = testimonials
    .filter(({ quote }) => quote.length > 500)
    .map(({ name }) => name);

  expect(long).toEqual([]);
});

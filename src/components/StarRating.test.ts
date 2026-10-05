import { iconPath } from "@/test/icon";
import { render } from "@/test/render";
import starIcon from "@phosphor-icons/core/fill/star-fill.svg?raw";
import { expect, test } from "vitest";
import StarRating from "./StarRating.astro";

test("shows five filled Phosphor stars", async () => {
  const rating = (await render(StarRating)).querySelector('[role="img"]')!;

  expect(rating.getAttribute("aria-label")).toBe("5 out of 5 stars");
  const stars = [...rating.querySelectorAll("svg")].map((svg) => iconPath(svg));
  expect(stars).toEqual(Array(5).fill(iconPath(starIcon)));
});

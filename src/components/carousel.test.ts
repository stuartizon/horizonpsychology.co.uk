import { expect, test } from "vitest";
import { dragAxis, slideAfterSwipe, wrap } from "./carousel";

test("an index within the slides stays as it is", () => {
  expect([0, 1, 2].map((index) => wrap(index, 3))).toEqual([0, 1, 2]);
});

test("moving past the last slide goes round to the first, and back from the first to the last", () => {
  expect(wrap(3, 3)).toBe(0);
  expect(wrap(-1, 3)).toBe(2);
});

test("a drag of a few pixels doesn't yet say which way it's going", () => {
  expect(dragAxis(3, 0)).toBeUndefined();
  expect(dragAxis(-2, 3)).toBeUndefined();
});

test("a drag further across than down is a swipe, and further down than across is a scroll", () => {
  expect(dragAxis(-12, 5)).toBe("x");
  expect(dragAxis(8, 0)).toBe("x");
  expect(dragAxis(5, 12)).toBe("y");
  expect(dragAxis(-6, -6)).toBe("y");
});

test("a swipe left of more than a fifth of the width shows the next slide, and right the previous", () => {
  expect(slideAfterSwipe(1, 4, -81, 400)).toBe(2);
  expect(slideAfterSwipe(1, 4, 81, 400)).toBe(0);
});

test("a shorter swipe stays on the same slide", () => {
  expect(slideAfterSwipe(1, 4, -80, 400)).toBe(1);
  expect(slideAfterSwipe(1, 4, 40, 400)).toBe(1);
});

test("a swipe goes round from either end", () => {
  expect(slideAfterSwipe(3, 4, -200, 400)).toBe(0);
  expect(slideAfterSwipe(0, 4, 200, 400)).toBe(3);
});

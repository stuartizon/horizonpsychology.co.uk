import { iconPath } from "@/test/icon";
import { render } from "@/test/render";
import caretLeft from "@phosphor-icons/core/regular/caret-left.svg?raw";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg?raw";
import { expect, test } from "vitest";
import TestimonialCarousel from "./TestimonialCarousel.astro";

const testimonials = [
  { quote: "A safe space to talk.", name: "Sophie" },
  { quote: "Helpful and down to earth.", name: "Tom" },
  { quote: "I learnt so much.", name: "Laura" },
];

test("is a carousel named for its testimonials", async () => {
  const carousel = (await render(TestimonialCarousel, { testimonials })).firstElementChild!;

  expect(carousel.getAttribute("role")).toBe("group");
  expect(carousel.getAttribute("aria-roledescription")).toBe("carousel");
  expect(carousel.getAttribute("aria-label")).toBe("Testimonials");
});

test("shows each testimonial as a slide, with its quote, stars and name", async () => {
  const carousel = await render(TestimonialCarousel, { testimonials });
  const slides = [...carousel.querySelectorAll("figure")];

  const text = (slide: Element, selector: string) => slide.querySelector(selector)?.textContent?.trim();
  expect(slides.map((slide) => [text(slide, "blockquote"), text(slide, "figcaption")])).toEqual([
    ["“A safe space to talk.”", "Sophie"],
    ["“Helpful and down to earth.”", "Tom"],
    ["“I learnt so much.”", "Laura"],
  ]);
  for (const slide of slides) {
    expect(slide.getAttribute("aria-roledescription")).toBe("slide");
    expect(slide.querySelector('figcaption [role="img"]')?.getAttribute("aria-label")).toBe("5 out of 5 stars");
  }
  expect(slides.map((slide) => slide.getAttribute("aria-label"))).toEqual(["1 of 3", "2 of 3", "3 of 3"]);
});

test("starts on the first testimonial, with the others hidden and inert", async () => {
  const slides = [...(await render(TestimonialCarousel, { testimonials })).querySelectorAll("figure")];

  expect(slides.map((slide) => slide.getAttribute("aria-hidden"))).toEqual([null, "true", "true"]);
  expect(slides.map((slide) => slide.hasAttribute("inert"))).toEqual([false, true, true]);
});

test("doesn't announce changes while it moves on by itself", async () => {
  const carousel = await render(TestimonialCarousel, { testimonials });

  expect(carousel.querySelector("figure")?.parentElement?.getAttribute("aria-live")).toBe("off");
});

test("has previous and next buttons, each with a Phosphor caret hidden from screen readers", async () => {
  const carousel = await render(TestimonialCarousel, { testimonials });

  for (const [name, icon] of [
    ["Previous testimonial", caretLeft],
    ["Next testimonial", caretRight],
  ]) {
    const button = [...carousel.querySelectorAll("button")].find((button) => button.getAttribute("aria-label") === name);
    expect(button?.getAttribute("type")).toBe("button");
    expect(button?.querySelector("[aria-hidden='true'] svg")).not.toBeNull();
    expect(iconPath(button?.querySelector("svg"))).toBe(iconPath(icon));
  }
});

test("has a button for each testimonial, with the first marked current", async () => {
  const carousel = await render(TestimonialCarousel, { testimonials });
  const group = carousel.querySelector('[role="group"][aria-label="Choose a testimonial"]');
  const dots = [...group!.querySelectorAll("button")];

  expect(dots.map((dot) => dot.getAttribute("aria-label"))).toEqual([
    "Testimonial 1 of 3",
    "Testimonial 2 of 3",
    "Testimonial 3 of 3",
  ]);
  expect(dots.map((dot) => dot.getAttribute("aria-current"))).toEqual(["true", null, null]);
});

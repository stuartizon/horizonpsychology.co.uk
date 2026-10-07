import { render } from "@/test/render";
import { expect, test } from "vitest";
import Panel from "./Panel.astro";

test.each(["white", "sage", "amber"] as const)(
  "the %s variant has its class",
  async (variant) => {
    const panel = (await render(Panel, { variant })).querySelector(".panel")!;

    expect(panel.tagName).toBe("DIV");
    expect(panel.classList.contains(`panel--${variant}`)).toBe(true);
  },
);

test("renders what it's given inside it", async () => {
  const panel = (
    await render(Panel, { variant: "sage" }, { default: "<p>Inside</p>" })
  ).querySelector(".panel")!;

  expect(panel.querySelector("p")?.textContent).toBe("Inside");
});

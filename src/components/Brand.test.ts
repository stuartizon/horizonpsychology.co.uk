import { readFileSync } from "node:fs";
import { render } from "@/test/render";
import { expect, test } from "vitest";
import Brand from "./Brand.astro";
import Navbar from "./Navbar.astro";

test("the logo links home and is the HORIZON wordmark, drawn inline", async () => {
  const link = (await render(Brand)).querySelector("a")!;

  expect(link.getAttribute("href")).toBe("/");
  expect(link.getAttribute("aria-label")).toBe("Horizon Psychology, home");
  expect(link.querySelector("img")).toBeNull();
  expect(link.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
});

test("each logo on a page uses its own gradient", async () => {
  const body = await render(Navbar);
  const logos = [...body.querySelectorAll('a[aria-label="Horizon Psychology, home"] svg')];
  expect(logos).toHaveLength(2);

  const ids = logos.flatMap((svg) => [...svg.querySelectorAll("[id]")].map((element) => element.id));
  expect(new Set(ids).size).toBe(ids.length);
  for (const svg of logos) {
    for (const [, id] of svg.outerHTML.matchAll(/url\(#([^)]+)\)/g)) {
      expect(svg.querySelector(`#${id}`), id).not.toBeNull();
    }
  }
});

test("the favicon is the sun mark", () => {
  const favicon = readFileSync("public/favicon.svg", "utf8");

  expect(favicon).toContain('d="M11.93 31.1A14 14 0 1 1 36.07 31.1Z"');
  expect(favicon).toContain("#f5b25a");
});

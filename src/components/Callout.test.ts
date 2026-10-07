import { render } from "@/test/render";
import { expect, test } from "vitest";
import Callout from "./Callout.astro";

test("is an aside labelled by its title", async () => {
  const aside = (
    await render(Callout, { title: "If you need help now" })
  ).querySelector("aside")!;
  const title = aside.querySelector(
    `#${aside.getAttribute("aria-labelledby")}`,
  );

  expect(title?.textContent?.trim()).toBe("If you need help now");
});

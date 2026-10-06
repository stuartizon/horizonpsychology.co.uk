import { render } from "@/test/render";
import { expect, test } from "vitest";
import QuoteBand from "./QuoteBand.astro";

const quote = "A space for support, understanding, and change.";

test("shows the quote in a blockquote", async () => {
  const band = await render(QuoteBand, { quote });

  expect(band.querySelector("blockquote")?.textContent?.trim()).toBe(
    `“${quote}”`,
  );
});

test("credits the quote when given who said it", async () => {
  const band = await render(QuoteBand, { quote, cite: "Dr Emma Izon" });

  expect(band.querySelector("figure figcaption")?.textContent?.trim()).toBe(
    "Dr Emma Izon",
  );
});

test("has no caption without a credit", async () => {
  const band = await render(QuoteBand, { quote });

  expect(band.querySelector("figcaption")).toBeNull();
});

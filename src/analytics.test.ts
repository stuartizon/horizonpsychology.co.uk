import { describe, expect, test } from "vitest";
import { countsVisits } from "./analytics";

describe("countsVisits", () => {
  test("counts visits to the live site", () => {
    expect(countsVisits("horizonpsychology.co.uk")).toBe(true);
  });

  test.each([
    "analytics-opt-out.horizonpsychology.pages.dev",
    "f3a9c2e1.horizonpsychology.pages.dev",
    "horizonpsychology.pages.dev",
    "www.horizonpsychology.co.uk",
    "horizonpsychology.co.uk.example.com",
    "127.0.0.1",
    "localhost",
  ])(
    "doesn't count visits to a preview, another address or a local build, at %s",
    (hostname) => {
      expect(countsVisits(hostname)).toBe(false);
    },
  );
});

import { describe, expect, test } from "vitest";
import { countsVisits } from "./analytics";

describe("countsVisits", () => {
  test.each([
    "horizonpsychology.co.uk",
    "www.horizonpsychology.co.uk",
    "horizonpsychology.pages.dev",
    "127.0.0.1",
    "localhost",
  ])(
    "doesn't count visits to the live site or a local build, at %s",
    (hostname) => {
      expect(countsVisits(hostname)).toBe(false);
    },
  );

  test.each([
    "analytics-opt-out.horizonpsychology.pages.dev",
    "f3a9c2e1.horizonpsychology.pages.dev",
  ])(
    "counts visits to a preview, at %s, until the privacy policy describes the analytics",
    (hostname) => {
      expect(countsVisits(hostname)).toBe(true);
    },
  );
});

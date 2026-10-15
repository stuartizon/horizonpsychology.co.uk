import { describe, expect, test } from "vitest";
import { countsVisits } from "./analytics";

describe("countsVisits", () => {
  test.each([
    "horizonpsychology.co.uk",
    "www.horizonpsychology.co.uk",
    "horizonpsychology.pages.dev",
  ])(
    "doesn't count visits to the live site, at %s, until the privacy policy describes it",
    (hostname) => {
      expect(countsVisits(hostname)).toBe(false);
    },
  );

  test.each(["analytics-opt-out.horizonpsychology.pages.dev", "127.0.0.1"])(
    "counts visits to a preview or test build, at %s",
    (hostname) => {
      expect(countsVisits(hostname)).toBe(true);
    },
  );
});

import { expect, test } from "vitest";
import { ANALYTICS_DOMAINS } from "@/consts";

test("doesn't count visits to the live site until the privacy policy describes it", () => {
  expect(ANALYTICS_DOMAINS).toEqual([
    "analytics-trial.horizonpsychology.pages.dev",
  ]);
});

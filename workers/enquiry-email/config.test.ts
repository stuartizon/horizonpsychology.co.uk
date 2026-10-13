import { unstable_readConfig } from "wrangler";
import { expect, test } from "vitest";
import { CONTACT_EMAIL } from "@/consts";

// An enquiry from the form arrives addressed the same way as an email sent to
// the address on the site.
test("production enquiries are addressed to the site's contact email", () => {
  const { vars } = unstable_readConfig({
    config: "workers/enquiry-email/wrangler.jsonc",
  });
  expect(vars.ADDRESSED_TO).toBe(CONTACT_EMAIL);
});

// A failed send is kept in Workers Logs and raised as an Issue, which alerts
// Stuart (ADR 0021). A deploy turns these off unless the config has them.
test.each([
  ["production", undefined],
  ["preview", "preview"],
])("the %s Worker keeps its logs and raises Issues", (_, env) => {
  const { observability } = unstable_readConfig({
    config: "workers/enquiry-email/wrangler.jsonc",
    env,
  });
  expect(observability?.enabled).toBe(true);
  expect(observability?.issues?.enabled).toBe(true);
});

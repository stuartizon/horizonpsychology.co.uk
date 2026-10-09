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

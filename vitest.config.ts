/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    projects: [
      { extends: true, test: { name: "components", include: ["src/**/*.test.ts"] } },
      {
        extends: true,
        test: { name: "site", include: ["site-tests/**/*.test.ts"], globalSetup: "site-tests/build.ts" },
      },
    ],
  },
});

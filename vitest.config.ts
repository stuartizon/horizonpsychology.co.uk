/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    projects: [
      {
        // Workers import the runtime's `cloudflare:email`, which a stub
        // stands in for.
        resolve: {
          alias: { "cloudflare:email": "/src/test/cloudflare-email.ts" },
        },
        test: {
          name: "unit",
          include: [
            "src/**/*.test.ts",
            "workers/**/*.test.ts",
            "functions/**/*.test.ts",
          ],
        },
      },
      {
        test: {
          name: "pages",
          include: ["tests/pages/**/*.test.ts"],
          globalSetup: "tests/pages/build.ts",
        },
      },
    ],
  },
});

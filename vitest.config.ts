/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    projects: [
      { extends: true, test: { name: "unit", include: ["src/**/*.test.ts"] } },
      {
        extends: true,
        test: { name: "pages", include: ["page-tests/**/*.test.ts"], globalSetup: "page-tests/build.ts" },
      },
    ],
  },
});

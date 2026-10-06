/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    projects: [
      { extends: true, test: { name: "unit", include: ["src/**/*.test.ts"] } },
      {
        extends: true,
        test: {
          name: "pages",
          include: ["tests/pages/**/*.test.ts"],
          globalSetup: "tests/pages/build.ts",
        },
      },
    ],
  },
});

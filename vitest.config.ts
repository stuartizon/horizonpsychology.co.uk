/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    projects: [
      { test: { name: "unit", include: ["src/**/*.test.ts"] } },
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

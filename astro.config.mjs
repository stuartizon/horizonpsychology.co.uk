import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://horizonpsychology.co.uk",
  // Lossless whitespace handling, which Prettier's astroCompressHTML setting matches (ADR 0019).
  // Astro 7's default, "jsx", drops the spaces between elements on separate lines.
  compressHTML: true,
  integrations: [sitemap()],
});

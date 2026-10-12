import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import externalLinks from "./src/markdown/externalLinks";

export default defineConfig({
  site: "https://horizonpsychology.co.uk",
  integrations: [sitemap()],
  markdown: { processor: satteri({ hastPlugins: [externalLinks] }) },
});

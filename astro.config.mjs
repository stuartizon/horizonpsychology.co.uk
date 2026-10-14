import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import externalLinks from "./src/markdown/externalLinks";

export default defineConfig({
  site: "https://horizonpsychology.co.uk",
  integrations: [
    sitemap({
      // Pages only reached by sending the contact form without JavaScript.
      filter: (page) => !/\/contact\/(not-)?sent\/$/.test(page),
    }),
  ],
  markdown: { processor: satteri({ hastPlugins: [externalLinks] }) },
});

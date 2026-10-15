import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import externalLinks from "./src/markdown/externalLinks";

const site = "https://horizonpsychology.co.uk";

/** Pages only reached by sending the contact form without JavaScript. */
const notInSitemap = ["/contact/sent/", "/contact/not-sent/"].map(
  (path) => new URL(path, site).href,
);

export default defineConfig({
  site,
  integrations: [sitemap({ filter: (page) => !notInSitemap.includes(page) })],
  markdown: { processor: satteri({ hastPlugins: [externalLinks] }) },
});

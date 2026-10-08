import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** The legal and practical pages, each named by its path, such as `confidentiality`. */
const legal = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/content/legal" }),
  schema: z.object({
    title: z.string(),
    /** The opening paragraph, also used as the page's description. */
    lead: z.string(),
    /** True until Dr Izon has signed off the wording. */
    draft: z.boolean(),
  }),
});

export const collections = { legal };

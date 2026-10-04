# 0002. Build the site with Astro as a static site

Date: 2026-05-11

## Context

The site is a small marketing site for a private psychology practice: a handful of mostly static pages, a few small interactive elements, and good performance and SEO as priorities. It needs to be cheap and simple to host and maintain.

## Decision

Use [Astro](https://astro.build) (currently v5) with its default static output, TypeScript in strict mode (`astro/tsconfigs/strict`), and Node 22 or later. Pages are `.astro` files in `src/pages/`. Repeated pages such as the four service pages use dynamic routes with `getStaticPaths`.

## Consequences

- Pages are pre-rendered HTML with no JavaScript by default, which is fast and easy to host on any static host or CDN.
- `astro check` gives type checking across `.astro` files and runs as part of `npm run build`.
- Anything that needs a server, such as sending contact form email, needs either a third-party service or an opt-in server route (see [0012](0012-contact-form-email-delivery.md)).

# 0009. Testing tooling

- **Status:** Proposed
- **Date:** 2026-10-04

## Context

TDD ([0008](0008-test-driven-development.md)) needs a test runner. There are no tests or CI in the repo yet. The things worth testing are how Astro components render (correct markup, links and content from data), client-side behaviour (menus, accordions, carousel, form validation) and accessibility.

## Decision (proposed)

- **Vitest**, configured with Astro's `getViteConfig`, for unit and component tests. Components are rendered to HTML with Astro's **Container API** and assertions are made on the output. Plain TypeScript (data helpers, content schemas) is tested directly.
- **Playwright** for browser tests against `astro preview`: navigation, keyboard interaction, the mobile menu, the contact form, and accessibility checks with `@axe-core/playwright`.
- A **GitHub Actions** workflow on every PR runs `npm run check`, the tests and `npm run build`.

## Consequences

- Fast component tests plus a smaller number of slower end-to-end tests.
- The Astro Container API is still marked experimental, so it may need updating on Astro upgrades.
- To be confirmed and set to Accepted once the tooling is in place.

# 0011. Test with Vitest, Playwright and axe, run in GitHub Actions

Date: 2026-10-04

Superseded by [0013](0013-test-in-chromium-and-webkit-at-desktop-and-phone-sizes.md).

## Context

We work test-first ([0007](0007-test-driven-development.md)), so the redesign needs test tooling before it starts. Most of the site is static Astro components, plus a few interactive ones (menu, dropdown, accordion, carousel) and accessibility requirements that are easy to break without noticing.

## Decision

- **Component tests** use [Vitest](https://vitest.dev), configured with Astro's `getViteConfig` so tests resolve the `@/` alias and import `.astro` files. Components render with Astro's Container API, and `src/test/render.ts` parses the output with [linkedom](https://github.com/WebReflection/linkedom) so tests query the DOM instead of matching strings. Tests sit next to the component as `*.test.ts` and run with `npm test`.
- **Browser and accessibility tests** use [Playwright](https://playwright.dev) in Chromium against a fresh `astro build` and `astro preview`, with [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm) for accessibility checks. They live in `e2e/` and run with `npm run test:e2e`. Interactive behaviour (keyboard, focus, scripts) is tested here, because the Container API doesn't run client-side scripts.
- **CI** is a GitHub Actions workflow on every pull request and push to `main`. It runs `npm run build` (which includes `astro check`), `npm test` and `npm run test:e2e`.
- A test for a known problem that isn't fixed yet is marked `test.fail()` with the issue number, so CI stays green and the test fails once the problem is fixed, as a reminder to remove the marker.

## Alternatives considered

- **Testing Library with a full DOM environment (jsdom or happy-dom).** It's more than static rendered HTML needs, and Playwright covers anything that needs a real browser.
- **Testing every browser engine in Playwright.** Chromium only keeps CI fast. Firefox and WebKit can be added if a browser-specific bug turns up.

## Consequences

- New behaviour can be built test-first with fast component tests, and accessibility is checked automatically.
- Running `npm run test:e2e` locally needs the Chromium build once: `npx playwright install chromium`.
- CI checks can become required on `main` once the repo is public (#25).

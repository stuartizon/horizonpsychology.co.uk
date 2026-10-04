# 0013. Test with Vitest, and with Playwright and axe in Chromium and WebKit at desktop and phone sizes

Date: 2026-10-04

Supersedes [0011](0011-vitest-and-playwright-for-tests.md).

## Context

[0011](0011-vitest-and-playwright-for-tests.md) set up Vitest for components and Playwright with axe for the browser, running in Chromium only at a desktop size. The redesign's layout shell (#2) brings a header that collapses into a mobile menu, and the site must work from 320px wide. Many visitors will arrive on an iPhone, where every browser uses WebKit, so a desktop Chromium run alone can miss both layout problems at narrow widths and Safari-specific behaviour.

## Decision

- **Component tests** use [Vitest](https://vitest.dev), configured with Astro's `getViteConfig` so tests resolve the `@/` alias and import `.astro` files. Components render with Astro's Container API, and `src/test/render.ts` parses the output with [linkedom](https://github.com/WebReflection/linkedom) so tests query the DOM instead of matching strings. Tests sit next to the component as `*.test.ts` and run with `npm test`.
- **Browser and accessibility tests** use [Playwright](https://playwright.dev) against a fresh `astro build` and `astro preview`, with [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm) for accessibility checks. They live in `e2e/` and run with `npm run test:e2e`. Interactive behaviour (keyboard, focus, scripts) is tested here, because the Container API doesn't run client-side scripts.
- Every browser test runs in four Playwright projects: Chromium and WebKit, each at a desktop size and at a 320px phone size (Playwright's iPhone SE device). A test that only makes sense at one size skips the other with `test.skip()` and a reason.
- Keyboard tests move focus with `pressTab()` from `e2e/keyboard.ts`, which presses Option+Tab in WebKit, as Safari only tabs to links that way by default.
- **CI** is a GitHub Actions workflow on every pull request and push to `main`. It runs `npm run build` (which includes `astro check`), `npm test` and `npm run test:e2e`.
- A test for a known problem that isn't fixed yet is marked `test.fail()` with the issue number, so CI stays green and the test fails once the problem is fixed, as a reminder to remove the marker.

## Alternatives considered

- **Testing Library with a full DOM environment (jsdom or happy-dom).** It's more than static rendered HTML needs, and Playwright covers anything that needs a real browser.

## Consequences

- Layout and keyboard behaviour are checked at the narrowest supported width and in the engine iPhones use, as well as on desktop.
- The browser suite runs four times over, so it takes longer locally and in CI.
- Running `npm run test:e2e` locally needs both browsers once: `npx playwright install chromium webkit`.
- Firefox isn't tested. It can be added as another project if a Firefox-specific bug turns up.
- CI checks can become required on `main` once the repo is public (#25).

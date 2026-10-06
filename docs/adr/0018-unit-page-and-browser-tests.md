# 0018. Test with unit, page and browser tests, keeping the browser for what needs one

Date: 2026-10-06

Supersedes [0013](0013-test-in-chromium-and-webkit-at-desktop-and-phone-sizes.md).

## Context

[0013](0013-test-in-chromium-and-webkit-at-desktop-and-phone-sizes.md) set up component tests in Vitest and browser tests in Playwright, with every browser test running four times: in Chromium and WebKit, at desktop and phone sizes. Whole pages weren't covered by component tests, so every check on a page went in the browser suite. That included checks that only read the HTML: a page's content, that its links open pages, and the sitemap. These made up about a quarter of the browser tests, and four browser runs added nothing to them.

The Astro Container API can't render whole pages, because it can't set `Astro.site`, which the layout needs for the canonical URL.

## Decision

There are three kinds of automated test. Each check goes in the fastest one that can make it.

- **Unit tests** (`npm run test:unit`) use [Vitest](https://vitest.dev), configured with Astro's `getViteConfig` so tests resolve the `@/` alias and import `.astro` files. Components render with Astro's Container API, and `src/test/render.ts` parses the output with [linkedom](https://github.com/WebReflection/linkedom) so tests query the DOM instead of matching strings. They sit next to the component as `*.test.ts`. Use them for a component's rendered output, for the typed content in `src/data/`, and for checks over source files such as the breakpoints test.
- **Page tests** (`npm run test:pages`) are a second Vitest project that reads the built site in `dist/`, parsing each page with linkedom. They live in `page-tests/`. Locally the project builds the site before it runs, so a stale `dist/` is never tested; in CI it reads the build that gets deployed. Use them for anything that's in the built files: a page's content, its links, images and metadata, and the sitemap and `robots.txt`. One test checks that every internal link on every page opens a built page.
- **Browser tests** (`npm run test:e2e`) use [Playwright](https://playwright.dev) against `astro preview`, with [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm) for accessibility checks. They live in `e2e/`. Use them only for what needs a browser: layout and computed styles, scripts, keyboard and focus, and axe.
- Every browser test runs in four Playwright projects: Chromium and WebKit, each at a desktop size and at a 320px phone size (Playwright's iPhone SE device). A test that only makes sense at one size skips the other with `test.skip()` and a reason.
- Keyboard tests move focus with `pressTab()` from `e2e/keyboard.ts`, which presses Option+Tab in WebKit, as Safari only tabs to links that way by default.
- **CI** is a GitHub Actions workflow on every pull request and push to `main`. It runs `npm run check`, the unit tests, and the page and browser tests against one uploaded build. Locally, `npm test` runs all three kinds of test.
- A test for a known problem that isn't fixed yet is marked `test.fail()` (Playwright) or `test.fails` (Vitest) with the issue number, so CI stays green and the test fails once the problem is fixed, as a reminder to remove the marker.

## Alternatives considered

- **Rendering whole pages with the Astro Container API.** It can't set `Astro.site`, and the built HTML is what gets deployed anyway.
- **Testing Library with a full DOM environment (jsdom or happy-dom).** It's more than static HTML needs, and Playwright covers anything that needs a real browser.

## Consequences

- Content and link checks run in milliseconds, once, instead of in four browser runs.
- A new page's links are checked without writing a test for them.
- Layout and keyboard behaviour are still checked at the narrowest supported width and in the engine iPhones use, as well as on desktop. Those remain most of the browser suite, because on a static site most of the risk is in the CSS.
- `npm run test:pages` builds the site first, so it takes a few seconds rather than being instant.
- Running `npm run test:e2e` locally needs both browsers once: `npx playwright install chromium webkit`.
- Firefox isn't tested. It can be added as another project if a Firefox-specific bug turns up.

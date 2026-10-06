# CLAUDE.md

Guidance for Claude working in this repository. The README and CONTRIBUTING.md, imported below, cover the project, setup, structure, testing and how we work. Follow them as written. This file adds what they don't say.

@README.md

@CONTRIBUTING.md

## Code conventions

- Styling is plain CSS ([ADR 0012](docs/adr/0012-small-global-token-set-and-component-owned-styles.md)). `src/styles/global.css` holds only the colour palette (hex), shared scales (type, spacing, radii, shadows, motion) and base element styles. Don't add role aliases like `--color-eyebrow`.
- Build small components even for simple elements (eyebrow, button, section heading), with their styles in the component's scoped `<style>`. Components use palette colours and scale tokens directly; never a hex value outside the palette, which a test checks. A value only one component needs is defined in that component, not added to `global.css`.
- Media queries are mobile-first and use only the two breakpoints, `(min-width: 48rem)` for tablet and `(min-width: 64rem)` for desktop ([ADR 0014](docs/adr/0014-two-site-wide-breakpoints-in-rem.md)). A test fails on any other width.
- Interactive behaviour (menu, carousel, accordion) is small vanilla TypeScript in a component's `<script>`. Don't add a UI framework without an ADR.
- The site is hosted on Cloudflare Pages and stays fully static, with no Astro adapter ([ADR 0015](docs/adr/0015-host-on-cloudflare-pages-deployed-from-github-actions.md)). A server-side feature means a Pages Function and a new ADR.

## Test-driven development: red, green, refactor

1. **Red**: write a failing test that describes the behaviour. Run it and see it fail for the expected reason. **Commit the failing test on its own** with ✅ (e.g. `✅ Add failing test for service card price line`).
2. **Green**: write the simplest implementation that makes the test pass. Commit.
3. **Refactor**: tidy the code and tests with the suite green. Commit.

The test-first commit is part of the history on the branch, so reviewers can see the test existed before the implementation. CI on the PR must be green, not each intermediate commit.

Pure visual styling with no testable behaviour (e.g. adjusting a token value) doesn't need a contrived test. Say so in the PR description and include before/after screenshots instead.

Where tests go ([ADR 0018](docs/adr/0018-unit-page-and-browser-tests.md)). Put each check in the fastest kind of test that can make it:

- **Unit tests** (`npm run test:unit`): `Component.test.ts` next to the component. Render it with `render()` from `@/test/render` and query the returned DOM. Use these for rendered output: content, links, attributes, ARIA.
- **Page tests** (`npm run test:pages`): `tests/pages/*.test.ts`. Read a built page with `page()` from `tests/pages/pages.ts` and query its DOM. Use these for what's on a page: content, images, metadata and the sitemap. Don't write a test that a link opens a page: `links.test.ts` checks every internal link on every page.
- **Browser tests** (`npm run test:browser`): `tests/browser/*.spec.ts`. Use these only for what needs a browser: scripts, keyboard and focus, responsive layout and computed styles, and axe accessibility checks. Each runs in Chromium and WebKit at desktop and 320px phone sizes; skip a size a test doesn't apply to with `test.skip(isMobile, reason)`. Move focus with `pressTab()` from `tests/browser/keyboard.ts`, not `keyboard.press("Tab")`, so links are reachable in WebKit.
- A test for a known bug that won't be fixed in the current PR is marked `test.fail()` (or `test.fails` in Vitest) with a comment linking the issue. Remove the marker in the PR that fixes it.

Run `npm run build` and `npm test`, which runs all three kinds of test, before opening a PR.

## Other guidance

- If no GitHub issue exists for the work, create one before starting.
- Keep this file in step with the README, CONTRIBUTING.md and the ADRs. Anything a human developer needs goes in those, not here; nobody should have to read this file to work on the repo.
- When writing an ADR, record where the decision landed, not the conversation that led to it. Only list alternatives that were actually considered.

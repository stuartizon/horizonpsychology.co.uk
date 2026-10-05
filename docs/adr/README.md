# Architecture decision records

One file per decision, numbered in sequence. See [0001](0001-record-architecture-decisions.md) for how these work, and copy [template.md](template.md) to add one. A superseded record is marked "(superseded by NNNN)" in this list.

| # | Decision |
|---|---|
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions |
| [0002](0002-astro-static-site.md) | Build the site with Astro as a static site |
| [0003](0003-plain-css-with-design-tokens.md) | Style with plain CSS and custom-property design tokens (superseded by 0012) |
| [0004](0004-self-host-fonts-with-fontsource.md) | Self-host web fonts with Fontsource |
| [0005](0005-no-client-side-ui-framework.md) | No client-side UI framework |
| [0006](0006-structured-content-in-collections.md) | Keep structured content in one place |
| [0007](0007-test-driven-development.md) | Test-driven development with red, green, refactor |
| [0008](0008-pull-requests-and-squash-merge.md) | All changes via pull requests, squash merged |
| [0009](0009-github-issues-for-work-tracking.md) | Track all work in GitHub issues |
| [0010](0010-gitmoji-commit-messages.md) | Gitmoji commit messages |
| [0011](0011-vitest-and-playwright-for-tests.md) | Test with Vitest, Playwright and axe, run in GitHub Actions (superseded by 0013) |
| [0012](0012-small-global-token-set-and-component-owned-styles.md) | Keep global tokens small and give components their own styles |
| [0013](0013-test-in-chromium-and-webkit-at-desktop-and-phone-sizes.md) | Test with Vitest, and with Playwright and axe in Chromium and WebKit at desktop and phone sizes |
| [0014](0014-two-site-wide-breakpoints-in-rem.md) | Use two site-wide breakpoints, in rem |
| [0015](0015-host-on-cloudflare-pages-deployed-from-github-actions.md) | Host on Cloudflare Pages, deployed with Wrangler from GitHub Actions |
| [0016](0016-phosphor-icons-from-the-npm-package.md) | Use Phosphor icons from the npm package |
| [0017](0017-keep-a-snapshot-of-the-design-in-the-repo.md) | Keep a snapshot of the design in the repo |

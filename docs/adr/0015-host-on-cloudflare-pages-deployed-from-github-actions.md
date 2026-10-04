# 0015. Host on Cloudflare Pages, deployed with Wrangler from GitHub Actions

Date: 2026-10-05

## Context

The site is a static Astro build ([0002](0002-astro-static-site.md)). A demo ran on Vercel, which deploys on every push, separately from CI. The domain `horizonpsychology.co.uk` is registered and managed in Cloudflare. We want each change previewed before it goes live, and nothing deployed unless the build and both test suites pass ([0013](0013-test-in-chromium-and-webkit-at-desktop-and-phone-sizes.md)).

## Decision

- The site is hosted on Cloudflare Pages, in a project named `horizonpsychology` whose production branch is `main`. It stays fully static, with no Astro adapter.
- GitHub Actions deploys it with Wrangler, pinned as a dev dependency and configured in `wrangler.jsonc`. The deploy job runs only after the test job passes, and deploys the exact `dist/` the tests ran against.
- Each pull request deploys to a preview named after its branch, at `<branch>.horizonpsychology.pages.dev`, linked from the pull request. Pull requests from forks aren't deployed.
- Every push to `main` deploys straight to production at `horizonpsychology.co.uk`. There's no separate dev or staging environment: the site is static content, so pull request previews are where changes are checked, and merging releases them.
- Runs on `main` queue rather than cancel each other, so a production deploy is never cut off halfway through.
- The workflow authenticates with a `CLOUDFLARE_API_TOKEN` repository secret, scoped to editing Cloudflare Pages on this account only, and a `CLOUDFLARE_ACCOUNT_ID` repository variable.

## Alternatives considered

- **Stay on Vercel.** Its deploys run on every push, outside CI, so a failing build or test doesn't stop them, and the domain would be managed in a different place from the hosting.
- **Cloudflare's Git integration, building on Cloudflare.** Simpler to set up, but like Vercel it builds and deploys separately from CI.
- **A dev environment on `main`, with production promoted by hand.** More control over releases than a static site needs, given every change already has its own preview.

## Consequences

- DNS, hosting and email routing are all in one Cloudflare account.
- Every change has a preview link before it's merged, and anything merged is live a few minutes later, once CI passes.
- Rolling back means reverting on `main`, or promoting an earlier deployment from the Cloudflare dashboard.
- A server-side feature, such as sending contact form enquiries (#12), can be added as a Cloudflare Pages Function without changing hosts.

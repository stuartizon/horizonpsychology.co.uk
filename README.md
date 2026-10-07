# Horizon Psychology website

Website for Horizon Psychology, the private practice of Dr Emma Izon, clinical psychologist. It covers individual and couples therapy, clinical supervision and research supervision, online or face-to-face in Buckinghamshire.

It's a static site built with [Astro](https://astro.build), TypeScript and plain CSS.

## Getting started

Requires Node 22.12 or later (see `.nvmrc`).

```sh
npm install
npm run dev
```

The dev server runs on <http://127.0.0.1:4321>.

### Commands

| Command                | What it does                                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Local development server                                                                                       |
| `npm run check`        | Astro and TypeScript checks                                                                                    |
| `npm run lint`         | ESLint, including accessibility rules for templates                                                            |
| `npm run format`       | Formats the repo with Prettier                                                                                 |
| `npm run format:check` | Checks the formatting without changing any files                                                               |
| `npm run build`        | Checks, then builds the static site to `dist/`                                                                 |
| `npm run preview`      | Serves the production build locally                                                                            |
| `npm test`             | All the tests below, one after the other                                                                       |
| `npm run test:unit`    | Unit tests                                                                                                     |
| `npm run test:pages`   | Builds the site, then tests its pages, links and sitemap                                                       |
| `npm run test:browser` | Browser and accessibility tests. Install the browsers once first with `npx playwright install chromium webkit` |

## Stack

| Layer                  | Choice                                                                                                                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework              | [Astro](https://astro.build) 7, static output ([ADR 0002](docs/adr/0002-astro-static-site.md))                                                                                                                                                                                  |
| Language               | TypeScript, strict mode                                                                                                                                                                                                                                                         |
| Styling                | Plain CSS: a small set of global tokens, with each component's styles in its own file ([ADR 0012](docs/adr/0012-small-global-token-set-and-component-owned-styles.md)), and two breakpoints, tablet and desktop ([ADR 0014](docs/adr/0014-two-site-wide-breakpoints-in-rem.md)) |
| Interactivity          | Small vanilla TypeScript scripts in components, no UI framework ([ADR 0005](docs/adr/0005-no-client-side-ui-framework.md))                                                                                                                                                      |
| Content                | One typed source each for services, FAQs, testimonials, publications and legal pages ([ADR 0006](docs/adr/0006-structured-content-in-collections.md), in progress in #3)                                                                                                        |
| Fonts                  | Lora and Source Sans 3, served from the site with [Fontsource](https://fontsource.org) ([ADR 0004](docs/adr/0004-self-host-fonts-with-fontsource.md))                                                                                                                           |
| Icons                  | [Phosphor](https://phosphoricons.com), imported from `@phosphor-icons/core` ([ADR 0016](docs/adr/0016-phosphor-icons-from-the-npm-package.md)), and the service icons in `src/icons/`                                                                                           |
| SEO                    | `sitemap-index.xml` built by [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) and linked from `robots.txt`                                                                                                                                  |
| Testing                | [Vitest](https://vitest.dev) for unit and page tests, [Playwright](https://playwright.dev) with [axe](https://github.com/dequelabs/axe-core-npm) for browser tests ([ADR 0018](docs/adr/0018-unit-page-and-browser-tests.md))                                                   |
| Linting and formatting | [ESLint](https://eslint.org), with accessibility rules for Astro templates, and [Prettier](https://prettier.io) ([ADR 0019](docs/adr/0019-lint-with-eslint-and-format-with-prettier.md))                                                                                        |
| CI                     | GitHub Actions on every pull request and push to `main`, with weekly dependency updates from Dependabot                                                                                                                                                                         |
| Hosting                | [Cloudflare Pages](https://pages.cloudflare.com), deployed with Wrangler from GitHub Actions ([ADR 0015](docs/adr/0015-host-on-cloudflare-pages-deployed-from-github-actions.md))                                                                                               |

## Repo structure

```
src/
  pages/        # one file per route; [therapyId].astro renders the service pages
  layouts/      # BaseLayout.astro: head, header and footer
  components/   # .astro components, each with its own scoped styles and any script
  data/         # typed content shared across pages, such as services.ts
  icons/        # the service icons, named by service id, imported with ?raw
  photos/       # site photos, named by the page they appear on, loaded with astro:assets
  styles/       # global.css: colour palette, shared scales and base element styles
  test/         # unit test helpers (render.ts renders a component to a queryable DOM)
  consts.ts     # site title and description
tests/
  pages/        # Vitest tests of the built pages in dist/
  browser/      # Playwright browser and accessibility tests
public/         # static assets served as-is (images, favicon, robots.txt)
docs/adr/       # architecture decision records
docs/design/    # dated snapshot of the design from Claude Design
```

Import from `src` with the `@/` alias, for example `@/components/Button.astro`.

## Testing

Work is test-first ([ADR 0007](docs/adr/0007-test-driven-development.md)), with three kinds of automated test ([ADR 0018](docs/adr/0018-unit-page-and-browser-tests.md)). Each check goes in the fastest one that can make it:

- **Unit tests** (`npm run test:unit`, Vitest) render a component and check its output: content, links, attributes and ARIA. They sit next to the code they test. Tests of the typed content in `src/data/`, and checks over source files such as which breakpoints the styles use, go here too.
- **Page tests** (`npm run test:pages`, Vitest) build the site and read its pages from `dist/`. They check what's in the built files: each page's content, images and metadata, the sitemap and `robots.txt`, and that every internal link opens a page. They live in `tests/pages/`.
- **Browser tests** (`npm run test:browser`, Playwright) run in Chromium and WebKit, at desktop and 320px phone sizes, against a production build. They're for what needs a browser: responsive layout, scripts, keyboard and focus, and automated accessibility checks with axe. They live in `tests/browser/`.

`npm test` runs all three. CI runs the build and all three on every pull request and push to `main`.

## Deployment

Once the tests pass, CI deploys the build to Cloudflare Pages ([ADR 0015](docs/adr/0015-host-on-cloudflare-pages-deployed-from-github-actions.md)):

- each pull request to a preview at `<branch>.horizonpsychology.pages.dev`, linked from the pull request, except pull requests from forks and Dependabot, which don't get the Cloudflare secrets
- every push to `main` to production at <https://horizonpsychology.co.uk>

There's no separate staging site. Check changes on the pull request's preview before merging.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how work is tracked, branched, committed and reviewed, and [docs/adr/](docs/adr/README.md) for the decisions behind the site.

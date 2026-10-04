# Horizon Psychology website

Website for Horizon Psychology, the private practice of Dr Emma Izon, clinical psychologist. It covers individual and couples therapy, clinical supervision and research supervision, online or face-to-face in Buckinghamshire.

It's a static site built with [Astro](https://astro.build), TypeScript and plain CSS.

## Getting started

Requires Node 22 or later (see `.nvmrc`).

```sh
npm install
npm run dev
```

The dev server runs on <http://127.0.0.1:4321>.

### Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local development server |
| `npm run check` | Astro and TypeScript checks |
| `npm run build` | Checks, then builds the static site to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm test` | Component tests |
| `npm run test:e2e` | Browser and accessibility tests. Install the browsers once first with `npx playwright install chromium webkit` |

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) 5, static output ([ADR 0002](docs/adr/0002-astro-static-site.md)) |
| Language | TypeScript, strict mode |
| Styling | Plain CSS: a small set of global tokens, with each component's styles in its own file ([ADR 0012](docs/adr/0012-small-global-token-set-and-component-owned-styles.md)), and two breakpoints, tablet and desktop ([ADR 0014](docs/adr/0014-two-site-wide-breakpoints-in-rem.md)) |
| Interactivity | Small vanilla TypeScript scripts in components, no UI framework ([ADR 0005](docs/adr/0005-no-client-side-ui-framework.md)) |
| Content | One typed source each for services, FAQs, testimonials, publications and legal pages ([ADR 0006](docs/adr/0006-structured-content-in-collections.md), in progress in #3) |
| Fonts | Lora and Source Sans 3, served from the site with [Fontsource](https://fontsource.org) ([ADR 0004](docs/adr/0004-self-host-fonts-with-fontsource.md)) |
| Testing | [Vitest](https://vitest.dev) for components, [Playwright](https://playwright.dev) with [axe](https://github.com/dequelabs/axe-core-npm) in the browser ([ADR 0013](docs/adr/0013-test-in-chromium-and-webkit-at-desktop-and-phone-sizes.md)) |
| CI | GitHub Actions on every pull request and push to `main` |
| Hosting | A demo is deployed to Vercel. Production hosting isn't decided yet (#18) |

## Repo structure

```
src/
  pages/        # one file per route; [therapyId].astro renders the service pages
  layouts/      # BaseLayout.astro: head, header and footer
  components/   # .astro components, each with its own scoped styles and any script
  data/         # typed content shared across pages, such as services.ts
  icons/        # SVGs imported with ?raw; service icons are named by service id
  styles/       # global.css: colour palette, shared scales and base element styles
  test/         # test helpers (render.ts renders a component to a queryable DOM)
  consts.ts     # site title and description
e2e/            # Playwright browser and accessibility tests
public/         # static assets served as-is (images, favicon, robots.txt)
docs/adr/       # architecture decision records
```

Import from `src` with the `@/` alias, for example `@/components/Button.astro`.

## Testing

Work is test-first ([ADR 0007](docs/adr/0007-test-driven-development.md)), with two kinds of automated test ([ADR 0013](docs/adr/0013-test-in-chromium-and-webkit-at-desktop-and-phone-sizes.md)):

- **Component tests** (`npm test`, Vitest) render a component and check its output: content, links, attributes and ARIA. They sit next to the component they test.
- **Browser tests** (`npm run test:e2e`, Playwright) run in Chromium and WebKit, at desktop and 320px phone sizes, against a production build. They cover smoke checks that pages load and navigation works, interactive behaviour (scripts, keyboard and focus, responsive layout), and automated accessibility checks with axe. They live in `e2e/`.

CI runs the build and both test suites on every pull request and push to `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how work is tracked, branched, committed and reviewed, and [docs/adr/](docs/adr/README.md) for the decisions behind the site.

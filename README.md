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
| `npm run test:e2e` | Browser and accessibility tests. Install the browser once first with `npx playwright install chromium` |

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) 5, static output ([ADR 0002](docs/adr/0002-astro-static-site.md)) |
| Language | TypeScript, strict mode |
| Styling | Plain CSS: a small set of global tokens, with each component's styles in its own file ([ADR 0012](docs/adr/0012-small-global-token-set-and-component-owned-styles.md)) |
| Interactivity | Small vanilla TypeScript scripts in components, no UI framework ([ADR 0005](docs/adr/0005-no-client-side-ui-framework.md)) |
| Content | One typed source each for services, FAQs, testimonials, publications and legal pages ([ADR 0006](docs/adr/0006-structured-content-in-collections.md), in progress in #3) |
| Fonts | Lora and Source Sans 3, served from the site with [Fontsource](https://fontsource.org) ([ADR 0004](docs/adr/0004-self-host-fonts-with-fontsource.md)) |
| Testing | [Vitest](https://vitest.dev) for components, [Playwright](https://playwright.dev) with [axe](https://github.com/dequelabs/axe-core-npm) in the browser ([ADR 0011](docs/adr/0011-vitest-and-playwright-for-tests.md)) |
| CI | GitHub Actions on every pull request and push to `main` |
| Hosting | A demo is deployed to Vercel. Production hosting isn't decided yet (#18) |

## Repo structure

```
src/
  pages/        # one file per route; [therapyId].astro renders the service pages
  layouts/      # BaseLayout.astro: head, header and footer
  components/   # .astro components, each with its own scoped styles and any script
  icons/        # SVGs imported with ?raw
  styles/       # global.css: colour palette, shared scales and base element styles
  test/         # test helpers (render.ts renders a component to a queryable DOM)
  consts.ts     # site title and description
e2e/            # Playwright browser and accessibility tests
public/         # static assets served as-is (images, favicon, robots.txt)
docs/adr/       # architecture decision records
```

Import from `src` with the `@/` alias, for example `@/components/Button.astro`.

### Styling

- `src/styles/global.css` holds only the colour palette (as hex values), shared scales (type, spacing, radii, shadows, motion) and base element styles. There are no role aliases such as `--color-eyebrow`.
- Even simple elements (an eyebrow, a button, a heading) are small components, with their styles in the component's scoped `<style>`.
- Components use palette colours and scale tokens directly. A new colour is added to the palette first; there are no hex values outside it. A value only one component needs is defined in that component.
- Interactive behaviour (menu, carousel, accordion) is vanilla TypeScript in the component's `<script>`. Adding a UI framework would need an ADR.

### Accessibility

Content must use semantic HTML, be keyboard operable with visible focus, respect `prefers-reduced-motion`, and work from 320px wide.

## Testing strategy

Work is test-first: red, green, refactor ([ADR 0007](docs/adr/0007-test-driven-development.md)).

1. **Red:** write a failing test that describes the behaviour, see it fail for the expected reason, and commit it on its own (e.g. `✅ Add failing test for service card price line`). Reviewers can then see the test existed before the implementation.
2. **Green:** write the simplest implementation that passes. Commit.
3. **Refactor:** tidy the code and tests with the suite green. Commit.

CI has to pass on the pull request, not on each intermediate commit, so a failing test-first commit is expected.

There are two kinds of test:

- **Component tests** (`npm test`) sit next to the component as `Component.test.ts`. They render it with `render()` from `@/test/render` and query the returned DOM. Use them for rendered output: content, links, attributes and ARIA.
- **Browser tests** (`npm run test:e2e`) live in `e2e/*.spec.ts` and run in Chromium against a production build. Use them for anything that needs a browser: scripts, keyboard and focus, navigation, responsive layout, and [axe](https://github.com/dequelabs/axe-core-npm) accessibility checks.

A test for a known bug that won't be fixed in the current pull request is marked `test.fail()` with a comment linking the issue. The marker comes out in the pull request that fixes it.

Pure visual changes with no testable behaviour (such as adjusting a colour) don't need a contrived test. The pull request says so and includes before and after screenshots instead.

CI runs the build, component tests and browser tests on every pull request. All three must pass before a pull request is opened and merged.

## Contributing

### Issues

Every user story, task, bug or chore is a [GitHub issue](https://github.com/stuartizon/horizonpsychology.co.uk/issues) before work starts ([ADR 0009](docs/adr/0009-github-issues-for-work-tracking.md)). Larger pieces of work get a tracking issue with a checklist of sub-issues, such as the redesign in #14. Reference the issue from the branch, commits and pull request.

### Branches and pull requests

- Nothing is committed directly to `main`; every change goes through a pull request ([ADR 0008](docs/adr/0008-pull-requests-and-squash-merge.md)).
- Branch from `main` with a short descriptive name, such as `services-dropdown`.
- Commit little and often, one small, coherent step per commit.
- Pull requests are squash merged, so the title becomes the commit on `main` and follows the commit style below. The description says what changed, why, how it was tested, and `Closes #<issue>`.
- Keep pull requests small enough to review in one sitting. Split large issues into several.
- Update this README and the ADRs in the same pull request as the change they describe.

### Commit messages

Commit messages and pull request titles start with a [gitmoji](https://gitmoji.dev) as the Unicode emoji, then an imperative summary in sentence case with no full stop ([ADR 0010](docs/adr/0010-gitmoji-commit-messages.md)):

```
✨ Add services dropdown to the header
```

| Emoji | Use for |
|---|---|
| ✨ | New feature or page |
| 🐛 | Bug fix |
| ✅ | Add or update tests (including the red, test-first commit) |
| ♻️ | Refactor |
| 💄 | UI and style changes |
| 📝 | Documentation (including ADRs) |
| 🔧 | Configuration |
| ➕ / ➖ | Add / remove a dependency |
| 🔥 | Remove code or files |
| 🍱 | Add or update assets (images, fonts, icons) |
| ♿️ | Accessibility |
| 🚚 | Move or rename files or routes |
| ⚡️ | Performance |
| 🔒️ | Security or privacy |
| 👷 | CI and build system |

Keep messages about the change itself, not where third-party assets came from.

### Architecture decision records

Significant decisions are recorded in [docs/adr/](docs/adr/README.md), one Markdown file each, numbered in sequence and copied from the template. Add one when choosing or changing a framework, library, hosting or service, data handling approach, or way of working, and list it in the index. Records aren't rewritten: a changed decision gets a new record that supersedes the old one, with "Supersedes" and "Superseded by" lines on both, and the old one is marked as superseded in the index.

### Working on a health practice's site

- Treat anything a visitor submits, especially contact form messages, as potentially sensitive health data under UK GDPR. Collect the minimum, and don't log or store it beyond what's needed.
- Keep the "not an emergency service" signposting (GP, NHS 111, Samaritans 116 123) wherever the design includes it.
- Legal pages (fees and cancellations, confidentiality, privacy, complaints) need sign-off from Dr Izon before they're published as final.

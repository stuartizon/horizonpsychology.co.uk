# Design snapshot, 2026-10-01

A copy of the site's design from Claude Design (claude.ai/design), kept here so anyone working on an issue can read the styles and copy it intended ([ADR 0017](../../adr/0017-keep-a-snapshot-of-the-design-in-the-repo.md)). It's a reference, not a spec: where it disagrees with the code, see [Which source wins](#which-source-wins).

It's temporary. Once the redesign (#14) is built, this folder is deleted in the clean-up (#13), and the code is the record of the design.

## What's here

| File | What it is |
|---|---|
| `website.dc.html` | The website design: every page's markup, inline styles and copy. Pages are `<sc-if value="{{ isHome }}">` blocks, and components come in as `<x-import component-from-global-scope="…Name">`. |
| `design-system/_ds_bundle.js` | The design system's components, compiled from JSX. Search for `function Name(` to read one, for example `function Quote(`. Its `ui_kits/website` pages are an earlier version of the site. |
| `design-system/tokens/*.css` | The design system's tokens: palette, type, spacing, shape, motion and base element styles. |

These files are for reading. They don't render on their own: the export's runtime, images and fonts aren't included.

Left out of the export: the design system's readme, whose rules for writing copy are in [CONTRIBUTING.md](../../../CONTRIBUTING.md#writing-copy) and whose other notes are covered by the tokens or out of date; the compiled `Horizon Psychology website.html` (9 MB, the same design bundled with its runtime), the prototype images, and the uploaded brief, page copy and wireframes, which are working documents rather than design.

## Which source wins

The design system was settled first, the website design was iterated on top of it, and more decisions have been made since in issues, pull requests and code. When they disagree, the later one wins:

1. **The code on `main`, the [ADRs](../../adr/README.md) and the issues.**
2. **The website design** (`website.dc.html`).
3. **The design system** (`design-system/`).

### Known differences

Where the site departs from the design on purpose. A pull request that departs from the design adds a line here, so nobody "fixes" it back.

- **Tokens.** `global.css` keeps the palette and shared scales, without the design's role aliases such as `--surface-sage` or `--color-text-muted`. Components use palette colours directly ([ADR 0012](../../adr/0012-small-global-token-set-and-component-owned-styles.md)). The mapping: `surface-page` is `background`, `surface-card` is `panel`, `surface-quiet` is `cream`, `surface-sage` is `sage-50`, `text-body` is `ink`, `text-muted` is `ink-soft`, `text-heading` is `sage-800`, `eyebrow` is `sage-600`.
- **Amber, not sand.** Sand was the old warm colour; the design moved to amber. The design system's tokens keep `--color-sand-*` only as aliases for amber, and some of its components still use those names. The site has amber only.
- **Breakpoints.** The design changes layout at five widths. The site uses two, tablet at 48rem and desktop at 64rem ([ADR 0014](../../adr/0014-two-site-wide-breakpoints-in-rem.md)).
- **Fonts** are self-hosted with Fontsource, not loaded from Google Fonts ([ADR 0004](../../adr/0004-self-host-fonts-with-fontsource.md)).
- **Icons** are imported from the `@phosphor-icons/core` package ([ADR 0016](../../adr/0016-phosphor-icons-from-the-npm-package.md)).
- **Lead text.** The home page intro, each service's summary and the FAQs page intro are normal body text, not the design's larger, softer lead style (#5, #6, #8).
- **Home page.** Testimonials move to the About page (#5, #7).
- **Service card.** Fixed 24px padding rather than `clamp(24px, 2.4vw, 32px)`, so titles fit on one line on wide screens; and its "Find out more →" is its own small semibold link, not the link button (#67).
- **Intro call panel** (the design's "Start with a free 15-minute call" panel). The heading has its own row, and the button sits beside the paragraph from tablet up, or centred below it on a phone, rather than centred across the heading and paragraph and wrapping at about 700px (#68).
- **FAQ answers** line up with the question text, running up to the toggle's column, rather than stopping at the prose measure (#73).
- **Service page intro.** The fees panel sits beside the description from tablet width up, rather than dropping below it until the description and panel both fit at their preferred widths. On narrow phones the title shrinks so it stays on one line beside its icon, and the icon is sized to the title (1.05em) rather than a fixed 34px. The questions also sit beside their heading from tablet width up, with the heading column narrowing first (#75).
- **Service page photos.** Each photo is shown at its own proportions, uncropped, rather than at 16:7, so nothing important is cut off (#75).
- **FAQs page.** Every FAQ is on the page, in five groups of four: clinical and research supervision are separate groups, rather than the design's single group of four supervision questions (#8).
- **Section heading** takes a `level` prop where the design's takes `as` (#65).
- **Not built:** the blog page and its link in the footer, which are out of scope for launch (#14).

## Refreshing the snapshot

When the design changes in Claude Design:

1. Export the project as a handoff bundle for Claude Code.
2. Copy into a new dated folder, `docs/design/YYYY-MM-DD/`:
   - `project/Horizon Psychology website.dc.html` as `website.dc.html`
   - from `project/_ds/<design system>/`: `_ds_bundle.js`, `styles.css` and `tokens/`
3. Check the files for anything that shouldn't be public, such as client details or keys.
4. Copy this README across, update its date, and review the known differences against the new design.
5. Delete the old folder, and update the links to it in CONTRIBUTING.md and the open issues.

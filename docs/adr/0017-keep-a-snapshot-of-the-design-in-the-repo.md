# 0017. Keep a snapshot of the design in the repo

Date: 2026-10-05

## Context

The site's redesign was made in Claude Design (claude.ai/design). The issues for it referred to an export of the design saved on one machine, so anyone else working on an issue, including cloud sessions of Claude Code, couldn't read the styles and copy the design intended without the export being shared each time.

The export holds three layers that don't always agree: the design system (components and tokens), which was settled first; the website design, iterated on top of it; and a compiled bundle of both. Since the export, further decisions have been made in issues, pull requests and code. The repo is also going to be made public (#25).

## Decision

Keep a dated snapshot of the readable parts of the export in `docs/design/YYYY-MM-DD/`: the website design (`website.dc.html`) and the design system's component source and tokens. Leave out the compiled bundle, the prototype images, the uploaded working documents, and the design system's readme. The readme's rules for writing copy move into CONTRIBUTING.md, where they're kept up to date; its other notes are covered by the tokens or out of date.

The snapshot is a reference, not a spec. When sources disagree, the later one wins: the code, ADRs and issues first, then the website design, then the design system. The snapshot's README lists where the site departs from the design on purpose, and a pull request that departs from it adds a line there.

When the design changes, export it again into a new dated folder and delete the old one.

## Alternatives considered

- **Commit the whole export.** About 17 MB, mostly the compiled bundle and prototype images, which repeat the readable source or are replaced by the site's own images. It also includes the brief and page copy, which shouldn't become public with the repo.
- **Share the export each time it's needed.** Every issue in the redesign needs it, and it can't be read from a cloud session without being uploaded again.

## Consequences

- Anyone working on an issue can read the design from the repo.
- The snapshot goes stale if the design changes and nobody exports it again. Its date makes that visible.
- The known differences list has to be kept up to date by the pull requests that depart from the design.

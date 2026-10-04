# 0001. Record architecture decisions

- **Date:** 2026-10-04
- **Issue:** #15

## Context

Decisions about this site have so far lived only in commit messages and in AI coding sessions whose transcripts have since been deleted. When we pick up work later, or bring in someone new, it's hard to tell why things are the way they are.

## Decision

Record significant decisions as architecture decision records (ADRs) in `docs/adr/`, one Markdown file per decision, named `NNNN-short-title.md` and based on `template.md`.

- Past ADRs aren't rewritten. A changed decision gets a new ADR that references the one it replaces.
- `README.md` in this directory is the index.

## Consequences

- There's a lightweight, reviewable record of why things are the way they are.
- Adding an ADR becomes part of the PR for any significant change.

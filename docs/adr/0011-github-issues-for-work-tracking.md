# 0011. Track all work in GitHub issues

- **Date:** 2026-10-04
- **Issue:** #15

## Context

Work needs to be visible and plannable, and should be picked up by people or AI agents without relying on chat history that may be lost.

## Decision

Every user story, task, bug and chore is a GitHub issue in this repository before work starts. Larger efforts get a tracking issue with a checklist of sub-issues (for example #14 for the redesign). Issues say what's in scope, how we'll know it's done, and which other issues they depend on. Branches, commits and PRs reference their issue.

## Consequences

- The issue tracker is the single source of truth for planned and in-progress work.
- A little overhead for very small changes, which is acceptable.

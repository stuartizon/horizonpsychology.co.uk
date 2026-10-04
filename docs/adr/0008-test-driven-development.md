# 0008. Test-driven development with red, green, refactor

- **Date:** 2026-10-04
- **Issue:** #15

## Context

The site is about to be largely rebuilt for the redesign. There are currently no automated tests, so regressions in behaviour (navigation, menus, accordions, carousel, the contact form) or accessibility can only be found by hand.

## Decision

Work test-first, using the red-green-refactor cycle:

1. **Red**: write a failing test for the behaviour and commit it on its own, before any implementation.
2. **Green**: make it pass with the simplest implementation and commit.
3. **Refactor**: improve the code with the tests green and commit.

The failing-test commit lives on the feature branch. Squash merging ([0010](0010-pull-requests-and-squash-merge.md)) collapses it on `main`, but it stays visible in the PR. Purely visual changes with no testable behaviour may skip the test, with the reason and screenshots given in the PR.

## Consequences

- Behaviour and accessibility are covered by tests as the redesign lands.
- Branches have more, smaller commits, which suits "commit little and often".
- Test tooling has to be chosen and set up first ([0009](0009-testing-tooling.md)).

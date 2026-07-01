---
name: spec-driven-dev
description: Spendly's spec-driven development workflow — how to write, locate, and follow specs stored in .claude/specs/ before implementing a feature. Use whenever asked to build a new feature, or when a task references "the spec" for something.
---

# Spec-Driven Development for Spendly

Spendly follows a spec-first workflow: features are documented as specs under `.claude/specs/` before implementation.

## Workflow
0. **Read `.claude/SKILL.md` first.** This repo already has a project-level skill file with established conventions — treat it as authoritative over anything below if the two ever conflict.
1. **Check for an existing spec.** Look in `.claude/specs/` for a file matching the feature name before writing any code.
2. **If none exists**, draft one first. A spec should cover:
   - Problem statement / user story
   - Data model changes (tables, columns, migrations)
   - API/route changes
   - UI changes (if any)
   - Edge cases and validation rules
   - Out-of-scope items
3. **Get the spec confirmed** (explicitly or implicitly, by proceeding) before writing implementation code.
4. **Implement against the spec**, referencing it by filename in commit messages or PR descriptions where relevant.
5. **Update the spec** if implementation reveals the original design needs to change — the spec should stay a living, accurate record, not a stale plan.

## Spec file naming
Use kebab-case matching the feature, e.g. `.claude/specs/recurring-expenses.md`, `.claude/specs/budget-alerts.md`.

## Why this matters here
Because Spendly is built almost entirely through Claude Code sessions, specs are the durable memory of design decisions across sessions — treat them as more authoritative than a half-remembered prior conversation.

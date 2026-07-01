---
description: Scaffold a new spec file under .claude/specs/ for a Spendly feature, following the project's spec-driven workflow.
---

Create a new spec file for a Spendly feature.

1. Ask the user for the feature name if not already given, and derive a kebab-case filename, e.g. `.claude/specs/recurring-expenses.md`.
2. If `.claude/specs/` doesn't exist yet, create it.
3. Write the spec using this template:

```markdown
# <Feature Name>

## Problem / User Story
<what problem this solves, from the user's point of view>

## Data Model Changes
<new/changed tables, columns, or database/ query helpers needed>

## Route Changes (app.py)
<new or modified Flask routes>

## Template/UI Changes
<changes under templates/ or static/, if any>

## Validation & Edge Cases
<input validation rules, edge cases to handle>

## Out of Scope
<what this explicitly does NOT cover>

## Tests
<what should be covered under tests/, run via pytest>
```

4. Fill in as much as the conversation already makes clear; leave placeholders for anything not yet decided, and ask the user to confirm before implementation begins.

---
name: expense-entry
description: Conventions for adding or modifying expense-entry logic in Spendly (Flask + SQLite). Use when creating routes, forms, or models that record a transaction, category, or amount.
---

# Expense Entry Conventions

Spendly is a Flask + SQLite personal expense tracker. When working on anything that creates or edits a transaction record, follow these conventions:

## Data model expectations
- A transaction has: `amount` (positive float, 2 decimal places), `category`, `description`, `date` (ISO 8601), and an auto-incrementing `id`.
- Categories should be validated against a fixed, editable list rather than free text, to keep reporting consistent.
- Amounts are always stored in the base currency; do not silently apply currency conversion.

## Route/form conventions
- Spendly's Flask routes live in `app.py`. Keep the route handler thin — validate input, then call into `database/` for the actual query. Don't inline raw SQL directly in `app.py` if `database/` already has a helper for it.
- Validate `amount > 0` server-side, not just client-side.
- Default `date` to "today" if omitted, but always allow backdating.
- Any new query pattern (new filter, new join, new aggregation) belongs in `database/`, not duplicated inline in a second route.

## Database files — read this before touching SQLite directly
- `spendly.db` is the live database. `spendly-backup.db` is a backup snapshot.
- Never run destructive SQL (`DROP`, `DELETE` without a `WHERE`, schema rewrites) directly against `spendly.db` from a shell command or script without an explicit, freshly-confirmed instruction to do so in *this* conversation — a prior backup existing is not standing permission to overwrite the live file.
- Schema changes belong in whatever migration/schema file lives under `database/` (e.g. `schema.sql`), not as one-off `ALTER TABLE` statements run ad hoc.

## Before writing code
1. Check `.claude/` for existing specs or the existing `SKILL.md` conventions before creating new logic from scratch — this repo already has some documented conventions there.
2. If no spec exists and the change is non-trivial, propose creating one first (see the `spec-driven-dev` skill).

## Tests
- Tests live under `tests/` and run via `pytest.ini`. Any new route or query logic should get a corresponding test there, run with `pytest`.

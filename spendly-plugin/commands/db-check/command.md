---
description: Sanity-check Spendly's database files and schema before starting work — confirms spendly.db exists, is reachable, and reports its current table structure.
---

Check the state of Spendly's database before making changes:

1. Confirm `spendly.db` exists in the repo root. If not, flag it clearly — don't create a fresh one silently.
2. Run a read-only schema inspection (e.g. `sqlite3 spendly.db ".schema"` or the Python equivalent) to list current tables and columns.
3. Report table names, row counts per table (read-only `COUNT(*)`), and flag anything that looks unexpected compared to `database/` code (e.g. a column referenced in code but missing from the live schema).
4. Do not modify `spendly.db` or `spendly-backup.db` as part of this check — this command is read-only by design. The `production-guard` hook will also block any destructive write attempt.

---
name: budget-report
description: Conventions for building spending summaries, budget comparisons, or reports in Spendly. Use when generating aggregate views over transactions (totals by category, monthly trends, budget-vs-actual).
---

# Budget & Reporting Conventions

## Aggregation rules
- Always aggregate in SQL (SUM/GROUP BY) rather than pulling all rows into Python and summing in application code, once the transaction table is non-trivial in size.
- Monthly views should bucket by calendar month on the `date` column, not by "last 30 days," unless the report explicitly asks for a rolling window.
- Category totals should include categories with zero spend in the period if a budget exists for them, so under-spend is visible.

## Presentation
- Currency values: always 2 decimal places, with the currency symbol applied at render time, not stored with the number.
- When comparing budget vs. actual, show variance as both an absolute amount and a percentage.

## Before building a new report
Check `.claude/specs/` for a matching report spec — reporting logic tends to accumulate one-off variants, and a spec keeps definitions (e.g. "what counts as this month") consistent across the app.

---
name: curate-interview-quality
description: Use when the user wants to review interview quality or explicitly delete unusable interviews from one User Intuition study.
allowed-tools: Read
---

When the user asks to curate quality:

1. Identify one study and call `list_interviews` with its `study_id`. Use the `quality` filter for Excellent, Good, Fair, or Poor subsets.
2. Fetch each interview under review with `get_interview`. Summarize why it may be low quality using only the returned messages and metadata.
3. Recommend an action, then wait. The current MCP surface does not provide `update_interview`, hide, or quality-override operations.
4. Call `delete_interview` only when the user explicitly confirms the exact interview ID. Never bulk-delete from a quality filter without per-study, clearly scoped confirmation.
5. Re-run `list_interviews` and report the after-state. Explain if the remaining usable sample is too small for reliable analysis.

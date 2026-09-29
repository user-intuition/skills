---
name: monitor-fielding
description: Use when the user wants a read-only status snapshot of User Intuition studies or interviews.
---

When the user asks for fielding status:

1. Record the snapshot time. Call `list_studies`, paginating when necessary. Use response totals rather than counting only the current page.
2. For each study in scope, call `list_interviews` with its `study_id`. Use `status` and `quality` filters when the user asks for a breakdown.
3. Present a compact table with study name, recruiting method, `fielding_status`, interview count, quality distribution, and the snapshot time. Keep `provisioning_status` separate: provisioned means interviews can run, not that recruitment started.
4. For BYOP, report `fielding_status: unavailable` as such and use participant/interview facts instead of inventing a study-level recruitment state. Flag no completions or a high Fair/Poor share as observations, not diagnoses. Zero completions alone is not proof that recruitment is stalled.
5. Keep the workflow read-only. Offer `pause_study`, `resume_study`, `stop_study`, or report generation as follow-ups, but do not mutate unless the user explicitly asks.

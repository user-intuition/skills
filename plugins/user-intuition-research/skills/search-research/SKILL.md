---
name: search-research
description: Use when the user wants to find existing User Intuition findings or participant responses across authorized studies before deciding whether more qualitative research is needed.
---

1. Turn the user's information need into a query and identify at least one authorized `study_id`. Preserve any supplied date or content-type constraints; do not add filters without a reason grounded in the request.
2. Call `search_research` with `filters.study_ids` and, when useful, `content_types`, `research_date_from`, or `research_date_to`. Supported content types are `study_plan`, `study_finding`, `participant_profile`, `participant_response`, and `recommended_next_step`. Use a limit from 1–50. Follow `next_cursor` with the same query, filters, and limit until it is null when the task needs broader coverage. A final page can be empty.
3. When the user asks a question across studies, call `answer_research` with the question and the same authorized study IDs. Its prose is generated from bounded indexed evidence; inspect every numbered citation's `study_id`, `content_id`, `content_type`, and `report_id` before presenting the answer. If `insufficient_evidence` is true, say so. Do not treat a cited summary as a verbatim participant quote.
4. Treat `search_research` as retrieval, not generation. Search ranks candidate content, but every returned `content` object is canonical JSON from the Study or Report API and `generated_content_returned` is always `false`. Never present ranking or a generated answer as statistical confidence or population prevalence.
5. Inspect every entry in `studies`. Check its `index_status`, `latest_report_id`, `indexed_report_id`, and grouped `results` for search, or its status fields for answers. A `not_indexed` study is different from a `ready` study with no matching results; an `updating` study may still return matches from `indexed_report_id`. Do not generate or regenerate a report unless the user separately asks for fresh analysis.
6. Interpret each search result using its parent `study_id` plus its `report_id`, `report_generated_at`, `content_type`, and `content_id`. Study findings and participant profiles match report-section objects; participant responses include a public `interview_id` to use with `get_interview`; study plans match `get_study.study_plan`.
7. Resolve a finding's `reference_ids` through `get_study_report.references` and fetch the supporting interview when the user needs source context or a verbatim quote. A summary is not a verbatim quote, and repeated matches from one interview are not independent participants.
8. Return the relevant evidence grouped by study, including source identifiers, index coverage, contradictions, and remaining uncertainty. An empty result set does not prove the topic was absent from every interview. Keep recommended next steps labeled as proposals and include them only when relevant.

Do not create studies, regenerate reports, invite people, or incur recruitment costs as a side effect of searching. The calling agent decides whether the evidence answers the question and whether a separate research task is needed.

[API reference](https://docs.userintuition.ai/api-reference/introduction).

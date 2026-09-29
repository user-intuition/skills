---
name: search-research
description: Use when the user wants to find existing User Intuition findings or participant responses across authorized studies before deciding whether more qualitative research is needed.
---

1. Turn the user's information need into a query and identify at least one authorized `study_id`. Preserve any supplied date or content-type constraints; do not add filters without a reason grounded in the request.
2. Call `search_research` with `filters.study_ids` and, when useful, `content_types`, `research_date_from`, or `research_date_to`. Supported content types are `study_plan`, `study_finding`, `participant_profile`, `participant_response`, and `recommended_next_step`. Use a limit from 1–50. Omit `cursor` or pass `null`; this release does not paginate.
3. Treat search as retrieval, not generation. Gemini selects candidate content, but every returned `content` object is canonical JSON from the Study or Report API and `generated_content_returned` is always `false`. Never present ranking as statistical confidence or population prevalence.
4. Inspect every entry in `studies`. Check its `index_status`, `latest_report_id`, `indexed_report_id`, and grouped `results`. A `not_indexed` study is different from a `ready` study with no matching results; an `updating` study may still return matches from `indexed_report_id`. Do not generate or regenerate a report unless the user separately asks for fresh analysis.
5. Interpret each result using its parent `study_id` plus its `report_id`, `research_date`, `content_type`, and `content_id`. Study findings and participant profiles match report-section objects; participant responses contain the call analysis `overall_takeaways`, `key_questions`, and `call_id`; study plans match `get_study.study_plan`.
6. Resolve a finding's `reference_ids` through `get_study_report.references`. Use each reference's `call_id` or `interview_id` to fetch the supporting interview when the user needs source context or a verbatim quote. Participant responses already carry their originating `call_id`. A summary is not a verbatim quote, and repeated matches from one call are not independent participants.
7. Return the relevant evidence grouped by study, including source identifiers, index coverage, contradictions, and remaining uncertainty. An empty result set does not prove the topic was absent from every interview. Keep recommended next steps labeled as proposals and include them only when relevant.

Do not create studies, regenerate reports, invite people, or incur recruitment costs as a side effect of searching. The calling agent decides whether the evidence answers the question and whether a separate research task is needed.

[API reference](https://docs.userintuition.ai/api-reference/introduction).

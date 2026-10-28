---
name: analyze-completed-study
description: Use when the user wants findings, themes, evidence, or a report from completed User Intuition interviews.
allowed-tools: Read
---

When the user asks for analysis:

1. Identify the study with `list_studies`; disambiguate similar names. Call `get_study` for full context.
2. Call `list_interviews` with the `study_id` to inspect available evidence. Do not use a universal sample-size threshold as an adequacy rule.
3. Call `get_study_report`. If no report exists or it is stale and the user asked for fresh analysis, call `generate_report`, poll `get_report_job` with its job ID until it succeeds, then fetch the saved report.
4. For questions about findings, comparisons, or quotations, reuse or create an organization Hub session, sync only the requested missing study sources, and use `chat_research_session` or `queue_research_chat`. Poll `inspect_research_session` with `view: "job"` when needed. After completion, call `view_research_answer` to display the answer and exact citation labels in the conversation. Reuse the session and the last completed `parent_job_id` for follow-ups.
5. For load-bearing findings, call `get_interview` on the supporting interview IDs and verify evidence in the returned messages. Never invent quotes or attribute a claim to an interview you did not fetch.
6. Summarize findings separately from evidence appraisal: give the concise headline, key metrics, 3–5 themes, within-sample prevalence, impact, verbatims, contradictions, interpretation limits, and decision relevance. Never present an observed sample count as population prevalence.
7. Interpret Evidence Coverage as an appraisal of the evidence behind those findings, not another findings summary. Report the saved sample-adequacy boundary, evidence available per Learning Goal, coverage limitations, decision boundaries, and prioritized gaps. Use the saved sample size for report scope; do not aggregate per-interview explored/answered states into a separate study-level metric. There is no universal minimum-N rule. Present only the report's valid gap-linked recommendations, including a valid empty list; distinguish unavailable assessment from no additional research proposed. Missing analysis does not by itself justify recruitment. The researcher or calling agent decides whether the evidence is adequate for the intended decision.

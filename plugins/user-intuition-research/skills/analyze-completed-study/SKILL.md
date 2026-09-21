---
name: analyze-completed-study
description: Use when the user wants findings, themes, evidence, or a report from completed User Intuition interviews.
---

When the user asks for analysis:

1. Identify the study with `list_studies`; disambiguate similar names. Call `get_study` for full context.
2. Call `list_interviews` with the `study_id` to inspect available evidence. Do not use a universal sample-size threshold as an adequacy rule.
3. Call `get_study_report`. If no report exists or it is stale and the user asked for fresh analysis, call `generate_report`, then fetch the report again.
4. For load-bearing findings, call `get_interview` on the supporting interview IDs and verify evidence in the returned messages. Never invent quotes or attribute a claim to an interview you did not fetch.
5. Summarize findings separately from evidence appraisal: give the concise headline, key metrics, 3–5 themes, within-sample prevalence, impact, verbatims, contradictions, interpretation limits, and decision relevance. Never present an observed sample count as population prevalence.
6. Interpret Evidence Coverage as an appraisal of the evidence behind those findings, not another findings summary. Report the saved sample-adequacy boundary, evidence available per Learning Goal, coverage limitations, decision boundaries, and prioritized gaps. Preserve typed response coverage and missing-analysis reasons for diagnostics, but do not foreground those counts unless they create a material limitation. Response coverage is not adequacy, and there is no universal minimum-N rule. Present only the report's valid gap-linked recommendations, including a valid empty list; distinguish unavailable assessment from no additional research proposed. Missing analysis does not by itself justify recruitment. The researcher or calling agent decides whether the evidence is adequate for the intended decision.

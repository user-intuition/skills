---
name: create-study-from-brief
description: Use when the user wants to create a User Intuition interview study from a brief, goal, problem, or research idea.
---

When the user asks to create a study:

Apply the shared [approval and workflow continuity policy](../../references/approval-continuity.md).

1. Ask Panel versus BYOP when unstated. Set `recruiting_method` to `panel` when User Intuition should recruit, or `byop` when the user supplies participants. Never guess.
2. Keep the name to 40 characters. Unless the user requests an override, omit `interview_format`, `language`, and `voice` so `create_study` applies the current defaults: a voice interview in English with Elliot. If the user requests another mode or language, use `list_available_modes` or `list_available_languages` for discovery. The public voice override is `male` (Elliot) or `female` (Clara); provider-specific IDs from `list_voices` are not accepted. Never supply `voice` for chat.
3. Use `list_study_types` only when the user needs help choosing a type. Do not draft a plan from its prompts; the backend applies the selected type's current Customize Plan instructions.
4. Call `create_study` with ordinary metadata only.
5. Call `customize_study` with the user's natural-language brief, including their audience, screening needs, and requested concept links or images. Do not construct a plan, targeting attributes, screeners, duration, or concept objects in the MCP host.
6. If `response_type` is `question`, relay the question to the user and call `customize_study` again with their answer. Never decide for them.
7. When customization completes, call `get_study`. Return the complete persisted study plan in a readable form together with its audience, screeners, concepts, interview settings, and `provisioning_status`. Do not replace it with a summary or dashboard link.
8. Ask the user to approve that exact plan version or request revisions. On approval, retain the shared checkpoint. Send revisions through `customize_study`, fetch the study again, and invalidate the checkpoint when the returned marker changes.
9. Verify `provisioning_status` is `provisioned` before fielding. Return the study ID and, when present, both `dashboard_url` and `study_link`; label `study_link` as the live participant interview link, not a preview. Never create BYOP participants or launch a paid Panel without current-plan approval. Panel launch also requires a dry-run and separate approval of its complete estimate.

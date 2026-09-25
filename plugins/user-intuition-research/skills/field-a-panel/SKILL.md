---
name: field-a-panel
description: Use when the user wants to estimate, launch, pause, resume, or stop recruitment for a User Intuition Panel study.
---

When the user wants to field a Panel:

1. Call `get_study` and verify `recruiting_method` is `panel` and `provisioning_status` is `provisioned`.
2. Return the complete current `study_plan` in a readable form together with its audience, screeners, concepts, and interview settings. Obtain explicit approval of that exact plan version before a paid launch; approval of study creation, a prior plan, or the cost estimate does not count.
3. Ask the user to choose one launch country explicitly. Never infer a country from language, location, account data, or a broad region. Each launch fields exactly one country; multi-country work requires separately reviewed country-specific studies or launches.
4. Call `list_panel_countries` to verify that the chosen country supports the study language.
5. If targeting is requested or needs to change, use `customize_study`, complete any questions with the user, then call `get_study`, return the complete revised plan, and obtain approval of the revised version.
6. If `incident_rate` is below 10 or the audience is unusually specialized, use `submit_feasibility_request` instead of direct launch.
7. Call the read-only `estimate_panel` with the explicit `country_code` first. Show the resolved country, language, target, incident rate, estimated cost, and timeline (a heuristic). Retain its `estimate_id`.
8. Wait for explicit approval of that complete estimate. Never infer approval from the original request, plan approval, or client permission settings. If the estimate expires or relevant study, launch, balance, or price inputs change, get a fresh estimate and approval.
9. After approval, call `launch_panel` with the `estimate_id` and the same settings and country. Report what was launched. If the result is uncertain after a timeout, retrieve the current study state before considering another launch.
10. Use `pause_study` to preserve progress and the reward hold, `resume_study` to continue, and `stop_study` to end recruitment and settle or release the hold. Confirm before stopping.

---
name: design-screeners
description: Use when the user wants to screen participants, define qualification criteria, or target a Panel study.
---

When the user asks to change screening:

Apply the shared [approval and workflow continuity policy](../../references/approval-continuity.md). A screener or targeting change invalidates the affected plan and launch checkpoint.

1. Call `get_study` before writing. If a Panel study is fielding, ask whether to `pause_study` or `stop_study` before editing.
2. Call `customize_study` with the user's audience or screening request in ordinary language. Do not create targeting IDs or screener schemas yourself.
3. Let Customize Plan match standard criteria such as age or household income to canonical targeting attributes. It should use custom screeners only where appropriate.
4. If it returns `response_type: "question"`, relay the question and send the user's answer back through `customize_study`. Never answer on their behalf.
5. Never add recording-consent or willingness-to-participate questions. Do not add screening the user did not request.
6. Call `get_study` and return the complete revised plan in a readable form together with persisted targeting, screeners, concepts, settings, and likely recruitment tradeoffs.
7. Ask the user to approve that exact revised plan version. An approval given before the screening change no longer covers the study.
8. If the study was paused and recruitment should continue, call `resume_study` only after the update is verified and the revised plan is approved.

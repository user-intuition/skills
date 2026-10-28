---
name: investigate-drop-off
description: Use when the user wants to understand why people drop off, abandon a cart or checkout, fail to finish signup or onboarding, or stop using a feature, and wants to interview the people behind a funnel or analytics drop-off from PostHog, Mixpanel, Amplitude, or another analytics tool.
---

When the user wants to understand a drop-off:

Apply the shared [cohort invite policy](../../references/cohort-invite-policy.md) and [approval and workflow continuity policy](../../references/approval-continuity.md).

1. Ask which step matters and what decision the interviews should inform. Read the funnel with the analytics tools the agent has, and report the step, the drop-off rate, and the window.
2. Find the people who reached the step and did not complete it, in the chosen window (default: the last 14 days). Only identified users with an email can be invited; report how many dropped off in total versus how many are reachable.
3. Exclude people who completed the step later, internal and test users, and anyone who has not agreed to be contacted.
4. Filter, show the cohort, and get approval of the exact batch and cap as the cohort policy requires.
5. Use an existing BYOP study or create one with `create-study-from-brief`. A good brief asks them to walk through what they were trying to do, what happened at the step, what they did next instead, and what would have made them continue. The numbers say where; the interviews say why.
6. Call `create_participants` with the approved batch, passing `external_id` and `metadata` such as `funnel_step` and `last_seen`.
7. Report the invitations created. When interviews complete, offer `analyze-completed-study` and set the themes next to the funnel numbers.

---
name: interview-cancellations
description: Use when the user wants to understand why subscribers or members cancelled, churned, downgraded, or paused, run a churn or cancellation interview study, or talk to people who just cancelled, using subscription data from Stripe, a billing system, or an export.
---

When the user wants to hear from people who cancelled:

Apply the shared [cohort invite policy](references/cohort-invite-policy.md) and [approval and workflow continuity policy](references/approval-continuity.md).

1. Ask what decision the interviews should inform and which cancellations count: full cancellations only, or downgrades and pauses too, and which plans or products.
2. Find cancellations in the chosen window (default: the last 30 days) with the billing tools the agent has (a Stripe or other billing MCP) or an export. Keep email, customer ID, plan, start date, cancellation date, and any cancellation reason the customer gave.
3. Exclude involuntary churn such as failed payments unless the human wants it, refunds or disputes being handled separately, and customers who have already resubscribed.
4. Filter, show the cohort, and get approval of the exact batch and cap as the cohort policy requires. Interview soon after cancellation; memory of the decision fades within weeks.
5. Use an existing BYOP study or create one with `create-study-from-brief`, choosing the churn study type when the user wants help picking one. A good brief covers why they first subscribed, the moment they decided to cancel, what they use instead, and what would have kept them. Treat a stated cancellation reason as a starting point, not the answer.
6. Call `create_participants` with the approved batch, passing `external_id` and `metadata` such as `plan`, `tenure_months`, and `stated_reason`. Never pass payment details.
7. Report the invitations created and offer `analyze-completed-study` when interviews complete.

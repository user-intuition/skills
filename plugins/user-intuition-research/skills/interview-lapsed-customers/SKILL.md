---
name: interview-lapsed-customers
description: Use when the user wants to understand why customers stopped buying, did not reorder, switched brands, or went quiet, interview lapsed or one-time buyers, or win back customers, using order history from Shopify, a store, a CRM, loyalty-card or retailer data, or a customer export.
allowed-tools: Read
---

When the user wants to hear from lapsed customers:

Apply the shared [cohort invite policy](references/cohort-invite-policy.md) and [approval and workflow continuity policy](references/approval-continuity.md).

1. Ask what counts as lapsed for this business. Default: bought at least once, no order in the last 90 days, and a previous order within the last 12 months. Adjust to the product's normal repurchase cycle.
2. Find those customers with the store or CRM tools the agent has, or a customer or loyalty-card export with last purchase date. If the user has no customer data, use `interview-brand-switchers` to recruit lapsed brand buyers from the consumer panel instead. Keep email, customer ID, first and last order dates, order count, and what they last bought.
3. Exclude anyone with an open order, an open complaint the human wants handled separately, or an active subscription.
4. Filter, show the cohort, and get approval of the exact batch and cap as the cohort policy requires.
5. Use an existing BYOP study or create one with `create-study-from-brief`. A good brief covers their last purchase, what they buy instead now and when they switched, the moment the habit changed, and what would bring them back. Ask about what they did, not only why.
6. Call `create_participants` with the approved batch, passing `external_id` and `metadata` such as `last_order_date`, `order_count`, and `last_product`.
7. Report the invitations created and offer `analyze-completed-study` when interviews complete.

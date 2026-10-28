---
name: interview-recent-buyers
description: Use when the user wants to interview recent buyers or new customers, understand why people bought, what the shopper trip or purchase decision looked like, what nearly stopped the order, or how a first order, product, or pack is landing, using orders from Shopify or another store.
---

When the user wants to hear from recent buyers:

Apply the shared [cohort invite policy](../../references/cohort-invite-policy.md) and [approval and workflow continuity policy](../../references/approval-continuity.md).

1. Ask what decision the interviews should inform (for example: which claim to lead with on the pack, why first orders skew to one product, what nearly stopped checkout) and which buyers matter: first-time or repeat, a product or collection, a channel.
2. Find orders in the chosen window with the store tools the agent has (a Shopify or other commerce MCP) or an order export. Keep one row per customer: email, customer ID, order date, and the products bought.
3. Leave a gap after delivery so buyers have used the product: by default, orders delivered at least 7 days ago.
4. Filter, show the cohort, and get approval of the exact batch and cap as the cohort policy requires.
5. Use an existing BYOP study for this audience or create one with `create-study-from-brief`. A good brief covers the trigger moment, the alternatives they weighed, the shelf or page moment that decided it, first use, and what would make them buy again.
6. Call `create_participants` with the approved batch, passing the customer ID as `external_id` and order context such as `order_date` and `product` as `metadata`.
7. Report the invitations created, and offer `monitor-fielding` for progress and `analyze-completed-study` once interviews complete.

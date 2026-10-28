---
name: map-shopper-journey
description: Use when the user wants to map the shopper journey or path to purchase, understand a shopping trip in store or online, what happens at the shelf or on the product page, how shoppers build a list, substitute, or decide in the aisle, or run shopper marketing research for a brand or retailer.
---

When the user wants to map the shopper journey:

Apply the shared [consumer panel study policy](../../references/consumer-panel-study.md) and [approval and workflow continuity policy](../../references/approval-continuity.md).

1. Ask which trip and which decision: the category, the retailer or channel (in store, online, delivery app), and what the user will change (shelf placement, pack, promotion, page content, assortment).
2. Define the shoppers by a recent trip: bought the category at that retailer or channel in the last 2–4 weeks, so the trip is fresh. Use the panel by default; use `interview-recent-buyers` if the user has their own order or loyalty data.
3. Create the study with `create-study-from-brief` (Panel). A good brief walks the trip in order: the trigger for the trip, the list or plan, arriving at the shelf or page, what they noticed first, what they compared, what nearly stopped them, any substitution when an item was missing, checkout, and first use at home. Each stage should anchor on what they did on that trip.
4. Sharpen screening with `design-screeners`, then estimate and launch with `field-a-panel`. Use one study per country. The human approves the saved plan, then the complete quote, before anything is spent.
5. When interviews complete, offer `analyze-completed-study` and lay the findings out stage by stage, with the friction moments counted per stage.

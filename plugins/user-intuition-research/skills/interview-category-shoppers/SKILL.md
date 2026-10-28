---
name: interview-category-shoppers
description: Use when the user wants to interview shoppers or buyers of a product category or brand, such as frozen pizza buyers, coffee drinkers, pet food buyers, or skincare shoppers, understand how consumers choose in a category, or run consumer insights or shopper research for a CPG brand or retailer, recruiting consumers who match a buying profile.
---

When the user wants to hear from category or brand shoppers:

Apply the shared [consumer panel study policy](../../references/consumer-panel-study.md) and [approval and workflow continuity policy](../../references/approval-continuity.md).

1. Ask what decision the interviews should inform: positioning, a range or assortment choice, a new variant, a price move, or a brand-health read.
2. Define the shoppers by behavior: category bought in the window, purchase frequency, usual retailer or channel, brand bought most often. Ask whether to include buyers of competing brands and lapsed category buyers; a mix usually tells more than the user's buyers alone.
3. If the user sells direct or has loyalty data and wants their own customers, use `interview-recent-buyers` instead.
4. Create the study with `create-study-from-brief` (Panel). When the user wants help choosing a type, the brand-health type suits perception and comparison work; an in-depth interview suits open exploration. A good brief covers the last purchase occasion, how they chose among the brands on shelf or on the page, what the brand stands for to them, and what would make them switch.
5. Sharpen screening with `design-screeners`, then estimate and launch with `field-a-panel`. The human approves the saved plan, then the complete quote, before anything is spent.
6. When interviews complete, offer `analyze-completed-study`, splitting findings by brand bought most often.

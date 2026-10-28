---
name: interview-brand-switchers
description: Use when the user wants to understand why shoppers switch brands, trade down to store brands or private label, stopped buying a brand, or chose a competitor, and wants to interview switchers or lapsed brand buyers recruited from a consumer panel rather than from their own customer list.
allowed-tools: Read
---

When the user wants to hear from brand switchers:

Apply the shared [consumer panel study policy](references/consumer-panel-study.md) and [approval and workflow continuity policy](references/approval-continuity.md).

1. Ask which switch matters: away from the user's brand, toward it, or to store brands, and in what window (default: switched in the last 6 months).
2. Define the audience by behavior: used to buy brand A regularly, now buys brand B most often, with the timing of the change. Include a small group who considered switching and stayed, if the user wants to learn what holds people.
3. If the user has their own order or loyalty data showing who stopped buying, use `interview-lapsed-customers` instead.
4. Create the study with `create-study-from-brief` (Panel). A good brief covers the last purchase of the old brand, the moment the habit changed (price, availability, a promotion, a recommendation, a pack or recipe change), the first purchase of the new brand, how it compares in use, and what would bring them back. Ask what they did before asking why.
5. Sharpen screening with `design-screeners`, then estimate and launch with `field-a-panel`. The human approves the saved plan, then the complete quote, before anything is spent.
6. When interviews complete, offer `analyze-completed-study`, grouping findings by switch trigger.

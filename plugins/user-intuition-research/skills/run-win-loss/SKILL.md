---
name: run-win-loss
description: Use when the user wants to run win-loss interviews, understand why deals were won or lost, interview buyers after a decision, or learn why prospects chose a competitor, using closed deals from HubSpot, Salesforce, or another CRM.
---

When the user wants win-loss interviews:

Apply the shared [cohort invite policy](references/cohort-invite-policy.md) and [approval and workflow continuity policy](references/approval-continuity.md).

1. Ask which decisions to cover: lost, won, or both (both is usually more useful), the window (default: closed in the last 60 days), and any segment, product line, or competitor of interest.
2. Find closed deals with the CRM tools the agent has (a HubSpot, Salesforce, or other CRM MCP) or an export. For each deal, pick the buyer contact who made or led the decision and keep their email, contact ID, deal stage, close date, and the competitor if recorded.
3. Exclude deals still in negotiation, contacts the account owner has asked not to be contacted, and anyone the sales team is actively re-engaging, unless the human approves.
4. Filter, show the cohort, and get approval of the exact batch and cap as the cohort policy requires. Confirm with the human that the account owners are aware.
5. Use an existing BYOP study or create one with `create-study-from-brief`, choosing the win-loss study type when the user wants help picking one. A good brief covers the trigger for the evaluation, the alternatives considered, the moment the decision tipped, how the buying group agreed, and what the vendor did that helped or hurt.
6. Call `create_participants` with the approved batch, passing `external_id` and `metadata` such as `outcome`, `close_date`, and `competitor`. Never pass deal values or internal notes.
7. Report the invitations created and offer `analyze-completed-study`, splitting won and lost, once interviews complete.

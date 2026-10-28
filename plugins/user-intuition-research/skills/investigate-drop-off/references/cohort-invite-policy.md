# Cohort invite policy

Use this shared policy whenever a workflow finds people from a business event
(an order, a lapse, a cancellation, a closed deal, a funnel drop-off) and invites
them to a User Intuition interview.

This is an agent-run batch. The agent finds the cohort and sends one approved
batch of invitations. It is not an automatic trigger: nothing fires on future
events unless the human sets that up separately and approves it.

## 1. Find the cohort

Use whichever tool the agent already has for the source system: a commerce,
billing, CRM, or analytics MCP, or a CSV export the human provides. Read only
what the cohort needs: email, a stable customer ID, the event, its date, and
at most a few attributes worth passing as interview context. If no tool or file
is available, ask for an export instead of guessing.

## 2. Filter before anyone sees a list

- Keep the event window the human chose (default: the last 30 days).
- Remove people who unsubscribed, opted out of research or marketing contact, or
  whom the human's own policy says not to contact.
- Remove staff, test, and internal accounts.
- Remove anyone already invited to this study (`list_participants`) and
  deduplicate email addresses case-insensitively.

## 3. Show the cohort and get approval

Report the total found, how many each filter removed, the count that remains,
and a sample of up to ten rows. Propose an invite cap. The default is 25 per
batch; `create_participants` accepts at most 100 per request. If the cohort is
larger than the cap, say how the batch will be chosen (most recent first, or a
random sample).

Wait for the human to approve the exact batch and cap. Approval of the study
plan does not approve a batch, and approval of one batch does not approve the
next.

## 4. Field through the study

The study must be a BYOP study that is `provisioned`, with its current plan
approved under the [approval and workflow continuity policy](approval-continuity.md).
If no suitable study exists, create one with `create-study-from-brief` first.

Call `create_participants` with the approved batch. Set `external_id` to the
source system's customer ID and pass up to 20 short `metadata` attributes (for
example `order_date`, `product`, `plan`, `deal_stage`). Never pass payment details,
full addresses, or free-text notes. Offer `silent: true` when the human wants to
create the records without sending invitations yet.

Verify with `list_participants` and report how many invitations were created
and sent.

## 5. Repeat runs

To run again later, start from step 1 with a new window. Never set up a
recurring schedule, automation, or webhook that sends invitations without the
human's explicit approval of that schedule, its cap, and its stop condition.

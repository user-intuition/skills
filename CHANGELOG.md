# Changelog

Versions follow the plugin version in `plugins/user-intuition-research/.claude-plugin/plugin.json`.

## 1.6.0: consumer insights and practice run (unreleased)

- Consumer insights skills for CPG and retail: category and brand shoppers, brand switchers, shopper journey (path to purchase), and usage and attitudes, recruited from the consumer panel through behaviour-based screeners.
- `run-a-concept-test` covers packaging, claims and messaging tests.
- `interview-recent-buyers` and `interview-lapsed-customers` accept loyalty-card, retailer or store exports.
- A tool-free practice run of the discussion guide before approval, labelled "Practice run, not findings".
- Shared policy files ship inside each skill's own `references/` folder, so `npx skills add` installs keep working links.

## 1.5.0: cohort skills and agent packaging

- Five cohort skills: `interview-recent-buyers`, `interview-lapsed-customers`, `interview-cancellations`, `run-win-loss`, `investigate-drop-off`, with a shared cohort invite policy.
- `setup` skill: checks the connection and routes you to the right workflow.
- Cursor plugin manifest (`.cursor-plugin/plugin.json`).
- Per-skill Desktop ZIPs (`scripts/build-desktop-zip.mjs`) and a tag-only release workflow.
- README install matrix for Claude Code, Claude Desktop and claude.ai, Codex, Cursor, ChatGPT and any agent via `npx skills add`.

## 1.4.0: front door

- `user-research` skill: plan a study or synthesize research you already have with no account, then hand off to fielding with real people.
- The exporter marks which skills need an account.

## 1.3.3

- Skills aligned with the current planning and approval flows: queued study customization, human or delegated design decisions, synthetic respondents as a recruiting choice (chat only), and `estimate_panel` before every paid launch, which still needs separate approval of the plan and the quote.
- Organization context: resolve the workspace with `list_organizations` and verify it with `get_account` before estimates and approvals.

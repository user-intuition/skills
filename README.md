# Run real qualitative research from your AI agent

Ask your agent to run a concept test with 20 frozen-dinner buyers. It drafts the study, shows you the plan and the cost, and once you confirm, it fields AI-moderated interviews (typically 20–30 minutes) and returns findings with verbatim quotes.
Interviews ladder 5–7 levels deep, from what people did to why it matters to them. Participants come from a vetted 4M+ consumer panel or from your own customers, by voice, chat or video in 80+ languages.
No account yet? Ask for help with any research question: the `user-research` skill plans the study or synthesizes research you already have, then fields it with real people when you're ready.

These are Agent Skills for running qualitative research with [User Intuition](https://www.userintuition.ai): create interview studies, design screeners, field panel recruits, and turn transcripts into stakeholder-ready findings. The plugin bundles the hosted [User Intuition MCP server](https://docs.userintuition.ai/mcp-server/overview) for the *tools* and the skills for the *play*: the workflow, guardrails, and order of operations that make research runs reproducible.

**Works with:** Claude Code (plugin), Claude Desktop and claude.ai (connector and skill ZIPs), ChatGPT (connector), Codex, Cursor, and any agent that reads Agent Skills.

**Guides:** [Set up User Intuition in Claude](https://www.userintuition.ai/reference-guides/claude-mcp-customer-research-setup/) · [Skills docs](https://docs.userintuition.ai/skills/overview) · [How quality is controlled](https://www.userintuition.ai/quality/) · [Pricing](https://www.userintuition.ai/pricing/)

## Example run

This is the shape of a run. The prompt is illustrative; the findings come from the public [Walmart shopper study](https://www.userintuition.ai/preview/).

1. **Prompt.** "Find out where Walmart shoppers get stuck on a trip, and whether it changes whether they come back."
2. **Saved plan.** The agent drafts the study from the brief (audience, screener, discussion guide) and shows you the plan before anything is created.
3. **Estimate.** For a panel study it gets a quote and stops. Nothing launches, and nothing is spent, until you approve the plan and the quote. The cost depends on audience and size; see [pricing](https://www.userintuition.ai/pricing/).
4. **Findings excerpt.** From 43 interviewed shoppers, each finding linked back to what participants said:
   - 34 of 43 hit at least one obstacle on their trip.
   - 36 of 43 will shop there again.
   - The shelf carried 20 of 51 coded friction moments, more than any other stage.
   - 19 of 43 named the shelf as the moment that shaped the trip.

## Install

Every surface uses the same hosted MCP server (`https://mcp.userintuition.ai/mcp`, browser sign-in) and the same skill files. After installing, ask your agent: **"Help me get started with User Intuition."** The `setup` skill checks the connection and routes you to the right workflow.

| Agent | Skills | MCP connection |
|-------|--------|----------------|
| **Claude Code** | `/plugin marketplace add user-intuition/skills`, then `/plugin install user-intuition-research@user-intuition` | Bundled with the plugin. Run `/mcp`, select `user-intuition`, and sign in. |
| **Claude Desktop / claude.ai** | Download a skill ZIP from [Releases](https://github.com/user-intuition/skills/releases) and upload it in Settings → Capabilities → Skills. One ZIP per skill; the bundle ZIP holds all of them. | Settings → Connectors → add a custom connector with `https://mcp.userintuition.ai/mcp`. |
| **Codex** | `npx skills add user-intuition/skills -a codex` | `codex mcp add user-intuition --url https://mcp.userintuition.ai/mcp`, then `codex mcp login user-intuition`. |
| **Cursor** | Install the plugin defined in [`.cursor-plugin/plugin.json`](.cursor-plugin/plugin.json), or `npx skills add user-intuition/skills -a cursor` | Bundled with the plugin, or add `https://mcp.userintuition.ai/mcp` under Settings → MCP. Sign in when prompted. |
| **ChatGPT** | Skills ship inside the User Intuition app. | Settings → Apps & Connectors → User Intuition, then sign in. |
| **Any other agent** | `npx skills add user-intuition/skills` (pick your agent when asked, or pass `-a <agent>`) | Add `https://mcp.userintuition.ai/mcp` as a remote MCP server in your client. |

Install a single skill with `npx skills add user-intuition/skills -s create-study-from-brief`. To build the Desktop ZIPs yourself, run `node scripts/build-desktop-zip.mjs` (output in `dist/`).

### Raw files

Each skill is a standalone Markdown file under `plugins/user-intuition-research/skills/<name>/SKILL.md`. You can also tell your agent:

> Fetch https://raw.githubusercontent.com/user-intuition/skills/main/catalog.json, select the workflow needed for the task, and fetch its raw `SKILL.md`. Install it in the skill directory supported by your agent client.

## Connect your account

The Claude plugin includes the hosted MCP connection:

```text
https://mcp.userintuition.ai/mcp
```

After installing the plugin, open `/mcp`, select `user-intuition`, and complete the browser-based OAuth flow. Claude stores and refreshes the resulting token securely.

If you prefer a local stdio connection instead of the bundled hosted connection, disable the plugin-provided MCP and use:

```bash
claude mcp add userintuition -- npx -y @userintuition-ai/mcp@latest
```

with `USERINTUITION_API_KEY` set (get a key from your [dashboard](https://app.userintuition.ai)).

## The skills

| Skill | Outcome |
|-------|---------|
| `setup` | Check the connection, ask what you want to learn, and route to the right workflow |
| `user-research` | Plan a study or synthesize research you already have, no account needed; then field it with real people |
| `interview-category-shoppers` | Interview category or brand shoppers recruited from the consumer panel by what they buy |
| `interview-brand-switchers` | Hear why shoppers switched brands or traded down, recruited from the consumer panel |
| `map-shopper-journey` | Map the path to purchase, from trip trigger to shelf or page to first use |
| `run-usage-and-attitudes` | Usage and attitudes: occasions, habits, needs, and brand repertoire |
| `interview-recent-buyers` | Interview people who just bought, from Shopify or any store's orders |
| `interview-lapsed-customers` | Find customers who stopped buying and hear why |
| `interview-cancellations` | Interview subscribers soon after they cancel, from Stripe or any billing data |
| `run-win-loss` | Interview buyers on closed won and lost deals from HubSpot or any CRM |
| `investigate-drop-off` | Interview the people behind a funnel drop-off from your analytics tool |
| `create-study-from-brief` | Turn a research brief into a launch-ready interview study |
| `design-screeners` | Recruit exactly the right respondents — panel and custom screeners, done safely |
| `field-a-panel` | Recruit N respondents from the panel, with cost approved before any spend |
| `invite-your-own-participants` | Interview your own customers — invites, share links, and rewards |
| `run-a-concept-test` | Put a concept, prototype, or landing page in front of participants |
| `monitor-fielding` | Daily digest of every fielding study — progress, quality, stalls |
| `analyze-completed-study` | From transcripts to stakeholder-ready findings, with real quotes only |
| `curate-interview-quality` | Review low-quality interviews and delete only the exact interviews the user confirms |
| `retrieve-study-results` | Read an existing report and follow source references without regeneration |
| `search-research` | Find authorized prior evidence and inspect coverage and sources |

The original eight fielding and analysis workflows retain their validated MCP behavior. Retrieval and search use current tool/schema discovery; illustrative B2/C1 adapters still require release verification. Check any named tool yourself:

```bash
npx -y @userintuition-ai/mcp describe create_study
```

## Machine discovery

[Catalog](https://raw.githubusercontent.com/user-intuition/skills/main/catalog.json): names, descriptions, raw file URLs, documentation URLs, and SHA-256 digests. Each skill is independently fetchable; loading the catalog does not require loading every workflow.

## Contributing

Maintainer workflow (catalog, tests, docs and website export) is in [CONTRIBUTING.md](CONTRIBUTING.md). Release notes are in [CHANGELOG.md](CHANGELOG.md).

## Docs

- [Skills overview](https://docs.userintuition.ai/skills/overview)
- [Skills library](https://docs.userintuition.ai/skills/library) (browsable version of these files)
- [MCP server reference](https://docs.userintuition.ai/mcp-server/overview)

## License

MIT

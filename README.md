# User Intuition Skills

Agent Skills for running customer research with [User Intuition](https://www.userintuition.ai) — create interview studies, design screeners, field panel recruits, and turn transcripts into stakeholder-ready findings.

The plugin bundles the hosted [User Intuition MCP server](https://docs.userintuition.ai/mcp-server/overview) for the *tools* and the skills for the *play*: the workflow, guardrails, and order of operations that make research runs reproducible.

## Install

### Claude Code (plugin marketplace)

```
/plugin marketplace add user-intuition/skills
/plugin install user-intuition-research@user-intuition
```

### Any agent (raw files)

Each skill is a standalone Markdown file under `plugins/user-intuition-research/skills/<name>/SKILL.md`. Claude Code discovers skills as one directory per skill — copy any of them to `~/.claude/skills/<name>/SKILL.md` — or tell your agent:

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
| `user-research` | Plan a study or synthesize research you already have, no account needed; then field it with real people |
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

## Maintaining docs and discovery

The skill files in this repository are canonical. After editing, run `npm run catalog`, then `npm test`. Commit the source before exporting pinned docs and website discovery:

```sh
node scripts/export-discovery.mjs --docs /path/to/userintuition-docs --website /path/to/ui-astro
```

The exporter generates individual documentation pages, the library index, a source manifest, and website discovery entries. It preserves the existing umbrella skill. Do not independently edit generated pages.

## Docs

- [Skills overview](https://docs.userintuition.ai/skills/overview)
- [Skills library](https://docs.userintuition.ai/skills/library) (browsable version of these files)
- [MCP server reference](https://docs.userintuition.ai/mcp-server/overview)

## License

MIT

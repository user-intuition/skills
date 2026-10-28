# User Intuition Skills

Agent Skills for running customer research with [User Intuition](https://www.userintuition.ai) — create interview studies, design screeners, field panel recruits, and turn transcripts into stakeholder-ready findings.

The plugin bundles the hosted [User Intuition MCP server](https://docs.userintuition.ai/mcp-server/overview) for the *tools* and the skills for the *play*: the workflow, guardrails, and order of operations that make research runs reproducible.

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

The original eight workflows retain their validated MCP behavior. Retrieval and search use current tool/schema discovery; illustrative B2/C1 adapters still require release verification. Check any named tool yourself:

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

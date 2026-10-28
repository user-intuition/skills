# Contributing

The skill files in this repository are canonical. Docs pages, the website discovery entries and the packaged copies (Desktop ZIPs, the ChatGPT/Codex plugin) are generated from them; never edit a generated copy by hand.

## Edit a skill

1. Edit `plugins/user-intuition-research/skills/<name>/SKILL.md` (and its `references/` if it has any).
2. Regenerate the catalog: `npm run catalog`.
3. Run the checks: `npm test`. This runs `scripts/check-skills.mjs` (expected skills, frontmatter, guardrail wording) and `scripts/export-discovery.mjs --check` (catalog and metadata are in sync).
4. If you add a skill, register it in `scripts/check-skills.mjs` and `skill-metadata.json`, add a row to the README skills table, and bump the plugin version in `plugins/user-intuition-research/.claude-plugin/plugin.json` and `.cursor-plugin/plugin.json`.
5. Add an entry to [CHANGELOG.md](CHANGELOG.md).

## Export docs and website discovery

Commit the source first, so exported pages pin to a real commit:

```sh
node scripts/export-discovery.mjs --docs /path/to/userintuition-docs --website /path/to/ui-astro
```

The exporter generates individual documentation pages, the library index, a source manifest, and website discovery entries. It preserves the existing umbrella skill. Do not independently edit generated pages.

## Build the Desktop ZIPs

```sh
node scripts/build-desktop-zip.mjs            # every skill, plus the bundle
node scripts/build-desktop-zip.mjs --skill setup
```

Output goes to `dist/` (gitignored). Shared `references/*.md` files are inlined into each skill's own `references/` folder. Release ZIPs are attached to GitHub Releases by `.github/workflows/release.yml` when a `v*` tag is pushed.

## Copy rules

Public copy in skills and this README follows the same claims as the website:

- Lead with depth, then trust, then modality, then cost.
- The panel is a vetted 4M+ consumer panel. B2B audiences are recruited to order; never describe them in the same sentence as the panel.
- Interviews are typically 20–30 minutes.
- No literal prices: link https://www.userintuition.ai/pricing/.
- Quality claims link https://www.userintuition.ai/quality/.
- Describe capabilities, never the infrastructure vendors behind them.
- Never invent findings, quotes or claims, including in examples.

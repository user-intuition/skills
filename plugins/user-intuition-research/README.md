# User Intuition Research

This plugin adds ten research workflow skills and a hosted User Intuition MCP connection to Claude Code. Use the skills to plan interview studies, design screeners, invite participants, monitor fielding, inspect interview quality, retrieve study results, and search prior research. The skills describe when to use the MCP tools and require explicit approval before actions that spend credits, send invitations, or delete interviews.

The bundled MCP connection uses `https://mcp.userintuition.ai/mcp` and browser-based OAuth. After installation, connect your User Intuition account in Claude Code with `/mcp`. Tool calls send the inputs needed for the requested research action to User Intuition, such as study briefs, screening criteria, participant invitations, study IDs, and search queries. Responses can return study plans, interview transcripts, reports, and source references from studies your account can access. No research data is bundled in this repository.

The hosted server now exposes the MCP 0.17.0 research tools. For a Hub session,
use `create_research_session`, `sync_research_study`, and
`inspect_research_session`; for an analysis run, use
`start_research_analysis`, `resume_research_analysis`, or
`cancel_research_analysis`. Rename and delete saved outputs with
`rename_research_output` and `delete_research_output`. These dedicated tools
replace the older `manage_research_session`, `run_research_analysis`, and
`manage_research_output` tools that used an `action` argument. The other study
skills and approval steps are unchanged.

See the [installation and workflow guide](https://docs.userintuition.ai/skills/overview), [MCP server reference](https://docs.userintuition.ai/mcp-server/overview), and [privacy policy](https://www.userintuition.ai/privacy-policy/). For help, contact [support@userintuition.ai](mailto:support@userintuition.ai).

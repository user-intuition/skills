# Demo capture: storyboard and checklist

> **Status: script only.** Kevin records this; it needs a signed-in account. Target length 30–60 seconds. Uses: README "Example run", directory listings, and the reviewer recording that MCP and app reviews ask for.

## What the viewer should take away

An agent turns a plain consumer question into a real interview study, shows the plan and the quote, waits for a human yes, and comes back with findings tied to what real people said.

## Storyboard

| # | Time | Screen | Action | On-screen caption (optional) |
|---|---|---|---|---|
| 1 | 0–5s | Claude Code (or Desktop) with the User Intuition plugin connected | Type: "Find out where Walmart shoppers get stuck on a trip, and whether it changes whether they come back." | Ask a research question in plain words |
| 2 | 5–15s | Agent response | The agent drafts the study and shows the saved plan: audience, screener, discussion guide. Scroll slowly so the learning goals are readable. | The plan comes first |
| 3 | 15–25s | Agent response | The agent shows the panel estimate and stops for approval. Pause on the "approve?" line. | Nothing launches without your yes |
| 4 | 25–30s | Agent response | Type "Yes, launch it." Cut before fielding (do not wait on screen). | |
| 5 | 30–50s | Agent response, or the report at https://www.userintuition.ai/preview/ | Ask for findings on the completed Walmart study. Show the counts with quotes: 34 of 43 hit at least one obstacle; the shelf carried 20 of 51 friction moments. Click one quote through to its interview. | Every finding links to what people said |
| 6 | 50–60s | End card | User Intuition logo, `github.com/user-intuition/skills`, docs.userintuition.ai | Real people. Real interviews. From your agent. |

Steps 1–4 can be recorded on a fresh draft study. Step 5 uses the existing Walmart study through read-only calls (`get_study_report`, `answer_research`), so no new spend is needed for the findings shot.

## Capture checklist

**Before recording**
- [ ] Use a demo organization or a clean workspace; no customer study names visible in history, sidebars or tabs.
- [ ] Plugin installed and `/mcp` shows `user-intuition` connected (sign-in done off camera).
- [ ] Terminal or window at 1280×800 or larger, font size up so text reads on a phone.
- [ ] Notifications off; hide the menu bar clock if the cut will be reused.
- [ ] Decide in advance whether step 4 actually launches. If it does, approve the quote off camera first; if not, cut after the approval prompt and say so in the caption.

**While recording**
- [ ] Never show an API key, token, email address, billing detail or the literal quote amount. Blur the estimate total if it is visible; the caption says "quote" and the listing links /pricing/.
- [ ] Show the approval stop clearly; it is the trust beat.
- [ ] Do not speed up the plan step so much that it reads as fake; trim waiting instead.

**After recording**
- [ ] Every number on screen comes from the Walmart study as published on /preview/. No other figures, no per-interview durations from that study.
- [ ] No infrastructure vendor names visible in the frame (tool logs, URLs, model pickers).
- [ ] Export 1080p MP4 plus a muted GIF of steps 1–3 for the README.
- [ ] Upload somewhere reviewer-accessible and record the URL in the hand-over note (the ChatGPT app review asks for `demo_recording_url`).

## Copy for captions and voiceover

Keep to the claims canon: interviews typically 20–30 minutes, laddering 5–7 levels deep; a vetted 4M+ consumer panel or your own customers; voice, chat or video in 80+ languages; cost via https://www.userintuition.ai/pricing/.

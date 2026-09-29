---
name: run-a-concept-test
description: Use when the user wants participants to react to a concept, prototype, design, or landing page during a User Intuition interview.
---

When the user wants a concept test:

Apply the shared [approval and workflow continuity policy](../../references/approval-continuity.md). A concept asset or plan change invalidates the affected checkpoint.

1. Follow the create-study-from-brief workflow and choose the correct metadata type. Use `study_type: "concept-test"` for a participant-facing concept image or non-interactive concept. Use `study_type: "prototype-test"` for a clickable prototype, staging site, live page, or web flow.
2. A concept image can use chat, voice, or video. A concept link cannot use chat: relay the backend's question and let the user choose voice or video rather than choosing for them. A prototype test also cannot use chat; use the default voice format or an explicitly requested video format.
3. Call `customize_study` with the user's goal and requested link or image. For a prototype include its URL, participant-facing label, intended tasks, audience, and learning goals. Let the backend structure the flow, check the asset, and reconcile it with the plan.
4. For an image whose bytes or readable local path are available, base64-encode the raw file and pass `concept_image` with its filename, MIME type, and the user's participant-facing label. Otherwise, a public downloadable URL and stable label can be sent in the message. If the client exposes only an opaque attachment reference, explain that client limitation and offer the available upload routes.
5. Relay every `response_type: "question"` to the user, including mode or asset confirmations, and send their answer back unchanged.
6. Call `get_study`, return the complete persisted plan and concept configuration, and obtain approval of that exact version. Never request credentials or promise that a login-protected URL can be used.
7. Field through the Panel or BYOP Skill only after provisioning and current-plan approval. Dry-run Panel cost and require separate confirmation before launch.

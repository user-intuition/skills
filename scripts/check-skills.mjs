import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsRoot = join(root, 'plugins', 'user-intuition-research', 'skills');
const continuityPath = join(root, 'plugins', 'user-intuition-research', 'references', 'approval-continuity.md');
const cohortPolicyPath = join(root, 'plugins', 'user-intuition-research', 'references', 'cohort-invite-policy.md');

const expectedSkills = [
  'analyze-completed-study',
  'create-study-from-brief',
  'curate-interview-quality',
  'design-screeners',
  'field-a-panel',
  'interview-cancellations',
  'interview-lapsed-customers',
  'interview-recent-buyers',
  'investigate-drop-off',
  'invite-your-own-participants',
  'monitor-fielding',
  'retrieve-study-results',
  'run-a-concept-test',
  'run-win-loss',
  'search-research',
  'setup',
  'user-research',
];

const removedReferences = [
  'ask_humans', 'create_panel', 'stop_panels', 'list_calls', 'get_call',
  'create_invite', 'send_reward', 'update_call', 'delete_call',
  'upload_concept_link', 'list_available_panel_questions', 'get_panel_question',
  'assistant_id', 'is_panel', 'system_prompt', 'enable_chat',
  'enable_video_recording', 'voice_config',
];

const requiredGuidance = {
  'user-research': [
    /no account/i,
    /behavior to reasoning to emotion or identity/i,
    /\*\*X of Y sources\*\*/,
    /never invent, merge, or tidy a quote/i,
    /userintuition\.ai\/methodology\//,
    /userintuition\.ai\/pricing\//,
    /`create-study-from-brief`/,
    /4M\+ consumer panel or your own customers\. B2B audiences are recruited to order\./,
  ],
  'create-study-from-brief': [
    /voice interview in English with Elliot/i,
    /complete persisted study plan/i,
    /exact plan version/i,
    /dashboard_url/,
    /study_link/,
  ],
  'design-screeners': [
    /complete revised plan/i,
    /exact revised plan version/i,
    /resume_study/,
  ],
  'field-a-panel': [
    /provisioning_status.*provisioned/i,
    /complete current `study_plan`/i,
    /Never infer a country/i,
    /resolved country, language, target, incident rate, estimated cost, and timeline/i,
  ],
  'invite-your-own-participants': [
    /provisioning_status.*provisioned/i,
    /complete current persisted study plan/i,
    /approval of that exact version/i,
  ],
  'run-a-concept-test': [
    /study_type: "concept-test"/,
    /study_type: "prototype-test"/,
    /concept link cannot use chat/i,
    /prototype test also cannot use chat/i,
    /complete persisted plan/i,
    /approval of that exact version/i,
  ],
};

const errors = [];
const continuity = readFileSync(continuityPath, 'utf8');
for (const rule of [
  /study_id/,
  /updated_at/,
  /do not ask the human to\s+approve the same plan again/i,
  /request ID identifies the attempt; it is not an idempotency guarantee/i,
  /plan\s+approval never doubles as approval to spend/i,
]) {
  if (!rule.test(continuity)) errors.push(`approval-continuity is missing required guidance: ${rule.source}`);
}
const cohortPolicy = readFileSync(cohortPolicyPath, 'utf8');
for (const rule of [
  /not an automatic trigger/i,
  /default is 25 per\s+batch/i,
  /at most 100 per request/i,
  /approve the exact batch and cap/i,
  /opted out of research or marketing contact/i,
  /Never set up a\s+recurring schedule/i,
]) {
  if (!rule.test(cohortPolicy)) errors.push(`cohort-invite-policy is missing required guidance: ${rule.source}`);
}
const cohortSkills = ['interview-cancellations',  'interview-lapsed-customers',  'interview-recent-buyers',  'investigate-drop-off',  'run-win-loss'];
const actualSkills = readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (JSON.stringify(actualSkills) !== JSON.stringify(expectedSkills)) {
  errors.push(`Expected skills ${expectedSkills.join(', ')}; found ${actualSkills.join(', ')}`);
}

const bodies = Object.fromEntries(actualSkills.map((name) => [
  name,
  readFileSync(join(skillsRoot, name, 'SKILL.md'), 'utf8'),
]));
const combined = Object.values(bodies).join('\n');

for (const name of [
  'create-study-from-brief', 'design-screeners', 'field-a-panel',
  'invite-your-own-participants', 'run-a-concept-test',
]) {
  if (!/approval-continuity\.md/.test(bodies[name] ?? '')) {
    errors.push(`${name} does not load the shared approval-continuity policy`);
  }
}

for (const name of cohortSkills) {
  for (const rule of [/cohort-invite-policy\.md/, /approval-continuity\.md/, /`create_participants`/, /`create-study-from-brief`/, /exact batch and cap/]) {
    if (!rule.test(bodies[name] ?? '')) errors.push(`${name} is missing required guidance: ${rule.source}`);
  }
}

if (!/fielding_status/.test(bodies['monitor-fielding'] ?? '') ||
    !/Zero completions alone is not proof/i.test(bodies['monitor-fielding'] ?? '')) {
  errors.push('monitor-fielding is missing explicit fielding-state safeguards');
}

for (const reference of removedReferences) {
  if (new RegExp(`\\b${reference}\\b`).test(combined)) {
    errors.push(`Removed MCP term found in installable Skills: ${reference}`);
  }
}

if (/Ask for `interview_format`[^\n]*when unstated/i.test(combined)) {
  errors.push('create-study-from-brief asks for interview settings instead of using v0.8.6 defaults');
}

for (const [name, rules] of Object.entries(requiredGuidance)) {
  for (const rule of rules) {
    if (!rule.test(bodies[name] ?? '')) errors.push(`${name} is missing required guidance: ${rule.source}`);
  }
}

if (errors.length) {
  console.error(`Skills validation failed:\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}

console.log(`Skills validation OK: ${actualSkills.length} workflows and required safeguards are present.`);

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsRoot = join(root, 'plugins', 'user-intuition-research', 'skills');
const continuityPath = join(root, 'plugins', 'user-intuition-research', 'references', 'approval-continuity.md');
const consumerPolicyPath = join(root, 'plugins', 'user-intuition-research', 'references', 'consumer-panel-study.md');
const cohortPolicyPath = join(root, 'plugins', 'user-intuition-research', 'references', 'cohort-invite-policy.md');

const expectedSkills = [
  'analyze-completed-study',
  'create-study-from-brief',
  'curate-interview-quality',
  'design-screeners',
  'field-a-panel',
  'interview-brand-switchers',
  'interview-cancellations',
  'interview-category-shoppers',
  'interview-lapsed-customers',
  'interview-recent-buyers',
  'investigate-drop-off',
  'invite-your-own-participants',
  'map-shopper-journey',
  'monitor-fielding',
  'retrieve-study-results',
  'run-a-concept-test',
  'run-usage-and-attitudes',
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
    /\*\*Practice run, not findings\*\*/,
    /Only if the user asks for more, offer a separate synthetic-respondents study/,
    /may use account credits/,
    /never mix its results into the real study's analysis/,
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
const consumerPolicy = readFileSync(consumerPolicyPath, 'utf8');
for (const rule of [
  /vetted 4M\+ consumer panel/,
  /never describe them as\s+part of the panel/,
  /human review of\s+the saved plan and the complete quote/,
  /Never invent findings, quotes, purchase data, market sizes, or product claims/,
  /never infer it/i,
]) {
  if (!rule.test(consumerPolicy)) errors.push(`consumer-panel-study is missing required guidance: ${rule.source}`);
}
const consumerSkills = ['interview-brand-switchers',  'interview-category-shoppers',  'map-shopper-journey',  'run-usage-and-attitudes'];
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

for (const name of consumerSkills) {
  for (const rule of [/consumer-panel-study\.md/, /approval-continuity\.md/, /`create-study-from-brief` \(Panel\)/, /`field-a-panel`/, /saved plan, then the complete quote/]) {
    if (!rule.test(bodies[name] ?? '')) errors.push(`${name} is missing required guidance: ${rule.source}`);
  }
}
if (!/Never write or invent product claims/.test(bodies['run-a-concept-test'] ?? '')) {
  errors.push('run-a-concept-test is missing the no-invented-claims rule');
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

// cursor.directory scans a plugin folder only when it has its own .cursor-plugin/plugin.json,
// so the folder carries a copy of the root manifest with paths relative to itself.
const pluginDir = 'plugins/user-intuition-research/';
const rootCursor = JSON.parse(readFileSync(join(root, '.cursor-plugin', 'plugin.json'), 'utf8'));
const nestedCursor = JSON.parse(readFileSync(join(root, pluginDir, '.cursor-plugin', 'plugin.json'), 'utf8'));
const relative = Object.fromEntries(Object.entries(rootCursor).map(([key, value]) =>
  [key, ['logo', 'skills', 'mcpServers'].includes(key) ? value.replace(pluginDir, '') : value]));
if (JSON.stringify(relative) !== JSON.stringify(nestedCursor)) {
  errors.push(`${pluginDir}.cursor-plugin/plugin.json must match .cursor-plugin/plugin.json with paths relative to the plugin folder`);
}

// Directories such as claudskills.com require allowed-tools. In Claude Code it pre-approves tools,
// so it may only name Read: every MCP action, paid ones above all, keeps its permission prompt.
for (const name of actualSkills) {
  const text = readFileSync(join(skillsRoot, name, 'SKILL.md'), 'utf8');
  const allowed = text.match(/^---\n[\s\S]*?^allowed-tools: (.+)$[\s\S]*?^---$/m)?.[1];
  if (allowed !== 'Read') errors.push(`${name} must declare exactly "allowed-tools: Read" (found ${allowed ?? 'none'})`);
}

if (errors.length) {
  console.error(`Skills validation failed:\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}

console.log(`Skills validation OK: ${actualSkills.length} workflows and required safeguards are present.`);

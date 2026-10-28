// Build skill ZIPs for Claude Desktop and claude.ai (Settings > Capabilities > Skills > Upload).
//
// Each upload ZIP holds one top-level folder named after the skill, with SKILL.md inside.
// Shared plugin references (../../references/*.md) are copied into the skill's own
// references/ folder and the links rewritten, so every ZIP stands alone.
//
//   node scripts/build-desktop-zip.mjs                 # every skill, plus a bundle of all of them
//   node scripts/build-desktop-zip.mjs --skill setup   # one skill (repeatable)
//
// Output goes to dist/ (gitignored).
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pluginRoot = join(root, 'plugins', 'user-intuition-research');
const skillsRoot = join(pluginRoot, 'skills');
const distRoot = join(root, 'dist');
const { version } = JSON.parse(readFileSync(join(pluginRoot, '.claude-plugin', 'plugin.json'), 'utf8'));

const sharedLink = /\]\(\.\.\/\.\.\/references\/([^)#\s]+)(#[^)\s]*)?\)/g;

function parseArgs(argv) {
  const skills = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--skill') skills.push(argv[++i]);
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  return skills;
}

function frontmatter(text, path) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`${path} has no YAML front matter`);
  const fields = {};
  for (const line of match[1].split('\n')) {
    const at = line.indexOf(':');
    if (at > 0) fields[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  return fields;
}

// Writes <stage>/<name>/ with SKILL.md, its own files, and any shared references it links to.
function stageSkill(name, stage) {
  const source = join(skillsRoot, name);
  const skillPath = join(source, 'SKILL.md');
  if (!existsSync(skillPath)) throw new Error(`No skill named ${name}`);
  const target = join(stage, name);
  cpSync(source, target, { recursive: true });

  let text = readFileSync(skillPath, 'utf8');
  const meta = frontmatter(text, skillPath);
  if (meta.name !== name) throw new Error(`${skillPath} name is ${meta.name}, expected ${name}`);
  if (!meta.description || meta.description.length > 1024) {
    throw new Error(`${skillPath} description must be 1 to 1024 characters`);
  }

  text = text.replace(sharedLink, (_, file, anchor = '') => {
    const from = join(pluginRoot, 'references', file);
    if (!existsSync(from)) throw new Error(`${skillPath} links to missing reference ${file}`);
    mkdirSync(join(target, 'references'), { recursive: true });
    cpSync(from, join(target, 'references', file));
    return `](references/${file}${anchor})`;
  });
  if (/\]\(\.\.\//.test(text)) throw new Error(`${skillPath} still links outside its folder`);
  writeFileSync(join(target, 'SKILL.md'), text);
  return target;
}

function zipFolders(stage, folders, zipPath) {
  rmSync(zipPath, { force: true });
  execFileSync('zip', ['-q', '-r', '-X', zipPath, ...folders], { cwd: stage });
}

const requested = parseArgs(process.argv.slice(2));
const all = readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const names = requested.length ? requested : all;

const stage = mkdtempSync(join(tmpdir(), 'ui-desktop-skills-'));
try {
  mkdirSync(join(distRoot, 'desktop'), { recursive: true });
  for (const name of names) {
    stageSkill(name, stage);
    const zipPath = join(distRoot, 'desktop', `${name}.zip`);
    zipFolders(stage, [name], zipPath);
    console.log(`wrote ${relative(root, zipPath)}`);
  }
  if (!requested.length) {
    const bundle = join(distRoot, `user-intuition-skills-${version}.zip`);
    zipFolders(stage, names, bundle);
    console.log(`wrote ${relative(root, bundle)} (${names.length} skills)`);
  }
} finally {
  rmSync(stage, { recursive: true, force: true });
}

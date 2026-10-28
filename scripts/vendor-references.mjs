// Copies shared policies from plugins/user-intuition-research/references/ into each
// skill's own references/ folder, so a skill installed on its own (npx skills add,
// a raw copy, a ZIP) keeps working links. The plugin-level files stay canonical.
//
//   node scripts/vendor-references.mjs          # write copies
//   node scripts/vendor-references.mjs --check  # fail if any copy or link is stale
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const plugin = join(root, 'plugins', 'user-intuition-research');
const shared = join(plugin, 'references');
const check = process.argv.includes('--check');
const errors = [];

// A shared policy may link to another shared policy, so follow links transitively.
const linksIn = (text) => [...text.matchAll(/\]\((?:\.\.\/\.\.\/references\/|references\/|)([a-z0-9-]+\.md)(?:#[^)]*)?\)/g)]
  .map((m) => m[1]).filter((file) => existsSync(join(shared, file)));

for (const name of readdirSync(join(plugin, 'skills')).sort()) {
  const skillPath = join(plugin, 'skills', name, 'SKILL.md');
  const body = readFileSync(skillPath, 'utf8');
  const rewritten = body.replaceAll('](../../references/', '](references/');
  if (rewritten !== body) {
    if (check) errors.push(`${name}/SKILL.md links to ../../references/; run npm run catalog`);
    else writeFileSync(skillPath, rewritten);
  }
  const needed = new Set();
  const queue = linksIn(rewritten);
  while (queue.length) {
    const file = queue.pop();
    if (needed.has(file)) continue;
    needed.add(file);
    queue.push(...linksIn(readFileSync(join(shared, file), 'utf8')));
  }
  for (const file of needed) {
    const canonical = readFileSync(join(shared, file), 'utf8');
    const copy = join(plugin, 'skills', name, 'references', file);
    if (existsSync(copy) && readFileSync(copy, 'utf8') === canonical) continue;
    if (check) errors.push(`${name}/references/${file} is missing or differs from references/${file}`);
    else { mkdirSync(dirname(copy), { recursive: true }); writeFileSync(copy, canonical); }
  }
}

if (errors.length) {
  console.error(`Reference copies are stale:\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}
console.log(check ? 'Reference copies OK.' : 'Reference copies written.');

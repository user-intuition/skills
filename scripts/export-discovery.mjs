import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
const root=fileURLToPath(new URL('../',import.meta.url));
const args=process.argv.slice(2);
const option=name=>{const i=args.indexOf(name);if(i<0)return null;if(!args[i+1]||args[i+1].startsWith('--'))throw Error(`Missing ${name}`);return resolve(args[i+1]);};
const metadata=JSON.parse(readFileSync(join(root,'skill-metadata.json'),'utf8'));
const entries=readdirSync(join(root,'plugins/user-intuition-research/skills')).sort().map(name=>{
 const path=`plugins/user-intuition-research/skills/${name}/SKILL.md`;
 const body=readFileSync(join(root,path),'utf8');
 const match=body.match(/^---\nname: ([^\n]+)\ndescription: ([^\n]+)\n---\n/);
 if(!match||match[1]!==name)throw Error(`Invalid frontmatter: ${name}`);
 const tools=metadata[name]?.primaryTools;
 if(!Array.isArray(tools))throw Error(`Missing tool metadata: ${name}`);
 return {name,description:match[2],path,body,tools,sha256:createHash('sha256').update(body).digest('hex')};
});
const catalog={repository:'https://github.com/user-intuition/skills',skills:entries.map(({body,path,...e})=>({...e,url:`https://raw.githubusercontent.com/user-intuition/skills/main/${path}`,documentation:`https://docs.userintuition.ai/skills/${e.name}`}))};
const text=JSON.stringify(catalog,null,2)+'\n';
if(args.includes('--check')){if(readFileSync(join(root,'catalog.json'),'utf8')!==text)throw Error('Catalog stale: run npm run catalog.');}
else writeFileSync(join(root,'catalog.json'),text);
const docs=option('--docs'),website=option('--website');
if(docs||website){
 for(const {path,body} of entries)if(execFileSync('git',['show',`HEAD:${path}`],{cwd:root,encoding:'utf8'})!==body)throw Error('Commit skill changes before exporting.');
 const commit=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
 const pinned=entries.map(({body,path,...e})=>({...e,type:'mcp',url:`https://raw.githubusercontent.com/user-intuition/skills/${commit}/${path}`,documentation:`https://docs.userintuition.ai/skills/${e.name}`,mcp_server:'https://mcp.userintuition.ai/mcp'}));
 if(docs){
  writeFileSync(join(docs,'skills/source-manifest.json'),JSON.stringify({repository:catalog.repository,commit,skills:pinned},null,2)+'\n');
  for(const e of entries){
   const meta=pinned.find(s=>s.name===e.name),title=e.name.replaceAll('-',' ');
   writeFileSync(join(docs,'skills',e.name+'.mdx'),`---\ntitle: ${JSON.stringify(title[0].toUpperCase()+title.slice(1))}\ndescription: ${JSON.stringify(e.description)}\n---\n\n{/* Generated from user-intuition/skills; see source-manifest.json. */}\n\n${e.description}\n\n[Fetch raw SKILL.md](${meta.url}) · [Source](https://github.com/user-intuition/skills/blob/${commit}/${e.path}) · [All skills](/skills/library)\n\n${metadata[e.name].requiresAccount===false?'Works without an account. The optional User Intuition steps use an authenticated [MCP connection](/mcp-server/quickstart).':'Requires an authenticated [User Intuition MCP connection](/mcp-server/quickstart).'} Install the raw file as \`${e.name}/SKILL.md\` inside your agent client's supported skills directory. The raw file is the installable artifact; this page is its documentation wrapper.\n\nSHA-256: \`${e.sha256}\`\n\n## Instructions\n\n\`\`\`\`markdown\n${e.body.trim()}\n\`\`\`\`\n`);
  }
  writeFileSync(join(docs,'skills/library.mdx'),`---\ntitle: "Skills Library"\ndescription: "Choose a research workflow and fetch its individual, installable skill file."\n---\n\nThe [canonical skills repository](https://github.com/user-intuition/skills) supplies these ${entries.length} workflows. Select a skill from its description, then fetch only that skill. Each page links to a raw, version-pinned \`SKILL.md\` with a SHA-256 digest.\n\n[Machine-readable catalog](https://raw.githubusercontent.com/user-intuition/skills/main/catalog.json) · [Connection and installation](/skills/overview)\n\n| Skill | When to use | Primary tools |\n| --- | --- | --- |\n${entries.map(e=>`| [${e.name}](/skills/${e.name}) | ${e.description} | ${e.tools.map(t=>'`'+t+'`').join(', ') || 'Discover the released search operation'} |`).join('\n')}\n\n## Using these workflows\n\nConnect the authenticated MCP server, select the intended organization, and inspect each tool schema for its required inputs. Research-design delegation does not replace plan approval or paid-action confirmation.\n`);
  const config=JSON.parse(readFileSync(join(docs,'docs.json'),'utf8'));
  config.navigation.tabs.find(t=>t.tab==='Skills').groups=[{group:'Get Started',pages:['skills/overview','skills/library','skills/setup','skills/user-research']},{group:'Plan and recruit',pages:['create-study-from-brief','design-screeners','run-a-concept-test','field-a-panel','invite-your-own-participants'].map(n=>'skills/'+n)},{group:'Interview a cohort',pages:['interview-recent-buyers','interview-lapsed-customers','interview-cancellations','run-win-loss','investigate-drop-off'].map(n=>'skills/'+n)},{group:'Monitor and use evidence',pages:['monitor-fielding','retrieve-study-results','search-research','analyze-completed-study','curate-interview-quality'].map(n=>'skills/'+n)}];
  writeFileSync(join(docs,'docs.json'),JSON.stringify(config,null,2)+'\n');
 }
 if(website){const path=join(website,'public/.well-known/agent-skills/index.json'),index=JSON.parse(readFileSync(path,'utf8')),names=new Set(pinned.map(e=>e.name));index.skills=[...index.skills.filter(e=>!names.has(e.name)),...pinned];writeFileSync(path,JSON.stringify(index,null,2)+'\n');}
}
console.log(`Validated/exported ${entries.length} independently fetchable skills.`);

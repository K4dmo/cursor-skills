#!/usr/bin/env node
/**
 * Adapt SKILL.md frontmatter for Cursor slash-only invocation:
 * - set disable-model-invocation: true
 * - remove user-invocable
 * Does not modify the markdown body.
 *
 * Usage: node scripts/adapt-skills-slash.mjs [skillsRoot]
 * Default skillsRoot: .cursor/skills
 */
import fs from "node:fs";
import path from "node:path";

const skillsRoot = path.resolve(
  process.argv[2] ?? path.join(process.cwd(), ".cursor/skills"),
);

const SKIP_DIRS = new Set(["node_modules", ".git"]);
const TEAM_OWNED = new Set(["readissue", "validate-issue", "solve-issue"]);

function walkSkillDirs(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || SKIP_DIRS.has(entry.name)) continue;
    const skillMd = path.join(dir, entry.name, "SKILL.md");
    if (fs.existsSync(skillMd)) {
      results.push({ name: entry.name, file: skillMd });
    } else {
      results.push(...walkSkillDirs(path.join(dir, entry.name)));
    }
  }
  return results;
}

function adaptFrontmatter(content) {
  if (!content.startsWith("---")) {
    return {
      content: `---\nname: unknown\ndescription: Skill adapted for slash invocation.\ndisable-model-invocation: true\n---\n\n${content}`,
      changed: true,
    };
  }

  const end = content.indexOf("\n---", 3);
  if (end === -1) return { content, changed: false };

  const fmBlock = content.slice(4, end); // between first --- and second
  const body = content.slice(end + 4); // after \n---

  const lines = fmBlock.split("\n").filter((line) => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    if (trimmed.startsWith("user-invocable:")) return false;
    if (trimmed.startsWith("disable-model-invocation:")) return false;
    return true;
  });

  lines.push("disable-model-invocation: true");

  const newContent = `---\n${lines.join("\n")}\n---${body.startsWith("\n") ? body : `\n${body}`}`;
  return { content: newContent, changed: newContent !== content };
}

const skills = walkSkillDirs(skillsRoot);
let updated = 0;
let skipped = 0;

for (const { name, file } of skills) {
  const original = fs.readFileSync(file, "utf8");
  const { content, changed } = adaptFrontmatter(original);
  if (changed) {
    fs.writeFileSync(file, content, "utf8");
    updated++;
    console.log(`adapted: ${name}`);
  } else {
    skipped++;
    console.log(`unchanged: ${name}${TEAM_OWNED.has(name) ? " (team)" : ""}`);
  }
}

console.log(`\nDone. updated=${updated} unchanged=${skipped} total=${skills.length}`);
console.log(`root: ${skillsRoot}`);

# cursor-skills

A personal / team catalog of [Cursor](https://cursor.com) Agent Skills for day-to-day development.

**Based on** [awesome-cursor-skills](https://github.com/spencerpauly/awesome-cursor-skills) (CC0), **adapted** for a particular daily workflow: slash-only invocation (`/skill-name`) and an opinionated **issue → PR** pipeline centered on `/solve-issue`.

The upstream library is a broad, curated set of ready-made skills. This repo keeps that foundation, then tunes it for how we actually work—validate an issue, get human approval, implement, test, and open a PR—without treating every skill as auto-applied ambient context.

## Quick start

In Cursor **Agent** chat:

```
/solve-issue 123
```

1. The agent validates the issue  
2. You reply **approved** (or request changes)  
3. Branch → implementation → tests → PR with `Closes #123`

Related shortcuts:

- `/readissue 123` — summarize only  
- `/validate-issue 123` — readiness check only  

Full list: [`.cursor/skills/CATALOG.md`](.cursor/skills/CATALOG.md)

## How `/solve-issue` resolves issue and repo

### Which issue?

The argument is the GitHub issue number:

- `/solve-issue 123` or `/solve-issue #123` → issue **#123**
- `/solve-issue https://github.com/org/repo/issues/123` → issue **#123** in that repo

The skill uses `gh issue view <id>` (see `/readissue`).

### Which repository?

With only a number (`123`), `gh` uses the **repo of the workspace open in Cursor**—the current folder’s `origin` remote.

| Command | Repo used |
|---------|-----------|
| `/solve-issue 123` | Project open in Cursor (`origin`) |
| `/solve-issue https://github.com/Acme/api/issues/123` | `Acme/api` (via `--repo`) |

Open the correct repository before using a bare ID. Without git / authenticated `gh` in that workspace, the flow stops and reports the error.

The same rules apply to `/readissue` and `/validate-issue`.

## Layout

```
.cursor/skills/          # skills discovered by Cursor
  solve-issue/           # team orchestrator
  validate-issue/
  readissue/
  creating-pr/           # awesome library (adapted for /)
  writing-tests/
  ...
  CATALOG.md
  SYNC.md
scripts/
  adapt-skills-slash.mjs # slash-only frontmatter
```

## Install

### This repo

Open this folder as a Cursor workspace—skills under `.cursor/skills/` are discovered automatically.

### User-level (any project)

```bash
rsync -a .cursor/skills/ ~/.cursor/skills/
```

### Into an app repo (recommended for team sharing via git)

```bash
mkdir -p /path/to/app/.cursor/skills
rsync -a .cursor/skills/ /path/to/app/.cursor/skills/
# commit in the app
```

## Credits

- Library skills: [spencerpauly/awesome-cursor-skills](https://github.com/spencerpauly/awesome-cursor-skills) — [CC0 1.0](https://github.com/spencerpauly/awesome-cursor-skills/blob/main/LICENSE)
- Pipeline `/solve-issue`, `/validate-issue`, `/readissue`: local adaptations for daily use

## Sync

See [`.cursor/skills/SYNC.md`](.cursor/skills/SYNC.md).

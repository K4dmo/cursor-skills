# Sync com awesome-cursor-skills

Upstream: https://github.com/spencerpauly/awesome-cursor-skills (pasta `resources/`, licença CC0).

## Protegidos (não sobrescrever)

- `readissue/`
- `validate-issue/`
- `solve-issue/`
- `CATALOG.md`
- `SYNC.md`

## Atualizar biblioteca upstream

```bash
cd /path/to/cursor-team-skills

rm -rf /tmp/awesome-cursor-skills
git clone --depth 1 --filter=blob:none --sparse \
  https://github.com/spencerpauly/awesome-cursor-skills.git /tmp/awesome-cursor-skills
cd /tmp/awesome-cursor-skills && git sparse-checkout set resources

# Copiar só skills do upstream (não apaga as do time)
rsync -a \
  --exclude 'readissue/' \
  --exclude 'validate-issue/' \
  --exclude 'solve-issue/' \
  --exclude 'CATALOG.md' \
  --exclude 'SYNC.md' \
  /tmp/awesome-cursor-skills/resources/ \
  .cursor/skills/

# Reaplicar frontmatter slash-only
node scripts/adapt-skills-slash.mjs .cursor/skills

# Opcional: instalar no user-level (~/.cursor/skills) para / em qualquer projeto
rsync -a .cursor/skills/ ~/.cursor/skills/
```

## Instalar em outro repositório do time

```bash
mkdir -p /path/to/app/.cursor/skills
rsync -a /path/to/cursor-team-skills/.cursor/skills/ /path/to/app/.cursor/skills/
```

Commitar `.cursor/skills/` no app para todo o time receber as mesmas skills via git.

## Adaptar frontmatter

```bash
node scripts/adapt-skills-slash.mjs .cursor/skills
```

Garante `disable-model-invocation: true` e remove `user-invocable` do YAML.

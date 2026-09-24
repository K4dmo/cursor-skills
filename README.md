# cursor-skills

Catálogo de Agent Skills para o time, baseado em [awesome-cursor-skills](https://github.com/spencerpauly/awesome-cursor-skills) (CC0), com pipeline próprio **issue → PR**.

## Uso rápido

No **Agent** chat do Cursor:

```
/solve-issue 123
```

1. O agent valida a issue  
2. Você responde **aprovado** (ou pede ajustes)  
3. Branch → implementação → testes → PR com `Closes #123`

Outros atalhos do pipeline:

- `/readissue 123` — só resumir  
- `/validate-issue 123` — só prontidão  

Lista completa: [`.cursor/skills/CATALOG.md`](.cursor/skills/CATALOG.md)

## Como `/solve-issue` resolve issue e repo

### Qual issue?

O argumento é o número da issue no GitHub:

- `/solve-issue 123` ou `/solve-issue #123` → issue **#123**
- `/solve-issue https://github.com/org/repo/issues/123` → issue **#123** do repo da URL

A skill usa `gh issue view <id>` (ver `/readissue`).

### Qual repositório?

Com só o número (`123`), o `gh` usa o **repo do workspace aberto no Cursor** — o remote `origin` da pasta atual.

| Comando | Repo usado |
|---------|------------|
| `/solve-issue 123` | Projeto aberto no Cursor (`origin`) |
| `/solve-issue https://github.com/Acme/api/issues/123` | `Acme/api` (via `--repo`) |

Abra o repositório certo antes de usar só o ID. Sem git/`gh` autenticado nesse workspace, o fluxo para e reporta o erro.

O mesmo critério vale para `/readissue` e `/validate-issue`.

## Layout

```
.cursor/skills/          # skills descobertas pelo Cursor
  solve-issue/           # orquestrador do time
  validate-issue/
  readissue/
  creating-pr/           # biblioteca awesome (adaptada)
  writing-tests/
  ...
  CATALOG.md
  SYNC.md
scripts/
  adapt-skills-slash.mjs # frontmatter slash-only
```

## Instalação

### Neste repo

Abra esta pasta como workspace no Cursor — as skills em `.cursor/skills/` já são descobertas.

### User-level (qualquer projeto)

```bash
rsync -a .cursor/skills/ ~/.cursor/skills/
```

### Em um app do time (recomendado para compartilhar via git)

```bash
mkdir -p /path/to/app/.cursor/skills
rsync -a .cursor/skills/ /path/to/app/.cursor/skills/
# commitar no app
```

## Créditos

- Skills de biblioteca: [spencerpauly/awesome-cursor-skills](https://github.com/spencerpauly/awesome-cursor-skills) — [CC0 1.0](https://github.com/spencerpauly/awesome-cursor-skills/blob/main/LICENSE)
- Pipeline `/solve-issue`, `/validate-issue`, `/readissue`: skills do time

## Sync

Ver [`.cursor/skills/SYNC.md`](.cursor/skills/SYNC.md).

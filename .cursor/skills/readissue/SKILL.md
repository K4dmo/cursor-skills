---
name: readissue
description: >-
  Fetch and summarize a GitHub issue (title, body, labels, comments, acceptance
  criteria, likely code areas). Use when the user invokes /readissue or needs
  issue context before planning or implementing.
disable-model-invocation: true
---

# Read Issue

## Invocação

`/readissue <id|url>`

Exemplos: `/readissue 123` · `/readissue #123` · `/readissue https://github.com/org/repo/issues/123`

## Objetivo

Carregar a issue e entregar contexto acionável. **Não** implementa, não cria branch, não abre PR.

## Workflow

### 1. Parsear o identificador

Aceitar: número (`123`), com hash (`#123`), ou URL de issue GitHub.
Se faltar o ID, pedir ao usuário.

### 2. Buscar a issue

```bash
gh issue view <id> --json number,title,body,labels,assignees,comments,state,author,url,createdAt,updatedAt
```

Se a URL for de outro repo, passar `--repo owner/name`.

### 3. Explorar o codebase (leve)

Com base no título/corpo, buscar no repo arquivos/módulos provavelmente relacionados (nomes de features, rotas, componentes citados). Não fazer refatoração.

### 4. Entregar o resumo

Usar este formato:

```markdown
## Issue #<N> — <title>
**Estado:** open|closed
**URL:** ...
**Labels:** ...
**Assignees:** ...

### Problema
1-3 frases.

### Critérios de aceite
- ... (extrair do body; se implícitos, listar como "inferidos")

### Contexto / comentários relevantes
- ...

### Áreas prováveis no código
- `path/to/file` — por quê

### Riscos / dúvidas
- ...

### Próximos passos sugeridos
- `/validate-issue <N>` para checar prontidão
- `/solve-issue <N>` para o pipeline completo (com aprovação)
```

## Regras

- Default tracker: **GitHub** via `gh`. Se `gh` falhar (auth/repo), reportar o erro e parar.
- Não inventar requisitos que não estejam na issue ou comentários; marcar inferências como tal.
- Não implementar nesta skill.

---
name: solve-issue
description: >-
  Autonomous issue-to-PR pipeline: validate a GitHub issue, request human
  approval, create a branch, implement, add tests, grind until tests pass, then
  open a PR. Use when the user invokes /solve-issue with an issue id or URL.
disable-model-invocation: true
---

# Solve Issue

## Invocação

`/solve-issue <id|url>`

Exemplos: `/solve-issue 123` · `/solve-issue #456`

## Objetivo

Orquestrar o fluxo completo **issue → PR**, com gate humano obrigatório após a validação.

## Hard gates (não negociar)

1. **Nunca** criar branch, editar código ou abrir PR sem aprovação explícita do humano após a validação (ex.: "aprovado", "pode seguir", "go").
2. Após aprovação, executar de forma autônoma até PR ou bloqueio reportado.
3. No máximo **3** ciclos de fix→testes; se estourar, parar e reportar.
4. Sem force-push. Não "passar" teste enfraquecendo assertion sem intenção documentada.
5. Tracker default: **GitHub** via `gh`.

## Progress checklist

Copiar e atualizar durante a execução:

```
Solve-issue progress:
- [ ] 1. Contexto (/readissue)
- [ ] 2. Validação (/validate-issue)
- [ ] 3. Aprovação humana
- [ ] 4. Branch
- [ ] 5. Implementação
- [ ] 6. Testes escritos
- [ ] 7. Suite verde (≤3 ciclos)
- [ ] 8. Self-review
- [ ] 9. PR criada
- [ ] 10. Handoff
```

## Fases

### 1. Contexto

Ler e seguir [readissue/SKILL.md](../readissue/SKILL.md).

### 2. Validação

Ler e seguir [validate-issue/SKILL.md](../validate-issue/SKILL.md).

- Se veredito ≠ `ready`: **parar**. Entregar gaps/perguntas. Não pedir aprovação para implementar.
- Se `ready`: seguir para o gate humano.

### 3. Gate humano (obrigatório)

Apresentar e **esperar** resposta antes de qualquer git write / edição:

```markdown
## Validação — Issue #<N>
Veredito: ready

## Plano proposto
- Escopo: ...
- Fora de escopo: ...
- Branch: feat/<N>-<slug> | fix/<N>-<slug>
- Arquivos/áreas: ...
- Testes previstos: ...
- Riscos: ...

Responda **aprovado** para eu criar a branch e implementar, ou indique ajustes.
```

Slug: versão curta do título (kebab-case, ≤40 chars). Usar `fix/` se for bug; `feat/` caso contrário.

### 4. Branch

Somente após aprovação:

```bash
git fetch origin
git checkout main 2>/dev/null || git checkout master
git pull --ff-only
git checkout -b feat/<N>-<slug>   # ou fix/...
```

Se working tree suja, parar e pedir ao usuário o que fazer (stash/commit/abort).

### 5. Implementação

- Diff mínimo alinhado aos critérios de aceite.
- Commits lógicos; seguir [writing-commit-messages/SKILL.md](../writing-commit-messages/SKILL.md).
- Não expandir escopo além do plano aprovado; se descobrir necessidade maior, pausar e perguntar.

### 6. Testes

Ler e seguir [writing-tests/SKILL.md](../writing-tests/SKILL.md).

Cobrir o comportamento novo/corrigido (happy path + casos de erro relevantes dos AC).

### 7. Verificar até passar

Ler e seguir [grinding-until-pass/SKILL.md](../grinding-until-pass/SKILL.md).

Rodar a suite relevante do projeto (`npm test`, `pnpm test`, `pytest`, etc. — detectar do repo).

Limite: **3** ciclos fix→re-run. Se falhar após 3: reportar erros, branch atual, e parar (não abrir PR).

### 8. Self-review

Checklist rápido inspirado em [reviewing-code/SKILL.md](../reviewing-code/SKILL.md):

- AC atendidos?
- Edge cases óbvios?
- Sem debug leftover / secrets?
- Tipos/lint ok se o projeto tiver?

Corrigir must-fix antes do PR.

### 9. PR

Ler e seguir [creating-pr/SKILL.md](../creating-pr/SKILL.md).

Garantir no body: `Closes #<N>` (ou `Fixes #<N>`).

```bash
git push -u origin HEAD
gh pr create --title "<type>: <summary>" --body "$(cat <<'EOF'
## Summary
...

Closes #<N>

## Changes
- ...

## Test Plan
- [ ] ...
EOF
)"
```

### 10. Handoff

Entregar:

- URL da PR
- Branch
- O que foi feito vs AC
- CI ainda pendente / riscos
- Opcional: sugerir `/babysitting-pr` se o usuário quiser monitorar CI

## Regras finais

- Skills filhas: **ler o SKILL.md** delas quando entrar na fase; não reinventar o fluxo.
- Se o usuário alterar o plano na aprovação, incorporar antes da branch.
- Merge da PR fica com o humano (fora de escopo desta skill).

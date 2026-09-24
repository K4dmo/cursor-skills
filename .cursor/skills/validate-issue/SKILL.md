---
name: validate-issue
description: >-
  Validate whether a GitHub issue is ready to implement before any code changes.
  Produces a readiness verdict (ready, needs-clarification, too-large, blocked).
  Use when the user invokes /validate-issue or as the gate inside /solve-issue.
disable-model-invocation: true
---

# Validate Issue

## Invocação

`/validate-issue <id|url>`

## Objetivo

Checar prontidão da issue **antes** de qualquer implementação. Se o veredito não for `ready`, **parar** e listar gaps — não pedir aprovação para implementar.

## Workflow

### 1. Carregar contexto

Ler e seguir [readissue/SKILL.md](../readissue/SKILL.md) para obter o resumo da issue (ou repetir os mesmos passos `gh issue view` se já estiver no mesmo turno).

### 2. Checklist de prontidão

Avaliar cada item:

| # | Critério | Pass? |
|---|----------|-------|
| 1 | Issue **aberta** (`state: OPEN`) | |
| 2 | Título e descrição claros o bastante para um dev implementar sem adivinhar | |
| 3 | Critérios de aceite presentes **ou** inferíveis e listados explicitamente | |
| 4 | Escopo finito (não mistura várias features sem prioridade; evita "etc.") | |
| 5 | Bloqueios/dependências explícitos ou claramente inexistentes | |
| 6 | Áreas do repo identificáveis com busca rápida no codebase | |
| 7 | Não parece duplicata óbvia de outra issue aberta (checar `gh issue list` se houver dúvida) | |

### 3. Classificar

Escolher **um** veredito:

- `ready` — todos os itens críticos ok; pode pedir aprovação para implementar
- `needs-clarification` — faltam AC, ambiguidades, ou perguntas bloqueantes
- `too-large` — deve ser quebrada em issues menores
- `blocked` — dependência externa, issue fechada, ou bloqueio explícito

### 4. Output obrigatório

```markdown
## Validação — Issue #<N>
**Veredito:** ready | needs-clarification | too-large | blocked

### Checklist
- [x]/[ ] item …

### Critérios de aceite (confirmados ou inferidos)
- ...

### Gaps / perguntas
1. ...

### Escopo sugerido (se ready)
- Inclui: ...
- Fora de escopo: ...

### Áreas do código
- ...
```

## Regras

- Se veredito ≠ `ready`: **não** sugerir "pode implementar agora"; listar o que falta.
- Se `ready`: indicar que o próximo passo é `/solve-issue <N>` (que pedirá aprovação humana).
- Não criar branch, não editar código, não abrir PR.

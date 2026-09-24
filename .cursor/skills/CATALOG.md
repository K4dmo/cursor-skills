# Catálogo de skills do time

No Agent chat do Cursor, digite `/` e o nome da skill. Argumentos na mesma mensagem.

Exemplo: `/solve-issue 123`

Todas as skills deste catálogo usam `disable-model-invocation: true` — só entram no contexto quando invocadas via `/`.

---

## Pipeline do time (dia a dia)

| Comando | Papel |
|---------|--------|
| `/solve-issue <id>` | Fluxo completo: validar → **aprovação humana** → branch → implementar → testes → PR |
| `/validate-issue <id>` | Só checar se a issue está pronta para implementar |
| `/readissue <id>` | Só ler e resumir a issue (GitHub via `gh`) |

### Fluxo recomendado

```
/solve-issue 42
  → agent valida
  → você responde "aprovado"
  → agent implementa, testa e abre a PR
```

Ou em etapas:

```
/readissue 42
/validate-issue 42
/solve-issue 42    # quando ready
```

---

## Biblioteca (awesome-cursor-skills)

Origem: [spencerpauly/awesome-cursor-skills](https://github.com/spencerpauly/awesome-cursor-skills) (`resources/`), licença CC0. Adaptadas para invocação via `/`.

### Workflow Git / PR

| Comando | Quando usar |
|---------|-------------|
| `/creating-pr` | Abrir PR review-ready |
| `/writing-commit-messages` | Mensagem conventional commit |
| `/babysitting-pr` | Manter PR merge-ready (CI, comments, conflicts) |
| `/parallel-ci-triage` | Triagem paralela de falhas no GitHub Actions |
| `/parallel-code-review` | Review paralelo (security, perf, correctness, readability) |
| `/reviewing-code` | Code review focado |
| `/systematic-debugging` | Debug estruturado |
| `/incident-response` | Incidente de produção |
| `/grinding-until-pass` | Iterar até testes/build/lint passarem |
| `/best-of-n-solving` | Várias abordagens em worktrees paralelos |

### Testes & qualidade

| Comando | Quando usar |
|---------|-------------|
| `/writing-tests` | Unit/integration tests |
| `/adding-e2e-tests` | Setup Playwright |
| `/python-tdd-with-uv` | TDD Python com uv |
| `/api-smoke-testing` | Smoke em endpoints da API |
| `/parallel-test-fixing` | Corrigir vários testes em paralelo |
| `/auditing-security` | Auditoria OWASP / secrets |
| `/auditing-performance` | Bundle, queries, CWV |
| `/auto-type-checking` | `tsc` após edits |

### Cursor-native (browser / agent)

| Comando | Quando usar |
|---------|-------------|
| `/verifying-in-browser` | Subir app e verificar no browser do Cursor |
| `/visual-qa-testing` | QA visual + console + network |
| `/responsive-testing` | Viewports mobile/tablet/desktop |
| `/dark-mode-testing` | Light vs dark |
| `/accessibility-auditing` | Árvore ARIA / a11y |
| `/form-testing` | Preencher e validar forms |
| `/network-request-auditing` | Auditar XHR/fetch |
| `/profiling-performance` | Profiler CPU no browser |
| `/recording-browser-flow-as-test` | Fluxo → spec Playwright |
| `/screenshotting-changelog` | Before/after visual na PR |
| `/comparing-branches-visually` | Diff visual entre branches |
| `/finding-dev-server-url` | Descobrir URL do dev server |
| `/monitoring-terminal-errors` | Vigiar crashes no terminal |
| `/detecting-port-conflicts` | `EADDRINUSE` |
| `/tailing-build-output` | Monitorar build streaming |
| `/parallel-exploring` | Explorar codebase com subagents |
| `/codebase-onboarding` | Doc de onboarding via explore paralelo |
| `/saving-workspace-context` | Persistir contexto no workspace |
| `/switching-projects` | Trocar workspace (MCP) |
| `/suggesting-cursor-rules` | Sugerir rule permanente |
| `/suggesting-cursor-hooks` | Sugerir hook de automação |
| `/suggesting-skills` | Sugerir skill conhecida |
| `/building-skills-from-patterns` | Extrair skill de workflow repetido |

### Product / stack

| Comando | Quando usar |
|---------|-------------|
| `/adding-analytics` | PostHog |
| `/adding-feature-flags` | Feature flags |
| `/adding-error-tracking` | Sentry |
| `/adding-auth` | Auth.js / NextAuth |
| `/adding-stripe` | Stripe |
| `/adding-docker` | Dockerfile + compose |
| `/setting-up-ci` | GitHub Actions |
| `/setting-up-terraform` | Terraform |
| `/kubernetes-deploying` | K8s deploy |
| `/adding-api-docs` | OpenAPI/Swagger |
| `/database-design` | Schema / ORM |
| `/using-ui-stack` | Design system na UI gerada |
| `/writing-copy` | Copy de marketing/UI |
| `/seo-auditing` | SEO técnico |
| `/react-native-patterns` | RN / Expo |
| `/converting-css-to-tailwind` | CSS → Tailwind |
| `/converting-css-modules-to-tailwind` | CSS Modules → Tailwind |
| `/updating-npm-package` | Update seguro de pacote npm |
| `/architecture-decision-records` | ADRs |
| `/prompt-engineering` | Prompts para LLMs |
| `/exporting-to-png` | Exportar para PNG |
| `/generating-images` | Gerar/editar imagens |
| `/fixing-broken-links` | Links quebrados |
| `/verifying-markdown-formatting` | Formatação Markdown |

---

## Como adicionar uma skill nova

1. Criar `.cursor/skills/<nome>/SKILL.md` (`name` = pasta, lowercase + hífens).
2. Frontmatter com `disable-model-invocation: true`.
3. Entrada neste `CATALOG.md`.
4. Skills do time (`readissue`, `validate-issue`, `solve-issue`) **não** são sobrescritas no sync do upstream — ver [SYNC.md](SYNC.md).

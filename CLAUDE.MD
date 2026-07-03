# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) ao trabalhar com o código deste repositório.

## Visão geral

Clone do TabNews: aplicação Next.js (App Router) + TypeScript + PostgreSQL. Cadastro de usuário com ativação por e-mail, autenticação por sessão via cookie, autorização baseada em features.

## Stack

- **Next.js** (App Router, Turbopack) com TypeScript em modo ESM (`"type": "module"` no `package.json`)
- **Zod v4** para validação de schemas
- **PostgreSQL** via `pg`, migrations com `node-pg-migrate`
- **bcryptjs** para hash de senha
- **Jest** para testes de integração e unitários
- **pnpm** como gerenciador de pacotes (não usar `npm`)

## Arquitetura em camadas

```
app/            → rotas de API e páginas (Route Handlers, Server Components, Server Actions)
dtos/           → contratos de serialização (o que trafega entre o domínio e o cliente)
models/         → lógica de negócio e regras de domínio
repositories/   → acesso a dados (queries diretas ao banco)
infra/          → infraestrutura: banco, sessão, e-mail, erros, wrappers de rota
constants/      → constantes compartilhadas entre camadas (ex: features, URLs base)
```

A dependência flui numa direção só: `app` → `dtos`/`models` → `repositories` → `infra`. `infra` pode depender de `models` (para autorização), mas nunca de `constants` através de barrel — sempre importe do arquivo específico quando isso puder formar um ciclo (ver seção de barrels abaixo). Verifique dependências circulares com `npx madge --circular --extensions ts,tsx src` antes de introduzir um novo import entre essas camadas.

## Convenção de arquivos por domínio (padrão "barrel")

Cada pasta de domínio em `models/<dominio>/` e `repositories/<dominio>/` segue a mesma estrutura:

- `index.ts` — barrel. **Só reexporta símbolos que são consumidos por código FORA da própria pasta.** Um `constants.ts`/`utils.ts` usado só internamente não deve ser exportado no barrel.
- `model.ts` / `repository.ts` — implementação principal, nome genérico (nunca `<dominio>.model.ts`)
- `constants.ts` — constantes do domínio
- `schema.ts` — schemas de validação Zod
- `utils.ts` — helpers internos, não exportados no barrel salvo necessidade real de uso externo
- `types.ts` — tipos específicos do domínio (usado em `repositories/`)

Exemplo real: `src/models/user-model/index.ts` reexporta `model.ts` e `schema.ts`, mas não `constants.ts`, porque `DEFAULT_USER_FEATURES` só é usado dentro da própria pasta.

## DTOs

Arquivos planos em `src/dtos/<dominio>-dto.ts` (não usar subpastas do tipo `<dominio>/dto.ts`). Cada arquivo exporta o tipo `T<Dominio>Dto` e uma função `get<Dominio>Dto(sessionUser, entity)` que decide o que é exposto conforme quem está pedindo (ex: `email` só aparece pra o dono do perfil, via comparação direta de `id`, não por feature).

## Autorização por features

- `TUserFeatures`/`USER_FEATURES` vivem em `src/constants/features.ts`.
- `authorizationModel.can(user, feature, resource?)` é a checagem central.
- Toda feature declarada em `USER_FEATURES` precisa ter (1) um caminho de concessão real (via `ANONYMOUS_FEATURES`, `DEFAULT_USER_FEATURES`, ou concedida manualmente) e (2) um ponto de checagem real (`feature:` num `controller()`/`gated()`, ou uma chamada direta a `authorizationModel.can()`). Uma feature concedida a todo mundo E nunca checada é decorativa — não crie/mantenha features assim.
- Regras de posse (ex: só o dono edita o próprio usuário, salvo quem tem `update:user:others`) ficam dentro do próprio `authorizationModel.can()`, não espalhadas pelas rotas.

## Wrappers de rota (`src/infra/`)

- **`controller(config)`** — usado em `app/api/**/route.ts`. Cada método HTTP pode ser uma função simples ou `{ handler, feature? }`. Se `feature` for informado, resolve a sessão e chama `can()` antes do handler. Centraliza o mapeamento erro → status HTTP em `onErrorHandler`.
- **`gated(handler, feature?)`** — usado para Server Components e futuras Server Actions. Resolve a sessão de forma resiliente (cai para anônimo em vez de lançar erro em `UnauthorizedError`), aplica `can()`, e injeta o usuário resolvido como primeiro argumento do handler. Não confundir com uma Server Action de verdade — `gated()` é usado tanto para leituras (ex: `getStatus` numa Server Component) quanto para futuras mutações.
- **`can(user, feature)`** em `src/infra/authorization.ts` é compartilhado entre os dois wrappers acima para não duplicar a lógica de checagem.
- `session.getUser()` usa `React.cache()` — memoização por requisição, inclusive dentro de Route Handlers (comportamento do Next.js, verificado empiricamente sem vazamento entre requisições concorrentes). Não é um cache persistente de processo.

## Nomenclatura: `actions.ts` vs `data.ts`

Reserve o nome `actions.ts`/a diretiva `'use server'` para mutações de verdade, pensadas para serem chamadas a partir do client (formulário ou invocação direta). Uma função chamada diretamente durante a renderização de uma Server Component (leitura de dados) não é uma Server Action — nomeie esse tipo de arquivo como `data.ts` (ver `src/app/(pages)/(public)/status/_components/data.ts`).

Pastas prefixadas com `_` (ex: `_components`, `_use-cases`) são privadas daquela árvore de rotas por convenção do Next.js — não importe de dentro delas a partir de outra árvore de rotas (ex: uma rota de API não deve importar de `_components` de uma página).

## Migrations

- Localizadas em `src/infra/migrations/`, geradas com `pnpm run migrations:create <nome>` (o template vem em CommonJS — reescreva para ESM manualmente, seguindo o padrão dos arquivos existentes: `export const shorthands/up/down`).
- Todas as migrations são intencionalmente irreversíveis: `export const down = false` (não `() => false`). Rollback real não é implementado — a estratégia do projeto é "forward-fix", não "down migration".
- Toda coluna `user_id` que referencia `users.id` deve ter FK (`ON DELETE CASCADE`) e índice — Postgres não cria índice automático em colunas de FK.
- Unicidade de `username`/`email` é case-insensitive, garantida por índice único funcional (`CREATE UNIQUE INDEX ... ON users (LOWER(username))`), não só por lógica de aplicação.

## Segurança

- Nunca reexponha o token de sessão no corpo da resposta JSON — ele já vai no cookie `httpOnly`.
- Login deve ter mitigação de timing attack: mesmo tempo de resposta para e-mail inexistente e senha incorreta (compare com um hash dummy quando o e-mail não existir).
- Custo de bcrypt: 14 rounds em produção (`NODE_ENV === 'production'`), 1 round em qualquer outro ambiente (dev/test — mais rápido para testes).
- Sempre persista o dado validado pelo Zod (`validData`), nunca o objeto bruto de entrada, para evitar mass assignment.

## Testes

- Testes de integração em `src/tests/integration/`, espelhando a estrutura de rotas de `src/app/api/`.
- `src/tests/orchestrator.ts` centraliza o setup de teste: `createUser`, `activateUser`, `createSession`, `addFeaturesToUser`, e o helper combinado `createActivatedUserWithSession(userObject?, features?)` — que cobre o fluxo completo criar → ativar → (features extra) → sessão, retornando `{ createdUser, activatedUser, sessionObject }`. Use esse helper sempre que o teste precisar de um usuário ativado com sessão; só monte a sequência manualmente quando o teste precisar de um passo a menos (ex: sessão sem ativação) ou testar o próprio fluxo de ativação/login.
- `src/tests/_utils/` e `src/tests/_types/` guardam utilitários/tipos que só servem para testes (ex: `formatUsername`, `isoStringFieldsToDate`) — não devem viver em `src/utils`/`src/types`, que são para código de aplicação.
- Rotas com colchetes no path (`[username]`, `[token_id]`) fazem `npx jest` interpretar `[...]` como glob. Para rodar só esses arquivos, use `npx jest --runInBand -t "<padrão do teste>" <diretório pai sem colchetes>`.
- Asserções devem validar comportamento real, não apenas o estado incidental da fixture de teste (ex: prefira `expect(Array.isArray(x)).toBe(true)` a comparar um array com ele mesmo).
- Jest não suporta `await` no top level de um módulo mesmo neste projeto sendo ESM — use `hashSync`/equivalente síncrono nesses casos.
- Suíte completa: `npx jest --runInBand src/tests/integration`. O servidor de dev precisa estar rodando (`orchestrator.waitForAllServices()` faz polling em `/api/v1/status`).

## Convenção de commits

Mensagens de commit devem estar em inglês e seguir este formato:

- Use os seguintes prefixos semânticos: `🎉 init, ✨ feat, 🐛 fix, 📚 docs, 💎 style, 📦 refactor, 🚀 perf, 🚨 test, 🛠 build, ⚙️ ci, ♻️ chore, 🗑 revert`
- A mensagem deve estar no imperativo e em letras minúsculas.
- Escreva o corpo do commit como uma lista
- Referencie a issue associada pelo número, se existir, usando o formato `Issue: #<número>`.
- O hook `.husky/commit-msg` faz substituição via `sed` do prefixo textual pelo emoji antes de rodar o commitlint — isso quebra `git commit --fixup`/`--autosquash` (o `sed` casa "fixup!" com "fix" e gera um tipo inválido). Não use `--fixup`/`--autosquash`; se precisar corrigir um commit não-HEAD sem rebase interativo (proibido neste projeto), use uma branch temporária + `commit --amend --no-edit` + `git rebase --onto <novo-base> <base-antigo> <branch>` (forma de 3 argumentos, não depende de `GIT_SEQUENCE_EDITOR`).
- Prefira `--amend` a empilhar um commit de correção quando a correção é sobre uma mudança que você acabou de commitar na mesma tarefa lógica.

Exemplo:

```text
✨ feat: add products page

- Create products page
- Add products table
- Add products form

Issue: #1
```

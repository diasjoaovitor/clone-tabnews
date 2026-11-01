# clone-tabnews

Implementação do [TabNews](https://www.tabnews.com.br) feita ao longo do [curso.dev](https://curso.dev), a partir do [next-boilerplate](https://github.com/diasjoaovitor/next-boilerplate).

As funcionalidades seguem as [issues do curso](https://github.com/filipedeschamps/clone-tabnews/issues), adaptadas a este código: cada uma é recriada como issue deste repositório, registrando o que mudou em relação à original e por quê. Diferente dos outros projetos feitos a partir do boilerplate, o banco é acessado com SQL escrito à mão (`pg`, sem ORM), e a API pública em `/api/v1` faz parte do produto.

## Como rodar

Pré-requisitos: Node 24 (versão no `.nvmrc`), pnpm (versão no `packageManager` do `package.json`) e Docker.

```bash
pnpm install
pnpm dev
```

O `pnpm dev` sobe o Postgres e o Mailpit, roda as migrations e inicia o servidor em [http://localhost:3000](http://localhost:3000). Os e-mails enviados aparecem em [http://localhost:8025](http://localhost:8025). Ao encerrar com `Ctrl+C`, os containers são removidos, então cada execução começa com o banco limpo.

## Scripts

| Script                                      | O que faz                                                    |
| ------------------------------------------- | ------------------------------------------------------------ |
| `pnpm dev`                                  | Sobe os serviços, roda as migrations e inicia o servidor     |
| `pnpm build` / `pnpm start`                 | Gera e serve o build de produção                             |
| `pnpm test` / `pnpm test:watch`             | Roda os testes unitários (uma vez ou em modo watch)          |
| `pnpm test:integration`                     | Sobe os serviços e o servidor e roda os testes de integração |
| `pnpm test:e2e` / `pnpm test:e2e:ui`        | Roda os testes end-to-end (ou na interface do Playwright)    |
| `pnpm services:up` / `stop` / `down`        | Sobe, para ou remove os containers                           |
| `pnpm migrations:create <nome>`             | Cria uma migration em `src/infra/migrations`                 |
| `pnpm migrations:up`                        | Roda as migrations pendentes no banco local                  |
| `pnpm migrations:up:dry` / `:deploy`        | Simula ou roda as migrations no banco do `.env`              |
| `pnpm eslint:check` / `pnpm eslint:fix`     | Verifica (e corrige) com ESLint                              |
| `pnpm prettier:check` / `pnpm prettier:fix` | Verifica (e reescreve) a formatação                          |
| `pnpm type-check`                           | Gera os tipos das rotas e roda o `tsc --noEmit`              |
| `pnpm shadcn:add <componente>`              | Adiciona um componente do shadcn/ui                          |

## Convenções do projeto

As convenções completas estão no [`AGENTS.md`](./AGENTS.md), e o fluxo do planejamento ao merge está em [`docs/development-workflow.md`](./docs/development-workflow.md). Os destaques estão abaixo.

### Idioma

- Issues, template de issue, este README e tudo que o usuário vê (interface, e-mails e mensagens de erro da API) ficam em português.
- Código, comentários, descrições de testes, commits, branches, pull requests, `AGENTS.md` e `docs/` ficam em inglês.

### Arquitetura

- O código do servidor é dividido em camadas, e os imports só descem: `app` → `entry` → `dtos`/`models` → `repositories` → `infra`, com `constants` disponível para todas, sem importar nenhuma delas. O ESLint garante essa direção.
- `models/` guarda as regras de negócio de cada domínio, `repositories/` as queries SQL, `dtos/` o que cada rota pode expor conforme quem pede, `entry/` a camada de entrada (os wrappers de rota, de Server Components e de Server Actions, a sessão e a autorização) e `infra/` a base técnica (banco, e-mail e erros).
- As rotas da API passam pelo `controller()`, e as Server Components e Server Actions pelo `gated()`. Os dois checam as features do usuário com o mesmo `authorize()`. Um cookie de sessão inválido (vencido, desconhecido ou malformado) é tratado como o usuário anônimo, e o `controller` e as Server Actions limpam o cookie. A API e os formulários só respondem `401` quando exigem uma feature que o anônimo não tem. Um método não configurado responde `405` e o `OPTIONS` responde `204`, os dois com o header `Allow`. O `HEAD` fica com o Next, que executa o `GET`. As rotas leem o body com o `readJsonBody()`, que responde `400` quando ele não é um JSON válido.
- O `controller()` e o `formAction()` convertem os erros com o mesmo `normalizeError()`: um erro do Zod vira `400`, um `AppError` mantém o próprio status e qualquer outro erro vira `500`. Os erros `5xx` são logados.
- O banco é acessado por um `pg.Pool` único por processo. Queries que precisam dar certo ou errado juntas rodam no `database.transaction()`, e só as funções dos repositories usadas numa transação aceitam um `client` opcional para participar dela. O migrator continua com um client exclusivo.
- Só a perda de conexão com o banco responde `503`. Os outros erros do banco (sintaxe, coluna inexistente, constraint) são bugs e respondem `500`.
- Cada model valida a própria entrada com o seu `schema.ts`, inclusive os parâmetros da rota. O `schema.ts` também exporta o tipo da entrada de cada schema (`<Nome>Input`, com `z.input`), que o resto do código importa. A API responde `400` aos erros de validação, com `fields` trazendo a mensagem de cada campo inválido, e um cookie `session_id` mal formado é tratado como uma sessão inexistente (`401`).
- `action.ts` com `'use server'` é só para mutações chamadas pelo cliente; dados lidos por uma Server Component vêm de um `data.ts`.
- Os formulários usam TanStack Form com o schema Zod do model para validar no cliente e enviam para Server Actions envolvidas pelo `formAction()`, que converte os erros em mensagens no formulário. Eles só funcionam sem JavaScript em páginas estáticas: nas dinâmicas, o `src/app/(pages)/loading.tsx` mostra o fallback até o JavaScript carregar. Esse fallback fica de propósito.

### Interface

- shadcn/ui (sobre Base UI) e Tailwind CSS v4, com o tema do shadcn e a paleta do Tailwind como vêm. Componentes novos entram com `pnpm shadcn:add <componente>`.
- Componentes compartilhados ficam em `src/app/components`, e hooks compartilhados do cliente em `src/app/hooks`.
- O dark mode segue a preferência do sistema (`prefers-color-scheme`).
- Toda página usa o layout padrão (`src/app/components/layouts/default`), com o cabeçalho; uma página só precisa definir o próprio `title`, que o layout raiz completa com ` | Clone TabNews`.

### Banco de dados

- Postgres com `pg` e migrations do `node-pg-migrate`, escritas em ESM e irreversíveis de propósito (`export const down = false`): correções vão para uma nova migration.
- Toda coluna `user_id` tem chave estrangeira e índice, e a unicidade de `username` e `email` não diferencia maiúsculas de minúsculas, garantida por índices únicos.

### Testes

- Vitest e Playwright. Os testes unitários ficam junto do código que testam, os de integração ficam em `src/tests/integration`, espelhando as rotas de `src/app/api` e chamando a API por HTTP, e os end-to-end ficam em `src/tests/e2e`.
- Só testamos a lógica que escrevemos, não o comportamento de bibliotecas ou do framework.

### Git hooks e CI

- **Hooks do Husky:**
  - `pre-commit` roda o `lint-staged` (ESLint, Prettier e os testes unitários relacionados aos arquivos staged).
  - `commit-msg` adiciona o emoji do prefixo e roda o `commitlint`.
  - `pre-push` roda o type-check e os testes de integração e end-to-end.
- **Commits** em inglês, no imperativo e em minúsculas, com prefixo semântico, por exemplo `✨ feat: add login page`. Basta digitar `feat: ...`, já que o hook adiciona o emoji.
- **Branches:** cada issue vai para uma branch nova chamada `<scope>/<title>#<issue>`, por exemplo `feat/login-page#53`. Nada de uma issue é commitado direto na `main`.
- **Issues** são criadas pelo template **Tarefa** (`.github/ISSUE_TEMPLATE/task.md`). Marque cada item concluído antes de fechar a issue.
- **GitHub Actions** (`.github/workflows/ci.yml`) roda em todo pull request: commitlint, type-check, ESLint, Prettier e os testes unitários, de integração e end-to-end.

### Assistente de IA

- `AGENTS.md` (importado pelo `CLAUDE.md`) documenta as convenções para agentes de código.
- `.mcp.json` configura os servidores MCP `context7` (documentação de bibliotecas) e `playwright`.
- `.claude/` tem a skill `new-component`, para adicionar componentes shadcn ou compartilhados, a skill `review-copy`, que revisa nomes, comentários, descrições de testes, textos da interface e documentação, o subagente `ui-reviewer`, que revisa semântica e acessibilidade da interface, e um `settings.json` que pede confirmação antes de todo `git commit`.

#### Chave da API do Context7

O `.mcp.json` lê a chave da variável de ambiente `CONTEXT7_API_KEY` (`"Authorization": "Bearer ${CONTEXT7_API_KEY}"`), então ela nunca vai para o repositório. O Claude Code expande a variável ao iniciar.

1. Gere uma chave no painel do [Context7](https://context7.com).
2. Defina a variável de uma destas formas:
   - **No shell (todos os projetos):** exporte-a no perfil do shell. No fish, rode `set -Ux CONTEXT7_API_KEY <sua-chave>`. No bash ou zsh, adicione `export CONTEXT7_API_KEY=<sua-chave>` ao `~/.bashrc` ou `~/.zshrc`.
   - **Só neste projeto:** adicione-a ao `.claude/settings.local.json`, que é ignorado pelo git:

     ```json
     {
       "env": {
         "CONTEXT7_API_KEY": "<sua-chave>"
       }
     }
     ```

3. Reinicie o Claude Code e rode `/mcp` para conferir se o `context7` está conectado.

Nunca coloque a chave no `.mcp.json` nem no `.claude/settings.json`, já que os dois são commitados.

## Licença

[MIT](./LICENSE)

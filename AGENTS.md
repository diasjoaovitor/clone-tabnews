<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Conventions

### Scope

This is **clone-tabnews**, an implementation of [TabNews](https://www.tabnews.com.br) built along the [curso.dev](https://curso.dev) course, started from [next-boilerplate](https://github.com/diasjoaovitor/next-boilerplate). Its features follow the [course issues](https://github.com/filipedeschamps/clone-tabnews/issues), adapted to this codebase: each one is recreated here as an issue of this repository, which records what changed from the original and why. The stack differs from the other projects built on the boilerplate on purpose: Postgres through `pg` with hand-written SQL (no ORM), migrations with `node-pg-migrate`, a public REST API under `/api/v1`, session cookies and feature-based authorization, all written by hand as the course teaches. The one opinion on the UI side is **shadcn/ui** as the component library (see Styling & UI).

### Language

- **Portuguese (pt-BR):** GitHub issues (titles and bodies), the issue template, `README.md` and everything users see: UI copy, metadata, emails and the `message`/`action` of the errors the API returns.
- **English:** code (identifiers and comments), test descriptions, commit messages, branch names, pull requests (title and body), `AGENTS.md`, `docs/` and the AI workflow under `.claude/`.

### Package manager

- Use **pnpm** only (not npm/yarn).
- Versions are pinned exact (no `^`/`~`) only for `dependencies` and `devDependencies` in `package.json`, no exceptions there. Install new deps with `pnpm add -E <pkg>` (or `pnpm add -D -E <pkg>` for dev deps) — never hand-edit version strings.
- `-E` only takes effect when no version is given. `pnpm add -E <pkg>@<version>` (or `@latest`) and packages already in `package.json` still get a `^`. In those cases, remove the carets right after (`sed -i -E 's/"\^([0-9])/"\1/' package.json`) and run `pnpm install`.
- The exact-version rule does not apply to MCP servers (`.mcp.json`) or `package.json` scripts, which may use `@latest` (e.g. `pnpm dlx shadcn@latest`, `pnpm dlx @playwright/mcp@latest`). They must still run through pnpm, never `npx`.
- Node version is pinned in `.nvmrc` (`lts/krypton`) for local use and in `engines.node` (`24.x`) in `package.json` for hosts that ignore `.nvmrc` (e.g. Vercel). Keep both on the same major.
- On Vercel, set `ENABLE_EXPERIMENTAL_COREPACK=1` (Production and Preview) so the build uses the exact pnpm version from `packageManager`; without it Vercel picks pnpm from the lockfile version.
- `minimumReleaseAge` in `pnpm-workspace.yaml` (7 days, in minutes) keeps pnpm from resolving a version published less than a week ago.
- `uuid` (`11.1.0`), `node-pg-migrate` (`7.9.1`) and `@faker-js/faker` (`9.9.0`) stay on their last versions that ship CommonJS, since Jest can't load an ESM-only package. Don't bump them while the tests run on Jest.
- `@/*` resolves to `src/*` (`tsconfig.json`).

### Project structure

- `src/app` holds frontend-exclusive content only, plus the Route Handlers under `src/app/api`. Anything that isn't frontend-exclusive (the server layers below, `src/tests`, `src/types`) lives directly under `src`, as a sibling of `app`, not nested inside it.
- Routes are grouped under `src/app/(pages)` (a route group, so it doesn't affect the URL), with nested groups by audience (e.g. `(auth)`, `(public)`). Shared frontend code lives in `src/app/components`.
- Server code is layered, and imports only flow down: `app` → `dtos`/`models` → `repositories` → `infra`, with `constants` usable by every layer. `infra` may depend on `models` for authorization. Import from the specific file, not through the barrel, whenever that could create a cycle, and check for cycles with `pnpm dlx madge --circular --extensions ts,tsx src` before adding an import between layers.
  - `src/models/<domain>-model/` holds the business rules of one domain; `src/repositories/<domain>-repository/` holds its SQL queries; `src/infra/` holds the technical pieces (database, session, email, errors and the route wrappers); `src/constants/` holds values shared across layers (e.g. the features, the base URLs).
  - Each folder in `models/` and `repositories/` has the same files: `index.ts` (a barrel that only re-exports what code outside the folder uses), `model.ts`/`repository.ts` (the implementation, never named `<domain>.model.ts`), and, when needed, `constants.ts`, `schema.ts` (Zod schemas), `utils.ts` (internal helpers) and `types.ts` (used in `repositories/`). For example, `src/models/user-model/index.ts` re-exports `model.ts` and `schema.ts` but not `constants.ts`, since `DEFAULT_USER_FEATURES` is only used inside the folder.
  - DTOs are flat files in `src/dtos/<domain>-dto.ts` (not `<domain>/dto.ts`). Each one exports the `T<Domain>Dto` type and a `get<Domain>Dto(sessionUser, entity)` function that decides what is exposed to whoever is asking (e.g. `email` only for the owner of the profile, by comparing `id`, not by feature).
- A layout lives in its own folder (`layouts/<name>/index.tsx`), with the parts only it uses in a private `_components/` folder next to it. Code outside the layout imports only `layouts/<name>`, never its `_components/`. The same goes for a route: parts used by a single page live in a `_components/` folder next to it. Parts shared only by the pages of one route group live in the group's own `_components/` (e.g. `(pages)/(auth)/_components/`) and are imported only by pages inside that group. A helper that isn't a component or a form's action sits at the root of the route or group it serves, not in `_components/` nor in `src/app/helpers`, which is for helpers shared across the app. Never import a page's `_components/` from another route tree (e.g. an API route).
- `actions.ts`/`action.ts` with `'use server'` is only for mutations called from the client. A function a Server Component calls to read data is not a Server Action: name its file `data.ts` (e.g. `src/app/(pages)/(public)/status/_components/data.ts`).
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`, `babel-plugin-react-compiler` devDependency).

### Database & local services

- `src/infra/compose.yml` declares the local services (Docker Compose): `database` (Postgres) and `mailcatcher` (SMTP on `1025`, UI and API on `1080`). `src/infra/scripts/wait-for-postgres.js` waits for the database to accept connections.
- `pnpm dev` runs `init.sh`: `services:up` → `services:wait:database` → `migrations:up` → `next dev`. Ctrl+C runs `services:down`, which removes the containers on purpose, so every `pnpm dev` starts with a clean database.
- Local settings live in the committed `.env.development` (local-only values, never a hosted secret). The git-ignored `.env` holds the hosted database URL for `migrations:up:dry` and `migrations:up:deploy`.
- Migrations live in `src/infra/migrations/` and are created with `pnpm migrations:create <name>`. The template comes out in CommonJS: rewrite it in ESM like the existing files (`export const shorthands/up/down`).
- Every migration is irreversible on purpose: `export const down = false` (not `() => false`). Fixes go forward in a new migration.
- Every `user_id` column that references `users.id` has a foreign key (`ON DELETE CASCADE`) and an index, since Postgres doesn't index foreign key columns on its own.
- `username` and `email` uniqueness is case-insensitive, enforced by unique functional indexes (`CREATE UNIQUE INDEX ... ON users (LOWER(username))`), not only by application code.

### API & route wrappers

- `controller(config)` (`src/infra/controller.ts`) wraps every `src/app/api/**/route.ts`. Each HTTP method is either a plain handler or `{ handler, feature? }`: with a `feature`, it resolves the session and checks it with `can()` before the handler. Unlisted methods answer `405`, and `onErrorHandler` maps every error to its HTTP status in one place. Handlers read the body with `readJsonBody(request)` (`src/infra/request.ts`), never `request.json()` directly: it turns a body that isn't valid JSON into a `400` `ValidationError` at the point where it's read, so a `SyntaxError` thrown anywhere else still answers `500`.
- `gated(handler, feature?)` (`src/infra/gated.ts`) wraps Server Components and Server Actions. It resolves the session resiliently (an `UnauthorizedError` falls back to the anonymous user instead of throwing), checks `can()` and passes the resolved user as the handler's first argument. It is not a Server Action itself, and serves reads (e.g. `getStatus` in a Server Component) as well as mutations.
- `can(user, feature)` in `src/infra/authorization.ts` is shared by both wrappers, so the check isn't duplicated.
- `session.getUser()` uses `React.cache()`: memoized per request, Route Handlers included, never a process-wide cache.

### Authorization by features

- `TUserFeatures`/`USER_FEATURES` live in `src/constants/features.ts`, and `authorizationModel.can(user, feature, resource?)` is the central check.
- Every feature in `USER_FEATURES` needs (1) a real way to be granted (`ANONYMOUS_FEATURES`, `DEFAULT_USER_FEATURES` or granted by hand) and (2) a real check (`feature:` in a `controller()`/`gated()` or a direct call to `authorizationModel.can()`). A feature granted to everyone and never checked is decorative: don't create or keep one.
- Ownership rules (e.g. only the owner updates their own user, unless they have `update:user:others`) live inside `authorizationModel.can()`, not spread across routes.

### Security

- Never send the session token back in a JSON body: it already goes in the `httpOnly` cookie.
- Sign-in takes the same time for an unknown email and a wrong password: compare against a dummy hash (`DUMMY_PASSWORD_HASH`) when the email doesn't exist.
- bcrypt uses 14 rounds in production (`NODE_ENV === 'production'`) and 1 everywhere else, so tests stay fast.
- Always persist the data Zod validated, never the raw input, to prevent mass assignment.

### Linting & formatting

- ESLint uses native flat config (`eslint.config.mjs`), extending the `core-web-vitals`/`typescript` configs from `eslint-config-next`, plus `eslint-plugin-unicorn`, `eslint-plugin-simple-import-sort`, `eslint-plugin-promise`, `eslint-plugin-prefer-arrow-functions`, `eslint-plugin-jest` (for `src/tests/**/*.test.ts`), `eslint-config-prettier`, and `@eslint/json`/`@eslint/markdown` for JSON/Markdown files. Markdown files use the `gfm` language with `frontmatter: 'yaml'`, so the frontmatter of issue templates (or any Markdown content) isn't parsed as Markdown.
- `unicorn/filename-case` is off for `src/infra/migrations/`: `node-pg-migrate` records each file name in `pgmigrations`, so renaming an applied migration makes it run again. Dynamic segments follow kebab case too (`[token-id]`, read as `params['token-id']`).
- `eslint-plugin-unicorn@74` declares a peer of `eslint >=10.4`, but the project stays on ESLint 9 (`9.39.5`). The peer is unmet (`pnpm peers check` reports it, and depending on the pnpm version install warns `Issues with peer dependencies found`), but `pnpm eslint:check` passes. Don't bump one without validating the other.
- `next lint` no longer exists (removed in Next.js 16). Use `pnpm eslint:check` / `pnpm eslint:fix` and `pnpm prettier:check` / `pnpm prettier:fix`.
- `pnpm type-check` runs `next typegen` first: globals such as `RouteContext` are generated into `.next/types`, so a clean checkout (CI, fresh clone) fails `tsc --noEmit` without it.
- The `review-copy` skill (`.claude/skills/review-copy/`) reviews the text in the code (naming, comments, test descriptions, UI copy, docs); use it on a diff before opening a pull request.
- Prettier style: single quotes, no semicolons, no trailing commas (`.prettierrc`).
- Base indentation/whitespace rules (2 spaces, LF, trim trailing whitespace, final newline) are enforced editor-side via `.editorconfig`.

### Code comments

- Comments only record **why** a decision was made, ideally with a reference (docs link, issue number, upstream bug). Never write comments that explain what the code does or how it works.
- Default to no comment. Add one only for a non-obvious choice that someone might "fix" by mistake.
- Write comments in English.

### Git hooks (husky)

- `pre-commit`: runs `lint-staged` (`lint-staged.config.js`), which runs `pnpm eslint:fix` and `pnpm prettier:fix` on the staged files.
- `commit-msg`: auto-prepends the emoji prefix from the Commit Rules below based on the leading word (e.g. `feat: ...` → `✨ feat: ...`), then runs `commitlint` (`commitlint-config-emoji-convention`). You can type the plain word and let the hook add the emoji.
- `pre-push`: runs `pnpm test` (the full suite, see Testing).
- The `commit-msg` hook's `sed` matches `fixup!` as `fix` and produces an invalid type, so `git commit --fixup`/`--autosquash` don't work. To fix a commit that isn't `HEAD` without an interactive rebase, use a temporary branch, `git commit --amend --no-edit` and `git rebase --onto <new-base> <old-base> <branch>`. To fix the commit you just made in the same task, prefer `--amend` over stacking a fix-up commit.

### Testing

- **Jest** (`jest.config.js` through `next/jest`, `jsdom` environment, `jest.setup.ts`). Integration tests live in `src/tests/integration/`: `api/` mirrors the routes of `src/app/api/` and calls the API over HTTP, since the public API is part of the product, `_use-cases/` covers flows across routes (e.g. the registration flow) and `infra/` the infrastructure (e.g. email); component tests live in `src/tests/interface/`.
- `pnpm test` runs `init.sh test`: it starts the services, `next dev` and Jest together with `concurrently`, and stops them when Jest ends. `pnpm test:watch` runs Jest in watch mode and needs `pnpm dev` running (`orchestrator.waitForAllServices()` polls `/api/v1/status`).
- Paths with brackets (`[username]`, `[token-id]`) are read by Jest as globs. To run only those files, use `pnpm exec jest --runInBand -t "<test name pattern>" <parent folder without brackets>`.
- Jest doesn't support top-level `await` in a module, even in this ESM project: use `hashSync` or another synchronous equivalent there.
- `src/tests/orchestrator.ts` centralizes the test setup: `createUser`, `activateUser`, `createSession`, `addFeaturesToUser` and `createActivatedUserWithSession(userObject?, features?)`, which covers create → activate → (extra features) → session and returns `{ createdUser, activatedUser, sessionObject }`. Use it whenever a test needs an activated user with a session; build the sequence by hand only when the test needs one step less (e.g. a session without activation) or tests the activation or sign-in flow itself.
- `src/tests/_utils/` and `src/tests/_types/` hold helpers and types used only by tests (e.g. `formatUsername`, `isoStringFieldsToDate`), never `src/utils`/`src/types`, which are for application code.
- Assertions check real behavior, not the incidental state of the fixture (e.g. `expect(Array.isArray(x)).toBe(true)` rather than comparing an array with itself).
- Only test logic we wrote (the API's contract, a model's rules and error mapping, lookups, mappings, transforms). Don't test library or framework behavior (e.g. a component that only passes props or HTML through, a Zod schema's `min`/`max` and the messages we hand it, `Link` routing), and drop a test whose main cost is a mock needed only to render.
- Older issues may ask for tests that break the rule above. Skip them without asking, and list them as dropped in the closing comment.
- CI (`.github/workflows/ci.yml`, triggered on `pull_request`) runs, in order: `commitlint` over the PR's commit range, `pnpm prettier:check`, `pnpm eslint:check` and `pnpm test`.

### Styling & UI

- **shadcn/ui** (style `base-nova`, base color `neutral`, icon library `lucide`) on top of Base UI and Tailwind CSS v4 is the component library, with its theme and Tailwind's default palette kept as they come. Its setup comes with #48.

## Development Workflow

The end-to-end flow (planning, issues, branches, commits, pull requests and closing) is described in [`docs/development-workflow.md`](./docs/development-workflow.md). Follow it for any issue.

## Branch Rules

Work for an issue is committed on a new branch, never directly on `main`. Branch names follow `<scope>/<title>#<issue>`, or `<scope>(<target>)/<title>#<issue>` when the work is very specific:

- `<scope>` is one of the semantic prefixes from the Commit Rules below, without the emoji (`feat`, `fix`, `docs`, `chore`, ...).
- `(<target>)` is optional: the page, component or other specific area the work touches (e.g. `home`, `card`).
- `<title>` is a short, lowercase, hyphen-separated summary in English.
- `#<issue>` is the number of the associated issue.

Examples: `feat/home-page#3`, `fix(card)/focus-ring#7`. Parentheses and `#` are special characters in shells, so quote the branch name in commands (e.g. `git switch -c 'fix(card)/focus-ring#7'`).

## Issue Rules

Before closing an issue, tick every completed checklist item (`- [x]`) in its body, e.g. with `gh issue edit <number> --body-file <file>`. Don't close an issue that still has unchecked items unless they were dropped or moved, and say so in the closing comment.

## Documentation Rules

`AGENTS.md` and `README.md` record only project conventions: what to do, where things live and how to handle a given case. Answers to the user's one-off questions (e.g. "why don't we use X?") stay in the conversation and are not written into them. Keep a "why" only when it prevents a likely mistaken "fix". If a change touches a convention, update both files in the same branch.

## Task Rules

Never start working on a task on your own, even when asked to move on to the next one or in auto/agentic mode. First present a summary of the plan (the issue, branch name, steps, files touched and any open decisions) and wait for explicit approval before creating the branch, installing dependencies or editing code. Read-only investigation (issues, docs, code) needs no approval.

## Commit Rules

Never run `git commit` on your own, even in auto/agentic mode. Only propose a commit message when the user asks for one, and create the commit only after explicit approval of that message.

Commit messages must be in English and follow this format:

- Use the following semantic prefixes: `🎉 init, ✨ feat, 🐛 fix, 📚 docs, 💎 style, 📦 refactor, 🚀 perf, 🚨 test, 🛠 build, ⚙️ ci, ♻️ chore, 🗑 revert`
- The message must be in the imperative mood and in lowercase.
- Write the commit body.
- Reference an associated issue by number, if it exists, using the format `Issue: #<number>`.

Example:

```text
✨ feat: add product page

Add the new product page for the product listing with the following features:
- Create a new product
- Update a product
- Delete a product

Issue: #1
```

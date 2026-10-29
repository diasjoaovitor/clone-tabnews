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
- `@/*` resolves to `src/*` (`tsconfig.json`).

### Project structure

- `src/app` holds frontend-exclusive content only, plus the Route Handlers under `src/app/api`. Anything that isn't frontend-exclusive (the server layers below, `src/tests`, `src/types`) lives directly under `src`, as a sibling of `app`, not nested inside it.
- Routes are grouped under `src/app/(pages)` (a route group, so it doesn't affect the URL), with nested groups by audience (e.g. `(auth)`, `(public)`). Shared frontend code lives in `src/app/components`, and shared client hooks in `src/app/hooks` (`use-<name>.ts`).
- `src/app/components` groups components by role: `ui/` for visual building blocks (shadcn ones under `ui/shadcn/`, our own under `ui/custom/`), `blocks/` for composed pieces reused across pages, grouped by domain (e.g. `blocks/post/`; a block that belongs to no domain stays directly in `blocks/`), `providers/` for context providers without UI of their own and `layouts/` for page shells. The root layout (`src/app/(pages)/layout.tsx`) wraps every page in `layouts/default` (the header) and sets the metadata, with `title.template`, so a page only exports its own `title`.
- Server code is layered, and imports only flow down: `app` → `dtos`/`models` → `repositories` → `infra`, with `constants` usable by every layer. `infra` may depend on `models` for authorization.
  - `src/models/<domain>-model/` holds the business rules of one domain; `src/repositories/<domain>-repository/` holds its SQL queries; `src/infra/` holds the technical pieces (database, session, email, errors and the route wrappers); `src/constants/` holds values shared across layers (e.g. the features, the base URLs).
  - Each folder in `models/` and `repositories/` has the same files: `model.ts`/`repository.ts` (the implementation, never named `<domain>.model.ts`), and, when needed, `constants.ts`, `schema.ts` (Zod schemas), `utils.ts` (internal helpers) and `types.ts` (used in `repositories/`).
  - DTOs are flat files in `src/dtos/<domain>-dto.ts` (not `<domain>/dto.ts`). Each one exports the `<Domain>Dto` type and a `get<Domain>Dto(sessionUser, entity)` function that decides what is exposed to whoever is asking (e.g. `email` only for the owner of the profile, by comparing `id`, not by feature).
- There are no `index.ts` barrels: import each module directly from its file through the `@/` alias (e.g. `@/models/user-model/model`). Barrels cause circular imports, give two import paths for the same module and make Vite/Vitest load every re-exported module.
- A layout lives in its own folder (`layouts/<name>/index.tsx`), with the parts only it uses in a private `_components/` folder next to it. Code outside the layout imports only `layouts/<name>`, never its `_components/`. The same goes for a route: parts used by a single page live in a `_components/` folder next to it. Parts shared only by the pages of one route group live in the group's own `_components/` (e.g. `(pages)/(auth)/_components/`) and are imported only by pages inside that group. A helper that isn't a component or a form's action sits at the root of the route or group it serves, not in `_components/` nor in `src/app/helpers`, which is for helpers shared across the app. Never import a page's `_components/` from another route tree (e.g. an API route).
- `actions.ts`/`action.ts` with `'use server'` is only for mutations called from the client. A function a Server Component calls to read data is not a Server Action: name its file `data.ts` (e.g. `src/app/(pages)/(public)/status/_components/data.ts`).
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`, `babel-plugin-react-compiler` devDependency).

### Database & local services

- `src/infra/compose.yml` declares the local services (Docker Compose): `database` (Postgres) and `mail` (Mailpit: SMTP on `1025`, UI and API on `8025`). `src/infra/scripts/wait-for-postgres.js` waits for the database to accept connections.
- `pnpm dev` chains `services:up` → `services:wait:database` → `migrations:up` → `next dev`. Ctrl+C runs `services:down` (a `trap` in the script), which removes the containers on purpose, so every `pnpm dev` starts with a clean database. The `trap 'exit 130' INT TERM` is what makes the shell run the `EXIT` trap on Ctrl+C: don't drop it.
- Local settings live in the committed `.env.development` (local-only values, never a hosted secret). The git-ignored `.env` holds the hosted database URL for `migrations:up:dry` and `migrations:up:deploy`.
- Migrations live in `src/infra/migrations/` and are created with `pnpm migrations:create <name>`. The template comes out in CommonJS: rewrite it in ESM like the existing files (`export const shorthands/up/down`).
- Every migration is irreversible on purpose: `export const down = false` (not `() => false`). Fixes go forward in a new migration.
- Every `user_id` column that references `users.id` has a foreign key (`ON DELETE CASCADE`) and an index, since Postgres doesn't index foreign key columns on its own.
- `username` and `email` uniqueness is case-insensitive, enforced by unique functional indexes (`CREATE UNIQUE INDEX ... ON users (LOWER(username))`), not only by application code.

### API & route wrappers

- `controller(config)` (`src/infra/controller.ts`) wraps every `src/app/api/**/route.ts`. Each HTTP method is either a plain handler or `{ handler, feature? }`: with a `feature`, it resolves the session and checks it with `can()` before the handler. Unlisted methods answer `405`, and `onErrorHandler` maps every error to its HTTP status in one place. Handlers read the body with `readJsonBody(request)` (`src/infra/request.ts`), never `request.json()` directly: it turns a body that isn't valid JSON into a `400` `ValidationError` at the point where it's read, so a `SyntaxError` thrown anywhere else still answers `500`.
- Each model validates its own input with its `schema.ts` (`schema.parse(input)`), route params included (e.g. `activationTokenIdSchema` for `token_id`), never in the route. `onErrorHandler` turns a `ZodError` into a `400` `ValidationError` through `ValidationError.fromZodError()`: `message` is the first issue's message and `fields` maps each invalid field to its first message, the same map `formAction` gives the form. A malformed `session_id` cookie is not a `ZodError`: `sessionModel.findUniqueValidByToken` answers it like an unknown session (`UnauthorizedError`), so the cookie is cleared and `gated()` falls back to the anonymous user.
- `gated(handler, feature?)` (`src/infra/gated.ts`) wraps Server Components and Server Actions. It resolves the session resiliently (an `UnauthorizedError` falls back to the anonymous user instead of throwing), checks `can()` and passes the resolved user as the handler's first argument. It is not a Server Action itself, and serves reads (e.g. `getStatus` in a Server Component) as well as mutations.
- `can(user, feature)` in `src/infra/authorization.ts` is shared by both wrappers, so the check isn't duplicated.
- `session.getUser()` uses `React.cache()`: memoized per request, Route Handlers included, never a process-wide cache.
- Every error the API or a form shows to the user extends `AppError` (`src/infra/errors.ts`), which carries `message`, `action` and `statusCode` and serializes to the API's error body (`toJSON()`).

### Forms

- Forms use **TanStack Form** (`@tanstack/react-form`) for client-side validation, with the model's **Zod** schema, and submit to **Server Actions**. Not `react-hook-form` (no Server Action integration) and not `@tanstack/react-form-nextjs` (its `createServerValidate` returns the raw `FormData` instead of the schema output and its `mergeForm` doesn't map server errors to fields).
- A form lives in the route's `_components/`: `action.ts` (`'use server'`) and `<name>-form.tsx` (`'use client'`). The schema comes from `src/models/<domain>-model/schema.ts`. It only declares rules and messages for Zod, so it has no unit test of its own: the forms' e2e tests cover what the user sees.
- `action.ts` wraps the model call in `formAction(formData, gated(async (user, input) => ..., feature))` (`src/infra/form-action.ts`) and returns `formSuccess(message)` or calls `redirect()`. `gated()` goes inside `formAction()`, so a `ForbiddenError` is shown in the form too. The wrapper turns whatever the model throws into the `FormState` the form renders:
  - a `ZodError` becomes `errors` (the first message per field);
  - an `AppError` becomes `message` + `action` for the whole form, and is logged when its `statusCode` is `5xx`. A business rule that belongs to one field is thrown as a `ZodError` with that `path`;
  - anything else is logged and shown as a generic message, so the user never sees an error boundary for a failed submit;
  - `redirect()`/`notFound()` are rethrown (`unstable_rethrow`).

  It also echoes the submitted values back to refill the form after a post without JavaScript, except any field whose name contains `password` (so name password fields that way), and gives every result a unique `id`, so a repeated identical error still updates the UI.

- The client form calls `useFormAction({ schema, defaultValues, action })` (`src/app/hooks/use-form-action.ts`) and renders the `Form` and `Field` it returns: `<Form {...formProps}>`, a `<Field name=... label=... />` per field (`name` is typed by the schema's keys), `<FormMessage state={state} announcement={announcement} />` and `<SubmitButton pending={pending}>`. `Form` and `Field` are `ActionForm`/`ActionField` (`src/app/components/ui/custom/action-form.tsx`), declared at module level and fed through context: a component created inside the hook would remount its input on every render. `FormCard`, `FormField`, `FormMessage` and `SubmitButton` live in `src/app/components/ui/custom/`; `FormField` only renders what it gets, so it also works outside TanStack. Pages build notices (e.g. from `?error=`) with `formError(...)`/`formSuccess(...)` and pass them as `initialState`.
- How it behaves, so don't "simplify" it away:
  - The `<form>` keeps `action={dispatch}`, so it still posts to the Server Action without JavaScript. With JavaScript, `onSubmit` prevents the native submit, validates on the client and dispatches inside `startTransition`; nothing resets the form.
  - The schema validates the whole form on every change (`validators.onChange`), so errors never go stale. A field only shows its errors once it was left (`isBlurred`) or the form was submitted, and the blur that moves focus to the submit button is skipped, since revealing errors there would shift the button under the pointer.
  - Server field errors are read from the action state during render (so they're in the HTML of a no-JavaScript post too) and each one hides once its field is edited.
  - After a failed submit (client or server) the focus goes to the first invalid field from an effect, after the commit that adds its `aria-invalid` and error description, and `FormMessage` also reads out the first field error (`announcement`), since focusing the field that already has focus announces nothing. A visible form message (success, an `AppError`, or one rendered with the page such as an expired link) takes the focus. `FormMessage` is a live region that stays mounted (`sr-only` while empty); `SubmitButton` uses `focusableWhenDisabled` so focus survives the pending state; that sets `aria-disabled` instead of `disabled`, so it styles the `aria-disabled:` state itself, and it shows the shadcn `Spinner` while pending. `FormMessage` turns the live region `sr-only` whenever there's no visible message, not with `empty:sr-only`, since the announcement alone would add a gap to the form.
  - `FormField` builds its ids with `useId`, so two forms on a page never share an `id`. In e2e tests, check a field error with `toHaveAccessibleDescription` on the field rather than `getByText`, which also matches the announcement.

### Authorization by features

- `UserFeature`/`USER_FEATURES` live in `src/constants/features.ts`, and `authorizationModel.can(user, feature, resource?)` is the central check.
- Every feature in `USER_FEATURES` needs (1) a real way to be granted (`ANONYMOUS_FEATURES`, `DEFAULT_USER_FEATURES` or granted by hand) and (2) a real check (`feature:` in a `controller()`/`gated()` or a direct call to `authorizationModel.can()`). A feature granted to everyone and never checked is decorative: don't create or keep one.
- Ownership rules (e.g. only the owner updates their own user, unless they have `update:user:others`) live inside `authorizationModel.can()`, not spread across routes.

### Security

- Never send the session token back in a JSON body: it already goes in the `httpOnly` cookie.
- Sign-in takes the same time for an unknown email and a wrong password: compare against a dummy hash (`DUMMY_PASSWORD_HASH`) when the email doesn't exist.
- bcrypt uses 14 rounds in production (`NODE_ENV === 'production'`) and 1 everywhere else, so tests stay fast.
- Always persist the data Zod validated, never the raw input, to prevent mass assignment.

### Linting & formatting

- ESLint uses native flat config (`eslint.config.mjs`), extending the `core-web-vitals`/`typescript` configs from `eslint-config-next`, plus `eslint-plugin-unicorn`, `eslint-plugin-simple-import-sort`, `eslint-plugin-tailwindcss`, `eslint-plugin-promise`, `eslint-plugin-prefer-arrow-functions`, `eslint-config-prettier`, and `@eslint/json`/`@eslint/markdown` for JSON/Markdown files. Markdown files use the `gfm` language with `frontmatter: 'yaml'`, so the frontmatter of issue templates (or any Markdown content) isn't parsed as Markdown. `eslint-plugin-tailwindcss` reads the theme from `src/app/styles/globals.css` (`cssConfigPath`), and its rule docs are in `node_modules/eslint-plugin-tailwindcss/docs/rules/` — check there before overriding a Tailwind lint rule.
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

- `pre-commit`: runs `lint-staged` (`lint-staged.config.js`), which runs ESLint, Prettier and `vitest related --project unit --passWithNoTests` on the staged files, by type, through `pnpm exec`. Only the unit tests run there, so a commit never needs the services.
- `commit-msg`: auto-prepends the emoji prefix from the Commit Rules below based on the leading word (e.g. `feat: ...` → `✨ feat: ...`), then runs `commitlint` (`commitlint-config-emoji-convention`). You can type the plain word and let the hook add the emoji.
- `pre-push`: runs `pnpm type-check`, `pnpm test:integration` and `pnpm test:e2e`. The unit tests already run on `pre-commit` (see Testing).
- The `commit-msg` hook's `sed` matches `fixup!` as `fix` and produces an invalid type, so `git commit --fixup`/`--autosquash` don't work. To fix a commit that isn't `HEAD` without an interactive rebase, use a temporary branch, `git commit --amend --no-edit` and `git rebase --onto <new-base> <old-base> <branch>`. To fix the commit you just made in the same task, prefer `--amend` over stacking a fix-up commit.

### Testing

- Unit tests: **Vitest** (`vitest.config.mts`, project `unit`), `jsdom` environment, native Vite `resolve.tsconfigPaths`. Picks up `src/**/*.test.{ts,tsx}` outside `src/tests`, next to the code they test (e.g. `src/app/(pages)/page.test.tsx`). Component tests use `@testing-library/react` / `@testing-library/dom`. `vitest.setup.ts` runs Testing Library's `cleanup` after every test. Test files import `describe`/`test`/`expect`/`vi` from `vitest` (no globals).
- Integration tests: Vitest project `integration` (`node` environment, files run one at a time, `.env.development` loaded into `env`), in `src/tests/integration/`: `api/` mirrors the routes of `src/app/api/` and calls the API over HTTP, since the public API is part of the product (unlike projects that call the models directly), `_use-cases/` covers flows across routes (e.g. the registration flow) and `infra/` the infrastructure (e.g. email). `src/tests/integration/global-setup.ts` reuses a server already answering `/api/v1/status` (e.g. `pnpm dev`); otherwise it starts the services, runs the migrations and starts `next dev`, and on teardown stops that server and removes the containers only if it started them. `server-only` is aliased to Next.js's empty module in `vitest.config.mts`, as `next/jest` did.
- E2E tests: **Playwright** (`playwright.config.ts`), tests live in `src/tests/e2e`, single `chromium` project, `webServer` starts `pnpm dev` (or reuses a running one outside CI) against `http://localhost:3000` and stops it with `SIGINT`, so the `trap` removes the containers. Failure artifacts go to `test-results/` (git-ignored). Assertions wait up to 15s (`expect.timeout`), since `pnpm dev` compiles each route on its first request; don't lower it to the default 5s.
- Scripts: `pnpm test` (unit, run once) / `pnpm test:watch` (unit, watch mode) / `pnpm test:integration` (integration) / `pnpm test:e2e` (e2e) / `pnpm test:e2e:ui` (e2e, Playwright UI mode). To run a single file, pass part of its path (e.g. `pnpm test:integration users/[username]/patch`), which Vitest matches as a substring.
- Fake the clock with `vi.setSystemTime(date)` and restore it with `vi.useRealTimers()`: without `vi.useFakeTimers()` it fakes only `Date`, so the database client's timers keep running.
- `src/tests/orchestrator.ts` centralizes the test setup: `createUser`, `activateUser`, `createSession`, `addFeaturesToUser` and `createActivatedUserWithSession(userObject?, features?)`, which covers create → activate → (extra features) → session and returns `{ createdUser, activatedUser, sessionObject }`. Use it whenever a test needs an activated user with a session; build the sequence by hand only when the test needs one step less (e.g. a session without activation) or tests the activation or sign-in flow itself.
- `src/tests/_utils/` and `src/tests/_types/` hold helpers and types used only by tests (e.g. `formatUsername`, `isoStringFieldsToDate`), never `src/utils`/`src/types`, which are for application code.
- Assertions check real behavior, not the incidental state of the fixture (e.g. `expect(Array.isArray(x)).toBe(true)` rather than comparing an array with itself).
- Only test logic we wrote (the API's contract, a model's rules and error mapping, lookups, mappings, transforms). Don't test library or framework behavior (e.g. a component that only passes props or HTML through, a Zod schema's `min`/`max` and the messages we hand it, `Link` routing), and drop a test whose main cost is a mock needed only to render. Prefer a unit or integration test; add an e2e test only for what they can't cover.
- Older issues may ask for tests that break the rule above. Skip them without asking, and list them as dropped in the closing comment.
- CI (`.github/workflows/ci.yml`, triggered on `pull_request`) runs, in order: `commitlint` over the PR's commit range, `pnpm type-check`, `pnpm eslint:check`, `pnpm prettier:check`, `pnpm test`, `pnpm test:integration`, then installs Chromium (`pnpm exec playwright install --with-deps chromium`) and runs `pnpm test:e2e`.

### Styling & UI

- Tailwind CSS v4 (`@tailwindcss/postcss` only — no `autoprefixer`/`postcss`, v4 uses Lightning CSS internally). Global styles live in `src/app/styles/globals.css`, which also imports `tw-animate-css` and the shadcn base stylesheet (`shadcn/tailwind.css`). The fonts are Geist and Geist Mono (`next/font/google`), exposed as `--font-geist-sans`/`--font-geist-mono`.
- Dark mode follows the system preference: the `dark:` variant is bound to `prefers-color-scheme` (`@custom-variant dark (@media (prefers-color-scheme: dark))`) and the dark tokens are redefined on `:root` inside the same media query, instead of shadcn's `.dark` class. A manual theme toggle would switch both to a class (e.g. with `next-themes`).
- Don't retint the default colors: keep the shadcn tokens in `globals.css` (`neutral` base color) and Tailwind's palette as they come, and pick an existing palette color instead of a custom shade (e.g. `teal-500`, not a tinted `oklch(...)`). Prefer the shadcn tokens (`bg-background`, `text-muted-foreground`, `border-border`, ...) for surfaces and text, so both themes stay consistent.
- **shadcn/ui** (`components.json`, style `base-nova`, base color `neutral`, icon library `lucide`) is the component library: reach for a shadcn component before writing one from scratch. Add components with `pnpm shadcn:add <name>` (wraps `pnpm dlx shadcn@latest add`) — aliases and target paths are in `components.json`. Components from other shadcn registries are added the same way (`pnpm shadcn:add @<registry>/<name> --path src/app/components/ui/<registry>`), after declaring the registry in `components.json`; if the CLI installs a dependency with a `^`, remove the caret (see Package manager).
- Links that need to look like a `Button` must stay plain `<a>`/`Link` elements styled with the exported `buttonVariants(...)` helper, not `Button` itself — Base UI's `Button` enforces button semantics (`role="button"`, keyboard handling) and its own docs say not to render links through it. Pass extra classes through `cn(buttonVariants(...), '...')`, so they override the variant's conflicting ones.
- Supporting libs: `@base-ui/react` (headless primitives), `class-variance-authority` for variant styling, `cn` for the `cn()` class-merging helper (imported directly from the `cn` package, as the shadcn components do; there is no `lib/utils.ts` re-export, see https://ui.shadcn.com/docs/changelog/2026-09-cn), `lucide-react` for icons. Before wiring up a Base UI primitive, check its docs in `node_modules/@base-ui/react/docs/react/` (`components/`, `utils/`, `handbook/`) for its semantics/keyboard behavior — component APIs there may differ from other headless UI kits.

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

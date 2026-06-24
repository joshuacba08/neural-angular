# Neural Angular Site

Small Astro landing page for the published `@neuralangular/angular-ui` package.

## Local commands

Run these from the repo root:

```sh
pnpm install
pnpm nx run site:dev
pnpm nx run site:build
pnpm nx run site:typecheck
```

## Why this app exists

The site is intentionally small and focused:

- main landing page for `neuralangular.oroyajs.com`
- direct link to the published npm package
- direct link to the static Storybook deployment
- clear routing into GitHub source

Storybook remains the deep documentation surface. The Astro site stays fast,
content-first, and SEO-friendly.

## Vercel setup

Recommended setup: use two Vercel projects pointed at the same repository, each
with its own root directory.

### 1. Main Astro site

- Project domain: `neuralangular.oroyajs.com`
- Framework preset: `Astro`
- Root directory: `apps/site`
- Install command: leave auto-detected
- Build command: `pnpm build`
- Output directory: `dist`

Optional environment variables:

- `SITE_URL`
- `PUBLIC_SITE_URL`
- `PUBLIC_STORYBOOK_URL`
- `PUBLIC_NPM_PACKAGE_URL`
- `PUBLIC_GITHUB_URL`

### 2. Static Storybook

- Project domain: `docs.neuralangular.oroyajs.com`
- Root directory: repository root
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm nx run @neural/angular-ui:build-storybook`
- Output directory: `dist/storybook/@neural/angular-ui`

This keeps the marketing site and the component docs independently cacheable and
easier to evolve.

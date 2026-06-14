<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

# Neural Angular — Project Context for AI Agent

## 1. Project Identity

This repository is for **Neural Angular**, an Angular-first ecosystem focused on building modern, production-ready applications.

The project is not a single app. It is intended to become a modular ecosystem composed of:

- A UI component library.
- A production SSR/SSG/hybrid rendering preset.
- A thin meta-framework layer for Angular.
- CLI tools and schematics.
- Deployment adapters.
- Documentation and examples.

The project should be designed progressively. Do not try to build the entire ecosystem at once.

The first goal is to create a solid monorepo foundation and then build the first usable package: `@neural/angular-ui`.

---

## 2. Product Vision

Neural Angular should feel like a serious Angular ecosystem for developers who want:

- Angular-first architecture.
- Modern UI components.
- Strong design system foundations.
- SSR-ready components.
- Good DX without excessive magic.
- Better conventions than raw Angular.
- Enterprise-friendly structure.
- Optional meta-framework features similar in spirit to Nuxt, Next or Analog, but without abandoning Angular’s native mental model.

The long-term idea is not to clone Next.js or Nuxt. The goal is to create an Angular-native stack that gives Angular developers better conventions, better SSR defaults, better UI integration and better production ergonomics.

---

## 3. Main Philosophy

Neural Angular should follow these principles:

1. Angular-first.
2. Modular packages.
3. No unnecessary magic.
4. Explicit architecture.
5. Strong TypeScript types.
6. SSR-safe by default.
7. UI and SSR must be separate packages.
8. The meta-framework layer can integrate everything, but should not force everything.
9. The project must be useful even if the user only installs one package.
10. The first milestone must be small, real and shippable.

---

## 4. Package Strategy

The ecosystem should be split into separate packages.

```txt
@neural/angular-ui
@neural/angular-ssr
@neural/angular-meta
@neural/angular-cli
@neural/angular-schematics
@neural/angular-adapters
```

### Package meaning

```
@neural/angular-ui
= visual system, components, themes, layouts, motion helpers.

@neural/angular-ssr
= SSR, SSG, hydration, cache, route rules, SEO helpers.

@neural/angular-meta
= higher-level framework conventions for Angular apps.

@neural/angular-cli
= CLI commands, generators, build helpers.

@neural/angular-schematics
= Angular schematics for ng add and ng generate.

@neural/angular-adapters
= deploy adapters for Node, Docker, static, Vercel, Netlify, Cloudflare, etc.
```

The UI package must not depend on the SSR/meta-framework package.

The SSR package may optionally integrate with UI, but must not require it.

The meta package can orchestrate UI + SSR + CLI conventions.

------

## 5. Recommended Repository Structure

Use a monorepo.

Preferred tooling:

- pnpm
- Nx
- TypeScript
- Angular v22
- Angular Material
- Angular CDK
- GSAP
- Vitest where useful
- Playwright later for E2E
- Prettier
- ESLint

Initial structure:

```
neural-angular/
├─ apps/
│  ├─ docs/
│  └─ playground/
│
├─ packages/
│  ├─ ui/
│  ├─ ssr/
│  ├─ meta/
│  ├─ cli/
│  ├─ schematics/
│  └─ adapters/
│
├─ examples/
│  ├─ basic-ui/
│  ├─ angular-ssr/
│  └─ ecommerce-hybrid/
│
├─ docs/
│  ├─ architecture/
│  ├─ ui/
│  ├─ ssr/
│  └─ meta-framework/
│
├─ tools/
│  ├─ generators/
│  └─ scripts/
│
├─ package.json
├─ pnpm-workspace.yaml
├─ nx.json
├─ tsconfig.base.json
├─ README.md
└─ AGENTS.md
```

------

## 6. Development Order

Do not start with the meta-framework.

The correct order is:

```
Phase 1:
- Create the monorepo.
- Create packages/ui.
- Create apps/playground.
- Build first UI components.

Phase 2:
- Create packages/ssr.
- Create examples/angular-ssr.
- Add route rules, cache helpers and SEO helpers.

Phase 3:
- Create packages/schematics.
- Add ng add support.
- Add ng generate support.

Phase 4:
- Create packages/cli.
- Add neural commands.

Phase 5:
- Create packages/meta.
- Add conventions inspired by Nuxt/Next/Analog.

Phase 6:
- Create adapters.
- Add production deploy targets.
```

The immediate priority is:

```
packages/ui + apps/playground
```

------

## 7. First MVP

The first MVP is not SSR.

The first MVP is:

```
@neural/angular-ui
```

with:

- `NButton`
- `NCard`
- `NIcon`
- `NThemeProvider`
- Theme tokens
- Dark mode
- Basic layout primitives
- GSAP-safe motion utilities
- Angular playground app consuming the library

The first MVP should prove that the UI package can be imported and used from an Angular app.

Example desired usage:

```
import { NButton, NCard } from '@neural/angular-ui';
```

or, preferably, with secondary entry points:

```
import { NButton } from '@neural/angular-ui/button';
import { NCard } from '@neural/angular-ui/card';
```

------

## 8. UI Package Structure

Recommended structure:

```
packages/ui/
├─ src/
│  ├─ button/
│  │  ├─ button.ts
│  │  ├─ button.html
│  │  ├─ button.scss
│  │  └─ index.ts
│  │
│  ├─ card/
│  │  ├─ card.ts
│  │  ├─ card.html
│  │  ├─ card.scss
│  │  └─ index.ts
│  │
│  ├─ icon/
│  │  ├─ icon.ts
│  │  ├─ icon.html
│  │  ├─ icon.scss
│  │  └─ index.ts
│  │
│  ├─ theme/
│  │  ├─ tokens.ts
│  │  ├─ theme-provider.ts
│  │  ├─ css-vars.ts
│  │  └─ index.ts
│  │
│  ├─ motion/
│  │  ├─ motion.ts
│  │  ├─ gsap-provider.ts
│  │  └─ index.ts
│  │
│  └─ index.ts
│
├─ package.json
├─ tsconfig.json
└─ README.md
```

------

## 9. UI Design Direction

The design style should feel:

- Modern.
- Dark-mode friendly.
- Minimalist but expressive.
- Tech-oriented.
- Premium.
- Smooth.
- Inspired by serious devtools and creative software.
- Suitable for dashboards, media apps, AI tools, admin panels and enterprise products.

The UI system is based on:

- Angular Material
- Angular CDK
- GSAP
- CSS variables
- Design tokens
- Standalone Angular components

Avoid creating random visual styles. The system should feel coherent.

------

## 10. UI Component Rules

All UI components should:

- Be standalone Angular components.
- Prefer signals where useful.
- Be strongly typed.
- Be accessible.
- Support dark mode.
- Support design tokens.
- Avoid direct dependency on browser globals.
- Avoid unnecessary runtime hacks.
- Be SSR-safe when possible.
- Keep public APIs small and clean.
- Use clear input names.
- Avoid overengineering early.

Naming convention:

```
NButton
NCard
NIcon
NDialog
NShell
NSidebar
NToolbar
NThemeProvider
```

Selector convention:

```
n-button
n-card
n-icon
n-dialog
n-shell
```

------

## 11. SSR Package Vision

The SSR package should come after the UI MVP.

Its goal is to provide better production defaults for Angular SSR/hybrid rendering.

Angular v22 already supports:

- CSR
- SSR
- Prerender/SSG
- Server route configuration
- Route-level render modes
- Prerender fallback strategies
- Route headers
- Route status codes
- Server-compatible components
- Hydration-related patterns

The SSR package should wrap these capabilities with better conventions.

Example future config:

```
import { defineNeuralConfig } from '@neural/angular-ssr';

export default defineNeuralConfig({
  routes: {
    '/': {
      render: 'prerender',
      cache: 'public',
      revalidate: 3600,
      seo: true,
    },
    '/blog/**': {
      render: 'prerender',
      fallback: 'server',
      cache: 'public',
      revalidate: 1800,
    },
    '/producto/:id': {
      render: 'server',
      cache: 'swr',
      revalidate: 300,
    },
    '/dashboard/**': {
      render: 'client',
      auth: true,
      seo: false,
    },
  },
});
```

This config can later generate Angular-native server route files.

------

## 12. SSR Package Responsibilities

Future `@neural/angular-ssr` should include:

- `defineNeuralConfig`
- Route rules
- Cache policy helpers
- SEO helpers
- Canonical URL helpers
- Open Graph helpers
- JSON-LD helpers
- Hydration helpers
- SSR-safe browser guards
- Server/browser provider helpers
- Angular server route generation
- Production checklist
- Adapter-aware output

Possible structure:

```
packages/ssr/
├─ src/
│  ├─ define-config.ts
│  ├─ route-rules.ts
│  ├─ render-mode.ts
│  ├─ cache-policy.ts
│  ├─ seo.ts
│  ├─ canonical.ts
│  ├─ json-ld.ts
│  ├─ hydration.ts
│  ├─ platform.ts
│  └─ index.ts
├─ package.json
└─ README.md
```

------

## 13. Meta Framework Vision

The meta-framework should be optional.

It should not replace Angular. It should organize Angular.

Future `@neural/angular-meta` may provide:

- Route conventions.
- Page conventions.
- Layout conventions.
- Data loading conventions.
- SEO conventions.
- File-based helpers, maybe optional.
- Build/deploy presets.
- Integration with UI and SSR packages.

Possible future DX:

```
neural generate page producto --render server --cache swr
neural generate page blog --render prerender --fallback server
neural generate layout marketing
neural build
neural preview
```

But this is not part of the first MVP.

------

## 14. Angular SSR Safety Rules

When building components or utilities that may run under SSR:

Do not directly use:

```
window
document
navigator
location
HTMLElement
localStorage
sessionStorage
```

unless guarded correctly.

Prefer:

- Angular dependency injection.
- Platform-specific providers.
- Browser-only lifecycle logic.
- `afterNextRender` for browser-only DOM logic.
- Keeping server and client HTML consistent to avoid hydration mismatch.

GSAP usage must be isolated so it does not execute during server rendering.

Motion helpers should be opt-in and browser-safe.

------

## 15. Package Boundary Rules

Important architectural rules:

```
packages/ui must not depend on packages/ssr.
packages/ui must not depend on packages/meta.
packages/ssr must not depend on packages/meta.
packages/meta may depend on packages/ssr.
packages/meta may optionally integrate packages/ui.
packages/cli may orchestrate all packages.
packages/schematics may install/configure all packages.
```

Allowed dependency direction:

```
ui      → Angular, Material, CDK, GSAP
ssr     → Angular, Angular SSR
meta    → Angular, ssr, optional ui
cli     → core tooling, schematics, generators
adapters → ssr/meta output
```

Avoid circular dependencies.

------

## 16. Initial Commands

Recommended initial setup:

```
npx create-nx-workspace@latest neural-angular
cd neural-angular
corepack enable
git init
```

Create package folders:

```
mkdir -p packages/ui
mkdir -p packages/ssr
mkdir -p packages/meta
mkdir -p packages/cli
mkdir -p packages/schematics
mkdir -p packages/adapters
mkdir -p apps/docs
mkdir -p apps/playground
mkdir -p examples/basic-ui
mkdir -p examples/angular-ssr
mkdir -p examples/ecommerce-hybrid
mkdir -p docs/architecture
mkdir -p docs/ui
mkdir -p docs/ssr
mkdir -p docs/meta-framework
mkdir -p tools/scripts
```

Create `pnpm-workspace.yaml`:

```
packages:
  - "apps/*"
  - "packages/*"
  - "examples/*"
  - "tools/*"
```

------

## 17. Root package.json Direction

The root `package.json` should be private.

Example:

```
{
  "name": "neural-angular",
  "version": "0.0.0",
  "private": true,
  "packageManager": "pnpm@latest",
  "scripts": {
    "dev": "nx run-many -t serve",
    "build": "nx run-many -t build",
    "test": "nx run-many -t test",
    "lint": "nx run-many -t lint",
    "graph": "nx graph"
  },
  "devDependencies": {
    "nx": "latest",
    "typescript": "latest",
    "tsx": "latest",
    "vitest": "latest",
    "prettier": "latest"
  }
}
```

Adjust versions according to the actual installed Angular/Nx versions.

------

## 18. First Package: @neural/angular-ui

Initial `packages/ui/package.json` direction:

```
{
  "name": "@neural/angular-ui",
  "version": "0.0.1",
  "description": "Modern Angular UI system built on Angular Material, CDK and GSAP.",
  "type": "module",
  "sideEffects": false,
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "./button": {
      "types": "./dist/button/index.d.ts",
      "default": "./dist/button/index.js"
    },
    "./card": {
      "types": "./dist/card/index.d.ts",
      "default": "./dist/card/index.js"
    },
    "./icon": {
      "types": "./dist/icon/index.d.ts",
      "default": "./dist/icon/index.js"
    },
    "./theme": {
      "types": "./dist/theme/index.d.ts",
      "default": "./dist/theme/index.js"
    }
  },
  "peerDependencies": {
    "@angular/core": "^22.0.0",
    "@angular/common": "^22.0.0",
    "@angular/material": "^22.0.0",
    "@angular/cdk": "^22.0.0",
    "gsap": "^3.0.0"
  }
}
```

The agent should verify the real current Angular package versions before finalizing dependency versions.

------

## 19. First Components

Start with these components:

```
NButton
NCard
NIcon
NThemeProvider
```

Do not create 20 components immediately.

The first goal is to prove:

- The package builds.
- The package can be imported.
- The playground app can consume it.
- The design tokens work.
- Dark mode works.
- Components are SSR-safe.
- The API feels clean.

------

## 20. NButton Requirements

`NButton` should support:

- Variants:
  - primary
  - secondary
  - ghost
  - danger
- Sizes:
  - sm
  - md
  - lg
- Disabled state.
- Loading state.
- Icon slot or icon input.
- Accessible button semantics.
- Standalone component.
- SSR-safe behavior.

Possible API:

```
<n-button variant="primary" size="md">
  Save changes
</n-button>

<n-button variant="ghost" size="sm" [loading]="true">
  Loading
</n-button>
```

------

## 21. NCard Requirements

`NCard` should support:

- Basic card surface.
- Header area.
- Content area.
- Footer/action area.
- Elevated or flat variant.
- Dark mode.
- Token-based styling.

Possible API:

```
<n-card>
  <n-card-header>
    Project status
  </n-card-header>

  <n-card-content>
    Everything is running.
  </n-card-content>

  <n-card-footer>
    <n-button>Open</n-button>
  </n-card-footer>
</n-card>
```

------

## 22. Theme System Requirements

The theme system should be based on:

- CSS variables.
- TypeScript tokens.
- Light/dark mode support.
- App-level provider.
- Minimal setup.

Possible token groups:

```
color
surface
border
radius
shadow
spacing
font
motion
zIndex
```

Example CSS variable names:

```
--n-color-primary
--n-color-primary-contrast
--n-surface-base
--n-surface-raised
--n-border-subtle
--n-radius-md
--n-shadow-card
--n-motion-fast
```

------

## 23. Motion Rules

Motion should use GSAP carefully.

Rules:

- Never run GSAP on the server.
- Motion should be opt-in.
- Components should not animate by default in a way that hurts accessibility.
- Respect reduced motion where possible.
- Keep initial motion utilities simple.

Possible future utilities:

```
provideNeuralMotion()
nFadeIn
nScaleIn
nSlideIn
```

But do not overbuild this in the first commit.

------

## 24. Playground App

`apps/playground` is used to manually test components.

It should include:

- A page for buttons.
- A page for cards.
- A page for theme tokens.
- A dark/light mode toggle.
- Simple component demos.
- No production complexity.

The playground should import the local package.

------

## 25. Documentation Strategy

Documentation should live in:

```
apps/docs
docs/
```

Initially, use Markdown files.

Do not build a fancy documentation website before the first UI package works.

Initial docs:

```
docs/architecture/overview.md
docs/ui/getting-started.md
docs/ui/button.md
docs/ui/card.md
docs/ssr/vision.md
docs/meta-framework/vision.md
```

------

## 26. Coding Style

Use:

- TypeScript.
- Standalone Angular components.
- Clear public APIs.
- Small files.
- Explicit exports.
- Conventional commits.
- Prefer composition over inheritance.
- Prefer tokens over hardcoded visual values.
- Avoid clever abstractions too early.

Do not:

- Generate huge files.
- Add unnecessary dependencies.
- Create incomplete fake APIs.
- Add SSR/meta-framework logic into the UI package.
- Mix playground code with package source.
- Hardcode visual values everywhere.
- Use browser globals directly.

------

## 27. Commit Convention

Use conventional commits:

```
chore: initialize monorepo
feat(ui): add button component
feat(ui): add card component
feat(ui): add theme tokens
docs: add architecture overview
test(ui): add button tests
fix(ui): improve disabled button styles
```

------

## 28. Current Priority

The current priority is:

```
Initialize the repository and create the first working version of @neural/angular-ui.
```

The AI agent should focus on this order:

1. Create monorepo structure.
2. Configure pnpm workspace.
3. Configure Nx if not already configured.
4. Create `packages/ui`.
5. Create `apps/playground`.
6. Add first UI tokens.
7. Add `NButton`.
8. Add `NCard`.
9. Export components.
10. Use them in playground.
11. Add basic docs.
12. Ensure build works.

------

## 29. Definition of Done for First Iteration

The first iteration is complete when:

```
pnpm install
pnpm build
pnpm dev
```

work correctly, and the playground can render:

```
<n-button variant="primary">Primary</n-button>
<n-card>Example card</n-card>
```

using the local `@neural/angular-ui` package.

------

## 30. Important Instruction for the AI Agent

Do not try to build the final framework in one pass.

Do not create fake complexity.

Do not invent unnecessary APIs.

Start with a professional but minimal foundation.

Prefer real working code over impressive architecture.

The first milestone is not to look like Next.js.

The first milestone is to have a real Angular UI package that builds, imports and looks good.

After that, we will add SSR.

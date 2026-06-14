# Neural Angular

Neural Angular is an Angular-first ecosystem for building modern, production-ready applications with clear conventions and modular packages.

The project is intentionally starting small. The first focus is `@neural/angular-ui`, a UI package that will provide standalone Angular components, theme foundations, and design-system primitives that can be consumed independently.

Future packages will expand the ecosystem with SSR and hybrid rendering helpers, an optional meta-framework layer, CLI tooling, schematics, and deployment adapters. Each package should remain useful on its own and avoid unnecessary magic.

## Initial Workspace

This repository is an Nx monorepo managed with pnpm. The initial structure reserves space for applications, packages, examples, documentation, and tooling scripts while the first shippable package is developed.

```txt
apps/
packages/
examples/
docs/
tools/
```

## Current Focus

The next milestone is to create `@neural/angular-ui` and a playground app that consumes it. Component implementation, SSR utilities, CLI commands, schematics, and adapters are intentionally deferred until the workspace foundation is ready.

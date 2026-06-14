# Architecture Overview

Neural Angular is organized as a modular Nx monorepo with separate package boundaries for UI, SSR, meta-framework conventions, CLI tooling, schematics, and deployment adapters.

The imported Claude Design reference is stored in `docs/design_system/`. It informs the future UI package visually and technically, while implementation should still happen inside package boundaries such as `packages/ui`.

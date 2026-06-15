# Neural Angular UI Implementation Plan

## Phase 0 - Design System Documentation

- Index imported design system.
- Audit tokens.
- Inventory components.
- Map HTML/CSS references to Angular candidates.
- Document SSR and browser-only risks.

## Phase 1 - Foundation

- Phase 1A complete: create package structure and migrate the curated token foundation.
- Phase 1B complete: add a minimal Angular theme provider and token playground validation.
- Phase 1C complete: add `NButton`, `NCard`, public exports, docs, and playground component demos.
- Phase 1D complete: add Lucide integration, `NIcon`, `NBadge`, `NChip`, docs, and core composition demos.
- Phase 1E complete: add forms, feedback, avatar, status dot, and empty state primitives.
- Phase 1F complete: add layout and navigation MVP with `NShell`, `NSidebar`, `NToolbar`, `NTabs`, `NPageHeader`, and `NCommandBar`.
- Phase 1G complete: add data display MVP with `NStatCard`, `NMetricCard`, `NDataCard`, `NTimeline`, and `NTable`.
- Phase 1H complete: add overlay/feedback MVP with `NDialog`, `NDrawer`, `NToast`, `NTooltip`, and `NPopover`.
- Create token package structure.
- Create theme CSS entry.
- Decide which imported `--nn-*` tokens become public.
- Create Angular theme provider.
- Create `NButton`.
- Create `NCard`.
- Create basic icon strategy.
- Create `NIcon`.
- Create `NBadge`.
- Create `NChip`.
- Create `NInput`, `NTextarea`, and `NSelect`.
- Create `NAvatar`, `NProgress`, `NSpinner`, `NEmptyState`, and `NStatusDot`.
- Create layout primitives: `NShell`, `NSidebar`, `NToolbar`, `NTabs`, `NPageHeader`, and `NCommandBar`.
- Create data display primitives: `NStatCard`, `NMetricCard`, `NDataCard`, `NTimeline`, and `NTable`.
- Create overlay primitives: `NDialog`, `NDrawer`, `NToast`, `NTooltip`, and `NPopover`.

## Phase 2 - Core UI

- `NBadge`
- `NChip`
- `NInput` or Material-compatible input theme
- `NAvatar`
- `NProgress`
- `NEmptyState`

## Phase 3 - Layout & Navigation

- `NShell` - complete MVP
- `NSidebar` - complete MVP
- `NToolbar` - complete MVP
- `NTabs` - complete MVP
- `NPageHeader` - complete MVP
- `NCommandBar` - complete MVP

## Phase 4 - Data Display

- `NStatCard` - complete MVP
- `NMetricCard` - complete MVP
- `NDataCard` - complete MVP
- `NTable` - complete MVP
- `NTimeline` - complete MVP

## Phase 5 - Overlay & Feedback

- `NDialog` - complete MVP
- `NDrawer` - complete MVP
- `NToast` - complete MVP
- `NTooltip` - complete MVP
- `NPopover` - complete MVP

## Phase 6 - AI Patterns

- `NVoiceOrb`
- `NPromptInput`
- `NStreamingText`
- `NNeuralCanvas`
- `NAIPipeline`

## Phase 7 - Product-specific Packages

- Move Oroya Video components to a separate future package or app layer.
- Examples:
  - `OVSplitCompare`
  - `OVVideoPreview`
  - `OVProcessingPipeline`
  - `OVGpuMonitor`
  - `OVModelCard`
  - `OVJobProgress`

## Implementation Boundary

The first implementation steps are intentionally limited to `packages/ui/` structure, CSS entry points, curated public `--n-*` tokens, compatibility-only `--nn-*` mappings, token metadata, a minimal SSR-safe theme provider, Lucide icon provider, Core UI primitives, layout/navigation primitives, data display primitives, overlay/feedback primitives, and an Angular playground preview. Advanced motion, SSR package helpers, CLI, schematics, and adapters remain out of scope until later requirements.

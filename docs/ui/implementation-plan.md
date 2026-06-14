# Neural Angular UI Implementation Plan

## Phase 0 - Design System Documentation

- Index imported design system.
- Audit tokens.
- Inventory components.
- Map HTML/CSS references to Angular candidates.
- Document SSR and browser-only risks.

## Phase 1 - Foundation

- Create token package structure.
- Create theme CSS entry.
- Decide which imported `--nn-*` tokens become public.
- Create Angular theme provider.
- Create basic icon strategy.
- Create `NButton`.
- Create `NCard`.

## Phase 2 - Core UI

- `NBadge`
- `NChip`
- `NInput` or Material-compatible input theme
- `NAvatar`
- `NProgress`
- `NEmptyState`

## Phase 3 - Layout & Navigation

- `NShell`
- `NSidebar`
- `NToolbar`
- `NTabs`
- `NCommandBar`

## Phase 4 - Data Display

- `NStatCard`
- `NMetricCard`
- `NDataCard`
- `NTable` / Material table theme
- `NTimeline`

## Phase 5 - AI Patterns

- `NVoiceOrb`
- `NPromptInput`
- `NStreamingText`
- `NNeuralCanvas`
- `NAIPipeline`

## Phase 6 - Product-specific Packages

- Move Oroya Video components to a separate future package or app layer.
- Examples:
  - `OVSplitCompare`
  - `OVVideoPreview`
  - `OVProcessingPipeline`
  - `OVGpuMonitor`
  - `OVModelCard`
  - `OVJobProgress`

## Implementation Boundary

The real implementation starts after this documentation phase. The next requirement should create the initial `@neural/angular-ui` package structure and migrate only the token foundation, without implementing all components yet.

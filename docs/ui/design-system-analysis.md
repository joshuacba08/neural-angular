# Neural Angular Design System Analysis

## Summary

The imported design system appears to describe "Neural Angular - Design System v1.2" with a Gemini Dark visual direction, Angular Material alignment, Lucide icon usage, GSAP-powered demos, and a token system based on `--nn-*` CSS variables.

The export should be treated as reference material. It contains useful visual decisions and component ideas, but it also contains prototype-only scripts, inline handlers, direct DOM access, Canvas demos, and global animation calls that should not be copied directly into Angular.

## Visual Direction

- Dark-first interface with blue-black backgrounds.
- Gemini-inspired four-stop gradients across blue, violet, pink, and rose.
- Premium developer-tool aesthetic for dashboards, AI tools, media apps, and data workflows.
- Heavy use of glass surfaces, gradient borders, soft glow, and compact information density.
- Product references include AI workspace shells and Oroya Video media workflows.

## Design Principles

- Neural-first: the design language leans on neural graph, AI pipeline, orb, streaming, and assistant metaphors.
- Dark by Default: all foundation tokens and demos assume a dark canvas as the base experience.
- Gradient-driven: gradients are used for primary actions, highlights, borders, values, and visual emphasis.
- 4px Grid: spacing tokens use a 4px scale from `--nn-s1` through `--nn-s32`.
- Meaningful Motion: motion is present in loading, progress, AI, media, and entrance demos, but must become opt-in and accessibility-aware.
- Multiplatform / PWA-ready: the app prototypes include desktop sidebars, top bars, bottom navigation patterns, dense panels, and responsive product surfaces.

## Foundation

### Colors

The foundation uses a Gemini Dark canvas with `--nn-bg-canvas`, `--nn-bg-base`, `--nn-surface-1` through `--nn-surface-4`, translucent borders, and text levels `--nn-t1` through `--nn-t4`.

### Gradients

The main gradient system is `--nn-grad-g`, plus directional and paired variants such as `--nn-grad-g-90`, `--nn-grad-blue-v`, `--nn-grad-v-pink`, and `--nn-grad-blue-cyan`.

### Typography

The token source uses Plus Jakarta Sans / Google Sans for display and body text, with JetBrains Mono / Cascadia Code for monospace UI. The type scale runs from `--nn-sz-10` to `--nn-sz-64`.

### Spacing

Spacing uses a 4px grid: `--nn-s1` is 4px, `--nn-s2` is 8px, and the scale continues through `--nn-s32` at 128px.

### Radius

Radius tokens range from `--nn-r-none` to `--nn-r-full`, with common component radii around `--nn-r-sm`, `--nn-r-md`, and `--nn-r-lg`.

### Elevation

Elevation tokens `--nn-elev-0` through `--nn-elev-5` define dark shadow stacks for surface depth.

### Glow

Glow tokens exist for blue/teal, violet, gradient, success, and error states. The naming includes legacy teal and blue/violet aliases that need cleanup before implementation.

### Motion

Motion tokens include standard, decelerated, and spring easing plus durations from 150ms to 550ms. The HTML demos also use GSAP directly, which should be replaced with browser-only Angular wrappers later.

## Component Families

The broad component reference in `components.html` includes buttons, forms, cards, chips, badges, navigation, dialogs, controls, inspector panels, comparison views, dropzones, loading states, status indicators, command bars, metric cards, timelines, split views, data cards, empty states, overlays, advanced forms, action menus, tables, trees, picklists, toasts, drawers, tooltips, carousels, galleries, and image comparison.

High-value base candidates for the first UI package are `NThemeProvider`, token CSS, `NButton`, `NCard`, `NIcon`, `NBadge`, and `NChip`. The first real implementation should still stay smaller than the full inventory.

## AI Patterns

`ai-patterns.html` includes Voice Orb, Waveform, Chat Interface, AI Prompt Input, Neural Canvas, Progress Orbital, Streaming Text, AI Pipeline, KPI Cards, and GPU Widget. These are strong future differentiators, but many rely on Canvas, animated SVG, direct DOM updates, and timed effects.

## Data Patterns

`data-patterns.html` includes Stats Cards, KPI Grid, Mini Stats, Line Chart, Calendar, and Data Table. Some can become core data display components later; chart and calendar behavior should probably integrate with established libraries or Angular Material/CDK patterns when implemented.

## Oroya Video Specific Patterns

`Oroya Components.html` uses `ov-*` classes for OVSplitCompare, OVVideoPreview, OVProcessingPipeline, OVGpuMonitor, OVModelCard, and OVJobProgress. These should be treated as product-specific examples for Oroya Video or a future app package, not as base `@neural/angular-ui` components.

`Oroya Video.html` and `Oroya App.html` are app prototypes. They are useful for app shell, sidebar, topbar, workflow, modal, toast, processing, analytics, and AI product interaction references.

## Angular Implementation Notes

- Convert HTML prototypes into standalone Angular components.
- Use Angular templates and event bindings instead of inline `onclick`.
- Represent visual state with inputs, signals, computed values, and typed models.
- Keep global theme tokens in explicit CSS entry points.
- Prefer Angular Material and CDK where they provide accessibility, overlay, focus, table, form, or navigation behavior.
- Keep Lucide icon strategy explicit, likely via a small `NIcon` wrapper or provider.
- Keep GSAP optional and browser-only.

## SSR and Hydration Risks

The demos use patterns that are unsafe for SSR if copied literally:

- `window`
- `document`
- `location` / hash navigation
- inline `onclick`
- `setInterval`
- `setTimeout`
- Canvas drawing
- direct GSAP calls in global scripts
- manual DOM manipulation via `querySelector` and `getElementById`
- global Lucide replacement through `window.lucide`

In Angular, these should become standalone components, signals, Angular event bindings, services/providers, browser-only guards, `afterNextRender` where DOM setup is needed, and GSAP wrappers that never run on the server.

## Risks / Things Not To Copy Literally

- Do not copy large HTML prototypes into component templates.
- Do not copy script blocks into Angular lifecycle hooks without platform guards.
- Do not rely on global `window.gsap` or `window.lucide`.
- Do not preserve duplicate or ambiguous token aliases without review.
- Do not mix product-specific `ov-*` APIs into the base UI package.
- Do not implement all visual patterns in the first UI milestone.

## Recommended Next Steps

1. Normalize the token foundation into a future `@neural/angular-ui` theme entry.
2. Decide which `--nn-*` names become public and which aliases remain private or legacy.
3. Create only the package structure and token foundation next.
4. After tokens are stable, implement `NButton` and `NCard` as the first component proof.

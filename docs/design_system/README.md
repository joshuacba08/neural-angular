# Imported Design System Reference

`docs/design_system/` contains reference material exported from Claude Design for Neural Angular. It is not the final implementation of `@neural/angular-ui`, and the HTML files should be treated as prototypes and demos rather than Angular source.

The material is useful as a visual, conceptual, and technical source for the future UI package. `nn-tokens.css` is the primary token source. The Oroya files are product and app references, not mandatory base components for the UI kit.

| Archivo | Tipo | Contenido detectado | Uso futuro |
|---|---|---|---|
| `Neural Angular.html` | Design system overview | Foundation, design principles, colors, gradients, typography, spacing, radius, elevation, glow | Conceptual source for UI foundations |
| `nn-tokens.css` | CSS tokens | Variables `--nn-*`, Gemini Dark tokens, Angular Material v22 mapping, legacy aliases | Primary source for token migration |
| `components.html` | Component library reference | Buttons, inputs, cards, chips, badges, navigation, dialogs, controls, data display, overlays, feedback | Source for UI inventory and priorities |
| `ai-patterns.html` | AI pattern reference | Voice orb, waveform, chat, prompt input, neural canvas, orbital progress, streaming text, AI pipeline, GPU widget | Source for future AI patterns |
| `data-patterns.html` | Data UI reference | Stats cards, KPI grid, mini stats, line chart, calendar, data table | Source for data display patterns |
| `Oroya Components.html` | Product-specific components | OVSplitCompare, OVVideoPreview, OVProcessingPipeline, OVGpuMonitor, OVModelCard, OVJobProgress | Oroya Video reference, not base UI |
| `Oroya Video.html` | App prototype | Video enhancement app shell, processing queue, settings, project views, modal and toast demos | App-level reference |
| `Oroya App.html` | App prototype | AI platform shell, monitor, analytics, model registry, experiments, datasets, integrations | App-level reference |
| `screenshots/` | Assets/reference | Visual captures of exported designs | Visual QA and reference material |
| `uploads/` | Assets/reference | Support images from the Claude Design export | Visual reference material |
| `.thumbnail` | Export helper asset | Thumbnail used by the imported design package | Keep with export; do not ignore by default |

## Usage Notes

- Use this folder as reference material only.
- Do not copy inline scripts or global DOM manipulation into Angular.
- Convert useful patterns into standalone Angular components only in later implementation tasks.
- Keep `ov-*` classes and `OV*` components outside the base `@neural/angular-ui` package unless an app layer explicitly needs them.

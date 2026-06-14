# Source to Angular Map

## Source Files

| Source file | Role |
|---|---|
| `docs/design_system/nn-tokens.css` | Token source and Angular Material mapping reference |
| `docs/design_system/Neural Angular.html` | Foundation and design-system overview |
| `docs/design_system/components.html` | Broad component reference |
| `docs/design_system/ai-patterns.html` | AI pattern reference |
| `docs/design_system/data-patterns.html` | Data UI pattern reference |
| `docs/design_system/Oroya Components.html` | Product-specific Oroya Video components |
| `docs/design_system/Oroya Video.html` | Oroya Video app prototype |
| `docs/design_system/Oroya App.html` | AI app prototype |

## CSS Class Prefixes

| Prefix | Meaning | Angular target |
|---|---|---|
| `.nn-*` | Neural UI component and utility styles | Candidate source for `@neural/angular-ui` |
| `.ov-*` | Oroya Video product components | Keep outside core UI |
| `.sb-*`, `.nav-*`, `.tb-*` | Shell, sidebar, nav, topbar prototype styles | Layout references for later shell components |
| `.orb-*`, `.wave-*`, `.neural-*`, `.ai-*` | AI-specific visual patterns | Future AI pattern components |
| `.stat-*`, `.chart-*`, `.tbl-*`, `.cal-*` | Data display prototypes | Future data display components |

## Suggested Angular Prefixes

| Source class/prefix | Meaning | Angular target |
|---|---|---|
| `.nn-btn` | Base button style | `NButton` |
| `.nn-card` | Base card style | `NCard` |
| `.nn-input` | Input field style | `NInput` or Material form-field theme |
| `.nn-chip` | Chip style | `NChip` |
| `.nn-badge` | Badge/status pill | `NBadge` |
| `.nn-tabs` | Tab navigation | `NTabs` or Material tabs theme |
| `.nn-table` | Table style | `NTable` or Material table theme |
| `.nn-toast`, `.nn-msg` | Toast/message feedback | `NToast`, `NMessage` |
| `.nn-dlg-*`, `.nn-dr-*` | Dialog and drawer | `NDialog`, `NDrawer`, likely CDK/Material based |
| `.ov-*` | Oroya Video specific | Keep outside core UI |

## Mapping Rules

- Use `nn-*` as visual inspiration for `@neural/angular-ui`.
- Keep `ov-*` product-specific and outside the base UI package.
- Convert class state names like `.on`, `.active`, `.done`, `.wait`, `.installed`, and `.avail` into typed inputs, signals, computed state, or router state.
- Convert repeated prototype markup into Angular content projection and small component APIs.
- Convert inline styles into tokens, component CSS, or documented CSS variables.
- Prefer Angular Material/CDK primitives where they solve accessibility, overlay, focus, form, table, or navigation behavior.

## Examples

| Prototype pattern | Angular migration |
|---|---|
| `<button class="nn-btn nn-btn-f">` | `<n-button variant="primary">` |
| `<div class="nn-card">` | `<n-card>` with projected header/content/footer |
| `<span class="nn-badge">` | `<n-badge status="success">` or semantic inputs |
| `<div class="nn-chip on">` | `<n-chip [selected]="true">` |
| `<canvas class="wave-canvas">` | Browser-only waveform component with guarded rendering |
| `<div class="ov-job">` | Oroya app component, not core UI |

## Browser-only Logic

Source patterns using `window`, `document`, `location`, `querySelector`, `getElementById`, `addEventListener`, `setInterval`, and `setTimeout` must not be copied directly.

In Angular they should become:

- Angular event bindings.
- Signals and computed state.
- Services or providers for shared behavior.
- `isPlatformBrowser` or equivalent guards.
- `afterNextRender` for browser-only DOM setup.
- Cleanup through Angular lifecycle utilities.

## GSAP Migration Rules

- Keep GSAP optional.
- Never call GSAP during server rendering.
- Wrap GSAP access in a browser-only provider or motion utility.
- Respect reduced motion.
- Prefer CSS transitions for simple state changes.
- Use GSAP only for complex sequences that justify it.

## Canvas Migration Rules

- Treat Canvas demos as browser-only.
- Render canvases after the client has mounted.
- Keep server HTML deterministic and non-interactive.
- Provide non-canvas fallback markup when practical.
- Clean up animation loops and event listeners.

## Lucide Icon Migration Rules

- Avoid global `window.lucide.createIcons()` in Angular.
- Use an Angular icon strategy, likely via `NIcon` or a provider.
- Keep icon names typed where practical.
- Ensure icons have accessible labels only when they convey meaning; decorative icons should be hidden from assistive tech.

## Material/CDK Integration Notes

- Use Angular Material token mapping from `nn-tokens.css` as the starting reference.
- Prefer CDK overlay for dialogs, drawers, popovers, tooltips, and command palettes.
- Prefer Material or CDK form/table primitives when accessibility behavior is non-trivial.
- Keep Neural styling as a theme layer over proven behavior.

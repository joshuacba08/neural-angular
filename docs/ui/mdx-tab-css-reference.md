# MDX Tab System — CSS Implementation Reference

> How the four-tab navigation (FEATURES / API / THEMING / PLAYGROUND) works inside Neural Angular's Storybook.

---

## Mechanism Overview

The tab system is implemented using the **CSS checkbox hack** applied to radio inputs. It requires:

- Zero JavaScript
- Zero React state
- No Storybook-specific APIs
- Compatible with Storybook's MDX renderer in any version

The entire interaction is driven by `:checked` CSS pseudo-class combined with the general sibling combinator `~`.

---

## DOM Structure

The MDX renders this HTML structure inside Storybook's docs iframe:

```html
<div class="n-doc-tabs">

  <!-- State controllers (visually hidden) -->
  <input class="n-doc-tabs__input" type="radio" name="btn-tabs" id="btn-tab-features"
         value="features" checked />
  <input class="n-doc-tabs__input" type="radio" name="btn-tabs" id="btn-tab-api"
         value="api" />
  <input class="n-doc-tabs__input" type="radio" name="btn-tabs" id="btn-tab-theming"
         value="theming" />
  <input class="n-doc-tabs__input" type="radio" name="btn-tabs" id="btn-tab-playground"
         value="playground" />

  <!-- Tab labels (visible, clickable) -->
  <div class="n-doc-tabs__list" role="tablist">
    <label class="n-doc-tabs__tab" data-tab="features" for="btn-tab-features">Features</label>
    <label class="n-doc-tabs__tab" data-tab="api"      for="btn-tab-api">API</label>
    <label class="n-doc-tabs__tab" data-tab="theming"  for="btn-tab-theming">Theming</label>
    <label class="n-doc-tabs__tab" data-tab="playground" for="btn-tab-playground">Playground</label>
  </div>

  <!-- Content panels -->
  <section class="n-doc-tabs__panel" data-tab="features" id="features"> ... </section>
  <section class="n-doc-tabs__panel" data-tab="api"      id="api">      ... </section>
  <section class="n-doc-tabs__panel" data-tab="theming"  id="theming">  ... </section>
  <section class="n-doc-tabs__panel" data-tab="playground" id="playground"> ... </section>

</div>
```

### Critical DOM ordering rule

The radio `<input>` elements must appear **before** `.n-doc-tabs__list` and **before** all `.n-doc-tabs__panel` elements in source order. The `~` sibling combinator only works forward in the DOM.

---

## CSS Implementation

The following CSS is in `packages/ui/src/stories/storybook-theme.css` and loaded via `packages/ui/.storybook/preview-head.html`.

```css
/* ─────────────────────────────────────────────────────────────────────────────
   Neural Angular – MDX Tab System
   ───────────────────────────────────────────────────────────────────────────── */

/* Hide the radio inputs — they are state controllers only */
.n-doc-tabs__input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Tab list container */
.n-doc-tabs__list {
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 2rem;
}

/* Individual tab label */
.n-doc-tabs__tab {
  position: relative;
  padding: 10px 20px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition:
    color 150ms ease,
    border-color 150ms ease;
  user-select: none;
}

.n-doc-tabs__tab:hover {
  color: rgba(255, 255, 255, 0.75);
}

/* Hide all panels by default */
.n-doc-tabs__panel {
  display: none;
}

/* ─── Show panel when its controlling radio is checked ─── */
.n-doc-tabs__input[value="features"]:checked
  ~ .n-doc-tabs__list
  ~ .n-doc-tabs__panel[data-tab="features"],

.n-doc-tabs__input[value="api"]:checked
  ~ .n-doc-tabs__list
  ~ .n-doc-tabs__panel[data-tab="api"],

.n-doc-tabs__input[value="theming"]:checked
  ~ .n-doc-tabs__list
  ~ .n-doc-tabs__panel[data-tab="theming"],

.n-doc-tabs__input[value="playground"]:checked
  ~ .n-doc-tabs__list
  ~ .n-doc-tabs__panel[data-tab="playground"] {
  display: block;
}

/* ─── Active tab label styles ─── */
.n-doc-tabs__input[value="features"]:checked
  ~ .n-doc-tabs__list [data-tab="features"],

.n-doc-tabs__input[value="api"]:checked
  ~ .n-doc-tabs__list [data-tab="api"],

.n-doc-tabs__input[value="theming"]:checked
  ~ .n-doc-tabs__list [data-tab="theming"],

.n-doc-tabs__input[value="playground"]:checked
  ~ .n-doc-tabs__list [data-tab="playground"] {
  color: #8ab4f8;                            /* --n-color-primary-bright */
  border-bottom-color: #4285f4;              /* --n-color-primary */
}
```

---

## Selector Logic Explained

The key CSS rule follows this pattern:

```
[radio]:checked ~ [tab-list] ~ [panel-with-matching-data-tab]
```

Breaking this down for the "API" tab:

```
.n-doc-tabs__input[value="api"]:checked
```
Targets the radio input whose `value` attribute equals `"api"` AND is currently checked.

```
~ .n-doc-tabs__list
```
Moves to the **first** sibling `.n-doc-tabs__list` that follows the checked radio.

```
~ .n-doc-tabs__panel[data-tab="api"]
```
Moves to the `.n-doc-tabs__panel` sibling that has `data-tab="api"`.

This is why DOM order matters: **radio inputs → list → panels** (all siblings inside `.n-doc-tabs`).

---

## Where the CSS is Loaded

### `packages/ui/.storybook/preview-head.html`

```html
<link
  rel="stylesheet"
  href="./src/stories/storybook-theme.css"
/>
```

This injects styles into Storybook's docs iframe so they apply globally across all MDX pages.

> **Note:** Do not use `manager-head.html` for this — that injects into the Storybook chrome frame (sidebar), not into the docs iframe where the MDX content renders.

---

## Naming Rules (avoid conflicts)

Each component's MDX file must use a unique `name` attribute on its radio inputs. If two components use the same `name`, their radio buttons will interfere — switching tabs on one component will reset the other.

### Pattern

```
name="<component-kebab>-doc-tabs"
```

### Examples

```html
<!-- button.docs.mdx -->
name="button-doc-tabs"

<!-- card.docs.mdx -->
name="card-doc-tabs"

<!-- data-view.docs.mdx -->
name="data-view-doc-tabs"

<!-- prompt-input.docs.mdx -->
name="prompt-input-doc-tabs"
```

---

## Table Styles

Inside MDX tab panels, use `<div className="n-doc-table-wrap">` to wrap `<table>` elements. This class applies horizontal scroll on narrow viewports and consistent cell padding.

```css
.n-doc-table-wrap {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.n-doc-table-wrap table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.n-doc-table-wrap th {
  padding: 10px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.n-doc-table-wrap td {
  padding: 9px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.87);
  vertical-align: top;
}

.n-doc-table-wrap tr:last-child td {
  border-bottom: none;
}

.n-doc-table-wrap code {
  background: rgba(255, 255, 255, 0.07);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: var(--n-font-mono);
}
```

---

## Accessibility Notes

The CSS-only approach has some accessibility trade-offs compared to a full ARIA `tablist` implementation:

| Feature | Status |
|---|---|
| Keyboard navigation between tabs | Works via browser-native radio key handling (arrow keys) |
| Screen reader tab role | Not announced as `role="tab"` — the element is a `<label>` |
| Focus indicator on active tab | Inherits from browser default on the radio input |
| Deep linking to a specific tab | Not supported (no URL state) |

For the documentation surface (Storybook) this trade-off is acceptable. If this tab system were used in a production UI, it should be replaced with a proper `role="tablist"` / `role="tab"` / `role="tabpanel"` implementation using Angular CDK's `TabGroup`.

---

## Troubleshooting

### Tabs don't switch

**Cause:** The MDX JSX is compiled with `className` (React attribute), not `class`. Ensure the MDX file uses `className` throughout — not `class`.

```mdx
<!-- ✅ Correct -->
<div className="n-doc-tabs">

<!-- ❌ Wrong — MDX is JSX, not HTML -->
<div class="n-doc-tabs">
```

### All panels hidden, no tab active

**Cause:** The `name` attribute on radio inputs is not unique across the page.

**Fix:** Use a unique `name` per component (e.g. `button-doc-tabs`, `card-doc-tabs`).

### Styles not applying

**Cause:** The CSS is not being injected into the docs iframe.

**Fix:** Confirm that `preview-head.html` has the `<link>` tag and that the path is relative to the `.storybook/` directory.

### First tab not open by default

**Cause:** The `defaultChecked` prop is missing from the first radio input.

```mdx
<!-- ✅ Correct: features tab opens by default -->
<input
  className="n-doc-tabs__input"
  type="radio"
  name="component-doc-tabs"
  id="component-doc-tab-features"
  value="features"
  defaultChecked
/>
```

Note: MDX is JSX, so use `defaultChecked` (React/JSX prop), not `checked` (which would be a controlled component).

---

## Related Documents

- [`docs/ui/component-docs-guide.md`](./component-docs-guide.md) — Full MDX structure guide
- [`docs/ui/component-docs-template.mdx`](./component-docs-template.mdx) — Copy-paste template
- [`packages/ui/src/stories/storybook-theme.css`](../../packages/ui/src/stories/storybook-theme.css) — Source CSS
- [`packages/ui/.storybook/preview-head.html`](../../packages/ui/.storybook/preview-head.html) — CSS injection

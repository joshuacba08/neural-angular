# Neural Angular — Component Documentation Guide

> **How Neural Angular documents its components using MDX with four tabs: FEATURES, API, THEMING, PLAYGROUND**

---

## Overview

Neural Angular documents components inside **Storybook** using pure MDX files — not auto-generated autodocs, not React stories as the primary surface. Each component has a dedicated `*.docs.mdx` file that lives **next to the component source**.

The documentation is structured around four tabs rendered via CSS-radio-button technique:

| Tab | Purpose |
|---|---|
| **Features** | Visual walkthroughs, live Canvas embeds, usage patterns |
| **API** | Full `ArgTypes` table + custom variant/size reference tables |
| **Theming** | CSS class catalogue + design token reference |
| **Playground** | Single interactive Canvas + Controls panel |

---

## Directory Layout

Each component folder follows this pattern:

```
packages/ui/src/<component>/
├── <component>.component.ts     # Angular standalone component
├── <component>.types.ts         # Exported TypeScript types
├── <component>.stories.ts       # Storybook stories (no autodocs tag)
├── <component>.docs.mdx         # ← Primary documentation surface
└── index.ts                     # Public entry re-export
```

### Why the docs live next to the source

- Co-location keeps docs in sync with the component API as it evolves.
- Storybook's glob pattern `../**/*.docs.mdx` picks them up automatically.
- The MDX file imports from `./component.stories` so it always references the live component — not a stale copy.

---

## Storybook Configuration

### `packages/ui/.storybook/main.ts`

```ts
const config: StorybookConfig = {
  // MDX files are included alongside stories
  stories: [
    '../**/*.stories.@(js|jsx|ts|tsx)',
    '../**/*.docs.mdx',        // ← picks up all *.docs.mdx files
  ],
  docs: {
    defaultName: 'Docs',
    docsMode: true,            // Storybook opens in docs mode by default
  },
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],  // GitHub Flavored Markdown in MDX
          },
        },
      },
    },
    '@storybook/addon-a11y',
  ],
  framework: { name: '@storybook/angular', options: {} },
};
```

### `packages/ui/.storybook/preview.ts`

```ts
const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideNeuralTheme({ defaultTheme: 'dark', storage: false }),
        provideNeuralIcons(),
        provideNeuralOverlay(),
      ],
    }),
  ],
  parameters: {
    viewMode: 'docs',          // ← Always lands on docs view
    docs: { theme: neuralTheme },
  },
  tags: ['autodocs'],          // ← Global autodocs (overridden per story with '!autodocs')
};
```

> **Important:** Stories files set `tags: ['!autodocs']` to suppress the auto-generated page. The `*.docs.mdx` file is the **only** docs page shown for each component.

---

## The Four-Tab MDX Structure

The tab system uses a **CSS-only radio button trick** — no JavaScript framework required, works perfectly in Storybook's MDX renderer.

### How it works

1. Four hidden `<input type="radio">` elements control state via `:checked`.
2. `<label>` elements styled as tab buttons respond to clicks.
3. `<section>` panels are shown/hidden with CSS `[data-tab]` selectors driven by the `:checked` state.
4. The CSS lives in the Storybook theme stylesheet (`packages/ui/src/stories/storybook-theme.css`).

### Full MDX template

```mdx
import { ArgTypes, Canvas, Meta, Controls } from '@storybook/addon-docs/blocks';
import * as ComponentStories from './component.stories';

<Meta of={ComponentStories} />

# Component Name

Short one-line description of what the component does.

<div className="n-doc-tabs">
  {/* ─── Radio inputs (hidden, control tab state) ─── */}
  <input
    className="n-doc-tabs__input"
    type="radio"
    name="component-doc-tabs"
    id="component-doc-tab-features"
    value="features"
    aria-label="Features"
    defaultChecked
  />
  <input
    className="n-doc-tabs__input"
    type="radio"
    name="component-doc-tabs"
    id="component-doc-tab-api"
    value="api"
    aria-label="API"
  />
  <input
    className="n-doc-tabs__input"
    type="radio"
    name="component-doc-tabs"
    id="component-doc-tab-theming"
    value="theming"
    aria-label="Theming"
  />
  <input
    className="n-doc-tabs__input"
    type="radio"
    name="component-doc-tabs"
    id="component-doc-tab-playground"
    value="playground"
    aria-label="Playground"
  />

  {/* ─── Tab labels ─── */}
  <div className="n-doc-tabs__list" aria-label="Component documentation sections">
    <label className="n-doc-tabs__tab" data-tab="features" htmlFor="component-doc-tab-features">
      Features
    </label>
    <label className="n-doc-tabs__tab" data-tab="api" htmlFor="component-doc-tab-api">
      API
    </label>
    <label className="n-doc-tabs__tab" data-tab="theming" htmlFor="component-doc-tab-theming">
      Theming
    </label>
    <label className="n-doc-tabs__tab" data-tab="playground" htmlFor="component-doc-tab-playground">
      Playground
    </label>
  </div>

  {/* ─── FEATURES panel ─── */}
  <section className="n-doc-tabs__panel" data-tab="features" id="features">

## Features

### Import

```ts
import { NComponent } from '@neural/angular-ui/component';
```

### Basic

Description of the basic usage pattern.

<Canvas of={ComponentStories.Basic} layout="centered" sourceState="shown" />

### Variant Group

Description of this variant group.

<Canvas of={ComponentStories.VariantGroup} layout="padded" sourceState="hidden" />

  </section>

  {/* ─── API panel ─── */}
  <section className="n-doc-tabs__panel" data-tab="api" id="api">

## API

<ArgTypes of={ComponentStories} sort="requiredFirst" />

### Enums

<div className="n-doc-table-wrap">
  <table>
    <thead>
      <tr><th>Value</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td><code>value</code></td><td>Description</td></tr>
    </tbody>
  </table>
</div>

  </section>

  {/* ─── THEMING panel ─── */}
  <section className="n-doc-tabs__panel" data-tab="theming" id="theming">

## Theming

### CSS Classes

<div className="n-doc-table-wrap">
  <table>
    <thead>
      <tr><th>Class</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td><code>.n-component</code></td><td>Root element</td></tr>
    </tbody>
  </table>
</div>

### Design Tokens

<div className="n-doc-table-wrap">
  <table>
    <thead>
      <tr><th>Token</th><th>Used for</th></tr>
    </thead>
    <tbody>
      <tr><td><code>--n-color-primary</code></td><td>Primary accent color</td></tr>
    </tbody>
  </table>
</div>

  </section>

  {/* ─── PLAYGROUND panel ─── */}
  <section className="n-doc-tabs__panel" data-tab="playground" id="playground">

## Playground

Interact with the component controls below to see options change in real-time.

<Canvas of={ComponentStories.Playground} layout="centered" sourceState="hidden" />
<Controls of={ComponentStories.Playground} />

  </section>
</div>
```

---

## Naming Conventions

### MDX file name

Always use `<component-kebab-name>.docs.mdx`:

```
button.docs.mdx
card.docs.mdx
avatar.docs.mdx
data-view.docs.mdx
```

### Radio input `name` attribute

Use `<component>-doc-tabs` — must be **unique per component** across the whole Storybook or tabs will interfere:

```html
<!-- Button -->
name="button-doc-tabs"

<!-- Card -->
name="card-doc-tabs"

<!-- Avatar -->
name="avatar-doc-tabs"
```

### Radio input `id` / label `htmlFor`

Follow the pattern `<component>-doc-tab-<tab>`:

```
button-doc-tab-features
button-doc-tab-api
button-doc-tab-theming
button-doc-tab-playground
```

---

## Tab Content Guidelines

### FEATURES tab

- Always start with the **import snippet**.
- Each subsection maps to one named story (`Canvas of={Stories.StoryName}`).
- Use `sourceState="shown"` for the primary "Basic" story and key composed examples.
- Use `sourceState="hidden"` for showcase grids (variant grids, size matrices).
- Use `layout="centered"` for isolated components, `layout="padded"` for groups.
- Prose should be minimal — one sentence per section is enough.

#### Story ordering in FEATURES

```
1. Import
2. Basic          ← always first, sourceState="shown"
3. Variants       ← grouped showcases
4. Sizes
5. Special states (icon-only, full-width, loading, etc.)
6. Compositions   ← complex usage combining subcomponents
```

### API tab

- Always embed `<ArgTypes of={Stories} sort="requiredFirst" />` at the top.
- Follow with **custom reference tables** for complex enums (variants, sizes).
- Use `<div className="n-doc-table-wrap"><table>` for all custom tables.
- Group argTypes in the `.stories.ts` file by `table.category`:
  - `Appearance` — variant, size, color
  - `State` — disabled, loading, active
  - `Layout` — fullWidth, iconOnly, orientation
  - `Behavior` — type, debounce, trigger
  - `Accessibility` — ariaLabel, role, ariaDescribedBy
  - `Content` — placeholder, label, items

### THEMING tab

- List **every CSS class** that the component host and its internal elements receive.
- List **every `--n-*` token** the component's stylesheet consumes.
- Do NOT document tokens the component does not use.
- Separate into two tables: "CSS Classes" and "Design Tokens".

### PLAYGROUND tab

- Single `Canvas` + `Controls` block.
- The `Playground` story in `.stories.ts` must expose **all** meaningful inputs via args.
- `sourceState="hidden"` — the template code panel is togglable by the user.
- No prose needed in this tab.

---

## Stories File Rules

Stories used by the MDX file must follow these conventions:

### Suppress autodocs

```ts
const meta: Meta<NComponent> = {
  title: 'Components/ComponentName',
  component: NComponent,
  tags: ['!autodocs'],          // ← Required: MDX file owns the docs page
  // ...
};
```

### Define a Playground story

```ts
export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-component
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
      >
        Label
      </n-component>
    `,
  }),
};
```

### Define showcase stories (no args)

Showcase stories render static HTML and are embedded in the FEATURES tab:

```ts
export const GradientFilled: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-component variant="primary">Primary</n-component>
        <n-component variant="accent">Accent</n-component>
        <n-component variant="danger">Danger</n-component>
      </div>
    `,
  }),
};
```

### ArgTypes structure

```ts
argTypes: {
  variant: {
    description: 'Visual treatment of the component.',
    control: 'select',
    options: ['primary', 'secondary', 'ghost'],
    table: {
      category: 'Appearance',
      type: { summary: 'NComponentVariant' },
      defaultValue: { summary: 'primary' },
    },
  },
  disabled: {
    description: 'Disables user interaction.',
    control: 'boolean',
    table: {
      category: 'State',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
}
```

---

## CSS Tab Mechanism

The tabs work without JavaScript. The CSS is defined in `packages/ui/src/stories/storybook-theme.css` and injected via `packages/ui/.storybook/preview-head.html`.

### How the CSS selector cascade works

```css
/* Hide all panels by default */
.n-doc-tabs__panel {
  display: none;
}

/* Show the panel whose data-tab matches the checked radio */
.n-doc-tabs__input[value="features"]:checked ~ .n-doc-tabs__list ~ .n-doc-tabs__panel[data-tab="features"],
.n-doc-tabs__input[value="api"]:checked ~ .n-doc-tabs__list ~ .n-doc-tabs__panel[data-tab="api"],
.n-doc-tabs__input[value="theming"]:checked ~ .n-doc-tabs__list ~ .n-doc-tabs__panel[data-tab="theming"],
.n-doc-tabs__input[value="playground"]:checked ~ .n-doc-tabs__list ~ .n-doc-tabs__panel[data-tab="playground"] {
  display: block;
}

/* Style the active tab label */
.n-doc-tabs__input[value="features"]:checked ~ .n-doc-tabs__list [data-tab="features"],
.n-doc-tabs__input[value="api"]:checked ~ .n-doc-tabs__list [data-tab="api"],
.n-doc-tabs__input[value="theming"]:checked ~ .n-doc-tabs__list [data-tab="theming"],
.n-doc-tabs__input[value="playground"]:checked ~ .n-doc-tabs__list [data-tab="playground"] {
  color: var(--n-color-primary-bright);
  border-bottom-color: var(--n-color-primary);
}
```

> **Why CSS-only?** MDX in Storybook renders in an iframe where Storybook's React runtime is not guaranteed to be available for arbitrary JSX interactions. The radio+CSS approach works reliably across all Storybook versions, requires zero runtime dependencies, and is SSR-safe if docs pages are ever pre-rendered.

---

## Blocks Reference

The MDX file uses these official `@storybook/addon-docs` blocks:

| Block | Import | Purpose |
|---|---|---|
| `<Meta>` | `@storybook/addon-docs/blocks` | Links MDX to a stories file, sets the sidebar title |
| `<Canvas>` | `@storybook/addon-docs/blocks` | Embeds a rendered story with optional source |
| `<ArgTypes>` | `@storybook/addon-docs/blocks` | Renders the full inputs table from argTypes |
| `<Controls>` | `@storybook/addon-docs/blocks` | Renders interactive controls for a story's args |

### `<Canvas>` props used in Neural Angular

| Prop | Values used | Effect |
|---|---|---|
| `of` | `{Stories.StoryName}` | Which story to render |
| `layout` | `"centered"` / `"padded"` | Canvas viewport padding |
| `sourceState` | `"shown"` / `"hidden"` | Whether code block starts open |

---

## Checklist: Adding a New Component

Follow this checklist when adding a new component to `@neural/angular-ui`:

- [ ] Create `<component>.component.ts` with standalone Angular component
- [ ] Create `<component>.types.ts` with exported type aliases
- [ ] Create `<component>.stories.ts` with:
  - [ ] `tags: ['!autodocs']` in meta
  - [ ] `Playground` story with all inputs exposed via `args`
  - [ ] `Basic` story with `sourceState="shown"`
  - [ ] Showcase stories for each variant group, sizes, states
  - [ ] Full `argTypes` with `description`, `control`, `table.category`, `table.type`, `table.defaultValue`
- [ ] Create `<component>.docs.mdx` with:
  - [ ] `<Meta of={...} />` at top
  - [ ] Four-tab structure (FEATURES, API, THEMING, PLAYGROUND)
  - [ ] FEATURES: import snippet + one `<Canvas>` per showcase story
  - [ ] API: `<ArgTypes>` + variant/size custom tables
  - [ ] THEMING: CSS classes table + design tokens table
  - [ ] PLAYGROUND: `<Canvas>` + `<Controls>` for the Playground story
- [ ] Create `index.ts` re-exporting the component and types
- [ ] Add export to `packages/ui/src/index.ts`
- [ ] Create companion `docs/ui/<component>.md` (standalone Markdown reference)

---

## Running Storybook

```bash
# From monorepo root
pnpm nx run @neural/angular-ui:storybook

# Open in browser
# Default: http://localhost:4400
```

Storybook opens in `docsMode: true` — the sidebar shows only docs pages, no story canvas entries. The FEATURES tab is active by default (`defaultChecked` on the first radio input).

---

## Related Documents

- [`docs/ui/button.md`](./button.md) — Reference documentation for `NButton`
- [`docs/ui/card.md`](./card.md) — Reference documentation for `NCard`
- [`docs/ui/tokens.md`](./tokens.md) — Full design token reference
- [`docs/ui/getting-started.md`](./getting-started.md) — Installation and setup
- [`packages/ui/src/button/button.docs.mdx`](../../packages/ui/src/button/button.docs.mdx) — Live MDX example (Button)
- [`packages/ui/src/card/card.docs.mdx`](../../packages/ui/src/card/card.docs.mdx) — Live MDX example (Card)
- [`packages/ui/.storybook/main.ts`](../../packages/ui/.storybook/main.ts) — Storybook configuration

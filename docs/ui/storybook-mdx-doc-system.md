# Storybook MDX Documentation System
## A guide for teams wanting to implement the Neural Angular approach

**Version:** 1.0  
**Stack:** Storybook 8 · Angular · MDX 3 · CSS-only tabs  
**Scope:** Component documentation with four tabs: FEATURES · API · THEMING · PLAYGROUND

---

## 1. What this system is

Neural Angular documents its UI components inside Storybook using **pure MDX files**, not auto-generated autodocs. Each component ships a single `*.docs.mdx` file that lives beside the component source. This file is the only documentation page for that component in the Storybook sidebar.

The page is structured around four tabs:

| Tab | Content |
|---|---|
| **FEATURES** | Visual walkthroughs with live, embedded story canvases. Usage patterns with code. |
| **API** | The full inputs table auto-generated from argTypes. Reference tables for variants and sizes. |
| **THEMING** | Every CSS class the component applies. Every design token the component consumes. |
| **PLAYGROUND** | A single interactive story with all controls wired up. |

The tab navigation is implemented with **zero JavaScript** — a CSS radio-button trick that works across all Storybook versions and in static builds.

---

## 2. Why this approach instead of autodocs

Storybook's built-in `autodocs` tag generates a page automatically from stories. It is convenient, but its layout is fixed. You cannot reorder sections, add custom tables, group related examples by tab, or add narrative prose between canvases.

MDX gives full authoring control while keeping access to all live Storybook blocks (`<Canvas>`, `<ArgTypes>`, `<Controls>`). The documentation page stays in sync with the component because it imports directly from the stories file.

The four-tab structure was chosen because it answers four distinct reader intents:

- **"What does this component do?"** → FEATURES
- **"What are all the inputs?"** → API
- **"How do I override its styles?"** → THEMING
- **"Let me try it live."** → PLAYGROUND

Putting all four in one scrollable page creates cognitive overload. The tabs keep each concern focused.

---

## 3. File layout

Every component folder follows this structure:

```
packages/ui/src/<component>/
│
├── <component>.component.ts    Angular standalone component
├── <component>.types.ts        Exported TypeScript type aliases
├── <component>.stories.ts      Storybook stories  ← data source for the MDX
├── <component>.docs.mdx        Documentation page ← owns the visual layout
└── index.ts                    Public re-export
```

The MDX file imports named exports from the stories file. The stories file has `tags: ['!autodocs']` so Storybook does not generate a second docs page for the same component.

---

## 4. Storybook configuration

### 4.1 `main.ts`

```ts
import type { StorybookConfig } from '@storybook/angular';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: [
    '../**/*.stories.@(js|jsx|ts|tsx)',
    '../**/*.docs.mdx',            // picks up every *.docs.mdx co-located with source
  ],
  docs: {
    defaultName: 'Docs',
    docsMode: true,                // Storybook opens in docs view by default
  },
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],  // enables GFM tables, strikethrough, etc.
          },
        },
      },
    },
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: async (config) => {
    // Resolve .js imports to .ts source files in the monorepo
    config.resolve = config.resolve ?? {};
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
    };
    return config;
  },
};

export default config;
```

> **Key decisions:**
> - `docsMode: true` hides story canvas entries from the sidebar; only docs pages are shown.
> - `remarkGfm` enables GFM table syntax in MDX (pipes for tables, `---` for separators).

### 4.2 `preview.ts`

```ts
import { applicationConfig, type Preview } from '@storybook/angular';
import { provideTheme, provideIcons } from '../src/index.js';
import { brandTheme } from './theme.js';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideTheme({ defaultTheme: 'dark', storage: false }),
        provideIcons(),
        // add any other app-level providers here
      ],
    }),
  ],
  parameters: {
    viewMode: 'docs',             // landing mode for each sidebar entry
    docs: { theme: brandTheme },  // apply brand theme to docs pages
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',    value: '#06060e' },
        { name: 'surface', value: '#0f0f1c' },
        { name: 'light',   value: '#f7f8fb' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          'Foundation',
          'Components',
          'Forms',
          'App Patterns',
          '*',
        ],
      },
    },
  },
  tags: ['autodocs'],             // enables autodocs globally; stories opt out per-file
};

export default preview;
```

### 4.3 `preview-head.html`

This file injects content into Storybook's **docs iframe** — the sandbox where components render. Load fonts and a global stylesheet here.

```html
<!-- Typefaces -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>

<!-- Global docs stylesheet (tab system, table styles, story layout helpers) -->
<link rel="stylesheet" href="./src/stories/docs-theme.css" />

<style>
  /* Transparent backgrounds so component surfaces show correctly */
  .sbdocs,
  .sbdocs-wrapper,
  .sbdocs-content,
  .docs-story {
    background: transparent !important;
  }
</style>
```

> **Important:** `preview-head.html` injects into the **docs iframe**. `manager-head.html` injects into the outer Storybook chrome (sidebar). Fonts and component CSS go in `preview-head.html`.

---

## 5. The MDX four-tab structure

### 5.1 How it works

The tab system uses the **CSS general sibling combinator** (`~`) combined with the `:checked` pseudo-class on hidden `<input type="radio">` elements.

DOM order inside `.n-doc-tabs` must be exactly:

```
1. All four radio <input> elements   (before everything else)
2. The .n-doc-tabs__list             (tab label bar)
3. The four .n-doc-tabs__panel sections
```

The CSS selects the correct panel like this:

```css
.n-doc-tabs__input[value="api"]:checked
  ~ .n-doc-tabs__list
  ~ .n-doc-tabs__panel[data-tab="api"] {
  display: block;
}
```

When the user clicks a label, it checks the corresponding hidden radio input via the `for`/`htmlFor` binding. The CSS immediately shows the matching panel and styles the active tab label — no JavaScript involved.

### 5.2 Complete MDX template

Copy this file, then do a find-and-replace of `component` → your component's kebab name and `NComponent` → your class name.

```mdx
import { ArgTypes, Canvas, Meta, Controls } from '@storybook/addon-docs/blocks';

import * as ComponentStories from './component.stories';

<Meta of={ComponentStories} />

# Component Name

`NComponent` is a standalone Angular component that — _one-line description_.

<div className="n-doc-tabs">

  {/* ── Radio state controllers (must be first children) ────────────────── */}
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

  {/* ── Tab label bar ────────────────────────────────────────────────────── */}
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

  {/* ══════════════════════════════════════════════════════════════════════
      FEATURES
      ══════════════════════════════════════════════════════════════════════ */}
  <section className="n-doc-tabs__panel" data-tab="features" id="features">

## Features

### Import

```ts
import { NComponent } from '@your-org/ui/component';
```

### Basic

The default variant is `primary`. Content is projected via `ng-content`.

<Canvas of={ComponentStories.Basic} layout="centered" sourceState="shown" />

### Variants

Filled, outlined, tonal and ghost treatments.

<Canvas of={ComponentStories.Variants} layout="padded" sourceState="hidden" />

### Sizes

Four sizes: `sm` (32 px) · `md` (40 px) · `lg` (48 px) · `xl` (56 px).

<Canvas of={ComponentStories.Sizes} layout="centered" sourceState="hidden" />

### States

`loading` disables the control, sets `aria-busy="true"`, and shows a centered spinner.

<Canvas of={ComponentStories.States} layout="centered" sourceState="hidden" />

  </section>

  {/* ══════════════════════════════════════════════════════════════════════
      API
      ══════════════════════════════════════════════════════════════════════ */}
  <section className="n-doc-tabs__panel" data-tab="api" id="api">

## API

Defines the input properties of `NComponent`.

<ArgTypes of={ComponentStories} sort="requiredFirst" />

### Variants

<div className="n-doc-table-wrap">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>CSS class applied</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>primary</code></td>
        <td><code>.n-component--primary</code></td>
        <td>Default gradient fill</td>
      </tr>
      <tr>
        <td><code>secondary</code></td>
        <td><code>.n-component--secondary</code></td>
        <td>Muted ghost action</td>
      </tr>
    </tbody>
  </table>
</div>

### Sizes

<div className="n-doc-table-wrap">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Height</th>
        <th>CSS class applied</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>sm</code></td><td>32 px</td><td><code>.n-component--sm</code></td></tr>
      <tr><td><code>md</code></td><td>40 px</td><td>default — no modifier class</td></tr>
      <tr><td><code>lg</code></td><td>48 px</td><td><code>.n-component--lg</code></td></tr>
      <tr><td><code>xl</code></td><td>56 px</td><td><code>.n-component--xl</code></td></tr>
    </tbody>
  </table>
</div>

  </section>

  {/* ══════════════════════════════════════════════════════════════════════
      THEMING
      ══════════════════════════════════════════════════════════════════════ */}
  <section className="n-doc-tabs__panel" data-tab="theming" id="theming">

## Theming

### CSS Classes

<div className="n-doc-table-wrap">
  <table>
    <thead>
      <tr>
        <th>Class</th>
        <th>Applied to</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>.n-component</code></td>
        <td>Root <code>&lt;button&gt;</code></td>
        <td>Base styles, layout, transitions</td>
      </tr>
      <tr>
        <td><code>.n-component__content</code></td>
        <td>Label wrapper</td>
        <td>Flex row for icon + text</td>
      </tr>
      <tr>
        <td><code>.n-component__loader</code></td>
        <td>Spinner element</td>
        <td>Visible only when loading</td>
      </tr>
      <tr>
        <td><code>.n-component--primary</code></td>
        <td>Root</td>
        <td>Primary variant modifier</td>
      </tr>
      <tr>
        <td><code>.n-component--loading</code></td>
        <td>Root</td>
        <td>Loading state modifier</td>
      </tr>
    </tbody>
  </table>
</div>

### Design Tokens

<div className="n-doc-table-wrap">
  <table>
    <thead>
      <tr>
        <th>Token</th>
        <th>Used for</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>--n-color-primary</code></td>
        <td>Accent color, focus ring</td>
      </tr>
      <tr>
        <td><code>--n-radius-full</code></td>
        <td>Pill border radius</td>
      </tr>
      <tr>
        <td><code>--n-font-body</code></td>
        <td>Typeface</td>
      </tr>
      <tr>
        <td><code>--n-duration-base</code></td>
        <td>Hover/focus transition duration</td>
      </tr>
      <tr>
        <td><code>--n-ease-standard</code></td>
        <td>Hover/focus transition easing</td>
      </tr>
    </tbody>
  </table>
</div>

  </section>

  {/* ══════════════════════════════════════════════════════════════════════
      PLAYGROUND
      ══════════════════════════════════════════════════════════════════════ */}
  <section className="n-doc-tabs__panel" data-tab="playground" id="playground">

## Playground

Interact with the controls below to explore options in real-time. Toggle **Show code** to view the generated template.

<Canvas of={ComponentStories.Playground} layout="centered" sourceState="hidden" />
<Controls of={ComponentStories.Playground} />

  </section>

</div>
```

### 5.3 MDX syntax rules

MDX compiles as **JSX**, not HTML. These differences catch teams off-guard:

| HTML attribute | MDX / JSX equivalent |
|---|---|
| `class="..."` | `className="..."` |
| `for="..."` | `htmlFor="..."` |
| `checked` (controlled) | `defaultChecked` (uncontrolled) |
| `<!-- comment -->` | `{/* comment */}` |
| Self-closing `<br>` | `<br />` |

---

## 6. The companion stories file

### 6.1 Full annotated template

```ts
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NComponent } from './component.component.js';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<NComponent> = {
  title: 'Components/ComponentName',   // → sidebar path
  component: NComponent,

  // REQUIRED: prevents Storybook from auto-generating a second docs page.
  // The *.docs.mdx file is the only docs page for this component.
  tags: ['!autodocs'],

  decorators: [
    moduleMetadata({
      // Declare every Angular component/directive used in story templates.
      imports: [NComponent],
    }),
  ],

  // ── ArgTypes ────────────────────────────────────────────────────────────────
  // Every input gets a full entry: description, control type, table metadata.
  // The <ArgTypes> block in the API tab renders this automatically.
  argTypes: {

    // Appearance inputs
    variant: {
      description: 'Visual treatment of the component.',
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      table: {
        category: 'Appearance',
        type: { summary: 'NComponentVariant' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Component height and horizontal padding.',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'md' },
      },
    },

    // State inputs
    disabled: {
      description: 'Disables user interaction.',
      control: 'boolean',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      description: 'Shows a spinner, disables the control, and sets aria-busy.',
      control: 'boolean',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // Layout inputs
    fullWidth: {
      description: 'Expands the component to the full container width.',
      control: 'boolean',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // Accessibility inputs
    ariaLabel: {
      description: 'Accessible label when iconOnly is true.',
      control: 'text',
      table: {
        category: 'Accessibility',
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
      },
    },

  },

  // Default values for args — drives the Playground story's initial state.
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    ariaLabel: null,
  },
};

export default meta;
type Story = StoryObj<NComponent>;

// ─── Stories ──────────────────────────────────────────────────────────────────

// PLAYGROUND — wires every input to an arg for live Controls.
// Used by the PLAYGROUND tab: <Canvas of={Stories.Playground} />
export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-component
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [fullWidth]="fullWidth"
        [ariaLabel]="ariaLabel"
      >
        Label
      </n-component>
    `,
  }),
};

// BASIC — minimal example with sourceState="shown" in FEATURES.
export const Basic: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <n-component [variant]="variant" [size]="size">
        Save changes
      </n-component>
    `,
  }),
};

// SHOWCASE STORIES — static grids, no args, sourceState="hidden".
// Used in FEATURES tab to show all variants / sizes / states at once.

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-component variant="primary">Primary</n-component>
        <n-component variant="secondary">Secondary</n-component>
        <n-component variant="ghost">Ghost</n-component>
        <n-component variant="danger">Danger</n-component>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-component size="sm">Small</n-component>
        <n-component size="md">Medium</n-component>
        <n-component size="lg">Large</n-component>
        <n-component size="xl">XLarge</n-component>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-component [loading]="true">Loading</n-component>
        <n-component [disabled]="true">Disabled</n-component>
      </div>
    `,
  }),
};
```

### 6.2 ArgTypes category reference

Group every input into exactly one of these categories for a clean API tab:

| Category | Input examples |
|---|---|
| `Appearance` | `variant`, `size`, `color`, `shape`, `accent` |
| `State` | `disabled`, `loading`, `active`, `selected`, `expanded` |
| `Layout` | `fullWidth`, `iconOnly`, `orientation`, `align` |
| `Behavior` | `type`, `debounce`, `trigger`, `closeOnSelect` |
| `Content` | `placeholder`, `label`, `items`, `src`, `alt` |
| `Accessibility` | `ariaLabel`, `role`, `ariaDescribedBy` |

### 6.3 Story naming and export order

Keep this order in every stories file:

```
1. export default meta
2. type Story = StoryObj<NComponent>
3. export const Playground          ← always first named export
4. export const Basic               ← always second
5. export const <VariantGroup>      ← one per FEATURES section
6. export const Sizes
7. export const States
8. export const <SpecialCases>      ← WithIcon, FullWidth, Composed, etc.
```

---

## 7. CSS tab system — complete source

Create a file at `src/stories/docs-theme.css` (or equivalent) and reference it from `preview-head.html`.

```css
/* ═══════════════════════════════════════════════════════════════════════════
   MDX Four-Tab System
   Works via CSS :checked + ~ (general sibling combinator). No JavaScript.
   ═══════════════════════════════════════════════════════════════════════════ */

/* 1. Visually hide the radio inputs — they are pure state controllers */
.n-doc-tabs__input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

/* 2. Tab list container */
.n-doc-tabs__list {
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 2rem;
}

/* 3. Individual tab label */
.n-doc-tabs__tab {
  position: relative;
  padding: 10px 20px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;          /* overlap the list border-bottom */
  transition:
    color 150ms ease,
    border-color 150ms ease;
  user-select: none;
  letter-spacing: 0.01em;
}

.n-doc-tabs__tab:hover {
  color: rgba(255, 255, 255, 0.75);
}

/* 4. All panels hidden by default */
.n-doc-tabs__panel {
  display: none;
}

/* 5. Show the panel whose data-tab matches the checked radio value */
.n-doc-tabs__input[value="features"]:checked ~ .n-doc-tabs__list ~ .n-doc-tabs__panel[data-tab="features"],
.n-doc-tabs__input[value="api"]:checked      ~ .n-doc-tabs__list ~ .n-doc-tabs__panel[data-tab="api"],
.n-doc-tabs__input[value="theming"]:checked  ~ .n-doc-tabs__list ~ .n-doc-tabs__panel[data-tab="theming"],
.n-doc-tabs__input[value="playground"]:checked ~ .n-doc-tabs__list ~ .n-doc-tabs__panel[data-tab="playground"] {
  display: block;
}

/* 6. Style the active tab label */
.n-doc-tabs__input[value="features"]:checked   ~ .n-doc-tabs__list [data-tab="features"],
.n-doc-tabs__input[value="api"]:checked        ~ .n-doc-tabs__list [data-tab="api"],
.n-doc-tabs__input[value="theming"]:checked    ~ .n-doc-tabs__list [data-tab="theming"],
.n-doc-tabs__input[value="playground"]:checked ~ .n-doc-tabs__list [data-tab="playground"] {
  color: #8ab4f8;                    /* active label color — replace with your brand */
  border-bottom-color: #4285f4;      /* active underline — replace with your brand */
}

/* ═══════════════════════════════════════════════════════════════════════════
   Reference Table Styles (used in API and THEMING tabs)
   ═══════════════════════════════════════════════════════════════════════════ */

.n-doc-table-wrap {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.n-doc-table-wrap table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
  line-height: 1.5;
}

.n-doc-table-wrap th {
  padding: 10px 16px;
  text-align: left;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  white-space: nowrap;
}

.n-doc-table-wrap td {
  padding: 9px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.82);
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
  font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
  color: rgba(255, 255, 255, 0.9);
}

/* ═══════════════════════════════════════════════════════════════════════════
   Story Layout Helpers (used inside showcase story templates)
   ═══════════════════════════════════════════════════════════════════════════ */

/* Horizontal flex row — use in showcase templates */
.n-story-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

/* Vertical flex column — use for stacked showcase templates */
.n-story-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Panel surface — use for ghost/outline variant showcases */
.n-story-panel {
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
}
```

---

## 8. Naming rules that prevent conflicts

When multiple component docs pages are open at the same time (e.g. navigating between Button and Card), their radio inputs must not interfere. This happens when two components share the same `name` attribute on their radio inputs — checking a tab on one resets the other.

### Rule

Every `*.docs.mdx` file must use a **unique `name` per component** on its four radio inputs.

### Pattern

```
name="<component-kebab>-doc-tabs"
```

### Examples

```
button        →  name="button-doc-tabs"
card          →  name="card-doc-tabs"
data-view     →  name="data-view-doc-tabs"
prompt-input  →  name="prompt-input-doc-tabs"
voice-orb     →  name="voice-orb-doc-tabs"
```

The `id` attributes follow:

```
id="<component>-doc-tab-features"
id="<component>-doc-tab-api"
id="<component>-doc-tab-theming"
id="<component>-doc-tab-playground"
```

And labels use `htmlFor` matching those IDs.

---

## 9. Canvas block reference

`<Canvas>` is the Storybook block that renders a live story inside the docs page. These are the props used in this system:

| Prop | Type | Values | Description |
|---|---|---|---|
| `of` | Story ref | `{Stories.StoryName}` | Which story to render |
| `layout` | string | `"centered"` · `"padded"` · `"fullscreen"` | Viewport padding mode |
| `sourceState` | string | `"shown"` · `"hidden"` · `"none"` | Initial state of the code block |

### When to use each layout

| Layout | Use case |
|---|---|
| `"centered"` | Single isolated component (button, badge, spinner) |
| `"padded"` | Groups of components (variant grids, size matrices) |
| `"fullscreen"` | Full-page patterns (shell, sidebar, data views) |

### When to show source

| Story | `sourceState` |
|---|---|
| `Basic` | `"shown"` — reader expects to see the code |
| `Variants` | `"hidden"` — the grid speaks for itself |
| `Sizes` | `"hidden"` |
| `States` | `"hidden"` |
| `WithIcon` | `"shown"` — projection pattern is worth showing |
| `Composed` | `"shown"` — subcomponent nesting is the point |
| `Playground` | `"hidden"` — reader toggles if they want it |

---

## 10. What to put in each tab

### FEATURES

- Start with the **import snippet** (always the first subsection).
- One `<Canvas>` per named story. Order: Basic → Variants → Sizes → Special cases → States.
- One sentence of prose per subsection. The live canvas does the heavy lifting.
- Use `sourceState="shown"` for Basic and any pattern where the code is instructive.
- Use `sourceState="hidden"` for grids where the visual is the documentation.

### API

- Open with `<ArgTypes of={Stories} sort="requiredFirst" />` — this renders the auto-generated table from argTypes.
- Follow with custom `<div className="n-doc-table-wrap"><table>` blocks for variant and size enumerations. Do not try to fit those into the ArgTypes summary; the custom tables are clearer.
- Verify every input appears in argTypes with a `description`, `control`, `table.category`, `table.type`, and `table.defaultValue`. Missing any of these creates an incomplete row.

### THEMING

- List **every CSS class** the component applies to itself and its internal elements. Do not list classes that might be applied by a parent.
- List **every `--custom-property`** the component's stylesheet reads. Do not list tokens the component does not use.
- Two tables: "CSS Classes" and "Design Tokens". Keep them separate — they answer different questions.

### PLAYGROUND

- One `<Canvas of={Stories.Playground} layout="centered" sourceState="hidden" />`.
- One `<Controls of={Stories.Playground} />` immediately after.
- No prose, no heading hierarchy — this tab is purely interactive.
- The `Playground` story in the stories file must bind **all** meaningful inputs as args.

---

## 11. Checklist for a new component

Use this when adding a component to the library from scratch.

**Component source**
- [ ] `<component>.component.ts` — standalone Angular component, signals for inputs
- [ ] `<component>.types.ts` — exported TypeScript type aliases for variant, size, etc.
- [ ] `index.ts` — re-exports the component class and its types

**Stories file** (`<component>.stories.ts`)
- [ ] `tags: ['!autodocs']` in meta
- [ ] Full `argTypes` for every input: `description`, `control`, `table.category`, `table.type`, `table.defaultValue`
- [ ] `Playground` story — all inputs bound via `args`
- [ ] `Basic` story — minimal template with args
- [ ] One showcase story per FEATURES section (Variants, Sizes, States, etc.)
- [ ] All Angular components used in templates declared in `moduleMetadata.imports`

**MDX docs file** (`<component>.docs.mdx`)
- [ ] `<Meta of={...} />` at top
- [ ] Unique `name` attribute on radio inputs (`<component>-doc-tabs`)
- [ ] Unique `id` per radio/label pair
- [ ] FEATURES tab: import snippet + one `<Canvas>` per showcase story
- [ ] API tab: `<ArgTypes>` + custom tables for variants and sizes
- [ ] THEMING tab: CSS classes table + design tokens table
- [ ] PLAYGROUND tab: `<Canvas>` + `<Controls>` only

**Integration**
- [ ] Component exported from the package `index.ts`
- [ ] Verify in Storybook: FEATURES tab opens by default, all four tabs switch correctly, ArgTypes table is complete, Controls panel responds in PLAYGROUND

---

## 12. Troubleshooting

### All panels are hidden — no tab is active

**Cause A:** The first radio input is missing `defaultChecked`.  
**Fix:** Add `defaultChecked` (JSX, not `checked`) to the first `<input>`.

```mdx
<input ... value="features" defaultChecked />
```

**Cause B:** The `name` attribute on radio inputs collides with another component's MDX on the same page (rare in Storybook but possible).  
**Fix:** Use unique `name` values per component (section 8).

---

### Tabs don't switch when clicked

**Cause:** You used `class=` instead of `className=` in the MDX.  
**Fix:** MDX compiles to JSX. Every HTML attribute that differs in React must use its JSX name.

```mdx
{/* ✅ correct */}
<div className="n-doc-tabs">
  <label htmlFor="..." ...>

{/* ❌ wrong — MDX is JSX, not HTML */}
<div class="n-doc-tabs">
  <label for="..." ...>
```

---

### The CSS tab styles are not applying

**Cause:** The stylesheet is not injected into the docs iframe.  
**Fix:** The `<link>` tag must be in `preview-head.html`, not `manager-head.html`.

```html
<!-- preview-head.html ← correct file -->
<link rel="stylesheet" href="./src/stories/docs-theme.css" />
```

---

### `<ArgTypes>` table shows empty or missing rows

**Cause:** The argType entry is missing one or more required fields.  
**Fix:** Every argType must have `description`, `control`, and a `table` object with `category`, `type.summary`, and `defaultValue.summary`.

```ts
myInput: {
  description: 'What this input does.',
  control: 'boolean',
  table: {
    category: 'State',                    // required for grouping
    type: { summary: 'boolean' },         // required for Type column
    defaultValue: { summary: 'false' },   // required for Default column
  },
},
```

---

### The Playground Controls panel is empty

**Cause:** The `Playground` story uses a static `render: () => ({...})` instead of `render: (args) => ({...})`.  
**Fix:** The Playground story must receive `args` and bind them in the template.

```ts
// ✅ correct
export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `<n-component [variant]="variant" ...>Label</n-component>`,
  }),
};

// ❌ wrong — no args, no controls
export const Playground: Story = {
  render: () => ({
    template: `<n-component variant="primary">Label</n-component>`,
  }),
};
```

---

## 13. Adapting this system to non-Angular Storybook

The tab CSS and MDX structure work identically in **React**, **Vue**, and **Web Components** Storybook. Only the stories file format changes.

| Part | Framework-specific? |
|---|---|
| `*.docs.mdx` structure | ✅ Universal — pure MDX + HTML |
| CSS tab system | ✅ Universal — pure CSS |
| `<Canvas>`, `<ArgTypes>`, `<Controls>` | ✅ Universal — Storybook addon-docs blocks |
| `*.stories.ts` format | ❌ Angular-specific — use `@storybook/react`, `@storybook/vue3`, etc. |
| `moduleMetadata` decorator | ❌ Angular-specific — use `decorators` from the relevant framework package |

For **React**:

```ts
// React stories equivalent
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['!autodocs'],
  argTypes: { /* same structure as above */ },
};

export const Playground: Story = {
  args: { variant: 'primary' },
  render: (args) => <MyComponent {...args}>Label</MyComponent>,
};
```

The MDX file imports and blocks remain **identical** across frameworks. Only the stories file changes to match the framework's story format.

---

## 14. The dark gradient background — how it's implemented

This is the atmospheric dark background with a subtle grid pattern that appears in both the Storybook chrome (sidebar, toolbar) and inside every docs page and canvas.

### The visual breakdown

The background is composed of **three CSS layers stacked via `background-image`**:

```
Layer 1 (top):    radial-gradient  — the deep purple/dark vignette
Layer 2 (middle): linear-gradient  — horizontal 1px grid lines
Layer 3 (bottom): linear-gradient  — vertical 1px grid lines
```

The grid lines are nearly invisible (`opacity ≈ 1.2%`) — just enough to feel like a technical grid without competing with the components.

```css
background-image:
  radial-gradient(120% 120% at 50% 0%, #0d0b21 0%, #06060e 55%, #020206 100%),
  linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px);

background-size:
  100% 100%,   /* radial — covers entire viewport */
  32px 32px,   /* horizontal grid — 32px row height */
  32px 32px;   /* vertical grid — 32px column width */

background-position: center top, center top, center top;
background-attachment: fixed;   /* stays still while content scrolls */
```

### Colour breakdown of the radial gradient

```
radial-gradient(
  120% 120%         ← oversized so corners don't clip to transparent
  at 50% 0%,        ← origin at top-center (like a light source above)

  #0d0b21 0%,       ← deep indigo-purple at the top
  #06060e 55%,      ← near-black in the middle
  #020206 100%      ← absolute black at the bottom edges
)
```

The `120% 120%` size is intentional — it prevents the gradient from reaching its transparent edge within the viewport, so the background looks uniformly dark everywhere except the purple bloom at the top.

---

### Where each piece is injected

Storybook renders in **two separate browser documents** — the manager (sidebar + toolbar) and the preview (iframe where components render). They need background styles applied independently.

```
Storybook
├── Manager document        ← sidebar, toolbar, breadcrumbs
│   └── manager-head.html   ← inject background here
│
└── Preview iframe          ← canvas + docs pages
    └── preview-head.html   ← inject background here
    └── storybook-theme.css ← also repeats body rule as fallback
```

#### `packages/ui/.storybook/manager-head.html`

Controls the **sidebar and outer chrome**. Applies the gradient to `.sb-body` (the manager root) and ensures docs wrapper containers are transparent so the gradient shows through:

```html
<style>
  .sb-body,
  .sbdocs-wrapper {
    background-image:
      radial-gradient(120% 120% at 50% 0%, #0d0b21 0%, #06060e 55%, #020206 100%),
      linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px) !important;
    background-size: 100% 100%, 32px 32px, 32px 32px !important;
    background-position: center top, center top, center top !important;
    background-attachment: fixed !important;
  }

  /* Docs page containers must be transparent or they block the gradient */
  .sbdocs {
    background: transparent !important;
  }
</style>
```

#### `packages/ui/.storybook/preview-head.html`

Controls the **canvas iframe** — where components actually render and where MDX pages are displayed. Applies the gradient to `body.sb-show-main` (canvas view) and `body.sb-show-docs` (docs view), then clears the background from Storybook's internal wrapper divs:

```html
<style>
  body.sb-show-main,
  body.sb-show-docs {
    background-image:
      radial-gradient(120% 120% at 50% 0%, #0d0b21 0%, #06060e 55%, #020206 100%),
      linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px) !important;
    background-size: 100% 100%, 32px 32px, 32px 32px !important;
    background-position: center top, center top, center top !important;
    background-attachment: fixed !important;
  }

  /* These wrappers have their own background by default — clear them */
  .sbdocs,
  .sbdocs-wrapper,
  .sbdocs-content,
  .docs-story {
    background: transparent !important;
    background-color: transparent !important;
  }
</style>
```

#### `packages/ui/src/stories/storybook-theme.css`

Also declares the same `body` rule as a fallback (this file is linked from `preview-head.html`). This ensures the background persists even if Storybook replaces the body classes in certain views:

```css
body {
  background-image:
    radial-gradient(120% 120% at 50% 0%, #0d0b21 0%, #06060e 55%, #020206 100%),
    linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px) !important;
  background-size: 100% 100%, 32px 32px, 32px 32px !important;
  background-position: center top, center top, center top !important;
  background-attachment: fixed !important;
}

.sbdocs,
.sbdocs-wrapper,
.sbdocs-content,
.docs-story {
  background: transparent !important;
  background-color: transparent !important;
}
```

---

### The Storybook brand theme — flat colours as base

`theme.ts` defines flat solid colours for the Storybook UI tokens (used by the manager chrome like the sidebar, search, inputs). The gradient overrides these via raw CSS on top — the theme acts as the fallback and base colour layer:

```ts
export const neuralTheme = create({
  base: 'dark',

  // These are the flat fallbacks — the gradient CSS overrides them
  appBg: '#0a0a15',            // sidebar background (overridden by gradient)
  appContentBg: '#06060e',     // main content background
  appPreviewBg: '#06060e',     // canvas background
  appBorderColor: 'rgba(255, 255, 255, 0.08)',
  appBorderRadius: 12,

  // Typography
  fontBase: '"Plus Jakarta Sans", "Google Sans", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", "Cascadia Code", monospace',

  // Text hierarchy
  textColor: 'rgba(255, 255, 255, 0.92)',
  textMutedColor: 'rgba(255, 255, 255, 0.58)',

  // Toolbar
  barBg: '#0f0f1c',
  barTextColor: 'rgba(255, 255, 255, 0.58)',
  barSelectedColor: '#669df6',
  barHoverColor: '#8ab4f8',

  // Form controls (search, selects)
  inputBg: '#141426',
  inputBorder: 'rgba(255, 255, 255, 0.12)',
  inputTextColor: 'rgba(255, 255, 255, 0.92)',
  inputBorderRadius: 8,

  // Brand accents
  colorPrimary: '#4285f4',     // blue
  colorSecondary: '#7b5cf6',   // violet
});
```

The theme is registered in `preview.ts`:

```ts
parameters: {
  docs: { theme: neuralTheme },  // applies to MDX docs pages
}
```

And used by Storybook's manager via the `manager.ts` file:

```ts
// .storybook/manager.ts
import { addons } from 'storybook/manager-api';
import { neuralTheme } from './theme.js';

addons.setConfig({ theme: neuralTheme });
```

---

### Why `!important` everywhere

Storybook's own CSS injects `background` rules on the same elements with high specificity (via inline styles or deeply scoped selectors). Without `!important`, the Storybook defaults win and the gradient never shows. This is a known limitation of Storybook's theming system — the `create()` API only exposes a limited set of CSS variables, so raw CSS overrides are the only way to apply background-image gradients.

---

### Why `background-attachment: fixed`

The gradient origin is `at 50% 0%` — top-center of the viewport. Without `fixed`, it would repeat or scroll with the page content, making the purple glow move as the user scrolls through a long docs page. With `fixed`, the gradient stays pinned to the viewport so it always feels like ambient lighting from above, regardless of scroll position.

---

### Adapting the gradient to your brand

To use this system with different brand colours, change the three colour stops in the radial gradient:

```css
radial-gradient(
  120% 120% at 50% 0%,
  #YOUR_ACCENT_DARK  0%,    /* brand hue, very dark */
  #YOUR_NEAR_BLACK   55%,   /* near black with your hue */
  #000000            100%   /* pure black at edges */
)
```

Examples:

```css
/* Blue brand (default Neural Angular) */
radial-gradient(120% 120% at 50% 0%, #0d0b21 0%, #06060e 55%, #020206 100%)

/* Green brand */
radial-gradient(120% 120% at 50% 0%, #081a0f 0%, #060e07 55%, #020402 100%)

/* Orange brand */
radial-gradient(120% 120% at 50% 0%, #1a0e05 0%, #0e0804 55%, #040200 100%)

/* Teal brand */
radial-gradient(120% 120% at 50% 0%, #041414 0%, #040d0d 55%, #020505 100%)
```

Keep the grid lines as-is — `rgba(255, 255, 255, 0.012)` is subtle enough to work against any dark background.

---

*Document prepared by the Neural Angular team. For questions about the implementation, refer to the live examples in `packages/ui/src/button/button.docs.mdx` and `packages/ui/src/button/button.stories.ts`.*

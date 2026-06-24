# Stories File Authoring Guide

> How to write the `*.stories.ts` file that powers a Neural Angular MDX documentation page.

---

## Role of the Stories File

The `*.stories.ts` file serves two purposes:

1. **Data source for the MDX doc page** — all `<Canvas>` and `<ArgTypes>` blocks reference named exports from this file.
2. **Interactive entries in the sidebar** — child story entries appear beneath the docs page in the Storybook sidebar (disabled in `docsMode: true`, but remain available for focused testing).

The stories file does **not** own the visual documentation layout. That responsibility belongs entirely to the `*.docs.mdx` file.

---

## File Structure

```ts
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NComponent } from './component.component.js';
// Import peer components if needed in showcase stories
import { NIcon } from '../icon/icon.component.js';

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<NComponent> = {
  title: 'Components/ComponentName',   // Sidebar path
  component: NComponent,
  tags: ['!autodocs'],                 // Suppress auto-generated page
  decorators: [
    moduleMetadata({
      imports: [NComponent, NIcon],    // All components used in templates
    }),
  ],
  argTypes: { /* see below */ },
  args: { /* default arg values */ },
};

export default meta;
type Story = StoryObj<NComponent>;

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Playground: Story = { /* ... */ };
export const Basic: Story = { /* ... */ };
export const Variants: Story = { /* ... */ };
export const Sizes: Story = { /* ... */ };
export const States: Story = { /* ... */ };
```

---

## Meta Configuration

### `title`

Maps to the Storybook sidebar path. Use one of the established groups:

| Group | Use for |
|---|---|
| `Components/Name` | General-purpose UI components |
| `Forms/Name` | Input, Select, Textarea, etc. |
| `Foundation/Name` | Tokens, Theme, Icons |
| `App Patterns/Name` | Shell, Sidebar, AI Pipeline, etc. |
| `Getting Started/Name` | Installation, Configuration |

### `tags: ['!autodocs']`

**Always required.** Without this, Storybook generates an automatic docs page that conflicts with the MDX file.

### `decorators`

Use `moduleMetadata` to declare all Angular components/directives used in story templates:

```ts
decorators: [
  moduleMetadata({
    imports: [NComponent, NIcon, NBadge],
  }),
],
```

Do not use `applicationConfig` here — that is handled globally in `preview.ts`.

---

## ArgTypes Reference

Each input should have a complete argType entry. Use these categories consistently:

```ts
argTypes: {
  // ── Appearance ──────────────────────────────────────────────────────────
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

  // ── State ───────────────────────────────────────────────────────────────
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

  // ── Layout ──────────────────────────────────────────────────────────────
  fullWidth: {
    description: 'Expands the component to the full container width.',
    control: 'boolean',
    table: {
      category: 'Layout',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  // ── Behavior ────────────────────────────────────────────────────────────
  type: {
    description: 'Native button type attribute.',
    control: 'select',
    options: ['button', 'submit', 'reset'],
    table: {
      category: 'Behavior',
      type: { summary: "'button' | 'submit' | 'reset'" },
      defaultValue: { summary: 'button' },
    },
  },

  // ── Accessibility ────────────────────────────────────────────────────────
  ariaLabel: {
    description: 'Accessible label for icon-only mode.',
    control: 'text',
    table: {
      category: 'Accessibility',
      type: { summary: 'string | null' },
      defaultValue: { summary: 'null' },
    },
  },
}
```

### Category reference

| Category | Input types |
|---|---|
| `Appearance` | `variant`, `size`, `color`, `shape`, `accent` |
| `State` | `disabled`, `loading`, `active`, `selected`, `expanded` |
| `Layout` | `fullWidth`, `iconOnly`, `orientation`, `align` |
| `Behavior` | `type`, `debounce`, `trigger`, `closeOnSelect` |
| `Content` | `placeholder`, `label`, `items`, `src`, `alt` |
| `Accessibility` | `ariaLabel`, `role`, `ariaDescribedBy`, `ariaExpanded` |

---

## Story Types

### 1. Playground story

Used in the PLAYGROUND tab. Exposes all inputs as `args` so `<Controls>` renders interactive knobs.

```ts
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
      >
        Label
      </n-component>
    `,
  }),
};
```

**Rules:**
- Must be named `Playground` exactly.
- The template must bind every input that appears in `argTypes`.
- No hardcoded values in the template — all must come from `args`.

### 2. Basic story

Used first in the FEATURES tab with `sourceState="shown"`. Shows the minimal usage pattern.

```ts
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
      <n-component
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
      >
        Save changes
      </n-component>
    `,
  }),
};
```

**Rules:**
- Named `Basic`.
- Args must be fully specified (no inherited defaults from meta).
- The rendered output must be the simplest useful example of the component.

### 3. Showcase stories

Used in FEATURES tab with `sourceState="hidden"`. No args — they render a fixed grid.

```ts
export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-component variant="primary">Primary</n-component>
        <n-component variant="secondary">Secondary</n-component>
        <n-component variant="ghost">Ghost</n-component>
        <n-component variant="danger">Danger</n-component>
        <n-component variant="primary" [disabled]="true">Disabled</n-component>
        <n-component variant="primary" [loading]="true">Loading</n-component>
      </div>
    `,
  }),
};
```

**Naming convention for showcase stories:**

| Story name | Content |
|---|---|
| `Variants` | All visual variants in one row |
| `Sizes` | All sizes side by side |
| `States` | Loading, disabled, error states |
| `WithIcon` | Component with icon projection |
| `IconOnly` / `IconButtons` | Icon-only circular variant |
| `FullWidthCtas` | Full-width usage |
| `Composed` | Complex composition with subcomponents |
| `InContext` | Component inside a realistic parent |

### 4. Utility classes for showcase layouts

Use these global CSS classes in showcase templates:

```html
<!-- Horizontal row with gap -->
<div class="n-story-row">
  ...
</div>

<!-- Vertical stack with gap -->
<div class="n-story-col">
  ...
</div>

<!-- Panel with surface background (for outline/ghost variants) -->
<section class="n-button-showcase n-button-showcase--panel">
  ...
</section>
```

---

## Default Args

Set default `args` in the meta to keep the Playground story in a useful initial state:

```ts
args: {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  iconOnly: false,
},
```

Individual showcase stories do not need args — they use a static `render: () => ({...})` with no `args` binding.

---

## Export Order Convention

Maintain this order within the stories file for consistency:

```ts
// 1. Meta
export default meta;

// 2. Type alias
type Story = StoryObj<NComponent>;

// 3. Playground (always first named export)
export const Playground: Story = { ... };

// 4. Basic (always second)
export const Basic: Story = { ... };

// 5. Feature showcases (in FEATURES tab order)
export const Variants: Story = { ... };
export const Sizes: Story = { ... };
export const WithIcon: Story = { ... };
export const IconOnly: Story = { ... };
export const FullWidthCtas: Story = { ... };

// 6. State stories
export const States: Story = { ... };
```

---

## Example: Minimal Complete Stories File

```ts
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NAlert } from './alert.component.js';
import { NIcon } from '../icon/icon.component.js';

const meta: Meta<NAlert> = {
  title: 'Components/Alert',
  component: NAlert,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({ imports: [NAlert, NIcon] }),
  ],
  argTypes: {
    variant: {
      description: 'Alert severity level.',
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      table: {
        category: 'Appearance',
        type: { summary: 'NAlertVariant' },
        defaultValue: { summary: 'info' },
      },
    },
    dismissible: {
      description: 'Shows a close button.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      description: 'Alert heading text.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
  args: {
    variant: 'info',
    dismissible: false,
    title: 'Information',
  },
};

export default meta;
type Story = StoryObj<NAlert>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-alert [variant]="variant" [dismissible]="dismissible" [title]="title">
        This is an informational message.
      </n-alert>
    `,
  }),
};

export const Basic: Story = {
  args: { variant: 'info', dismissible: false, title: 'Note' },
  render: (args) => ({
    props: args,
    template: `
      <n-alert [variant]="variant" [dismissible]="dismissible" [title]="title">
        Your session will expire in 10 minutes.
      </n-alert>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-col">
        <n-alert variant="info" title="Info">Informational message.</n-alert>
        <n-alert variant="success" title="Success">Operation completed.</n-alert>
        <n-alert variant="warning" title="Warning">Please review before continuing.</n-alert>
        <n-alert variant="error" title="Error">Something went wrong.</n-alert>
      </div>
    `,
  }),
};

export const WithDismiss: Story = {
  render: () => ({
    template: `
      <n-alert variant="info" title="Dismissible" [dismissible]="true">
        Click × to close this alert.
      </n-alert>
    `,
  }),
};
```

---

## Related Documents

- [`docs/ui/component-docs-guide.md`](./component-docs-guide.md) — MDX structure and tab system overview
- [`docs/ui/component-docs-template.mdx`](./component-docs-template.mdx) — Copy-paste MDX template
- [`packages/ui/src/button/button.stories.ts`](../../packages/ui/src/button/button.stories.ts) — Live example (Button)
- [`packages/ui/src/card/card.stories.ts`](../../packages/ui/src/card/card.stories.ts) — Live example (Card)

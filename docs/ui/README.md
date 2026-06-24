# Neural Angular — Documentation System Index

> Entry point for the documentation infrastructure of `@neural/angular-ui`.

---

## What is the Neural Angular doc system?

Neural Angular documents its components inside **Storybook** using **pure MDX files** — not auto-generated autodocs, not React stories as the documentation surface. Each component has a single `*.docs.mdx` file that lives beside its source code and renders as the only docs page for that component.

The documentation surface is divided into **four tabs**:

```
FEATURES  →  Visual walkthroughs and live Canvas embeds
API       →  Full input table (ArgTypes) + variant/size reference
THEMING   →  CSS classes catalogue + design token reference
PLAYGROUND→  Interactive Controls panel
```

The tabs are implemented with **CSS-only radio button technique** — no JavaScript, no React state.

---

## Core Documentation Files

| File | Purpose |
|---|---|
| [component-docs-guide.md](./component-docs-guide.md) | **Start here.** Full MDX structure, tab system, storybook config, naming conventions, and new component checklist. |
| [component-docs-template.mdx](./component-docs-template.mdx) | **Copy-paste MDX template** with all four tabs pre-wired. Replace `Component` with your component name and fill in content. |
| [stories-authoring-guide.md](./stories-authoring-guide.md) | How to write the companion `*.stories.ts` file: meta config, argTypes categories, story types (Playground, Basic, Showcase). |
| [mdx-tab-css-reference.md](./mdx-tab-css-reference.md) | Deep dive into the CSS tab mechanism: DOM structure, selector logic, table styles, troubleshooting. |

---

## Quick Start: Adding a New Component

### 1. Copy the template

```bash
cp docs/ui/component-docs-template.mdx packages/ui/src/<component>/<component>.docs.mdx
```

### 2. Find and replace `component` → your component name

In the MDX file, replace all occurrences of:

- `Component` → `NButton` (the class name)
- `component` → `button` (the kebab name)
- `ComponentStories` → `ButtonStories` (the stories import alias)
- `component-doc-tabs` → `button-doc-tabs` (radio `name` attribute)

### 3. Create the stories file

See [stories-authoring-guide.md](./stories-authoring-guide.md). Minimum required exports:

```ts
export const Playground: Story = { ... };  // Required for PLAYGROUND tab
export const Basic: Story = { ... };       // Required for FEATURES tab
```

### 4. Verify in Storybook

```bash
pnpm nx run @neural/angular-ui:storybook
```

Navigate to `Components/YourComponent` in the sidebar. The FEATURES tab should be open by default.

---

## Live Examples

These are production MDX docs files you can study as reference:

| Component | MDX source | Stories source |
|---|---|---|
| Button | [button.docs.mdx](../../packages/ui/src/button/button.docs.mdx) | [button.stories.ts](../../packages/ui/src/button/button.stories.ts) |
| Card | [card.docs.mdx](../../packages/ui/src/card/card.docs.mdx) | [card.stories.ts](../../packages/ui/src/card/card.stories.ts) |

---

## Component Reference Docs

Standalone Markdown docs (used outside Storybook, e.g. GitHub, external sites):

- [button.md](./button.md)
- [card.md](./card.md)
- [icon.md](./icon.md)
- [avatar.md](./avatar.md)
- [badge.md](./badge.md)
- [chip.md](./chip.md)
- [spinner.md](./spinner.md)
- [progress.md](./progress.md)
- [dialog.md](./dialog.md)
- [drawer.md](./drawer.md)
- [toast.md](./toast.md)
- [tooltip.md](./tooltip.md)
- [tabs.md](./tabs.md)
- [stepper.md](./stepper.md)
- [table.md](./table.md)
- [sidebar.md](./sidebar.md)
- [shell.md](./shell.md)
- [toolbar.md](./toolbar.md)
- [input.md](./input.md)
- [select.md](./select.md)
- [textarea.md](./textarea.md)
- [popover.md](./popover.md)
- [overlay.md](./overlay.md)
- [data-view.md](./data-view.md)
- [data-card.md](./data-card.md)
- [stat-card.md](./stat-card.md)
- [metric-card.md](./metric-card.md)
- [empty-state.md](./empty-state.md)
- [timeline.md](./timeline.md)
- [voice-orb.md](./voice-orb.md)
- [glow-fx.md](./glow-fx.md)
- [image-compare.md](./image-compare.md)
- [streaming-text.md](./streaming-text.md)
- [tokens.md](./tokens.md) — Full design token reference

---

## Storybook Configuration Files

| File | Purpose |
|---|---|
| [.storybook/main.ts](../../packages/ui/.storybook/main.ts) | Story glob, docs mode, addons, webpack config |
| [.storybook/preview.ts](../../packages/ui/.storybook/preview.ts) | Global decorators (providers), default parameters, story sort |
| [.storybook/theme.ts](../../packages/ui/.storybook/theme.ts) | Neural dark theme for Storybook chrome |
| [.storybook/preview-head.html](../../packages/ui/.storybook/preview-head.html) | Injects fonts and CSS into the docs iframe |
| [.storybook/manager-head.html](../../packages/ui/.storybook/manager-head.html) | Injects fonts into the Storybook sidebar chrome |
| [src/stories/storybook-theme.css](../../packages/ui/src/stories/storybook-theme.css) | Global CSS for MDX pages (tab system, tables, story layout helpers) |

---

## Architecture Decisions

### Why MDX instead of autodocs?

Autodocs generates a page from stories automatically, but the layout is fixed and cannot be restructured into tabs. MDX gives full control over the documentation layout while still having access to live Storybook story embeds via `<Canvas>`.

### Why CSS-only tabs?

MDX in Storybook renders inside an iframe. Storybook's React runtime is available, but relying on React state for interactive tab switching introduces a dependency on specific Storybook internals that may break across versions. The radio+CSS approach works in any browser without any JavaScript and is fully compatible with Storybook's docs compilation pipeline.

### Why co-located with source?

Keeping `*.docs.mdx` beside `*.component.ts` means:
- Docs and API stay in sync — a developer editing the component sees the docs immediately.
- The MDX can import from `./component.stories` with a short relative path.
- Code review includes docs changes in the same PR as component changes.

### Why `tags: ['!autodocs']` on stories?

Without this tag, Storybook generates an autodocs page AND the MDX file produces a second docs page — resulting in duplicate entries in the sidebar. The `!autodocs` tag tells Storybook to skip auto-generation for that component, leaving the MDX as the sole docs entry.

---

## Running the Docs

```bash
# Start Storybook
pnpm nx run @neural/angular-ui:storybook

# Build static Storybook
pnpm nx run @neural/angular-ui:build-storybook
```

Storybook is configured with `docsMode: true`, so it opens directly in docs view. The sidebar shows components organised by category. The FEATURES tab is the default active tab.

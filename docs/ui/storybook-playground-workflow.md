# Storybook and Playground Workflow

Use Storybook as the primary surface for component design work.

Storybook should contain:

- Component variants, sizes and states.
- Token and theme previews.
- Focused composition examples.
- Visual review scenarios that can grow independently per component.

Use `apps/playground` only as a compact integration surface.

The playground should contain:

- A small app shell that imports `@neural/angular-ui`.
- Provider smoke checks for theme, icons and overlays.
- One or two realistic product flows that combine several components.
- No exhaustive component matrices.

When a playground section starts growing into a catalogue, move it into
`*.stories.ts` beside the relevant package source and keep the playground as the
cross-component integration check.

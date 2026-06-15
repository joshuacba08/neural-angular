# NPageHeader

Status: MVP available.

`NPageHeader` renders page identity with eyebrow, title, description, optional icon, and projected actions.

## Import

```ts
import { NPageHeader } from '@neural/angular-ui/page-header';
```

## API

- `eyebrow?: string`
- `title?: string`
- `description?: string`
- `icon?: string`

## Example

```html
<n-page-header
  eyebrow="Workspace"
  title="Neural Dashboard"
  description="Monitor components, jobs, and workflows."
  icon="sparkles"
>
  <n-button pageHeaderAction variant="ghost">Cancel</n-button>
  <n-button pageHeaderAction>New Project</n-button>
</n-page-header>
```

## Accessibility

The title is rendered as an `h1`. The optional icon is decorative.

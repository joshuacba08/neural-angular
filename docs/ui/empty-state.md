# NEmptyState

Status: implemented as a Core UI empty-state primitive.

`NEmptyState` composes an optional `NIcon`, title, description, and projected actions.

## Import

```ts
import { NEmptyState } from '@neural/angular-ui';
import { NEmptyState } from '@neural/angular-ui/empty-state';
```

## API

Inputs: `icon`, `title`, `description`, `orientation`.

```html
<n-empty-state
  icon="sparkles"
  title="No projects yet"
  description="Create your first Neural project to get started."
>
  <n-button>
    <n-icon name="plus" size="sm" />
    Create project
  </n-button>
</n-empty-state>
```

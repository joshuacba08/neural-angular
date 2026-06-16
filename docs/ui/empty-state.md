# NEmptyState

Status: implemented as a Core UI empty-state primitive.

`NEmptyState` composes an optional `NIcon`, title, description, and projected actions. It follows the Claude design system with three semantic variants for queue empty, search empty, and connection error states.

## Import

```ts
import { NEmptyState } from '@neural/angular-ui';
import { NEmptyState } from '@neural/angular-ui/empty-state';
```

## API

| Input | Type | Default |
| --- | --- | --- |
| `icon` | `string` | — |
| `title` | `string` | — |
| `description` | `string` | — |
| `variant` | `'primary' \| 'neutral' \| 'error'` | `'primary'` |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` |

### Variant mapping

| `variant` | Use | Suggested CTA |
| --- | --- | --- |
| `primary` | Empty queue, first action | `n-button variant="gemini"` |
| `neutral` | No search results, informational | `n-button variant="ghost"` |
| `error` | Connection / recoverable failure | `n-button variant="ghost"` + retry icon |

## Examples

### Primary — import / add content

```html
<n-empty-state
  variant="primary"
  icon="film"
  title="No videos yet"
  description="Import a video file to start enhancing with AI upscaling"
>
  <n-button variant="gemini" size="sm">
    <n-icon name="plus" size="sm" />
    Import Video
  </n-button>
</n-empty-state>
```

### Neutral — no results

```html
<n-empty-state
  variant="neutral"
  icon="search-x"
  title="No results found"
  description='Nothing matches "anime" — try a different keyword'
>
  <n-button variant="ghost" size="sm">Clear Search</n-button>
</n-empty-state>
```

### Error — connection lost

```html
<n-empty-state
  variant="error"
  icon="wifi-off"
  title="Connection lost"
  description="Can't reach GPU server — check your network and try again"
>
  <n-button variant="ghost" size="sm">
    <n-icon name="rotate-ccw" size="sm" />
    Retry
  </n-button>
</n-empty-state>
```

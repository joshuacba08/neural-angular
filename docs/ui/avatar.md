# NAvatar

Status: implemented as a Core UI presence primitive.

`NAvatar` renders an image when `src` is provided, otherwise initials from `name`. It can show a status dot.

## Import

```ts
import { NAvatar } from '@neural/angular-ui';
import { NAvatar } from '@neural/angular-ui/avatar';
```

## API

Inputs: `src`, `alt`, `name`, `size`, `shape`, `status`.

```html
<n-avatar name="Anderson Oroya" />
<n-avatar src="/avatar.png" alt="Anderson" status="online" />
<n-avatar name="Oroya Video" shape="rounded" status="busy" />
```

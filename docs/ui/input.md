# NInput

Status: implemented as a Core UI form primitive.

`NInput` renders a native `<input>` with label, hint, error, and `valueChange` output.

## Import

```ts
import { NInput } from '@neural/angular-ui';
import { NInput } from '@neural/angular-ui/input';
```

## API

Inputs: `label`, `hint`, `error`, `placeholder`, `type`, `value`, `size`, `variant`, `disabled`, `readonly`, `required`.

Output: `valueChange`.

```html
<n-input label="Email" placeholder="you@example.com" />
<n-input label="Project name" hint="Use a clear name" [(value)]="projectName" />
<n-input label="API Key" type="password" error="API key is required" />
```

Accessibility: labels use a real `<label for>`, hints/errors are connected with `aria-describedby`, and errors set `aria-invalid`.

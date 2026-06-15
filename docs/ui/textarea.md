# NTextarea

Status: implemented as a Core UI form primitive.

`NTextarea` renders a native `<textarea>` with label, hint, error, resize control, and `valueChange` output.

## Import

```ts
import { NTextarea } from '@neural/angular-ui';
import { NTextarea } from '@neural/angular-ui/textarea';
```

## API

Inputs: `label`, `hint`, `error`, `placeholder`, `value`, `rows`, `size`, `disabled`, `readonly`, `required`, `resize`.

Output: `valueChange`.

```html
<n-textarea
  label="Prompt"
  placeholder="Describe what you want to generate..."
  [rows]="5"
/>
```

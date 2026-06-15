# NSelect

Status: implemented as a native select primitive.

`NSelect` renders a native `<select>`. It intentionally does not create a custom dropdown yet.

## Import

```ts
import { NSelect, type NSelectOption } from '@neural/angular-ui';
import { NSelect } from '@neural/angular-ui/select';
```

## API

```ts
export interface NSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
```

Inputs: `label`, `hint`, `error`, `placeholder`, `value`, `options`, `size`, `disabled`, `required`.

Output: `valueChange`.

```html
<n-select
  label="Model"
  placeholder="Select model"
  [options]="modelOptions"
  [(value)]="selectedModel"
/>
```

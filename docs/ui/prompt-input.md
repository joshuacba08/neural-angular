# NPromptInput

## Estado

MVP implementado.

## Import

```ts
import { NPromptInput } from '@neural/angular-ui/prompt-input';
```

## API

Inputs principales:

- `value`
- `placeholder`
- `label`
- `hint`
- `disabled`
- `loading`
- `size`
- `variant`
- `minRows`
- `maxRows`
- `submitLabel`
- `submitIcon`
- `clearable`
- `showCounter`
- `maxLength`

Outputs:

- `valueChange`
- `submitted`
- `cleared`

## Ejemplos

```html
<n-prompt-input
  placeholder="Ask Neural to enhance, analyze or generate..."
  [(value)]="prompt"
  (submitted)="onPromptSubmitted($event)"
/>
```

```html
<n-prompt-input
  hint="Press Ctrl+Enter or Cmd+Enter to submit."
  [loading]="true"
  [showCounter]="true"
  [maxLength]="240"
/>
```

## Accesibilidad

- Usa un `<textarea>` real.
- El submit usa un botón real con `aria-label`.
- Refleja `loading` con `aria-busy`.

## SSR Safety

- No usa `window`, `document` ni mediciones DOM.
- No usa editores externos ni `contenteditable`.

## Limitaciones conocidas

- No autosizea por medición real del DOM.
- No llama backend.
- No adjunta archivos ni modelos todavía.

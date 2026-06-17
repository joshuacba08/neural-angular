import { booleanAttribute, Component, input, output } from '@angular/core';

import type { NInputSize, NInputVariant } from './input.types.js';

let nextInputId = 0;

@Component({
  selector: 'n-input',
  standalone: true,
  template: `
    <div
      class="n-field"
      [class.n-field--sm]="size() === 'sm'"
      [class.n-field--md]="size() === 'md'"
      [class.n-field--lg]="size() === 'lg'"
      [class.n-field--filled]="variant() === 'filled'"
      [class.n-field--ghost]="variant() === 'ghost'"
      [class.n-field--invalid]="!!error()"
      [class.n-field--disabled]="disabled()"
    >
      @if (label()) {
        <label class="n-field__label" [for]="inputId">{{ label() }}</label>
      }

      <input
        class="n-field__control"
        [id]="inputId"
        [type]="type()"
        [value]="value()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readOnly]="readonly()"
        [required]="required()"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="descriptionId()"
        (input)="handleInput($event)"
      />

      @if (error()) {
        <p class="n-field__message n-field__message--error" [id]="messageId">
          {{ error() }}
        </p>
      } @else if (hint()) {
        <p class="n-field__message" [id]="messageId">{{ hint() }}</p>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-field {
        display: grid;
        gap: var(--n-space-2);
        color: var(--n-text-1);
      }

      .n-field__label {
        color: var(--n-text-1);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-field__control {
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        border: 1px solid var(--n-field-border);
        border-radius: var(--n-radius-md);
        background: var(--n-field-bg);
        color: var(--n-text-1);
        font: inherit;
        letter-spacing: 0;
        outline: none;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast),
          opacity var(--n-transition-fast);
      }

      .n-field__control::placeholder {
        color: var(--n-field-placeholder);
      }

      .n-field__control:hover:not(:disabled) {
        background: var(--n-field-bg-hover);
        border-color: var(--n-field-border-hover);
      }

      .n-field__control:focus-visible {
        border-color: var(--n-field-border-focus);
        box-shadow: var(--n-focus-ring);
      }

      .n-field--sm .n-field__control {
        min-height: 34px;
        padding: 0 var(--n-space-3);
        font-size: var(--n-font-size-13);
      }

      .n-field--md .n-field__control {
        min-height: 42px;
        padding: 0 var(--n-space-4);
        font-size: var(--n-font-size-14);
      }

      .n-field--lg .n-field__control {
        min-height: 50px;
        padding: 0 var(--n-space-5);
        font-size: var(--n-font-size-15);
      }

      .n-field--filled .n-field__control {
        background: color-mix(in srgb, var(--n-surface-3) 92%, transparent);
      }

      .n-field--ghost .n-field__control {
        background: transparent;
      }

      .n-field--invalid .n-field__control {
        border-color: var(--n-color-danger);
        box-shadow: 0 0 0 3px var(--n-color-danger-alpha-10);
      }

      .n-field--disabled {
        opacity: 0.58;
      }

      .n-field__message {
        margin: 0;
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        line-height: 1.5;
      }

      .n-field__message--error {
        color: var(--n-color-danger);
      }
    `,
  ],
})
export class NInput {
  readonly inputId = `n-input-${++nextInputId}`;
  readonly messageId = `${this.inputId}-message`;

  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly type = input('text');
  readonly value = input('');
  readonly size = input<NInputSize>('md');
  readonly variant = input<NInputVariant>('default');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly valueChange = output<string>();

  descriptionId(): string | null {
    return this.error() || this.hint() ? this.messageId : null;
  }

  handleInput(event: Event): void {
    const source = event as unknown as { target?: { value?: string } };

    this.valueChange.emit(source.target?.value ?? '');
  }
}

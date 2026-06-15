import { booleanAttribute, Component, input, output } from '@angular/core';

import type { NSelectOption, NSelectSize } from './select.types.js';

let nextSelectId = 0;

@Component({
  selector: 'n-select',
  standalone: true,
  template: `
    <div
      class="n-select-field"
      [class.n-select-field--sm]="size() === 'sm'"
      [class.n-select-field--md]="size() === 'md'"
      [class.n-select-field--lg]="size() === 'lg'"
      [class.n-select-field--invalid]="!!error()"
      [class.n-select-field--disabled]="disabled()"
    >
      @if (label()) {
        <label class="n-select-field__label" [for]="selectId">{{ label() }}</label>
      }

      <select
        class="n-select-field__control"
        [id]="selectId"
        [value]="value()"
        [disabled]="disabled()"
        [required]="required()"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="descriptionId()"
        (change)="handleChange($event)"
      >
        @if (placeholder()) {
          <option value="" [disabled]="required()">{{ placeholder() }}</option>
        }

        @for (option of options(); track option.value) {
          <option [value]="option.value" [disabled]="option.disabled">
            {{ option.label }}
          </option>
        }
      </select>

      @if (error()) {
        <p class="n-select-field__message n-select-field__message--error" [id]="messageId">
          {{ error() }}
        </p>
      } @else if (hint()) {
        <p class="n-select-field__message" [id]="messageId">{{ hint() }}</p>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-select-field {
        display: grid;
        gap: var(--n-space-2);
      }

      .n-select-field__label {
        color: var(--n-text-1);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-select-field__control {
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

      .n-select-field__control:hover:not(:disabled) {
        background: var(--n-field-bg-hover);
        border-color: var(--n-field-border-hover);
      }

      .n-select-field__control:focus-visible {
        border-color: var(--n-field-border-focus);
        box-shadow: var(--n-focus-ring);
      }

      .n-select-field--sm .n-select-field__control {
        min-height: 34px;
        padding: 0 var(--n-space-3);
        font-size: var(--n-font-size-13);
      }

      .n-select-field--md .n-select-field__control {
        min-height: 42px;
        padding: 0 var(--n-space-4);
        font-size: var(--n-font-size-14);
      }

      .n-select-field--lg .n-select-field__control {
        min-height: 50px;
        padding: 0 var(--n-space-5);
        font-size: var(--n-font-size-15);
      }

      .n-select-field--invalid .n-select-field__control {
        border-color: var(--n-color-danger);
        box-shadow: 0 0 0 3px var(--n-color-danger-alpha-10);
      }

      .n-select-field--disabled {
        opacity: 0.58;
      }

      .n-select-field__message {
        margin: 0;
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        line-height: 1.5;
      }

      .n-select-field__message--error {
        color: var(--n-color-danger);
      }
    `,
  ],
})
export class NSelect {
  readonly selectId = `n-select-${++nextSelectId}`;
  readonly messageId = `${this.selectId}-message`;

  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly value = input('');
  readonly options = input<readonly NSelectOption[]>([]);
  readonly size = input<NSelectSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly valueChange = output<string>();

  descriptionId(): string | null {
    return this.error() || this.hint() ? this.messageId : null;
  }

  handleChange(event: Event): void {
    const source = event as unknown as { target?: { value?: string } };

    this.valueChange.emit(source.target?.value ?? '');
  }
}

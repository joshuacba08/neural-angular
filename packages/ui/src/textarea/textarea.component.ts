import { booleanAttribute, Component, input, numberAttribute, output } from '@angular/core';

import type { NTextareaResize, NTextareaSize } from './textarea.types.js';

let nextTextareaId = 0;

@Component({
  selector: 'n-textarea',
  standalone: true,
  template: `
    <div
      class="n-textarea-field"
      [class.n-textarea-field--sm]="size() === 'sm'"
      [class.n-textarea-field--md]="size() === 'md'"
      [class.n-textarea-field--lg]="size() === 'lg'"
      [class.n-textarea-field--invalid]="!!error()"
      [class.n-textarea-field--disabled]="disabled()"
    >
      @if (label()) {
        <label class="n-textarea-field__label" [for]="textareaId">{{ label() }}</label>
      }

      <textarea
        class="n-textarea-field__control"
        [class.n-textarea-field__control--resize-none]="resize() === 'none'"
        [class.n-textarea-field__control--resize-vertical]="resize() === 'vertical'"
        [class.n-textarea-field__control--resize-horizontal]="resize() === 'horizontal'"
        [class.n-textarea-field__control--resize-both]="resize() === 'both'"
        [id]="textareaId"
        [value]="value()"
        [rows]="rows()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readOnly]="readonly()"
        [required]="required()"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="descriptionId()"
        (input)="handleInput($event)"
      ></textarea>

      @if (error()) {
        <p class="n-textarea-field__message n-textarea-field__message--error" [id]="messageId">
          {{ error() }}
        </p>
      } @else if (hint()) {
        <p class="n-textarea-field__message" [id]="messageId">{{ hint() }}</p>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-textarea-field {
        display: grid;
        gap: var(--n-space-2);
      }

      .n-textarea-field__label {
        color: var(--n-text-1);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-textarea-field__control {
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        border: 1px solid var(--n-field-border);
        border-radius: var(--n-radius-md);
        background: var(--n-field-bg);
        color: var(--n-text-1);
        font: inherit;
        line-height: 1.6;
        outline: none;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast),
          opacity var(--n-transition-fast);
      }

      .n-textarea-field__control::placeholder {
        color: var(--n-field-placeholder);
      }

      .n-textarea-field__control:hover:not(:disabled) {
        background: var(--n-field-bg-hover);
        border-color: var(--n-field-border-hover);
      }

      .n-textarea-field__control:focus-visible {
        border-color: var(--n-field-border-focus);
        box-shadow: var(--n-focus-ring);
      }

      .n-textarea-field--sm .n-textarea-field__control {
        padding: var(--n-space-2) var(--n-space-3);
        font-size: var(--n-font-size-13);
      }

      .n-textarea-field--md .n-textarea-field__control {
        padding: var(--n-space-3) var(--n-space-4);
        font-size: var(--n-font-size-14);
      }

      .n-textarea-field--lg .n-textarea-field__control {
        padding: var(--n-space-4) var(--n-space-5);
        font-size: var(--n-font-size-15);
      }

      .n-textarea-field__control--resize-none {
        resize: none;
      }

      .n-textarea-field__control--resize-vertical {
        resize: vertical;
      }

      .n-textarea-field__control--resize-horizontal {
        resize: horizontal;
      }

      .n-textarea-field__control--resize-both {
        resize: both;
      }

      .n-textarea-field--invalid .n-textarea-field__control {
        border-color: var(--n-color-danger);
        box-shadow: 0 0 0 3px var(--n-color-danger-alpha-10);
      }

      .n-textarea-field--disabled {
        opacity: 0.58;
      }

      .n-textarea-field__message {
        margin: 0;
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        line-height: 1.5;
      }

      .n-textarea-field__message--error {
        color: var(--n-color-danger);
      }
    `,
  ],
})
export class NTextarea {
  readonly textareaId = `n-textarea-${++nextTextareaId}`;
  readonly messageId = `${this.textareaId}-message`;

  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly value = input('');
  readonly rows = input(4, { transform: numberAttribute });
  readonly size = input<NTextareaSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly resize = input<NTextareaResize>('vertical');
  readonly valueChange = output<string>();

  descriptionId(): string | null {
    return this.error() || this.hint() ? this.messageId : null;
  }

  handleInput(event: Event): void {
    const source = event as unknown as { target?: { value?: string } };

    this.valueChange.emit(source.target?.value ?? '');
  }
}

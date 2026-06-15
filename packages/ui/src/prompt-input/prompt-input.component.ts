import {
  booleanAttribute,
  Component,
  computed,
  input,
  numberAttribute,
  output,
} from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type {
  NPromptInputSize,
  NPromptInputVariant,
} from './prompt-input.types.js';

type NKeyboardEventLike = {
  key?: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  preventDefault?: () => void;
};

const optionalNumberAttribute = (value: unknown): number | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  return numberAttribute(value as number | string);
};

let nextPromptInputId = 0;

@Component({
  selector: 'n-prompt-input',
  standalone: true,
  imports: [NIcon],
  template: `
    <div
      class="n-prompt-input"
      [class.n-prompt-input--md]="size() === 'md'"
      [class.n-prompt-input--lg]="size() === 'lg'"
      [class.n-prompt-input--default]="variant() === 'default'"
      [class.n-prompt-input--surface]="variant() === 'surface'"
      [class.n-prompt-input--gradient]="variant() === 'gradient'"
      [class.n-prompt-input--disabled]="disabled()"
      [class.n-prompt-input--loading]="loading()"
      [attr.aria-busy]="loading() ? 'true' : null"
    >
      @if (label()) {
        <label class="n-prompt-input__label" [for]="textareaId">{{ label() }}</label>
      }

      <div class="n-prompt-input__surface">
        <textarea
          class="n-prompt-input__control"
          [id]="textareaId"
          [value]="value()"
          [rows]="minRows()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [attr.maxlength]="maxLength() ?? null"
          [attr.aria-label]="label() ? null : placeholder()"
          [style.--n-prompt-min-rows]="minRows()"
          [style.--n-prompt-max-rows]="maxRows()"
          (input)="handleInput($event)"
          (keydown)="handleKeydown($event)"
        ></textarea>

        <div class="n-prompt-input__footer">
          <div class="n-prompt-input__leading">
            <ng-content select="[nPromptActions]" />
            @if (clearable() && currentLength() > 0) {
              <button
                type="button"
                class="n-prompt-input__clear"
                [disabled]="disabled() || loading()"
                (click)="clear()"
              >
                Clear
              </button>
            }
          </div>

          <div class="n-prompt-input__trailing">
            <ng-content select="[nPromptTrailing]" />
            @if (showCounter()) {
              <span class="n-prompt-input__counter">
                {{ currentLength() }}
                @if (maxLength(); as maxLengthValue) {
                  / {{ maxLengthValue }}
                }
              </span>
            }

            <button
              type="button"
              class="n-prompt-input__submit"
              [disabled]="submitDisabled()"
              [attr.aria-label]="submitLabel()"
              (click)="submit()"
            >
              @if (loading()) {
                <span class="n-prompt-input__loader" aria-hidden="true"></span>
              } @else {
                <n-icon [name]="submitIcon()" size="sm" />
              }

              <span class="n-prompt-input__sr-only">{{ submitLabel() }}</span>
            </button>
          </div>
        </div>
      </div>

      @if (hint()) {
        <p class="n-prompt-input__meta">{{ hint() }}</p>
      }

      <div class="n-prompt-input__meta-slot">
        <ng-content select="[nPromptMeta]" />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-prompt-input {
        display: grid;
        gap: var(--n-space-3);
      }

      .n-prompt-input__label {
        color: var(--n-text-1);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-prompt-input__surface {
        display: grid;
        gap: var(--n-space-3);
        padding: 14px 16px;
        border: 1px solid var(--n-prompt-border);
        border-radius: var(--n-radius-2xl);
        background: var(--n-prompt-bg);
        box-shadow: var(--n-elevation-1);
        transition:
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast),
          background var(--n-transition-fast),
          opacity var(--n-transition-fast);
      }

      .n-prompt-input--gradient .n-prompt-input__surface {
        border-color: transparent;
        background:
          linear-gradient(var(--n-prompt-bg), var(--n-prompt-bg)) padding-box,
          var(--n-gradient-border) border-box;
        box-shadow: var(--n-ai-glow), var(--n-elevation-2);
      }

      .n-prompt-input__surface:focus-within {
        border-color: var(--n-color-primary-bright);
        box-shadow: var(--n-focus-ring), var(--n-ai-glow);
      }

      .n-prompt-input--gradient .n-prompt-input__surface:focus-within {
        border-color: transparent;
        background:
          linear-gradient(var(--n-prompt-bg), var(--n-prompt-bg)) padding-box,
          var(--n-gradient-border) border-box;
      }

      .n-prompt-input--disabled .n-prompt-input__surface,
      .n-prompt-input--loading .n-prompt-input__surface {
        opacity: 0.72;
      }

      .n-prompt-input__control {
        width: 100%;
        min-width: 0;
        min-height: calc(var(--n-prompt-min-rows) * 1.5em);
        max-height: calc((var(--n-prompt-max-rows) * 1.5em) + var(--n-space-4));
        padding: 0;
        border: 0;
        background: transparent;
        color: var(--n-text-1);
        font-family: var(--n-font-body);
        letter-spacing: 0;
        line-height: 1.5;
        outline: none;
        resize: vertical;
        field-sizing: content;
      }

      .n-prompt-input--md .n-prompt-input__control {
        font-size: var(--n-font-size-14);
      }

      .n-prompt-input--lg .n-prompt-input__control {
        font-size: var(--n-font-size-15);
      }

      .n-prompt-input__control::placeholder {
        color: var(--n-text-3);
      }

      .n-prompt-input__control:disabled {
        cursor: not-allowed;
      }

      .n-prompt-input__footer,
      .n-prompt-input__leading,
      .n-prompt-input__trailing {
        display: flex;
        align-items: center;
        gap: var(--n-space-3);
      }

      .n-prompt-input__footer {
        justify-content: space-between;
        flex-wrap: wrap;
        min-height: 42px;
      }

      .n-prompt-input__leading {
        flex: 1 1 220px;
        min-width: 0;
        flex-wrap: wrap;
      }

      .n-prompt-input__clear {
        min-height: 28px;
        padding: 0 var(--n-space-3);
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-full);
        background: transparent;
        color: var(--n-text-2);
        font: inherit;
        font-size: var(--n-font-size-12);
        cursor: pointer;
        transition:
          border-color var(--n-transition-fast),
          color var(--n-transition-fast),
          background var(--n-transition-fast);
      }

      .n-prompt-input__clear:hover:not(:disabled) {
        border-color: var(--n-field-border-focus);
        background: color-mix(in srgb, var(--n-color-primary) 10%, transparent);
        color: var(--n-text-1);
      }

      .n-prompt-input__clear:disabled {
        cursor: not-allowed;
        opacity: 0.55;
      }

      .n-prompt-input__trailing {
        justify-content: flex-end;
        flex-wrap: wrap;
      }

      .n-prompt-input__counter {
        color: var(--n-text-3);
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-11);
      }

      .n-prompt-input__submit {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        padding: 0;
        border: 0;
        border-radius: var(--n-radius-full);
        background: var(--n-gradient-primary-secondary);
        color: #fff;
        cursor: pointer;
        box-shadow: var(--n-glow-primary-sm), var(--n-elevation-1);
        transition:
          transform var(--n-transition-fast),
          filter var(--n-transition-fast),
          box-shadow var(--n-transition-fast),
          opacity var(--n-transition-fast);
      }

      .n-prompt-input__submit:hover:not(:disabled) {
        transform: translateY(-1px);
        filter: brightness(1.08);
        box-shadow: var(--n-glow-primary-md), var(--n-elevation-2);
      }

      .n-prompt-input__meta,
      .n-prompt-input__meta-slot {
        color: var(--n-text-3);
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-11);
        line-height: 1.5;
        text-align: center;
      }

      .n-prompt-input__meta-slot:empty {
        display: none;
      }

      .n-prompt-input__submit:focus-visible {
        outline: 2px solid var(--n-color-primary-bright);
        outline-offset: 3px;
      }

      .n-prompt-input__submit:disabled {
        cursor: not-allowed;
        opacity: 0.48;
        transform: none;
        filter: none;
        box-shadow: none;
      }

      .n-prompt-input__loader {
        width: 16px;
        height: 16px;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: var(--n-radius-full);
        animation: n-prompt-input-spin 700ms linear infinite;
      }

      .n-prompt-input__sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-prompt-input__surface,
        .n-prompt-input__clear,
        .n-prompt-input__submit {
          transition: none;
        }

        .n-prompt-input__loader {
          animation: none;
        }
      }

      @keyframes n-prompt-input-spin {
        to {
          transform: rotate(1turn);
        }
      }
    `,
  ],
})
export class NPromptInput {
  readonly textareaId = `n-prompt-input-${++nextPromptInputId}`;

  readonly value = input('');
  readonly placeholder = input('Ask Neural...');
  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly size = input<NPromptInputSize>('lg');
  readonly variant = input<NPromptInputVariant>('surface');
  readonly minRows = input(3, { transform: numberAttribute });
  readonly maxRows = input(8, { transform: numberAttribute });
  readonly submitLabel = input('Send');
  readonly submitIcon = input('arrow-right');
  readonly clearable = input(true, { transform: booleanAttribute });
  readonly showCounter = input(false, { transform: booleanAttribute });
  readonly maxLength = input<number | undefined>(undefined, {
    transform: optionalNumberAttribute,
  });

  readonly valueChange = output<string>();
  readonly submitted = output<string>();
  readonly cleared = output<void>();

  readonly currentLength = computed(() => this.value().length);
  readonly trimmedValue = computed(() => this.value().trim());
  readonly submitDisabled = computed(
    () => this.disabled() || this.loading() || this.trimmedValue().length === 0,
  );

  handleInput(event: Event): void {
    const source = event as Event & {
      target?: {
        value?: string;
      };
    };

    this.valueChange.emit(source.target?.value ?? '');
  }

  handleKeydown(event: NKeyboardEventLike): void {
    if (event.key !== 'Enter' || (!event.ctrlKey && !event.metaKey)) {
      return;
    }

    event.preventDefault?.();
    this.submit();
  }

  submit(): void {
    if (this.submitDisabled()) {
      return;
    }

    this.submitted.emit(this.value());
  }

  clear(): void {
    if (this.disabled() || this.loading()) {
      return;
    }

    this.valueChange.emit('');
    this.cleared.emit();
  }
}

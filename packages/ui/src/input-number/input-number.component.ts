import {
  booleanAttribute,
  Component,
  computed,
  input,
  numberAttribute,
  output,
} from '@angular/core';

import type { NInputNumberSize } from './input-number.types.js';

let nextInputNumberId = 0;

@Component({
  selector: 'n-input-number',
  standalone: true,
  template: `
    <div
      class="n-number"
      [class.n-number--sm]="size() === 'sm'"
      [class.n-number--md]="size() === 'md'"
      [class.n-number--lg]="size() === 'lg'"
      [class.n-number--invalid]="!!error()"
      [class.n-number--disabled]="disabled()"
    >
      @if (label()) {
        <label class="n-number__label" [for]="inputId">{{ label() }}</label>
      }

      <div class="n-number__wrap">
        <button
          type="button"
          class="n-number__btn"
          aria-label="Decrease"
          [disabled]="disabled() || atMin()"
          (click)="step(-1)"
        >
          &#8722;
        </button>

        <input
          class="n-number__input"
          [id]="inputId"
          type="text"
          inputmode="numeric"
          [value]="value()"
          [disabled]="disabled()"
          [attr.aria-invalid]="error() ? 'true' : null"
          [attr.aria-describedby]="descriptionId()"
          [attr.aria-valuenow]="value()"
          [attr.aria-valuemin]="min() ?? null"
          [attr.aria-valuemax]="max() ?? null"
          role="spinbutton"
          (input)="handleInput($event)"
        />

        <button
          type="button"
          class="n-number__btn"
          aria-label="Increase"
          [disabled]="disabled() || atMax()"
          (click)="step(1)"
        >
          +
        </button>
      </div>

      @if (error()) {
        <p class="n-number__message n-number__message--error" [id]="messageId">
          {{ error() }}
        </p>
      } @else if (hint()) {
        <p class="n-number__message" [id]="messageId">{{ hint() }}</p>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-number {
        display: grid;
        gap: var(--n-space-2);
      }

      .n-number__label {
        color: var(--n-text-1);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-number__wrap {
        display: flex;
        align-items: stretch;
        overflow: hidden;
        border: 1px solid var(--n-field-border);
        border-radius: var(--n-radius-md);
        background: var(--n-surface-2);
        transition:
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast);
      }

      .n-number__wrap:focus-within {
        border-color: var(--n-field-border-focus);
        box-shadow: var(--n-focus-ring);
      }

      .n-number--sm .n-number__wrap {
        height: 36px;
      }

      .n-number--md .n-number__wrap {
        height: 44px;
      }

      .n-number--lg .n-number__wrap {
        height: 50px;
      }

      .n-number__btn {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 42px;
        border: 0;
        background: var(--n-surface-3);
        color: var(--n-text-2);
        font-family: var(--n-font-body);
        font-size: var(--n-font-size-18);
        font-weight: var(--n-font-weight-light);
        line-height: 1;
        cursor: pointer;
        transition:
          background var(--n-transition-fast),
          color var(--n-transition-fast),
          opacity var(--n-transition-fast);
      }

      .n-number__btn:hover:not(:disabled) {
        background: var(--n-surface-4);
        color: var(--n-text-1);
      }

      .n-number__btn:disabled {
        cursor: not-allowed;
        opacity: 0.45;
      }

      .n-number__input {
        flex: 1;
        min-width: 0;
        border: 0;
        background: transparent;
        color: var(--n-text-1);
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-14);
        text-align: center;
        outline: none;
      }

      .n-number--invalid .n-number__wrap {
        border-color: var(--n-color-danger);
        box-shadow: 0 0 0 3px var(--n-color-danger-alpha-10);
      }

      .n-number--disabled {
        opacity: 0.58;
      }

      .n-number__message {
        margin: 0;
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        line-height: 1.5;
      }

      .n-number__message--error {
        color: var(--n-color-danger);
      }
    `,
  ],
})
export class NInputNumber {
  readonly inputId = `n-input-number-${++nextInputNumberId}`;
  readonly messageId = `${this.inputId}-message`;

  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly value = input(0, { transform: numberAttribute });
  readonly min = input<number | null>(null);
  readonly max = input<number | null>(null);
  readonly stepValue = input(1, { transform: numberAttribute });
  readonly size = input<NInputNumberSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly valueChange = output<number>();

  readonly atMin = computed(() => {
    const min = this.min();
    return min !== null && this.value() <= min;
  });
  readonly atMax = computed(() => {
    const max = this.max();
    return max !== null && this.value() >= max;
  });

  descriptionId(): string | null {
    return this.error() || this.hint() ? this.messageId : null;
  }

  step(direction: 1 | -1): void {
    if (this.disabled()) {
      return;
    }

    this.commit(this.value() + direction * this.stepValue());
  }

  handleInput(event: Event): void {
    const raw = (event as unknown as { target?: { value?: string } }).target?.value ?? '';
    const parsed = Number(raw.replace(/[^0-9.-]/g, ''));

    if (Number.isNaN(parsed)) {
      return;
    }

    this.commit(parsed);
  }

  private commit(next: number): void {
    const min = this.min();
    const max = this.max();
    let clamped = next;

    if (min !== null) {
      clamped = Math.max(min, clamped);
    }

    if (max !== null) {
      clamped = Math.min(max, clamped);
    }

    this.valueChange.emit(clamped);
  }
}

import {
  booleanAttribute,
  Component,
  computed,
  input,
  numberAttribute,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'n-rating',
  standalone: true,
  template: `
    <div class="n-rating">
      <div
        class="n-rating__stars"
        role="slider"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-valuemin]="0"
        [attr.aria-valuemax]="max()"
        [attr.aria-valuenow]="value()"
        (mouseleave)="clearHover()"
      >
        @for (star of stars(); track $index; let i = $index) {
          <button
            type="button"
            class="n-rating__star"
            [class.n-rating__star--on]="i < active()"
            [disabled]="disabled() || readonly()"
            [attr.aria-label]="i + 1 + ' / ' + max()"
            (click)="rate(i + 1)"
            (mouseenter)="setHover(i + 1)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </button>
        }
      </div>

      @if (showValue()) {
        <span class="n-rating__value">{{ value() }} / {{ max() }}</span>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      .n-rating {
        display: inline-grid;
        gap: var(--n-space-2);
        justify-items: start;
      }

      .n-rating__stars {
        display: flex;
        gap: var(--n-space-1);
      }

      .n-rating__star {
        display: inline-flex;
        padding: 0;
        border: 0;
        background: transparent;
        color: color-mix(in srgb, var(--n-text-1) 12%, transparent);
        cursor: pointer;
        transition:
          color var(--n-transition-fast),
          filter var(--n-transition-fast),
          transform var(--n-transition-fast);
      }

      .n-rating__star svg {
        width: 26px;
        height: 26px;
      }

      .n-rating__star:hover:not(:disabled) {
        transform: scale(1.08);
      }

      .n-rating__star--on {
        color: var(--n-color-warning);
        filter: drop-shadow(0 0 5px color-mix(in srgb, var(--n-color-warning) 40%, transparent));
      }

      .n-rating__star:disabled {
        cursor: default;
      }

      .n-rating__star:focus-visible {
        outline: 2px solid var(--n-color-primary-bright);
        outline-offset: 2px;
        border-radius: var(--n-radius-sm);
      }

      .n-rating__value {
        color: var(--n-text-3);
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-11);
      }

      @media (prefers-reduced-motion: reduce) {
        .n-rating__star {
          transition: none;
        }
      }
    `,
  ],
})
export class NRating {
  readonly value = input(0, { transform: numberAttribute });
  readonly max = input(5, { transform: numberAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly showValue = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input('Rating');
  readonly valueChange = output<number>();

  private readonly hoverState = signal<number | null>(null);

  readonly stars = computed(() => Array.from({ length: this.max() }));
  readonly active = computed(() => this.hoverState() ?? this.value());

  rate(next: number): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    this.valueChange.emit(next === this.value() ? 0 : next);
  }

  setHover(next: number): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    this.hoverState.set(next);
  }

  clearHover(): void {
    this.hoverState.set(null);
  }
}

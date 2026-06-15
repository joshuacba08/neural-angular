import { booleanAttribute, Component, computed, input, numberAttribute } from '@angular/core';

import type { NProgressSize, NProgressVariant } from './progress.types.js';

@Component({
  selector: 'n-progress',
  standalone: true,
  template: `
    <div class="n-progress">
      @if (label() || showValue()) {
        <div class="n-progress__meta">
          @if (label()) {
            <span>{{ label() }}</span>
          }
          @if (showValue()) {
            <span>{{ percent() }}%</span>
          }
        </div>
      }

      <div
        class="n-progress__track"
        [class.n-progress__track--sm]="size() === 'sm'"
        [class.n-progress__track--md]="size() === 'md'"
        [class.n-progress__track--lg]="size() === 'lg'"
        [class.n-progress__track--primary]="variant() === 'primary'"
        [class.n-progress__track--success]="variant() === 'success'"
        [class.n-progress__track--warning]="variant() === 'warning'"
        [class.n-progress__track--danger]="variant() === 'danger'"
        [class.n-progress__track--indeterminate]="indeterminate()"
        role="progressbar"
        [attr.aria-label]="label() || null"
        [attr.aria-valuemin]="indeterminate() ? null : 0"
        [attr.aria-valuemax]="indeterminate() ? null : max()"
        [attr.aria-valuenow]="indeterminate() ? null : clampedValue()"
      >
        <span class="n-progress__fill" [style.width.%]="indeterminate() ? null : percent()"></span>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-progress {
        display: grid;
        gap: var(--n-space-2);
      }

      .n-progress__meta {
        display: flex;
        justify-content: space-between;
        gap: var(--n-space-3);
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        font-weight: var(--n-font-weight-medium);
      }

      .n-progress__track {
        position: relative;
        overflow: hidden;
        width: 100%;
        border-radius: var(--n-radius-full);
        background: var(--n-progress-bg);
      }

      .n-progress__track--sm {
        height: 6px;
      }

      .n-progress__track--md {
        height: 9px;
      }

      .n-progress__track--lg {
        height: 12px;
      }

      .n-progress__fill {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: var(--n-progress-fill);
        transition: width var(--n-transition-base);
      }

      .n-progress__track--success .n-progress__fill {
        background: var(--n-color-success);
      }

      .n-progress__track--warning .n-progress__fill {
        background: var(--n-color-warning);
      }

      .n-progress__track--danger .n-progress__fill {
        background: var(--n-color-danger);
      }

      .n-progress__track--indeterminate .n-progress__fill {
        position: absolute;
        width: 38%;
        animation: n-progress-indeterminate 1.2s var(--n-ease-standard) infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-progress__fill {
          transition: none;
        }

        .n-progress__track--indeterminate .n-progress__fill {
          animation: none;
          width: 100%;
        }
      }

      @keyframes n-progress-indeterminate {
        from {
          transform: translateX(-110%);
        }

        to {
          transform: translateX(270%);
        }
      }
    `,
  ],
})
export class NProgress {
  readonly value = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });
  readonly variant = input<NProgressVariant>('primary');
  readonly size = input<NProgressSize>('md');
  readonly indeterminate = input(false, { transform: booleanAttribute });
  readonly label = input<string | undefined>(undefined);
  readonly showValue = input(false, { transform: booleanAttribute });

  readonly clampedValue = computed(() => Math.min(Math.max(this.value(), 0), Math.max(this.max(), 1)));
  readonly percent = computed(() => Math.round((this.clampedValue() / Math.max(this.max(), 1)) * 100));
}

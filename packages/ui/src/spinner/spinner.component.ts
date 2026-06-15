import { Component, input } from '@angular/core';

import type { NSpinnerSize, NSpinnerVariant } from './spinner.types.js';

@Component({
  selector: 'n-spinner',
  standalone: true,
  template: `
    <span
      class="n-spinner"
      [class.n-spinner--sm]="size() === 'sm'"
      [class.n-spinner--md]="size() === 'md'"
      [class.n-spinner--lg]="size() === 'lg'"
      [class.n-spinner--primary]="variant() === 'primary'"
      [class.n-spinner--neutral]="variant() === 'neutral'"
      [class.n-spinner--success]="variant() === 'success'"
      [class.n-spinner--danger]="variant() === 'danger'"
      [attr.role]="label() ? 'status' : null"
      [attr.aria-label]="label() || null"
      [attr.aria-hidden]="label() ? null : 'true'"
    >
      <span class="n-spinner__ring" aria-hidden="true"></span>
      @if (label()) {
        <span class="n-spinner__sr">{{ label() }}</span>
      }
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        flex: 0 0 auto;
      }

      .n-spinner {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--n-color-primary);
      }

      .n-spinner--neutral {
        color: var(--n-text-2);
      }

      .n-spinner--success {
        color: var(--n-color-success);
      }

      .n-spinner--danger {
        color: var(--n-color-danger);
      }

      .n-spinner--sm {
        width: 18px;
        height: 18px;
      }

      .n-spinner--md {
        width: 26px;
        height: 26px;
      }

      .n-spinner--lg {
        width: 36px;
        height: 36px;
      }

      .n-spinner__ring {
        width: 100%;
        height: 100%;
        border: 2px solid color-mix(in srgb, currentColor 24%, transparent);
        border-top-color: currentColor;
        border-radius: var(--n-radius-full);
        animation: n-spinner-spin 780ms linear infinite;
      }

      .n-spinner__sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-spinner__ring {
          animation: none;
        }
      }

      @keyframes n-spinner-spin {
        to {
          transform: rotate(1turn);
        }
      }
    `,
  ],
})
export class NSpinner {
  readonly size = input<NSpinnerSize>('md');
  readonly variant = input<NSpinnerVariant>('primary');
  readonly label = input<string | undefined>(undefined);
}

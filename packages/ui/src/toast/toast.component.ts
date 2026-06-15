import { Component, inject } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import { NToastRef } from './toast-ref.js';
import { N_TOAST_DATA } from './toast.tokens.js';

@Component({
  selector: 'n-toast',
  standalone: true,
  imports: [NIcon],
  template: `
    <article
      class="n-toast"
      [class.n-toast--success]="data.variant === 'success'"
      [class.n-toast--info]="data.variant === 'info'"
      [class.n-toast--warning]="data.variant === 'warning'"
      [class.n-toast--danger]="data.variant === 'danger'"
      [attr.role]="data.variant === 'warning' || data.variant === 'danger' ? 'alert' : 'status'"
    >
      @if (data.icon) {
        <span class="n-toast__icon" aria-hidden="true">
          <n-icon [name]="data.icon" size="sm" />
        </span>
      }

      <div class="n-toast__body">
        @if (data.title) {
          <strong>{{ data.title }}</strong>
        }
        <p>{{ data.message }}</p>
      </div>

      @if (data.dismissible) {
        <button type="button" aria-label="Dismiss toast" (click)="toastRef.dismiss()">
          <n-icon name="x" size="sm" />
        </button>
      }
    </article>
  `,
  styles: [
    `
      .n-toast {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: var(--n-space-3);
        align-items: start;
        width: min(360px, calc(100vw - 32px));
        padding: var(--n-space-4);
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-xl);
        background: var(--n-toast-bg);
        color: var(--n-text-1);
        box-shadow: var(--n-overlay-panel-shadow);
      }

      .n-toast--success {
        border-color: color-mix(in srgb, var(--n-color-success) 44%, var(--n-border-1));
      }

      .n-toast--info {
        border-color: color-mix(in srgb, var(--n-color-info) 44%, var(--n-border-1));
      }

      .n-toast--warning {
        border-color: color-mix(in srgb, var(--n-color-warning) 44%, var(--n-border-1));
      }

      .n-toast--danger {
        border-color: color-mix(in srgb, var(--n-color-danger) 44%, var(--n-border-1));
      }

      .n-toast__icon {
        color: var(--n-color-primary-bright);
      }

      .n-toast__body {
        min-width: 0;
      }

      .n-toast__body strong,
      .n-toast__body p {
        margin: 0;
      }

      .n-toast__body strong {
        display: block;
        margin-bottom: var(--n-space-1);
        font-size: var(--n-font-size-14);
      }

      .n-toast__body p {
        color: var(--n-text-2);
        font-size: var(--n-font-size-13);
        line-height: 1.5;
      }

      .n-toast button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: 0;
        border-radius: var(--n-radius-full);
        background: transparent;
        color: var(--n-text-2);
        cursor: pointer;
      }
    `,
  ],
})
export class NToastComponent {
  readonly data = inject(N_TOAST_DATA);
  readonly toastRef = inject(NToastRef);
}

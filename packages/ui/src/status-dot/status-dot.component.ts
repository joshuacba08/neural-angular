import { booleanAttribute, Component, input } from '@angular/core';

import type { NStatusDotStatus } from './status-dot.types.js';

@Component({
  selector: 'n-status-dot',
  standalone: true,
  template: `
    <span
      class="n-status-dot"
      [class.n-status-dot--neutral]="status() === 'neutral'"
      [class.n-status-dot--online]="status() === 'online'"
      [class.n-status-dot--offline]="status() === 'offline'"
      [class.n-status-dot--busy]="status() === 'busy'"
      [class.n-status-dot--away]="status() === 'away'"
      [class.n-status-dot--success]="status() === 'success'"
      [class.n-status-dot--warning]="status() === 'warning'"
      [class.n-status-dot--danger]="status() === 'danger'"
      [class.n-status-dot--info]="status() === 'info'"
      [class.n-status-dot--pulse]="pulse()"
      [attr.role]="label() ? 'status' : null"
      [attr.aria-label]="label() || null"
      [attr.aria-hidden]="label() ? null : 'true'"
    ></span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        flex: 0 0 auto;
        line-height: 0;
      }

      .n-status-dot {
        position: relative;
        display: inline-block;
        width: 10px;
        height: 10px;
        border: 2px solid var(--n-bg-canvas);
        border-radius: var(--n-radius-full);
        background: currentColor;
        color: var(--n-text-3);
        box-shadow: 0 0 0 1px var(--n-border-2);
      }

      .n-status-dot--neutral,
      .n-status-dot--offline {
        color: var(--n-text-3);
      }

      .n-status-dot--online,
      .n-status-dot--success {
        color: var(--n-color-success);
      }

      .n-status-dot--busy,
      .n-status-dot--danger {
        color: var(--n-color-danger);
      }

      .n-status-dot--away,
      .n-status-dot--warning {
        color: var(--n-color-warning);
      }

      .n-status-dot--info {
        color: var(--n-color-info);
      }

      .n-status-dot--pulse::after {
        position: absolute;
        inset: -4px;
        border-radius: inherit;
        background: currentColor;
        content: '';
        opacity: 0.24;
        animation: n-status-dot-pulse var(--n-duration-slower) var(--n-ease-standard) infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-status-dot--pulse::after {
          animation: none;
        }
      }

      @keyframes n-status-dot-pulse {
        from {
          transform: scale(0.7);
          opacity: 0.32;
        }

        to {
          transform: scale(1.7);
          opacity: 0;
        }
      }
    `,
  ],
})
export class NStatusDot {
  readonly status = input<NStatusDotStatus>('neutral');
  readonly pulse = input(false, { transform: booleanAttribute });
  readonly label = input<string | undefined>(undefined);
}

import { booleanAttribute, Component, input } from '@angular/core';

import type {
  NBadgeShape,
  NBadgeSize,
  NBadgeVariant,
} from './badge.types.js';

@Component({
  selector: 'n-badge',
  standalone: true,
  template: `
    <span
      class="n-badge"
      [class.n-badge--neutral]="variant() === 'neutral'"
      [class.n-badge--gradient]="variant() === 'gradient'"
      [class.n-badge--primary]="variant() === 'primary'"
      [class.n-badge--secondary]="variant() === 'secondary'"
      [class.n-badge--tertiary]="variant() === 'tertiary'"
      [class.n-badge--success]="variant() === 'success'"
      [class.n-badge--warning]="variant() === 'warning'"
      [class.n-badge--danger]="variant() === 'danger'"
      [class.n-badge--info]="variant() === 'info'"
      [class.n-badge--sm]="size() === 'sm'"
      [class.n-badge--md]="size() === 'md'"
      [class.n-badge--square]="shape() === 'square'"
      [class.n-badge--dot]="dot()"
    >
      @if (dot()) {
        <span class="n-badge__dot" aria-hidden="true"></span>
      }
      <span class="n-badge__content">
        <ng-content />
      </span>
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        max-width: 100%;
      }

      .n-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        max-width: 100%;
        border: 1px solid transparent;
        border-radius: var(--n-radius-full);
        font-family: var(--n-font-mono);
        font-weight: var(--n-font-weight-semibold);
        letter-spacing: 0;
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
      }

      .n-badge--sm {
        height: 20px;
        padding: 0 9px;
        font-size: var(--n-font-size-10);
      }

      .n-badge--md {
        height: 24px;
        padding: 0 11px;
        font-size: var(--n-font-size-11);
      }

      .n-badge--square {
        border-radius: var(--n-radius-sm);
      }

      .n-badge--neutral {
        border-color: var(--n-border-1);
        background: rgba(255, 255, 255, 0.06);
        color: var(--n-text-3);
      }

      .n-badge--gradient {
        border-color: transparent;
        background: var(--n-gradient-gemini);
        color: #fff;
      }

      .n-badge--primary {
        border-color: transparent;
        background: var(--n-color-primary-alpha-10);
        color: var(--n-color-primary);
      }

      .n-badge--secondary {
        border-color: transparent;
        background: var(--n-color-secondary-alpha-10);
        color: var(--n-color-secondary);
      }

      .n-badge--tertiary {
        border-color: transparent;
        background: var(--n-color-tertiary-alpha-10);
        color: var(--n-color-tertiary);
      }

      .n-badge--success {
        border-color: transparent;
        background: var(--n-color-success-alpha-10);
        color: var(--n-color-success);
      }

      .n-badge--warning {
        border-color: transparent;
        background: var(--n-color-warning-alpha-10);
        color: var(--n-color-warning);
      }

      .n-badge--danger {
        border-color: transparent;
        background: var(--n-color-danger-alpha-10);
        color: var(--n-color-danger);
      }

      .n-badge--info {
        border-color: transparent;
        background: var(--n-color-info-alpha-10);
        color: var(--n-color-info);
      }

      .n-badge__dot {
        width: 6px;
        height: 6px;
        flex-shrink: 0;
        border-radius: var(--n-radius-full);
        background: currentColor;
      }

      .n-badge__content {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
  ],
})
export class NBadge {
  readonly variant = input<NBadgeVariant>('neutral');
  readonly size = input<NBadgeSize>('sm');
  readonly shape = input<NBadgeShape>('pill');
  readonly dot = input(false, { transform: booleanAttribute });
}

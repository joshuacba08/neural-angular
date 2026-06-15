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
      [class.n-badge--primary]="variant() === 'primary'"
      [class.n-badge--secondary]="variant() === 'secondary'"
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
        gap: var(--n-space-1);
        max-width: 100%;
        border: 1px solid transparent;
        border-radius: var(--n-radius-full);
        font-family: var(--n-font-body);
        font-weight: var(--n-font-weight-semibold);
        letter-spacing: 0;
        white-space: nowrap;
        vertical-align: middle;
      }

      .n-badge--sm {
        min-height: 22px;
        padding: 0 var(--n-space-2);
        font-size: var(--n-font-size-11);
      }

      .n-badge--md {
        min-height: 26px;
        padding: 0 var(--n-space-3);
        font-size: var(--n-font-size-12);
      }

      .n-badge--square {
        border-radius: var(--n-radius-sm);
      }

      .n-badge--neutral {
        border-color: var(--n-border-2);
        background: color-mix(in srgb, var(--n-surface-3) 86%, transparent);
        color: var(--n-text-1);
      }

      .n-badge--primary {
        border-color: color-mix(in srgb, var(--n-color-primary) 34%, var(--n-border-1));
        background: var(--n-color-primary-alpha-10);
        color: var(--n-color-primary-bright);
      }

      .n-badge--secondary {
        border-color: color-mix(in srgb, var(--n-color-secondary) 34%, var(--n-border-1));
        background: var(--n-color-secondary-alpha-10);
        color: var(--n-color-secondary-bright);
      }

      .n-badge--success {
        border-color: color-mix(in srgb, var(--n-color-success) 34%, var(--n-border-1));
        background: var(--n-color-success-alpha-10);
        color: var(--n-color-success);
      }

      .n-badge--warning {
        border-color: color-mix(in srgb, var(--n-color-warning) 40%, var(--n-border-1));
        background: var(--n-color-warning-alpha-10);
        color: var(--n-color-warning);
      }

      .n-badge--danger {
        border-color: color-mix(in srgb, var(--n-color-danger) 36%, var(--n-border-1));
        background: var(--n-color-danger-alpha-10);
        color: var(--n-color-danger);
      }

      .n-badge--info {
        border-color: color-mix(in srgb, var(--n-color-info) 34%, var(--n-border-1));
        background: var(--n-color-info-alpha-10);
        color: var(--n-color-info);
      }

      .n-badge__dot {
        width: 0.5em;
        height: 0.5em;
        border-radius: var(--n-radius-full);
        background: currentColor;
        box-shadow: 0 0 0 2px color-mix(in srgb, currentColor 15%, transparent);
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
  readonly size = input<NBadgeSize>('md');
  readonly shape = input<NBadgeShape>('pill');
  readonly dot = input(false, { transform: booleanAttribute });
}

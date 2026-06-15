import { booleanAttribute, Component, input } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NStatCardVariant, NStatTrend } from './stat-card.types.js';

@Component({
  selector: 'n-stat-card',
  standalone: true,
  imports: [NIcon],
  template: `
    <article
      class="n-stat-card"
      [class.n-stat-card--interactive]="interactive()"
      [class.n-stat-card--primary]="variant() === 'primary'"
      [class.n-stat-card--secondary]="variant() === 'secondary'"
      [class.n-stat-card--success]="variant() === 'success'"
      [class.n-stat-card--warning]="variant() === 'warning'"
      [class.n-stat-card--danger]="variant() === 'danger'"
      [class.n-stat-card--info]="variant() === 'info'"
    >
      <div class="n-stat-card__meta">
        <div>
          @if (label()) {
            <p class="n-stat-card__label">{{ label() }}</p>
          }
          @if (value() !== undefined && value() !== null) {
            <p class="n-stat-card__value">{{ value() }}</p>
          }
        </div>

        @if (icon()) {
          <span class="n-stat-card__icon" aria-hidden="true">
            <n-icon [name]="icon() ?? ''" size="md" />
          </span>
        }
      </div>

      <div class="n-stat-card__footer">
        @if (description()) {
          <p class="n-stat-card__description">{{ description() }}</p>
        }

        @if (trendValue()) {
          <span
            class="n-stat-card__trend"
            [class.n-stat-card__trend--up]="trend() === 'up'"
            [class.n-stat-card__trend--down]="trend() === 'down'"
          >
            {{ trend() === 'up' ? '+' : trend() === 'down' ? '-' : '' }}
            {{ trendValue() }}
          </span>
        }
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-stat-card {
        display: grid;
        gap: var(--n-space-4);
        min-width: 0;
        padding: var(--n-space-4);
        border: 1px solid transparent;
        border-radius: var(--n-radius-xl);
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border-subtle) border-box;
        color: var(--n-text-1);
        box-shadow: var(--n-elevation-1);
        transition:
          transform var(--n-transition-fast),
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast);
      }

      .n-stat-card--interactive:hover {
        transform: translateY(-2px);
        border-color: var(--n-border-3);
        box-shadow: var(--n-elevation-2);
      }

      .n-stat-card--primary {
        border-color: color-mix(in srgb, var(--n-color-primary) 42%, var(--n-border-1));
      }

      .n-stat-card--secondary {
        border-color: color-mix(in srgb, var(--n-color-secondary) 42%, var(--n-border-1));
      }

      .n-stat-card--success {
        border-color: color-mix(in srgb, var(--n-color-success) 42%, var(--n-border-1));
      }

      .n-stat-card--warning {
        border-color: color-mix(in srgb, var(--n-color-warning) 42%, var(--n-border-1));
      }

      .n-stat-card--danger {
        border-color: color-mix(in srgb, var(--n-color-danger) 42%, var(--n-border-1));
      }

      .n-stat-card--info {
        border-color: color-mix(in srgb, var(--n-color-info) 42%, var(--n-border-1));
      }

      .n-stat-card__meta,
      .n-stat-card__footer {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--n-space-4);
        min-width: 0;
      }

      .n-stat-card__label,
      .n-stat-card__value,
      .n-stat-card__description {
        margin: 0;
      }

      .n-stat-card__label {
        color: var(--n-text-2);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-stat-card__value {
        margin-top: var(--n-space-2);
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-32);
        font-weight: var(--n-font-weight-bold);
        line-height: 1;
        background: var(--n-gradient-gemini);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
      }

      .n-stat-card__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border: 1px solid var(--n-border-2);
        border-radius: var(--n-radius-lg);
        background: color-mix(in srgb, var(--n-color-primary) 12%, var(--n-surface-2));
        color: var(--n-color-primary-bright);
      }

      .n-stat-card__description {
        color: var(--n-text-3);
        font-size: var(--n-font-size-13);
      }

      .n-stat-card__trend {
        white-space: nowrap;
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
        font-weight: var(--n-font-weight-bold);
      }

      .n-stat-card__trend--up {
        color: var(--n-color-success);
      }

      .n-stat-card__trend--down {
        color: var(--n-color-danger);
      }

      @media (prefers-reduced-motion: reduce) {
        .n-stat-card {
          transition: none;
        }

        .n-stat-card--interactive:hover {
          transform: none;
        }
      }
    `,
  ],
})
export class NStatCard {
  readonly label = input<string | undefined>(undefined);
  readonly value = input<string | number | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly variant = input<NStatCardVariant>('default');
  readonly trend = input<NStatTrend>('neutral');
  readonly trendValue = input<string | undefined>(undefined);
  readonly interactive = input(false, { transform: booleanAttribute });
}

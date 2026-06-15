import { Component, input, numberAttribute } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import { NProgress } from '../progress/progress.component.js';
import type { NMetricCardVariant } from './metric-card.types.js';

@Component({
  selector: 'n-metric-card',
  standalone: true,
  imports: [NIcon, NProgress],
  template: `
    <article
      class="n-metric-card"
      [class.n-metric-card--gradient]="variant() === 'gradient'"
      [class.n-metric-card--success]="variant() === 'success'"
      [class.n-metric-card--warning]="variant() === 'warning'"
      [class.n-metric-card--danger]="variant() === 'danger'"
      [class.n-metric-card--info]="variant() === 'info'"
    >
      <header class="n-metric-card__header">
        <div class="n-metric-card__heading">
          @if (title()) {
            <h3>{{ title() }}</h3>
          }
          @if (subtitle()) {
            <p>{{ subtitle() }}</p>
          }
        </div>

        @if (icon()) {
          <span class="n-metric-card__icon" aria-hidden="true">
            <n-icon [name]="icon() ?? ''" size="md" />
          </span>
        }
      </header>

      <div class="n-metric-card__value">
        <span>{{ value() }}</span>
        @if (unit()) {
          <small>{{ unit() }}</small>
        }
      </div>

      @if (progress() !== null) {
        <n-progress [value]="progress() ?? 0" size="sm" [showValue]="true" />
      }

      <div class="n-metric-card__extra">
        <ng-content />
      </div>

      @if (footer()) {
        <p class="n-metric-card__footer">{{ footer() }}</p>
      }
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-metric-card {
        display: grid;
        gap: var(--n-space-4);
        min-width: 0;
        padding: var(--n-space-5);
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-xl);
        background: var(--n-metric-card-bg);
        color: var(--n-text-1);
        box-shadow: var(--n-elevation-1);
      }

      .n-metric-card--gradient {
        border-color: transparent;
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border) border-box;
        box-shadow: var(--n-elevation-2), var(--n-glow-gradient-sm);
      }

      .n-metric-card--success {
        border-color: color-mix(in srgb, var(--n-color-success) 40%, var(--n-border-1));
      }

      .n-metric-card--warning {
        border-color: color-mix(in srgb, var(--n-color-warning) 40%, var(--n-border-1));
      }

      .n-metric-card--danger {
        border-color: color-mix(in srgb, var(--n-color-danger) 40%, var(--n-border-1));
      }

      .n-metric-card--info {
        border-color: color-mix(in srgb, var(--n-color-info) 40%, var(--n-border-1));
      }

      .n-metric-card__header {
        display: flex;
        justify-content: space-between;
        gap: var(--n-space-4);
        min-width: 0;
      }

      .n-metric-card__heading {
        min-width: 0;
      }

      .n-metric-card__heading h3,
      .n-metric-card__heading p,
      .n-metric-card__footer {
        margin: 0;
      }

      .n-metric-card__heading h3 {
        color: var(--n-text-1);
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-18);
        line-height: 1.25;
      }

      .n-metric-card__heading p,
      .n-metric-card__footer {
        margin-top: var(--n-space-1);
        color: var(--n-text-2);
        font-size: var(--n-font-size-13);
        line-height: 1.6;
      }

      .n-metric-card__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border: 1px solid var(--n-border-2);
        border-radius: var(--n-radius-lg);
        background: color-mix(in srgb, var(--n-color-primary) 12%, var(--n-surface-2));
        color: var(--n-color-primary-bright);
      }

      .n-metric-card__value {
        display: flex;
        align-items: baseline;
        gap: var(--n-space-2);
        color: var(--n-text-1);
        font-family: var(--n-font-display);
      }

      .n-metric-card__value span {
        font-size: var(--n-font-size-40);
        font-weight: var(--n-font-weight-bold);
        line-height: 1;
      }

      .n-metric-card__value small {
        color: var(--n-text-2);
        font-size: var(--n-font-size-16);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-metric-card__extra:empty {
        display: none;
      }
    `,
  ],
})
export class NMetricCard {
  readonly title = input<string | undefined>(undefined);
  readonly subtitle = input<string | undefined>(undefined);
  readonly value = input<string | number | undefined>(undefined);
  readonly unit = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly variant = input<NMetricCardVariant>('default');
  readonly progress = input<number | null>(null, { transform: numberAttribute });
  readonly footer = input<string | undefined>(undefined);
}

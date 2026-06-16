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
    >
      <div class="n-stat-card__content">
        @if (label()) {
          <p class="n-stat-card__label">{{ label() }}</p>
        }
        @if (value() !== undefined && value() !== null) {
          <p class="n-stat-card__value">{{ value() }}</p>
        }
        @if (description()) {
          <p class="n-stat-card__description">{{ description() }}</p>
        }
        @if (trendValue()) {
          <span
            class="n-stat-card__trend"
            [class.n-stat-card__trend--up]="trend() === 'up'"
            [class.n-stat-card__trend--down]="trend() === 'down'"
            [class.n-stat-card__trend--neutral]="trend() === 'neutral'"
          >
            {{ trendPrefix() }}{{ trendValue() }}
          </span>
        }
      </div>

      @if (icon()) {
        <span class="n-stat-card__icon" aria-hidden="true">
          <n-icon [name]="icon() ?? ''" size="md" />
        </span>
      }
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-stat-card {
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--n-space-3);
        min-width: 0;
        padding: 22px 18px;
        border: 1px solid transparent;
        border-radius: var(--n-radius-lg);
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border) border-box;
        color: var(--n-text-1);
        transition:
          transform 250ms ease,
          box-shadow 250ms ease;
      }

      .n-stat-card--interactive:hover {
        transform: translateY(-2px);
        box-shadow: var(--n-elevation-3), var(--n-glow-gradient-sm);
      }

      .n-stat-card--primary {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border-primary) border-box;
      }

      .n-stat-card--secondary {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border-secondary) border-box;
      }

      .n-stat-card__content {
        position: relative;
        z-index: 1;
        display: grid;
        gap: 0;
        min-width: 0;
      }

      .n-stat-card__label,
      .n-stat-card__value,
      .n-stat-card__description,
      .n-stat-card__trend {
        margin: 0;
      }

      .n-stat-card__label {
        color: var(--n-text-3);
        font-size: 11.5px;
        line-height: 1.35;
      }

      .n-stat-card__value {
        margin-top: 7px;
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-28);
        font-weight: var(--n-font-weight-bold);
        letter-spacing: -0.04em;
        line-height: 1;
        background: var(--n-gradient-gemini);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
      }

      .n-stat-card__description {
        margin-top: var(--n-space-2);
        color: var(--n-text-3);
        font-size: var(--n-font-size-12);
      }

      .n-stat-card__trend {
        margin-top: 10px;
        font-family: var(--n-font-mono);
        font-size: 10.5px;
        line-height: 1.2;
      }

      .n-stat-card__trend--up {
        color: var(--n-color-success);
      }

      .n-stat-card__trend--down {
        color: var(--n-color-danger);
      }

      .n-stat-card__trend--neutral {
        color: var(--n-text-3);
      }

      .n-stat-card__icon {
        position: relative;
        z-index: 1;
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border: 1px solid var(--n-border-2);
        border-radius: var(--n-radius-md);
        background: color-mix(in srgb, var(--n-color-primary) 12%, var(--n-surface-2));
        color: var(--n-color-primary-bright);
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

  trendPrefix(): string {
    switch (this.trend()) {
      case 'up':
        return '↑ ';
      case 'down':
        return '↓ ';
      default:
        return '— ';
    }
  }
}

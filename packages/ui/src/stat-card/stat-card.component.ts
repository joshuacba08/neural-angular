import { booleanAttribute, Component, input } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NStatCardSize, NStatCardVariant, NStatTrend } from './stat-card.types.js';

@Component({
  selector: 'n-stat-card',
  standalone: true,
  imports: [NIcon],
  template: `
    <article
      class="n-stat-card"
      [class.n-stat-card--mini]="size() === 'mini'"
      [class.n-stat-card--interactive]="interactive()"
      [class.n-stat-card--primary]="variant() === 'primary'"
      [class.n-stat-card--secondary]="variant() === 'secondary'"
    >
      @if (icon() && size() === 'default') {
        <span class="n-stat-card__icon" aria-hidden="true">
          <n-icon [name]="icon() ?? ''" size="sm" />
        </span>
      }

      <div class="n-stat-card__body">
        @if (label()) {
          <p class="n-stat-card__label">{{ label() }}</p>
        }
        @if (value() !== undefined && value() !== null) {
          <p class="n-stat-card__value">{{ value() }}</p>
        }
        @if (trendValue() && size() === 'default') {
          <span
            class="n-stat-card__trend"
            [class.n-stat-card__trend--up]="trend() === 'up'"
            [class.n-stat-card__trend--down]="trend() === 'down'"
            [class.n-stat-card__trend--neutral]="trend() === 'neutral'"
          >
            {{ trendPrefix() }}{{ trendValue() }}
          </span>
        }
        @if (description() && size() === 'default') {
          <p class="n-stat-card__meta">{{ description() }}</p>
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
        position: relative;
        display: grid;
        gap: 0;
        min-width: 0;
        overflow: hidden;
        padding: 22px 18px;
        border: 1px solid transparent;
        border-radius: var(--n-radius-lg);
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border) border-box;
        color: var(--n-text-1);
        transition:
          transform var(--n-transition-base),
          box-shadow var(--n-transition-base);
      }

      .n-stat-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--n-gradient-surface);
        opacity: 0;
        transition: opacity var(--n-transition-base);
        pointer-events: none;
      }

      .n-stat-card:hover::before {
        opacity: 1;
      }

      .n-stat-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--n-elevation-3), var(--n-glow-gradient-sm);
      }

      .n-stat-card--interactive {
        cursor: pointer;
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

      .n-stat-card--mini {
        padding: 14px 16px;
        border-radius: var(--n-radius-md);
      }

      .n-stat-card__icon,
      .n-stat-card__body {
        position: relative;
        z-index: 1;
      }

      .n-stat-card__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        margin-bottom: 14px;
        border-radius: 10px;
        background: var(--n-gradient-gemini);
        color: #fff;
      }

      .n-stat-card__body {
        display: grid;
        gap: 0;
        min-width: 0;
      }

      .n-stat-card__label,
      .n-stat-card__value,
      .n-stat-card__meta,
      .n-stat-card__trend {
        margin: 0;
      }

      .n-stat-card__label {
        color: var(--n-text-3);
        font-size: 11.5px;
        line-height: 1.35;
      }

      .n-stat-card--mini .n-stat-card__label {
        margin-bottom: 5px;
        font-size: 10.5px;
      }

      .n-stat-card__value {
        margin-top: 6px;
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

      .n-stat-card--mini .n-stat-card__value {
        margin-top: 0;
        font-size: 20px;
        letter-spacing: -0.03em;
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

      .n-stat-card__meta {
        margin-top: 3px;
        color: var(--n-text-4);
        font-size: 10.5px;
        line-height: 1.35;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-stat-card {
          transition: none;
        }

        .n-stat-card:hover {
          transform: none;
        }

        .n-stat-card::before {
          transition: none;
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
  readonly size = input<NStatCardSize>('default');
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

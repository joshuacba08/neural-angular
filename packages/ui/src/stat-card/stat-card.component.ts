import { booleanAttribute, Component, computed, input } from '@angular/core';

import { NSparkline } from '../data-card/sparkline.component.js';
import { NIcon } from '../icon/icon.component.js';
import type {
  NStatCardLayout,
  NStatCardSize,
  NStatCardVariant,
  NStatDeltaTone,
  NStatSparklineVariant,
  NStatTrend,
  NStatValueTone,
} from './stat-card.types.js';

@Component({
  selector: 'n-stat-card',
  standalone: true,
  imports: [NIcon, NSparkline],
  template: `
    <article
      class="n-stat-card"
      [class.n-stat-card--mini]="size() === 'mini'"
      [class.n-stat-card--kpi]="isKpiLayout()"
      [class.n-stat-card--compact-layout]="layout() === 'compact'"
      [class.n-stat-card--interactive]="interactive()"
      [class.n-stat-card--primary]="variant() === 'primary'"
      [class.n-stat-card--secondary]="variant() === 'secondary'"
      [class.n-stat-card--success]="variant() === 'success'"
    >
      @if (isKpiLayout()) {
        <header class="n-stat-card__header">
          @if (label()) {
            <p class="n-stat-card__label">{{ label() }}</p>
          }

          @if (resolvedDelta()) {
            <span
              class="n-stat-card__delta"
              [class.n-stat-card__delta--success]="resolvedDeltaTone() === 'success'"
              [class.n-stat-card__delta--warning]="resolvedDeltaTone() === 'warning'"
              [class.n-stat-card__delta--neutral]="resolvedDeltaTone() === 'neutral'"
              [class.n-stat-card__delta--danger]="resolvedDeltaTone() === 'danger'"
            >
              {{ resolvedDelta() }}
            </span>
          } @else if (icon() && variant() === 'success') {
            <span class="n-stat-card__header-icon" aria-hidden="true">
              <n-icon [name]="icon() ?? ''" size="sm" />
            </span>
          }
        </header>

        @if (value() !== undefined && value() !== null) {
          <p
            class="n-stat-card__value"
            [class.n-stat-card__value--primary]="resolvedValueTone() === 'primary'"
            [class.n-stat-card__value--accent]="resolvedValueTone() === 'accent'"
            [class.n-stat-card__value--gemini]="resolvedValueTone() === 'gemini'"
            [class.n-stat-card__value--success]="resolvedValueTone() === 'success'"
            [class.n-stat-card__value--plain]="resolvedValueTone() === 'plain'"
          >
            {{ value() }}
            @if (unit()) {
              <span class="n-stat-card__unit">{{ unit() }}</span>
            }
          </p>
        }

        @if (description()) {
          <p class="n-stat-card__meta">{{ description() }}</p>
        }

        @if (progress() !== undefined) {
          <div
            class="n-stat-card__progress"
            role="progressbar"
            [attr.aria-valuenow]="progress()"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="n-stat-card__progress-fill" [style.width.%]="progress()"></div>
          </div>
        } @else if (sparkline().length >= 2) {
          <n-sparkline [points]="sparkline()" [variant]="sparklineVariant()" />
        }
      } @else {
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
            <p class="n-stat-card__value n-stat-card__value--gemini">{{ value() }}</p>
          }
          @if (resolvedDelta() && size() === 'default') {
            <span
              class="n-stat-card__trend"
              [class.n-stat-card__trend--up]="trend() === 'up'"
              [class.n-stat-card__trend--down]="trend() === 'down'"
              [class.n-stat-card__trend--neutral]="trend() === 'neutral'"
            >
              {{ resolvedDelta() }}
            </span>
          }
          @if (description() && size() === 'default') {
            <p class="n-stat-card__meta">{{ description() }}</p>
          }
        </div>
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
        display: grid;
        gap: 0;
        min-width: 0;
        overflow: hidden;
        padding: 20px 18px;
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

      .n-stat-card--kpi::before {
        content: none;
      }

      .n-stat-card--compact-layout::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--n-gradient-surface);
        opacity: 0;
        transition: opacity var(--n-transition-base);
        pointer-events: none;
      }

      .n-stat-card--compact-layout:hover::before {
        opacity: 1;
      }

      .n-stat-card--interactive.n-stat-card--compact-layout:hover {
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

      .n-stat-card--success {
        border-color: rgba(52, 168, 83, 0.4);
        background: rgba(52, 168, 83, 0.05);
      }

      .n-stat-card--success .n-stat-card__header-icon {
        color: var(--n-color-success);
      }

      .n-stat-card--success .n-stat-card__meta {
        color: rgba(52, 168, 83, 0.6);
      }

      .n-stat-card--mini {
        padding: 14px 16px;
        border-radius: var(--n-radius-md);
      }

      .n-stat-card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 10px;
      }

      .n-stat-card__header-icon {
        display: inline-flex;
        color: var(--n-color-success);
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
      .n-stat-card__trend,
      .n-stat-card__delta {
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

      .n-stat-card__delta {
        flex-shrink: 0;
        padding: 2px 7px;
        border: 1px solid transparent;
        border-radius: 99px;
        font-family: var(--n-font-mono);
        font-size: 9.5px;
        line-height: 1.2;
        white-space: nowrap;
      }

      .n-stat-card__delta--success {
        border-color: rgba(52, 168, 83, 0.2);
        background: rgba(52, 168, 83, 0.1);
        color: var(--n-color-success);
      }

      .n-stat-card__delta--warning {
        border-color: rgba(251, 188, 5, 0.2);
        background: rgba(251, 188, 5, 0.1);
        color: var(--n-color-warning);
      }

      .n-stat-card__delta--neutral {
        border-color: rgba(52, 168, 83, 0.2);
        background: rgba(52, 168, 83, 0.1);
        color: var(--n-color-success);
      }

      .n-stat-card__delta--danger {
        border-color: rgba(234, 67, 53, 0.2);
        background: rgba(234, 67, 53, 0.1);
        color: var(--n-color-danger);
      }

      .n-stat-card__value {
        margin-top: 0;
        margin-bottom: 4px;
        font-family: var(--n-font-mono);
        font-size: 34px;
        font-weight: 700;
        letter-spacing: -0.04em;
        line-height: 1;
      }

      .n-stat-card__value--primary {
        background: linear-gradient(135deg, #4285f4 0%, #7b5cf6 100%);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
      }

      .n-stat-card__value--accent {
        background: linear-gradient(135deg, #7b5cf6 0%, #d946ef 100%);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
      }

      .n-stat-card__value--gemini {
        background: var(--n-gradient-gemini-90);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
      }

      .n-stat-card__value--success {
        color: var(--n-color-success);
      }

      .n-stat-card__value--plain {
        color: var(--n-text-1);
      }

      .n-stat-card__unit {
        font-size: 18px;
        font-weight: 500;
      }

      .n-stat-card--compact-layout .n-stat-card__value {
        margin-top: 6px;
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-28);
        font-weight: var(--n-font-weight-bold);
      }

      .n-stat-card--mini .n-stat-card__value {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 20px;
        letter-spacing: -0.03em;
      }

      .n-stat-card__meta {
        margin-bottom: 10px;
        color: var(--n-text-3);
        font-size: 11px;
        line-height: 1.35;
      }

      .n-stat-card--compact-layout .n-stat-card__meta {
        margin-top: 3px;
        margin-bottom: 0;
        color: var(--n-text-4);
        font-size: 10.5px;
      }

      .n-stat-card__progress {
        height: 4px;
        overflow: hidden;
        border-radius: 99px;
        background: rgba(255, 255, 255, 0.05);
      }

      .n-stat-card__progress-fill {
        height: 100%;
        border-radius: 99px;
        background: var(--n-color-success);
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

      @media (prefers-reduced-motion: reduce) {
        .n-stat-card {
          transition: none;
        }

        .n-stat-card--interactive.n-stat-card--compact-layout:hover {
          transform: none;
        }

        .n-stat-card--compact-layout::before {
          transition: none;
        }
      }
    `,
  ],
})
export class NStatCard {
  readonly label = input<string | undefined>(undefined);
  readonly value = input<string | number | undefined>(undefined);
  readonly unit = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly variant = input<NStatCardVariant>('default');
  readonly size = input<NStatCardSize>('default');
  readonly layout = input<NStatCardLayout>('kpi');
  readonly trend = input<NStatTrend>('neutral');
  readonly trendValue = input<string | undefined>(undefined);
  readonly delta = input<string | undefined>(undefined);
  readonly deltaTone = input<NStatDeltaTone | undefined>(undefined);
  readonly valueTone = input<NStatValueTone | undefined>(undefined);
  readonly sparkline = input<readonly number[]>([]);
  readonly sparklineVariant = input<NStatSparklineVariant>('primary');
  readonly progress = input<number | undefined>(undefined);
  readonly interactive = input(false, { transform: booleanAttribute });

  readonly isKpiLayout = computed(() => this.layout() === 'kpi' && this.size() === 'default');

  readonly resolvedDelta = computed(() => {
    if (this.delta()) {
      return this.delta();
    }

    if (!this.trendValue()) {
      return undefined;
    }

    if (this.trend() === 'neutral') {
      return this.trendValue();
    }

    const prefix = this.trend() === 'up' ? '↑ ' : '↓ ';
    return `${prefix}${this.trendValue()}`;
  });

  readonly resolvedDeltaTone = computed<NStatDeltaTone>(() => {
    if (this.deltaTone()) {
      return this.deltaTone()!;
    }

    switch (this.trend()) {
      case 'up':
        return 'success';
      case 'down':
        return 'danger';
      default:
        return 'neutral';
    }
  });

  readonly resolvedValueTone = computed<NStatValueTone>(() => {
    if (this.valueTone()) {
      return this.valueTone()!;
    }

    if (this.variant() === 'success') {
      return 'success';
    }

    switch (this.variant()) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'accent';
      default:
        return 'gemini';
    }
  });
}

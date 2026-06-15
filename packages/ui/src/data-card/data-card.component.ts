import { booleanAttribute, Component, input } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import { NStatusDot } from '../status-dot/status-dot.component.js';
import type { NDataCardDensity, NDataCardItem, NDataCardVariant } from './data-card.types.js';

@Component({
  selector: 'n-data-card',
  standalone: true,
  imports: [NIcon, NStatusDot],
  template: `
    <article
      class="n-data-card"
      [class.n-data-card--outlined]="variant() === 'outlined'"
      [class.n-data-card--gradient]="variant() === 'gradient'"
      [class.n-data-card--compact]="density() === 'compact'"
      [class.n-data-card--interactive]="interactive()"
    >
      <header class="n-data-card__header">
        @if (icon()) {
          <span class="n-data-card__icon" aria-hidden="true">
            <n-icon [name]="icon() ?? ''" size="md" />
          </span>
        }
        <div class="n-data-card__heading">
          @if (title()) {
            <h3>{{ title() }}</h3>
          }
          @if (description()) {
            <p>{{ description() }}</p>
          }
        </div>
      </header>

      @if (items().length) {
        <dl class="n-data-card__items">
          @for (item of items(); track item.label) {
            <div class="n-data-card__item">
              <dt>
                @if (item.icon) {
                  <n-icon [name]="item.icon" size="xs" />
                }
                <span>{{ item.label }}</span>
              </dt>
              <dd>
                @if (item.status) {
                  <n-status-dot [status]="statusDot(item.status)" />
                }
                <span>{{ item.value }}</span>
              </dd>
            </div>
          }
        </dl>
      }

      <div class="n-data-card__footer">
        <ng-content />
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-data-card {
        display: grid;
        gap: var(--n-space-5);
        min-width: 0;
        padding: var(--n-space-5);
        border: 1px solid var(--n-data-card-border);
        border-radius: var(--n-radius-xl);
        background: var(--n-data-card-bg);
        color: var(--n-text-1);
        box-shadow: var(--n-elevation-1);
        transition:
          transform var(--n-transition-fast),
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast);
      }

      .n-data-card--compact {
        gap: var(--n-space-3);
        padding: var(--n-space-4);
      }

      .n-data-card--outlined {
        background: transparent;
      }

      .n-data-card--gradient {
        border-color: transparent;
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border) border-box;
      }

      .n-data-card--interactive:hover {
        transform: translateY(-2px);
        border-color: var(--n-border-3);
        box-shadow: var(--n-elevation-2);
      }

      .n-data-card__header {
        display: flex;
        gap: var(--n-space-3);
        align-items: flex-start;
        min-width: 0;
      }

      .n-data-card__icon {
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

      .n-data-card__heading {
        min-width: 0;
      }

      .n-data-card__heading h3,
      .n-data-card__heading p {
        margin: 0;
      }

      .n-data-card__heading h3 {
        color: var(--n-text-1);
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-18);
        line-height: 1.3;
      }

      .n-data-card__heading p {
        margin-top: var(--n-space-1);
        color: var(--n-text-2);
        font-size: var(--n-font-size-13);
        line-height: 1.6;
      }

      .n-data-card__items {
        display: grid;
        gap: var(--n-space-2);
        margin: 0;
      }

      .n-data-card__item {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: var(--n-space-3);
        align-items: center;
        min-width: 0;
        padding: var(--n-space-3);
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-md);
        background: color-mix(in srgb, var(--n-surface-3) 72%, transparent);
      }

      .n-data-card__item dt,
      .n-data-card__item dd {
        display: inline-flex;
        align-items: center;
        gap: var(--n-space-2);
        min-width: 0;
        margin: 0;
      }

      .n-data-card__item dt {
        color: var(--n-text-2);
        font-size: var(--n-font-size-13);
      }

      .n-data-card__item dd {
        color: var(--n-text-1);
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-data-card__footer:empty {
        display: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-data-card {
          transition: none;
        }

        .n-data-card--interactive:hover {
          transform: none;
        }
      }
    `,
  ],
})
export class NDataCard {
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly variant = input<NDataCardVariant>('default');
  readonly density = input<NDataCardDensity>('comfortable');
  readonly items = input<ReadonlyArray<NDataCardItem>>([]);
  readonly interactive = input(false, { transform: booleanAttribute });

  statusDot(status: NonNullable<NDataCardItem['status']>): 'online' | 'away' | 'busy' | 'offline' | 'danger' {
    if (status === 'success') {
      return 'online';
    }

    if (status === 'warning') {
      return 'away';
    }

    if (status === 'danger') {
      return 'danger';
    }

    if (status === 'info') {
      return 'busy';
    }

    return 'offline';
  }
}

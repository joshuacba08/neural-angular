import { Component, input } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NEmptyStateOrientation } from './empty-state.types.js';

@Component({
  selector: 'n-empty-state',
  standalone: true,
  imports: [NIcon],
  template: `
    <section
      class="n-empty-state"
      [class.n-empty-state--horizontal]="orientation() === 'horizontal'"
    >
      @if (icon()) {
        <span class="n-empty-state__icon" aria-hidden="true">
          <n-icon [name]="icon() ?? ''" size="xl" />
        </span>
      }

      <div class="n-empty-state__body">
        @if (title()) {
          <h3 class="n-empty-state__title">{{ title() }}</h3>
        }
        @if (description()) {
          <p class="n-empty-state__description">{{ description() }}</p>
        }
        <div class="n-empty-state__actions">
          <ng-content />
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-empty-state {
        display: grid;
        justify-items: center;
        gap: var(--n-space-4);
        padding: var(--n-space-8);
        border: 1px dashed var(--n-border-2);
        border-radius: var(--n-radius-xl);
        background: var(--n-gradient-surface);
        text-align: center;
      }

      .n-empty-state--horizontal {
        grid-template-columns: auto minmax(0, 1fr);
        align-items: center;
        justify-items: start;
        text-align: left;
      }

      .n-empty-state__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 58px;
        height: 58px;
        border: 1px solid var(--n-border-2);
        border-radius: var(--n-radius-2xl);
        background: color-mix(in srgb, var(--n-color-primary) 12%, var(--n-surface-2));
        color: var(--n-color-primary-bright);
        box-shadow: var(--n-glow-primary-xs);
      }

      .n-empty-state__body {
        display: grid;
        gap: var(--n-space-3);
        max-width: 520px;
      }

      .n-empty-state__title,
      .n-empty-state__description {
        margin: 0;
      }

      .n-empty-state__title {
        color: var(--n-text-1);
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-20);
        font-weight: var(--n-font-weight-semibold);
      }

      .n-empty-state__description {
        color: var(--n-text-2);
        line-height: 1.7;
      }

      .n-empty-state__actions {
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--n-space-3);
      }

      .n-empty-state--horizontal .n-empty-state__actions {
        justify-content: flex-start;
      }

      @media (max-width: 640px) {
        .n-empty-state--horizontal {
          grid-template-columns: 1fr;
          justify-items: center;
          text-align: center;
        }

        .n-empty-state--horizontal .n-empty-state__actions {
          justify-content: center;
        }
      }
    `,
  ],
})
export class NEmptyState {
  readonly icon = input<string | undefined>(undefined);
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly orientation = input<NEmptyStateOrientation>('vertical');
}

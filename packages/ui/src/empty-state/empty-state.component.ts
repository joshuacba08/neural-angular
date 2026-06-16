import { Component, input } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NEmptyStateOrientation, NEmptyStateVariant } from './empty-state.types.js';

@Component({
  selector: 'n-empty-state',
  standalone: true,
  imports: [NIcon],
  template: `
    <section
      class="n-empty-state"
      [class.n-empty-state--primary]="variant() === 'primary'"
      [class.n-empty-state--neutral]="variant() === 'neutral'"
      [class.n-empty-state--error]="variant() === 'error'"
      [class.n-empty-state--horizontal]="orientation() === 'horizontal'"
    >
      @if (icon()) {
        <span
          class="n-empty-state__icon"
          [class.n-empty-state__icon--muted]="variant() === 'neutral'"
          aria-hidden="true"
        >
          <n-icon [name]="icon() ?? ''" size="lg" />
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
        gap: 13px;
        padding: 32px 22px;
        border: 1.5px dashed transparent;
        border-radius: var(--n-radius-xl);
        text-align: center;
      }

      .n-empty-state--primary {
        border-color: rgba(66, 133, 244, 0.18);
        background: rgba(66, 133, 244, 0.03);
      }

      .n-empty-state--neutral {
        border-color: rgba(255, 255, 255, 0.07);
        background: rgba(255, 255, 255, 0.01);
      }

      .n-empty-state--error {
        border-color: rgba(234, 67, 53, 0.15);
        background: rgba(234, 67, 53, 0.03);
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
        width: 56px;
        height: 56px;
        border-radius: var(--n-radius-xl);
      }

      .n-empty-state--primary .n-empty-state__icon {
        border: 1px solid rgba(66, 133, 244, 0.18);
        background: rgba(66, 133, 244, 0.1);
        color: rgba(66, 133, 244, 0.8);
      }

      .n-empty-state--neutral .n-empty-state__icon {
        border: 1px solid var(--n-border-1);
        background: rgba(255, 255, 255, 0.04);
        color: var(--n-text-1);
      }

      .n-empty-state__icon--muted > n-icon {
        opacity: 0.28;
      }

      .n-empty-state--error .n-empty-state__icon {
        border: 1px solid rgba(234, 67, 53, 0.2);
        background: rgba(234, 67, 53, 0.1);
        color: var(--n-color-danger);
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
        font-family: var(--n-font-body);
        font-size: var(--n-font-size-14);
        font-weight: var(--n-font-weight-semibold);
        line-height: 1.35;
      }

      .n-empty-state__description {
        color: var(--n-text-3);
        font-size: var(--n-font-size-12);
        line-height: 1.6;
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
  readonly variant = input<NEmptyStateVariant>('primary');
  readonly orientation = input<NEmptyStateOrientation>('vertical');
}

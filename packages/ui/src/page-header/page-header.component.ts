import { Component, input } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';

@Component({
  selector: 'n-page-header',
  standalone: true,
  imports: [NIcon],
  template: `
    <header class="n-page-header">
      @if (icon()) {
        <span class="n-page-header__icon" aria-hidden="true">
          <n-icon [name]="icon() ?? ''" size="lg" />
        </span>
      }
      <div class="n-page-header__body">
        @if (eyebrow()) {
          <p class="n-page-header__eyebrow">{{ eyebrow() }}</p>
        }
        @if (title()) {
          <h1 class="n-page-header__title">{{ title() }}</h1>
        }
        @if (description()) {
          <p class="n-page-header__description">{{ description() }}</p>
        }
      </div>
      <div class="n-page-header__actions">
        <ng-content select="[pageHeaderAction]" />
        <ng-content />
      </div>
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-page-header {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: var(--n-page-header-gap);
        align-items: center;
      }

      .n-page-header__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        border: 1px solid var(--n-border-2);
        border-radius: var(--n-radius-xl);
        background: color-mix(in srgb, var(--n-color-primary) 12%, var(--n-surface-2));
        color: var(--n-color-primary-bright);
        box-shadow: var(--n-glow-primary-xs);
      }

      .n-page-header__body {
        min-width: 0;
      }

      .n-page-header__eyebrow,
      .n-page-header__title,
      .n-page-header__description {
        margin: 0;
      }

      .n-page-header__eyebrow {
        color: var(--n-color-primary-bright);
        font-size: var(--n-font-size-12);
        font-weight: var(--n-font-weight-bold);
        letter-spacing: 0;
        text-transform: uppercase;
      }

      .n-page-header__title {
        margin-top: var(--n-space-1);
        color: var(--n-text-1);
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-32);
        line-height: 1.1;
      }

      .n-page-header__description {
        margin-top: var(--n-space-2);
        color: var(--n-text-2);
        line-height: 1.7;
      }

      .n-page-header__actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: var(--n-space-3);
      }

      @media (max-width: 760px) {
        .n-page-header {
          grid-template-columns: 1fr;
        }

        .n-page-header__actions {
          justify-content: flex-start;
        }
      }
    `,
  ],
})
export class NPageHeader {
  readonly eyebrow = input<string | undefined>(undefined);
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
}

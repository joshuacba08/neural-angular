import { booleanAttribute, Component, input } from '@angular/core';

import type { NCardVariant } from './card.types.js';

@Component({
  selector: 'n-card',
  standalone: true,
  template: `
    <article
      class="n-card"
      [class.n-card--default]="variant() === 'default'"
      [class.n-card--elevated]="variant() === 'elevated'"
      [class.n-card--outlined]="variant() === 'outlined'"
      [class.n-card--gradient]="variant() === 'gradient'"
      [class.n-card--interactive]="interactive()"
    >
      <ng-content />
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-card {
        position: relative;
        display: block;
        min-width: 0;
        padding: var(--n-space-5);
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-xl);
        background: var(--n-surface-2);
        color: var(--n-text-1);
        box-shadow: var(--n-elevation-1);
        overflow: hidden;
        transition:
          transform var(--n-transition-fast),
          border-color var(--n-transition-fast),
          background var(--n-transition-fast),
          box-shadow var(--n-transition-fast);
      }

      .n-card--default {
        background: color-mix(in srgb, var(--n-surface-2) 92%, transparent);
      }

      .n-card--elevated {
        border-color: var(--n-border-2);
        background: var(--n-surface-2);
        box-shadow: var(--n-elevation-3);
      }

      .n-card--outlined {
        border-color: var(--n-border-3);
        background: transparent;
        box-shadow: none;
      }

      .n-card--gradient {
        border-color: transparent;
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border) border-box;
        box-shadow: var(--n-elevation-2), var(--n-glow-gradient-sm);
      }

      .n-card--interactive:hover {
        transform: translateY(-2px);
        border-color: color-mix(in srgb, var(--n-color-primary) 45%, var(--n-border-2));
        box-shadow: var(--n-elevation-3), var(--n-glow-primary-xs);
      }

      @media (prefers-reduced-motion: reduce) {
        .n-card {
          transition: none;
        }

        .n-card--interactive:hover {
          transform: none;
        }
      }
    `,
  ],
})
export class NCard {
  readonly variant = input<NCardVariant>('default');
  readonly interactive = input(false, { transform: booleanAttribute });
}

@Component({
  selector: 'n-card-header',
  standalone: true,
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: grid;
        gap: var(--n-space-2);
        margin-bottom: var(--n-space-4);
      }
    `,
  ],
})
export class NCardHeader {}

@Component({
  selector: 'n-card-title',
  standalone: true,
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: block;
        color: var(--n-text-1);
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-18);
        font-weight: var(--n-font-weight-semibold);
        line-height: 1.3;
      }
    `,
  ],
})
export class NCardTitle {}

@Component({
  selector: 'n-card-description',
  standalone: true,
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: block;
        color: var(--n-text-2);
        font-size: var(--n-font-size-14);
        line-height: 1.6;
      }
    `,
  ],
})
export class NCardDescription {}

@Component({
  selector: 'n-card-content',
  standalone: true,
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: block;
        color: var(--n-text-2);
        font-size: var(--n-font-size-14);
        line-height: 1.7;
      }
    `,
  ],
})
export class NCardContent {}

@Component({
  selector: 'n-card-footer',
  standalone: true,
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: var(--n-space-3);
        align-items: center;
        margin-top: var(--n-space-5);
      }
    `,
  ],
})
export class NCardFooter {}

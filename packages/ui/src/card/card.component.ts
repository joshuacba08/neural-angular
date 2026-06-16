import { booleanAttribute, Component, input } from '@angular/core';

import type { NCardAccent, NCardRowVariant, NCardVariant } from './card.types.js';

@Component({
  selector: 'n-card',
  standalone: true,
  template: `
    <article
      class="n-card"
      [class.n-card--default]="isDefaultBorder()"
      [class.n-card--primary]="variant() === 'primary'"
      [class.n-card--secondary]="variant() === 'secondary'"
      [class.n-card--elevated]="variant() === 'elevated'"
      [class.n-card--outlined]="variant() === 'outlined'"
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
        padding: 22px;
        border: 1px solid transparent;
        border-radius: var(--n-radius-lg);
        color: var(--n-text-1);
        overflow: hidden;
        transition:
          transform 250ms ease,
          background 250ms ease,
          box-shadow 250ms ease;
      }

      .n-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--n-gradient-surface);
        opacity: 0;
        transition: opacity 250ms ease;
        pointer-events: none;
      }

      .n-card--default {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border) border-box;
      }

      .n-card--primary {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border-primary) border-box;
      }

      .n-card--secondary {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border-secondary) border-box;
      }

      .n-card--elevated {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border) border-box;
        box-shadow: var(--n-elevation-3);
      }

      .n-card--outlined {
        border-color: var(--n-border-1);
        background: transparent;
        box-shadow: none;
      }

      .n-card--outlined::before {
        display: none;
      }

      .n-card--interactive {
        cursor: pointer;
      }

      .n-card--interactive:hover {
        transform: translateY(-2px);
        box-shadow: var(--n-elevation-3), var(--n-glow-gradient-sm);
      }

      .n-card--interactive:not(.n-card--outlined):hover {
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border) border-box;
      }

      .n-card--interactive.n-card--primary:not(.n-card--outlined):hover {
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border-primary) border-box;
      }

      .n-card--interactive.n-card--secondary:not(.n-card--outlined):hover {
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border-secondary) border-box;
      }

      .n-card--interactive:hover::before {
        opacity: 1;
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

  isDefaultBorder(): boolean {
    const value = this.variant();
    return value === 'default' || value === 'gradient' || value === 'elevated';
  }
}

@Component({
  selector: 'n-card-header',
  standalone: true,
  template: `<ng-content />`,
  styles: [
    `
      :host {
        position: relative;
        z-index: 1;
        display: grid;
        gap: var(--n-space-2);
        margin-bottom: var(--n-space-3);
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
        position: relative;
        z-index: 1;
        display: block;
        margin: 0 0 6px;
        color: var(--n-text-1);
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-15);
        font-weight: var(--n-font-weight-semibold);
        letter-spacing: -0.018em;
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
        position: relative;
        z-index: 1;
        display: block;
        color: var(--n-text-2);
        font-size: var(--n-font-size-13);
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
        position: relative;
        z-index: 1;
        display: block;
        color: var(--n-text-2);
        font-size: var(--n-font-size-13);
        line-height: 1.6;
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
        position: relative;
        z-index: 1;
        display: flex;
        flex-wrap: wrap;
        gap: var(--n-space-3);
        align-items: center;
        margin-top: var(--n-space-4);
      }
    `,
  ],
})
export class NCardFooter {}

@Component({
  selector: 'n-card-icon',
  standalone: true,
  template: `
    <span
      class="n-card-icon"
      [class.n-card-icon--gemini]="accent() === 'gemini'"
      [class.n-card-icon--primary]="accent() === 'primary'"
      [class.n-card-icon--secondary]="accent() === 'secondary'"
    >
      <ng-content />
    </span>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-card-icon {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        margin-bottom: 14px;
        border-radius: 10px;
        color: #fff;
        font-size: 17px;
        line-height: 1;
      }

      .n-card-icon--gemini {
        background: var(--n-gradient-gemini);
      }

      .n-card-icon--primary {
        background: var(--n-gradient-primary-secondary);
      }

      .n-card-icon--secondary {
        background: var(--n-gradient-secondary-tertiary);
      }
    `,
  ],
})
export class NCardIcon {
  readonly accent = input<NCardAccent>('gemini');
}

@Component({
  selector: 'n-card-meta',
  standalone: true,
  template: `
    <span
      class="n-card-meta"
      [class.n-card-meta--gemini]="accent() === 'gemini'"
      [class.n-card-meta--primary]="accent() === 'primary'"
      [class.n-card-meta--secondary]="accent() === 'secondary'"
    >
      <ng-content />
    </span>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-card-meta {
        position: relative;
        z-index: 1;
        display: block;
        margin-top: 14px;
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-10);
        font-weight: var(--n-font-weight-semibold);
        letter-spacing: 0.04em;
        line-height: 1.2;
        text-transform: uppercase;
      }

      .n-card-meta--gemini,
      .n-card-meta--primary {
        background: var(--n-gradient-primary-secondary);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
      }

      .n-card-meta--secondary {
        background: var(--n-gradient-secondary-tertiary);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
      }
    `,
  ],
})
export class NCardMeta {
  readonly accent = input<NCardAccent>('primary');
}

@Component({
  selector: 'n-card-row',
  standalone: true,
  template: `
    <article
      class="n-card-row"
      [class.n-card-row--default]="isDefaultBorder()"
      [class.n-card-row--primary]="variant() === 'primary'"
      [class.n-card-row--secondary]="variant() === 'secondary'"
      [class.n-card-row--interactive]="interactive()"
    >
      <ng-content />
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-card-row {
        position: relative;
        display: flex;
        align-items: center;
        gap: 14px;
        min-width: 0;
        padding: 14px 18px;
        border: 1px solid transparent;
        border-radius: var(--n-radius-lg);
        color: var(--n-text-1);
        overflow: hidden;
        transition:
          transform 250ms ease,
          background 250ms ease,
          box-shadow 250ms ease;
      }

      .n-card-row::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--n-gradient-surface);
        opacity: 0;
        transition: opacity 250ms ease;
        pointer-events: none;
      }

      .n-card-row--default {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border-primary) border-box;
      }

      .n-card-row--primary {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border-primary) border-box;
      }

      .n-card-row--secondary {
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-gradient-border-secondary) border-box;
      }

      .n-card-row--interactive {
        cursor: pointer;
      }

      .n-card-row--interactive:hover {
        transform: translateY(-1px);
        box-shadow: var(--n-elevation-2), var(--n-glow-gradient-sm);
      }

      .n-card-row--interactive.n-card-row--default:hover,
      .n-card-row--interactive.n-card-row--primary:hover {
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border) border-box;
      }

      .n-card-row--interactive.n-card-row--secondary:hover {
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border-secondary) border-box;
      }

      .n-card-row--interactive:hover::before {
        opacity: 1;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-card-row {
          transition: none;
        }

        .n-card-row--interactive:hover {
          transform: none;
        }
      }
    `,
  ],
})
export class NCardRow {
  readonly variant = input<NCardRowVariant>('default');
  readonly interactive = input(true, { transform: booleanAttribute });

  isDefaultBorder(): boolean {
    return this.variant() === 'default';
  }
}

@Component({
  selector: 'n-card-row-avatar',
  standalone: true,
  template: `
    <span
      class="n-card-row-avatar"
      [class.n-card-row-avatar--gemini]="accent() === 'gemini'"
      [class.n-card-row-avatar--primary]="accent() === 'primary'"
      [class.n-card-row-avatar--secondary]="accent() === 'secondary'"
    >
      <ng-content />
    </span>
  `,
  styles: [
    `
      :host {
        position: relative;
        z-index: 1;
        flex-shrink: 0;
      }

      .n-card-row-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        color: #fff;
        font-family: var(--n-font-display);
        font-size: var(--n-font-size-15);
        font-weight: var(--n-font-weight-bold);
        line-height: 1;
      }

      .n-card-row-avatar--gemini {
        background: var(--n-gradient-gemini);
      }

      .n-card-row-avatar--primary {
        background: var(--n-gradient-primary-secondary);
      }

      .n-card-row-avatar--secondary {
        background: var(--n-gradient-secondary-tertiary);
      }
    `,
  ],
})
export class NCardRowAvatar {
  readonly accent = input<NCardAccent>('primary');
}

@Component({
  selector: 'n-card-row-body',
  standalone: true,
  template: `<div class="n-card-row-body"><ng-content /></div>`,
  styles: [
    `
      :host {
        position: relative;
        z-index: 1;
        flex: 1;
        min-width: 0;
      }

      .n-card-row-body {
        display: grid;
        gap: 2px;
        min-width: 0;
      }
    `,
  ],
})
export class NCardRowBody {}

@Component({
  selector: 'n-card-row-title',
  standalone: true,
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: block;
        color: var(--n-text-1);
        font-size: var(--n-font-size-14);
        font-weight: var(--n-font-weight-medium);
        line-height: 1.35;
      }
    `,
  ],
})
export class NCardRowTitle {}

@Component({
  selector: 'n-card-row-subtitle',
  standalone: true,
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: block;
        color: var(--n-text-3);
        font-size: var(--n-font-size-12);
        line-height: 1.4;
      }
    `,
  ],
})
export class NCardRowSubtitle {}

@Component({
  selector: 'n-card-row-trailing',
  standalone: true,
  template: `<div class="n-card-row-trailing"><ng-content /></div>`,
  styles: [
    `
      :host {
        position: relative;
        z-index: 1;
        flex-shrink: 0;
      }

      .n-card-row-trailing {
        display: inline-flex;
        align-items: center;
      }
    `,
  ],
})
export class NCardRowTrailing {}

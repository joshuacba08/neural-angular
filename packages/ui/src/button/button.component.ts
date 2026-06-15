import { booleanAttribute, Component, computed, input } from '@angular/core';

import type {
  NButtonSize,
  NButtonType,
  NButtonVariant,
} from './button.types.js';

@Component({
  selector: 'n-button',
  standalone: true,
  template: `
    <button
      class="n-button"
      [class.n-button--primary]="variant() === 'primary'"
      [class.n-button--secondary]="variant() === 'secondary'"
      [class.n-button--ghost]="variant() === 'ghost'"
      [class.n-button--danger]="variant() === 'danger'"
      [class.n-button--sm]="size() === 'sm'"
      [class.n-button--md]="size() === 'md'"
      [class.n-button--lg]="size() === 'lg'"
      [class.n-button--full]="fullWidth()"
      [class.n-button--loading]="loading()"
      [type]="type()"
      [disabled]="isDisabled()"
      [attr.aria-busy]="loading() ? 'true' : null"
    >
      @if (loading()) {
        <span class="n-button__loader" aria-hidden="true"></span>
      }
      <span class="n-button__content">
        <ng-content />
      </span>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        max-width: 100%;
      }

      :host:has(.n-button--full) {
        display: block;
        width: 100%;
      }

      .n-button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--n-space-2);
        width: auto;
        max-width: 100%;
        border: 1px solid transparent;
        border-radius: var(--n-radius-full);
        font-family: var(--n-font-body);
        font-weight: var(--n-font-weight-semibold);
        letter-spacing: 0;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        transition:
          transform var(--n-transition-fast),
          border-color var(--n-transition-fast),
          background var(--n-transition-fast),
          color var(--n-transition-fast),
          box-shadow var(--n-transition-fast),
          opacity var(--n-transition-fast);
      }

      .n-button--sm {
        min-height: 32px;
        padding: 0 var(--n-space-3);
        font-size: var(--n-font-size-13);
      }

      .n-button--md {
        min-height: 40px;
        padding: 0 var(--n-space-4);
        font-size: var(--n-font-size-14);
      }

      .n-button--lg {
        min-height: 48px;
        padding: 0 var(--n-space-5);
        font-size: var(--n-font-size-15);
      }

      .n-button--full {
        width: 100%;
      }

      .n-button--primary {
        background: var(--n-gradient-primary-secondary);
        color: #fff;
        box-shadow: var(--n-glow-primary-xs), var(--n-elevation-1);
      }

      .n-button--secondary {
        border-color: color-mix(in srgb, var(--n-color-secondary) 34%, var(--n-border-2));
        background: color-mix(in srgb, var(--n-surface-3) 88%, var(--n-color-secondary));
        color: var(--n-text-1);
        box-shadow: inset 0 1px 0 var(--n-border-1);
      }

      .n-button--ghost {
        border-color: var(--n-border-1);
        background: transparent;
        color: var(--n-text-1);
      }

      .n-button--danger {
        background: color-mix(in srgb, var(--n-color-danger) 88%, #000);
        color: #fff;
        box-shadow: var(--n-glow-danger-sm), var(--n-elevation-1);
      }

      .n-button:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: var(--n-elevation-2), var(--n-glow-primary-xs);
      }

      .n-button--ghost:hover:not(:disabled) {
        background: color-mix(in srgb, var(--n-surface-3) 78%, transparent);
      }

      .n-button--danger:hover:not(:disabled) {
        box-shadow: var(--n-elevation-2), var(--n-glow-danger-sm);
      }

      .n-button:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: var(--n-elevation-1);
      }

      .n-button:focus-visible {
        outline: 2px solid var(--n-color-primary-bright);
        outline-offset: 3px;
      }

      .n-button:disabled {
        cursor: not-allowed;
        opacity: 0.55;
        transform: none;
        box-shadow: none;
      }

      .n-button__content {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--n-space-2);
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .n-button__loader {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: var(--n-radius-full);
        animation: n-button-spin var(--n-duration-slower) linear infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .n-button {
          transition: none;
        }

        .n-button__loader {
          animation: none;
        }
      }

      @keyframes n-button-spin {
        to {
          transform: rotate(1turn);
        }
      }
    `,
  ],
})
export class NButton {
  readonly variant = input<NButtonVariant>('primary');
  readonly size = input<NButtonSize>('md');
  readonly type = input<NButtonType>('button');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });

  readonly isDisabled = computed(() => this.disabled() || this.loading());
}

import { booleanAttribute, Component, computed, input, output } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import type { NAlertVariant } from './alert.types.js';

@Component({
  selector: 'n-alert',
  standalone: true,
  imports: [NIcon],
  template: `
    <div
      class="n-alert"
      [class.n-alert--success]="variant() === 'success'"
      [class.n-alert--warning]="variant() === 'warning'"
      [class.n-alert--danger]="variant() === 'danger'"
      [class.n-alert--info]="variant() === 'info'"
      role="alert"
    >
      @if (computedIcon()) {
        <n-icon [name]="computedIcon()!" class="n-alert__icon" size="sm" />
      }

      <div class="n-alert__body">
        @if (title()) {
          <div class="n-alert__title">{{ title() }}</div>
        }
        @if (description()) {
          <div class="n-alert__description">{{ description() }}</div>
        }
      </div>

      <div class="n-alert__actions">
        <ng-content />
      </div>

      @if (closable()) {
        <button
          type="button"
          class="n-alert__close"
          aria-label="Close alert"
          (click)="handleClose()"
        >
          <n-icon name="x" size="xs" />
        </button>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .n-alert {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px 14px;
        border-radius: 10px;
        border: 1px solid transparent;
        font-family: var(--n-font-body);
        box-sizing: border-box;
      }

      .n-alert--success {
        background: rgba(52, 168, 83, 0.08);
        border-color: rgba(52, 168, 83, 0.22);
        color: var(--n-color-success);
      }

      .n-alert--warning {
        background: rgba(251, 188, 5, 0.07);
        border-color: rgba(251, 188, 5, 0.22);
        color: var(--n-color-warning);
      }

      .n-alert--danger {
        background: rgba(234, 67, 53, 0.07);
        border-color: rgba(234, 67, 53, 0.22);
        color: var(--n-color-danger);
      }

      .n-alert--info {
        background: rgba(66, 133, 244, 0.07);
        border-color: rgba(66, 133, 244, 0.22);
        color: var(--n-color-primary-bright);
      }

      .n-alert__icon {
        flex-shrink: 0;
        margin-top: 1px;
        color: inherit;
      }

      .n-alert__body {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .n-alert__title {
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-semibold);
        line-height: 1.4;
        color: inherit;
      }

      .n-alert__description {
        font-size: var(--n-font-size-12);
        line-height: 1.4;
      }

      .n-alert--success .n-alert__description {
        color: rgba(52, 168, 83, 0.8);
      }

      .n-alert--warning .n-alert__description {
        color: rgba(251, 188, 5, 0.75);
      }

      .n-alert--danger .n-alert__description {
        color: rgba(234, 67, 53, 0.75);
      }

      .n-alert--info .n-alert__description {
        color: rgba(102, 157, 246, 0.75);
      }

      .n-alert__actions {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;
      }

      .n-alert__actions ::ng-deep button {
        font-family: var(--n-font-mono);
        font-size: 9.5px;
        padding: 3px 10px;
        border-radius: var(--n-radius-full);
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        background: transparent;
        border: 1px solid transparent;
        transition:
          background-color 150ms ease,
          border-color 150ms ease,
          color 150ms ease;
      }

      .n-alert--success .n-alert__actions ::ng-deep button {
        background: rgba(52, 168, 83, 0.14);
        border-color: rgba(52, 168, 83, 0.25);
        color: var(--n-color-success);
      }

      .n-alert--success .n-alert__actions ::ng-deep button:hover {
        background: rgba(52, 168, 83, 0.22);
      }

      .n-alert--warning .n-alert__actions ::ng-deep button {
        background: rgba(251, 188, 5, 0.14);
        border-color: rgba(251, 188, 5, 0.25);
        color: var(--n-color-warning);
      }

      .n-alert--warning .n-alert__actions ::ng-deep button:hover {
        background: rgba(251, 188, 5, 0.22);
      }

      .n-alert--danger .n-alert__actions ::ng-deep button {
        background: rgba(234, 67, 53, 0.14);
        border-color: rgba(234, 67, 53, 0.25);
        color: var(--n-color-danger);
      }

      .n-alert--danger .n-alert__actions ::ng-deep button:hover {
        background: rgba(234, 67, 53, 0.22);
      }

      .n-alert--info .n-alert__actions ::ng-deep button {
        background: rgba(66, 133, 244, 0.14);
        border-color: rgba(66, 133, 244, 0.25);
        color: var(--n-color-primary-bright);
      }

      .n-alert--info .n-alert__actions ::ng-deep button:hover {
        background: rgba(66, 133, 244, 0.22);
      }

      .n-alert__close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        background: transparent;
        padding: 0;
        margin: 0;
        cursor: pointer;
        flex-shrink: 0;
        color: inherit;
        opacity: 0.45;
        transition: opacity 120ms ease;
        align-self: flex-start;
        margin-top: 2px;
      }

      .n-alert__close:hover {
        opacity: 1;
      }
    `,
  ],
})
export class NAlert {
  readonly variant = input<NAlertVariant>('info');
  readonly icon = input<string | undefined>(undefined);
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly closable = input(false, { transform: booleanAttribute });

  readonly close = output<void>();

  readonly computedIcon = computed(() => {
    const customIcon = this.icon();
    if (customIcon !== undefined) {
      return customIcon;
    }
    switch (this.variant()) {
      case 'success':
        return 'check-circle-2';
      case 'warning':
        return 'alert-triangle';
      case 'danger':
        return 'x-circle';
      case 'info':
      default:
        return 'info';
    }
  });

  handleClose(): void {
    this.close.emit();
  }
}

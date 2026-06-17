import { Component, input, model, output } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';

@Component({
  selector: 'n-toggle-button',
  standalone: true,
  imports: [NIcon],
  template: `
    <button
      type="button"
      [class]="checked() ? 'nn-btn nn-btn-gm' : 'nn-btn nn-btn-f'"
      (click)="toggle()"
    >
      @let iconName = checked() ? onIcon() : offIcon();
      @if (iconName) {
        <n-icon [name]="iconName" size="sm" class="nn-btn-ico" />
      }
      <span>{{ checked() ? onLabel() : offLabel() }}</span>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        box-sizing: border-box;
      }

      .nn-btn {
        height: 40px;
        padding: 0 16px;
        border-radius: var(--n-radius-full, 9999px);
        font-family: var(--n-font-body);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        border: none;
        transition: all 200ms;
        box-sizing: border-box;
        outline: none;
      }

      .nn-btn-gm {
        background: var(--n-gradient-primary-secondary, linear-gradient(135deg, #4285f4 0%, #7b5cf6 100%));
        color: #fff;
        box-shadow: 0 4px 14px rgba(66, 133, 244, 0.4);
      }

      .nn-btn-gm:hover {
        transform: scale(1.03);
      }

      .nn-btn-f {
        background: var(--n-surface-3);
        border: 1px solid var(--n-border-2);
        color: var(--n-text-2);
      }

      .nn-btn-f:hover {
        background: var(--n-surface-4);
        color: var(--n-text-1);
      }

      .nn-btn-ico {
        flex-shrink: 0;
      }
    `,
  ],
})
export class NToggleButton {
  readonly onLabel = input<string>('');
  readonly offLabel = input<string>('');
  readonly onIcon = input<string | undefined>(undefined);
  readonly offIcon = input<string | undefined>(undefined);

  readonly checked = model<boolean>(false);
  readonly change = output<boolean>();

  toggle(): void {
    const nextVal = !this.checked();
    this.checked.set(nextVal);
    this.change.emit(nextVal);
  }
}

import {
  booleanAttribute,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'n-switch',
  standalone: true,
  template: `
    <button
      type="button"
      class="n-switch"
      [class.n-switch--checked]="checked()"
      [class.n-switch--disabled]="disabled()"
      [disabled]="disabled()"
      [attr.aria-checked]="checked()"
      role="switch"
      (click)="toggle()"
    >
      <span class="n-switch__handle"></span>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        vertical-align: middle;
      }

      .n-switch {
        position: relative;
        width: 36px;
        height: 20px;
        border-radius: 99px;
        border: none;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.1);
        transition: background var(--n-transition-fast, 200ms);
        padding: 0;
        outline: none;
        box-sizing: border-box;
      }

      .n-switch:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.15);
      }

      .n-switch:focus-visible {
        box-shadow: var(--n-focus-ring);
      }

      .n-switch--checked {
        background: var(--n-color-primary, #4285f4);
      }

      .n-switch--checked:hover:not(:disabled) {
        background: var(--n-color-primary-hover, #5a95f5);
      }

      .n-switch__handle {
        position: absolute;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #ffffff;
        top: 3px;
        left: 3px;
        transition: transform var(--n-transition-fast, 200ms) cubic-bezier(0.2, 0, 0, 1);
        display: block;
      }

      .n-switch--checked .n-switch__handle {
        transform: translateX(16px);
      }

      .n-switch--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ],
})
export class NSwitch {
  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly checkedChange = output<boolean>();

  toggle(): void {
    if (this.disabled()) {
      return;
    }

    this.checkedChange.emit(!this.checked());
  }
}

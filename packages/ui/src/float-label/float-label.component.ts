import { Component } from '@angular/core';

@Component({
  selector: 'n-float-label',
  standalone: true,
  template: `
    <div class="n-float-label">
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        width: 100%;
      }

      .n-float-label {
        position: relative;
        width: 100%;
      }

      :host ::ng-deep input {
        width: 100%;
        min-width: 0;
        border: 1px solid var(--n-field-border);
        border-radius: var(--n-radius-md);
        background: var(--n-field-bg);
        color: var(--n-text-1);
        font: inherit;
        letter-spacing: 0;
        outline: none;
        height: 44px;
        padding: 20px 14px 6px !important;
        box-sizing: border-box;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast);
      }

      :host ::ng-deep input:hover:not(:disabled) {
        background: var(--n-field-bg-hover);
        border-color: var(--n-field-border-hover);
      }

      :host ::ng-deep input:focus-visible {
        border-color: var(--n-field-border-focus);
        box-shadow: var(--n-focus-ring);
      }

      :host ::ng-deep label {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 13px;
        color: var(--n-text-3);
        transition: all 180ms var(--n-transition-base, cubic-bezier(0.2, 0, 0, 1));
        pointer-events: none;
        line-height: 1;
      }

      :host ::ng-deep input:focus ~ label,
      :host ::ng-deep input:not(:placeholder-shown) ~ label {
        top: 10px;
        transform: none;
        font-size: 9.5px;
        letter-spacing: 0.03em;
        color: var(--n-color-primary-bright);
      }
    `,
  ],
})
export class NFloatLabel {}

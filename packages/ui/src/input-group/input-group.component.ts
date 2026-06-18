import { Component } from '@angular/core';

@Component({
  selector: 'n-input-group',
  standalone: true,
  template: `
    <div class="n-input-group">
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .n-input-group {
        display: flex;
        align-items: stretch;
        width: 100%;
      }

      /* Reset border-radii on all elements inside the input group */
      :host ::ng-deep .n-input-group > * {
        border-radius: 0 !important;
      }

      :host ::ng-deep .n-input-group > * input,
      :host ::ng-deep .n-input-group > * button,
      :host ::ng-deep .n-input-group > * .n-input-group-addon,
      :host ::ng-deep .n-input-group > * .n-field__control,
      :host ::ng-deep .n-input-group > * .n-number__wrap {
        border-radius: 0 !important;
        margin: 0;
      }

      /* Adjust input width and height */
      :host ::ng-deep .n-input-group > input,
      :host ::ng-deep .n-input-group > * input,
      :host ::ng-deep .n-input-group > * .n-field__control {
        flex: 1;
        min-width: 0;
        height: 44px;
        box-sizing: border-box;
      }

      /* Flex custom input components (like <n-input>, <n-input-number>, etc.) */
      :host ::ng-deep .n-input-group > n-input,
      :host ::ng-deep .n-input-group > n-input-number,
      :host ::ng-deep .n-input-group > n-input-mask {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
      }

      :host ::ng-deep .n-input-group > n-input .n-field,
      :host ::ng-deep .n-input-group > n-input-number .n-number__wrap {
        height: 44px;
        width: 100%;
      }

      /* Border collapse styling: Remove double borders */
      :host ::ng-deep .n-input-group > *:not(:first-child) {
        border-left: 0 !important;
      }

      :host ::ng-deep .n-input-group > *:not(:first-child) input,
      :host ::ng-deep .n-input-group > *:not(:first-child) button,
      :host ::ng-deep .n-input-group > *:not(:first-child) .n-input-group-addon,
      :host ::ng-deep .n-input-group > *:not(:first-child) .n-field__control,
      :host ::ng-deep .n-input-group > *:not(:first-child) .n-number__wrap {
        border-left: 0 !important;
      }

      /* First child left borders */
      :host ::ng-deep .n-input-group > *:first-child,
      :host ::ng-deep .n-input-group > *:first-child input,
      :host ::ng-deep .n-input-group > *:first-child button,
      :host ::ng-deep .n-input-group > *:first-child .n-input-group-addon,
      :host ::ng-deep .n-input-group > *:first-child .n-field__control,
      :host ::ng-deep .n-input-group > *:first-child .n-number__wrap {
        border-top-left-radius: var(--n-radius-md) !important;
        border-bottom-left-radius: var(--n-radius-md) !important;
      }

      /* Last child right borders */
      :host ::ng-deep .n-input-group > *:last-child,
      :host ::ng-deep .n-input-group > *:last-child input,
      :host ::ng-deep .n-input-group > *:last-child button,
      :host ::ng-deep .n-input-group > *:last-child .n-input-group-addon,
      :host ::ng-deep .n-input-group > *:last-child .n-field__control,
      :host ::ng-deep .n-input-group > *:last-child .n-number__wrap {
        border-top-right-radius: var(--n-radius-md) !important;
        border-bottom-right-radius: var(--n-radius-md) !important;
      }
    `,
  ],
})
export class NInputGroup {}

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

      /* Reset border radii inside input group */
      :host ::ng-deep > * {
        border-radius: 0 !important;
      }

      :host ::ng-deep > * input,
      :host ::ng-deep > * button,
      :host ::ng-deep > * .n-input-group-addon {
        border-radius: 0 !important;
        margin: 0;
      }

      /* Adjust input width and height */
      :host ::ng-deep input {
        flex: 1;
        min-width: 0;
        height: 44px;
        box-sizing: border-box;
      }

      /* Border collapse styling */
      :host ::ng-deep > *:not(:first-child) {
        border-left: 0 !important;
      }

      :host ::ng-deep > *:not(:first-child) input,
      :host ::ng-deep > *:not(:first-child) button,
      :host ::ng-deep > *:not(:first-child) .n-input-group-addon {
        border-left: 0 !important;
      }

      /* First child left borders */
      :host ::ng-deep > *:first-child,
      :host ::ng-deep > *:first-child input,
      :host ::ng-deep > *:first-child button,
      :host ::ng-deep > *:first-child .n-input-group-addon {
        border-top-left-radius: var(--n-radius-md) !important;
        border-bottom-left-radius: var(--n-radius-md) !important;
      }

      /* Last child right borders */
      :host ::ng-deep > *:last-child,
      :host ::ng-deep > *:last-child input,
      :host ::ng-deep > *:last-child button,
      :host ::ng-deep > *:last-child .n-input-group-addon {
        border-top-right-radius: var(--n-radius-md) !important;
        border-bottom-right-radius: var(--n-radius-md) !important;
      }
    `,
  ],
})
export class NInputGroup {}

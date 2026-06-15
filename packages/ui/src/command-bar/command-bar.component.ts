import { Component, input } from '@angular/core';

import type { NCommandBarAlign, NCommandBarDensity } from './command-bar.types.js';

@Component({
  selector: 'n-command-bar',
  standalone: true,
  template: `
    <div
      class="n-command-bar"
      [class.n-command-bar--compact]="density() === 'compact'"
      [class.n-command-bar--center]="align() === 'center'"
      [class.n-command-bar--end]="align() === 'end'"
      [class.n-command-bar--between]="align() === 'between'"
    >
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-command-bar {
        display: flex;
        flex-wrap: wrap;
        gap: var(--n-space-3);
        align-items: center;
        justify-content: flex-start;
        min-height: 56px;
        padding: var(--n-space-3);
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-xl);
        background: var(--n-command-bar-bg);
      }

      .n-command-bar--compact {
        min-height: 44px;
        padding: var(--n-space-2);
      }

      .n-command-bar--center {
        justify-content: center;
      }

      .n-command-bar--end {
        justify-content: flex-end;
      }

      .n-command-bar--between {
        justify-content: space-between;
      }

      :host ::ng-deep .n-command-group,
      :host ::ng-deep [nCommandGroup] {
        display: inline-flex;
        flex-wrap: wrap;
        gap: var(--n-space-2);
        align-items: center;
      }
    `,
  ],
})
export class NCommandBar {
  readonly density = input<NCommandBarDensity>('comfortable');
  readonly align = input<NCommandBarAlign>('start');
}

import { booleanAttribute, Component, input } from '@angular/core';

import type { NToolbarDensity } from './toolbar.types.js';

@Component({
  selector: 'n-toolbar',
  standalone: true,
  template: `
    <header
      class="n-toolbar"
      [class.n-toolbar--compact]="density() === 'compact'"
      [class.n-toolbar--bordered]="bordered()"
      [class.n-toolbar--sticky]="sticky()"
      role="toolbar"
    >
      <div class="n-toolbar__start">
        <ng-content select="[nToolbarStart]" />
      </div>
      <div class="n-toolbar__center">
        <ng-content select="[nToolbarCenter]" />
      </div>
      <div class="n-toolbar__end">
        <ng-content select="[nToolbarEnd]" />
      </div>
      <ng-content />
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-toolbar {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        gap: var(--n-space-4);
        align-items: center;
        min-height: 52px;
        padding: 0 var(--n-space-5) 0 var(--n-space-6);
        background: var(--n-toolbar-bg);
        backdrop-filter: blur(20px);
      }

      .n-toolbar--compact {
        min-height: 48px;
      }

      .n-toolbar--bordered {
        border-bottom: 1px solid var(--n-toolbar-border);
      }

      .n-toolbar--sticky {
        position: sticky;
        top: var(--n-space-3);
        z-index: var(--n-z-sticky);
      }

      .n-toolbar__start,
      .n-toolbar__center,
      .n-toolbar__end {
        display: flex;
        align-items: center;
        gap: var(--n-space-3);
        min-width: 0;
      }

      .n-toolbar__center {
        justify-content: center;
      }

      .n-toolbar__end {
        justify-content: flex-end;
      }

      @media (max-width: 700px) {
        .n-toolbar {
          grid-template-columns: 1fr;
          align-items: stretch;
          height: auto;
          padding: var(--n-space-3);
        }

        .n-toolbar__center,
        .n-toolbar__end {
          justify-content: flex-start;
        }
      }
    `,
  ],
})
export class NToolbar {
  readonly density = input<NToolbarDensity>('comfortable');
  readonly bordered = input(true, { transform: booleanAttribute });
  readonly sticky = input(false, { transform: booleanAttribute });
}

import { Component, input } from '@angular/core';

import type { NShellSidebarMode, NShellVariant } from './shell.types.js';

@Component({
  selector: 'n-shell',
  standalone: true,
  template: `
    <div
      class="n-shell"
      [class.n-shell--compact]="variant() === 'compact'"
      [class.n-shell--fixed]="sidebarMode() === 'fixed'"
      [class.n-shell--inline]="sidebarMode() === 'inline'"
      [class.n-shell--none]="sidebarMode() === 'none'"
      [style.--n-shell-content-max-width]="contentMaxWidth()"
    >
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .n-shell {
        display: grid;
        grid-template-columns: minmax(220px, var(--n-sidebar-width-md)) minmax(0, 1fr);
        min-height: 680px;
        overflow: hidden;
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-2xl);
        background: var(--n-shell-bg);
        color: var(--n-text-1);
        box-shadow: var(--n-elevation-3);
      }

      .n-shell--compact {
        grid-template-columns: minmax(180px, var(--n-sidebar-width-sm)) minmax(0, 1fr);
      }

      .n-shell--inline,
      .n-shell--none {
        grid-template-columns: minmax(0, 1fr);
      }

      :host ::ng-deep [nShellContent],
      :host ::ng-deep [shell-content] {
        display: grid;
        align-content: start;
        gap: var(--n-space-5);
        min-width: 0;
        width: 100%;
        max-width: var(--n-shell-content-max-width, none);
        padding: var(--n-space-5);
      }

      @media (max-width: 860px) {
        .n-shell {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class NShell {
  readonly variant = input<NShellVariant>('default');
  readonly sidebarMode = input<NShellSidebarMode>('fixed');
  readonly contentMaxWidth = input('none');
}

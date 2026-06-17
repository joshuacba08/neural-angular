import { Component, ContentChildren, input, QueryList, signal } from '@angular/core';

import { NCommandPaletteItem } from './command-palette-item.component.js';

@Component({
  selector: 'n-command-palette-group',
  standalone: true,
  template: `
    @if (visible()) {
      <div class="cmd-group">
        <div class="cmd-group__header">{{ label() }}</div>
        <div class="cmd-group__content">
          <ng-content />
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .cmd-group__header {
        padding: 9px 10px 3px;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--n-text-4);
      }

      :host-context(:first-of-type) .cmd-group__header {
        padding: 6px 10px 3px;
      }

      .cmd-group__content {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
    `,
  ],
})
export class NCommandPaletteGroup {
  readonly label = input.required<string>();
  readonly visible = signal(true);

  @ContentChildren(NCommandPaletteItem) items!: QueryList<NCommandPaletteItem>;
}

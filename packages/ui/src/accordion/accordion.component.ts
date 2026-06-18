import {
  booleanAttribute,
  Component,
  ContentChildren,
  input,
  QueryList,
} from '@angular/core';

import { NAccordionTab } from './accordion-tab.component.js';

@Component({
  selector: 'n-accordion',
  standalone: true,
  template: `
    <div class="n-accordion">
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .n-accordion {
        width: 100%;
        overflow: hidden;
        border-radius: var(--n-radius-lg);
        border: 1px solid transparent;
        background:
          linear-gradient(var(--n-surface-1), var(--n-surface-1)) padding-box,
          var(--n-border-subtle) border-box;
      }
    `,
  ],
})
export class NAccordion {
  readonly multiple = input(false, { transform: booleanAttribute });

  @ContentChildren(NAccordionTab, { descendants: true })
  private readonly tabs!: QueryList<NAccordionTab>;

  onTabToggle(toggledTab: NAccordionTab, nextState: boolean): void {
    if (!this.multiple() && nextState) {
      // Close all other tabs
      this.tabs.forEach((tab) => {
        if (tab !== toggledTab) {
          tab.selected.set(false);
        }
      });
    }
    toggledTab.selected.set(nextState);
  }
}

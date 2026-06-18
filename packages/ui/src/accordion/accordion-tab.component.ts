import {
  booleanAttribute,
  Component,
  computed,
  inject,
  input,
  model,
} from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import { NAccordion } from './accordion.component.js';

@Component({
  selector: 'n-accordion-tab',
  standalone: true,
  imports: [NIcon],
  template: `
    <div
      class="n-accordion-tab"
      [class.n-accordion-tab--active]="selected()"
      [class.n-accordion-tab--disabled]="disabled()"
    >
      <div
        class="n-accordion-tab__header"
        role="button"
        [attr.aria-expanded]="selected()"
        [attr.aria-disabled]="disabled()"
        (click)="toggle()"
      >
        <div class="n-accordion-tab__header-content">
          @if (icon()) {
            <n-icon [name]="icon()!" size="sm" class="n-accordion-tab__header-icon-prefix" />
          }
          <span class="n-accordion-tab__header-title">{{ header() }}</span>
        </div>
        <span class="n-accordion-tab__header-chevron">
          <n-icon name="chevron-right" size="sm" />
        </span>
      </div>
      <div
        class="n-accordion-tab__content-wrapper"
        [style.maxHeight]="maxHeight()"
      >
        <div class="n-accordion-tab__content">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .n-accordion-tab {
        border-bottom: 1px solid var(--n-border-0);
      }

      :host:last-child .n-accordion-tab,
      .n-accordion-tab:last-child {
        border-bottom: none;
      }

      .n-accordion-tab__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 11px 14px;
        cursor: pointer;
        user-select: none;
        font-size: var(--n-font-size-10, 10px);
        font-weight: var(--n-font-weight-bold, 700);
        letter-spacing: 0.09em;
        text-transform: uppercase;
        color: var(--n-text-3);
        transition: color var(--n-transition-fast);
      }

      .n-accordion-tab__header:hover {
        color: var(--n-text-1);
      }

      .n-accordion-tab__header-content {
        display: flex;
        align-items: center;
        gap: var(--n-space-2, 8px);
      }

      .n-accordion-tab__header-icon-prefix {
        opacity: 0.6;
      }

      .n-accordion-tab__header-chevron {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform var(--n-transition-base, 220ms);
      }

      .n-accordion-tab--active .n-accordion-tab__header-chevron {
        transform: rotate(90deg);
      }

      .n-accordion-tab__content-wrapper {
        overflow: hidden;
        transition: max-height var(--n-transition-base, 260ms) ease-in-out;
      }

      .n-accordion-tab__content {
        padding: 0 14px 12px;
      }

      .n-accordion-tab--disabled {
        opacity: 0.5;
      }

      .n-accordion-tab--disabled .n-accordion-tab__header {
        cursor: not-allowed;
      }
    `,
  ],
})
export class NAccordionTab {
  private readonly accordion = inject(NAccordion, { optional: true });

  readonly header = input.required<string>();
  readonly icon = input<string | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly selected = model(false);

  readonly maxHeight = computed(() => (this.selected() ? '400px' : '0px'));

  toggle(): void {
    if (this.disabled()) {
      return;
    }

    const nextState = !this.selected();
    if (this.accordion) {
      this.accordion.onTabToggle(this, nextState);
    } else {
      this.selected.set(nextState);
    }
  }
}

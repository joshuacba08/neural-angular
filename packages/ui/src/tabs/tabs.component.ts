import {
  Component,
  forwardRef,
  InjectionToken,
  booleanAttribute,
  inject,
  input,
  output,
} from '@angular/core';

import { NBadge } from '../badge/badge.component.js';
import { NIcon } from '../icon/icon.component.js';
import type { NTabsSize, NTabsVariant } from './tabs.types.js';

interface NTabsContext {
  value(): string;
  size(): NTabsSize;
  variant(): NTabsVariant;
  select(value: string): void;
}

const N_TABS_CONTEXT = new InjectionToken<NTabsContext>('N_TABS_CONTEXT');

@Component({
  selector: 'n-tabs',
  standalone: true,
  providers: [{ provide: N_TABS_CONTEXT, useExisting: forwardRef(() => NTabs) }],
  template: `
    <div
      class="n-tabs"
      [class.n-tabs--pill]="variant() === 'pill'"
      [class.n-tabs--sm]="size() === 'sm'"
      role="tablist"
    >
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: var(--n-space-1);
        border-bottom: 1px solid var(--n-border-1);
      }

      .n-tabs--pill {
        gap: var(--n-space-2);
        padding: var(--n-space-1);
        border: 1px solid var(--n-border-1);
        border-radius: var(--n-radius-full);
        background: color-mix(in srgb, var(--n-surface-2) 84%, transparent);
      }
    `,
  ],
})
export class NTabs implements NTabsContext {
  readonly value = input('');
  readonly variant = input<NTabsVariant>('line');
  readonly size = input<NTabsSize>('md');
  readonly valueChange = output<string>();

  select(value: string): void {
    this.valueChange.emit(value);
  }
}

@Component({
  selector: 'n-tab-item',
  standalone: true,
  imports: [NBadge, NIcon],
  template: `
    <button
      type="button"
      class="n-tab-item"
      [class.n-tab-item--selected]="selected()"
      [class.n-tab-item--pill]="tabs?.variant() === 'pill'"
      [class.n-tab-item--sm]="tabs?.size() === 'sm'"
      role="tab"
      [disabled]="disabled()"
      [attr.aria-selected]="selected()"
      (click)="handleClick()"
    >
      @if (icon()) {
        <n-icon [name]="icon() ?? ''" size="sm" />
      }
      <span>{{ label() || value() }}</span>
      @if (badge()) {
        <n-badge size="sm" variant="primary">{{ badge() }}</n-badge>
      }
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }

      .n-tab-item {
        display: inline-flex;
        align-items: center;
        gap: var(--n-space-2);
        min-height: 40px;
        padding: 0 var(--n-space-3);
        border: 0;
        border-bottom: 2px solid transparent;
        background: transparent;
        color: var(--n-text-2);
        font: inherit;
        font-size: var(--n-font-size-14);
        font-weight: var(--n-font-weight-semibold);
        cursor: pointer;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast),
          color var(--n-transition-fast);
      }

      .n-tab-item--sm {
        min-height: 34px;
        font-size: var(--n-font-size-13);
      }

      .n-tab-item--pill {
        border: 1px solid transparent;
        border-radius: var(--n-radius-full);
      }

      .n-tab-item:hover:not(:disabled),
      .n-tab-item--selected {
        color: var(--n-text-1);
      }

      .n-tab-item--selected {
        border-color: var(--n-color-primary-bright);
      }

      .n-tab-item--pill.n-tab-item--selected {
        background: var(--n-gradient-primary-secondary);
        color: #fff;
      }

      .n-tab-item:focus-visible {
        outline: 2px solid var(--n-color-primary-bright);
        outline-offset: 2px;
      }

      .n-tab-item:disabled {
        cursor: not-allowed;
        opacity: 0.52;
      }
    `,
  ],
})
export class NTabItem {
  readonly tabs = inject(N_TABS_CONTEXT, { optional: true });

  readonly value = input.required<string>();
  readonly label = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly badge = input<string | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });

  selected(): boolean {
    return this.tabs?.value() === this.value();
  }

  handleClick(): void {
    if (!this.disabled()) {
      this.tabs?.select(this.value());
    }
  }
}

import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, input, output } from '@angular/core';

import { NBadge } from '../badge/badge.component.js';
import { NIcon } from '../icon/icon.component.js';
import type { NSidebarSize, NSidebarVariant } from './sidebar.types.js';

@Component({
  selector: 'n-sidebar',
  standalone: true,
  template: `
    <nav
      class="n-sidebar"
      [class.n-sidebar--floating]="variant() === 'floating'"
      [class.n-sidebar--sm]="size() === 'sm'"
      [class.n-sidebar--md]="size() === 'md'"
      [class.n-sidebar--lg]="size() === 'lg'"
      [class.n-sidebar--collapsed]="collapsed()"
      [attr.aria-label]="ariaLabel()"
    >
      <ng-content select="[nSidebarBrand]" />
      <div class="n-sidebar__content">
        <ng-content />
      </div>
      <ng-content select="[nSidebarFooter]" />
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .n-sidebar {
        display: grid;
        grid-template-rows: auto minmax(0, 1fr) auto;
        gap: var(--n-space-4);
        height: 100%;
        min-height: 0;
        padding: var(--n-space-4);
        border-right: 1px solid var(--n-sidebar-border);
        background: var(--n-sidebar-bg);
      }

      .n-sidebar--floating {
        margin: var(--n-space-3);
        border: 1px solid var(--n-sidebar-border);
        border-radius: var(--n-radius-xl);
        box-shadow: var(--n-elevation-2);
      }

      .n-sidebar--sm {
        width: var(--n-sidebar-width-sm);
      }

      .n-sidebar--md {
        width: var(--n-sidebar-width-md);
      }

      .n-sidebar--lg {
        width: var(--n-sidebar-width-lg);
      }

      .n-sidebar--collapsed {
        width: 76px;
      }

      .n-sidebar__content {
        display: grid;
        align-content: start;
        gap: var(--n-space-5);
        min-height: 0;
        overflow: auto;
      }

      :host ::ng-deep [nSidebarBrand],
      :host ::ng-deep [nSidebarFooter] {
        display: flex;
        align-items: center;
        gap: var(--n-space-3);
        min-width: 0;
      }

      :host ::ng-deep [nSidebarBrand] {
        padding: var(--n-space-2);
        color: var(--n-text-1);
      }

      :host ::ng-deep [nSidebarBrand] small {
        display: block;
        color: var(--n-text-2);
        font-size: var(--n-font-size-12);
      }

      :host ::ng-deep [nSidebarFooter] {
        padding: var(--n-space-2);
        border-top: 1px solid var(--n-border-1);
      }

      @media (max-width: 860px) {
        .n-sidebar {
          width: 100%;
          border-right: 0;
          border-bottom: 1px solid var(--n-sidebar-border);
        }
      }
    `,
  ],
})
export class NSidebar {
  readonly variant = input<NSidebarVariant>('default');
  readonly size = input<NSidebarSize>('md');
  readonly collapsed = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input('Main navigation');
}

@Component({
  selector: 'n-sidebar-section',
  standalone: true,
  template: `
    <section class="n-sidebar-section">
      @if (label()) {
        <p class="n-sidebar-section__label">{{ label() }}</p>
      }
      <div class="n-sidebar-section__items">
        <ng-content />
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-sidebar-section {
        display: grid;
        gap: var(--n-space-2);
      }

      .n-sidebar-section__label {
        margin: 0;
        padding: 0 var(--n-space-2);
        color: var(--n-text-3);
        font-size: var(--n-font-size-11);
        font-weight: var(--n-font-weight-bold);
        letter-spacing: 0;
        text-transform: uppercase;
      }

      .n-sidebar-section__items {
        display: grid;
        gap: var(--n-space-1);
      }
    `,
  ],
})
export class NSidebarSection {
  readonly label = input<string | undefined>(undefined);
}

@Component({
  selector: 'n-sidebar-item',
  standalone: true,
  imports: [NBadge, NIcon, NgTemplateOutlet],
  template: `
    @if (href() && !disabled()) {
      <a
        class="n-sidebar-item"
        [class.n-sidebar-item--active]="active()"
        [href]="href()"
        [attr.aria-current]="active() ? 'page' : null"
        (click)="handleClick($event)"
      >
        <ng-container [ngTemplateOutlet]="itemContent" />
      </a>
    } @else {
      <button
        type="button"
        class="n-sidebar-item"
        [class.n-sidebar-item--active]="active()"
        [disabled]="disabled()"
        [attr.aria-current]="active() ? 'page' : null"
        (click)="handleClick($event)"
      >
        <ng-container [ngTemplateOutlet]="itemContent" />
      </button>
    }

    <ng-template #itemContent>
      @if (icon()) {
        <n-icon [name]="icon() ?? ''" size="sm" />
      }
      <span class="n-sidebar-item__label">{{ label() }}</span>
      @if (badge()) {
        <n-badge size="sm" variant="primary">{{ badge() }}</n-badge>
      }
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-sidebar-item {
        display: flex;
        align-items: center;
        gap: var(--n-space-2);
        width: 100%;
        min-height: 38px;
        padding: 0 var(--n-space-3);
        border: 1px solid transparent;
        border-radius: var(--n-radius-md);
        background: transparent;
        color: var(--n-text-2);
        font: inherit;
        font-size: var(--n-font-size-14);
        font-weight: var(--n-font-weight-medium);
        text-align: left;
        text-decoration: none;
        cursor: pointer;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast),
          color var(--n-transition-fast);
      }

      .n-sidebar-item:hover:not(:disabled),
      .n-sidebar-item--active {
        border-color: var(--n-border-2);
        background: color-mix(in srgb, var(--n-color-primary) 12%, transparent);
        color: var(--n-text-1);
      }

      .n-sidebar-item:focus-visible {
        outline: 2px solid var(--n-color-primary-bright);
        outline-offset: 2px;
      }

      .n-sidebar-item:disabled {
        cursor: not-allowed;
        opacity: 0.52;
      }

      .n-sidebar-item__label {
        min-width: 0;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
})
export class NSidebarItem {
  readonly icon = input<string | undefined>(undefined);
  readonly label = input('');
  readonly badge = input<string | undefined>(undefined);
  readonly active = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly href = input<string | undefined>(undefined);
  readonly itemClick = output<void>();

  handleClick(event: Event): void {
    if (this.disabled()) {
      (event as unknown as { preventDefault?: () => void }).preventDefault?.();
      return;
    }

    this.itemClick.emit();
  }
}

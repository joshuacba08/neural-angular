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
        padding: var(--n-space-4) 0;
        border-right: 1px solid var(--n-sidebar-border);
        background: linear-gradient(180deg, #08081c 0%, var(--n-bg-base) 100%);
        position: relative;
        z-index: 0;
      }

      .n-sidebar::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 1px;
        background: linear-gradient(
          180deg,
          rgba(66, 133, 244, 0.3) 0%,
          rgba(123, 92, 246, 0.15) 50%,
          transparent 100%
        );
        content: '';
        pointer-events: none;
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
        padding: 18px 16px 14px;
        border-bottom: 1px solid var(--n-border-1);
        color: var(--n-text-1);
      }

      :host ::ng-deep [nSidebarBrand] small {
        display: block;
        color: var(--n-text-2);
        font-family: var(--n-font-mono);
        font-size: var(--n-font-size-10);
        letter-spacing: 0.06em;
      }

      :host ::ng-deep [nSidebarFooter] {
        padding: 12px 14px;
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
        padding: 11px 16px 4px;
        color: var(--n-text-3);
        font-size: var(--n-font-size-10);
        font-weight: var(--n-font-weight-bold);
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .n-sidebar-section__items {
        display: grid;
        gap: 0;
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
        position: relative;
        display: flex;
        align-items: center;
        gap: 9px;
        width: 100%;
        min-height: 36px;
        padding: 8px 16px;
        border: 0;
        border-radius: 0;
        background: transparent;
        color: var(--n-text-2);
        font: inherit;
        font-size: var(--n-font-size-13);
        font-weight: var(--n-font-weight-medium);
        text-align: left;
        text-decoration: none;
        cursor: pointer;
        transition:
          background var(--n-transition-fast),
          color var(--n-transition-fast);
      }

      .n-sidebar-item::before {
        position: absolute;
        top: 5px;
        bottom: 5px;
        left: 0;
        width: 2.5px;
        border-radius: 0 3px 3px 0;
        background: var(--n-gradient-primary-secondary);
        opacity: 0;
        transition: opacity var(--n-transition-fast);
        content: '';
      }

      .n-sidebar-item:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.025);
        color: var(--n-text-1);
      }

      .n-sidebar-item--active {
        background: linear-gradient(90deg, rgba(66, 133, 244, 0.13) 0%, transparent 100%);
        color: var(--n-color-primary-bright);
      }

      .n-sidebar-item--active::before {
        opacity: 1;
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

      .n-sidebar-item n-icon {
        opacity: 0.45;
        transition: opacity var(--n-transition-fast);
      }

      .n-sidebar-item:hover:not(:disabled) n-icon,
      .n-sidebar-item--active n-icon {
        opacity: 1;
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

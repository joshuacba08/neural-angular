import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  input,
  OnDestroy,
  output,
  QueryList,
  ViewChild,
} from '@angular/core';

import { NIcon } from '../icon/icon.component.js';
import { NCommandPaletteGroup } from './command-palette-group.component.js';
import { NCommandPaletteItem } from './command-palette-item.component.js';
import type { NCommandPaletteItemClickEvent } from './command-palette.types.js';

@Component({
  selector: 'n-command-palette',
  standalone: true,
  imports: [NIcon],
  template: `
    <div class="n-command-palette">
      <div class="n-command-palette__search">
        <n-icon name="search" size="sm" class="n-command-palette__search-icon" />
        <input
          #searchInput
          type="text"
          [placeholder]="placeholder()"
          class="n-command-palette__input"
          (input)="onSearchChange(searchInput.value)"
          (keydown)="onKeyDown($event)"
        />
        <kbd class="n-command-palette__kb">⎋ esc</kbd>
      </div>

      <div class="n-command-palette__list" #listContainer>
        <ng-content />
      </div>

      <div class="n-command-palette__footer">
        <span class="n-command-palette__footer-hint">
          <kbd class="n-command-palette__kb-sm">↑↓</kbd>navigate
        </span>
        <span class="n-command-palette__footer-hint">
          <kbd class="n-command-palette__kb-sm">↵</kbd>select
        </span>
        <span class="n-command-palette__footer-hint">
          <kbd class="n-command-palette__kb-sm">esc</kbd>close
        </span>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 500px;
        width: 100%;
        box-sizing: border-box;
      }

      .n-command-palette {
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid transparent;
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border) border-box;
        box-shadow:
          0 24px 64px rgba(0, 0, 0, 0.72),
          0 0 40px rgba(66, 133, 244, 0.1);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }

      .n-command-palette__search {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 13px 16px;
        border-bottom: 1px solid var(--n-border-0);
      }

      .n-command-palette__search-icon {
        flex-shrink: 0;
        color: var(--n-text-3);
      }

      .n-command-palette__input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        font-family: var(--n-font-body);
        font-size: 14px;
        color: var(--n-text-1);
        caret-color: var(--n-color-primary);
      }

      .n-command-palette__kb {
        font-family: var(--n-font-mono);
        font-size: 9.5px;
        padding: 2px 6px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--n-border-2);
        color: var(--n-text-3);
        white-space: nowrap;
        flex-shrink: 0;
        line-height: 1;
      }

      .n-command-palette__list {
        padding: 5px;
        max-height: 310px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .n-command-palette__footer {
        display: flex;
        gap: 12px;
        padding: 8px 14px;
        border-top: 1px solid var(--n-border-0);
      }

      .n-command-palette__footer-hint {
        font-family: var(--n-font-mono);
        font-size: 9.5px;
        color: var(--n-text-4);
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .n-command-palette__kb-sm {
        font-family: var(--n-font-mono);
        font-size: 9px;
        padding: 1px 5px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--n-border-1);
        color: var(--n-text-4);
        line-height: 1;
      }
    `,
  ],
})
export class NCommandPalette implements AfterContentInit, OnDestroy {
  readonly placeholder = input<string>('Type a command or search...');

  readonly selected = output<NCommandPaletteItemClickEvent>();
  readonly closed = output<void>();

  @ContentChildren(NCommandPaletteItem, { descendants: true }) items!: QueryList<NCommandPaletteItem>;
  @ContentChildren(NCommandPaletteGroup) groups!: QueryList<NCommandPaletteGroup>;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<any>;
  @ViewChild('listContainer', { static: true }) listContainer!: ElementRef<any>;

  private itemSubscriptions: any[] = [];

  ngAfterContentInit(): void {
    this.subscribeToItemTriggers();
    this.items.changes.subscribe(() => {
      this.subscribeToItemTriggers();
      this.resetActiveItem();
    });

    (globalThis as any).setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 50);

    this.resetActiveItem();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromItems();
  }

  onSearchChange(query: string): void {
    const q = query.toLowerCase().trim();

    this.items.forEach((item) => {
      const match =
        item.label().toLowerCase().includes(q) ||
        (item.description()?.toLowerCase().includes(q) ?? false) ||
        item.value().toLowerCase().includes(q);
      item.visible.set(match);
    });

    this.groups.forEach((group) => {
      const hasAnyVisible = group.items.some((item) => item.visible());
      group.visible.set(hasAnyVisible);
    });

    this.resetActiveItem();
  }

  onKeyDown(event: any): void {
    const visibleItems = this.getVisibleItems();
    if (visibleItems.length === 0) {
      if (event.key === 'Escape') {
        this.closed.emit();
      }
      return;
    }

    const activeIndex = visibleItems.findIndex((item) => item.active());

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (activeIndex === -1) {
          visibleItems[0].active.set(true);
        } else {
          visibleItems[activeIndex].active.set(false);
          const nextIndex = (activeIndex + 1) % visibleItems.length;
          visibleItems[nextIndex].active.set(true);
          this.scrollToItem();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (activeIndex === -1) {
          visibleItems[visibleItems.length - 1].active.set(true);
        } else {
          visibleItems[activeIndex].active.set(false);
          const prevIndex = (activeIndex - 1 + visibleItems.length) % visibleItems.length;
          visibleItems[prevIndex].active.set(true);
          this.scrollToItem();
        }
        break;

      case 'Enter':
        event.preventDefault();
        if (activeIndex !== -1) {
          visibleItems[activeIndex].triggerAction();
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.closed.emit();
        break;
    }
  }

  private getVisibleItems(): NCommandPaletteItem[] {
    return this.items ? this.items.filter((item) => item.visible()) : [];
  }

  private resetActiveItem(): void {
    const visibleItems = this.getVisibleItems();
    visibleItems.forEach((item) => item.active.set(false));
    if (visibleItems.length > 0) {
      visibleItems[0].active.set(true);
    }
  }

  private subscribeToItemTriggers(): void {
    this.unsubscribeFromItems();
    this.items.forEach((item) => {
      const sub = item.trigger.subscribe((event) => {
        this.selected.emit(event);
      });
      this.itemSubscriptions.push(sub);
    });
  }

  private unsubscribeFromItems(): void {
    this.itemSubscriptions.forEach((sub) => sub.unsubscribe());
    this.itemSubscriptions = [];
  }

  private scrollToItem(): void {
    const container = this.listContainer.nativeElement;
    const activeNode = container.querySelector('.cmd-item.on') as any;
    if (!activeNode) return;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    const elemTop = activeNode.offsetTop;
    const elemBottom = elemTop + activeNode.offsetHeight;

    if (elemTop < containerTop) {
      container.scrollTop = elemTop;
    } else if (elemBottom > containerBottom) {
      container.scrollTop = elemBottom - container.clientHeight;
    }
  }
}

import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { NIcon } from '../icon/icon.component.js';

export interface NSplitButtonItem {
  label: string;
  icon?: string;
  iconColor?: string;
  separator?: boolean;
  command?: (event?: any) => void;
}

@Component({
  selector: 'n-split-button',
  standalone: true,
  imports: [NIcon],
  template: `
    <div class="nn-split-wrap" #container>
      <!-- Main Action Button -->
      <button
        type="button"
        [class]="btnClass + ' nn-split-main'"
        (click)="onMainClick($event)"
      >
        @if (icon()) {
          <n-icon [name]="icon()!" size="sm" class="nn-split-icon" />
        }
        <span>{{ label() }}</span>
      </button>

      <!-- Dropdown Caret Trigger -->
      <button
        type="button"
        [class]="btnClass + ' nn-split-caret'"
        (click)="toggleMenu($event)"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <!-- Dropdown Overlay Menu -->
      @if (isOpen() && model().length > 0) {
        <div class="nn-split-menu open">
          @for (item of model(); track $index) {
            @if (item.separator) {
              <div class="nn-split-sep"></div>
            } @else {
              <div class="nn-split-mi" (click)="onItemClick(item, $event)">
                @if (item.icon) {
                  <n-icon
                    [name]="item.icon"
                    size="sm"
                    class="nn-split-mi-ico"
                    [style.color]="item.iconColor ?? null"
                  />
                }
                <span>{{ item.label }}</span>
              </div>
            }
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        box-sizing: border-box;
      }

      .nn-split-wrap {
        position: relative;
        display: inline-flex;
        box-sizing: border-box;
      }

      .nn-btn {
        height: 40px;
        padding: 0 16px;
        font-family: var(--n-font-body);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        border: none;
        transition: all 200ms;
        box-sizing: border-box;
        outline: none;
      }

      .nn-btn-f {
        background: var(--n-surface-3);
        border: 1px solid var(--n-border-2);
        color: var(--n-text-2);
      }

      .nn-btn-f:hover {
        background: var(--n-surface-4);
        color: var(--n-text-1);
      }

      .nn-btn-gm {
        background: var(--n-gradient-primary-secondary, linear-gradient(135deg, #4285f4 0%, #7b5cf6 100%));
        color: #fff;
        box-shadow: 0 4px 14px rgba(66, 133, 244, 0.4);
      }

      .nn-btn-gm:hover {
        opacity: 0.95;
      }

      .nn-split-main {
        border-radius: var(--n-radius-full) 0 0 var(--n-radius-full) !important;
        border-right: 1px solid rgba(255, 255, 255, 0.18) !important;
      }

      .nn-split-caret {
        height: 40px;
        width: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0 var(--n-radius-full) var(--n-radius-full) 0 !important;
        cursor: pointer;
        flex-shrink: 0;
      }

      .nn-split-menu {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        min-width: 190px;
        border-radius: var(--n-radius-md);
        padding: 4px;
        border: 1px solid transparent;
        background:
          linear-gradient(var(--n-surface-3), var(--n-surface-3)) padding-box,
          var(--n-gradient-border-subtle, var(--n-gradient-border)) border-box;
        box-shadow: var(--n-elevation-3, 0 8px 24px rgba(0, 0, 0, 0.62));
        z-index: 20;
        display: none;
        flex-direction: column;
      }

      .nn-split-menu.open {
        display: flex;
      }

      .nn-split-mi {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 8px 10px;
        border-radius: 7px;
        font-size: 12.5px;
        color: var(--n-text-2);
        cursor: pointer;
        transition: background 120ms;
      }

      .nn-split-mi:hover {
        background: rgba(255, 255, 255, 0.05);
        color: var(--n-text-1);
      }

      .nn-split-mi-ico {
        flex-shrink: 0;
      }

      .nn-split-sep {
        height: 1px;
        background: var(--n-border-0);
        margin: 3px 0;
      }

      .nn-split-icon {
        flex-shrink: 0;
      }
    `,
  ],
})
export class NSplitButton {
  private readonly elementRef = inject(ElementRef);

  readonly label = input.required<string>();
  readonly icon = input<string | undefined>(undefined);
  readonly model = input<NSplitButtonItem[]>([]);
  readonly variant = input<'primary' | 'neutral'>('neutral');

  readonly click = output<any>();
  readonly menuClick = output<NSplitButtonItem>();

  readonly isOpen = signal(false);

  get btnClass(): string {
    return this.variant() === 'primary' ? 'nn-btn nn-btn-gm' : 'nn-btn nn-btn-f';
  }

  toggleMenu(event: any): void {
    event.stopPropagation();
    this.isOpen.set(!this.isOpen());
  }

  onMainClick(event: any): void {
    this.isOpen.set(false);
    this.click.emit(event);
  }

  onItemClick(item: NSplitButtonItem, event: any): void {
    event.stopPropagation();
    this.isOpen.set(false);
    if (item.command) {
      item.command(event);
    }
    this.menuClick.emit(item);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}

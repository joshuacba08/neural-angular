import {
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  type ConnectedPosition,
} from '@angular/cdk/overlay';

import { NIcon } from '../icon/icon.component.js';

export interface NSplitButtonItem {
  label: string;
  icon?: string;
  iconColor?: string;
  separator?: boolean;
  command?: (event?: Event) => void;
}

@Component({
  selector: 'n-split-button',
  standalone: true,
  imports: [NIcon, CdkConnectedOverlay, CdkOverlayOrigin],
  template: `
    <div class="nn-split-wrap" cdkOverlayOrigin #origin="cdkOverlayOrigin">
      <button
        type="button"
        [class]="btnClass + ' nn-split-main'"
        (click)="onMainClick($event)"
      >
        @if (icon()) {
          <n-icon
            [name]="icon()!"
            size="sm"
            class="nn-split-icon"
            [strokeWidth]="2"
          />
        }
        <span>{{ label() }}</span>
      </button>

      <button
        type="button"
        [class]="btnClass + ' nn-split-caret'"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'menu'"
        (click)="toggleMenu($event)"
      >
        <n-icon
          name="chevron-down"
          class="nn-split-caret-icon"
          [strokeWidth]="2.5"
        />
      </button>

      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOpen]="isOpen()"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayHasBackdrop]="true"
        [cdkConnectedOverlayBackdropClass]="'n-overlay-transparent-backdrop'"
        [cdkConnectedOverlayPositions]="overlayPositions"
        [cdkConnectedOverlayPanelClass]="'n-split-button-overlay-panel'"
        (backdropClick)="closeMenu()"
        (detach)="closeMenu()"
      >
        @if (model().length > 0) {
          <div class="nn-split-menu" role="menu">
            @for (item of model(); track $index) {
              @if (item.separator) {
                <div class="nn-split-sep" role="separator"></div>
              } @else {
                <button
                  type="button"
                  class="nn-split-mi"
                  role="menuitem"
                  (click)="onItemClick(item, $event)"
                >
                  @if (item.icon) {
                    <n-icon
                      [name]="item.icon"
                      size="sm"
                      class="nn-split-mi-ico"
                      [strokeWidth]="2"
                      [style.color]="item.iconColor ?? null"
                    />
                  }
                  <span>{{ item.label }}</span>
                </button>
              }
            }
          </div>
        }
      </ng-template>
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
        color: inherit;
      }

      .nn-split-icon,
      .nn-split-caret-icon,
      .nn-split-mi-ico {
        width: 14px !important;
        height: 14px !important;
        min-width: 14px;
        min-height: 14px;
        flex-shrink: 0;
      }

      .nn-split-caret-icon {
        opacity: 0.95;
      }

      .nn-split-menu {
        min-width: 190px;
        border-radius: var(--n-radius-md);
        padding: 4px;
        border: 1px solid transparent;
        background:
          linear-gradient(var(--n-surface-3), var(--n-surface-3)) padding-box,
          var(--n-gradient-border-subtle, var(--n-gradient-border)) border-box;
        box-shadow: var(--n-elevation-3, 0 8px 24px rgba(0, 0, 0, 0.62));
        display: flex;
        flex-direction: column;
      }

      .nn-split-mi {
        display: flex;
        align-items: center;
        gap: 9px;
        width: 100%;
        padding: 8px 10px;
        border: 0;
        border-radius: 7px;
        background: transparent;
        font: inherit;
        font-size: 12.5px;
        color: var(--n-text-2);
        text-align: left;
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
    `,
  ],
})
export class NSplitButton {
  readonly overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 6,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -6,
    },
  ];

  readonly label = input.required<string>();
  readonly icon = input<string | undefined>(undefined);
  readonly model = input<NSplitButtonItem[]>([]);
  readonly variant = input<'primary' | 'neutral'>('neutral');

  readonly click = output<Event>();
  readonly menuClick = output<NSplitButtonItem>();

  readonly isOpen = signal(false);

  get btnClass(): string {
    return this.variant() === 'primary' ? 'nn-btn nn-btn-gm' : 'nn-btn nn-btn-f';
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  onMainClick(event: Event): void {
    this.closeMenu();
    this.click.emit(event);
  }

  onItemClick(item: NSplitButtonItem, event: Event): void {
    event.stopPropagation();
    this.closeMenu();
    item.command?.(event);
    this.menuClick.emit(item);
  }
}

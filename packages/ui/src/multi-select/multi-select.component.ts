import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';

import { NIcon } from '../icon/icon.component.js';

@Component({
  selector: 'n-multi-select',
  standalone: true,
  imports: [NIcon],
  template: `
    <div class="n-multi-select" #container>
      <div class="nn-msel-chips" (click)="toggleDropdown($event)">
        @for (item of selectedItems(); track $index) {
          <div class="nn-msel-chip" (click)="$event.stopPropagation()">
            <span>{{ getLabel(item) }}</span>
            <span class="nn-msel-chip-close" (click)="removeItem(item)">×</span>
          </div>
        }
        @if (selectedItems().length === 0) {
          <span class="nn-msel-placeholder">{{ placeholder() }}</span>
        } @else {
          <span class="nn-msel-add">+ Add</span>
        }
      </div>

      @if (isOpen() && options().length > 0) {
        <div class="nn-msel-drop">
          @for (option of options(); track $index) {
            @let isSel = isSelected(option);
            <div class="nn-msel-item" [class.on]="isSel" (click)="toggleItem(option)">
              <div class="nn-msel-check">
                @if (isSel) {
                  <span class="nn-msel-check-mark">✓</span>
                }
              </div>
              <span>{{ getLabel(option) }}</span>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        position: relative;
      }

      .n-multi-select {
        position: relative;
        width: 100%;
      }

      .nn-msel-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 8px 10px;
        background: var(--n-field-bg);
        border: 1px solid var(--n-field-border);
        border-radius: var(--n-radius-md);
        min-height: 44px;
        align-items: center;
        cursor: pointer;
        box-sizing: border-box;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast);
      }

      .nn-msel-chips:hover {
        background: var(--n-field-bg-hover);
        border-color: var(--n-field-border-hover);
      }

      .nn-msel-chip {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 2px 8px;
        border-radius: 99px;
        background: var(--n-color-primary-alpha-10, rgba(66, 133, 244, 0.1));
        border: 1px solid rgba(66, 133, 244, 0.22);
        color: var(--n-color-primary-bright);
        font-size: 11px;
        line-height: 1.2;
      }

      .nn-msel-chip-close {
        cursor: pointer;
        opacity: 0.6;
        font-size: 14px;
        line-height: 1;
        transition: opacity 120ms;
      }

      .nn-msel-chip-close:hover {
        opacity: 1;
      }

      .nn-msel-placeholder {
        font-size: 13px;
        color: var(--n-text-3);
      }

      .nn-msel-add {
        font-size: 12px;
        color: var(--n-text-3);
        cursor: pointer;
      }

      .nn-msel-drop {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background:
          linear-gradient(var(--n-surface-3), var(--n-surface-3)) padding-box,
          var(--n-gradient-border-primary, var(--n-gradient-border)) border-box;
        border: 1px solid transparent;
        border-radius: var(--n-radius-md);
        margin-top: 4px;
        overflow-y: auto;
        max-height: 250px;
        box-shadow: var(--n-elevation-3, 0 8px 24px rgba(0, 0, 0, 0.62));
        z-index: 10;
        display: flex;
        flex-direction: column;
      }

      .nn-msel-item {
        padding: 9px 14px;
        font-size: 13px;
        color: var(--n-text-2);
        cursor: pointer;
        transition: background 120ms;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .nn-msel-item:hover {
        background: rgba(255, 255, 255, 0.04);
        color: var(--n-text-1);
      }

      .nn-msel-item.on {
        background: rgba(66, 133, 244, 0.1);
        color: var(--n-color-primary-bright);
      }

      .nn-msel-check {
        width: 16px;
        height: 16px;
        border-radius: 4px;
        border: 1.5px solid var(--n-border-2);
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 150ms;
        box-sizing: border-box;
      }

      .nn-msel-item.on .nn-msel-check {
        background: var(--n-gradient-primary-secondary, linear-gradient(135deg, #4285f4 0%, #7b5cf6 100%));
        border-color: transparent;
      }

      .nn-msel-check-mark {
        font-size: 9px;
        color: #fff;
        font-weight: 700;
        line-height: 1;
      }
    `,
  ],
})
export class NMultiSelect {
  private readonly elementRef = inject(ElementRef);

  readonly placeholder = input<string>('+ Add');
  readonly options = input<any[]>([]);
  readonly field = input<string | undefined>(undefined);

  readonly value = model<any[]>([]);
  readonly select = output<any[]>();

  readonly isOpen = signal(false);

  selectedItems(): any[] {
    return this.value() || [];
  }

  toggleDropdown(event: Event): void {
    this.isOpen.set(!this.isOpen());
  }

  toggleItem(option: any): void {
    const current = [...this.selectedItems()];
    const index = current.findIndex((item) => this.isEqual(item, option));

    if (index === -1) {
      current.push(option);
    } else {
      current.splice(index, 1);
    }

    this.value.set(current);
    this.select.emit(current);
  }

  removeItem(item: any): void {
    const current = [...this.selectedItems()];
    const index = current.findIndex((selected) => this.isEqual(selected, item));
    if (index !== -1) {
      current.splice(index, 1);
      this.value.set(current);
      this.select.emit(current);
    }
  }

  isSelected(option: any): boolean {
    return this.selectedItems().some((item) => this.isEqual(item, option));
  }

  getLabel(item: any): string {
    if (item && typeof item === 'object') {
      const f = this.field();
      return f ? item[f] : JSON.stringify(item);
    }
    return String(item ?? '');
  }

  private isEqual(a: any, b: any): boolean {
    if (a && typeof a === 'object' && b && typeof b === 'object') {
      const f = this.field();
      if (f) return a[f] === b[f];
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}

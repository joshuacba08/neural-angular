import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
  ViewChild,
} from '@angular/core';

import { NIcon } from '../icon/icon.component.js';

@Component({
  selector: 'n-autocomplete',
  standalone: true,
  imports: [NIcon],
  template: `
    <div class="n-autocomplete" #container>
      <div class="n-search">
        <n-icon name="search" class="n-search-ico" size="sm" />
        <input
          #inputEl
          type="text"
          [placeholder]="placeholder()"
          [value]="displayValue()"
          (input)="onInput(inputEl.value)"
          (focus)="onFocus()"
          (keydown)="onKeyDown($event)"
          class="nn-input"
        />
      </div>

      @if (isOpen() && suggestions().length > 0) {
        <div class="nn-ac-drop">
          @for (item of suggestions(); track $index) {
            <div
              class="nn-ac-item"
              [class.on]="$index === activeIndex()"
              (click)="selectItem(item)"
              (mouseenter)="activeIndex.set($index)"
            >
              <n-icon name="box" class="nn-ac-item-ico" size="sm" />
              <span>
                @let parts = getParts(getLabel(item), query());
                <span>{{ parts.prefix }}</span>
                <span class="nn-ac-hl">{{ parts.match }}</span>
                <span>{{ parts.suffix }}</span>
              </span>
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

      .n-autocomplete {
        position: relative;
        width: 100%;
      }

      .n-search {
        position: relative;
        width: 100%;
      }

      .n-search-ico {
        position: absolute;
        left: 13px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--n-text-3);
        pointer-events: none;
      }

      .nn-input {
        width: 100%;
        min-width: 0;
        border: 1px solid var(--n-field-border);
        border-radius: var(--n-radius-md);
        background: var(--n-field-bg);
        color: var(--n-text-1);
        font: inherit;
        letter-spacing: 0;
        outline: none;
        height: 44px;
        padding: 0 14px 0 38px !important;
        box-sizing: border-box;
        transition:
          background var(--n-transition-fast),
          border-color var(--n-transition-fast),
          box-shadow var(--n-transition-fast);
      }

      .nn-input:hover:not(:disabled) {
        background: var(--n-field-bg-hover);
        border-color: var(--n-field-border-hover);
      }

      .nn-input:focus-visible {
        border-color: var(--n-field-border-focus);
        box-shadow: var(--n-focus-ring);
      }

      .nn-ac-drop {
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
        overflow: hidden;
        box-shadow: var(--n-elevation-3, 0 8px 24px rgba(0, 0, 0, 0.62));
        z-index: 10;
        display: flex;
        flex-direction: column;
      }

      .nn-ac-item {
        padding: 9px 14px;
        font-size: 13px;
        color: var(--n-text-2);
        cursor: pointer;
        transition: background 120ms;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .nn-ac-item:hover,
      .nn-ac-item.on {
        background: rgba(66, 133, 244, 0.1);
        color: var(--n-text-1);
      }

      .nn-ac-item-ico {
        color: var(--n-text-3);
        flex-shrink: 0;
      }

      .nn-ac-hl {
        color: var(--n-color-primary-bright);
        font-weight: 600;
      }
    `,
  ],
})
export class NAutoComplete {
  private readonly elementRef = inject(ElementRef);

  readonly placeholder = input<string>('');
  readonly suggestions = input<any[]>([]);
  readonly field = input<string | undefined>(undefined);

  readonly value = model<any>(null);
  readonly completeMethod = output<string>();
  readonly select = output<any>();

  readonly query = signal('');
  readonly isOpen = signal(false);
  readonly activeIndex = signal(0);

  @ViewChild('inputEl') inputEl!: ElementRef<any>;

  onInput(val: string): void {
    this.query.set(val);
    this.value.set(val);
    this.activeIndex.set(0);
    this.isOpen.set(true);
    this.completeMethod.emit(val);
  }

  onFocus(): void {
    if (this.query() || this.suggestions().length > 0) {
      this.isOpen.set(true);
    }
  }

  selectItem(item: any): void {
    const label = this.getLabel(item);
    this.query.set(label);
    this.value.set(item);
    this.isOpen.set(false);
    this.select.emit(item);
  }

  displayValue(): string {
    const val = this.value();
    if (!val) return '';
    return this.getLabel(val);
  }

  getLabel(item: any): string {
    if (item && typeof item === 'object') {
      const f = this.field();
      return f ? item[f] : JSON.stringify(item);
    }
    return String(item ?? '');
  }

  getParts(label: string, query: string): { prefix: string; match: string; suffix: string } {
    if (!query) return { prefix: label, match: '', suffix: '' };
    const idx = label.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return { prefix: label, match: '', suffix: '' };
    return {
      prefix: label.substring(0, idx),
      match: label.substring(idx, idx + query.length),
      suffix: label.substring(idx + query.length),
    };
  }

  onKeyDown(event: any): void {
    if (!this.isOpen()) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.set((this.activeIndex() + 1) % this.suggestions().length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.set(
          (this.activeIndex() - 1 + this.suggestions().length) % this.suggestions().length
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (this.suggestions().length > 0) {
          this.selectItem(this.suggestions()[this.activeIndex()]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.isOpen.set(false);
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}

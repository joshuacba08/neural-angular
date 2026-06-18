import {
  Component,
  ElementRef,
  HostListener,
  input,
  numberAttribute,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'n-split-view',
  standalone: true,
  template: `
    <div
      class="n-split-view"
      [class.n-split-view--vertical]="direction() === 'vertical'"
      [class.n-split-view--horizontal]="direction() === 'horizontal'"
      #container
    >
      <div
        class="n-split-view__panel n-split-view__panel--first"
        [style.flex-basis.%]="splitSize()"
      >
        <ng-content select="[panelFirst]" />
      </div>

      <div
        class="n-split-view__gutter"
        [class.n-split-view__gutter--active]="dragging()"
        role="separator"
        [attr.aria-orientation]="direction()"
        tabindex="0"
        (mousedown)="onMouseDown($event)"
        (touchstart)="onTouchStart($event)"
      >
        <div class="n-split-view__gutter-handle"></div>
      </div>

      <div class="n-split-view__panel n-split-view__panel--second">
        <ng-content select="[panelSecond]" />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .n-split-view {
        display: flex;
        width: 100%;
        height: 100%;
        overflow: hidden;
        user-select: none;
      }

      .n-split-view--horizontal {
        flex-direction: row;
      }

      .n-split-view--vertical {
        flex-direction: column;
      }

      .n-split-view__panel {
        overflow: hidden;
        position: relative;
      }

      .n-split-view__panel--first {
        flex-shrink: 0;
      }

      .n-split-view--horizontal .n-split-view__panel--first,
      .n-split-view--horizontal .n-split-view__panel--second {
        min-width: 80px;
      }

      .n-split-view--vertical .n-split-view__panel--first,
      .n-split-view--vertical .n-split-view__panel--second {
        min-height: 80px;
      }

      .n-split-view__panel--second {
        flex: 1;
        min-width: 0;
        min-height: 0;
      }

      .n-split-view__gutter {
        flex-shrink: 0;
        background: var(--n-border-1, rgba(255, 255, 255, 0.08));
        transition: background var(--n-transition-fast, 120ms);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
      }

      .n-split-view--horizontal > .n-split-view__gutter {
        width: 4px;
        cursor: col-resize;
      }

      .n-split-view--vertical > .n-split-view__gutter {
        height: 4px;
        cursor: row-resize;
      }

      .n-split-view__gutter:hover,
      .n-split-view__gutter--active {
        background: rgba(66, 133, 244, 0.35) !important;
      }

      .n-split-view__gutter-handle {
        border-radius: 99px;
        background: rgba(255, 255, 255, 0.12);
        pointer-events: none;
      }

      .n-split-view--horizontal .n-split-view__gutter-handle {
        width: 4px;
        height: 24px;
      }

      .n-split-view--vertical .n-split-view__gutter-handle {
        width: 24px;
        height: 4px;
      }
    `,
  ],
})
export class NSplitView implements OnInit {
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly initialSize = input(50, { transform: numberAttribute });
  readonly minSize = input(15, { transform: numberAttribute });
  readonly maxSize = input(85, { transform: numberAttribute });

  readonly splitSize = signal(50);
  readonly dragging = signal(false);

  private readonly container = viewChild.required<ElementRef<HTMLElement>>('container');

  ngOnInit(): void {
    this.splitSize.set(this.initialSize());
  }

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.startDrag();
  }

  onTouchStart(event: TouchEvent): void {
    this.startDrag();
  }

  private startDrag(): void {
    this.dragging.set(true);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.dragging()) return;
    this.updateSplit(event.clientX, event.clientY);
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.dragging()) return;
    const touch = event.touches[0];
    if (touch) {
      this.updateSplit(touch.clientX, touch.clientY);
    }
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onDragEnd(): void {
    this.dragging.set(false);
  }

  private updateSplit(clientX: number, clientY: number): void {
    const containerEl = this.container().nativeElement;
    const rect = containerEl.getBoundingClientRect();

    let pct = 50;
    if (this.direction() === 'horizontal') {
      const offset = clientX - rect.left;
      pct = (offset / rect.width) * 100;
    } else {
      const offset = clientY - rect.top;
      pct = (offset / rect.height) * 100;
    }

    pct = Math.max(this.minSize(), Math.min(this.maxSize(), pct));
    this.splitSize.set(pct);
  }
}

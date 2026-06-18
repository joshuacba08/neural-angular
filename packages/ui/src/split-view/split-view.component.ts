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

      .n-split-view__gutter:hover {
        background: rgba(66, 133, 244, 0.35) !important;
      }

      .n-split-view__gutter-handle {
        border-radius: 99px;
        background: rgba(255, 255, 255, 0.12);
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
  readonly minSize = input(10, { transform: numberAttribute });
  readonly maxSize = input(90, { transform: numberAttribute });

  readonly splitSize = signal(50);
  private isDragging = false;

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
    this.isDragging = true;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.updateSplit(event.clientX, event.clientY);
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    const touch = event.touches[0];
    if (touch) {
      this.updateSplit(touch.clientX, touch.clientY);
    }
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onDragEnd(): void {
    this.isDragging = false;
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

    // Clamp value
    pct = Math.max(this.minSize(), Math.min(this.maxSize(), pct));
    this.splitSize.set(pct);
  }
}

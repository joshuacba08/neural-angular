import { Component, HostListener, input, model, output } from '@angular/core';

@Component({
  selector: 'n-knob',
  standalone: true,
  template: `
    <div class="n-knob">
      @if (label()) {
        <div class="n-knob__label">{{ label() }}</div>
      }
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        class="n-knob__svg"
        (mousedown)="onMouseDown($event)"
      >
        <defs>
          <linearGradient id="kng" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#4285F4" />
            <stop offset="100%" stop-color="#7B5CF6" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="7" />
        <circle
          cx="40"
          cy="40"
          r="30"
          fill="none"
          stroke="url(#kng)"
          stroke-width="7"
          stroke-linecap="round"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="dashOffset()"
          transform="rotate(-90 40 40)"
          class="n-knob__arc"
        />
        <text
          x="40"
          y="45"
          text-anchor="middle"
          class="n-knob__text"
        >
          {{ displayValue() }}
        </text>
      </svg>
      <div class="n-knob__hint">drag to adjust</div>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        box-sizing: border-box;
      }

      .n-knob {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
      }

      .n-knob__label {
        font-size: 9px;
        font-family: var(--n-font-mono);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--n-text-4);
        margin-bottom: 8px;
        align-self: flex-start;
      }

      .n-knob__svg {
        cursor: ew-resize;
        user-select: none;
      }

      .n-knob__arc {
        transition: stroke-dashoffset 0.1s;
      }

      .n-knob__text {
        font-family: var(--n-font-mono);
        font-size: 15px;
        font-weight: 700;
        fill: var(--n-text-1);
      }

      .n-knob__hint {
        font-family: var(--n-font-mono);
        font-size: 9.5px;
        color: var(--n-text-4);
        margin-top: 4px;
        text-transform: lowercase;
      }
    `,
  ],
})
export class NKnob {
  readonly label = input<string | undefined>(undefined);
  readonly min = input<number>(0);
  readonly max = input<number>(100);

  readonly value = model<number>(60);
  readonly change = output<number>();

  readonly circumference = 188.5; // 2 * pi * r = 2 * 3.14159 * 30
  private isDragging = false;
  private startY = 0;
  private startValue = 0;

  dashOffset(): number {
    const minVal = this.min();
    const maxVal = this.max();
    const currentVal = this.value();

    const percent = (currentVal - minVal) / (maxVal - minVal);
    const clamped = Math.max(0, Math.min(1, percent));
    return this.circumference * (1 - clamped);
  }

  displayValue(): number {
    return Math.round(this.value());
  }

  onMouseDown(event: any): void {
    this.isDragging = true;
    this.startY = event.clientY;
    this.startValue = this.value();
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: any): void {
    if (!this.isDragging) return;

    const deltaY = this.startY - event.clientY;
    // Map pixels dragged to value delta (sensitivity: 0.5 value points per pixel)
    const deltaVal = deltaY * 0.5;
    const nextVal = Math.max(this.min(), Math.min(this.max(), this.startValue + deltaVal));

    this.value.set(nextVal);
    this.change.emit(nextVal);
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isDragging = false;
  }
}

import { Component, input, model, output, signal } from '@angular/core';

import { NIcon } from '../icon/icon.component.js';

@Component({
  selector: 'n-datepicker',
  standalone: true,
  imports: [NIcon],
  template: `
    <div class="n-datepicker">
      <!-- Calendar Header -->
      <div class="n-datepicker__header">
        <button type="button" class="n-datepicker__nav-btn" (click)="prevMonth()">
          <n-icon name="chevron-left" size="sm" />
        </button>
        <span class="n-datepicker__title">{{ monthNames[currentMonth()] }} {{ currentYear() }}</span>
        <button type="button" class="n-datepicker__nav-btn" (click)="nextMonth()">
          <n-icon name="chevron-right" size="sm" />
        </button>
      </div>

      <!-- Calendar Grid -->
      <div class="n-datepicker__grid">
        <!-- Weekday Labels -->
        @for (label of weekdayLabels; track label) {
          <div class="n-datepicker__grid-label">{{ label }}</div>
        }

        <!-- Day Cells -->
        @for (cell of days(); track cell.date.getTime()) {
          @let isSel = isSelected(cell.date);
          @let isRng = isRange(cell.date);
          <div
            class="dp-day"
            [class.dp-day--muted]="!cell.isCurrentMonth"
            [class.dp-sel]="isSel"
            [class.dp-range]="isRng"
            (click)="onDayClick(cell.date)"
          >
            {{ cell.day }}
          </div>
        }
      </div>

      <!-- Action Footer -->
      <div class="n-datepicker__footer">
        <button type="button" class="nn-btn nn-btn-gm nn-btn-sm" (click)="selectToday()">
          Today
        </button>
        <button type="button" class="nn-btn nn-btn-f nn-btn-sm" (click)="applySelection()">
          Apply
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        min-width: 252px;
        box-sizing: border-box;
      }

      .n-datepicker {
        background:
          linear-gradient(var(--n-surface-2), var(--n-surface-2)) padding-box,
          var(--n-gradient-border-primary, var(--n-gradient-border)) border-box;
        border: 1px solid transparent;
        border-radius: var(--n-radius-lg);
        padding: 16px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        box-shadow: var(--n-elevation-3, 0 8px 24px rgba(0, 0, 0, 0.62));
      }

      .n-datepicker__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }

      .n-datepicker__nav-btn {
        background: transparent;
        border: none;
        color: var(--n-text-3);
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--n-radius-sm);
        transition: background var(--n-transition-fast);
      }

      .n-datepicker__nav-btn:hover {
        background: rgba(255, 255, 255, 0.06);
        color: var(--n-text-1);
      }

      .n-datepicker__title {
        font-size: 13px;
        font-weight: var(--n-font-weight-semibold, 600);
        color: var(--n-text-1);
      }

      .n-datepicker__grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        text-align: center;
        margin-bottom: 12px;
      }

      .n-datepicker__grid-label {
        font-size: 9px;
        color: var(--n-text-4);
        padding: 3px 0;
        font-family: var(--n-font-mono);
        text-transform: uppercase;
        font-weight: 700;
      }

      .dp-day {
        font-size: 11.5px;
        padding: 6px 0;
        border-radius: 5px;
        color: var(--n-text-2);
        cursor: pointer;
        transition:
          background var(--n-transition-fast),
          color var(--n-transition-fast);
        text-align: center;
        user-select: none;
      }

      .dp-day:hover {
        background: rgba(255, 255, 255, 0.07);
        color: var(--n-text-1);
      }

      .dp-day--muted {
        color: var(--n-text-4);
        opacity: 0.5;
      }

      .dp-range {
        background: rgba(66, 133, 244, 0.06);
        color: var(--n-text-2);
        border-radius: 0;
      }

      .dp-sel {
        background: var(--n-gradient-primary-secondary, var(--n-gradient-gemini));
        color: #fff !important;
        font-weight: 700;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      }

      .n-datepicker__footer {
        display: flex;
        gap: 6px;
      }

      /* Native prototype style replicas */
      .nn-btn {
        flex: 1;
        height: 32px;
        border-radius: var(--n-radius-sm, 6px);
        font-size: 11.5px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        transition: all 150ms;
        box-sizing: border-box;
      }

      .nn-btn-gm {
        background: var(--n-gradient-primary-secondary, linear-gradient(135deg, #4285f4 0%, #7b5cf6 100%));
        color: #fff;
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
    `,
  ],
})
export class NDatePicker {
  readonly selectionMode = input<'single' | 'range'>('single');

  readonly value = model<any>(null);
  readonly select = output<any>();
  readonly apply = output<any>();

  readonly currentMonth = signal<number>(new Date().getMonth());
  readonly currentYear = signal<number>(new Date().getFullYear());

  readonly weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  readonly monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  days() {
    const year = this.currentYear();
    const month = this.currentMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const result: { day: number; date: Date; isCurrentMonth: boolean }[] = [];

    // Prev month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      result.push({
        day: prevMonthTotalDays - i,
        date: new Date(year, month - 1, prevMonthTotalDays - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      result.push({
        day: i,
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month padding to keep 42 grid cells
    const remaining = 42 - result.length;
    for (let i = 1; i <= remaining; i++) {
      result.push({
        day: i,
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return result;
  }

  prevMonth(): void {
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.set(this.currentYear() - 1);
    } else {
      this.currentMonth.set(this.currentMonth() - 1);
    }
  }

  nextMonth(): void {
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.set(this.currentYear() + 1);
    } else {
      this.currentMonth.set(this.currentMonth() + 1);
    }
  }

  onDayClick(date: Date): void {
    if (this.selectionMode() === 'single') {
      const selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      this.value.set(selectedDate);
      this.select.emit(selectedDate);
    } else {
      const clicked = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const val = this.value();

      if (!val || !Array.isArray(val) || (val[0] && val[1])) {
        // Start new range selection
        this.value.set([clicked, null]);
        this.select.emit([clicked, null]);
      } else {
        const [start] = val;
        if (start && clicked < start) {
          // Reset start if clicked date is before start
          this.value.set([clicked, null]);
          this.select.emit([clicked, null]);
        } else {
          // Complete the range
          this.value.set([start, clicked]);
          this.select.emit([start, clicked]);
        }
      }
    }
  }

  isSelected(date: Date): boolean {
    const val = this.value();
    if (!val) return false;

    if (this.selectionMode() === 'range' && Array.isArray(val)) {
      const [start, end] = val;
      return (
        (start && this.isSameDate(date, start)) ||
        (end && this.isSameDate(date, end))
      );
    }

    return val instanceof Date && this.isSameDate(date, val);
  }

  isRange(date: Date): boolean {
    const val = this.value();
    if (this.selectionMode() !== 'range' || !Array.isArray(val)) return false;
    const [start, end] = val;
    if (!start || !end) return false;
    return date > start && date < end;
  }

  selectToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.currentMonth.set(today.getMonth());
    this.currentYear.set(today.getFullYear());

    if (this.selectionMode() === 'single') {
      this.value.set(today);
      this.select.emit(today);
    } else {
      this.value.set([today, null]);
      this.select.emit([today, null]);
    }
  }

  applySelection(): void {
    this.apply.emit(this.value());
  }

  private isSameDate(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
}

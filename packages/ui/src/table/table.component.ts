import { Component, input, model, output, computed, Directive, TemplateRef, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NEmptyState } from '../empty-state/empty-state.component.js';
import { NIcon } from '../icon/icon.component.js';
import type { NTableColumn, NTableDensity, NTableVariant, NTableSortEvent } from './table.types.js';

type NTableRow = Record<string, any>;

@Directive({
  selector: '[nTemplate]',
  standalone: true,
})
export class NTemplate {
  readonly name = input.required<string>({ alias: 'nTemplate' });
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'n-table',
  standalone: true,
  imports: [CommonModule, NEmptyState, NIcon],
  template: `
    <div
      class="n-table"
      [class.n-table--compact]="density() === 'compact'"
      [class.n-table--bordered]="variant() === 'bordered'"
      [class.n-table--surface]="variant() === 'surface'"
    >
      @if (data().length && columns().length) {
        <div class="n-table__scroll">
          <table>
            <thead>
              <tr>
                @if (selectionMode()) {
                  <th scope="col" style="width: 44px; padding-left: 16px;">
                    @if (selectionMode() === 'multiple') {
                      <input
                        type="checkbox"
                        class="n-table__checkbox"
                        [checked]="allSelected()"
                        (change)="toggleAllRows($event)"
                      />
                    }
                  </th>
                }
                @for (column of columns(); track column.key) {
                  <th
                    scope="col"
                    [style.width]="column.width ?? null"
                    [class.n-table__cell--center]="column.align === 'center'"
                    [class.n-table__cell--end]="column.align === 'end'"
                    [class.n-table__header--sortable]="isColumnSortable(column)"
                    (click)="onHeaderClick(column)"
                  >
                    <div class="n-table__header-content">
                      <span>{{ column.label }}</span>
                      @if (isColumnSortable(column)) {
                        <span class="n-table__sort-icon">
                          @if (sortField() === column.key) {
                            @if (sortOrder() === 'asc') {
                              <n-icon name="arrow-up" size="xs" style="width: 12px; height: 12px;" />
                            } @else {
                              <n-icon name="arrow-down" size="xs" style="width: 12px; height: 12px;" />
                            }
                          } @else {
                            <n-icon name="arrow-up-down" size="xs" style="width: 12px; height: 12px; opacity: 0.35;" />
                          }
                        </span>
                      }
                    </div>
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              @for (row of processedData(); track row[dataKey()]) {
                <tr [class.sel]="isRowSelected(row)" (click)="onRowClick(row, $event)">
                  @if (selectionMode()) {
                    <td style="padding-left: 16px; width: 44px;">
                      <input
                        type="checkbox"
                        class="n-table__checkbox"
                        [checked]="isRowSelected(row)"
                        (change)="toggleRowSelection(row, $event)"
                      />
                    </td>
                  }
                  @for (column of columns(); track column.key) {
                    <td
                      [class.n-table__cell--center]="column.align === 'center'"
                      [class.n-table__cell--end]="column.align === 'end'"
                    >
                      @if (getCellTemplate(column.key)) {
                        <ng-container *ngTemplateOutlet="getCellTemplate(column.key)!; context: { $implicit: row[column.key], row: row }"></ng-container>
                      } @else {
                        {{ cellValue(row, column) }}
                      }
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>

        @if (paginator()) {
          <div class="n-table__paginator">
            <span class="n-table__paginator-info">
              {{ first() + 1 }}–{{ lastRecordIndex() }} of {{ totalCount() }} jobs
            </span>

            <div class="nn-pag">
              <button
                class="nn-pg"
                [disabled]="first() === 0"
                (click)="prevPage()"
                aria-label="Previous page"
              >
                <n-icon name="chevron-left" size="xs" style="width: 12px; height: 12px;" />
              </button>

              @for (p of pages(); track $index) {
                @if (p === '…') {
                  <span class="n-table__paginator-ellipsis">…</span>
                } @else {
                  <button
                    class="nn-pg"
                    [class.on]="p === currentPage()"
                    (click)="goToPage(p)"
                  >
                    {{ p }}
                  </button>
                }
              }

              <button
                class="nn-pg"
                [disabled]="first() + rows() >= totalCount()"
                (click)="nextPage()"
                aria-label="Next page"
              >
                <n-icon name="chevron-right" size="xs" style="width: 12px; height: 12px;" />
              </button>
            </div>

            <select
              class="n-table__paginator-select"
              [value]="rows()"
              (change)="onRowsPerPageChange($event)"
              aria-label="Rows per page"
            >
              @for (opt of rowsPerPageOptions(); track opt) {
                <option [value]="opt">{{ opt }} / page</option>
              }
            </select>
          </div>
        }
      } @else {
        <n-empty-state
          variant="neutral"
          icon="file-text"
          [title]="emptyTitle()"
          [description]="emptyDescription()"
        />
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .n-table {
        overflow: hidden;
        min-width: 0;
        border: 1px solid var(--n-table-border, var(--n-border-1, #1e1e38));
        border-radius: var(--n-radius-xl, 14px);
        background: transparent;
      }

      .n-table--surface {
        background: var(--n-surface-2, #0f0f1c);
      }

      .n-table--bordered {
        border-color: var(--n-border-2, rgba(255, 255, 255, 0.08));
      }

      .n-table__scroll {
        overflow-x: auto;
        min-width: 0;
      }

      table {
        width: 100%;
        min-width: 560px;
        border-collapse: collapse;
      }

      th,
      td {
        padding: var(--n-space-4, 16px);
        border-bottom: 1px solid var(--n-table-border, var(--n-border-1, #1e1e38));
        color: var(--n-text-2, #8f8fbf);
        font-size: var(--n-font-size-13, 13px);
        text-align: left;
        vertical-align: middle;
        white-space: nowrap;
      }

      th {
        background: var(--n-table-header-bg, rgba(0, 0, 0, 0.2));
        color: var(--n-text-3, #7b7bb2);
        font-size: var(--n-font-size-11, 11px);
        font-weight: 700;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        user-select: none;
      }

      tbody tr {
        transition: background var(--n-transition-fast, 120ms);
        cursor: pointer;
      }

      tbody tr:hover td {
        background: var(--n-table-row-hover-bg, rgba(255, 255, 255, 0.022));
      }

      tbody tr.sel td {
        background: rgba(66, 133, 244, 0.07);
      }

      tbody tr:last-child td {
        border-bottom: 0;
      }

      .n-table--compact th,
      .n-table--compact td {
        padding: var(--n-space-3, 12px);
        font-size: var(--n-font-size-12, 12px);
      }

      .n-table__cell--center {
        text-align: center;
      }

      .n-table__cell--end {
        text-align: right;
      }

      .n-table__checkbox {
        accent-color: var(--n-color-primary-bright, #4285f4);
        cursor: pointer;
        width: 15px;
        height: 15px;
      }

      .n-table__header--sortable {
        cursor: pointer;
      }

      .n-table__header--sortable:hover {
        color: var(--n-text-1, #ffffff);
      }

      .n-table__header-content {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .n-table__sort-icon {
        display: inline-flex;
        align-items: center;
      }

      /* Paginator styling */
      .n-table__paginator {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 16px;
        border-top: 1px solid var(--n-table-border, var(--n-border-1, #1e1e38));
        background: var(--n-table-header-bg, rgba(0, 0, 0, 0.15));
        flex-wrap: wrap;
        gap: 8px;
        box-sizing: border-box;
      }

      .n-table__paginator-info {
        font-size: 12px;
        color: var(--n-text-3, #8f8fbf);
      }

      .nn-pag {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .nn-pg {
        width: 32px;
        height: 32px;
        border-radius: var(--n-radius-sm, 6px);
        background: transparent;
        border: 1px solid var(--n-border-1, #1e1e38);
        color: var(--n-text-3, #8f8fbf);
        cursor: pointer;
        font-size: 12px;
        font-family: var(--n-font-body);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 130ms;
        box-sizing: border-box;
      }

      .nn-pg:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.04);
        color: var(--n-text-2, #ffffff);
        border-color: var(--n-border-2, rgba(255, 255, 255, 0.12));
      }

      .nn-pg.on {
        background: var(--n-gradient-primary-secondary, linear-gradient(135deg, #4285f4, #7b5cf6));
        border-color: transparent;
        color: #fff;
      }

      .nn-pg:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .n-table__paginator-ellipsis {
        color: var(--n-text-4, #555577);
        font-size: 12px;
        padding: 0 2px;
      }

      .n-table__paginator-select {
        height: 32px;
        font-size: 12px;
        padding: 0 28px 0 10px;
        border-radius: var(--n-radius-sm, 6px);
        background: var(--n-surface-3, #141428);
        border: 1px solid var(--n-border-1, #1e1e38);
        color: var(--n-text-2, #ffffff);
        cursor: pointer;
        outline: none;
        appearance: none;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238F8FBF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>");
        background-repeat: no-repeat;
        background-position: right 10px center;
      }

      @media (prefers-reduced-motion: reduce) {
        tbody tr {
          transition: none;
        }
      }
    `,
  ],
})
export class NTable {
  readonly columns = input<ReadonlyArray<NTableColumn<NTableRow>>>([]);
  readonly data = input<ReadonlyArray<NTableRow>>([]);
  readonly density = input<NTableDensity>('comfortable');
  readonly variant = input<NTableVariant>('default');
  readonly emptyTitle = input('No data');
  readonly emptyDescription = input('There are no records to display.');

  // Sorting
  readonly sortable = input(false);
  readonly sortField = model<string | null>(null);
  readonly sortOrder = model<'asc' | 'desc' | null>(null);
  readonly sort = output<NTableSortEvent>();

  // Selection
  readonly selectionMode = input<'single' | 'multiple' | null>(null);
  readonly selection = model<any[] | any>(null);
  readonly dataKey = input<string>('id');

  // Paginator
  readonly paginator = input(false);
  readonly rows = model<number>(10);
  readonly first = model<number>(0);
  readonly totalRecords = input<number | null>(null);
  readonly rowsPerPageOptions = input<number[]>([10, 25, 50]);

  @ContentChildren(NTemplate) templates?: QueryList<NTemplate>;

  getCellTemplate(columnKey: string | keyof any): TemplateRef<any> | null {
    if (!this.templates) {
      return null;
    }
    const template = this.templates.find((t) => t.name() === String(columnKey));
    return template ? template.templateRef : null;
  }

  // Computed properties
  readonly totalCount = computed(() => this.totalRecords() ?? this.data().length);
  readonly pageCount = computed(() => Math.ceil(this.totalCount() / this.rows()));
  readonly currentPage = computed(() => Math.floor(this.first() / this.rows()) + 1);

  readonly lastRecordIndex = computed(() => {
    const end = this.first() + this.rows();
    const total = this.totalCount();
    return end > total ? total : end;
  });

  readonly pages = computed(() => {
    const total = this.pageCount();
    const current = this.currentPage();
    const items: (number | string)[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        items.push(i);
      }
    } else {
      if (current <= 3) {
        items.push(1, 2, 3, '…', total);
      } else if (current >= total - 2) {
        items.push(1, '…', total - 2, total - 1, total);
      } else {
        items.push(1, '…', current, '…', total);
      }
    }
    return items;
  });

  readonly processedData = computed(() => {
    let list = [...this.data()];

    // 1. Client-side sorting
    const field = this.sortField();
    const order = this.sortOrder();
    if (field && order) {
      list.sort((a, b) => {
        const valA = a[field];
        const valB = b[field];
        if (valA === valB) {
          return 0;
        }
        if (valA === null || valA === undefined) {
          return 1;
        }
        if (valB === null || valB === undefined) {
          return -1;
        }
        const comparison = String(valA).localeCompare(String(valB), undefined, {
          numeric: true,
        });
        return order === 'asc' ? comparison : -comparison;
      });
    }

    // 2. Client-side pagination
    if (this.paginator()) {
      const start = this.first();
      const count = this.rows();
      list = list.slice(start, start + count);
    }

    return list;
  });

  readonly allSelected = computed(() => {
    const list = this.data();
    if (!list.length) {
      return false;
    }
    const sel = this.selection();
    if (!Array.isArray(sel)) {
      return false;
    }
    return list.every((row) => this.isRowSelected(row));
  });

  // Cell formatting helper
  cellValue(row: NTableRow, column: NTableColumn<NTableRow>): string {
    const value = row[String(column.key)];

    if (column.format) {
      return column.format(value, row);
    }

    if (value === null || value === undefined) {
      return '';
    }

    return String(value);
  }

  // Header click handler for sorting
  onHeaderClick(column: NTableColumn<NTableRow>): void {
    if (!this.isColumnSortable(column)) {
      return;
    }

    const field = String(column.key);
    let order: 'asc' | 'desc' = 'asc';

    if (this.sortField() === field) {
      order = this.sortOrder() === 'asc' ? 'desc' : 'asc';
    }

    this.sortField.set(field);
    this.sortOrder.set(order);
    this.sort.emit({ field, order });
  }

  isColumnSortable(column: NTableColumn<NTableRow>): boolean {
    return column.sortable ?? this.sortable();
  }

  // Row click handler for toggling selection
  onRowClick(row: NTableRow, event: Event): void {
    if (!this.selectionMode()) {
      return;
    }
    this.toggleRowSelection(row, event);
  }

  // Selection helpers
  isRowSelected(row: NTableRow): boolean {
    const sel = this.selection();
    const key = this.dataKey();
    const rowKey = row[key];

    if (this.selectionMode() === 'multiple') {
      return Array.isArray(sel) ? sel.some((item) => item[key] === rowKey) : false;
    }
    return sel ? sel[key] === rowKey : false;
  }

  toggleRowSelection(row: NTableRow, event: Event): void {
    event.stopPropagation();
    const key = this.dataKey();
    const rowKey = row[key];

    if (this.selectionMode() === 'multiple') {
      const current = Array.isArray(this.selection()) ? [...(this.selection() as any[])] : [];
      const idx = current.findIndex((item) => item[key] === rowKey);
      if (idx === -1) {
        current.push(row);
      } else {
        current.splice(idx, 1);
      }
      this.selection.set(current);
    } else {
      const isSel = this.isRowSelected(row);
      this.selection.set(isSel ? null : row);
    }
  }

  toggleAllRows(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selection.set([...this.data()]);
    } else {
      this.selection.set([]);
    }
  }

  // Paginator actions
  nextPage(): void {
    const next = this.first() + this.rows();
    if (next < this.totalCount()) {
      this.first.set(next);
    }
  }

  prevPage(): void {
    const prev = this.first() - this.rows();
    if (prev >= 0) {
      this.first.set(prev);
    }
  }

  goToPage(page: number | string): void {
    const pageNum = Number(page);
    if (!isNaN(pageNum)) {
      this.first.set((pageNum - 1) * this.rows());
    }
  }

  onRowsPerPageChange(event: Event): void {
    const r = Number((event.target as HTMLSelectElement).value);
    this.rows.set(r);
    this.first.set(0);
  }
}

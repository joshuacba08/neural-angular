import { Component, input } from '@angular/core';

import { NEmptyState } from '../empty-state/empty-state.component.js';
import type { NTableColumn, NTableDensity, NTableVariant } from './table.types.js';

type NTableRow = Record<string, unknown>;

@Component({
  selector: 'n-table',
  standalone: true,
  imports: [NEmptyState],
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
                @for (column of columns(); track column.key) {
                  <th
                    scope="col"
                    [style.width]="column.width ?? null"
                    [class.n-table__cell--center]="column.align === 'center'"
                    [class.n-table__cell--end]="column.align === 'end'"
                  >
                    {{ column.label }}
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              @for (row of data(); track row) {
                <tr>
                  @for (column of columns(); track column.key) {
                    <td
                      [class.n-table__cell--center]="column.align === 'center'"
                      [class.n-table__cell--end]="column.align === 'end'"
                    >
                      {{ cellValue(row, column) }}
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
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
        border: 1px solid var(--n-table-border);
        border-radius: var(--n-radius-xl);
        background: transparent;
      }

      .n-table--surface {
        background: var(--n-surface-2);
      }

      .n-table--bordered {
        border-color: var(--n-border-2);
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
        padding: var(--n-space-4);
        border-bottom: 1px solid var(--n-table-border);
        color: var(--n-text-2);
        font-size: var(--n-font-size-14);
        text-align: left;
        vertical-align: middle;
        white-space: nowrap;
      }

      th {
        background: var(--n-table-header-bg);
        color: var(--n-text-1);
        font-size: var(--n-font-size-12);
        font-weight: var(--n-font-weight-bold);
        text-transform: uppercase;
      }

      tbody tr {
        transition: background var(--n-transition-fast);
      }

      tbody tr:hover {
        background: var(--n-table-row-hover-bg);
      }

      tbody tr:last-child td {
        border-bottom: 0;
      }

      .n-table--compact th,
      .n-table--compact td {
        padding: var(--n-space-3);
        font-size: var(--n-font-size-13);
      }

      .n-table__cell--center {
        text-align: center;
      }

      .n-table__cell--end {
        text-align: right;
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
}

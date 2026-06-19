import { Component, input, model, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGridItem, NListItem } from './data-view-item.directive.js';

@Component({
  selector: 'n-data-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="n-data-view"
      [class.n-data-view--grid]="layout() === 'grid'"
      [class.n-data-view--list]="layout() === 'list'"
    >
      @if (layout() === 'grid' && gridItemTemplate) {
        @for (item of data(); track trackByFn(item)) {
          <ng-container
            *ngTemplateOutlet="gridItemTemplate.templateRef; context: { $implicit: item }"
          ></ng-container>
        }
      } @else if (layout() === 'list' && listItemTemplate) {
        @for (item of data(); track trackByFn(item)) {
          <ng-container
            *ngTemplateOutlet="listItemTemplate.templateRef; context: { $implicit: item }"
          ></ng-container>
        }
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .n-data-view {
        width: 100%;
        box-sizing: border-box;
      }

      .n-data-view--grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
        gap: 10px;
      }

      .n-data-view--list {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      /* Card styling utilities that consumers can use inside grid/list items */
      :host ::ng-deep .n-dv-card {
        padding: 14px;
        border-radius: var(--n-radius-lg, 12px);
        border: 1px solid transparent;
        box-sizing: border-box;
        transition: transform var(--n-transition-fast, 120ms), box-shadow var(--n-transition-fast, 120ms);
      }

      :host ::ng-deep .n-dv-card--default {
        background: linear-gradient(var(--n-surface-2, #0f0f1c), var(--n-surface-2, #0f0f1c)) padding-box,
                    var(--n-gradient-border-primary, linear-gradient(135deg, #1e1e38, #2a2a4e)) border-box;
      }

      :host ::ng-deep .n-dv-card--active {
        background: linear-gradient(var(--n-surface-2, #0f0f1c), var(--n-surface-2, #0f0f1c)) padding-box,
                    var(--n-gradient-border, linear-gradient(135deg, #4285f4, #7b5cf6)) border-box;
        box-shadow: var(--n-glow-gradient-sm, 0 0 12px rgba(66, 133, 244, 0.15));
      }

      :host ::ng-deep .n-dv-card--muted {
        background: linear-gradient(var(--n-surface-2, #0f0f1c), var(--n-surface-2, #0f0f1c)) padding-box,
                    var(--n-gradient-border-primary, linear-gradient(135deg, #1e1e38, #2a2a4e)) border-box;
        opacity: 0.6;
      }

      :host ::ng-deep .n-dv-list-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border-radius: var(--n-radius-md, 8px);
        border: 1px solid transparent;
        box-sizing: border-box;
        transition: transform var(--n-transition-fast, 120ms), box-shadow var(--n-transition-fast, 120ms);
      }

      :host ::ng-deep .n-dv-list-item--default {
        background: linear-gradient(var(--n-surface-1, #0a0a14), var(--n-surface-1, #0a0a14)) padding-box,
                    var(--n-gradient-border-primary, linear-gradient(135deg, #1e1e38, #2a2a4e)) border-box;
      }

      :host ::ng-deep .n-dv-list-item--active {
        background: linear-gradient(var(--n-surface-1, #0a0a14), var(--n-surface-1, #0a0a14)) padding-box,
                    var(--n-gradient-border, linear-gradient(135deg, #4285f4, #7b5cf6)) border-box;
        box-shadow: var(--n-glow-gradient-sm, 0 0 12px rgba(66, 133, 244, 0.15));
      }

      :host ::ng-deep .n-dv-list-item--muted {
        background: linear-gradient(var(--n-surface-1, #0a0a14), var(--n-surface-1, #0a0a14)) padding-box,
                    var(--n-border-0, rgba(255, 255, 255, 0.04)) border-box;
        opacity: 0.6;
      }
    `,
  ],
})
export class NDataView {
  readonly data = input<ReadonlyArray<any>>([]);
  readonly layout = model<'grid' | 'list'>('grid');
  readonly dataKey = input<string>('id');

  @ContentChild(NGridItem) gridItemTemplate?: NGridItem;
  @ContentChild(NListItem) listItemTemplate?: NListItem;

  trackByFn(item: any): any {
    return item[this.dataKey()] ?? item;
  }
}

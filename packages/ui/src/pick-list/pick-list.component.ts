import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NIcon } from '../icon/icon.component.js';

export interface NPickListItem<T = any> {
  label: string;
  icon?: string;
  iconStyle?: string;
  data?: T;
  selected?: boolean;
}

@Component({
  selector: 'n-pick-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, NIcon],
  template: `
    <div class="nn-pick-list-wrapper" cdkDropListGroup>
      
      <!-- Source Panel -->
      <div class="nn-pl-panel">
        <div class="nn-pl-hdr" *ngIf="sourceHeader">{{ sourceHeader }}</div>
        
        <div class="nn-pl-list" 
             cdkDropList 
             [cdkDropListData]="source" 
             (cdkDropListDropped)="drop($event)"
             style="min-height: 100px;">
          
          <div *ngFor="let item of source" 
               class="nn-pl-item" 
               [class.on]="item.selected"
               (click)="toggleSelection(item)"
               cdkDrag>
            <!-- Custom Drag Preview -->
            <div class="cdk-drag-preview" *cdkDragPreview>
               <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: item }"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: item }"></ng-container>
          </div>
          
        </div>
      </div>

      <!-- Controls -->
      <div class="nn-pl-controls">
        <button
          type="button"
          class="nn-pl-btn"
          title="Move →"
          aria-label="Move selected to target"
          (click)="moveSelectedToTarget()"
        >
          <n-icon name="chevron-right" size="xs"></n-icon>
        </button>
        <button
          type="button"
          class="nn-pl-btn"
          title="Move all →"
          aria-label="Move all to target"
          (click)="moveAllToTarget()"
        >
          <n-icon name="chevrons-right" size="xs"></n-icon>
        </button>
        <button
          type="button"
          class="nn-pl-btn"
          title="← Move back"
          aria-label="Move selected to source"
          (click)="moveSelectedToSource()"
        >
          <n-icon name="chevron-left" size="xs"></n-icon>
        </button>
        <button
          type="button"
          class="nn-pl-btn"
          title="← Move all"
          aria-label="Move all to source"
          (click)="moveAllToSource()"
        >
          <n-icon name="chevrons-left" size="xs"></n-icon>
        </button>
      </div>

      <!-- Target Panel -->
      <div class="nn-pl-panel">
        <div class="nn-pl-hdr" *ngIf="targetHeader">{{ targetHeader }}</div>
        
        <div class="nn-pl-list" 
             cdkDropList 
             [cdkDropListData]="target" 
             (cdkDropListDropped)="drop($event)"
             style="min-height: 100px;">
          
          <div *ngFor="let item of target" 
               class="nn-pl-item" 
               [class.on]="item.selected"
               (click)="toggleSelection(item)"
               cdkDrag>
            <div class="cdk-drag-preview" *cdkDragPreview>
               <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: item }"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: item }"></ng-container>
          </div>
          
        </div>
      </div>
      
    </div>

    <!-- Reusable Template for Items -->
    <ng-template #itemContent let-item>
      <span *ngIf="item.icon" 
            [style]="item.iconStyle || 'color:var(--nn-t3)'"
            style="display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:12px;height:12px">
        <n-icon [name]="item.icon" 
                size="xs"
                style="width:100%;height:100%">
        </n-icon>
      </span>
      <span>{{ item.label }}</span>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .nn-pick-list-wrapper {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 10px;
      align-items: center;
      max-width: 540px;
    }
    .nn-pl-controls {
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: center;
    }
    .nn-pl-panel {
      border-radius: var(--nn-r-md, 12px);
      border: 1px solid var(--nn-b1, rgba(255,255,255,.08));
      background: var(--nn-surface-2, #141426);
      overflow: hidden;
      min-width: 160px;
    }
    .nn-pl-hdr {
      padding: 7px 12px;
      background: var(--nn-surface-3, #1c1c36);
      border-bottom: 1px solid var(--nn-b0, rgba(255,255,255,.04));
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: var(--nn-t3, rgba(255,255,255,.38));
    }
    .nn-pl-list {
      display: flex;
      flex-direction: column;
    }
    .nn-pl-item {
      padding: 8px 12px;
      font-size: 12.5px;
      color: var(--nn-t2, rgba(255,255,255,.64));
      cursor: pointer;
      transition: background 120ms;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--nn-b0, rgba(255,255,255,.04));
    }
    .nn-pl-item:last-child {
      border-bottom: none;
    }
    .nn-pl-item:hover {
      background: rgba(255,255,255,.04);
    }
    .nn-pl-item.on {
      background: rgba(66,133,244,.1);
      color: var(--nn-blue-bright, #669DF6);
    }
    .nn-pl-btn {
      width: 30px;
      height: 30px;
      border-radius: var(--nn-r-sm, 8px);
      background: var(--nn-surface-3, #1c1c36);
      border: 1px solid var(--nn-b2, rgba(255,255,255,.16));
      color: var(--nn-t2, rgba(255,255,255,.64));
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 130ms;
      padding: 0;
    }
    .nn-pl-btn:hover {
      background: var(--nn-blue-10, rgba(66,133,244,.1));
      border-color: rgba(66,133,244,.3);
      color: var(--nn-blue-bright, #669DF6);
    }
    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 6px;
      box-shadow: var(--nn-elev-3, var(--n-elevation-3));
      background: var(--nn-surface-3);
      padding: 6px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--nn-t1);
    }
    .cdk-drag-placeholder {
      opacity: 0.3;
      border: 1px dashed var(--nn-b2);
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .nn-pl-list.cdk-drop-list-dragging .nn-pl-item:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `],
})
export class NPickList<T = any> {
  @Input() source: NPickListItem<T>[] = [];
  @Input() target: NPickListItem<T>[] = [];
  
  @Input() sourceHeader = 'Available';
  @Input() targetHeader = 'Queue';

  @Output() sourceChange = new EventEmitter<NPickListItem<T>[]>();
  @Output() targetChange = new EventEmitter<NPickListItem<T>[]>();

  private cdr = inject(ChangeDetectorRef);

  toggleSelection(item: NPickListItem<T>) {
    item.selected = !item.selected;
    this.cdr.markForCheck();
  }

  moveSelectedToTarget() {
    const selected = this.source.filter(i => i.selected);
    if (selected.length === 0) return;
    
    selected.forEach(i => i.selected = false);
    
    this.source = this.source.filter(i => !selected.includes(i));
    this.target = [...this.target, ...selected];
    this.emitChanges();
  }

  moveAllToTarget() {
    this.source.forEach(i => i.selected = false);
    this.target = [...this.target, ...this.source];
    this.source = [];
    this.emitChanges();
  }

  moveSelectedToSource() {
    const selected = this.target.filter(i => i.selected);
    if (selected.length === 0) return;
    
    selected.forEach(i => i.selected = false);
    
    this.target = this.target.filter(i => !selected.includes(i));
    this.source = [...this.source, ...selected];
    this.emitChanges();
  }

  moveAllToSource() {
    this.target.forEach(i => i.selected = false);
    this.source = [...this.source, ...this.target];
    this.target = [];
    this.emitChanges();
  }

  drop(event: CdkDragDrop<NPickListItem<T>[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.emitChanges();
  }

  private emitChanges() {
    this.sourceChange.emit(this.source);
    this.targetChange.emit(this.target);
    this.cdr.markForCheck();
  }
}

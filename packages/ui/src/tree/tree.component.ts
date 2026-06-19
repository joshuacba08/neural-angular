import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NIcon } from '../icon/icon.component.js';

export interface NTreeNode<T = any> {
  label: string;
  data?: T;
  icon?: string;
  expandedIcon?: string;
  collapsedIcon?: string;
  children?: NTreeNode<T>[];
  expanded?: boolean;
}

/* ── Recursive node renderer ── */
@Component({
  selector: 'n-tree-node',
  standalone: true,
  imports: [CommonModule, NIcon],
  template: `
    <div
      class="nn-tr-row"
      [class.on]="node.expanded && hasChildren"
      [style.padding-left.px]="depth * 18 + 8"
      (click)="toggle()"
    >
      <!-- Toggle chevron (hidden on leaves) -->
      <span class="nn-tr-toggle" [class.open]="node.expanded" [class.leaf]="!hasChildren">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             width="12" height="12">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </span>

      <!-- Node icon -->
      <n-icon *ngIf="currentIcon" [name]="currentIcon" size="sm"
              style="flex-shrink:0;opacity:.55;width:13px;height:13px">
      </n-icon>

      <!-- Label -->
      <span style="font-size:13px">{{ node.label }}</span>
    </div>

    <!-- Children container with animated open/close -->
    <div class="nn-tr-kids" [class.open]="node.expanded" *ngIf="hasChildren">
      <n-tree-node
        *ngFor="let child of node.children"
        [node]="child"
        [depth]="depth + 1"
      ></n-tree-node>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NTreeNodeComponent<T = any> {
  @Input() node!: NTreeNode<T>;
  @Input() depth = 0;

  private cdr = inject(ChangeDetectorRef);

  get hasChildren(): boolean {
    return !!this.node.children && this.node.children.length > 0;
  }

  get currentIcon(): string | undefined {
    if (!this.hasChildren) return this.node.icon;
    return this.node.expanded
      ? (this.node.expandedIcon || this.node.icon)
      : (this.node.collapsedIcon || this.node.icon);
  }

  toggle(): void {
    if (this.hasChildren) {
      this.node.expanded = !this.node.expanded;
      this.cdr.markForCheck();
    }
  }
}

/* ── Root tree container ── */
@Component({
  selector: 'n-tree',
  standalone: true,
  imports: [CommonModule, NTreeNodeComponent],
  template: `
    <div class="nn-tree">
      <n-tree-node
        *ngFor="let node of data"
        [node]="node"
        [depth]="0"
      ></n-tree-node>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .nn-tree { font-size: 13px; }

    .nn-tr-row {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 8px;
      border-radius: var(--nn-r-sm, 8px);
      cursor: pointer;
      transition: background 120ms;
    }
    .nn-tr-row:hover { background: rgba(255,255,255,.04); }
    .nn-tr-row.on {
      background: rgba(66,133,244,.1);
      color: var(--nn-blue-bright, #669DF6);
    }

    .nn-tr-toggle {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 200ms;
      color: var(--nn-t4, rgba(255,255,255,.16));
    }
    .nn-tr-toggle.open {
      transform: rotate(90deg);
      color: var(--nn-t2, rgba(255,255,255,.58));
    }
    .nn-tr-toggle.leaf {
      opacity: 0;
      pointer-events: none;
    }

    .nn-tr-kids {
      overflow: hidden;
      max-height: 0;
      transition: max-height 280ms cubic-bezier(0,0,.2,1);
    }
    .nn-tr-kids.open { max-height: 600px; }
  `],
})
export class NTree<T = any> {
  @Input() data: NTreeNode<T>[] = [];
}

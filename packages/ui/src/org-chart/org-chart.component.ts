import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  forwardRef,
  numberAttribute,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NOrgChartNode {
  label: string;
  role?: string;
  styleClass?: string;
  inlineStyle?: string;
  labelStyle?: string;
  children?: NOrgChartNode[];
  layout?: 'horizontal' | 'vertical';
}

@Component({
  selector: 'n-org-chart-node',
  standalone: true,
  imports: [CommonModule, forwardRef(() => NOrgChartNodeComponent)],
  template: `
    <div class="n-org-node">
      <div
        class="nn-org-box"
        [ngClass]="node.styleClass || ''"
        [attr.style]="node.inlineStyle || null"
      >
        <div class="nn-org-name" [attr.style]="node.labelStyle || null">
          {{ node.label }}
        </div>
        @if (node.role) {
          <div class="nn-org-role">{{ node.role }}</div>
        }
      </div>

      @if (node.children?.length) {
        @if (effectiveLayout === 'horizontal') {
          <ul class="n-org-node__children n-org-node__children--horizontal">
            @for (child of node.children; track child.label) {
              <li class="n-org-node__branch">
                <n-org-chart-node [node]="child" />
              </li>
            }
          </ul>
        } @else {
          <div class="n-org-node__children n-org-node__children--vertical">
            @for (child of node.children; track child.label) {
              <div class="n-org-node__vertical-link" aria-hidden="true"></div>
              <n-org-chart-node [node]="child" />
            }
          </div>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NOrgChartNodeComponent {
  @Input() node!: NOrgChartNode;

  get effectiveLayout(): 'horizontal' | 'vertical' {
    return this.node.layout || 'horizontal';
  }
}

@Component({
  selector: 'n-org-chart',
  standalone: true,
  imports: [CommonModule, NOrgChartNodeComponent],
  template: `
    <div
      class="n-org-chart"
      [style.--n-org-box-spacing.px]="boxSpacing()"
      [style.--n-org-level-gap.px]="levelGap()"
      [style.--n-org-child-gap.px]="childGap()"
    >
      @for (node of data; track node.label) {
        <n-org-chart-node [node]="node" />
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .n-org-chart {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 480px;
      }

      .n-org-node {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .nn-org-box {
        position: relative;
        z-index: 1;
        padding: 10px 14px;
        border-radius: var(--n-radius-md, 12px);
        border: 1px solid transparent;
        background:
          linear-gradient(var(--n-surface-2, #141426), var(--n-surface-2, #141426)) padding-box,
          var(--n-gradient-border-primary, var(--nn-border-grad-b)) border-box;
        text-align: center;
        min-width: 116px;
      }

      .nn-org-name {
        font-size: 12.5px;
        font-weight: 600;
        color: var(--n-text-1, rgba(255, 255, 255, 0.92));
      }

      .nn-org-role {
        font-size: 9.5px;
        color: var(--n-text-3, rgba(255, 255, 255, 0.34));
        margin-top: 2px;
        font-family: var(--n-font-mono, 'JetBrains Mono', monospace);
      }

      /* Horizontal sibling groups */
      .n-org-node__children--horizontal {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        list-style: none;
        margin: 0;
        padding: var(--n-org-level-gap, 20px) 0 0;
        position: relative;
      }

      .n-org-node__children--horizontal::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 1.5px;
        height: var(--n-org-level-gap, 20px);
        background: var(--n-border-2, rgba(255, 255, 255, 0.12));
        transform: translateX(-50%);
      }

      .n-org-node__branch {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding: var(--n-org-level-gap, 20px) 0 0;
        padding-inline: var(--n-org-box-spacing, 22px);
      }

      .n-org-node__branch::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 1.5px;
        height: calc(var(--n-org-level-gap, 20px) + 1px);
        background: var(--n-border-2, rgba(255, 255, 255, 0.12));
        transform: translateX(-50%);
        z-index: 1;
      }

      .n-org-node__branch::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1.5px;
        background: var(--n-border-1, rgba(255, 255, 255, 0.07));
        z-index: 0;
      }

      .n-org-node__branch:first-child::after {
        left: 50%;
        right: 0;
      }

      .n-org-node__branch:last-child::after {
        left: 0;
        right: 50%;
      }

      .n-org-node__branch:only-child::after {
        display: none;
      }

      /* Vertical child chains */
      .n-org-node__children--vertical {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .n-org-node__vertical-link {
        width: 1.5px;
        height: var(--n-org-child-gap, 18px);
        background: var(--n-border-1, rgba(255, 255, 255, 0.07));
        flex-shrink: 0;
      }
    `,
  ],
})
export class NOrgChart {
  @Input() data: NOrgChartNode[] = [];

  readonly boxSpacing = input(22, { transform: numberAttribute });
  readonly levelGap = input(20, { transform: numberAttribute });
  readonly childGap = input(18, { transform: numberAttribute });
}

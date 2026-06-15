import {
  AfterContentChecked,
  AfterContentInit,
  booleanAttribute,
  Component,
  ContentChildren,
  QueryList,
  input,
} from '@angular/core';

import type { NAIPipelineStep as NAIPipelineStepModel } from '../ai/ai.types.js';
import { NAIPipelineStep } from './ai-pipeline-step.component.js';
import type {
  NAIPipelineDensity,
  NAIPipelineOrientation,
} from './ai-pipeline.types.js';

@Component({
  selector: 'n-ai-pipeline',
  standalone: true,
  imports: [NAIPipelineStep],
  template: `
    <ol
      class="n-ai-pipeline"
      [class.n-ai-pipeline--vertical]="orientation() === 'vertical'"
      [class.n-ai-pipeline--horizontal]="orientation() === 'horizontal'"
      [class.n-ai-pipeline--compact]="density() === 'compact'"
    >
      @if (steps().length > 0) {
        @for (step of steps(); track step.id ?? step.title ?? $index; let isLast = $last) {
          <n-ai-pipeline-step
            [title]="step.title"
            [description]="step.description"
            [icon]="step.icon"
            [status]="step.status ?? 'pending'"
            [progress]="step.progress"
            [metadata]="step.metadata"
            [orientation]="orientation()"
            [density]="density()"
            [showProgress]="showProgress()"
            [showConnector]="!isLast"
          />
        }
      } @else {
        <ng-content />
      }
    </ol>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .n-ai-pipeline {
        display: grid;
        gap: var(--n-space-4);
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .n-ai-pipeline--compact {
        gap: var(--n-space-3);
      }

      .n-ai-pipeline--horizontal {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        align-items: start;
      }
    `,
  ],
})
export class NAIPipeline implements AfterContentInit, AfterContentChecked {
  @ContentChildren(NAIPipelineStep)
  private readonly projectedSteps?: QueryList<NAIPipelineStep>;

  readonly steps = input<readonly NAIPipelineStepModel[]>([]);
  readonly orientation = input<NAIPipelineOrientation>('vertical');
  readonly density = input<NAIPipelineDensity>('comfortable');
  readonly showProgress = input(true, { transform: booleanAttribute });

  ngAfterContentInit(): void {
    this.syncProjectedSteps();
  }

  ngAfterContentChecked(): void {
    this.syncProjectedSteps();
  }

  private syncProjectedSteps(): void {
    const steps = this.projectedSteps?.toArray() ?? [];

    steps.forEach((step, index) => {
      step.applyPipelineContext({
        orientation: this.orientation(),
        density: this.density(),
        showProgress: this.showProgress(),
        showConnector: index < steps.length - 1,
      });
    });
  }
}

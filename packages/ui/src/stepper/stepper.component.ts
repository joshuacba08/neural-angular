import { Component, computed, contentChildren, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { NIcon } from '../icon/icon.component.js';
import { NStep } from './step.component.js';

@Component({
  selector: 'n-stepper',
  standalone: true,
  imports: [NIcon, NgTemplateOutlet],
  template: `
    <div class="n-stepper">
      <div class="n-stepper__header" role="tablist">
        @for (step of steps(); track $index; let last = $last) {
          <div
            class="n-stepper__step"
            [class.n-stepper__step--completed]="$index < activeStep()"
            [class.n-stepper__step--active]="$index === activeStep()"
            [class.n-stepper__step--upcoming]="$index > activeStep()"
            role="tab"
            [attr.aria-selected]="$index === activeStep()"
          >
            <div class="n-stepper__circle">
              @if ($index < activeStep()) {
                <n-icon [name]="step.completedIcon()" size="sm" style="width: 14px; height: 14px;" />
              } @else if ($index === activeStep()) {
                <n-icon [name]="step.activeIcon()" size="sm" style="width: 14px; height: 14px;" />
              } @else {
                <n-icon [name]="step.icon()" size="sm" style="width: 13px; height: 13px;" />
              }
            </div>
            <span class="n-stepper__label">{{ step.label() }}</span>
          </div>

          @if (!last) {
            <div
              class="n-stepper__connector"
              [class.n-stepper__connector--completed]="$index < activeStep() - 1"
              [class.n-stepper__connector--active]="$index === activeStep() - 1"
              [class.n-stepper__connector--upcoming]="$index >= activeStep()"
            ></div>
          }
        }
      </div>

      @if (activeStepTemplate()) {
        <div class="n-stepper__content" role="tabpanel">
          <ng-container [ngTemplateOutlet]="activeStepTemplate()!" />
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .n-stepper {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .n-stepper__header {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 18px;
      }

      .n-stepper__step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        flex: 1;
        min-width: 0;
        position: relative;
        text-align: center;
      }

      .n-stepper__circle {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        box-sizing: border-box;
        transition:
          background-color var(--n-transition-medium, 250ms),
          border-color var(--n-transition-medium, 250ms),
          box-shadow var(--n-transition-medium, 250ms);
      }

      .n-stepper__step--completed .n-stepper__circle {
        background: var(--n-color-success, #34a853);
        color: #fff;
      }

      .n-stepper__step--active .n-stepper__circle {
        background: var(--n-progress-fill-primary);
        color: #fff;
        animation: ps-glow 1.8s ease-in-out infinite;
      }

      .n-stepper__step--upcoming .n-stepper__circle {
        border: 2px solid var(--n-border-2, rgba(255, 255, 255, 0.12));
        background: var(--n-surface-1, #0c0c16);
        color: var(--n-text-3, #8f8fbf);
      }

      .n-stepper__step--upcoming {
        opacity: 0.38;
      }

      .n-stepper__label {
        font-size: 10.5px;
        font-weight: 500;
        white-space: nowrap;
      }

      .n-stepper__step--completed .n-stepper__label {
        color: var(--n-color-success, #34a853);
      }

      .n-stepper__step--active .n-stepper__label {
        color: var(--n-color-primary-bright, #4285f4);
        font-weight: 600;
      }

      .n-stepper__step--upcoming .n-stepper__label {
        color: var(--n-text-3, #8f8fbf);
      }

      .n-stepper__connector {
        flex: 1;
        height: 2px;
        margin-bottom: 20px; /* Aligns with step circles */
        transition: background var(--n-transition-medium, 250ms);
      }

      .n-stepper__connector--completed {
        background: rgba(52, 168, 83, 0.5);
      }

      .n-stepper__connector--active {
        background: var(--n-progress-fill-primary);
      }

      .n-stepper__connector--upcoming {
        background: rgba(255, 255, 255, 0.07);
      }

      .n-stepper__content {
        padding: 16px 18px;
        border-radius: var(--n-radius-lg, 12px);
        border: 1px solid transparent;
        background:
          linear-gradient(var(--n-surface-2, #0f0f1c), var(--n-surface-2, #0f0f1c)) padding-box,
          var(--n-gradient-border-primary) border-box;
      }

      .n-stepper__content h4,
      .n-stepper__content .n-stepper__title {
        margin: 0 0 5px;
        font-size: 14px;
        font-weight: 600;
        color: var(--n-text-1, #ffffff);
      }

      .n-stepper__content p,
      .n-stepper__content .n-stepper__description {
        margin: 0 0 14px;
        font-size: 12.5px;
        color: var(--n-text-3, #8f8fbf);
        line-height: 1.65;
      }

      .n-stepper__actions {
        display: flex;
        gap: 8px;
      }

      @keyframes ps-glow {
        0%,
        100% {
          box-shadow: 0 0 8px rgba(66, 133, 244, 0.3);
        }
        50% {
          box-shadow: 0 0 22px rgba(66, 133, 244, 0.6);
        }
      }
    `,
  ],
})
export class NStepper {
  readonly activeStep = input(0);

  readonly steps = contentChildren(NStep);

  readonly activeStepTemplate = computed(() => {
    const stepArray = this.steps();
    const index = this.activeStep();
    return stepArray[index]?.contentTemplate ?? null;
  });
}

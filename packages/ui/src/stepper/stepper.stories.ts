import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { NStepper } from './stepper.component.js';
import { NStep } from './step.component.js';
import { NButton } from '../button/button.component.js';

const meta: Meta<NStepper> = {
  title: 'Actions & Menus/Stepper',
  component: NStepper,
  decorators: [
    moduleMetadata({
      imports: [NStepper, NStep, NButton, CommonModule],
    }),
  ],
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj<NStepper>;

export const PipelineSteps: Story = {
  name: 'Interactive Pipeline',
  render: () => ({
    template: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <n-stepper [activeStep]="currentStep">
          <n-step label="Import" icon="check">
            <div>
              <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: var(--n-text-1);">Step 1 · File Import</h4>
              <p style="margin: 0 0 16px 0; font-size: 12.5px; color: var(--n-text-3); line-height: 1.65;">
                Select video file source from system files. Video segment will be validated and queued for extraction.
              </p>
              <div style="display: flex; gap: 8px;">
                <button nButton variant="secondary" size="sm" disabled>← Back</button>
                <button nButton size="sm" (click)="next()">Next Step →</button>
              </div>
            </div>
          </n-step>

          <n-step label="Extract" icon="check">
            <div>
              <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: var(--n-text-1);">Step 2 · Frame Extraction</h4>
              <p style="margin: 0 0 16px 0; font-size: 12.5px; color: var(--n-text-3); line-height: 1.65;">
                Splitting media stream into raw uncompressed visual frame arrays. 24 fps stream target detected.
              </p>
              <div style="display: flex; gap: 8px;">
                <button nButton variant="secondary" size="sm" (click)="prev()">← Back</button>
                <button nButton size="sm" (click)="next()">Next Step →</button>
              </div>
            </div>
          </n-step>

          <n-step label="Enhance" icon="sparkles">
            <div>
              <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: var(--n-text-1);">Step 3 · AI Enhancement</h4>
              <p style="margin: 0 0 16px 0; font-size: 12.5px; color: var(--n-text-3); line-height: 1.65;">
                Real-ESRGAN x4 is processing your frames. Scales 1080p → 4K via deep learning super-resolution.
              </p>
              <div style="display: flex; gap: 8px;">
                <button nButton variant="secondary" size="sm" (click)="prev()">← Back</button>
                <button nButton size="sm" (click)="next()">Next Step →</button>
              </div>
            </div>
          </n-step>

          <n-step label="Encode" icon="film">
            <div>
              <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: var(--n-text-1);">Step 4 · Video Encoding</h4>
              <p style="margin: 0 0 16px 0; font-size: 12.5px; color: var(--n-text-3); line-height: 1.65;">
                Compiling processed frames back into target H.265 container stream. Specifying 18 Mbps bitrate.
              </p>
              <div style="display: flex; gap: 8px;">
                <button nButton variant="secondary" size="sm" (click)="prev()">← Back</button>
                <button nButton size="sm" (click)="next()">Next Step →</button>
              </div>
            </div>
          </n-step>

          <n-step label="Export" icon="download">
            <div>
              <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: var(--n-text-1);">Step 5 · Compile & Export</h4>
              <p style="margin: 0 0 16px 0; font-size: 12.5px; color: var(--n-text-3); line-height: 1.65;">
                Finalizing video file assembly. Destination folder set to local workstation downloads.
              </p>
              <div style="display: flex; gap: 8px;">
                <button nButton variant="secondary" size="sm" (click)="prev()">← Back</button>
                <button nButton variant="gemini" size="sm" (click)="finish()">Complete Output</button>
              </div>
            </div>
          </n-step>
        </n-stepper>
      </div>
    `,
    props: {
      currentStep: 2,
      next: function () {
        if (this.currentStep < 4) {
          this.currentStep++;
        }
      },
      prev: function () {
        if (this.currentStep > 0) {
          this.currentStep--;
        }
      },
      finish: function () {
        alert('Pipeline complete!');
      },
    },
  }),
};

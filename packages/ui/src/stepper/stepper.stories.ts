import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { NStepper } from './stepper.component.js';
import { NStep } from './step.component.js';
import { NButton } from '../button/button.component.js';

const pipelineEnhanceContent = `
  <h4 class="n-stepper__title">Step 3 · AI Enhancement</h4>
  <p class="n-stepper__description">
    Real-ESRGAN x4 is processing your frames. Scales 1080p → 4K via deep learning super-resolution.
  </p>
  <div class="n-stepper__actions">
    <n-button variant="secondary" size="sm">← Back</n-button>
    <n-button size="sm">Next Step →</n-button>
  </div>
`;

const meta: Meta<NStepper> = {
  title: 'Actions & Menus/Stepper',
  component: NStepper,
  decorators: [
    moduleMetadata({
      imports: [NStepper, NStep, NButton, CommonModule],
    }),
  ],
  tags: ['!autodocs'],
  argTypes: {
    activeStep: {
      description: 'Zero-based index of the active pipeline step.',
      control: { type: 'range', min: 0, max: 4, step: 1 },
      table: {
        category: 'Inputs',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
  },
  args: {
    activeStep: 2,
  },
};

export default meta;
type Story = StoryObj<NStepper>;

export const DesignSystem: Story = {
  name: 'Design System',
  render: () => ({
    template: `
      <div style="max-width:560px;margin:0 auto;padding:20px">
        <n-stepper [activeStep]="2">
          <n-step label="Import" icon="upload" completedIcon="check" activeIcon="upload" />
          <n-step label="Extract" icon="file-video" completedIcon="check" activeIcon="file-video" />
          <n-step label="Enhance" icon="sparkles" completedIcon="check" activeIcon="sparkles">
            ${pipelineEnhanceContent}
          </n-step>
          <n-step label="Encode" icon="film" completedIcon="check" activeIcon="film" />
          <n-step label="Export" icon="download" completedIcon="check" activeIcon="download" />
        </n-stepper>
      </div>
    `,
  }),
};

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:560px;margin:0 auto;padding:20px">
        <n-stepper [activeStep]="activeStep">
          <n-step label="Import" icon="upload" completedIcon="check" activeIcon="upload">
            <h4 class="n-stepper__title">Step 1 · File Import</h4>
            <p class="n-stepper__description">Select video file source from system files.</p>
          </n-step>
          <n-step label="Extract" icon="file-video" completedIcon="check" activeIcon="file-video">
            <h4 class="n-stepper__title">Step 2 · Frame Extraction</h4>
            <p class="n-stepper__description">Splitting media stream into raw uncompressed visual frame arrays.</p>
          </n-step>
          <n-step label="Enhance" icon="sparkles" completedIcon="check" activeIcon="sparkles">
            ${pipelineEnhanceContent}
          </n-step>
          <n-step label="Encode" icon="film" completedIcon="check" activeIcon="film">
            <h4 class="n-stepper__title">Step 4 · Video Encoding</h4>
            <p class="n-stepper__description">Compiling processed frames back into target H.265 container stream.</p>
          </n-step>
          <n-step label="Export" icon="download" completedIcon="check" activeIcon="download">
            <h4 class="n-stepper__title">Step 5 · Compile & Export</h4>
            <p class="n-stepper__description">Finalizing video file assembly.</p>
          </n-step>
        </n-stepper>
      </div>
    `,
  }),
};

export const PipelineSteps: Story = {
  name: 'Interactive Pipeline',
  render: () => ({
    template: `
      <div style="max-width:560px;margin:0 auto;padding:20px">
        <n-stepper [activeStep]="state.currentStep">
          <n-step label="Import" icon="upload" completedIcon="check" activeIcon="upload">
            <h4 class="n-stepper__title">Step 1 · File Import</h4>
            <p class="n-stepper__description">
              Select video file source from system files. Video segment will be validated and queued for extraction.
            </p>
            <div class="n-stepper__actions">
              <n-button variant="secondary" size="sm" [disabled]="true">← Back</n-button>
              <n-button size="sm" (click)="next()">Next Step →</n-button>
            </div>
          </n-step>

          <n-step label="Extract" icon="file-video" completedIcon="check" activeIcon="file-video">
            <h4 class="n-stepper__title">Step 2 · Frame Extraction</h4>
            <p class="n-stepper__description">
              Splitting media stream into raw uncompressed visual frame arrays. 24 fps stream target detected.
            </p>
            <div class="n-stepper__actions">
              <n-button variant="secondary" size="sm" (click)="prev()">← Back</n-button>
              <n-button size="sm" (click)="next()">Next Step →</n-button>
            </div>
          </n-step>

          <n-step label="Enhance" icon="sparkles" completedIcon="check" activeIcon="sparkles">
            ${pipelineEnhanceContent.replace(
              '<n-button variant="secondary" size="sm">← Back</n-button>',
              '<n-button variant="secondary" size="sm" (click)="prev()">← Back</n-button>',
            ).replace(
              '<n-button size="sm">Next Step →</n-button>',
              '<n-button size="sm" (click)="next()">Next Step →</n-button>',
            )}
          </n-step>

          <n-step label="Encode" icon="film" completedIcon="check" activeIcon="film">
            <h4 class="n-stepper__title">Step 4 · Video Encoding</h4>
            <p class="n-stepper__description">
              Compiling processed frames back into target H.265 container stream. Specifying 18 Mbps bitrate.
            </p>
            <div class="n-stepper__actions">
              <n-button variant="secondary" size="sm" (click)="prev()">← Back</n-button>
              <n-button size="sm" (click)="next()">Next Step →</n-button>
            </div>
          </n-step>

          <n-step label="Export" icon="download" completedIcon="check" activeIcon="download">
            <h4 class="n-stepper__title">Step 5 · Compile & Export</h4>
            <p class="n-stepper__description">
              Finalizing video file assembly. Destination folder set to local workstation downloads.
            </p>
            <div class="n-stepper__actions">
              <n-button variant="secondary" size="sm" (click)="prev()">← Back</n-button>
              <n-button variant="gemini" size="sm" (click)="finish()">Complete Output</n-button>
            </div>
          </n-step>
        </n-stepper>
      </div>
    `,
    props: {
      state: { currentStep: 2 },
      next() {
        const ctx = this as { state: { currentStep: number } };
        if (ctx.state.currentStep < 4) {
          ctx.state.currentStep++;
        }
      },
      prev() {
        const ctx = this as { state: { currentStep: number } };
        if (ctx.state.currentStep > 0) {
          ctx.state.currentStep--;
        }
      },
      finish() {
        alert('Pipeline complete!');
      },
    },
  }),
};

import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NIcon } from '../icon/icon.component.js';
import { NAlert } from './alert.component.js';

const meta: Meta<NAlert> = {
  title: 'Components/Alert',
  component: NAlert,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NAlert, NIcon],
    }),
  ],
  argTypes: {
    variant: {
      description: 'Visual style mapping to status severity and intent.',
      control: 'select',
      table: {
        category: 'Appearance',
        type: { summary: "'success' | 'warning' | 'danger' | 'info'" },
        defaultValue: { summary: 'info' },
      },
      options: ['success', 'warning', 'danger', 'info'],
    },
    title: {
      description: 'Main label text or category title.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string | undefined' },
      },
    },
    description: {
      description: 'Supporting text describing the warning, error, or notification detail.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string | undefined' },
      },
    },
    icon: {
      description: 'Override glyph name from the typed Lucide registry. Falls back to severity default.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string | undefined' },
      },
    },
    closable: {
      description: 'Shows close affordance on the right and enables close event emitter.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'info',
    title: 'Model update available',
    description: 'Real-ESRGAN v1.3 adds 12% quality improvement',
    closable: false,
  },
};

export default meta;

type Story = StoryObj<NAlert>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; width: 100%;">
        <n-alert
          [variant]="variant"
          [title]="title"
          [description]="description"
          [icon]="icon"
          [closable]="closable"
        >
          @if (variant === 'danger') {
            <button type="button">Retry</button>
          } @else if (variant === 'info') {
            <button type="button">Update</button>
          }
        </n-alert>
      </div>
    `,
  }),
};

export const Basic: Story = {
  args: {
    variant: 'info',
    title: 'Model update available',
    description: 'Real-ESRGAN v1.3 adds 12% quality improvement',
    closable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; width: 100%;">
        <n-alert
          [variant]="variant"
          [title]="title"
          [description]="description"
          [icon]="icon"
          [closable]="closable"
        />
      </div>
    `,
  }),
};

export const Severities: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 520px; width: 100%;">
        <n-alert
          variant="success"
          title="Export complete"
          description="Cinematic Short.mp4 · 4K · 8.2 GB saved to Desktop"
        />
        <n-alert
          variant="warning"
          title="GPU temperature high"
          description="RTX 4070 at 88°C — consider reducing batch size"
        />
        <n-alert
          variant="danger"
          title="Processing failed"
          description="Out of VRAM — model requires 8 GB, available 5.4 GB"
        />
        <n-alert
          variant="info"
          title="Model update available"
          description="Real-ESRGAN v1.3 adds 12% quality improvement"
        />
      </div>
    `,
  }),
};

export const WithActions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 520px; width: 100%;">
        <n-alert
          variant="danger"
          title="Processing failed"
          description="Out of VRAM — model requires 8 GB, available 5.4 GB"
        >
          <button type="button">Retry</button>
        </n-alert>
        
        <n-alert
          variant="info"
          title="Model update available"
          description="Real-ESRGAN v1.3 adds 12% quality improvement"
        >
          <button type="button">Update</button>
        </n-alert>
      </div>
    `,
  }),
};

export const Closable: Story = {
  render: () => ({
    template: `
      <div style="max-width: 520px; width: 100%;">
        <n-alert
          variant="success"
          title="Export complete"
          description="Cinematic Short.mp4 · 4K · 8.2 GB saved to Desktop"
          [closable]="true"
        />
      </div>
    `,
  }),
};

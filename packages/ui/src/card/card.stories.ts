import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NBadge } from '../badge/badge.component.js';
import { NButton } from '../button/button.component.js';
import { NIcon } from '../icon/icon.component.js';
import {
  NCard,
  NCardContent,
  NCardDescription,
  NCardFooter,
  NCardHeader,
  NCardTitle,
} from './card.component.js';

const meta: Meta<NCard> = {
  title: 'Components/Card',
  component: NCard,
  decorators: [
    moduleMetadata({
      imports: [
        NBadge,
        NButton,
        NCard,
        NCardContent,
        NCardDescription,
        NCardFooter,
        NCardHeader,
        NCardTitle,
        NIcon,
      ],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'gradient'],
    },
  },
  args: {
    variant: 'default',
    interactive: false,
  },
};

export default meta;

type Story = StoryObj<NCard>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-card [variant]="variant" [interactive]="interactive" class="n-story-card">
        <n-card-header>
          <n-card-title>Render pipeline</n-card-title>
          <n-card-description>Current state of the enhancement queue.</n-card-description>
        </n-card-header>
        <n-card-content>
          <div class="n-story-metric">
            <span>68%</span>
            <n-badge variant="success">Running</n-badge>
          </div>
        </n-card-content>
        <n-card-footer>
          <n-button size="sm">Open</n-button>
          <n-button variant="ghost" size="sm">Details</n-button>
        </n-card-footer>
      </n-card>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-grid">
        <n-card variant="default">
          <n-card-title>Default</n-card-title>
          <n-card-content>Neutral surface for common product content.</n-card-content>
        </n-card>
        <n-card variant="elevated">
          <n-card-title>Elevated</n-card-title>
          <n-card-content>Raised surface for important information.</n-card-content>
        </n-card>
        <n-card variant="outlined">
          <n-card-title>Outlined</n-card-title>
          <n-card-content>Low emphasis container for secondary content.</n-card-content>
        </n-card>
        <n-card variant="gradient">
          <n-card-title>Gradient</n-card-title>
          <n-card-content>Premium emphasis for focused states.</n-card-content>
        </n-card>
      </div>
    `,
  }),
};

export const Composition: Story = {
  render: () => ({
    template: `
      <n-card variant="gradient" interactive class="n-story-card">
        <n-card-header>
          <div class="n-story-title-row">
            <n-icon name="cpu" size="md" />
            <n-card-title>Neural worker</n-card-title>
          </div>
          <n-card-description>GPU queue, model status and export readiness.</n-card-description>
        </n-card-header>
        <n-card-content>
          <div class="n-story-list">
            <span>Model <strong>Real-ESRGAN x4</strong></span>
            <span>VRAM <strong>4.2 GB</strong></span>
            <span>Status <strong>Ready</strong></span>
          </div>
        </n-card-content>
        <n-card-footer>
          <n-button size="sm">
            <n-icon name="play" size="sm" />
            Start
          </n-button>
          <n-button variant="ghost" size="sm">Configure</n-button>
        </n-card-footer>
      </n-card>
    `,
  }),
};

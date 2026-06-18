import { type Meta, type StoryObj } from '@storybook/angular';
import { NAIPipeline } from './ai-pipeline.component';

const meta: Meta<NAIPipeline> = {
  title: 'App Patterns/AI Pipeline',
  component: NAIPipeline,
  tags: ['!autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    density: {
      control: 'select',
      options: ['comfortable', 'compact'],
    },
    showProgress: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<NAIPipeline>;

export const Default: Story = {
  args: {
    orientation: 'vertical',
    density: 'comfortable',
    showProgress: true,
    steps: [
      { title: 'Import', description: 'Source video accepted.', status: 'success' },
      { title: 'Extract', description: 'Frames and metadata prepared.', status: 'success' },
      { title: 'Enhance', description: 'AI upscaling is running on GPU.', status: 'running', progress: 62 },
      { title: 'Encode', description: 'Waiting for enhanced frames.', status: 'pending' },
      { title: 'Export', description: 'Final delivery target.', status: 'pending' },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    orientation: 'horizontal',
    density: 'compact',
  },
};

export const Playground: Story = {
  args: Default.args,
};

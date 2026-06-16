import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NBadge } from './badge.component.js';

const meta: Meta<NBadge> = {
  title: 'Components/Badge',
  component: NBadge,
  decorators: [
    moduleMetadata({
      imports: [NBadge],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    shape: {
      control: 'select',
      options: ['pill', 'square'],
    },
  },
  args: {
    variant: 'neutral',
    size: 'md',
    shape: 'pill',
    dot: false,
  },
};

export default meta;

type Story = StoryObj<NBadge>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-badge [variant]="variant" [size]="size" [shape]="shape" [dot]="dot">
        Ready
      </n-badge>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-badge variant="neutral">Neutral</n-badge>
        <n-badge variant="primary">Primary</n-badge>
        <n-badge variant="secondary">Secondary</n-badge>
        <n-badge variant="success">Success</n-badge>
        <n-badge variant="warning">Warning</n-badge>
        <n-badge variant="danger">Danger</n-badge>
        <n-badge variant="info">Info</n-badge>
      </div>
    `,
  }),
};

export const WithDot: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-badge variant="success" [dot]="true">Running</n-badge>
        <n-badge variant="warning" [dot]="true">Queued</n-badge>
        <n-badge variant="danger" [dot]="true">Failed</n-badge>
      </div>
    `,
  }),
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-badge variant="primary" shape="pill">Pill</n-badge>
        <n-badge variant="primary" shape="square">Square</n-badge>
        <n-badge variant="info" shape="square" size="sm">v22.0.1</n-badge>
      </div>
    `,
  }),
};

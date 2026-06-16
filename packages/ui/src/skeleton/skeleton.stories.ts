import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NSkeleton } from './skeleton.component.js';

const meta: Meta<NSkeleton> = {
  title: 'Components/Skeleton',
  component: NSkeleton,
  decorators: [
    moduleMetadata({
      imports: [NSkeleton],
    }),
  ],
};

export default meta;

type Story = StoryObj<NSkeleton>;

export const Playground: Story = {
  render: () => ({
    template: `
      <div style="width: min(320px, calc(100vw - 48px)); display:grid; gap:10px">
        <n-skeleton shape="text" width="55%" height="13px" />
        <n-skeleton shape="text" width="92%" />
        <n-skeleton shape="text" width="78%" />
        <n-skeleton width="100%" height="60px" radius="8px" />
      </div>
    `,
  }),
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div class="n-story-row" style="align-items:center">
        <n-skeleton width="120px" height="12px" />
        <n-skeleton shape="circle" width="34px" height="34px" />
        <n-skeleton width="80px" height="28px" radius="99px" />
      </div>
    `,
  }),
};

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

export const CompositeLayout: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; max-width: 680px; width: 100%;">
        <!-- Card 1: Text Block -->
        <div style="display:flex; flex-direction:column; gap:9px; padding:16px; background:var(--n-surface-2); border-radius:12px; border:1px solid var(--n-border-0)">
          <n-skeleton shape="text" width="55%" height="13px" />
          <n-skeleton shape="text" width="92%" />
          <n-skeleton shape="text" width="78%" />
          <n-skeleton shape="text" width="62%" />
        </div>

        <!-- Card 2: Profile + Image Block -->
        <div style="display:flex; flex-direction:column; gap:10px; padding:16px; background:var(--n-surface-2); border-radius:12px; border:1px solid var(--n-border-0)">
          <div style="display:flex; align-items:center; gap:10px">
            <n-skeleton shape="circle" width="34px" height="34px" style="flex-shrink:0" />
            <div style="flex:1; display:flex; flex-direction:column; gap:6px">
              <n-skeleton shape="text" width="68%" height="11px" />
              <n-skeleton shape="text" width="44%" />
            </div>
          </div>
          <n-skeleton width="100%" height="60px" radius="8px" />
        </div>

        <!-- Bottom: Table / List Layout -->
        <div style="padding:12px; background:var(--n-surface-2); border-radius:12px; border:1px solid var(--n-border-0); grid-column: 1 / -1; display:flex; flex-direction:column; gap:0">
          <!-- Row 1 -->
          <div style="display:grid; grid-template-columns:20px 1fr 80px 56px; gap:10px; align-items:center; padding:8px 0; border-bottom:1px solid var(--n-border-0)">
            <n-skeleton width="20px" height="18px" radius="4px" />
            <n-skeleton shape="text" width="100%" />
            <n-skeleton shape="text" width="80px" />
            <n-skeleton width="56px" height="18px" radius="99px" />
          </div>
          <!-- Row 2 -->
          <div style="display:grid; grid-template-columns:20px 1fr 80px 56px; gap:10px; align-items:center; padding:8px 0; border-bottom:1px solid var(--n-border-0)">
            <n-skeleton width="20px" height="18px" radius="4px" />
            <n-skeleton shape="text" width="60%" />
            <n-skeleton shape="text" width="80px" />
            <n-skeleton width="56px" height="18px" radius="99px" />
          </div>
          <!-- Row 3 -->
          <div style="display:grid; grid-template-columns:20px 1fr 80px 56px; gap:10px; align-items:center; padding:8px 0">
            <n-skeleton width="20px" height="18px" radius="4px" />
            <n-skeleton shape="text" width="78%" />
            <n-skeleton shape="text" width="80px" />
            <n-skeleton width="56px" height="18px" radius="99px" />
          </div>
        </div>
      </div>
    `,
  }),
};


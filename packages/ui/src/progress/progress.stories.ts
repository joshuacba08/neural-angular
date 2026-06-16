import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NProgress } from './progress.component.js';

const meta: Meta<NProgress> = {
  title: 'Components/Progress',
  component: NProgress,
  decorators: [
    moduleMetadata({
      imports: [NProgress],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
  args: {
    value: 64,
    max: 100,
    variant: 'primary',
    size: 'md',
    indeterminate: false,
    label: 'Processing',
    showValue: true,
  },
};

export default meta;

type Story = StoryObj<NProgress>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: min(420px, calc(100vw - 48px));">
        <n-progress
          [value]="value"
          [max]="max"
          [variant]="variant"
          [size]="size"
          [indeterminate]="indeterminate"
          [label]="label"
          [showValue]="showValue"
        />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-list" style="width: min(420px, calc(100vw - 48px)); gap: var(--n-space-4);">
        <n-progress [value]="72" variant="primary" label="Upload" [showValue]="true" />
        <n-progress [value]="100" variant="success" label="Complete" [showValue]="true" />
        <n-progress [value]="48" variant="warning" label="Throttled" [showValue]="true" />
        <n-progress [value]="22" variant="danger" label="Failing" [showValue]="true" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="n-story-list" style="width: min(420px, calc(100vw - 48px)); gap: var(--n-space-4);">
        <n-progress [value]="64" size="sm" />
        <n-progress [value]="64" size="md" />
        <n-progress [value]="64" size="lg" />
      </div>
    `,
  }),
};

export const Indeterminate: Story = {
  render: () => ({
    template: `
      <div style="width: min(420px, calc(100vw - 48px));">
        <n-progress [indeterminate]="true" label="Analyzing frames" />
      </div>
    `,
  }),
};

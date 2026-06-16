import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NSpinner } from './spinner.component.js';

const meta: Meta<NSpinner> = {
  title: 'Components/Spinner',
  component: NSpinner,
  decorators: [
    moduleMetadata({
      imports: [NSpinner],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'danger'],
    },
    mode: {
      control: 'select',
      options: ['ring', 'dots'],
    },
  },
  args: {
    size: 'md',
    variant: 'primary',
    mode: 'ring',
    label: 'Loading',
  },
};

export default meta;

type Story = StoryObj<NSpinner>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-spinner [size]="size" [variant]="variant" [mode]="mode" [label]="label" />
    `,
  }),
};

export const Modes: Story = {
  render: () => ({
    template: `
      <div class="n-story-row" style="align-items:flex-end">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <n-spinner mode="ring" label="Loading" />
          <span style="font-size:11px;color:var(--n-text-3)">Ring</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <n-spinner mode="dots" label="Loading" />
          <span style="font-size:11px;color:var(--n-text-3)">Dots</span>
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-spinner size="sm" label="Loading" />
        <n-spinner size="md" label="Loading" />
        <n-spinner size="lg" label="Loading" />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-spinner variant="primary" label="Loading" />
        <n-spinner variant="neutral" label="Loading" />
        <n-spinner variant="success" label="Saving" />
        <n-spinner variant="danger" label="Deleting" />
      </div>
    `,
  }),
};

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
  },
  args: {
    size: 'md',
    variant: 'primary',
    label: 'Loading',
  },
};

export default meta;

type Story = StoryObj<NSpinner>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-spinner [size]="size" [variant]="variant" [label]="label" />
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

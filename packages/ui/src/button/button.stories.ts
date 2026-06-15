import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NIcon } from '../icon/icon.component.js';
import { NButton } from './button.component.js';

const meta: Meta<NButton> = {
  title: 'Components/Button',
  component: NButton,
  decorators: [
    moduleMetadata({
      imports: [NButton, NIcon],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
};

export default meta;

type Story = StoryObj<NButton>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-button
        [variant]="variant"
        [size]="size"
        [type]="type"
        [disabled]="disabled"
        [loading]="loading"
        [fullWidth]="fullWidth"
      >
        Save changes
      </n-button>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-button variant="primary">Primary</n-button>
        <n-button variant="secondary">Secondary</n-button>
        <n-button variant="ghost">Ghost</n-button>
        <n-button variant="danger">Danger</n-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-button size="sm">Small</n-button>
        <n-button size="md">Medium</n-button>
        <n-button size="lg">Large</n-button>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-button>
          <n-icon name="sparkles" size="sm" />
          Generate
        </n-button>
        <n-button variant="ghost">
          <n-icon name="settings" size="sm" />
          Settings
        </n-button>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-button loading>Loading</n-button>
        <n-button disabled>Disabled</n-button>
        <n-button variant="danger" loading>Deleting</n-button>
      </div>
    `,
  }),
};

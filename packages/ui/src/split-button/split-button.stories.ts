import { type Meta, type StoryObj } from '@storybook/angular';

import { NSplitButton } from './split-button.component.js';

const meta: Meta<NSplitButton> = {
  title: 'Components/Split Button',
  component: NSplitButton,
  tags: ['!autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'neutral'],
    },
    label: {
      control: 'text',
    },
    icon: {
      control: 'text',
    },
    model: {
      control: 'object',
    },
  },
  args: {
    variant: 'primary',
    label: 'Save Changes',
    model: [
      { label: 'Save as Draft' },
      { label: 'Save and Publish' },
    ],
  },
};

export default meta;
type Story = StoryObj<NSplitButton>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-split-button
        [label]="label"
        [icon]="icon"
        [model]="model"
        [variant]="variant"
      />
    `,
  }),
};

export const Basic: Story = {
  args: {
    variant: 'primary',
    label: 'Save Changes',
    model: [
      { label: 'Save as Draft' },
      { label: 'Save and Publish' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <n-split-button
        [label]="label"
        [model]="model"
        [variant]="variant"
      />
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-split-button
          label="Generate"
          variant="primary"
          [model]="[
            { label: 'Generate Draft' },
            { label: 'Generate and Export' }
          ]"
        />
        <n-split-button
          label="Actions"
          variant="neutral"
          [model]="[
            { label: 'Archive' },
            { label: 'Download' }
          ]"
        />
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    label: 'Export',
    icon: 'download',
    model: [
      { label: 'Export MP4', icon: 'file-video' },
      { label: 'Export audio', icon: 'file-audio' },
      { label: 'Download assets', icon: 'archive' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <n-split-button
        [label]="label"
        [icon]="icon"
        [model]="model"
        [variant]="variant"
      />
    `,
  }),
};

export const MenuModel: Story = {
  render: () => ({
    template: `
      <n-split-button
        label="Publish"
        variant="primary"
        [model]="[
          { label: 'Publish now', icon: 'check', iconColor: 'var(--n-color-success)' },
          { label: 'Schedule release', icon: 'calendar' },
          { label: 'separator', separator: true },
          { label: 'Discard draft', icon: 'trash-2', iconColor: 'var(--n-color-danger)' }
        ]"
      />
    `,
  }),
};

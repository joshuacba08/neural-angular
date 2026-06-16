import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NIcon } from '../icon/icon.component.js';
import { NChip } from './chip.component.js';

const meta: Meta<NChip> = {
  title: 'Components/Chip',
  component: NChip,
  decorators: [
    moduleMetadata({
      imports: [NChip, NIcon],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    selected: false,
    disabled: false,
    removable: false,
  },
};

export default meta;

type Story = StoryObj<NChip>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-chip
        [variant]="variant"
        [size]="size"
        [selected]="selected"
        [disabled]="disabled"
        [removable]="removable"
      >
        Angular
      </n-chip>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-chip variant="default">Default</n-chip>
        <n-chip variant="primary">Primary</n-chip>
        <n-chip variant="secondary">Secondary</n-chip>
      </div>
    `,
  }),
};

export const Selectable: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-chip [selected]="true">Angular 22</n-chip>
        <n-chip>Signals</n-chip>
        <n-chip [selected]="true">Standalone</n-chip>
        <n-chip [disabled]="true">Zone.js</n-chip>
      </div>
    `,
  }),
};

export const Removable: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-chip variant="primary" [removable]="true">image.png</n-chip>
        <n-chip variant="primary" [removable]="true">video.mp4</n-chip>
        <n-chip [removable]="true" [disabled]="true">locked.zip</n-chip>
      </div>
    `,
  }),
};

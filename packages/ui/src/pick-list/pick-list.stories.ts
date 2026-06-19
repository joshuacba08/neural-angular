import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { NPickList } from './pick-list.component.js';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NIcon } from '../icon/icon.component.js';

const meta: Meta<NPickList> = {
  title: 'Data Display/PickList',
  component: NPickList,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NPickList, DragDropModule, NIcon],
    }),
  ],
  argTypes: {
    source: {
      control: 'object',
      description: 'Array of items available for selection.',
    },
    target: {
      control: 'object',
      description: 'Array of items that have been selected.',
    },
    sourceHeader: {
      control: 'text',
      description: 'Header text for the source panel.',
    },
    targetHeader: {
      control: 'text',
      description: 'Header text for the target panel.',
    },
  },
};

export default meta;
type Story = StoryObj<NPickList>;

export const DesignSystem: Story = {
  args: {
    sourceHeader: 'Available',
    targetHeader: 'Queue',
    source: [
      { label: 'Real-ESRGAN x4+', icon: 'box', iconStyle: 'color:var(--nn-t3)' },
      { label: 'SwinIR Classic', icon: 'box', iconStyle: 'color:var(--nn-blue-bright)', selected: true },
      { label: 'HAT-L', icon: 'box', iconStyle: 'color:var(--nn-t3)' },
      { label: 'CodeFormer', icon: 'box', iconStyle: 'color:var(--nn-t3)' },
    ],
    target: [
      { label: 'Real-ESRGAN x4', icon: 'circle-check', iconStyle: 'color:var(--nn-success)' },
      { label: 'Real-ESRGAN x2', icon: 'circle-check', iconStyle: 'color:var(--nn-success)' },
      { label: 'GFPGAN v1.3', icon: 'circle-check', iconStyle: 'color:var(--nn-success)' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px;">
        <n-pick-list
          [source]="source"
          [target]="target"
          [sourceHeader]="sourceHeader"
          [targetHeader]="targetHeader"
          (sourceChange)="source = $event"
          (targetChange)="target = $event"
        />
      </div>
    `,
  }),
};

export const Playground: Story = {
  args: {
    sourceHeader: 'Available',
    targetHeader: 'Queue',
    source: [
      { label: 'Button', icon: 'box', iconStyle: 'color:var(--nn-t3)' },
      { label: 'Card', icon: 'box', iconStyle: 'color:var(--nn-t3)' },
      { label: 'Icon', icon: 'box', iconStyle: 'color:var(--nn-t3)' },
    ],
    target: [],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px;">
        <n-pick-list
          [source]="source"
          [target]="target"
          [sourceHeader]="sourceHeader"
          [targetHeader]="targetHeader"
          (sourceChange)="source = $event"
          (targetChange)="target = $event"
        />
      </div>
    `,
  }),
};

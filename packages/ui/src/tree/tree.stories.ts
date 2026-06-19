import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NTree, NTreeNodeComponent } from './tree.component.js';
import { NIcon } from '../icon/icon.component.js';

const meta: Meta<NTree> = {
  title: 'Data Display/Tree',
  component: NTree,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NTree, NTreeNodeComponent, NIcon],
    }),
  ],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of NTreeNode objects representing the tree structure.',
    },
  },
};

export default meta;
type Story = StoryObj<NTree>;

/* ── Design System — exact replica of the spec ── */
export const DesignSystem: Story = {
  args: {
    data: [
      {
        label: 'Projects',
        icon: 'folder',
        expandedIcon: 'folder-open',
        expanded: true,
        children: [
          {
            label: 'Anime Collection',
            icon: 'folder',
            expandedIcon: 'folder-open',
            expanded: true,
            children: [
              { label: 'Episode 12.mp4', icon: 'film' },
              { label: 'Episode 13.mp4', icon: 'film' },
            ],
          },
          {
            label: 'Cinematic Shorts',
            icon: 'folder',
            expandedIcon: 'folder-open',
            expanded: true,
            children: [
              { label: 'Short_01.mp4', icon: 'film' },
            ],
          },
        ],
      },
      {
        label: 'Models',
        icon: 'box',
        expanded: true,
        children: [
          { label: 'Real-ESRGAN x4', icon: 'cpu' },
          { label: 'Real-ESRGAN x2', icon: 'cpu' },
          { label: 'GFPGAN v1.3', icon: 'user' },
        ],
      },
      {
        label: 'Export Queue',
        icon: 'download',
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:320px"><n-tree [data]="data"></n-tree></div>`,
  }),
};

/* ── Playground ── */
export const Playground: Story = {
  args: {
    data: [
      {
        label: 'Documents',
        icon: 'folder',
        expandedIcon: 'folder-open',
        expanded: true,
        children: [
          {
            label: 'Work',
            icon: 'folder',
            expandedIcon: 'folder-open',
            children: [
              { label: 'Expenses.doc', icon: 'file-text' },
            ],
          },
          {
            label: 'Home',
            icon: 'folder',
            expandedIcon: 'folder-open',
            children: [
              { label: 'Invoices.txt', icon: 'file-text' },
            ],
          },
        ],
      },
      {
        label: 'Pictures',
        icon: 'image',
        children: [
          { label: 'Vacation.jpg', icon: 'file-image' },
        ],
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:320px"><n-tree [data]="data"></n-tree></div>`,
  }),
};

import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { NBreadcrumb } from './breadcrumb.component.js';
import type { NBreadcrumbItem } from './breadcrumb.types.js';

const chevronItems: NBreadcrumbItem[] = [
  { icon: 'house' },
  { label: 'Projects' },
  { label: 'Anime Collection' },
  { label: 'Episode 12' },
];

const slashItems: NBreadcrumbItem[] = [
  { label: 'Dashboard' },
  { label: 'Queue' },
  { label: 'Processing' },
];

const dotItems: NBreadcrumbItem[] = [
  { label: 'Oroya Video' },
  { label: 'Settings' },
  { label: 'Models' },
];


const meta: Meta<NBreadcrumb> = {
  title: 'Actions & Menus/Breadcrumb',
  component: NBreadcrumb,
  decorators: [
    moduleMetadata({
      imports: [NBreadcrumb, CommonModule],
    }),
  ],
  tags: ['!autodocs'],
  argTypes: {
    separator: {
      description: 'Divider between breadcrumb segments.',
      control: 'select',
      options: ['chevron', 'slash', 'dot'],
      table: {
        category: 'Inputs',
        type: { summary: "'chevron' | 'slash' | 'dot'" },
        defaultValue: { summary: 'chevron' },
      },
    },
    activeGradient: {
      description: 'Apply blue-v gradient text to the active (last) item.',
      control: 'boolean',
      table: {
        category: 'Inputs',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    items: chevronItems,
    separator: 'chevron',
    activeGradient: false,
  },
};

export default meta;
type Story = StoryObj<NBreadcrumb>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-breadcrumb
        [items]="items"
        [separator]="separator"
        [activeGradient]="activeGradient"
      />
    `,
  }),
};

export const DesignSystem: Story = {
  name: 'Design System',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:100%">
        <n-breadcrumb
          [items]="chevronItems"
          separator="chevron"
        />
        <n-breadcrumb
          [items]="slashItems"
          separator="slash"
          [activeGradient]="true"
        />
      </div>
    `,
    props: { chevronItems, slashItems },
  }),
};

export const ChevronSeparator: Story = {
  name: 'Chevron Separator',
  args: {
    items: chevronItems,
    separator: 'chevron',
    activeGradient: false,
  },
};

export const SlashSeparator: Story = {
  name: 'Slash Separator & Gradient Active',
  args: {
    items: slashItems,
    separator: 'slash',
    activeGradient: true,
  },
};

export const DotSeparator: Story = {
  name: 'Dot Separator',
  args: {
    items: dotItems,
    separator: 'dot',
    activeGradient: false,
  },
};

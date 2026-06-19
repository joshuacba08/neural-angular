import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { NBreadcrumb } from './breadcrumb.component.js';

const meta: Meta<NBreadcrumb> = {
  title: 'Actions & Menus/Breadcrumb',
  component: NBreadcrumb,
  decorators: [
    moduleMetadata({
      imports: [NBreadcrumb, CommonModule],
    }),
  ],
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj<NBreadcrumb>;

export const ChevronSeparator: Story = {
  name: 'Chevron Separator',
  args: {
    items: [
      { icon: 'house', url: '#' },
      { label: 'Projects', url: '#' },
      { label: 'Anime Collection', url: '#' },
      { label: 'Episode 12' },
    ],
    separator: 'chevron',
    activeGradient: false,
  },
};

export const SlashSeparator: Story = {
  name: 'Slash Separator & Gemini Active',
  args: {
    items: [
      { label: 'Dashboard', url: '#' },
      { label: 'Queue', url: '#' },
      { label: 'Processing' },
    ],
    separator: 'slash',
    activeGradient: true,
  },
};

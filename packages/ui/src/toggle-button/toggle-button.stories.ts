import { type Meta, type StoryObj } from '@storybook/angular';
import { NToggleButton } from './toggle-button.component';

const meta: Meta<NToggleButton> = {
  title: 'Forms/Toggle Button',
  component: NToggleButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<NToggleButton>;

export const Default: Story = {
  args: {
    checked: false,
    onLabel: 'Bold',
    offLabel: 'Bold',
    onIcon: 'bold',
    offIcon: 'bold',
  },
};

import { type Meta, type StoryObj } from '@storybook/angular';
import { NSwitch } from './switch.component';

const meta: Meta<NSwitch> = {
  title: 'Forms/Switch',
  component: NSwitch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<NSwitch>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

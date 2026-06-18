import { type Meta, type StoryObj } from '@storybook/angular';
import { NSelectButton } from './select-button.component';

const meta: Meta<NSelectButton> = {
  title: 'Forms/Select Button',
  component: NSelectButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<NSelectButton>;

export const Default: Story = {
  args: {
    options: ['Upscale', 'Enhance', 'Restore'],
    value: 'Upscale',
  },
};

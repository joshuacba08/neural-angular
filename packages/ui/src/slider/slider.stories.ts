import { type Meta, type StoryObj } from '@storybook/angular';
import { NSlider } from './slider.component';

const meta: Meta<NSlider> = {
  title: 'Forms/Slider',
  component: NSlider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<NSlider>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
  },
};

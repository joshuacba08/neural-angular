import { type Meta, type StoryObj } from '@storybook/angular';
import { NImageCompare } from './image-compare.component';

const demoAfterSrc =
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';

const defaultArgs = {
  afterSrc: demoAfterSrc,
  beforeLabel: 'Original',
  afterLabel: '4K Enhanced',
  beforeMode: 'filter' as const,
  orientation: 'horizontal' as const,
  showLabels: true,
  value: 50,
  disabled: false,
};

const meta: Meta<NImageCompare> = {
  title: 'App Patterns/Image Compare',
  component: NImageCompare,
  tags: ['!autodocs'],
  render: (args) => ({
    props: {
      ...args,
      position: args.value ?? 50,
      onValueChange(value: number) {
        (this as { position: number }).position = value;
      },
    },
    template: `
      <n-image-compare
        style="max-width: 720px"
        [afterSrc]="afterSrc"
        [beforeSrc]="beforeSrc"
        [beforeAlt]="beforeAlt"
        [afterAlt]="afterAlt"
        [beforeMode]="beforeMode"
        [orientation]="orientation"
        [showLabels]="showLabels"
        [beforeLabel]="beforeLabel"
        [afterLabel]="afterLabel"
        [disabled]="disabled"
        [value]="position"
        (valueChange)="onValueChange($event)"
      />
    `,
  }),
  argTypes: {
    beforeMode: {
      control: 'select',
      options: ['image', 'filter'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    showLabels: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<NImageCompare>;

export const Default: Story = {
  args: defaultArgs,
};

export const Vertical: Story = {
  args: {
    ...defaultArgs,
    orientation: 'vertical',
    value: 58,
  },
};

export const DualImage: Story = {
  args: {
    ...defaultArgs,
    beforeMode: 'image',
    beforeSrc:
      'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80',
    beforeLabel: 'Original · 1080p',
    afterLabel: 'Enhanced · 4K',
    value: 42,
  },
};

export const Playground: Story = {
  args: defaultArgs,
};

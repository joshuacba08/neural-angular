import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NRating } from './rating.component.js';

const meta: Meta<NRating> = {
  title: 'Forms/Rating',
  component: NRating,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NRating],
    }),
  ],
  args: {
    value: 4,
    max: 5,
    readonly: false,
    disabled: false,
    showValue: true,
  },
};

export default meta;

type Story = StoryObj<NRating>;

export const Playground: Story = {
  render: (args) => ({
    props: {
      ...args,
      current: args.value,
      onChange(value: number) {
        (this as { current: number }).current = value;
      },
    },
    template: `
      <n-rating
        [value]="current"
        [max]="max"
        [readonly]="readonly"
        [disabled]="disabled"
        [showValue]="showValue"
        (valueChange)="onChange($event)"
      />
    `,
  }),
};

export const Readonly: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-rating [value]="5" [readonly]="true" [showValue]="true" />
        <n-rating [value]="3" [readonly]="true" [showValue]="true" />
        <n-rating [value]="1" [readonly]="true" [showValue]="true" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<n-rating [value]="2" [disabled]="true" [showValue]="true" />`,
  }),
};

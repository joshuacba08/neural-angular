import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NInputNumber } from './input-number.component.js';

const meta: Meta<NInputNumber> = {
  title: 'Forms/Input Number',
  component: NInputNumber,
  decorators: [
    moduleMetadata({
      imports: [NInputNumber],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    label: 'Cantidad',
    value: 8,
    stepValue: 1,
    size: 'md',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<NInputNumber>;

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
      <div style="width: 200px;">
        <n-input-number
          [label]="label"
          [value]="current"
          [stepValue]="stepValue"
          [size]="size"
          [disabled]="disabled"
          [hint]="hint"
          [error]="error"
          (valueChange)="onChange($event)"
        />
      </div>
    `,
  }),
};

export const Bounded: Story = {
  render: () => ({
    props: {
      current: 4,
      onChange(value: number) {
        (this as { current: number }).current = value;
      },
    },
    template: `
      <div style="width: 200px;">
        <n-input-number
          label="Workers (0–8)"
          [value]="current"
          [min]="0"
          [max]="8"
          hint="Máximo 8 workers GPU"
          (valueChange)="onChange($event)"
        />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--n-space-4); width: 200px;">
        <n-input-number label="Small" size="sm" [value]="8" />
        <n-input-number label="Medium" size="md" [value]="8" />
        <n-input-number label="Large" size="lg" [value]="8" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--n-space-4); width: 200px;">
        <n-input-number label="Disabled" [value]="8" [disabled]="true" />
        <n-input-number label="Con error" [value]="0" error="Valor fuera de rango" />
      </div>
    `,
  }),
};

import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NSelect } from './select.component.js';
import type { NSelectOption } from './select.types.js';

const modelOptions: NSelectOption[] = [
  { label: 'Neural Pro 2.0', value: 'pro-2' },
  { label: 'Neural Lite 1.5', value: 'lite-1.5' },
  { label: 'Neural Vision 3.0', value: 'vision-3' },
];

const meta: Meta<NSelect> = {
  title: 'Forms/Select',
  component: NSelect,
  decorators: [
    moduleMetadata({
      imports: [NSelect],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    options: { control: false },
  },
  args: {
    label: 'Modelo base',
    placeholder: 'Selecciona un modelo',
    size: 'md',
    value: '',
    hint: '',
    error: '',
    disabled: false,
    required: false,
  },
};

export default meta;

type Story = StoryObj<NSelect>;

// Interactive: valueChange runs inside Angular's zone, so updating the bound
// prop reflects the selection on the trigger.
export const Playground: Story = {
  render: (args) => ({
    props: {
      ...args,
      options: modelOptions,
      selected: args.value,
      onChange(value: string) {
        (this as { selected: string }).selected = value;
      },
    },
    template: `
      <div style="width: min(360px, calc(100vw - 48px));">
        <n-select
          [label]="label"
          [placeholder]="placeholder"
          [size]="size"
          [hint]="hint"
          [error]="error"
          [disabled]="disabled"
          [required]="required"
          [options]="options"
          [value]="selected"
          (valueChange)="onChange($event)"
        />
      </div>
    `,
  }),
};

// Mirrors "Inputs & Forms · Modelo base" from the design reference.
export const ModelSelect: Story = {
  render: () => ({
    props: {
      options: modelOptions,
      selected: 'pro-2',
      onChange(value: string) {
        (this as { selected: string }).selected = value;
      },
    },
    template: `
      <div style="width: min(360px, calc(100vw - 48px));">
        <n-select
          label="Modelo base"
          [options]="options"
          [value]="selected"
          (valueChange)="onChange($event)"
        />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: { options: modelOptions },
    template: `
      <div class="n-story-grid">
        <n-select label="Small" size="sm" [options]="options" value="pro-2" />
        <n-select label="Medium" size="md" [options]="options" value="pro-2" />
        <n-select label="Large" size="lg" [options]="options" value="pro-2" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    props: { options: modelOptions },
    template: `
      <div class="n-story-grid">
        <n-select
          label="Con placeholder"
          placeholder="Selecciona un modelo"
          [options]="options"
        />
        <n-select
          label="Con hint"
          [options]="options"
          value="pro-2"
          hint="Modelo usado por defecto"
        />
        <n-select
          label="Con error"
          placeholder="Selecciona un modelo"
          [options]="options"
          error="Debes elegir un modelo"
        />
        <n-select label="Disabled" [options]="options" value="pro-2" [disabled]="true" />
      </div>
    `,
  }),
};

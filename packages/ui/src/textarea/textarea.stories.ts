import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NTextarea } from './textarea.component.js';

const meta: Meta<NTextarea> = {
  title: 'Forms/Textarea',
  component: NTextarea,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NTextarea],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    rows: {
      control: { type: 'number', min: 2, max: 12, step: 1 },
    },
  },
  args: {
    label: 'Descripción',
    placeholder: 'Describe el propósito…',
    rows: 4,
    size: 'md',
    resize: 'vertical',
    value: '',
    hint: '',
    error: '',
    disabled: false,
    readonly: false,
    required: false,
  },
};

export default meta;

type Story = StoryObj<NTextarea>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: min(460px, calc(100vw - 48px));">
        <n-textarea
          [label]="label"
          [placeholder]="placeholder"
          [rows]="rows"
          [size]="size"
          [resize]="resize"
          [value]="value"
          [hint]="hint"
          [error]="error"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
        />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="n-story-grid">
        <n-textarea label="Small" size="sm" [rows]="3" placeholder="Small textarea" />
        <n-textarea label="Medium" size="md" [rows]="3" placeholder="Medium textarea" />
        <n-textarea label="Large" size="lg" [rows]="3" placeholder="Large textarea" />
      </div>
    `,
  }),
};

export const WithHelpers: Story = {
  render: () => ({
    template: `
      <div class="n-story-grid">
        <n-textarea
          label="Con hint"
          placeholder="Describe el propósito…"
          hint="Máximo 280 caracteres"
        />
        <n-textarea
          label="Con error"
          value="x"
          error="La descripción es demasiado corta"
        />
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div class="n-story-grid">
        <n-textarea label="Disabled" placeholder="Disabled textarea" [disabled]="true" />
        <n-textarea label="Read only" value="Neural enhancement pipeline." [readonly]="true" />
      </div>
    `,
  }),
};

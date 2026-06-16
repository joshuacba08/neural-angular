import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NInput } from './input.component.js';

const meta: Meta<NInput> = {
  title: 'Forms/Input',
  component: NInput,
  decorators: [
    moduleMetadata({
      imports: [NInput],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'ghost'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'url', 'tel'],
    },
  },
  args: {
    label: 'Nombre completo',
    placeholder: 'Ingresa tu nombre',
    type: 'text',
    size: 'md',
    variant: 'default',
    value: '',
    hint: '',
    error: '',
    disabled: false,
    readonly: false,
    required: false,
  },
};

export default meta;

type Story = StoryObj<NInput>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: min(420px, calc(100vw - 48px));">
        <n-input
          [label]="label"
          [placeholder]="placeholder"
          [type]="type"
          [size]="size"
          [variant]="variant"
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

// Mirrors "Inputs & Forms · Text Inputs" from the design reference.
export const TextInputs: Story = {
  render: () => ({
    template: `
      <div class="n-story-grid">
        <n-input label="Nombre completo" placeholder="Ingresa tu nombre" />
        <n-input label="Email" type="email" placeholder="tu@empresa.com" />
        <n-input
          label="Con hint"
          placeholder="neural-agent-01"
          hint="Identificador único del agente"
        />
        <n-input
          label="Con error"
          value="invalid_value"
          error="Este campo no es válido"
        />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-grid">
        <n-input label="Default" variant="default" placeholder="Surface field" />
        <n-input label="Filled" variant="filled" placeholder="Filled field" />
        <n-input label="Ghost" variant="ghost" placeholder="Ghost field" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="n-story-grid">
        <n-input label="Small" size="sm" placeholder="Small field" />
        <n-input label="Medium" size="md" placeholder="Medium field" />
        <n-input label="Large" size="lg" placeholder="Large field" />
      </div>
    `,
  }),
};

export const Search: Story = {
  render: () => ({
    template: `
      <div style="width: min(560px, calc(100vw - 48px));">
        <n-input type="search" placeholder="Buscar componentes, tokens, patrones…" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div class="n-story-grid">
        <n-input label="Disabled" placeholder="Disabled field" [disabled]="true" />
        <n-input label="Read only" value="neural-agent-01" [readonly]="true" />
        <n-input label="Required" placeholder="Required field" [required]="true" />
        <n-input label="Con error" value="invalid_value" error="Este campo no es válido" />
      </div>
    `,
  }),
};

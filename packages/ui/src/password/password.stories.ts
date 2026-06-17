import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NPassword } from './password.component.js';

const meta: Meta<NPassword> = {
  title: 'Forms/Password',
  component: NPassword,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NPassword],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    value: 'Neural$2026',
    size: 'md',
    showStrength: true,
    disabled: false,
    required: false,
  },
};

export default meta;

type Story = StoryObj<NPassword>;

export const Playground: Story = {
  render: (args) => ({
    props: {
      ...args,
      current: args.value,
      onChange(value: string) {
        (this as { current: string }).current = value;
      },
    },
    template: `
      <div style="width: min(320px, calc(100vw - 48px));">
        <n-password
          [label]="label"
          [placeholder]="placeholder"
          [value]="current"
          [size]="size"
          [showStrength]="showStrength"
          [disabled]="disabled"
          [required]="required"
          [hint]="hint"
          [error]="error"
          (valueChange)="onChange($event)"
        />
      </div>
    `,
  }),
};

// Mirrors the design's strength meter: weak / medium / strong.
export const Strengths: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--n-space-5); width: min(320px, calc(100vw - 48px));">
        <n-password label="Weak" value="abc" />
        <n-password label="Medium" value="Neural12" />
        <n-password label="Strong" value="NeuralPro$2026" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--n-space-5); width: min(320px, calc(100vw - 48px));">
        <n-password label="Con hint" [showStrength]="false" hint="Mínimo 12 caracteres" />
        <n-password label="Con error" value="abc" error="La contraseña es demasiado débil" />
        <n-password label="Disabled" value="Neural$2026" [disabled]="true" />
      </div>
    `,
  }),
};

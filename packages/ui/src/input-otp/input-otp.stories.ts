import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NInputOtp } from './input-otp.component.js';

const meta: Meta<NInputOtp> = {
  title: 'Forms/Input OTP',
  component: NInputOtp,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NInputOtp],
    }),
  ],
  argTypes: {
    length: {
      control: { type: 'number', min: 4, max: 8, step: 1 },
    },
  },
  args: {
    length: 6,
    value: '',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<NInputOtp>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: var(--n-space-3);">
        <n-input-otp [length]="length" [value]="value" [disabled]="disabled" />
        <span style="color: var(--n-text-3); font-family: var(--n-font-mono); font-size: var(--n-font-size-11);">
          Verify the {{ length }}-digit code sent to your email
        </span>
      </div>
    `,
  }),
};

// Mirrors "Advanced Forms · Input OTP · 6-digit" from the design reference.
export const Prefilled: Story = {
  render: () => ({
    template: `<n-input-otp [length]="6" value="482" />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<n-input-otp [length]="6" value="123456" [disabled]="true" />`,
  }),
};

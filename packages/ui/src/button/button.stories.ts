import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NIcon } from '../icon/icon.component.js';
import { NButton } from './button.component.js';

const meta: Meta<NButton> = {
  title: 'Components/Button',
  component: NButton,
  decorators: [
    moduleMetadata({
      imports: [NButton, NIcon],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'gemini',
        'accent',
        'danger',
        'outline',
        'outline-gemini',
        'tonal',
        'tonal-violet',
        'ghost',
        'secondary',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
  },
};

export default meta;

type Story = StoryObj<NButton>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-button
        [variant]="variant"
        [size]="size"
        [type]="type"
        [disabled]="disabled"
        [loading]="loading"
        [fullWidth]="fullWidth"
        [iconOnly]="iconOnly"
        [ariaLabel]="iconOnly ? 'Action' : null"
      >
        Save changes
      </n-button>
    `,
  }),
};

export const GradientFilled: Story = {
  render: () => ({
    template: `
      <section class="n-button-showcase">
        <p class="n-button-showcase__tag">primary · gemini · accent · danger</p>
        <div class="n-story-row">
          <n-button variant="primary">Blue → Violet</n-button>
          <n-button variant="gemini">✦ Gemini</n-button>
          <n-button variant="accent">Violet → Pink</n-button>
          <n-button variant="danger">Danger</n-button>
          <n-button variant="primary" [disabled]="true">Disabled</n-button>
          <n-button variant="primary" [loading]="true">Loading</n-button>
        </div>
      </section>
    `,
  }),
};

export const OutlinedTonalGhost: Story = {
  render: () => ({
    template: `
      <section class="n-button-showcase n-button-showcase--panel">
        <div class="n-story-row">
          <n-button variant="outline">Gradient Border</n-button>
          <n-button variant="outline-gemini">Gemini Border</n-button>
        </div>
        <div class="n-story-row">
          <n-button variant="tonal">Tonal Blue</n-button>
          <n-button variant="tonal-violet">Tonal Violet</n-button>
        </div>
        <div class="n-story-row">
          <n-button variant="ghost">Ghost Primary</n-button>
          <n-button variant="secondary">Ghost Muted</n-button>
        </div>
      </section>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-button variant="primary" size="sm">Small 32px</n-button>
        <n-button variant="primary" size="md">Medium 40px</n-button>
        <n-button variant="primary" size="lg">Large 48px</n-button>
        <n-button variant="primary" size="xl">XLarge 56px</n-button>
      </div>
    `,
  }),
};

export const IconButtons: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-button variant="primary" size="sm" [iconOnly]="true" ariaLabel="Add">
          <n-icon name="plus" size="sm" />
        </n-button>
        <n-button variant="gemini" [iconOnly]="true" ariaLabel="Add">
          <n-icon name="plus" size="md" />
        </n-button>
        <n-button variant="outline" [iconOnly]="true" ariaLabel="Info">
          <n-icon name="info" size="md" />
        </n-button>
        <n-button variant="tonal-violet" size="lg" [iconOnly]="true" ariaLabel="Next">
          <n-icon name="arrow-right" size="lg" />
        </n-button>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-button variant="gemini">
          <n-icon name="sparkles" size="sm" />
          Generate
        </n-button>
        <n-button variant="ghost">
          <n-icon name="settings" size="sm" />
          Settings
        </n-button>
      </div>
    `,
  }),
};

export const FullWidthCtas: Story = {
  render: () => ({
    template: `
      <div class="n-button-cta-stack">
        <n-button variant="gemini" size="lg" [fullWidth]="true">
          <n-icon name="sparkles" size="sm" />
          Comenzar con Neural AI
        </n-button>
        <n-button variant="outline-gemini" size="lg" [fullWidth]="true">
          Continuar con Google
        </n-button>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-button variant="primary" [loading]="true">Loading</n-button>
        <n-button variant="primary" [disabled]="true">Disabled</n-button>
        <n-button variant="danger" [loading]="true">Deleting</n-button>
      </div>
    `,
  }),
};

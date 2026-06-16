import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NBadge } from './badge.component.js';
import { NBadgeDirective } from './badge.directive.js';
import { NIcon } from '../icon/icon.component.js';

const meta: Meta<NBadge> = {
  title: 'Components/Badge',
  component: NBadge,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NBadge, NBadgeDirective, NIcon],
    }),
  ],
  argTypes: {
    variant: {
      description: 'Visual severity or emphasis style for the badge surface.',
      control: 'select',
      table: {
        category: 'Appearance',
        type: { summary: 'NBadgeVariant' },
        defaultValue: { summary: 'neutral' },
      },
      options: [
        'neutral',
        'gradient',
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'danger',
        'info',
      ],
    },
    size: {
      description: 'Badge height and padding scale.',
      control: 'select',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md'" },
        defaultValue: { summary: 'sm' },
      },
      options: ['sm', 'md'],
    },
    shape: {
      description: 'Badge silhouette. Use square for compact version tags or counters.',
      control: 'select',
      table: {
        category: 'Appearance',
        type: { summary: "'pill' | 'square'" },
        defaultValue: { summary: 'pill' },
      },
      options: ['pill', 'square'],
    },
    dot: {
      description: 'Prepends a small status dot that inherits the current badge color.',
      control: 'boolean',
      table: {
        category: 'Status',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'neutral',
    size: 'sm',
    shape: 'pill',
    dot: false,
  },
};

export default meta;

type Story = StoryObj<NBadge>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-badge [variant]="variant" [size]="size" [shape]="shape" [dot]="dot">
        Ready
      </n-badge>
    `,
  }),
};

export const Basic: Story = {
  args: {
    variant: 'neutral',
    size: 'sm',
    shape: 'pill',
    dot: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <n-badge [variant]="variant" [size]="size" [shape]="shape" [dot]="dot">
        Ready
      </n-badge>
    `,
  }),
};

export const DesignSystem: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:720px">
        <section>
          <p style="margin:0 0 10px;font-family:var(--n-font-mono);font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:var(--n-text-3)">
            Chips &amp; Badges · severity variants
          </p>
          <div class="n-story-row">
            <n-badge variant="gradient">✦ Gemini</n-badge>
            <n-badge variant="primary">Blue Violet</n-badge>
            <n-badge variant="tertiary">Violet Pink</n-badge>
            <n-badge variant="success">Activo</n-badge>
            <n-badge variant="warning">Beta</n-badge>
            <n-badge variant="danger">Error</n-badge>
          </div>
        </section>

        <section>
          <p style="margin:0 0 10px;font-family:var(--n-font-mono);font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:var(--n-text-3)">
            Standalone · workflow states
          </p>
          <div class="n-story-row">
            <n-badge variant="gradient">Active</n-badge>
            <n-badge variant="primary">Processing</n-badge>
            <n-badge variant="success">Done</n-badge>
            <n-badge variant="warning">Queued</n-badge>
            <n-badge variant="danger">Failed</n-badge>
            <n-badge variant="neutral">Idle</n-badge>
          </div>
        </section>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-badge variant="neutral">Neutral</n-badge>
        <n-badge variant="gradient">Gradient</n-badge>
        <n-badge variant="primary">Primary</n-badge>
        <n-badge variant="secondary">Secondary</n-badge>
        <n-badge variant="tertiary">Tertiary</n-badge>
        <n-badge variant="success">Success</n-badge>
        <n-badge variant="warning">Warning</n-badge>
        <n-badge variant="danger">Danger</n-badge>
        <n-badge variant="info">Info</n-badge>
      </div>
    `,
  }),
};

export const WithDot: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-badge variant="success" [dot]="true">Running</n-badge>
        <n-badge variant="warning" [dot]="true">Queued</n-badge>
        <n-badge variant="danger" [dot]="true">Failed</n-badge>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-badge variant="primary" size="sm">Small · 20px</n-badge>
        <n-badge variant="primary" size="md">Medium · 24px</n-badge>
      </div>
    `,
  }),
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-badge variant="primary" shape="pill">Pill</n-badge>
        <n-badge variant="primary" shape="square">Square</n-badge>
        <n-badge variant="info" shape="square" size="sm">v22.0.1</n-badge>
      </div>
    `,
  }),
};

export const NotificationBadges: Story = {
  render: () => ({
    template: `
      <div class="n-story-row" style="gap:24px;align-items:center">
        <!-- Red circle notification count 4 on a bell button -->
        <button
          type="button"
          [nBadge]="4"
          nBadgeVariant="danger"
          style="position:relative;width:40px;height:40px;border-radius:50%;background:var(--n-surface-3);border:1px solid var(--n-border-1);color:var(--n-text-2);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0;outline:none"
        >
          <n-icon name="bell" size="sm" />
        </button>

        <!-- Gradient notification count 12 on an inbox button -->
        <button
          type="button"
          [nBadge]="12"
          nBadgeVariant="gradient"
          style="position:relative;width:40px;height:40px;border-radius:50%;background:var(--n-surface-3);border:1px solid var(--n-border-1);color:var(--n-text-2);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0;outline:none"
        >
          <n-icon name="inbox" size="sm" />
        </button>

        <!-- Green status indicator dot on a chat bubble button -->
        <button
          type="button"
          [nBadge]="true"
          nBadgeVariant="success"
          style="position:relative;width:40px;height:40px;border-radius:50%;background:var(--n-surface-3);border:1px solid var(--n-border-1);color:var(--n-text-2);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0;outline:none"
        >
          <n-icon name="message-square" size="sm" />
        </button>
      </div>
    `,
  }),
};


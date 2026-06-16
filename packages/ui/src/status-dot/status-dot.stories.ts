import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NStatusDot } from './status-dot.component.js';

const meta: Meta<NStatusDot> = {
  title: 'Components/Status Dot',
  component: NStatusDot,
  decorators: [
    moduleMetadata({
      imports: [NStatusDot],
    }),
  ],
  argTypes: {
    status: {
      control: 'select',
      options: [
        'neutral',
        'online',
        'offline',
        'busy',
        'away',
        'success',
        'warning',
        'danger',
        'info',
      ],
    },
  },
  args: {
    status: 'online',
    pulse: false,
    label: 'Online',
  },
};

export default meta;

type Story = StoryObj<NStatusDot>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-status-dot [status]="status" [pulse]="pulse" [label]="label" />
    `,
  }),
};

export const Basic: Story = {
  args: {
    status: 'online',
    pulse: false,
    label: 'Online',
  },
  render: (args) => ({
    props: args,
    template: `
      <n-status-dot [status]="status" [pulse]="pulse" [label]="label" />
    `,
  }),
};

export const Statuses: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-status-dot status="online" label="Online" />
        <n-status-dot status="busy" label="Busy" />
        <n-status-dot status="away" label="Away" />
        <n-status-dot status="offline" label="Offline" />
        <n-status-dot status="info" label="Info" />
        <n-status-dot status="warning" label="Warning" />
        <n-status-dot status="danger" label="Error" />
      </div>
    `,
  }),
};

export const Pulse: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-status-dot status="online" [pulse]="true" label="Live" />
        <n-status-dot status="danger" [pulse]="true" label="Recording" />
      </div>
    `,
  }),
};

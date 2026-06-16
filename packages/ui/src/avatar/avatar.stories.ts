import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NAvatar } from './avatar.component.js';

const meta: Meta<NAvatar> = {
  title: 'Components/Avatar',
  component: NAvatar,
  decorators: [
    moduleMetadata({
      imports: [NAvatar],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded'],
    },
    status: {
      control: 'select',
      options: [null, 'online', 'offline', 'busy', 'away'],
    },
  },
  args: {
    name: 'Neural Angular',
    size: 'md',
    shape: 'circle',
    status: 'online',
  },
};

export default meta;

type Story = StoryObj<NAvatar>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-avatar
        [name]="name"
        [src]="src"
        [size]="size"
        [shape]="shape"
        [status]="status"
      />
    `,
  }),
};

export const Initials: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-avatar name="Neural Angular" />
        <n-avatar name="Josue Oroya" />
        <n-avatar name="AI" />
        <n-avatar name="" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-avatar name="Neural" size="sm" />
        <n-avatar name="Neural" size="md" />
        <n-avatar name="Neural" size="lg" />
        <n-avatar name="Neural" size="xl" />
      </div>
    `,
  }),
};

export const WithStatus: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-avatar name="On" status="online" />
        <n-avatar name="Bs" status="busy" />
        <n-avatar name="Aw" status="away" />
        <n-avatar name="Of" status="offline" />
        <n-avatar name="Sq" shape="rounded" status="online" />
      </div>
    `,
  }),
};

import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NIcon } from '../icon/icon.component.js';
import { NAvatar } from './avatar.component.js';
import { NAvatarGroup } from './avatar-group.component.js';

const meta: Meta<NAvatar> = {
  title: 'Components/Avatar',
  component: NAvatar,
  decorators: [
    moduleMetadata({
      imports: [NAvatar, NAvatarGroup, NIcon],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['blue-violet', 'violet-pink', 'gemini', 'surface'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded'],
    },
    status: {
      control: 'select',
      options: [null, 'online', 'active', 'away', 'offline'],
    },
  },
  args: {
    name: 'John Doe',
    size: 'md',
    variant: 'blue-violet',
    shape: 'circle',
    status: null,
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
        [variant]="variant"
        [shape]="shape"
        [status]="status"
      />
    `,
  }),
};

export const SizesAndVariants: Story = {
  render: () => ({
    template: `
      <section class="n-avatar-showcase">
        <div class="n-avatar-showcase__block">
          <p class="n-avatar-showcase__label">Sizes · xs → xl</p>
          <div class="n-story-row">
            <n-avatar name="John Doe" size="xs" />
            <n-avatar name="John Doe" size="sm" />
            <n-avatar name="John Doe" size="md" />
            <n-avatar name="John Doe" size="lg" />
            <n-avatar name="John Doe" size="xl" />
          </div>
        </div>

        <div class="n-avatar-showcase__block">
          <p class="n-avatar-showcase__label">Gradient variants</p>
          <div class="n-story-row">
            <n-avatar name="Amy Brooks" variant="blue-violet" />
            <n-avatar name="Chris Davis" variant="violet-pink" />
            <n-avatar name="Eva Fox" variant="gemini" />
            <n-avatar variant="surface">
              <n-icon name="user" size="sm" />
            </n-avatar>
            <n-avatar variant="surface">
              <n-icon name="info" size="sm" />
            </n-avatar>
          </div>
        </div>
      </section>
    `,
  }),
};

export const WithStatus: Story = {
  render: () => ({
    template: `
      <div class="n-story-row n-avatar-status-row">
        <div class="n-avatar-status-item">
          <n-avatar name="Amy Lee" status="online" />
          <span class="n-avatar-status-item__label n-avatar-status-item__label--online">Online</span>
        </div>
        <div class="n-avatar-status-item">
          <n-avatar name="Maria R" variant="violet-pink" status="active" />
          <span class="n-avatar-status-item__label n-avatar-status-item__label--active">Active</span>
        </div>
        <div class="n-avatar-status-item">
          <n-avatar name="Ken Wu" variant="surface" status="away" />
          <span class="n-avatar-status-item__label n-avatar-status-item__label--away">Away</span>
        </div>
      </div>
    `,
  }),
};

export const StackedGroup: Story = {
  render: () => ({
    template: `
      <section class="n-avatar-showcase__block">
        <p class="n-avatar-showcase__label">AvatarGroup · Stacked</p>
        <n-avatar-group>
          <n-avatar variant="surface"><span class="n-avatar-counter">+5</span></n-avatar>
          <n-avatar name="Grace H" />
          <n-avatar name="Sam T" variant="gemini" />
          <n-avatar name="Maria R" variant="violet-pink" />
          <n-avatar name="John Doe" />
        </n-avatar-group>
      </section>
    `,
  }),
};

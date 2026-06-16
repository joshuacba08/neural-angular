import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NIcon } from '../icon/icon.component.js';
import { NAvatar } from './avatar.component.js';
import { NAvatarGroup } from './avatar-group.component.js';

const AVATAR_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%232563eb'/%3E%3Cstop offset='1' stop-color='%23ec4899'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='160' rx='36' fill='url(%23bg)'/%3E%3Ccircle cx='80' cy='60' r='28' fill='%23f8fafc' fill-opacity='.92'/%3E%3Cpath d='M36 134c10-24 32-36 44-36s34 12 44 36' fill='%23f8fafc' fill-opacity='.92'/%3E%3C/svg%3E";

const meta: Meta<NAvatar> = {
  title: 'Components/Avatar',
  component: NAvatar,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NAvatar, NAvatarGroup, NIcon],
    }),
  ],
  argTypes: {
    src: {
      description: 'Image source. When present, the avatar renders an internal <img>.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    alt: {
      description: 'Accessible image alt text. Falls back to name for aria-labeling.',
      control: 'text',
      table: {
        category: 'Accessibility',
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    name: {
      description: 'Display name used to generate initials when no image is provided.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    size: {
      description: 'Avatar dimensions and typography scale.',
      control: 'select',
      table: {
        category: 'Appearance',
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'md' },
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      description: 'Surface treatment for initials, icons, and fallback content.',
      control: 'select',
      table: {
        category: 'Appearance',
        type: { summary: 'NAvatarVariant' },
        defaultValue: { summary: 'blue-violet' },
      },
      options: ['blue-violet', 'violet-pink', 'gemini', 'surface'],
    },
    shape: {
      description: 'Avatar outline. Rounded is supported but deprecated in the design reference.',
      control: 'select',
      table: {
        category: 'Appearance',
        type: { summary: "'circle' | 'rounded'" },
        defaultValue: { summary: 'circle' },
      },
      options: ['circle', 'rounded'],
    },
    status: {
      description: 'Optional presence indicator dot. `busy` is normalized to `active`.',
      control: 'select',
      table: {
        category: 'Status',
        type: { summary: 'NAvatarStatus' },
        defaultValue: { summary: 'null' },
      },
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

export const WithImage: Story = {
  render: () => ({
    props: {
      avatarImage: AVATAR_IMAGE,
    },
    template: `
      <section class="n-avatar-showcase">
        <div class="n-avatar-showcase__block">
          <p class="n-avatar-showcase__label">Image source + fallback variants</p>
          <div class="n-story-row">
            <n-avatar [src]="avatarImage" alt="Sofia Carter portrait" name="Sofia Carter" status="online" />
            <n-avatar [src]="avatarImage" alt="Sofia Carter portrait" name="Sofia Carter" size="lg" />
            <n-avatar [src]="avatarImage" alt="Sofia Carter portrait" name="Sofia Carter" shape="rounded" size="xl" />
            <n-avatar name="Fallback Only" variant="surface" />
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

export const RoundedShape: Story = {
  render: () => ({
    template: `
      <section class="n-avatar-showcase__block">
        <p class="n-avatar-showcase__label">Rounded outline</p>
        <div class="n-story-row">
          <n-avatar name="John Doe" shape="rounded" />
          <n-avatar name="Maria R" variant="violet-pink" shape="rounded" />
          <n-avatar name="Eva Fox" variant="gemini" shape="rounded" status="active" />
          <n-avatar variant="surface" shape="rounded">
            <n-icon name="user" size="sm" />
          </n-avatar>
        </div>
      </section>
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

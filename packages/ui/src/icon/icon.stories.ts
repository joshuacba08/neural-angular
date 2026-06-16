import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NIcon } from './icon.component.js';
import { NEURAL_LUCIDE_ICON_NAMES } from './neural-icons.js';

const meta: Meta<NIcon> = {
  title: 'Components/Icon',
  component: NIcon,
  decorators: [
    moduleMetadata({
      imports: [NIcon],
    }),
  ],
  argTypes: {
    name: {
      control: 'select',
      options: [...NEURAL_LUCIDE_ICON_NAMES],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 3, step: 0.25 },
    },
  },
  args: {
    name: 'sparkles',
    size: 'md',
    decorative: true,
    strokeWidth: 2,
  },
};

export default meta;

type Story = StoryObj<NIcon>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-icon
        [name]="name"
        [size]="size"
        [decorative]="decorative"
        [strokeWidth]="strokeWidth"
        [label]="label"
      />
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="n-story-row">
        <n-icon name="sparkles" size="xs" />
        <n-icon name="sparkles" size="sm" />
        <n-icon name="sparkles" size="md" />
        <n-icon name="sparkles" size="lg" />
        <n-icon name="sparkles" size="xl" />
      </div>
    `,
  }),
};

export const Gallery: Story = {
  render: () => ({
    props: { names: [...NEURAL_LUCIDE_ICON_NAMES] },
    template: `
      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
          gap: var(--n-space-3);
          width: min(760px, calc(100vw - 48px));
        "
      >
        @for (name of names; track name) {
          <div
            style="
              display: grid;
              gap: var(--n-space-2);
              justify-items: center;
              padding: var(--n-space-3);
              border: 1px solid var(--n-border-1);
              border-radius: var(--n-radius-lg);
              background: var(--n-surface-2);
              color: var(--n-text-1);
            "
          >
            <n-icon [name]="name" size="lg" />
            <code style="color: var(--n-text-3); font-size: var(--n-font-size-11);">{{ name }}</code>
          </div>
        }
      </div>
    `,
  }),
};

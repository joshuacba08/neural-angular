import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NAvatar } from '../avatar/avatar.component.js';
import { NIcon } from '../icon/icon.component.js';
import { NChip } from './chip.component.js';

const meta: Meta<NChip> = {
  title: 'Components/Chip',
  component: NChip,
  decorators: [
    moduleMetadata({
      imports: [NAvatar, NChip, NIcon],
    }),
  ],
  argTypes: {
    mode: {
      control: 'select',
      options: ['filter', 'tag'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
  args: {
    mode: 'filter',
    variant: 'default',
    size: 'md',
    selected: false,
    disabled: false,
    removable: false,
  },
};

export default meta;

type Story = StoryObj<NChip>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-chip
        [mode]="mode"
        [variant]="variant"
        [size]="size"
        [selected]="selected"
        [disabled]="disabled"
        [removable]="removable"
      >
        Angular
      </n-chip>
    `,
  }),
};

export const DesignSystem: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:28px;max-width:760px">
        <section>
          <p class="n-story-eyebrow">Filter Chips</p>
          <div class="n-story-row" style="flex-wrap:wrap">
            <n-chip [selected]="true">Todos los modelos</n-chip>
            <n-chip>Neural Pro</n-chip>
            <n-chip>Neural Lite</n-chip>
            <n-chip>Vision</n-chip>
            <n-chip>Code</n-chip>
            <n-chip>● Online</n-chip>
          </div>
          <div class="n-story-row" style="flex-wrap:wrap;margin-top:8px">
            <n-chip size="sm" [selected]="true">Pequeño</n-chip>
            <n-chip size="sm">XS Chip</n-chip>
            <n-chip size="sm">Compact</n-chip>
          </div>
        </section>

        <section>
          <p class="n-story-eyebrow">Tag · Severity variants</p>
          <div class="n-story-row" style="flex-wrap:wrap">
            <n-chip mode="tag">Default</n-chip>
            <n-chip mode="tag" variant="primary">Blue</n-chip>
            <n-chip mode="tag" variant="secondary">Violet</n-chip>
            <n-chip mode="tag" variant="success">Success</n-chip>
            <n-chip mode="tag" variant="warning">Warning</n-chip>
            <n-chip mode="tag" variant="danger">Error</n-chip>
          </div>
        </section>

        <section>
          <p class="n-story-eyebrow">Tag · With icon + closable</p>
          <div class="n-story-row" style="flex-wrap:wrap">
            <n-chip mode="tag" variant="primary" [removable]="true">
              <n-icon name="info" size="xs" />
              4K UHD
            </n-chip>
            <n-chip mode="tag" variant="secondary" [removable]="true">
              <n-icon name="sparkles" size="xs" />
              Real-ESRGAN x4
            </n-chip>
            <n-chip mode="tag" variant="success" [removable]="true">
              <n-icon name="check" size="xs" />
              H.265
            </n-chip>
            <n-chip mode="tag" [removable]="true">HDR10+</n-chip>
          </div>
        </section>

        <section>
          <p class="n-story-eyebrow">Tag · With avatar</p>
          <div class="n-story-row" style="flex-wrap:wrap;align-items:center">
            <n-chip mode="tag" class="n-chip-with-avatar">
              <n-avatar name="John Doe" size="xs" variant="blue-violet" />
              John Doe
            </n-chip>
            <n-chip mode="tag" class="n-chip-with-avatar">
              <n-avatar name="Maria R." size="xs" variant="violet-pink" />
              Maria R.
            </n-chip>
            <n-chip mode="tag" variant="primary" class="n-chip-with-avatar">
              <n-avatar size="xs" variant="surface">
                <n-icon name="plus" size="xs" />
              </n-avatar>
              Add member
            </n-chip>
          </div>
        </section>
      </div>
    `,
  }),
};

export const FilterChips: Story = {
  render: () => ({
    template: `
      <div class="n-story-row" style="flex-wrap:wrap">
        <n-chip [selected]="true">Todos los modelos</n-chip>
        <n-chip>Neural Pro</n-chip>
        <n-chip>Neural Lite</n-chip>
        <n-chip size="sm" [selected]="true">Pequeño</n-chip>
        <n-chip size="sm">Compact</n-chip>
        <n-chip [disabled]="true">Disabled</n-chip>
      </div>
    `,
  }),
};

export const TagVariants: Story = {
  render: () => ({
    template: `
      <div class="n-story-row" style="flex-wrap:wrap">
        <n-chip mode="tag">Default</n-chip>
        <n-chip mode="tag" variant="primary">Blue</n-chip>
        <n-chip mode="tag" variant="secondary">Violet</n-chip>
        <n-chip mode="tag" variant="success">Success</n-chip>
        <n-chip mode="tag" variant="warning">Warning</n-chip>
        <n-chip mode="tag" variant="danger">Error</n-chip>
      </div>
    `,
  }),
};

export const Removable: Story = {
  render: () => ({
    template: `
      <div class="n-story-row" style="flex-wrap:wrap">
        <n-chip mode="tag" variant="primary" [removable]="true">
          <n-icon name="info" size="xs" />
          4K UHD
        </n-chip>
        <n-chip mode="tag" variant="secondary" [removable]="true">Real-ESRGAN x4</n-chip>
        <n-chip mode="tag" [removable]="true" [disabled]="true">locked.zip</n-chip>
      </div>
    `,
  }),
};

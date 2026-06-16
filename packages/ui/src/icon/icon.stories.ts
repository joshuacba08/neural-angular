import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NButton } from '../button/button.component.js';
import {
  NCard,
  NCardContent,
  NCardDescription,
  NCardHeader,
  NCardTitle,
} from '../card/card.component.js';
import { NIcon } from './icon.component.js';
import {
  NEURAL_LUCIDE_ICON_GROUPS,
  NEURAL_LUCIDE_ICON_NAMES,
  NEURAL_LUCIDE_ICON_REGISTRY,
} from './neural-icons.js';

const meta: Meta<NIcon> = {
  title: 'Components/Icon',
  component: NIcon,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NButton, NCard, NCardContent, NCardDescription, NCardHeader, NCardTitle, NIcon],
    }),
  ],
  argTypes: {
    name: {
      description: 'Registered Lucide icon name available through the Neural provider.',
      control: 'select',
      options: [...NEURAL_LUCIDE_ICON_NAMES],
      table: {
        category: 'Registry',
        type: { summary: 'NIconName' },
        defaultValue: { summary: 'sparkles' },
      },
    },
    size: {
      description: 'Applies one of the shared icon size tokens.',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: {
        category: 'Appearance',
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'md' },
      },
    },
    strokeWidth: {
      description: 'Adjusts the Lucide stroke weight while preserving the same glyph.',
      control: { type: 'range', min: 1, max: 3, step: 0.25 },
      table: {
        category: 'Appearance',
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    decorative: {
      description: 'Hides the icon from assistive technologies when it is purely visual.',
      control: 'boolean',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    label: {
      description: 'Accessible label used when decorative is false. Falls back to the icon name.',
      control: 'text',
      table: {
        category: 'Accessibility',
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    name: 'sparkles',
    size: 'md',
    decorative: false,
    strokeWidth: 2,
  },
};

export default meta;

type Story = StoryObj<NIcon>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="n-icon-preview">
        <div class="n-icon-preview__glyph">
          <n-icon
            [name]="name"
            [size]="size"
            [decorative]="decorative"
            [strokeWidth]="strokeWidth"
            [label]="label"
          />
        </div>
        <div class="n-icon-preview__meta">
          <strong>{{ name }}</strong>
          <span>{{ decorative ? 'Decorative icon' : (label || 'Accessible label derived from name') }}</span>
        </div>
      </div>
    `,
  }),
};

export const Basic: Story = {
  args: {
    name: 'sparkles',
    size: 'md',
    decorative: false,
    strokeWidth: 2,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="n-icon-preview">
        <div class="n-icon-preview__glyph">
          <n-icon
            [name]="name"
            [size]="size"
            [decorative]="decorative"
            [strokeWidth]="strokeWidth"
            [label]="label"
          />
        </div>
        <div class="n-icon-preview__meta">
          <strong>{{ name }}</strong>
          <span>{{ decorative ? 'Decorative icon' : (label || 'Accessible label derived from name') }}</span>
        </div>
      </div>
    `,
  }),
};

export const SizeScale: Story = {
  render: () => ({
    template: `
      <section class="n-icon-scale">
        <div class="n-icon-scale__item">
          <span class="n-icon-scale__label">xs</span>
          <div class="n-icon-scale__surface"><n-icon name="sparkles" size="xs" /></div>
          <code>12px</code>
        </div>
        <div class="n-icon-scale__item">
          <span class="n-icon-scale__label">sm</span>
          <div class="n-icon-scale__surface"><n-icon name="sparkles" size="sm" /></div>
          <code>16px</code>
        </div>
        <div class="n-icon-scale__item">
          <span class="n-icon-scale__label">md</span>
          <div class="n-icon-scale__surface"><n-icon name="sparkles" size="md" /></div>
          <code>20px</code>
        </div>
        <div class="n-icon-scale__item">
          <span class="n-icon-scale__label">lg</span>
          <div class="n-icon-scale__surface"><n-icon name="sparkles" size="lg" /></div>
          <code>24px</code>
        </div>
        <div class="n-icon-scale__item">
          <span class="n-icon-scale__label">xl</span>
          <div class="n-icon-scale__surface"><n-icon name="sparkles" size="xl" /></div>
          <code>32px</code>
        </div>
      </section>
    `,
  }),
};

export const StrokeWeights: Story = {
  render: () => ({
    template: `
      <section class="n-icon-weights">
        <div class="n-icon-weights__item">
          <n-icon name="search" size="xl" [strokeWidth]="1" />
          <code>1</code>
        </div>
        <div class="n-icon-weights__item">
          <n-icon name="search" size="xl" [strokeWidth]="1.5" />
          <code>1.5</code>
        </div>
        <div class="n-icon-weights__item">
          <n-icon name="search" size="xl" [strokeWidth]="2" />
          <code>2</code>
        </div>
        <div class="n-icon-weights__item">
          <n-icon name="search" size="xl" [strokeWidth]="2.5" />
          <code>2.5</code>
        </div>
        <div class="n-icon-weights__item">
          <n-icon name="search" size="xl" [strokeWidth]="3" />
          <code>3</code>
        </div>
      </section>
    `,
  }),
};

export const SemanticColors: Story = {
  render: () => ({
    template: `
      <section class="n-icon-color-grid">
        <article class="n-icon-color-card">
          <div class="n-icon-color-card__glyph n-icon-color-card__glyph--primary">
            <n-icon name="sparkles" size="lg" />
          </div>
          <strong>Primary</strong>
          <span>AI enhancement and premium actions.</span>
        </article>

        <article class="n-icon-color-card">
          <div class="n-icon-color-card__glyph n-icon-color-card__glyph--success">
            <n-icon name="circle-check" size="lg" />
          </div>
          <strong>Success</strong>
          <span>Completed jobs and validated states.</span>
        </article>

        <article class="n-icon-color-card">
          <div class="n-icon-color-card__glyph n-icon-color-card__glyph--warning">
            <n-icon name="alert-circle" size="lg" />
          </div>
          <strong>Warning</strong>
          <span>Needs review before the next step.</span>
        </article>

        <article class="n-icon-color-card">
          <div class="n-icon-color-card__glyph n-icon-color-card__glyph--danger">
            <n-icon name="trash-2" size="lg" />
          </div>
          <strong>Danger</strong>
          <span>Destructive actions and irreversible flows.</span>
        </article>
      </section>
    `,
  }),
};

export const UIComposition: Story = {
  render: () => ({
    template: `
      <section class="n-icon-context-grid">
        <article class="n-icon-context-panel">
          <div class="n-icon-context-toolbar">
            <button type="button" class="n-icon-context-chip">
              <n-icon name="component" size="sm" />
              Layout
            </button>
            <button type="button" class="n-icon-context-chip">
              <n-icon name="search" size="sm" />
              Search
            </button>
            <button type="button" class="n-icon-context-chip">
              <n-icon name="settings" size="sm" />
              Settings
            </button>
          </div>

          <n-card class="n-story-card">
            <n-card-header>
              <n-card-title>Model runtime</n-card-title>
              <n-card-description>
                Icons inherit color from their host surface, so they stay visually consistent
                across cards, buttons, and compact toolbars.
              </n-card-description>
            </n-card-header>
            <n-card-content>
              <div class="n-icon-context-list">
                <div class="n-icon-context-list__item">
                  <span><n-icon name="cpu" size="sm" /> Inference queue</span>
                  <strong>12 workers</strong>
                </div>
                <div class="n-icon-context-list__item">
                  <span><n-icon name="shield" size="sm" /> Safety filters</span>
                  <strong>Enabled</strong>
                </div>
                <div class="n-icon-context-list__item">
                  <span><n-icon name="zap" size="sm" /> Fast lane</span>
                  <strong>On</strong>
                </div>
              </div>
            </n-card-content>
          </n-card>
        </article>

        <article class="n-icon-context-panel n-icon-context-panel--accent">
          <div class="n-icon-context-actions">
            <n-button variant="primary">
              <n-icon name="sparkles" size="sm" />
              Generate draft
            </n-button>
            <n-button variant="outline">
              <n-icon name="download" size="sm" />
              Export
            </n-button>
          </div>

          <div class="n-icon-context-status">
            <span><n-icon name="activity" size="sm" /> Streaming updates</span>
            <span><n-icon name="users" size="sm" /> 4 collaborators online</span>
            <span><n-icon name="message-square" size="sm" /> 18 notes attached</span>
          </div>
        </article>
      </section>
    `,
  }),
};

export const RegistryGallery: Story = {
  render: () => ({
    props: {
      groups: NEURAL_LUCIDE_ICON_GROUPS.map((group) => ({
        ...group,
        items: group.icons.map((name) => ({
          name,
          label: NEURAL_LUCIDE_ICON_REGISTRY[name].label,
          description: NEURAL_LUCIDE_ICON_REGISTRY[name].description,
        })),
      })),
    },
    template: `
      <section class="n-icon-gallery">
        @for (group of groups; track group.id) {
          <div class="n-icon-gallery__group">
            <div class="n-icon-gallery__group-header">
              <h3>{{ group.label }}</h3>
              <span>{{ group.items.length }} icons</span>
            </div>

            <div class="n-icon-gallery__grid">
              @for (item of group.items; track item.name) {
                <article class="n-icon-gallery__card">
                  <div class="n-icon-gallery__glyph">
                    <n-icon [name]="item.name" size="lg" />
                  </div>
                  <strong>{{ item.label }}</strong>
                  <code>{{ item.name }}</code>
                  <p>{{ item.description }}</p>
                </article>
              }
            </div>
          </div>
        }
      </section>
    `,
  }),
};

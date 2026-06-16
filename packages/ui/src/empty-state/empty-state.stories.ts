import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NButton } from '../button/button.component.js';
import { NIcon } from '../icon/icon.component.js';
import { NEmptyState } from './empty-state.component.js';

const meta: Meta<NEmptyState> = {
  title: 'Components/Empty State',
  component: NEmptyState,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NEmptyState, NButton, NIcon],
    }),
  ],
  argTypes: {
    variant: {
      description: 'Semantic tone for empty queues, informational results, or recoverable errors.',
      control: 'select',
      table: {
        category: 'Appearance',
        type: { summary: 'NEmptyStateVariant' },
        defaultValue: { summary: 'primary' },
      },
      options: ['primary', 'neutral', 'error'],
    },
    orientation: {
      description: 'Vertical stacks content; horizontal aligns icon and content side by side.',
      control: 'inline-radio',
      table: {
        category: 'Layout',
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: 'vertical' },
      },
      options: ['vertical', 'horizontal'],
    },
    icon: {
      description: 'Optional icon name rendered in the leading tile.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    title: {
      description: 'Primary empty-state heading.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    description: {
      description: 'Supporting copy that explains the state and suggested next step.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    icon: 'film',
    title: 'No videos yet',
    description: 'Import a video file to start enhancing with AI upscaling.',
    variant: 'primary',
    orientation: 'vertical',
  },
};

export default meta;

type Story = StoryObj<NEmptyState>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: min(280px, calc(100vw - 48px));">
        <n-empty-state
          [icon]="icon"
          [title]="title"
          [description]="description"
          [variant]="variant"
          [orientation]="orientation"
        >
          <n-button variant="gemini" size="sm">
            <n-icon name="plus" size="sm" />
            Import Video
          </n-button>
        </n-empty-state>
      </div>
    `,
  }),
};

export const DesignSystem: Story = {
  render: () => ({
    template: `
      <div class="n-story-empty-grid">
        <n-empty-state
          variant="primary"
          icon="film"
          title="No videos yet"
          description="Import a video file to start enhancing with AI upscaling"
        >
          <n-button variant="gemini" size="sm">
            <n-icon name="plus" size="sm" />
            Import Video
          </n-button>
        </n-empty-state>

        <n-empty-state
          variant="neutral"
          icon="search-x"
          title="No results found"
          description='Nothing matches "anime" — try a different keyword'
        >
          <n-button variant="ghost" size="sm">Clear Search</n-button>
        </n-empty-state>

        <n-empty-state
          variant="error"
          icon="wifi-off"
          title="Connection lost"
          description="Can't reach GPU server — check your network and try again"
        >
          <n-button variant="ghost" size="sm">
            <n-icon name="rotate-ccw" size="sm" />
            Retry
          </n-button>
        </n-empty-state>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-empty-grid">
        <n-empty-state
          variant="primary"
          icon="upload"
          title="Primary"
          description="Queue vacío con CTA de acción principal."
        >
          <n-button variant="gemini" size="sm">Add item</n-button>
        </n-empty-state>

        <n-empty-state
          variant="neutral"
          icon="search"
          title="Neutral"
          description="Sin resultados o estado informativo."
        >
          <n-button variant="ghost" size="sm">Clear filters</n-button>
        </n-empty-state>

        <n-empty-state
          variant="error"
          icon="wifi-off"
          title="Error"
          description="Fallo de conexión o estado de error recuperable."
        >
          <n-button variant="ghost" size="sm">Retry</n-button>
        </n-empty-state>
      </div>
    `,
  }),
};

export const Horizontal: Story = {
  render: () => ({
    template: `
      <div style="width: min(620px, calc(100vw - 48px));">
        <n-empty-state
          variant="neutral"
          icon="search-x"
          title="No results found"
          description="Try adjusting your filters or search terms."
          orientation="horizontal"
        >
          <n-button variant="ghost" size="sm">Clear filters</n-button>
        </n-empty-state>
      </div>
    `,
  }),
};

export const WithoutActions: Story = {
  render: () => ({
    template: `
      <div style="width: min(280px, calc(100vw - 48px));">
        <n-empty-state
          variant="neutral"
          icon="archive"
          title="Archive is empty"
          description="Completed jobs older than 30 days appear here."
        />
      </div>
    `,
  }),
};

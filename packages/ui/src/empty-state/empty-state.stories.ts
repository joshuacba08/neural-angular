import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NButton } from '../button/button.component.js';
import { NIcon } from '../icon/icon.component.js';
import { NEmptyState } from './empty-state.component.js';

const meta: Meta<NEmptyState> = {
  title: 'Components/Empty State',
  component: NEmptyState,
  decorators: [
    moduleMetadata({
      imports: [NEmptyState, NButton, NIcon],
    }),
  ],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
    },
  },
  args: {
    icon: 'upload',
    title: 'No media yet',
    description: 'Drop videos or images to start your first enhancement job.',
    orientation: 'vertical',
  },
};

export default meta;

type Story = StoryObj<NEmptyState>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: min(560px, calc(100vw - 48px));">
        <n-empty-state
          [icon]="icon"
          [title]="title"
          [description]="description"
          [orientation]="orientation"
        >
          <n-button size="sm">
            <n-icon name="plus" size="sm" />
            Add media
          </n-button>
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
          icon="search"
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
      <div style="width: min(560px, calc(100vw - 48px));">
        <n-empty-state
          icon="archive"
          title="Archive is empty"
          description="Completed jobs older than 30 days appear here."
        />
      </div>
    `,
  }),
};

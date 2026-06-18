import { type Meta, type StoryObj } from '@storybook/angular';
import { NDropzone } from './dropzone.component';

const patternArgs = {
  accept: 'video/mp4,video/quicktime,video/webm',
  maxSize: 50 * 1024 * 1024,
  multiple: false,
  title: 'Drag video here or ',
  accentLabel: 'Browse Files',
  dragTitle: 'Drop to add video',
  icon: 'upload-cloud',
  variant: 'default' as const,
  files: [] as { name: string; size: number; type: string }[],
};

const renderPattern = (args: Record<string, unknown>) => ({
  props: args,
  template: `
    <div style="max-width: 400px">
      <n-dropzone
        [accept]="accept"
        [maxSize]="maxSize"
        [multiple]="multiple"
        [title]="title"
        [accentLabel]="accentLabel"
        [dragTitle]="dragTitle"
        [icon]="icon"
        [variant]="variant"
        [dragActive]="dragActive"
        [error]="error"
        [files]="files"
      ></n-dropzone>
    </div>
  `,
});

const meta: Meta<NDropzone> = {
  title: 'App Patterns/Dropzone',
  component: NDropzone,
  tags: ['!autodocs'],
  render: renderPattern,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'media'],
    },
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    dragActive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<NDropzone>;

export const Default: Story = {
  args: patternArgs,
};

export const DragOver: Story = {
  args: {
    ...patternArgs,
    dragActive: true,
  },
};

export const HasFile: Story = {
  args: {
    ...patternArgs,
    files: [{ name: 'Anime_Ep12.mp4', size: 883_000_000, type: 'video/mp4' }],
  },
};

export const Media: Story = {
  render: (args) => ({
    props: {
      ...args,
      ...patternArgs,
      variant: 'media',
      title: 'Drag video here',
      description: 'MP4, MOV, or WebM up to 50 MB.',
      multiple: true,
    },
    template: `
      <n-dropzone
        [accept]="accept"
        [maxSize]="maxSize"
        [multiple]="multiple"
        [title]="title"
        [description]="description"
        [browseLabel]="'Browse Files'"
        [icon]="icon"
        [variant]="variant"
        [files]="files"
      ></n-dropzone>
    `,
  }),
};

export const Error: Story = {
  args: {
    ...patternArgs,
    error: 'File exceeds the 50 MB limit.',
  },
};

export const Playground: Story = {
  args: patternArgs,
};

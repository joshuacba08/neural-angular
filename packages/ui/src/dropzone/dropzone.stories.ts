import { type Meta, type StoryObj } from '@storybook/angular';
import { NDropzone } from './dropzone.component';

const meta: Meta<NDropzone> = {
  title: 'App Patterns/Dropzone',
  component: NDropzone,
  tags: ['!autodocs'],
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
  },
};

export default meta;
type Story = StoryObj<NDropzone>;

export const Default: Story = {
  args: {
    accept: 'video/mp4',
    maxSize: 50 * 1024 * 1024,
    multiple: true,
    title: 'Drag video here',
    description: 'MP4, MOV, or WebM up to 50 MB.',
    browseLabel: 'Browse Files',
    icon: 'upload-cloud',
    variant: 'default',
  },
};

export const Media: Story = {
  args: {
    ...Default.args,
    variant: 'media',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: 'File exceeds the 50 MB limit.',
  },
};

export const Playground: Story = {
  args: Default.args,
};

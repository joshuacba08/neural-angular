import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NJobCard } from './job-card.component';
import { NAIPipeline } from '../ai-pipeline/ai-pipeline.component';

const meta: Meta<NJobCard> = {
  title: 'App Patterns/Job Card',
  component: NJobCard,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NAIPipeline],
    }),
  ],
};

export default meta;
type Story = StoryObj<NJobCard & { jobSteps: any[] }>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-job-card
        [title]="title"
        [subtitle]="subtitle"
        [status]="status"
        [statusType]="statusType"
        [progress]="progress"
        [progressLabel]="progressLabel"
      >
        <n-ai-pipeline [steps]="jobSteps"></n-ai-pipeline>
      </n-job-card>
    `,
  }),
  args: {
    title: 'Cinematic Short.mp4',
    subtitle: 'Real-ESRGAN x2 · 720p -> 4K · 08:44',
    status: 'AI Processing',
    statusType: 'primary',
    progress: 37,
    progressLabel: 'Processing frame 1,847 / 5,000',
    jobSteps: [
      { title: 'Import', status: 'success' },
      { title: 'Extract', status: 'success' },
      { title: 'Enhance', status: 'running' },
      { title: 'Encode', status: 'pending' },
      { title: 'Export', status: 'pending' },
    ],
  },
};

export const Playground: Story = {
  ...Default,
};

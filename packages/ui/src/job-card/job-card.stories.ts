import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NAIPipeline } from '../ai-pipeline/ai-pipeline.component';
import { NJobCard } from './job-card.component';

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
type Story = StoryObj<NJobCard & { jobSteps: unknown[] }>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 720px">
        <n-job-card
          [title]="title"
          [subtitle]="subtitle"
          [status]="status"
          [statusType]="statusType"
          [progress]="progress"
          [progressLabel]="progressLabel"
        >
          <n-ai-pipeline
            label="AI Pipeline"
            [steps]="jobSteps"
            orientation="horizontal"
            density="compact"
            [showProgress]="false"
            [showStatus]="false"
          ></n-ai-pipeline>
        </n-job-card>
      </div>
    `,
  }),
  args: {
    title: 'Cinematic Short.mp4',
    subtitle: 'Real-ESRGAN x2 · 720p → 4K · 08:44',
    status: 'AI Processing',
    statusType: 'primary',
    progress: 37,
    progressLabel: 'Processing frame 1,847 / 5,000',
    jobSteps: [
      { title: 'Import', icon: 'check', status: 'success' },
      { title: 'Extract', icon: 'check', status: 'success' },
      { title: 'Enhance', icon: 'sparkles', status: 'running' },
      { title: 'Encode', icon: 'archive', status: 'pending' },
      { title: 'Export', icon: 'download', status: 'pending' },
    ],
  },
};

export const Playground: Story = {
  ...Default,
};

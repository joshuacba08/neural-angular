import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NBadge } from '../badge/badge.component';
import { NProgress } from '../progress/progress.component';
import { NTimeline, NTimelineItem } from './timeline.component';

const meta: Meta<NTimeline> = {
  title: 'App Patterns/Timeline',
  component: NTimeline,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NTimelineItem, NBadge, NProgress],
    }),
  ],
};

export default meta;
type Story = StoryObj<NTimeline>;

export const ActivityFeed: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-timeline [density]="density" style="max-width: 500px">
        <n-timeline-item
          title="Export complete"
          description="Cinematic Short.mp4 · 4K · 8.2 GB saved"
          time="2m ago"
          icon="check"
          status="success"
          timeAlign="inline"
        >
          <n-badge variant="success" size="sm">Done</n-badge>
          <n-badge variant="neutral" size="sm">1h 42m</n-badge>
        </n-timeline-item>
        <n-timeline-item
          title="Enhancing frames"
          description="Anime Episode 12.mp4 · Frame 14,820 / 22,080"
          time="in progress"
          icon="sparkles"
          status="running"
          timeAlign="inline"
          [timeAccent]="true"
          [active]="true"
        >
          <n-progress
            [value]="67"
            variant="secondary"
            size="xs"
            [showValue]="false"
            style="max-width: 200px"
          ></n-progress>
        </n-timeline-item>
        <n-timeline-item
          title="GPU thermal warning"
          description="RTX 4070 reached 88°C — throttled to 80% clock"
          time="14m ago"
          icon="alert-circle"
          status="warning"
          timeAlign="inline"
        ></n-timeline-item>
        <n-timeline-item
          title="File imported"
          description="Anime Episode 12.mp4 · 4.1 GB · 22,080 frames"
          time="28m ago"
          icon="upload-cloud"
          status="neutral"
          timeAlign="inline"
        ></n-timeline-item>
        <n-timeline-item
          title="Job failed"
          description="Interview Footage.mp4 · VRAM out of memory"
          time="1h ago"
          icon="x"
          status="danger"
          timeAlign="inline"
        >
          <button
            type="button"
            style="font-family: var(--n-font-mono); font-size: 0.59375rem; padding: 3px 10px; border-radius: 999px; background: var(--n-color-danger-alpha-10); border: 1px solid rgba(234, 67, 53, 0.2); color: var(--n-color-danger); cursor: pointer;"
          >
            Retry
          </button>
        </n-timeline-item>
      </n-timeline>
    `,
  }),
  args: {
    density: 'comfortable',
  },
};

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-timeline [density]="density">
        <n-timeline-item
          title="Pipeline Scheduled"
          description="Job queued in local executor pool."
          time="21:10:05"
          status="success"
        ></n-timeline-item>
        <n-timeline-item
          title="Preprocessing"
          description="Extracting frames and analyzing scene complexity."
          time="21:10:08"
          status="success"
        ></n-timeline-item>
        <n-timeline-item
          title="Upscaling"
          description="Running Real-ESRGAN inference on GPU 0."
          time="21:12:45"
          status="running"
          [active]="true"
        ></n-timeline-item>
        <n-timeline-item
          title="Export Video"
          description="Waiting for upscale to complete."
          status="pending"
        ></n-timeline-item>
      </n-timeline>
    `,
  }),
  args: {
    density: 'comfortable',
  },
};

export const Compact: Story = {
  ...Default,
  args: {
    density: 'compact',
  },
};

export const Playground: Story = {
  ...ActivityFeed,
};

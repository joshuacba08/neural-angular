import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NStatCard } from './stat-card.component.js';

const framesSparkline = [22, 18, 20, 15, 16, 10, 8, 12, 6];
const vramSparkline = [18, 20, 16, 18, 12, 14, 10, 8, 6];
const jobsSparkline = [24, 22, 20, 17, 14, 11, 9, 7, 4];

const meta: Meta<NStatCard> = {
  title: 'App Patterns/Metrics',
  component: NStatCard,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NStatCard],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success'],
    },
    layout: {
      control: 'select',
      options: ['kpi', 'compact'],
    },
    size: {
      control: 'select',
      options: ['default', 'mini'],
    },
    deltaTone: {
      control: 'select',
      options: ['success', 'warning', 'neutral', 'danger'],
    },
    valueTone: {
      control: 'select',
      options: ['primary', 'accent', 'gemini', 'success', 'plain'],
    },
    sparklineVariant: {
      control: 'select',
      options: ['primary', 'accent', 'gemini'],
    },
  },
};

export default meta;

type Story = StoryObj<NStatCard>;

export const KpiGrid: Story = {
  render: () => ({
    props: { framesSparkline, vramSparkline, jobsSparkline },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;max-width:920px">
        <n-stat-card
          label="Frames / sec"
          value="18.4"
          description="vs 15.6 last job"
          delta="↑ 18%"
          deltaTone="success"
          valueTone="primary"
          variant="primary"
          [sparkline]="framesSparkline"
          sparklineVariant="primary"
        />
        <n-stat-card
          label="VRAM Peak"
          value="9.4"
          unit="GB"
          description="of 12 GB · 78%"
          delta="↑ 0.8 GB"
          deltaTone="warning"
          valueTone="accent"
          variant="secondary"
          [sparkline]="vramSparkline"
          sparklineVariant="accent"
        />
        <n-stat-card
          label="Jobs Completed"
          value="247"
          description="↑ 31 vs yesterday"
          delta="Today"
          deltaTone="success"
          valueTone="gemini"
          [sparkline]="jobsSparkline"
          sparklineVariant="gemini"
        />
        <n-stat-card
          label="Success Rate"
          value="99.2"
          unit="%"
          description="2 failures / 250 jobs"
          icon="shield"
          variant="success"
          valueTone="success"
          [progress]="99.2"
        />
      </div>
    `,
  }),
};

export const BeforeAfter: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:440px">
        <div style="padding:18px;border-radius:12px;background:var(--n-surface-2);border:1px solid var(--n-border-0)">
          <div style="font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--n-text-4);margin-bottom:10px">Before</div>
          <div style="font-family:var(--n-font-mono);font-size:26px;font-weight:700;color:rgba(255,255,255,.28);letter-spacing:-.03em;margin-bottom:4px">1080p</div>
          <div style="font-size:11px;color:var(--n-text-4)">2.4 GB · 15:21</div>
        </div>
        <div style="padding:18px;border-radius:12px;border:1px solid transparent;background:linear-gradient(var(--n-surface-2),var(--n-surface-2)) padding-box,var(--n-gradient-border) border-box;box-shadow:var(--n-glow-gradient-sm)">
          <div style="font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;margin-bottom:10px;background:var(--n-gradient-gemini);background-clip:text;-webkit-background-clip:text;color:transparent;-webkit-text-fill-color:transparent">After</div>
          <div style="font-family:var(--n-font-mono);font-size:26px;font-weight:700;background:var(--n-gradient-gemini);background-clip:text;-webkit-background-clip:text;color:transparent;-webkit-text-fill-color:transparent;letter-spacing:-.03em;margin-bottom:4px">4K UHD</div>
          <div style="font-size:11px;color:var(--n-text-3)">8.4 GB · 15:21</div>
        </div>
      </div>
    `,
  }),
};

export const Compact: Story = {
  args: {
    layout: 'compact',
    label: 'Tokens / día',
    value: '2.4M',
    description: 'Máx. 4M en el plan Pro',
    icon: 'zap',
    trend: 'up',
    trendValue: '18.4% vs. ayer',
    variant: 'default',
    size: 'default',
    interactive: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <n-stat-card
        [layout]="layout"
        [label]="label"
        [value]="value"
        [description]="description"
        [icon]="icon"
        [trend]="trend"
        [trendValue]="trendValue"
        [variant]="variant"
        [size]="size"
        [interactive]="interactive"
        style="max-width:220px"
      />
    `,
  }),
};

export const Mini: Story = {
  render: () => ({
    template: `
      <div class="n-story-mini-stat-grid" style="max-width:640px">
        <n-stat-card size="mini" variant="primary" label="Req / min" value="4,280" layout="compact" />
        <n-stat-card size="mini" variant="secondary" label="Cache hit" value="87.3%" layout="compact" />
        <n-stat-card size="mini" variant="default" label="Memoria" value="6.2 GB" layout="compact" />
      </div>
    `,
  }),
};

export const Playground: Story = {
  args: {
    label: 'Frames / sec',
    value: '18.4',
    description: 'vs 15.6 last job',
    delta: '↑ 18%',
    deltaTone: 'success',
    valueTone: 'primary',
    variant: 'primary',
    sparkline: framesSparkline,
    sparklineVariant: 'primary',
    layout: 'kpi',
    size: 'default',
  },
  render: (args) => ({
    props: args,
    template: `
      <n-stat-card
        [layout]="layout"
        [label]="label"
        [value]="value"
        [unit]="unit"
        [description]="description"
        [delta]="delta"
        [deltaTone]="deltaTone"
        [valueTone]="valueTone"
        [variant]="variant"
        [size]="size"
        [sparkline]="sparkline"
        [sparklineVariant]="sparklineVariant"
        [progress]="progress"
        style="max-width:220px"
      />
    `,
  }),
};

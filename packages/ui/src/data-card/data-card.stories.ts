import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NBadge } from '../badge/badge.component.js';
import { NIcon } from '../icon/icon.component.js';
import { NBarChart } from './bar-chart.component.js';
import { NDataCard } from './data-card.component.js';
import { NDonutChart } from './donut-chart.component.js';
import { NSparkline } from './sparkline.component.js';
import { NECharts } from './echarts.component.js';

const meta: Meta<NDataCard> = {
  title: 'Display & FX/Data Card',
  component: NDataCard,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NDataCard, NBarChart, NDonutChart, NSparkline, NECharts, NBadge, NIcon],
    }),
  ],
  argTypes: {
    variant: {
      description: 'The visual surface variant of the data card.',
      control: 'select',
      options: ['default', 'outlined', 'gradient'],
      table: {
        category: 'Appearance',
        type: { summary: "'default' | 'outlined' | 'gradient'" },
        defaultValue: { summary: 'default' },
      },
    },
    density: {
      description: 'Padding and spacing layout density.',
      control: 'inline-radio',
      options: ['comfortable', 'compact'],
      table: {
        category: 'Layout',
        type: { summary: "'comfortable' | 'compact'" },
        defaultValue: { summary: 'comfortable' },
      },
    },
    title: {
      control: 'text',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      table: { category: 'Content' },
    },
    icon: {
      control: 'text',
      table: { category: 'Content' },
    },
    interactive: {
      control: 'boolean',
      table: { category: 'Behavior' },
    },
  },
  args: {
    title: 'Real-ESRGAN x4',
    description: 'Video enhancement model',
    icon: 'sparkles',
    variant: 'default',
    density: 'comfortable',
    interactive: false,
    items: [
      { label: 'Version', value: 'v1.2', status: 'success' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Scale', value: '4x' },
    ],
  },
};

export default meta;

type Story = StoryObj<NDataCard>;

export const Playground: Story = {
  args: {
    title: 'Model Info',
    description: 'Active deployment metrics',
    icon: 'info',
    variant: 'default',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: min(340px, calc(100vw - 48px));">
        <n-data-card
          [title]="title"
          [description]="description"
          [icon]="icon"
          [variant]="variant"
          [density]="density"
          [interactive]="interactive"
          [items]="items"
        />
      </div>
    `,
  }),
};

export const Basic: Story = {
  render: () => ({
    template: `
      <div style="width: min(340px, calc(100vw - 48px));">
        <n-data-card
          title="Real-ESRGAN x4"
          description="Video enhancement model"
          icon="sparkles"
          [items]="[
            { label: 'Status', value: 'Active', status: 'success' },
            { label: 'Size', value: '2.3 GB' },
            { label: 'VRAM Required', value: '8 GB', status: 'warning' },
            { label: 'Version', value: 'v1.2' }
          ]"
        />
      </div>
    `,
  }),
};

export const BarChartGpuHistory: Story = {
  render: () => ({
    props: {
      gpuData: [55, 70, 100, 72, 60, 100, 85, 68, 100, 80, 58, 100, 75, 100, 85, 100],
      labels: { start: '−2 min', end: 'now' },
    },
    template: `
      <div style="width: min(600px, calc(100vw - 48px));">
        <n-data-card variant="gradient">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px;">
            <div>
              <div style="font-size: 11.5px; color: var(--n-text-3); margin-bottom: 5px;">
                GPU Utilization &middot; Last 16 ticks
              </div>
              <div style="font-family: var(--n-font-mono); font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #4285F4 0%, #7B5CF6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -.03em; line-height: 1;">
                82%
              </div>
            </div>
            <n-badge variant="success" [dot]="true">Active</n-badge>
          </div>

          <n-bar-chart [data]="gpuData" [labels]="labels" />
        </n-data-card>
      </div>
    `,
  }),
};

export const DonutVramDistribution: Story = {
  render: () => ({
    props: {
      vramSegments: [
        { label: 'Model Active', value: 78, displayValue: '9.4 GB', color: 'blue-violet' },
        { label: 'Overhead', value: 10, displayValue: '1.2 GB', color: 'violet-pink' },
        { label: 'Free', value: 12, displayValue: '1.4 GB', color: 'neutral' },
      ],
    },
    template: `
      <div style="width: min(420px, calc(100vw - 48px));">
        <n-data-card variant="gradient">
          <n-donut-chart
            [segments]="vramSegments"
            centerValue="12 GB"
            centerLabel="VRAM"
          />
        </n-data-card>
      </div>
    `,
  }),
};

export const SparklineMetrics: Story = {
  render: () => ({
    props: {
      data1: [22, 18, 20, 15, 16, 10, 8, 12, 6],
      data2: [18, 20, 16, 18, 12, 14, 10, 8, 6],
      data3: [24, 22, 20, 17, 14, 11, 9, 7, 4],
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; width: 100%;">
        <!-- Sparkline 1 -->
        <n-data-card variant="gradient">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 11.5px; color: var(--n-text-3);">Frames / sec</span>
            <n-badge variant="success">↑ 18%</n-badge>
          </div>
          <div style="font-family: var(--n-font-mono); font-size: 34px; font-weight: 700; letter-spacing: -.04em; background: linear-gradient(135deg, #4285F4 0%, #7B5CF6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; margin-bottom: 4px;">
            18.4
          </div>
          <div style="font-size: 11px; color: var(--n-text-3); margin-bottom: 10px;">vs 15.6 last job</div>
          <n-sparkline [points]="data1" variant="primary" />
        </n-data-card>

        <!-- Sparkline 2 -->
        <n-data-card variant="gradient">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 11.5px; color: var(--n-text-3);">VRAM Peak</span>
            <n-badge variant="warning">↑ 0.8 GB</n-badge>
          </div>
          <div style="font-family: var(--n-font-mono); font-size: 34px; font-weight: 700; letter-spacing: -.04em; background: linear-gradient(135deg, #7B5CF6 0%, #D946EF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; margin-bottom: 4px;">
            9.4<span style="font-size: 18px; font-weight: 500;">GB</span>
          </div>
          <div style="font-size: 11px; color: var(--n-text-3); margin-bottom: 10px;">of 12 GB &middot; 78%</div>
          <n-sparkline [points]="data2" variant="accent" />
        </n-data-card>

        <!-- Sparkline 3 -->
        <n-data-card variant="gradient">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-size: 11.5px; color: var(--n-text-3);">Jobs Completed</span>
            <n-badge variant="success">Today</n-badge>
          </div>
          <div style="font-family: var(--n-font-mono); font-size: 34px; font-weight: 700; letter-spacing: -.04em; background: linear-gradient(135deg, #4F8EFF 0%, #F43F5E 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; margin-bottom: 4px;">
            247
          </div>
          <div style="font-size: 11px; color: var(--n-text-3); margin-bottom: 10px;">↑ 31 vs yesterday</div>
          <n-sparkline [points]="data3" variant="gemini" />
        </n-data-card>
      </div>
    `,
  }),
};

export const EChartsGpuHistory: Story = {
  render: () => ({
    props: {
      chartOptions: {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        grid: {
          top: '10px',
          bottom: '20px',
          left: '10px',
          right: '10px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: 'rgba(255, 255, 255, 0.3)', fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.04)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.3)', fontSize: 10 }
        },
        series: [
          {
            name: 'GPU %',
            type: 'bar',
            barWidth: '60%',
            data: [55, 70, 95, 72, 60, 98, 85, 68, 92, 80, 58, 96, 75, 99, 85, 82],
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#4285F4' },
                  { offset: 1, color: 'rgba(66, 133, 244, 0.1)' }
                ]
              },
              borderRadius: [4, 4, 0, 0]
            }
          }
        ]
      }
    },
    template: `
      <div style="width: min(600px, calc(100vw - 48px));">
        <n-data-card variant="gradient">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px;">
            <div>
              <div style="font-size: 11.5px; color: var(--n-text-3); margin-bottom: 5px;">
                GPU Utilization &middot; Interactive ECharts
              </div>
              <div style="font-family: var(--n-font-mono); font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #4285F4 0%, #7B5CF6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -.03em; line-height: 1;">
                82%
              </div>
            </div>
            <n-badge variant="success" [dot]="true">Active</n-badge>
          </div>

          <n-echarts [options]="chartOptions" height="150px" />
        </n-data-card>
      </div>
    `,
  }),
};


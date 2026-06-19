import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { NOrgChart, NOrgChartNodeComponent } from './org-chart.component.js';

const pipelineData = [
  {
    label: 'AI Pipeline',
    role: 'Master Controller',
    inlineStyle:
      'background:linear-gradient(var(--nn-surface-2),var(--nn-surface-2)) padding-box,var(--nn-border-grad) border-box;border:1px solid transparent;box-shadow:var(--nn-glow-g-sm)',
    labelStyle:
      'background:var(--nn-grad-g);-webkit-background-clip:text;-webkit-text-fill-color:transparent',
    layout: 'horizontal' as const,
    children: [
      {
        label: 'Import',
        role: 'File reader',
        layout: 'vertical' as const,
        children: [
          {
            label: 'Decode',
            role: 'FFmpeg',
            inlineStyle:
              'background:linear-gradient(var(--nn-surface-2),var(--nn-surface-2)) padding-box,var(--nn-border-grad-b) border-box;border:1px solid transparent',
          },
        ],
      },
      {
        label: 'Enhance',
        role: 'Real-ESRGAN',
        inlineStyle:
          'background:linear-gradient(var(--nn-surface-2),var(--nn-surface-2)) padding-box,var(--nn-border-grad-b) border-box;border:1px solid transparent;box-shadow:var(--nn-glow-teal-xs)',
        labelStyle: 'color:var(--nn-blue-bright)',
        layout: 'vertical' as const,
        children: [
          {
            label: 'Denoise',
            role: 'Post-process',
            inlineStyle:
              'background:linear-gradient(var(--nn-surface-2),var(--nn-surface-2)) padding-box,var(--nn-border-grad-v) border-box;border:1px solid transparent',
          },
        ],
      },
      {
        label: 'Encode',
        role: 'H.265 · NVENC',
        layout: 'vertical' as const,
        children: [
          {
            label: 'Export',
            role: 'File writer',
          },
        ],
      },
    ],
  },
];

const meta: Meta<NOrgChart> = {
  title: 'Data Display/OrgChart',
  component: NOrgChart,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NOrgChart, NOrgChartNodeComponent],
    }),
  ],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of NOrgChartNode objects representing the hierarchical structure.',
    },
    boxSpacing: {
      control: { type: 'range', min: 8, max: 48, step: 2 },
      description: 'Horizontal padding per branch column (px); gap between siblings is 2× this value.',
    },
    levelGap: {
      control: { type: 'range', min: 12, max: 40, step: 2 },
      description: 'Vertical connector length between hierarchy levels (px).',
    },
    childGap: {
      control: { type: 'range', min: 8, max: 32, step: 2 },
      description: 'Vertical gap in single-child chains (px).',
    },
  },
  args: {
    boxSpacing: 22,
    levelGap: 20,
    childGap: 18,
  },
};

export default meta;
type Story = StoryObj<NOrgChart>;

export const DesignSystem: Story = {
  args: {
    data: pipelineData,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="overflow-x:auto; padding: 20px;">
        <n-org-chart
          [data]="data"
          [boxSpacing]="boxSpacing"
          [levelGap]="levelGap"
          [childGap]="childGap"
        />
      </div>
    `,
  }),
};

export const Playground: Story = {
  args: {
    data: [
      {
        label: 'Root Node',
        role: 'Director',
        layout: 'horizontal',
        children: [
          {
            label: 'Child A',
            role: 'Manager',
            layout: 'vertical',
            children: [{ label: 'Team A1', role: 'Lead' }],
          },
          {
            label: 'Child B',
            role: 'Manager',
            layout: 'vertical',
            children: [{ label: 'Team B1', role: 'Lead' }],
          },
        ],
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="overflow-x:auto; padding: 20px;">
        <n-org-chart
          [data]="data"
          [boxSpacing]="boxSpacing"
          [levelGap]="levelGap"
          [childGap]="childGap"
        />
      </div>
    `,
  }),
};

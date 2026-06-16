import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NStatCard } from './stat-card.component.js';

const meta: Meta<NStatCard> = {
  title: 'Components/Stat Card',
  component: NStatCard,
  decorators: [
    moduleMetadata({
      imports: [NStatCard],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
  },
  args: {
    label: 'Tokens procesados',
    value: '2.4M',
    trend: 'up',
    trendValue: '18.2%',
    variant: 'default',
    interactive: false,
  },
};

export default meta;

type Story = StoryObj<NStatCard>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-stat-card
        [label]="label"
        [value]="value"
        [trend]="trend"
        [trendValue]="trendValue"
        [variant]="variant"
        [interactive]="interactive"
        style="max-width:220px"
      />
    `,
  }),
};

export const DesignSystem: Story = {
  render: () => ({
    template: `
      <div class="n-story-stat-grid">
        <n-stat-card
          label="Tokens procesados"
          value="2.4M"
          trend="up"
          trendValue="18.2%"
          [interactive]="true"
        />
        <n-stat-card
          label="Latencia media"
          value="820ms"
          trend="up"
          trendValue="31% mejora"
          [interactive]="true"
        />
        <n-stat-card
          label="Agentes activos"
          value="348"
          trend="neutral"
          trendValue="sin cambio"
          [interactive]="true"
        />
        <n-stat-card
          label="Tasa de éxito"
          value="99.2%"
          trend="up"
          trendValue="0.3pp"
          [interactive]="true"
        />
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    template: `
      <n-stat-card
        label="GPU usage"
        value="82%"
        description="Peak during last render"
        icon="cpu"
        trend="up"
        trendValue="12%"
        style="max-width:260px"
      />
    `,
  }),
};

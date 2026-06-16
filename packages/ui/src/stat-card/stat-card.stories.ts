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
    size: {
      control: 'select',
      options: ['default', 'mini'],
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
  },
  args: {
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
        [description]="description"
        [icon]="icon"
        [trend]="trend"
        [trendValue]="trendValue"
        [variant]="variant"
        [size]="size"
        style="max-width:220px"
      />
    `,
  }),
};

export const Basic: Story = {
  args: {
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

export const DesignSystem: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:28px;max-width:920px">
        <section>
          <p class="n-story-section-label">KPI Grid</p>
          <div class="n-story-stat-grid">
            <n-stat-card
              label="Tokens / día"
              value="2.4M"
              icon="zap"
              trend="up"
              trendValue="18.4% vs. ayer"
              description="Máx. 4M en el plan Pro"
              [interactive]="true"
            />
            <n-stat-card
              label="Latencia media"
              value="820ms"
              icon="clock-3"
              trend="up"
              trendValue="31% mejora"
              description="P95: 1.4s"
              [interactive]="true"
            />
            <n-stat-card
              label="Agentes activos"
              value="348"
              icon="sparkles"
              trend="neutral"
              trendValue="sin cambio"
              description="+12 esta semana"
              [interactive]="true"
            />
            <n-stat-card
              label="Tasa de éxito"
              value="99.2%"
              icon="circle-check"
              trend="up"
              trendValue="0.3pp"
              description="Meta: 99.5%"
              [interactive]="true"
            />
          </div>
        </section>

        <section>
          <p class="n-story-section-label">Mini Stats · Inline</p>
          <div class="n-story-mini-stat-grid">
            <n-stat-card size="mini" variant="primary" label="Req / min" value="4,280" />
            <n-stat-card size="mini" variant="secondary" label="Cache hit" value="87.3%" />
            <n-stat-card size="mini" variant="default" label="Memoria" value="6.2 GB" />
            <n-stat-card size="mini" variant="primary" label="Uptime" value="99.9%" />
            <n-stat-card size="mini" variant="secondary" label="Colas" value="142" />
            <n-stat-card size="mini" variant="default" label="Errores" value="12" />
          </div>
        </section>
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

export const Mini: Story = {
  render: () => ({
    template: `
      <div class="n-story-mini-stat-grid" style="max-width:640px">
        <n-stat-card size="mini" variant="primary" label="Req / min" value="4,280" />
        <n-stat-card size="mini" variant="secondary" label="Cache hit" value="87.3%" />
        <n-stat-card size="mini" variant="default" label="Memoria" value="6.2 GB" />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-stat-grid">
        <n-stat-card label="Default" value="128" variant="default" icon="activity" />
        <n-stat-card label="Primary" value="128" variant="primary" icon="activity" />
        <n-stat-card label="Secondary" value="128" variant="secondary" icon="activity" />
      </div>
    `,
  }),
};

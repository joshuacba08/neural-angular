import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NBadge } from '../badge/badge.component.js';
import { NButton } from '../button/button.component.js';
import { NIcon } from '../icon/icon.component.js';
import {
  NCard,
  NCardContent,
  NCardDescription,
  NCardFooter,
  NCardHeader,
  NCardIcon,
  NCardMeta,
  NCardRow,
  NCardRowAvatar,
  NCardRowBody,
  NCardRowSubtitle,
  NCardRowTitle,
  NCardRowTrailing,
  NCardTitle,
} from './card.component.js';

const meta: Meta<NCard> = {
  title: 'Components/Card',
  component: NCard,
  decorators: [
    moduleMetadata({
      imports: [
        NBadge,
        NButton,
        NCard,
        NCardContent,
        NCardDescription,
        NCardFooter,
        NCardHeader,
        NCardIcon,
        NCardMeta,
        NCardRow,
        NCardRowAvatar,
        NCardRowBody,
        NCardRowSubtitle,
        NCardRowTitle,
        NCardRowTrailing,
        NCardTitle,
        NIcon,
      ],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'gradient', 'elevated', 'outlined'],
    },
  },
  args: {
    variant: 'default',
    interactive: false,
  },
};

export default meta;

type Story = StoryObj<NCard>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <n-card [variant]="variant" [interactive]="interactive" class="n-story-card">
        <n-card-header>
          <n-card-title>Render pipeline</n-card-title>
          <n-card-description>Current state of the enhancement queue.</n-card-description>
        </n-card-header>
        <n-card-content>
          <div class="n-story-metric">
            <span class="n-story-metric__value">68%</span>
            <n-badge variant="success">Running</n-badge>
          </div>
        </n-card-content>
        <n-card-footer>
          <n-button size="sm">Open</n-button>
          <n-button variant="ghost" size="sm">Details</n-button>
        </n-card-footer>
      </n-card>
    `,
  }),
};

export const DesignSystem: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:28px;max-width:760px">
        <section>
          <p class="n-story-eyebrow">Card Variants</p>
          <div class="n-story-card-grid">
            <n-card [interactive]="true">
              <n-card-icon accent="gemini">
                <n-icon name="zap" size="md" />
              </n-card-icon>
              <n-card-title>Neural Agent</n-card-title>
              <n-card-content>
                Contexto extendido de 2M tokens. Respuesta en tiempo real con streaming.
              </n-card-content>
              <n-card-meta accent="primary">Gemini full gradient</n-card-meta>
            </n-card>

            <n-card variant="primary" [interactive]="true">
              <n-card-icon accent="primary">
                <n-icon name="eye" size="md" />
              </n-card-icon>
              <n-card-title>Vision Model</n-card-title>
              <n-card-content>
                Análisis multimodal de imágenes, video y documentos.
              </n-card-content>
              <n-card-meta accent="primary">Blue → Violet</n-card-meta>
            </n-card>

            <n-card variant="secondary" [interactive]="true">
              <n-card-icon accent="secondary">
                <n-icon name="code" size="md" />
              </n-card-icon>
              <n-card-title>Code Assistant</n-card-title>
              <n-card-content>
                Generación y revisión de código en 40+ lenguajes.
              </n-card-content>
              <n-card-meta accent="secondary">Violet → Pink</n-card-meta>
            </n-card>
          </div>
        </section>

        <section>
          <p class="n-story-eyebrow">Horizontal List Item</p>
          <div style="display:flex;flex-direction:column;gap:8px">
            <n-card-row variant="primary">
              <n-card-row-avatar accent="primary">A</n-card-row-avatar>
              <n-card-row-body>
                <n-card-row-title>Asesor Financiero AI</n-card-row-title>
                <n-card-row-subtitle>Especialista en análisis de mercados</n-card-row-subtitle>
              </n-card-row-body>
              <n-card-row-trailing>
                <n-badge variant="success">Activo</n-badge>
              </n-card-row-trailing>
            </n-card-row>

            <n-card-row variant="secondary">
              <n-card-row-avatar accent="secondary">S</n-card-row-avatar>
              <n-card-row-body>
                <n-card-row-title>Software Engineer AI</n-card-row-title>
                <n-card-row-subtitle>Generación y revisión de código</n-card-row-subtitle>
              </n-card-row-body>
              <n-card-row-trailing>
                <n-badge variant="warning">Beta</n-badge>
              </n-card-row-trailing>
            </n-card-row>
          </div>
        </section>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="n-story-grid">
        <n-card>
          <n-card-title>Default</n-card-title>
          <n-card-content>Gradient border surface for product content.</n-card-content>
        </n-card>
        <n-card variant="primary">
          <n-card-title>Primary</n-card-title>
          <n-card-content>Blue → violet gradient border.</n-card-content>
        </n-card>
        <n-card variant="secondary">
          <n-card-title>Secondary</n-card-title>
          <n-card-content>Violet → pink gradient border.</n-card-content>
        </n-card>
        <n-card variant="elevated">
          <n-card-title>Elevated</n-card-title>
          <n-card-content>Gradient border with raised elevation.</n-card-content>
        </n-card>
        <n-card variant="outlined">
          <n-card-title>Outlined</n-card-title>
          <n-card-content>Low emphasis container for secondary content.</n-card-content>
        </n-card>
      </div>
    `,
  }),
};

export const Composition: Story = {
  render: () => ({
    template: `
      <n-card [interactive]="true" class="n-story-card">
        <n-card-icon accent="gemini">
          <n-icon name="cpu" size="md" />
        </n-card-icon>
        <n-card-header>
          <n-card-title>Neural worker</n-card-title>
          <n-card-description>GPU queue, model status and export readiness.</n-card-description>
        </n-card-header>
        <n-card-content>
          <div class="n-story-list">
            <span>Model <strong>Real-ESRGAN x4</strong></span>
            <span>VRAM <strong>4.2 GB</strong></span>
            <span>Status <strong>Ready</strong></span>
          </div>
        </n-card-content>
        <n-card-footer>
          <n-button size="sm">
            <n-icon name="play" size="sm" />
            Start
          </n-button>
          <n-button variant="ghost" size="sm">Configure</n-button>
        </n-card-footer>
      </n-card>
    `,
  }),
};

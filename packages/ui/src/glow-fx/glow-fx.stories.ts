import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NIcon } from '../icon/icon.component.js';
import { NGlowCard } from './glow-card.component.js';
import { NGradientRing } from './gradient-ring.component.js';

const cardTitle = 'font-size:13px;font-weight:600;margin:0 0 4px;position:relative';
const cardMeta = 'font-size:12px;color:var(--n-text-3);margin:0;position:relative';

const meta: Meta = {
  title: 'Display & FX/Glow & FX',
  decorators: [
    moduleMetadata({
      imports: [NGlowCard, NGradientRing, NIcon],
    }),
  ],
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj;

export const GlowCards: Story = {
  name: 'Glow Cards',
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px;max-width:920px">
        <n-glow-card variant="blue">
          <div style="${cardTitle}">Blue Orb</div>
          <p style="${cardMeta}">Primary · top-right</p>
        </n-glow-card>

        <n-glow-card variant="pink">
          <div style="${cardTitle}">Pink Orb</div>
          <p style="${cardMeta}">Tertiary · bottom-left</p>
        </n-glow-card>

        <n-glow-card variant="gemini">
          <div class="n-glow-text-gemini" style="${cardTitle}">Gemini Glow</div>
          <p style="${cardMeta}">Full gradient + box-shadow</p>
        </n-glow-card>
      </div>
    `,
  }),
};

export const GradientTextScale: Story = {
  name: 'Gradient Text Scale',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:10px;max-width:640px">
        <div class="n-glow-text-gemini" style="font-size:36px;font-weight:800;letter-spacing:-.04em;line-height:1.1">
          Gemini 4-Stop Full
        </div>
        <div class="n-glow-text-blue-v" style="font-size:26px;font-weight:700;letter-spacing:-.03em;line-height:1.1">
          Blue → Violet
        </div>
        <div class="n-glow-text-v-pink" style="font-size:26px;font-weight:600;letter-spacing:-.02em;line-height:1.1;font-size:20px">
          Violet → Pink
        </div>
        <div class="n-glow-text-white-fade" style="font-size:15px;font-weight:500">
          White Fade · secondary body text
        </div>
      </div>
    `,
  }),
};

export const NeonBorders: Story = {
  name: 'Neon Borders',
  render: () => ({
    template: `
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
        <span class="n-neon-chip n-neon-chip--blue">Blue glow</span>
        <span class="n-neon-chip n-neon-chip--violet">Violet glow</span>
        <span class="n-neon-chip n-neon-chip--gemini"><span class="n-neon-chip__label">Gemini</span></span>
        <span class="n-neon-chip n-neon-chip--success">Success glow</span>
        <span class="n-neon-chip n-neon-chip--error">Error glow</span>
      </div>
    `,
  }),
};

export const GradientRings: Story = {
  name: 'Animated Gradient Ring',
  render: () => ({
    template: `
      <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;max-width:920px">
        <n-gradient-ring size="80px" innerSize="66px">
          <n-icon name="sparkles" size="md" style="color:rgba(255,255,255,.72)" />
        </n-gradient-ring>

        <n-gradient-ring size="64px" innerSize="52px">
          <n-icon name="cpu" size="sm" style="color:rgba(255,255,255,.72)" />
        </n-gradient-ring>

        <n-gradient-ring size="52px" innerSize="40px">
          <span style="font-family:var(--n-font-mono);font-size:10px;color:rgba(255,255,255,.7);font-weight:600">AI</span>
        </n-gradient-ring>

        <p style="font-size:12.5px;color:var(--n-text-3);max-width:220px;line-height:1.68;margin:0">
          Animated via <code style="font-family:var(--n-font-mono);font-size:11px">conic-gradient</code>
          + <code style="font-family:var(--n-font-mono);font-size:11px">@keyframes</code> rotate.
          Ideal para status activo de modelos AI y avatares de agente.
        </p>
      </div>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Foundation/Tokens',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

const colorTokens = [
  ['Primary', '--n-color-primary', 'Primary actions, focus, active accents'],
  ['Primary Bright', '--n-color-primary-bright', 'Interactive text and vivid highlights'],
  ['Secondary', '--n-color-secondary', 'Supporting accent and tonal states'],
  ['Tertiary', '--n-color-tertiary', 'Expressive accent and decorative emphasis'],
  ['Success', '--n-color-success', 'Completed, healthy, online states'],
  ['Warning', '--n-color-warning', 'Queued, beta, caution states'],
  ['Danger', '--n-color-danger', 'Errors, destructive actions'],
  ['Info', '--n-color-info', 'Informational banners and badges'],
] as const;

const surfaceTokens = [
  ['Canvas', '--n-bg-canvas', 'Application background and deepest backdrop'],
  ['Base', '--n-bg-base', 'Primary shell background'],
  ['Surface 1', '--n-surface-1', 'Main card and panel surface'],
  ['Surface 2', '--n-surface-2', 'Elevated secondary panels'],
  ['Surface 3', '--n-surface-3', 'Inputs, previews, rich controls'],
  ['Surface 4', '--n-surface-4', 'Highest local surface contrast'],
] as const;

const textTokens = [
  ['Text 1', '--n-text-1', 'Primary copy and strong labels'],
  ['Text 2', '--n-text-2', 'Secondary copy and metadata'],
  ['Text 3', '--n-text-3', 'Muted annotations and placeholders'],
  ['Text 4', '--n-text-4', 'Hairline contrast and disabled ink'],
] as const;

const radiusTokens = [
  ['XS', '--n-radius-xs', '4px'],
  ['SM', '--n-radius-sm', '8px'],
  ['MD', '--n-radius-md', '12px'],
  ['LG', '--n-radius-lg', '16px'],
  ['XL', '--n-radius-xl', '20px'],
  ['2XL', '--n-radius-2xl', '24px'],
  ['Full', '--n-radius-full', '9999px'],
] as const;

const motionTokens = [
  ['Fast', '--n-duration-fast', '150ms'],
  ['Base', '--n-duration-base', '250ms'],
  ['Slow', '--n-duration-slow', '350ms'],
  ['Standard', '--n-ease-standard', 'cubic-bezier(0.2, 0, 0, 1)'],
  ['Decelerate', '--n-ease-decelerate', 'cubic-bezier(0, 0, 0.2, 1)'],
  ['Spring', '--n-ease-spring', 'cubic-bezier(0.34, 1.56, 0.64, 1)'],
] as const;

const spaceTokens = [
  ['s1', '--nn-s1', '4px'],
  ['s2', '--nn-s2', '8px'],
  ['s3', '--nn-s3', '12px'],
  ['s4', '--nn-s4', '16px'],
  ['s5', '--nn-s5', '20px'],
  ['s6', '--nn-s6', '24px'],
  ['s8', '--nn-s8', '32px'],
  ['s10', '--nn-s10', '40px'],
  ['s12', '--nn-s12', '48px'],
  ['s14', '--nn-s14', '56px'],
  ['s16', '--nn-s16', '64px'],
  ['s20', '--nn-s20', '80px'],
  ['s24', '--nn-s24', '96px'],
  ['s32', '--nn-s32', '128px'],
] as const;


export const Overview: Story = {
  render: () => ({
    props: {
      colorTokens,
      surfaceTokens,
      textTokens,
    },
    template: `
      <section class="n-story-foundation">
        <header class="n-story-foundation__hero">
          <div>
            <p class="n-story-eyebrow">Foundation</p>
            <h1>Neural token system</h1>
            <p class="n-story-foundation__lede">
              One contract for color, spacing, motion, and surfaces across dashboards, AI tooling, and content-heavy product views.
            </p>
          </div>

          <div class="n-token-spec-grid">
            <article class="n-token-spec-card">
              <strong>12 groups</strong>
              <span>Color, surface, text, border, gradient, spacing, radius, type, glow, motion, elevation, z-index.</span>
            </article>
            <article class="n-token-spec-card">
              <strong>Dark-first</strong>
              <span>Built to preserve contrast, layering, and glow behavior across dense product surfaces.</span>
            </article>
            <article class="n-token-spec-card">
              <strong>System-wide</strong>
              <span>Shared by primitives, shells, overlays, tables, AI flows, and all semantic feedback states.</span>
            </article>
          </div>
        </header>

        <div class="n-story-token-section">
          <h2>Color</h2>
          <div class="n-story-token-grid">
            @for (token of colorTokens; track token[1]) {
              <article class="n-story-token">
                <span [style.background]="'var(' + token[1] + ')'"></span>
                <strong>{{ token[0] }}</strong>
                <code>{{ token[1] }}</code>
                <small>{{ token[2] }}</small>
              </article>
            }
          </div>
        </div>

        <div class="n-story-token-section">
          <h2>Surface</h2>
          <div class="n-story-token-grid">
            @for (token of surfaceTokens; track token[1]) {
              <article class="n-story-token">
                <span [style.background]="'var(' + token[1] + ')'"></span>
                <strong>{{ token[0] }}</strong>
                <code>{{ token[1] }}</code>
                <small>{{ token[2] }}</small>
              </article>
            }
          </div>
        </div>

        <div class="n-story-token-section">
          <h2>Text</h2>
          <div class="n-story-token-grid">
            @for (token of textTokens; track token[1]) {
              <article class="n-story-token n-story-token--ink">
                <span class="n-story-token__text-swatch" [style.color]="'var(' + token[1] + ')'">Ag</span>
                <strong>{{ token[0] }}</strong>
                <code>{{ token[1] }}</code>
                <small>{{ token[2] }}</small>
              </article>
            }
          </div>
        </div>
      </section>
    `,
  }),
};

export const SemanticUsage: Story = {
  render: () => ({
    template: `
      <section class="n-story-foundation">
        <header>
          <p class="n-story-eyebrow">Applied system</p>
          <h1>Tokens in context</h1>
        </header>

        <div class="n-token-ui-grid">
          <article class="n-token-ui-card">
            <div class="n-token-ui-card__header">
              <strong>Primary action</strong>
              <span>Gradient + glow</span>
            </div>
            <button class="n-token-demo-btn n-token-demo-btn--primary" type="button">Deploy model</button>
          </article>

          <article class="n-token-ui-card">
            <div class="n-token-ui-card__header">
              <strong>Surface hierarchy</strong>
              <span>Layered cards</span>
            </div>
            <div class="n-token-surface-stack">
              <div class="n-token-surface n-token-surface--1">Surface 1</div>
              <div class="n-token-surface n-token-surface--2">Surface 2</div>
              <div class="n-token-surface n-token-surface--3">Surface 3</div>
            </div>
          </article>

          <article class="n-token-ui-card">
            <div class="n-token-ui-card__header">
              <strong>Semantic states</strong>
              <span>Status ink</span>
            </div>
            <div class="n-token-state-list">
              <span class="n-token-state n-token-state--success">Healthy</span>
              <span class="n-token-state n-token-state--warning">Queued</span>
              <span class="n-token-state n-token-state--danger">Failed</span>
              <span class="n-token-state n-token-state--info">Synced</span>
            </div>
          </article>

          <article class="n-token-ui-card">
            <div class="n-token-ui-card__header">
              <strong>Readable density</strong>
              <span>Text ladder</span>
            </div>
            <div class="n-token-copy-stack">
              <p class="n-token-copy-stack__primary">Primary information stays crisp against deep surfaces.</p>
              <p class="n-token-copy-stack__secondary">Secondary detail steps back without disappearing.</p>
              <p class="n-token-copy-stack__tertiary">Muted annotation holds structure, spacing, and rhythm.</p>
            </div>
          </article>
        </div>
      </section>
    `,
  }),
};

export const GeometryAndDepth: Story = {
  render: () => ({
    props: {
      radiusTokens,
    },
    template: `
      <section class="n-story-foundation">
        <header>
          <p class="n-story-eyebrow">Geometry & Depth</p>
          <h1>Radius, elevation & card borders</h1>
        </header>

        <div style="display:flex; flex-direction:column; gap:40px; width:100%">
          <!-- Radius Scale -->
          <article class="n-token-geometry-card" style="width:100%">
            <h2>Radius scale</h2>
            <div class="n-token-radius-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(130px, 1fr)); gap:16px">
              @for (token of radiusTokens; track token[1]) {
                <div class="n-token-radius-item">
                  <span [style.borderRadius]="'var(' + token[1] + ')'"></span>
                  <strong>{{ token[0] }}</strong>
                  <code>{{ token[1] }}</code>
                  <small>{{ token[2] }}</small>
                </div>
              }
            </div>
          </article>

          <!-- Elevation Scale -->
          <article class="n-token-geometry-card" style="width:100%">
            <h2>Niveles de Elevación</h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); gap:14px">
              <div class="elev-card elev-0" style="background:var(--n-surface-1); border:1px solid var(--n-border-0); padding:20px 16px; border-radius:var(--n-radius-lg)">
                <div style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">elev-0</div>
                <div style="font-weight:600; font-size:14px; margin:4px 0">Level 0</div>
                <div style="font-size:11px; color:var(--n-text-3)">Sin sombra. Canvas, elementos flat.</div>
              </div>
              <div class="elev-card elev-1" style="background:var(--n-surface-1); border:1px solid var(--n-border-0); padding:20px 16px; border-radius:var(--n-radius-lg)">
                <div style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">elev-1</div>
                <div style="font-weight:600; font-size:14px; margin:4px 0">Level 1</div>
                <div style="font-size:11px; color:var(--n-text-3)">Chips, badges.</div>
              </div>
              <div class="elev-card elev-2" style="background:var(--n-surface-2); border:1px solid var(--n-border-0); padding:20px 16px; border-radius:var(--n-radius-lg)">
                <div style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">elev-2</div>
                <div style="font-weight:600; font-size:14px; margin:4px 0">Level 2</div>
                <div style="font-size:11px; color:var(--n-text-3)">Cards, paneles.</div>
              </div>
              <div class="elev-card elev-3" style="background:var(--n-surface-2); padding:20px 16px; border-radius:var(--n-radius-lg)">
                <div style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">elev-3</div>
                <div style="font-weight:600; font-size:14px; margin:4px 0">Level 3</div>
                <div style="font-size:11px; color:var(--n-text-3)">Dropdowns.</div>
              </div>
              <div class="elev-card elev-4" style="background:var(--n-surface-3); padding:20px 16px; border-radius:var(--n-radius-lg)">
                <div style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">elev-4</div>
                <div style="font-weight:600; font-size:14px; margin:4px 0">Level 4</div>
                <div style="font-size:11px; color:var(--n-text-3)">Modales, drawers.</div>
              </div>
              <div class="elev-card elev-5" style="background:var(--n-surface-4); padding:20px 16px; border-radius:var(--n-radius-lg)">
                <div style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">elev-5</div>
                <div style="font-weight:600; font-size:14px; margin:4px 0">Level 5</div>
                <div style="font-size:11px; color:var(--n-text-3)">Toasts, tooltips.</div>
              </div>
            </div>
          </article>

          <!-- Gradient Card Borders -->
          <article class="n-token-geometry-card" style="width:100%">
            <h2>Gradient Card Borders — Top Acento</h2>
            <p style="font-size:12px; color:var(--n-text-2); margin-bottom:16px">
              Los bordes de gradiente se implementan con padding-box / border-box. Los tres acentos del sistema.
            </p>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px">
              <div class="nn-card">
                <div style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">Gemini Gradient</div>
                <div style="font-weight:700; font-size:15px; margin:4px 0">nn-card</div>
                <div style="font-size:11px; color:var(--n-text-2)">Default. Componentes principales.</div>
              </div>
              <div class="nn-card bv">
                <div style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">Blue &rarr; Violet</div>
                <div style="font-weight:700; font-size:15px; margin:4px 0">nn-card--blue</div>
                <div style="font-size:11px; color:var(--n-text-2)">Información, analytics, secundario.</div>
              </div>
              <div class="nn-card vp">
                <div style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">Violet &rarr; Pink</div>
                <div style="font-weight:700; font-size:15px; margin:4px 0">nn-card--violet</div>
                <div style="font-size:11px; color:var(--n-text-2)">AI outputs, modelos especiales.</div>
              </div>
            </div>
          </article>

          <!-- Gradient Glow -->
          <article class="n-token-geometry-card" style="width:100%">
            <h2>Gradient Glow — Neural Highlight</h2>
            <div style="display:flex; flex-wrap:wrap; gap:20px; align-items:center; padding:10px 0">
              <div style="display:flex; flex-direction:column; align-items:center; gap:8px">
                <div class="glow-blue-md" style="width:36px; height:36px; border-radius:50%; background:var(--n-color-primary)"></div>
                <span style="font-family:var(--n-font-mono); font-size:9.5px; color:var(--n-text-3)">glow-blue-md</span>
              </div>
              <div style="display:flex; flex-direction:column; align-items:center; gap:8px">
                <div class="glow-violet-md" style="width:36px; height:36px; border-radius:50%; background:var(--n-color-secondary)"></div>
                <span style="font-family:var(--n-font-mono); font-size:9.5px; color:var(--n-text-3)">glow-violet-md</span>
              </div>
              <div style="display:flex; flex-direction:column; align-items:center; gap:8px">
                <div class="glow-pink-md" style="width:36px; height:36px; border-radius:50%; background:var(--n-color-tertiary)"></div>
                <span style="font-family:var(--n-font-mono); font-size:9.5px; color:var(--n-text-3)">glow-pink-md</span>
              </div>
              <div style="display:flex; flex-direction:column; align-items:center; gap:8px">
                <div class="glow-gemini" style="width:36px; height:36px; border-radius:50%; background:var(--n-gradient-gemini)"></div>
                <span style="font-family:var(--n-font-mono); font-size:9.5px; color:var(--n-text-3)">glow-gemini</span>
              </div>
              <div style="display:flex; flex-direction:column; align-items:center; gap:8px">
                <div class="glow-success" style="width:36px; height:36px; border-radius:50%; background:var(--n-color-success)"></div>
                <span style="font-family:var(--n-font-mono); font-size:9.5px; color:var(--n-text-3)">glow-success</span>
              </div>
              <div style="display:flex; flex-direction:column; align-items:center; gap:8px">
                <div class="glow-error" style="width:36px; height:36px; border-radius:50%; background:var(--n-color-danger)"></div>
                <span style="font-family:var(--n-font-mono); font-size:9.5px; color:var(--n-text-3)">glow-error</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    `,
  }),
};

export const MotionAndType: Story = {
  render: () => ({
    props: {
      motionTokens,
      spaceTokens,
    },
    template: `
      <section class="n-story-foundation">
        <header>
          <p class="n-story-eyebrow">Rhythm & Typography</p>
          <h1>Type, spacing & motion</h1>
        </header>

        <div style="display:flex; flex-direction:column; gap:40px; width:100%">
          <!-- Spacing Scale -->
          <article class="n-token-geometry-card" style="width:100%">
            <h2>Escala de Espaciado — 4px grid</h2>
            <div style="display:flex; flex-direction:column; gap:12px; max-width:600px; width:100%; margin-top:16px">
              @for (space of spaceTokens; track space[1]) {
                <div style="display:grid; grid-template-columns:80px 1fr 60px; align-items:center; gap:12px">
                  <span style="font-family:var(--n-font-mono); font-size:11px; color:var(--n-text-2)">{{ space[1] }}</span>
                  <div style="height:12px; background:var(--n-gradient-primary-secondary); border-radius:2px" [style.width]="space[2]"></div>
                  <span style="font-family:var(--n-font-mono); font-size:11px; color:var(--n-text-3); text-align:right">{{ space[2] }}</span>
                </div>
              }
            </div>
          </article>

          <!-- Typography Families -->
          <article class="n-token-geometry-card" style="width:100%">
            <h2>Familias Tipográficas</h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-top:16px">
              <!-- Plus Jakarta Sans -->
              <div style="border:1px solid var(--n-border-1); padding:20px; border-radius:var(--n-radius-lg); background:var(--n-surface-1)">
                <div style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">--nn-font-d / b · Plus Jakarta Sans</div>
                <div style="font-size:32px; font-weight:700; margin:10px 0; font-family:var(--n-font-display)">Aa Bb Cc</div>
                <div style="font-size:18px; font-weight:300; margin-bottom:10px; color:var(--n-text-2)">Thin · Light · Regular</div>
                <div style="font-size:12px; color:var(--n-text-3)">Display · Titulares · Body · Labels<br>Weights: 300 400 500 600 700 800</div>
              </div>
              <!-- JetBrains Mono -->
              <div style="border:1px solid var(--n-border-1); padding:20px; border-radius:var(--n-radius-lg); background:var(--n-surface-1)">
                <div style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">--nn-font-m · JetBrains Mono</div>
                <div style="font-size:32px; font-weight:700; margin:10px 0; font-family:var(--n-font-mono)">01 &lt;code&gt;</div>
                <div style="font-size:18px; font-weight:400; margin-bottom:10px; color:var(--n-text-2); font-family:var(--n-font-mono)">3.14 · AI · JSON</div>
                <div style="font-size:12px; color:var(--n-text-3); font-family:var(--n-font-mono)">Código · Tokens · IDs · Datos<br>Weights: 400 500 600</div>
              </div>
            </div>
          </article>

          <!-- Typography Scale -->
          <article class="n-token-geometry-card" style="width:100%">
            <h2>Escala Tipográfica</h2>
            <div style="display:flex; flex-direction:column; gap:16px; margin-top:16px">
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--n-border-0); padding-bottom:8px">
                <span class="sz-64" style="background:var(--n-gradient-primary-secondary); -webkit-background-clip:text; -webkit-text-fill-color:transparent; color:transparent">Neural</span>
                <span style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">sz-64 · 64px · 800</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--n-border-0); padding-bottom:8px">
                <span class="sz-48">Display XL</span>
                <span style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">sz-48 · 48px · 700</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--n-border-0); padding-bottom:8px">
                <span class="sz-36">Heading Display</span>
                <span style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">sz-36 · 36px · 600</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--n-border-0); padding-bottom:8px">
                <span class="sz-28">Heading 1 — Sección principal</span>
                <span style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">sz-28 · 28px · 600</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--n-border-0); padding-bottom:8px">
                <span class="sz-24">Heading 2 — Sub-sección</span>
                <span style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">sz-24 · 24px · 500</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--n-border-0); padding-bottom:8px">
                <span class="sz-20">Heading 3 — Panel o tarjeta</span>
                <span style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">sz-20 · 20px · 500</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--n-border-0); padding-bottom:8px">
                <span class="sz-16">Body Large — El modelo procesa la solicitud con redes neuronales.</span>
                <span style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">sz-16 · 16px · 400</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--n-border-0); padding-bottom:8px">
                <span class="sz-14" style="color:var(--n-text-2)">Body Medium — Descripción secundaria con contexto de soporte adicional.</span>
                <span style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">sz-14 · 14px · 400</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--n-border-0); padding-bottom:8px">
                <span class="sz-13" style="color:var(--n-text-3)">Label · Estado del sistema · Etiqueta de componente</span>
                <span style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">sz-13 · 13px · 500</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--n-border-0); padding-bottom:8px">
                <span class="sz-11" style="color:var(--n-text-3)">Caption · Overline · Metadata</span>
                <span style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">sz-11 · 11px · 600</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center">
                <span class="mono" style="color:var(--n-color-primary-bright)">const model = await neural.process(input, {{ '{' }} stream: true {{ '}' }});</span>
                <span style="font-family:var(--n-font-mono); font-size:10px; color:var(--n-text-3)">mono · 13px · monospace</span>
              </div>
            </div>
          </article>

          <!-- Motion Scale -->
          <article class="n-token-geometry-card" style="width:100%">
            <h2>Motion</h2>
            <div class="n-token-motion-list">
              @for (token of motionTokens; track token[1]) {
                <div class="n-token-motion-item">
                  <strong>{{ token[0] }}</strong>
                  <code>{{ token[1] }}</code>
                  <small>{{ token[2] }}</small>
                </div>
              }
            </div>
          </article>
        </div>
      </section>
    `,
  }),
};

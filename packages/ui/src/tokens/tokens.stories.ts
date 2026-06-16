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

const elevationTokens = [
  ['Elevation 1', '--n-elevation-1'],
  ['Elevation 2', '--n-elevation-2'],
  ['Elevation 3', '--n-elevation-3'],
  ['Elevation 4', '--n-elevation-4'],
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
      elevationTokens,
    },
    template: `
      <section class="n-story-foundation">
        <header>
          <p class="n-story-eyebrow">Geometry</p>
          <h1>Radius and elevation</h1>
        </header>

        <div class="n-token-geometry-grid">
          <article class="n-token-geometry-card">
            <h2>Radius scale</h2>
            <div class="n-token-radius-grid">
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

          <article class="n-token-geometry-card">
            <h2>Elevation scale</h2>
            <div class="n-token-elevation-stack">
              @for (token of elevationTokens; track token[1]) {
                <div class="n-token-elevation-item" [style.boxShadow]="'var(' + token[1] + ')'">
                  <strong>{{ token[0] }}</strong>
                  <code>{{ token[1] }}</code>
                </div>
              }
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
    },
    template: `
      <section class="n-story-foundation">
        <header>
          <p class="n-story-eyebrow">Rhythm</p>
          <h1>Type and motion</h1>
        </header>

        <div class="n-token-geometry-grid">
          <article class="n-token-geometry-card">
            <h2>Typography</h2>
            <div class="n-token-type-stack">
              <div>
                <p class="n-token-type-stack__display">Plus Jakarta Sans display</p>
                <code>--n-font-display</code>
              </div>
              <div>
                <p class="n-token-type-stack__body">Plus Jakarta Sans body copy for dense interfaces and product flows.</p>
                <code>--n-font-body</code>
              </div>
              <div>
                <p class="n-token-type-stack__mono">JetBrains Mono for system labels and structured metadata.</p>
                <code>--n-font-mono</code>
              </div>
            </div>
          </article>

          <article class="n-token-geometry-card">
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

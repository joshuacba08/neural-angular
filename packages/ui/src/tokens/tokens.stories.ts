import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Foundation/Tokens',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

const colorTokens = [
  ['Primary', '--n-color-primary'],
  ['Secondary', '--n-color-secondary'],
  ['Success', '--n-color-success'],
  ['Warning', '--n-color-warning'],
  ['Danger', '--n-color-danger'],
  ['Info', '--n-color-info'],
] as const;

const surfaceTokens = [
  ['Canvas', '--n-bg-canvas'],
  ['Base', '--n-bg-base'],
  ['Surface 1', '--n-surface-1'],
  ['Surface 2', '--n-surface-2'],
  ['Surface 3', '--n-surface-3'],
  ['Surface 4', '--n-surface-4'],
] as const;

export const Palette: Story = {
  render: () => ({
    props: {
      colorTokens,
      surfaceTokens,
    },
    template: `
      <section class="n-story-foundation">
        <header>
          <p class="n-story-eyebrow">Foundation</p>
          <h1>Theme tokens</h1>
        </header>

        <div class="n-story-token-section">
          <h2>Color</h2>
          <div class="n-story-token-grid">
            @for (token of colorTokens; track token[1]) {
              <article class="n-story-token">
                <span [style.background]="'var(' + token[1] + ')'"></span>
                <strong>{{ token[0] }}</strong>
                <code>{{ token[1] }}</code>
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
              </article>
            }
          </div>
        </div>
      </section>
    `,
  }),
};

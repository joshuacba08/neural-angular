import type { StorybookConfig } from '@storybook/angular';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)', '../**/*.docs.mdx'],
  staticDirs: [{ from: '../../../tools/brand', to: '/brand' }],
  docs: {
    defaultName: 'Docs',
    docsMode: true,
  },
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: async (webpackConfig) => {
    webpackConfig.resolve = webpackConfig.resolve ?? {};
    webpackConfig.resolve.extensionAlias = {
      ...webpackConfig.resolve.extensionAlias,
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
    };

    return webpackConfig;
  },
};

export default config;

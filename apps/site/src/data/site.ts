export const siteConfig = {
  brand: 'Neural Angular',
  packageName: '@neuralangular/angular-ui',
  domain: 'oroyajs.com',
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? 'https://oroyajs.com',
  storybookUrl:
    import.meta.env.PUBLIC_STORYBOOK_URL ??
    'https://storybook.oroyajs.com',
  npmUrl:
    import.meta.env.PUBLIC_NPM_PACKAGE_URL ??
    'https://www.npmjs.com/package/@neuralangular/angular-ui',
  githubUrl:
    import.meta.env.PUBLIC_GITHUB_URL ??
    'https://github.com/joshuacba08/neural-angular',
  heroDescription:
    'Angular-first UI components with a polished dark-mode visual system, token-driven styling, and a Storybook surface built for real documentation.',
};

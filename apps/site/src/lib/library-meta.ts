import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type UiPackageJson = {
  version: string;
  name: string;
  description?: string;
  exports?: Record<string, unknown>;
  peerDependencies?: Record<string, string>;
};

const packageJsonPath = resolve(process.cwd(), '../../packages/ui/package.json');

const packageJson = JSON.parse(
  readFileSync(packageJsonPath, 'utf-8'),
) as UiPackageJson;

const exportKeys = Object.keys(packageJson.exports ?? {});
const styleExports = exportKeys.filter((entry) => entry.startsWith('./styles'));
const secondaryEntryPoints = exportKeys.filter(
  (entry) => entry !== '.' && !entry.startsWith('./styles'),
);

export const libraryMeta = {
  angularRange: packageJson.peerDependencies?.['@angular/core'] ?? '^22.0.0',
  description:
    packageJson.description ??
    'Angular-first UI components for modern production apps.',
  packageName: packageJson.name,
  secondaryEntryPoints: secondaryEntryPoints.length,
  styleExports: styleExports.length,
  version: packageJson.version,
};

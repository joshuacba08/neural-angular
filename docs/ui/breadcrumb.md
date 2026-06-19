# Breadcrumb

Status: Implementation complete.

`NBreadcrumb` is a navigation helper that renders hierarchical paths, supporting custom icons, dividers, and active gradients.

## Import

```ts
import { NBreadcrumb } from '@neural/angular-ui/breadcrumb';
```

## API

```html
<n-breadcrumb
  [items]="breadcrumbItems"
  separator="chevron"
  [activeGradient]="true"
></n-breadcrumb>
```

### NBreadcrumb Component Inputs

* `items`: Array of `NBreadcrumbItem` objects (required)
* `separator`: Divider icon: `'chevron' | 'slash'` (default: `'chevron'`)
* `activeGradient`: Adds Gemini text gradient to the active last item (default: `false`)

### NBreadcrumbItem Interface

* `label`: Text node to show (optional)
* `icon`: Icon name to show before text (optional)
* `url`: Navigation anchor link path (optional)
* `disabled`: Prevents cursor hover and link navigation (optional)

## Theming

Breadcrumb styling is customizable via unified tokens:
* `--n-text-1` (active element)
* `--n-text-3` (link path)
* `--n-text-4` (divider)
* `--n-gradient-gemini` (active gradient style)

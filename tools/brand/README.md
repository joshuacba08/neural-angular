# Neural Angular Brand Assets

This directory is the source of truth for shared Neural Angular branding files.

## Files

- `neural-angular-ui-icon.svg`
  Use for favicons, square avatars, compact app chrome, and icon-only surfaces.
- `neural-angular-ui-logo.svg`
  Use for Storybook branding, landing pages, docs headers, and horizontal layouts.

## Usage

- Prefer referencing these files from build tooling or static asset copy steps.
- Avoid creating edited duplicates in app folders unless a runtime surface requires
  a local public copy such as a favicon.
- If the brand changes, update these files first and then sync dependent public
  copies.

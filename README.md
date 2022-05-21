# appscripts

## Development

I can use `npx clasp push --watch` to watch for changes and automatically deploy.

## Deployment

Scripts are deployed automatically on push to GitHub main. To deploy a script manually:

```bash
cd /tiller
clasp push -f
```

## CI

In the future I may need to expand the CI workflow in order to retain clasp auth.

- https://github.com/google/clasp/issues/707#issuecomment-844364570
- https://github.com/ericanastas/deploy-google-app-script-action/blob/main/.github/workflows/deploy-script.yml
- https://github.com/google/clasp/issues/225

## Modules

Google Apps Script does not support ES6 modules. I may be able to adapt my tooling to compensate. But for now I should
avoid using anything in an entry point file that has been imported or exported, even if it was exported in the same 
file.

- https://github.com/google/clasp/blob/master/docs/typescript.md#modules-exports-and-imports
- https://github.com/google/clasp/blob/master/docs/esmodules.md
# appscripts

## Development

I can use `npx clasp push --watch` to watch for changes and automatically deploy.

## Deployment

Scripts are deployed automatically on push to GitHub main. To deploy a script manually:

```bash
npm run build
npm run deploy
```

## CI

In the future I may need to expand the CI workflow in order to retain clasp auth.

- https://github.com/google/clasp/issues/707#issuecomment-844364570
- https://github.com/ericanastas/deploy-google-app-script-action/blob/main/.github/workflows/deploy-script.yml
- https://github.com/google/clasp/issues/225

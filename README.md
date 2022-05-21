# appscripts

Scripts are deployed automatically on push to GitHub main. To deploy a script manually:

```bash
cd /tiller
clasp push -f
```

In the future I may need to expand the CI workflow in order to retain clasp auth.

- https://github.com/google/clasp/issues/707#issuecomment-844364570
- https://github.com/ericanastas/deploy-google-app-script-action/blob/main/.github/workflows/deploy-script.yml
- https://github.com/google/clasp/issues/225
# Publishing the collection with GitHub Pages

This repository holds one collection page and two demos; it does not need two GitHub repositories. Older deployment prompts are kept in each project's `archive/prior-github-handoff/` and are not used for current deployments.

## What to upload

Keep this folder as `source/` in one repository: `web/`, `scripts/`, `projects/`, documents and licences, next to the root `.github/` and `LICENSE`. Do not upload a delivery ZIP as the website, and do not upload `node_modules`, Python environments or browser caches.

This folder's `.gitignore` excludes the rebuildable `site/`, each project's `dist/` and the packaged project entries. They may stay in a local offline package; GitHub Actions regenerates them from source. Keep the scientific data, `reference/` and the historical archives.

## Turning on Pages

1. In the repository's Settings → Pages, set Source to **GitHub Actions**.
2. Use the `main` or `master` branch. A push runs the root `pages.yml`: build, checks, browser QA, then publication of the whole collection.
3. Pull requests are verified but not published. The workflow can also be started by hand from the Actions page.
4. After publishing, check the entrance, both demos and the preview galleries. All links are relative; local QA covers the `/capacitance-demos/` sub-path.

The repository name is free to choose; no address in the pages needs changing. A custom domain is not required. Pages paths are case-sensitive, so a renamed repository changes the site address.

## Local review

```sh
npm run build
npm run check
npm test
npm run preview
```

To simulate a repository sub-path, set `PREVIEW_BASE=capacitance-demos` before the preview. PowerShell example:

```powershell
$env:PREVIEW_BASE = 'capacitance-demos'
npm run preview
```

The optional Python environment for browser tests is described in the README; the GitHub workflow installs its own. Official reference: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). A local pass does not mean anything is published on an account; the live site is the authority.

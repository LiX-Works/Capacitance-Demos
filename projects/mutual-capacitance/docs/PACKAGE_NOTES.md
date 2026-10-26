# Current package notes

The maintained English runtime is generated from editable TypeScript. Its presentation intentionally differs from the immutable Chinese upload, while the scientific inputs remain frozen. Approved module fingerprints are in `RELEASE_CONTRACT.json` and `../qa/source-sync.json`. The [collection QA record](../../../QA_REPORT.md) and [browser report](../../../qa/browser-qa.json) describe the latest executed checks; historical browser-sync reports remain in the archive.

The scientific model and precomputed numbers are unchanged. The original `physics/`, `data/results.json`, `parameters.json`, numerical derivations, reproduction requirements and historical evidence are retained. Historical authoring specifications live in `../archive/spec-pack/`; they are provenance, not instructions to restore removed pages or override the maintained edition. Original private filenames and unsanitized originals are not distributed.

`../previews/` contains newly rendered public-safe screenshots, a gallery and an overview. Old QA screenshots are not reused as public previews. Historical logs and tests are explicitly marked as such. Current source maps are regenerated with relative source paths.

The offline compiler is a locally repackaged TypeScript 5.8.3 archive, not claimed to be a newly downloaded registry tarball. Its Apache-2.0 license and the local KaTeX MIT license are included. No font files, node_modules, browser profiles, private credentials or Python caches are included in the release ZIP.

GitHub Pages should publish `site/` only. Keeping the more comprehensive source, scientific data and evidence in the repository is separate from deploying all of those files as site assets.

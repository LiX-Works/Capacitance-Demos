# Capacitance Demos

Interactive science demos on capacitance, electric fields and touch sensing. Two independent demos share one entrance; each keeps its own source, data and model notes.

**Background:** both demos began as two talks in an undergraduate sensors course. The course asked for the principles, usually explained with slides; the author built interactive web demos instead, ProxiTouch first and then a mutual-capacitance lab with numerical modelling.

**[Open the collection](https://lix-works.github.io/Capacitance-Demos/)** · [ProxiTouch](https://lix-works.github.io/Capacitance-Demos/proxitouch/) · [Mutual-Capacitance Lab](https://lix-works.github.io/Capacitance-Demos/mutual-capacitance/) · [中文说明](README.zh-CN.md)

| Demo | What it shows | More |
| --- | --- | --- |
| **ProxiTouch** | 12 pages. A concept pixel that senses a finger coming, the first touch and the press by handing one shared electrode from a fringe field to an ionic interface. | [Project notes](projects/proxitouch/README.md) · [Previews](projects/proxitouch/previews/overview.png) |
| **Mutual-Capacitance Lab** | 8 pages. Two plates unfold from facing to side by side; boundary-element solutions, analytic shortcuts and four independent checks show how much capacitance survives. | [Project notes](projects/mutual-capacitance/README.md) · [Previews](projects/mutual-capacitance/previews/overview.png) |

![ProxiTouch previews](projects/proxitouch/previews/overview.png)

![Mutual-Capacitance Lab previews](projects/mutual-capacitance/previews/overview.png)

Each overview is a 2×2 montage of real browser renders; the full galleries keep every screenshot. ProxiTouch: the cover loop, the fringe field, the two channels and the egg-grasp application. Lab: the cover question, the computed potential, the 0–180° sweep and the checks.

## Run and edit

With Node.js 22 or newer, from this folder:

```sh
npm run build
npm run check
npm test
npm run preview
```

Open the address the preview prints. The build uses the bundled TypeScript 5.8.3 and needs no network. After a build, `index.html` is the offline collection entrance, and each demo's `projects/<name>/index.html` also opens directly in a WebGL2 browser.

The collection page lives in `web/`; demo source lives in `projects/<name>/source/src/`. Edit the source and rebuild; never edit the bundled HTML by hand.

## Verify and deploy

Browser checks and preview refreshes need Python 3.12, Playwright and Pillow:

```sh
python -m pip install -r requirements-qa.txt
python -m playwright install chromium
npm run qa
npm run previews
npm run build
npm test
```

`qa` opens real HTTP routes under a repository sub-path, every page of both demos at three animation phases, the key interactions and the offline files. `previews` re-renders the real application instead of reusing old images. The browser runs on precomputed data; no Python solver is needed to view the demos.

A single [GitHub Pages workflow](.github/workflows/pages.yml) builds both demos and publishes only the root `site/`. Settings and upload scope are in [DEPLOY.md](DEPLOY.md).

The optional scientific smoke test uses the lab's `requirements-reproduce.txt` and `npm run test:science`. It re-solves 8 BEM cases and checks units, encoding and geometry; it does not overwrite published data and is not a full regeneration. `npm run test:safety` checks with the standard library that a failed scientific stage never overwrites existing results.

## Model scope and licence

ProxiTouch is a concept design; it has not been fabricated or measured. The lab shows precomputed numerical results for stated dimensions, interpolated between solved angles; 2-D results are scaled by the real width, and finite-width 3-D checks exist for three air angles. Passing regression tests is not experimental validation.

Original source, text and data are under the [MIT licence](LICENSE), which allows modification and commercial reuse; third-party components keep their own licences, see [notices](THIRD_PARTY_NOTICES.md). The historical upload baselines and scientific evidence stay in each project's `reference/` and `archive/`. Changes and verification are in [CHANGELOG.md](CHANGELOG.md) and [QA_REPORT.md](QA_REPORT.md).

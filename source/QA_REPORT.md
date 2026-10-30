# Verification record

## 2026-10-26 · English presentation edition

The current build retains the 12 ProxiTouch pages and 8 lab pages, with larger models, overlay panels, shorter copy and larger text. The original scientific inputs and historical uploaded HTML retain their exact hashes.

- Offline builds, TypeScript checks, source/release contracts and behaviour regressions pass.
- A new isolated Chrome run completed **235 checks with 0 failures**, including all 20 pages at three phases, English visible text, real URLs under `/Capacitance-Demos/`, key interactions and offline HTML navigation. No page exceptions or external runtime requests were observed. The software renderer checks function and layout, not hardware frame rate.
- All 22 curated gallery images were freshly captured from the current runtime, and both overview montages and their hashes were refreshed. The deployed tree contains 63 working local links and about 26.5 MiB of content.
- The 7 standard-library failure-safety tests passed. The optional numerical solver smoke test was not rerun because no scientific input changed; passing interface checks is not experimental validation.
- Representative 1920×1080 and 1280×720 frames were inspected for legible type, model size and panel placement. Peripheral model overlap is intentional; text panels retain a light background.

The current source and preview identities are recorded in [BUILD_MANIFEST.json](BUILD_MANIFEST.json). The earlier Chinese deployment receipt is preserved byte for byte under [qa/historical](qa/historical/2026-10-20-before-english/README.md). Live deployment verification is recorded separately from these local checks.

## 2026-10-23 · English edition (local, not yet published)

| Check | Result | Record |
| --- | --- | --- |
| Offline build and TypeScript check | Both projects pass | `npm run build`, `npm run check` |
| Release contracts and scientific inputs | 27 + 15 modules approved by exact hash (20 and 9 unchanged from the historical upload); frozen scientific files match; historical HTML keeps its bytes | each project's `qa/source-sync.json`, `docs/RELEASE_CONTRACT.json` |
| Behaviour regressions | ProxiTouch: 11 groups pass. Lab: page set and layouts, Explore round trip, native keys, loops, resumed playback, capture, finite API inputs, dimension geometry pool and sized charts pass | `source/tests/*regressions.mjs` |
| Real browser | 235 checks, 0 failures, 0 page errors, 0 external requests | [browser-qa.json](qa/browser-qa.json) |
| Previews | 12 + 10 gallery images re-rendered from the current build; overview hashes match | each project's `previews/manifest.json`, `qa/curated-preview-refresh.json` |
| Links, images and notices | 63 local links pass; deployed site about 24.5 MiB | `npm run verify` |

Browser coverage: isolated Chromium 156 with SwiftShader, no user browser data. Real HTTP navigation under the `/capacitance-demos/` sub-path, plus both stand-alone HTML files opened as `file://` with the network disabled. All 20 pages (12 + 8) are checked at phases 0, 0.5 and 1 for WebGL, maths and runtime errors, finite camera state, panels inside the viewport and English visible text. Interactions checked: one-step page interruption, the cover stage track, the live paragraph highlight on "One touch, two channels", focused menu and notes keys, the Explore round trip (ProxiTouch); the field-view loop and switch, the field switch hidden on other pages, the angle slider, the chart marker range, direct drag with Reset view (lab). The collection page is checked at desktop and 390 px mobile width; the 3-D demos at 1920×1080 and 1280×720.

The browser QA no longer compares pixels with the historical upload: the pages changed on purpose. Passing these checks says nothing about the physics being right; the scientific inputs are guarded separately by file hash.

Not rerun in this pass: the optional scientific smoke test (`npm run test:science`), the safety test (`npm run test:safety`) and a clean-clone rebuild. No scientific input changed, so their earlier results below still describe the data. Firefox, Safari and mobile 3-D use remain outside the verified scope.

## 2026-10-02 · Earlier verification (historical)

The bug-fix pass of 2026-10-02 recorded: offline build and type checks for both projects; 44 modules checked against the release contract with 6 frozen scientific inputs; 7 standard-library safety tests; 309 browser checks with 0 failures, including pixel-identical final frames against the historical upload; a limited scientific smoke test of 8 BEM cases (0°, 30°, 90°, 180° × air / εr = 4, n = 128, largest relative difference about 5.1×10⁻¹⁵ against the frozen data); and a clean rebuild in an independent copy. `qa/scientific-smoke.json` and `qa/clean-build.json` keep those records.

The collection was first published from application commit `5768eff46cc33e3fee4b4cc1d6d50f3ca9762304` at [Capacitance Demos](https://lix-works.github.io/Capacitance-Demos/); the 2026-10-20 commit `295bb9d` fixed the Pages links after the repository rename. See [publication.json](qa/publication.json). The English edition described above is local until it is committed and pushed.

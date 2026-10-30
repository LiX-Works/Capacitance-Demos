# Changes and collection history

## 2026-10-26 · Larger presentation and English publication preparation

- Enlarged models across a wider stage, with white/translucent copy and plot cards allowed to overlap the model.
- Raised the ProxiTouch presentation body to about 30 px and headings to about 60 px at 1920×1080; enlarged plot labels in their actual rendered dimensions.
- Shortened slide text, removed repeated fine print from the main view and retained scientific qualifications in About/Methods and concise concept labels.
- Applied the same readable type and larger framing to the lab, shortened readouts and made its closing cross-demo link work as an explicit offline HTML path.
- Refreshed every current preview from the built applications and updated scene exports and release fingerprints. Original uploads, scientific parameters and precomputed data remain unchanged.
- Preserved earlier publication manifests in `qa/historical/2026-10-20-before-english/`. The GitHub description and the prepared English/Chinese root READMEs were left unchanged.

## 2026-10-23 · English edition and redesign

Both demos, the collection page, the galleries and the documentation are now in English. The original Chinese uploads stay byte-for-byte in each project's `reference/final-upload.html`; a Chinese collection README is kept as `README.zh-CN.md`. Frozen scientific parameters and precomputed data are unchanged.

### ProxiTouch (23 slides → cover + 11 pages)

- The cover now runs the whole idea in one loop: a target approaches, touches and presses the pixel while a live stage track and two channel bars follow the interaction.
- The capacitor basics (C = εA/d, the three variables, series/parallel, composite capacitors) merged into three mechanism pages: the fringe field (unfold the plates, then bring in the target), the electric double layer (why squeezing the gel barely changes C) and the contact area.
- The three single-stage pages (approach, touch, pressure) folded into "One touch, two channels"; its three paragraphs light up in step with the animation and the two channel plots.
- Order: mechanisms → the question → shared electrode → pixel layers → two channels → multiplexing → array → surface → egg grasp. Scene ids keep their original numbers; pages are numbered by position.
- The unused parallel-plate and composite-capacitor models and their worlds were removed. English font stack; all labels, plots, menus, Explore and About text translated.

### Mutual-Capacitance Lab (12 slides → 8 pages)

- One question carries the lab: unfold two plates from facing to side by side; how much capacitance is left? Answer from the data: 23.37 pF → 3.07 pF, 13% survives.
- The partial-dielectric pages (07–10) and the dielectric toggle were removed: a flat slab under a rotating plate did not fit the unfolding geometry. The εr = 4 data stay in the data file for provenance.
- Five layouts replace one repeated template: cover, stage (large model), split (model beside a square chart), chart-first (the chart is the subject, the model becomes an angle thumbnail) and closing (three takeaways and a link to ProxiTouch).
- Charts are drawn at the container's real pixel size instead of a stretched 1450×235 strip. New charts: the strip model against the solution at small angles with the missing fringe shaded; the full sweep with an error panel; the validation chart with 3-D, finite-volume and thin-strip checks as deviations from 2-D BEM.
- Fewer, clearer controls: an angle slider with play/pause, one view switch on the field page only, and Previous/Next. The model turns by direct drag with a Reset view button; Explore, full width and quality remain on the keyboard (listed under Methods). Preset-angle, log-axis, replay and autoplay buttons were removed from the screen.
- Every number on a page is read from the frozen data, not typed in. A new "thin coplanar strips" check compares the conformal-mapping limit (3.00 pF) with the 0.1 mm-thick result (3.07 pF).

### Collection, tests and docs

- Collection page, galleries, preview READMEs, project READMEs, CONTROLS, SCENE_COPY / SCENE_MANIFEST (re-exported from the build), DEPLOY and QA notes are in English.
- Previews re-rendered from the new build with new manifests (12 and 10 images); overviews show four representative pages each.
- Release contracts re-approved against the new build: changed and new modules are marked, unchanged modules still match the historical upload, scientific inputs are still checked by file hash. `source-sync.mjs` accepts modules that have no counterpart in the historical upload.
- Regression tests and `scripts/browser_qa.py` were rewritten for the new page sets. The browser QA no longer compares pixels with the historical upload (the pages changed on purpose); it checks every page at three phases for errors, overflow and English text, plus the key interactions and offline files.

## 2026-10-02 · Collection bug fixes

The two demos were merged into one Scientific Demos repository, keeping separate source, scientific data and history, with a collection page and one Pages workflow.

### ProxiTouch

- Autoplay continues through zero-duration and ambient scenes to the ending; manual paging cancels a pending autoplay step.
- Page buttons, hints and aria labels agree: one action interrupts the animation and turns the page.
- Focused buttons, links and inputs keep their native keyboard behaviour; global shortcuts no longer take over controls.
- Capture mode stops running animations and autoplay and rejects non-finite phase, depth and time inputs.
- History keeps at most 256 entries, so long sessions do not grow without bound.
- The physics notes point to the actual `ApplicationHero.ts`; solver run time goes to QA files, not into scientific tables. Existing scientific tables keep their bytes.

### Mutual-capacitance lab

- Dynamic imports on Windows use file URLs, so the raw-JSON and embedded-data checks complete.
- Leaving Explore restores the camera, phase, material, field cycle, playback and autoplay state; focused controls keep native keys.
- After a material switch the chart shows the matching curve, the local approximation uses the current permittivity and the y-axis includes the current point. Finite-width 3-D checkpoints are labelled as air only.
- Dimension lines reuse four fixed geometries instead of reallocating GPU resources. Frame statistics keep 180 entries, history 256.
- Capture mode stops animation and timers; public phase and angle APIs reject NaN and infinity before changing state.
- A failed scientific validation stops data generation; new checkpoints verify the parameter hash and completeness and refuse evidence from old parameters.
- Full numerical reproduction runs every stage in a temporary folder and writes back only after all pass; ordinary write failures roll back. Sudden power loss or forced termination is not covered by a cross-file transaction.
- Documentation fixes historical QA paths and notes that the dielectric FVM check shares the BEM outer reference potential, which limits its independence.

### Shared build and publishing

- MIT licence for original content and third-party notices added; the website, stand-alone HTML and distribution folders carry the required notices.
- Both projects ship lock files; online `npm ci` and the offline compiler path are clearly separated.
- Python text I/O is explicitly UTF-8; licence notices sit at the end of the HTML body so the charset declaration stays near the top.
- One root workflow builds both demos and publishes one `site/`; pull requests verify without publishing.
- The original upload baselines stay unchanged; intentional fixes are recorded by exact module hashes; frozen scientific inputs are still checked by file hash.
- All previews were re-rendered; old hand-off reports and deployment prompts were archived and not reused as current verification.

That pass changed no frozen scientific parameter, precomputed data or original ZIP, and created no online repository or Pages site.

### Curated preview layout

Both README overviews became 2×2 montages with 1200×675 cells, keeping screenshot proportions and the full galleries. The earlier 3×3 montages are archived in each project's `archive/preview-layout-2026-10-02/`.

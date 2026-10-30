# Build and scientific reproduction

## Rebuild the current approved application

From this project's directory, `projects/mutual-capacitance/`, with Node 22 or newer:

```sh
npm run build:offline
npm run check
npm test
npm run preview
```

The bundled compiler is installed locally by `build:offline`; no registry access is required. The maintained inputs are `source/src/`, `source/public/` and `source/index.html`. Output is `dist/`, root `index.html`, and the deployment-only `site/`. The two standalone entries match byte for byte. No Python is required to display or deploy the existing data.

## Optional numerical regeneration

The scientific programs remain in `physics/`, with `parameters.json` and the frozen `data/results.json`. Maintenance adds failure and provenance guards without recalibrating the solver or changing the frozen scientific arrays. In a Python environment containing the dependencies in this project's `requirements-reproduce.txt`, run from the same project directory:

```sh
python physics/reproduce.py
```

The orchestrator copies `physics/` and `parameters.json` into a fresh temporary staging directory, then calls `trial_and_validate.py`, `fvm_check.py`, `bem3d_check.py`, `generate.py`, `enrich.py`, `local_maps.py`, and `check_interpolation.py`. It publishes numerical artifacts including `data/results.json`, `source/src/physics/data.ts` and fresh `qa/*.json` only after every stage and final provenance check succeeds. Any failed numerical validation check blocks generation. Parameter changes during a run block publication. Failure during ordinary publication raises an error and restores files already replaced; a process kill or power loss during publication is not guaranteed to roll back automatically. Staging starts without old QA files, so it cannot accidentally mix current parameters with archived evidence. This is optional local computation, not an online service or the deployed browser's calculation path. It was preserved and inspected during synchronization; this delivery task did not rerun the entire scientific solver pipeline.

Geometry and units are shared through `physics/model.py` and `parameters.json`. A parameter change requires regeneration and a fresh numerical audit. Do not alter the 3-D scene's dimensions independently of the model. See `MODEL_DERIVATION.md` and `NUMERICAL_REPORT.md` for inherited scientific assumptions and previous results.

The synchronization test preserves the historical upload and checks the current build against approved module hashes and frozen scientific inputs. It permits documented presentation changes rather than requiring the English runtime to match the old Chinese upload. Regeneration may change floating-point output or timing metadata. New scientific changes need explicit approval and a separately documented contract update; do not suppress a test mismatch to make CI pass.

## Current browser QA

From the **collection root** after building:

```sh
npm run qa
```

This invokes the collection's `scripts/browser_qa.py`. It opens real HTTP project-subpath routes and standalone files, checks registered pages at several phases, and exercises current interactions. English copy, layout and runtime errors are checked; pixel identity with the historical presentation is not required. Dependencies are in the collection's `requirements-qa.txt`, and Chromium must be installed. See [collection QA](../../../QA_REPORT.md), [the browser report](../../../qa/browser-qa.json) and [test notes](../source/tests/README.md) for executed coverage and limitations.

The inherited `source/tests/browser_qa.py` remains a historical synchronization diagnostic. It is not the current collection acceptance command.

Original capture, physics-validation and performance tests remain in `source/legacy-tests/` and are historical backups, not the current deployment acceptance command. Their old playback assumptions or paths may require deliberate migration before reuse. No new hardware frame-rate or full-device physics validation is claimed by the current source-sync tests.

## Fast maintenance regression checks

After the offline TypeScript compiler is available, from the project root:

```sh
node source/tests/model-regressions.mjs
python physics/tests/test_safety.py
```

The first command checks the current page set and layouts, exploration state, native keyboard behavior, repeat modes, resumed playback, bounded diagnostics, reusable dimension geometry, sized charts, stable capture and finite API inputs. The second uses only Python's standard library and synthetic solver dependencies/runners to check failed validation, stale or incomplete QA hashes, staged execution, failed-stage preservation, successful publication and rollback on an injected publication error. Neither test regenerates `data/results.json` or the frozen `data.ts`.

Direct stages are primarily pipeline components. `enrich.py` requires fresh `qa/finite-width-3d.json` and `qa/independent-fvm.json` with matching parameter hashes and `complete: true`; archived reports intentionally lack a newly fabricated provenance stamp. Use the staging orchestrator for complete reproduction instead of copying historical evidence into `qa/`.

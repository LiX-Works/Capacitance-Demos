# Current tests

Run `npm run build:offline`, `npm run check`, and `npm test` from this project directory, or use the collection root commands for both projects.

`source-sync.mjs` checks the immutable historical reference, every approved module hash, frozen scientific inputs, generated entries and license notices. It uses valid file URLs for Node imports on Windows. Intentional future revisions require a documented contract change; never update the historical reference or turn a mismatch into an unconditional pass.

`model-regressions.mjs` exercises repaired state, keyboard, capture, chart/resource or autoplay behavior using the actual typed source. These tests run without a graphical browser.

The authoritative real browser acceptance command is `npm run qa` from the collection root. It checks actual HTTP and file URLs, the registered pages across both projects, English visible text and repaired interactions. Scene counts come from each project's current `project.json` and runtime, rather than the old 35-scene presentation. `npm run previews` rerenders both maintained galleries. Python requirements are in the collection `requirements-qa.txt`; `CHROMIUM_PATH` can select an existing Chromium-family executable. Read the collection QA record for the latest executed coverage; SwiftShader rendering is functional evidence, not a hardware performance certification.

The inherited `browser_qa.py` is a historical synchronization diagnostic; its text I/O is UTF-8-safe, but its exact unmodified-baseline control assertions predate this release. It is retained for reference rather than used by the package's QA command.

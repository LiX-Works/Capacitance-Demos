# Current release synchronization

The sanitized final upload remains immutable in `reference/final-upload.html`. Its SHA-256 is pinned by `RELEASE_CONTRACT.json`.

The maintained edition includes intentional English-language, presentation and interaction revisions. The contract pins the immutable reference and the approved normalized hash for every compiled module, with a reason for each changed or new module. Unexpected changes fail `npm test`; the historical reference is not replaced by the redesigned build.

Precomputed scientific input bytes remain frozen by file hashes. The Mutual project additionally compares its raw JSON to the imported compiled data and checks the parameters hash/content. The applications are compiled from editable source, not patched out of the reference HTML.

The maintained collection browser suite checks registered pages at three phases, real project-subpath URLs, offline entry points, English visible text and repaired interactions. It does not require pixel identity with the historical Chinese presentation: the layout and copy changed intentionally. Read the collection `QA_REPORT.md` and `qa/browser-qa.json` for the scope of the latest executed checks. Code and browser checks are not experimental validation or a full solver recalculation.

The generated standalone HTML embeds project MIT and KaTeX notices. Each deploy directory includes a licenses folder. Preview manifests must match the current runtime and image hashes; rerender after any runtime change.

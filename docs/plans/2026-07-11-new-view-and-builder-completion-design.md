# `/new-view` and `/modify-character` Completion

**Date:** 2026-07-11  
**Status:** Approved for implementation  
**Routes:** `/new-view`, `/modify-character`

## Intent

Finish the two new character surfaces against their existing approved designs. The work closes the remaining wallpaper, automated-verification, build-warning, and real-browser QA gaps without redesigning either route or expanding the product roadmap.

The implementation remains a single-character, local-first Vasha Taltos companion. It does not add accounts, cloud sync, multi-character support, a wallpaper picker, or a generic rules engine.

## Chosen approach

Complete the existing implementation in four bounded passes:

1. Import and wire the seven supplied tarot wallpapers.
2. Reproduce and eliminate the reported Karma page-reload condition when it is caused by application or test behavior.
3. Remove confirmed-unused generated/dead styles until the production build is warning-free, without hiding warnings behind larger budgets.
4. Exercise both routes in the real application across representative viewport sizes and verify shared persistence.

This is preferred over shipping only the wallpaper change, which would leave known readiness gaps, and over suppressing build/test warnings, which would make completion unverifiable.

## Wallpaper assets

The user supplied these source files:

- `happy-tarot-12677.jpg`
- `images.jpeg`
- `e22dab3719f96a6c837878c992facc42.jpg`
- `il_fullxfull.3689716838_q07f.avif`
- `dedaa7e442d31703dea7b383b7195e7c.jpg`
- `746f766b46b37d6f7249e63c7a9f1f1e.jpg`
- `hand-drawn-tarot-cards-illustration_52683-108965.avif`

All seven become descriptively named WebP assets under `src/assets/wallpapers/`.

- Preserve each source aspect ratio.
- Cap originals longer than 2,048 pixels at 2,048 pixels on the longest edge.
- Do not upscale smaller sources during conversion.
- Use a restrained WebP quality setting that keeps illustrated linework and gradients intact.
- Select exactly one known wallpaper when `NewViewPage` is created.
- Keep that selection stable for the component lifetime and select again on a fresh page construction.
- Apply the asset through the existing `--nv-wallpaper` background layer with `cover`, centered positioning, and the existing contrast veil.
- Retain the neutral charcoal fallback when a wallpaper cannot load.

No wallpaper chooser or persisted wallpaper preference is added.

## Test-runner completion

Run Karma by itself before changing code. The earlier reload report occurred while test and production builds were running concurrently, so concurrency must be ruled out before attributing it to the application.

If the reload remains reproducible:

- identify the smallest responsible spec or browser action;
- confirm whether native navigation, form submission, direct location mutation, or test teardown is responsible;
- fix the smallest application or test behavior that causes the reload;
- keep client-side route navigation and button semantics intact;
- add or retain focused regression coverage.

Do not ignore the Karma error or treat a zero process exit code as sufficient when the runner output reports a reload.

## Build-warning completion

The skipped-selector warnings originate from the imported Preline variant source. First prove whether the application uses those `hs-*` variant classes. If not, remove only the unused import while retaining any separately used Preline runtime behavior.

The new-view component stylesheet must return below its configured warning budget by deleting or consolidating selectors that are demonstrably unused after the recent UI cleanup. Do not increase the warning or error thresholds to conceal the component size.

Existing unrelated styling remains untouched.

## Automated coverage

Add focused tests that verify:

- the wallpaper is selected only from the approved asset manifest;
- selection remains stable throughout one component lifetime;
- deterministic random values select the expected first and last assets;
- existing `/new-view`, `/modify-character`, route-shell, migration, cards, dice, and classic-sheet behavior remains green.

Run the full headless Angular suite alone and then the production build. Both commands must finish without application errors or build warnings attributable to this completion work.

## Functional QA

Use a disposable browser-local character state, never the user's existing browser data.

### `/modify-character`

- Open all seven steps using direct tab, keyboard, and Previous/Next navigation.
- Change the character name, alignment, level/HP progression, one background list, species profile, one ability, currency, and one inventory item.
- Navigate to `/new-view` and confirm the changes appear immediately.
- Reload, return to the builder, and confirm persistence.
- Verify inventory removal confirmation, focus restoration, and final review links.

### `/new-view`

- Confirm a supplied wallpaper is visible and stays unchanged during tab and drawer interactions.
- Exercise all six workspaces.
- Roll local dice, filter Actions, search/draw a tarot card, edit inventory/coins, use a feature, update notes, and exercise HP/rest/condition/settings drawers.
- Confirm the equipped Shortsword appears in Actions and Inventory without duplication.
- Verify navigation to the builder does not reload the document.

### Viewports

Repeat layout checks at representative desktop, landscape tablet, intermediate tablet, and phone portrait sizes. Confirm readable controls, visible focus, 44-pixel targets, usable drawers, and no horizontal document overflow.

## Acceptance criteria

1. All seven supplied images are optimized and available to `/new-view` as known local wallpaper assets.
2. One wallpaper is selected per `NewViewPage` lifetime with a charcoal fallback.
3. Wallpaper selection has deterministic regression coverage.
4. The full Karma run completes without a page-reload error.
5. The production build completes without the known skipped-selector or component-style-budget warnings.
6. Existing character calculations, persistence, cards, dice, classic routes, and both new surfaces remain green.
7. `/modify-character` edits persist into `/new-view` and survive reload.
8. Both routes pass desktop, tablet, and phone browser QA with no horizontal overflow or document reload.
9. Only files required for these completion outcomes are changed.

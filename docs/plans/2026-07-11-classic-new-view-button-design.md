# Classic Sheet New View Button

**Date:** 2026-07-11  
**Status:** Approved for implementation  
**Routes:** classic character routes, `/new-view`

## Intent

Give the classic character sheet a direct, visible path to the standalone play sheet without changing the existing menu structure or standalone page chrome.

## Chosen approach

Add a compact `New View` router link immediately before the portrait in `NavComponent`'s end slot. Style it as a button while retaining anchor semantics so Angular performs client-side navigation to `/new-view`.

This is preferred over adding another menu tab, which would not meet the requested portrait placement, and over imperative click handling, which would add unnecessary component code.

## Scope

- Show the control wherever the classic navigation and portrait are shown.
- Keep the portrait at the far end of the navigation bar.
- Use the exact visible label `New View` and destination `/new-view`.
- Reuse the existing compact navigation layout and color system.
- Do not add the control to `/new-view` or `/modify-character`, where the classic navigation is intentionally hidden.

## Verification

- Add a focused `NavComponent` assertion for the visible label and route destination.
- Run the focused nav spec and the production build.
- Confirm the change includes no unrelated untracked files.

## Acceptance criteria

1. A `New View` button appears next to the portrait on the classic sheet.
2. Activating it navigates to `/new-view` through the Angular router.
3. The existing classic navigation and portrait remain intact.
4. The control has visible keyboard focus and remains usable in the responsive menubar layout.

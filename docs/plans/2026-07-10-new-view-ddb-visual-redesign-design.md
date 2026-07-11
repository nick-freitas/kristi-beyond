# D&D Beyond-Inspired Visual Redesign for `/new-view`

**Date:** 2026-07-10
**Status:** Approved
**Route:** `/new-view`
**Supersedes:** The "oracle's field dossier" visual direction in `2026-07-10-new-view-character-sheet-design.md`

## Correction and intent

The first implementation followed the screenshots' information architecture but intentionally departed from their appearance. That interpretation was incorrect. The redesign must be recognizably similar to the supplied D&D Beyond character-sheet screenshots in visual language as well as structure, while continuing to use Vasha's content and avoiding copied logos or proprietary ornamental artwork.

This is a visual-system and composition redesign, not a behavior rewrite. Existing state mutations, local dice, cards and tarot, accessibility behavior, persistence, route isolation, and classic-route compatibility remain intact.

## Chosen approach

Use a **close visual translation** rather than a loose fantasy interpretation or pixel-for-pixel clone.

- Match the screenshots' palette, density, typography character, panel hierarchy, border language, and drawer presentation closely.
- Preserve Vasha's portrait, character data, Wild Oracle terminology, and the application's own route identity.
- Do not reproduce the D&D Beyond logo, wordmark, proprietary icons, or exact ornamental assets.
- Construct decorative frames and background atmosphere with scoped CSS rather than traced screenshot assets.

## Visual system

### Palette

- Header and global structural bars: charcoal and blue-charcoal (`#20272c`, `#2a2c2b`).
- Sheet surface: clean white and cool off-white (`#ffffff`, `#f7f7f5`).
- Structural borders and labels: medium gray (`#555a58`, `#7a858b`).
- Secondary text and controls: blue-gray (`#71808a`, `#aeb8bf`).
- Character atmosphere: desaturated violet and lavender watercolor around the sheet perimeter, especially behind the reference columns.
- Interaction accents: restrained cool blue for proficiency/selection and green/red only for healing and damage states.

The existing green, brass, oxblood, and sepia dossier palette is removed from `/new-view`.

### Typography

- Use a compact condensed sans-serif for headings, labels, tab names, and prominent statistics.
- Use a neutral readable sans-serif for descriptions and controls.
- Character name is light-to-regular weight and spacious, matching the understated header treatment in the references.
- Remove the chunky display face and serif body treatment.
- Labels are mostly uppercase, compact, and blue-gray; values remain black or charcoal.

Use locally available font stacks or existing dependencies so the sheet does not require a network font request.

### Shape and border language

- Stat modules use thin gray angular or clipped-corner frames with white fills.
- Ability modifiers sit in small inset rectangles; scores sit in overlapping oval pills.
- Armor Class uses a shield-like CSS silhouette; initiative uses a compact hexagonal frame.
- Saving throws, passives, and skills use thin separators, small proficiency dots, and modest bordered modifier chips.
- Large regions use white panels with hand-cut or clipped corners and a double-line/offset-outline impression.
- Corners remain mostly square or lightly clipped; remove the large rounded cards and pill-heavy dossier styling.

## Composition

### Wide landscape and desktop

At approximately 2048×1152 and conventional desktop widths:

1. A slim blue-charcoal top band establishes the page edge without copying the D&D Beyond wordmark.
2. A full-width charcoal identity header contains Vasha's portrait, name, lineage, class, level, and compact utility controls.
3. A horizontal stat row places all six abilities first, followed by proficiency, movement, inspiration, and HP.
4. The sheet body uses the screenshot's persistent three-zone layout:
   - left: saving throws, passives, senses, and proficiencies;
   - center: the complete skill list;
   - right: initiative, AC, defenses/conditions, then the large tabbed workspace.
5. The right workspace is the dominant white panel, with a restrained gray uppercase tab strip and dense list/detail content.

The primary page should read as one continuous character sheet rather than a collection of dashboard cards.

### Tablet and narrow layouts

- Preserve the same visual system rather than switching to a separate mobile aesthetic.
- Landscape tablet keeps the three-zone relationship whenever space permits.
- At narrower widths, abilities wrap cleanly and reference rails collapse into full-width gray-headed sections above the workspace.
- Controls stay at least 44×44 CSS pixels without visually inflating the sheet.
- No horizontal page scrolling.

## Header

- Replace the tall green-brown hero block with a compact charcoal identity bar.
- Portrait is a simple square with a subtle gray border.
- Name, lineage, class, and level follow the hierarchy visible in the supplied screenshots.
- Rest and classic-sheet actions become understated outlined dark-header buttons.
- Settings remains a compact icon button.
- Do not add a product logo that could be confused with D&D Beyond.

## Persistent statistics

- Rebuild the ability cards to closely match the reference proportions: label, inset modifier, and overlapping score oval.
- Proficiency, speed, inspiration, and HP use matching narrow framed modules.
- Saving throws become dense two-column rows where space permits.
- Skills become a continuous white list with proficiency dots, governing ability abbreviations, names, and small bordered modifier boxes.
- Initiative, AC, spell save, and spell attack sit in an aligned summary row above the workspace.
- Defenses and conditions share a horizontal bordered region as in the references.

## Workspace and content

- Retain Actions, Cards & Tarot, Inventory, Features & Traits, and Notes.
- Tabs become flat uppercase text tabs with a simple dark underline; remove chunky filled-tab treatment.
- Workspace backgrounds are white, borders are gray, and content density increases.
- Attack and feature entries become rows or compact outlined sections instead of large rounded cards.
- Search fields and filters use light gray borders and simple controls.
- Cards may retain their art, but surrounding UI uses the same sheet treatment.

## Drawers

- HP, rest, conditions, and settings open as a clean white panel from the right, approximately 30–36% of a wide viewport and full width on narrow devices.
- The rest of the sheet remains visible under a subtle dark overlay.
- Drawer typography, dividers, square inputs, toggles, and dark action buttons closely follow the references.
- Preserve focus trapping, Escape dismissal, close control, focus restoration, and confirmations.

## Motion

- Use a quick, restrained drawer slide and subtle tab/content fade only.
- Remove ornamental entrance sequencing and decorative motion.
- Honor reduced-motion preferences.

## Implementation boundaries

- Prefer a scoped SCSS overhaul and small template-class adjustments over component or state rewrites.
- Keep every existing interaction and testable behavior.
- Do not modify global classic-route styling.
- Reuse the current portrait and card assets.
- Add no external runtime font or image dependency.

## Verification

### Automated

- Existing focused tests and the full suite remain green.
- Production build succeeds.
- Existing route, shell, persistence, mutation, and accessibility coverage remains intact.

### Visual

- Compare the live page directly with the supplied screenshots at approximately 2048×1152.
- Confirm the first impression is a close visual relative: charcoal header, purple-edged white sheet, condensed gray labels, angular stat frames, dense three-column layout, dominant white workspace, and white right drawer.
- Check an iPad landscape size and a narrow portrait size for overflow and hierarchy.
- Capture the default sheet plus HP, rest, and conditions drawers.
- Reject any result that still reads as green, sepia, brass, dossier-like, rounded-card-heavy, or typographically chunky.

## Acceptance criteria

1. A side-by-side comparison immediately shows the supplied screenshots as the visual source.
2. The green/brass/sepia dossier aesthetic is fully removed from `/new-view`.
3. The sheet remains original in branding and assets while closely translating the reference visual grammar.
4. Existing player-facing capabilities and persistence continue to work.
5. Wide and tablet layouts retain the reference hierarchy without horizontal overflow.
6. HP, rest, and conditions drawers visually match the clean white side-panel model.
7. Automated checks pass and shared-browser visual QA confirms the redesign.

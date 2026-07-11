# `/modify-character` Builder Flow

**Date:** 2026-07-11  
**Status:** Approved for autonomous implementation  
**Route:** `/modify-character`

## Intent

Add a standalone, tablet-friendly character modification flow beside `/new-view`. The supplied D&D Beyond screenshots establish the interaction model: a dark builder masthead, numbered horizontal steps, a persistent character identity strip, a wide paper editing canvas, expandable configuration sections, and clear previous/next movement.

This is an editor for the character model this application actually owns. It is not a generic fifth-edition rules compendium or a character-generation engine. Every editable control must map to persisted `SourceCharacterState`, immediately update the same local character used by the classic sheet and `/new-view`, and keep derived statistics trustworthy.

## Chosen approach

Create one lazy-loaded standalone Angular page with seven in-page steps:

1. Home
2. Class
3. Background
4. Species
5. Abilities
6. Equipment
7. What's Next

The page owns wizard navigation and draft-free controls. `CharacterService` owns mutations, validation, clamping, persistence, and derived state. This avoids duplicating a second character store and ensures changes appear immediately in `/new-view`.

The route is standalone and hides the classic global navigation exactly as `/new-view` does.

## Product and visual direction

The memorable visual idea is a **field manual for rebuilding Vasha**: charcoal builder chrome framing a luminous, lightly textured paper workspace.

- Use a compact dark masthead with “Character Builder,” portrait, character name, level, and quick links back to the play sheet.
- Use a horizontally scrollable numbered step rail with a strong cyan active underline and completed-step marks.
- Keep the central editing surface restrained and legible: white paper, cool-gray dividers, square controls, angular disclosure edges, and a narrow blue/green completion accent.
- Reuse the neutral sans-serif body and condensed display language established in `/new-view`.
- Do not copy D&D Beyond branding, logos, marketplace navigation, or unrelated product chrome.
- Use only restrained transition motion and honor reduced-motion preferences.
- All controls must expose hover, active, disabled, and unclipped keyboard-focus states with at least 44-by-44 CSS-pixel targets.

## Shared builder shell

Every step includes:

- the persistent masthead and seven-step tab rail;
- a compact identity editor with portrait and character-name field;
- a step title, purpose copy, completion summary, and relevant controls;
- Previous and Next buttons at both practical navigation boundaries;
- immediate local persistence and a visible “Saved locally” status;
- responsive behavior with no horizontal page overflow.

Tabs remain directly selectable. Left/Right, Home, and End keys move among tabs. Previous/Next uses the same ordered step list. On phones, the rail scrolls horizontally and editing layouts stack.

## Step behavior

### Home

- Edit character name and alignment.
- Show current race, background, class, subclass, level, HP, AC, proficiency, and primary movement as a live overview.
- Edit the three supported currencies (GP, SP, CP) through non-negative numeric fields.
- Explain that all changes are local and shared with both character-sheet views.

### Class

- Present the primary homebrew class and subclass as editable text while clearly identifying this app's Wild Oracle-specific feature set.
- Edit level from 1–20 and hit die from d6, d8, d10, or d12.
- Keep `rolledHP` aligned to level: truncate excess levels and fill added levels with a safe hit-die average.
- Edit each per-level HP roll in an expandable progression list.
- Edit saving-throw and skill proficiencies using accessible toggles.
- Derived level, proficiency, max HP, attack, save, and skill values update immediately.

### Background

- Edit the background name with useful existing-character suggestions.
- Edit languages and tools as removable chips with add fields.
- Edit skill proficiencies that may come from the character's origin.
- Avoid fabricated automatic background rules; the user controls the stored proficiencies explicitly.

### Species

- Edit species/race name.
- Edit land, climb, swim, fly, and burrow speeds with non-negative clamping.
- Edit racial ability bonuses for all six abilities.
- Toggle the supported resistances, immunities, and inherent advantages present in the existing model.
- Explain that these are Vasha's stored traits, not a rules-compendium lookup.

### Abilities

- Edit the six base `rolledStats` values with bounds of 1–20.
- Show racial, feat/advancement, equipment override, final score, and modifier for each ability.
- Provide explicit override fields that may be cleared.
- Show a live derived-stat strip for initiative, spell save DC, spell attack, and key passive senses.
- Do not add a dice-generation subsystem; this step modifies the values already used by the sheet.

### Equipment

- Show carried weight, item count, attunement count, and GP-equivalent coin total.
- Provide inventory search and All, Equipped, Attunement, and Unequipped filters.
- Group attuned items before all remaining matching items.
- Every row can edit name, category, quantity, weight, value, notes, equipped state, attunement requirement, and attuned state.
- Support adding and removing inventory records with explicit confirmation for removal.
- Preserve gear-specific derived-stat metadata when ordinary item fields are edited.
- Edit the freeform additional-inventory notes.

### What's Next

- Present a live completion/review summary for identity, class, origin, species, abilities, equipment, HP, AC, saves, skills, and currency.
- Flag only genuinely incomplete or invalid stored values.
- Link prominently to `/new-view` to play and `/stats` for the classic sheet.
- Provide navigation back to any builder step without duplicating its controls.

## Validation and persistence

- Trim string inputs where an empty value would make the character unusable; retain the last valid required value or use a clear fallback.
- Clamp level to 1–20, hit die to the supported values, base ability values to 1–20, quantity/value/weight/speeds/currency to zero or greater, and racial bonuses to a small sane range.
- Clearing an optional override stores `undefined`, not zero.
- Attunement cannot remain active when an item no longer requires attunement.
- Inventory identity must not rely only on mutable item names; mutation methods use object identity/index semantics with safe fallbacks.
- All mutations write the canonical source state and persist immediately to local storage.

## Responsive behavior

- Desktop and landscape tablet retain a wide centered editing canvas.
- Intermediate tablets use two-column field groups where readable and stack dense matrices.
- Phones use one-column sections, horizontally scrollable tabs, full-width footer actions, and compact summary cards.
- No layout introduces horizontal document scrolling; table-like equipment rows become stacked edit records.

## Testing and verification

### Automated

- Service tests cover every new mutation family, bounds, HP-level alignment, inventory edit/add/remove, and immediate persistence.
- Page tests cover all seven tabs, keyboard and Previous/Next navigation, representative mutation controls in every step, equipment filtering/grouping, and final review links.
- Route and shell tests cover `/modify-character`, query strings, fragments, and trailing slashes.
- Existing `/new-view`, classic-sheet, service, cards, and dice tests remain green.

### Browser QA

- Exercise every tab and a representative edit in each.
- Confirm the edit appears in `/new-view`, then return to the builder and confirm persistence.
- Inspect desktop, landscape tablet, intermediate tablet, and phone portrait layouts.
- Verify tab scrolling, disclosures, focus treatment, touch sizes, removal confirmation, and no horizontal overflow.
- Run the full test suite and production build.

## Acceptance criteria

1. `/modify-character` exists beside `/new-view` and uses no global classic chrome.
2. Home, Class, Background, Species, Abilities, Equipment, and What's Next are all implemented and directly navigable.
3. Every control maps to real shared character state and persists locally.
4. Class level/HP, ability math, species traits, proficiencies, currencies, and inventory remain internally valid after edits.
5. The final review accurately reflects live derived values and links to both sheet views.
6. The builder matches the supplied structural reference while remaining visually consistent with this app.
7. Desktop, tablet, and phone layouts are accessible, touch-friendly, and free of horizontal page overflow.
8. Focused tests, the full suite, production build, and browser QA pass.

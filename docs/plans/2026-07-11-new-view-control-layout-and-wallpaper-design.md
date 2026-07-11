# `/new-view` Control, Layout, Inventory, Spells, and Wallpaper Refinement

**Date:** 2026-07-11
**Status:** Approved
**Route:** `/new-view`
**Builds on:** `2026-07-10-new-view-ddb-visual-redesign-design.md`

## Intent

Refine the standalone character sheet so every control and content region reads as one deliberate, D&D Beyond-inspired interface. The current view has a strong overall sheet composition, but several native controls and secondary regions have inconsistent styling, some top-level information is misplaced, and the layout remains less compact than the supplied references.

This refinement keeps all existing character mutations, persistence, local dice, cards and tarot behavior, route isolation, accessibility behavior, and classic-sheet compatibility. It does not redesign the classic routes.

## Chosen implementation approach

Build a scoped `/new-view` control system inside the existing Angular view.

- Define shared tokens and semantic styles for buttons, fields, tabs, segmented filters, disclosures, toggles, icon controls, confirmation controls, and drawers.
- Apply the primitives consistently to every interactive state in the page and cards panel.
- Prefer small template-class additions and typed view-state structures over extracting every control into a new Angular component.
- Do not migrate the view to PrimeNG, Angular Material, or another component framework; their structure and global themes do not match the supplied references.

This provides a consistent result with substantially less behavioral risk than a component rewrite.

## Global sheet structure

### Wallpaper

- Remove the synthetic purple radial-gradient background.
- Import each user-supplied image as a separate wallpaper asset.
- Convert source images to optimized WebP files, preserve aspect ratios, avoid upscaling, and cap oversized sources at approximately 1600–2048 pixels on the longest edge.
- Select one wallpaper once when `/new-view` initializes. Keep that selection stable until the page is reloaded.
- Use regular `background-size: cover` positioning with a restrained contrast veil only where needed for white-sheet readability.
- Do not use `background-attachment: fixed`; it previously caused pathological painting in the shared Chromium preview.
- Fall back to a neutral charcoal background if a wallpaper cannot load.

The supplied images currently exist only as chat-rendered attachments and must be supplied as actual workspace files before optimization.

### Product and identity header

- Remove the Daughter of Dusk product bar entirely.
- Make the identity header materially shorter.
- Reduce the portrait and supporting text scale while retaining a clear character-name hierarchy.
- Keep race, class, level, and subclass; remove the Hermit background label.
- Keep Classic Sheet, Short Rest, Long Rest, and Settings controls, but make them compact and consistently treated.
- Replace the current body typeface with a neutral system sans-serif stack. Condensed headings may remain where they match the reference, provided they do not make body copy feel distorted.

### Persistent statistics

- Narrow the six ability modules while increasing label, modifier, and score type sizes.
- The speed module displays the value `30` without the redundant word `feet`. Context-specific ranges elsewhere retain their units.
- Make the saving-throw panel shorter and narrower while increasing row and modifier type sizes.
- Keep skills dense and readable with consistent modifier controls.
- Place Initiative and Armor Class as independent shapes beside, but outside, the Defenses and Conditions region.
- Remove Spell Save and Spell Attack from the persistent top summary; they belong inside the Spells tab.

## Shared control system

Every interactive element receives the same family of visual and accessible states:

- **Default:** white or light-gray surface, high-contrast charcoal text, medium-gray border, compact square geometry.
- **Hover:** subtle cool-gray fill or darkening without layout movement.
- **Active/selected:** charcoal fill or strong underline, white text where appropriate, and `aria-pressed`/`aria-selected` agreement.
- **Keyboard focus:** clearly visible blue focus ring that is not clipped by angular frames.
- **Disabled:** visibly muted while retaining readable contrast and an unambiguous disabled cursor.
- **Destructive:** reserved red treatment for damage, removal, and reset actions.
- **Confirming:** dark confirmation panel with explicit cancel and confirm actions.

All buttons, links acting as buttons, inputs, selects, textareas, tabs, disclosures, segmented filters, increment/decrement controls, toggles, and drawer controls must use these states. Touch targets remain at least 44 by 44 CSS pixels.

## Primary tabs

The primary workspace order becomes:

1. Actions
2. Spells
3. Cards & Tarot
4. Inventory
5. Features & Traits
6. Notes

Keyboard arrow, Home, and End navigation must include the new Spells tab.

## Actions

Add a single-select filter strip above action content:

- All
- Attack
- Action
- Bonus Action
- Reaction
- Other
- Limited Use

`All` is the default. An entry may participate in multiple filters; for example, Convergent Return belongs to both Bonus Action and Limited Use. Filtering changes only visibility and does not mutate character state.

Move Shocking Grasp, Ray of Frost, Thaumaturgy, and Resistance out of Actions and into Spells. Keep feature-derived spell actions such as Vecna's Link and Detect Thoughts associated with their limited-use features.

## Spells

Add a dedicated Spells tab.

- Show Spell Save DC and Spell Attack in its header.
- Present Shocking Grasp, Ray of Frost, Thaumaturgy, and Resistance as compact rows or disclosures using the shared control system.
- Preserve existing attack, damage, and utility roll behavior.
- Keep the initial implementation focused on Vasha's existing spell content; do not introduce a general spell-preparation or slot-management subsystem.

## Inventory

Recompose Inventory around the supplied D&D Beyond reference.

### Summary and toolbar

- Remove the label: “Equipment changes update armor, attacks, and other derived statistics immediately.”
- Show calculated carried weight at the upper left.
- Show the current gold total at the upper right as the coin-management trigger.
- Follow with the search field and a compact segmented filter strip.
- Keep filters grounded in current data rather than inventing unsupported backpack/container state.

### Dense grouped table

Use a table-like layout with these columns where space permits:

- Active
- Name
- Weight
- Quantity
- Cost
- Notes

Display currently attuned items in the first named group and all remaining matching items in a second group. Preserve search and filters. Equip and attunement mutations remain available through consistent row controls.

On narrow screens, rows reflow into readable stacked records without horizontal page scrolling.

### Coin drawer

Clicking the gold summary opens a clean right-side `Manage Coin` drawer modeled on the supplied screenshot.

- Support only Gold (GP), Silver (SP), and Copper (CP), matching the existing character model.
- Display current totals in three clean currency rows.
- Provide separate adjustment inputs for GP, SP, and CP.
- Add applies all positive draft amounts; Remove subtracts them without allowing stored totals below zero.
- Clear resets only the draft adjustment inputs and never zeroes the saved currency totals.
- Omit Platinum, Electrum, settings, and lifestyle-expense UI.

## Notes

- Remove ruled or lined textarea backgrounds.
- Use clean white text areas with consistent border, padding, body type, focus treatment, and saved-state messaging.
- Preserve current immediate persistence behavior.

## Remaining content and drawers

- Cards & Tarot uses the same buttons, inputs, selects, tabs, list rows, focus states, and empty states as the parent sheet.
- Features & Traits uses the shared disclosures, limited-use controls, and disabled states.
- The dice launcher and tray use the shared icon-button, segmented-control, and history-action treatments.
- HP, rest, conditions, settings, and coin drawers share one header, field, divider, close-control, primary-action, confirmation, and toggle language.
- Preserve focus trapping, Escape dismissal, backdrop dismissal, focus restoration, and confirmation behavior.

## Responsive behavior

- Wide layouts retain the three-zone character-sheet hierarchy.
- Landscape tablet preserves the three zones where space permits.
- Narrow layouts use three abilities per row, full-width collapsible reference sections above the workspace, and full-width management drawers.
- The chosen wallpaper remains visible without causing horizontal overflow.
- No viewport may introduce horizontal page scrolling.

## Testing and verification

### Automated

- Verify wallpaper selection uses only known assets and stays stable for the component lifetime.
- Verify the Actions filters and multi-category membership.
- Verify keyboard tab navigation includes Spells.
- Verify Inventory groups attuned items before remaining items while preserving search and filters.
- Verify GP/SP/CP Add, Remove, Clear, persistence, and non-negative totals.
- Preserve all existing mutation, route, shell, local-dice, accessibility, and persistence tests.
- Run the full test suite and production build.

### Browser QA

- Inspect Actions in every filter state.
- Inspect Spells, Cards & Tarot, Inventory, Features & Traits, and Notes.
- Inspect the dice tray and HP, rest, conditions, settings, and coin drawers.
- Confirm every native control has intentional default, hover, focus, active, and disabled treatment.
- Verify desktop reference width, tablet landscape, intermediate collapsed-rail width, and narrow phone portrait.
- Confirm no horizontal overflow and no browser-default-looking control remains.

## Acceptance criteria

1. `/new-view` has one coherent control language across every tab and drawer.
2. The product bar and Hermit header label are removed, and the identity header is materially shorter.
3. Ability and saving-throw regions are smaller but more legible.
4. Initiative and AC are independent of Defenses/Conditions; spell statistics appear only in Spells.
5. Actions includes the approved filter strip and Spells contains the four existing spells.
6. Notes has no ruled background.
7. Inventory matches the supplied dense reference, groups attuned items first, and opens a GP/SP/CP coin drawer.
8. One optimized supplied wallpaper is selected randomly and remains stable per page load.
9. All controls are accessible, responsive, and visibly intentional.
10. The classic sheet remains unchanged and all automated and browser checks pass.

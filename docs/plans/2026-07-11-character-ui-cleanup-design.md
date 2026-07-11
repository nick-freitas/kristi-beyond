# Character UI Cleanup and Tarot Utility

**Date:** 2026-07-11  
**Status:** Approved from direct user feedback  
**Routes:** `/modify-character`, `/new-view`

## Intent

Reduce both character surfaces to information and controls that help at the table. The builder becomes a guided editor instead of a freeform database form. The play sheet keeps its existing D&D Beyond-inspired visual structure while removing labels that merely repeat the selected tab.

The memorable idea remains a compact field manual: the character art and paper workspace carry the personality, while controls are quiet, consistent, and immediately understandable.

## Chosen approach

Use a small data-driven layer for finite character choices and derived species facts. This is preferred over a cosmetic-only patch, which would leave invalid freeform combinations possible, and over a full rules engine, which would invent unsupported class, species, and spell-slot behavior.

The user’s “Short Short” request is interpreted as **Shortsword**. It becomes an equipped inventory weapon and therefore appears automatically in Actions through the existing equipped-weapon derivation.

The request for “spell slots for drawing from deck” is interpreted as **Wild Oracle card-level selection**. The class has card levels and draw actions, but the stored character has no spell-slot resource. Cards & Tarot will provide a compact draw-level selector and Draw button that selects an eligible equipped card. It will not pretend to spend a spell slot or add a false resource tracker.

## `/modify-character`

### Shell and hierarchy

- Remove the top Kristi Beyond masthead completely.
- Keep one compact builder identity area with portrait, character name, level, navigation arrows, and sheet links.
- Keep exactly one editable Character Name field.
- Remove step eyebrows, large repeated page headings, descriptions, completion labels, explanatory notes, and prose that tells the user what familiar sections mean.
- Preserve the numbered step rail, Previous/Next navigation, query-param deep links, keyboard behavior, persistence, and accessibility.

### Home

- Remove the duplicate name input and local-storage explanation.
- Make Alignment a select with common alignments plus the current Unknown value.
- Keep the live character summary.
- Render GP, SP, and CP as one compact row of three ordinary numeric fields without a large wallet card.

### Class

- Show class name, subclass, and hit die as read-only derived facts.
- Replace the level number input with a 1–20 select.
- Keep HP progression editing.
- Open Proficiencies by default.
- Standardize saving-throw controls on the same white control treatment used elsewhere.
- Put each Armor Training and Weapon Training add field before its badges so both columns remain aligned regardless of badge count.
- Use compact removable pills instead of large rectangular badges.

### Background

- Replace background free text with a select of common supported background names.
- Continue to let the user explicitly manage languages, tools, and skill proficiencies.
- Remove explanatory origin prose.

### Species

- Replace species free text with a select of explicitly supported profiles.
- Selecting a profile updates race, movement, racial adjustments, and the supported lineage traits together.
- Movement, racial adjustments, and lineage defenses become compact read-only facts; they are not individually editable.
- Supported profiles are Reborn Vistani, Human, High Elf, Hill Dwarf, and Lightfoot Halfling. Only traits represented by the current data model are displayed.

### Visual system

- Every text, number, search, and select control uses a white surface, dark text, one neutral border, and the same focus treatment.
- Native checkboxes remain recognizable and sit within white selectable rows.
- Removable pills use normal modern badge scale; the remove affordance remains keyboard accessible without visually inflating the pill.
- Remove dead CSS that belonged only to deleted mastheads, descriptions, and info notes.

## `/new-view`

### Tab content

- Remove the repeated main heading and explanatory sublabels from Actions, Spells, Inventory, Features & Traits, Notes, and Cards & Tarot.
- Preserve controls that were positioned beside those headings, such as Rage and spell statistics, by promoting them into compact utility rows.
- Auto-open action and feature detail cards so the table-ready information is visible immediately.

### Cards & Tarot

- Remove the outer card-sheet border/padding and the nested workspace padding so the tab content uses the workspace edge directly.
- Keep the Current Deck, Card Pool, and Readings modes.
- Search must match card number as well as name, effect, and reading text.
- Add a compact Draw Level selector plus Draw Card button. Drawing switches to Current Deck, filters to the selected accessible card level when supplied, and selects a random eligible equipped card.
- The first available card remains selected automatically, so entering the tab always shows card details.

### Shortsword

- Add one equipped Shortsword to the bundled character inventory with finesse, light, 1d6 piercing, and Dexterity-based proficient attack metadata.
- Migrate an existing saved Vasha only when no Shortsword is present, avoiding duplicates.
- Actions continues deriving weapon cards from equipped inventory; no duplicate hardcoded action is added.

## Reload diagnosis

The live route contains no form elements and no buttons without an explicit type. Browser evidence records the Angular/Vite development server disconnecting and reconnecting, which explains the observed page reloads while files were being saved or the old server session died. The detached review server will run with live reload disabled. Normal tab navigation remains client-side and will be regression-checked with a page-lifetime token.

## Verification

- Add focused tests for selects, read-only derived species/class facts, open proficiencies, compact hierarchy, and the absence of redundant copy.
- Add service tests for applying species profiles atomically and adding the Shortsword exactly once to old stored state.
- Add Cards & Tarot tests for numeric lookup, draw-level selection, random draw eligibility, and automatic first-card selection.
- Run the full Angular suite and production build.
- Browser-test builder tab navigation without document reload, all modified tabs, card lookup/draw, the derived Shortsword action, and tablet/mobile overflow.

## Acceptance criteria

1. The builder has no global top bar, duplicate name control, repeated step heading, or explanatory filler.
2. Alignment, level, background, and species use selects; class identity and species-derived facts cannot be typed over.
3. Proficiencies open by default and all controls share one visual language.
4. Training add rows align and removable pills are compact.
5. Play-sheet tabs do not repeat their own names or descriptions inside the panel.
6. Cards & Tarot uses the available width, supports number lookup and draw-by-card-level, and shows a card immediately.
7. The equipped Shortsword appears in both Inventory and Actions for fresh and existing saved characters without duplication.
8. Stable usage does not trigger document reloads; the detached review server does not live-reload while the user is inspecting it.

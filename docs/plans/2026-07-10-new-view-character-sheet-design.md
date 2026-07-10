# Standalone Character Sheet View

**Date:** 2026-07-10  
**Status:** Approved design  
**Route:** `/new-view`

## Purpose

Create a standalone, tablet-first character sheet for Vasha Taltos that brings every player-facing capability currently spread across the application into one cohesive view. The existing routes remain available as the classic interface, but `/new-view` must be sufficient for normal play without navigating away.

The information architecture follows the supplied D&D Beyond screenshots: a persistent character summary and rules reference surrounding one large, in-page content workspace, with focused management tasks opening in right-side drawers. The visual design will be original and specific to Vasha's Wild Oracle identity; it will not reuse D&D Beyond branding, logos, artwork, or proprietary ornamental assets.

## Audience and environment

- Primary user: the player operating Vasha during a live session.
- Primary device: a tablet browser in landscape orientation.
- Secondary layouts: narrower tablet portrait and desktop browser widths.
- Input: touch first, with complete keyboard support where a keyboard is present.
- The view uses the existing local character persistence and does not introduce accounts, a backend, or multi-character management.

## Product boundaries

### In scope

- A standalone `/new-view` route.
- No legacy navigation, toast chrome, or other application shell visible on this route.
- A small route-local way to return to the classic interface.
- All player-facing data and mutations already supported by `CharacterService`.
- Local dice rolling for rollable statistics and actions.
- Responsive tablet and desktop behavior.
- The existing routes and interface continue to work in parallel.

### Out of scope

- Sending rolls to D&D Beyond Maps or the D&D Beyond Game Log.
- Avrae, Discord, browser-extension, private-API, or headless-browser bridges.
- Recreating D&D Beyond branding or copying its visual assets.
- A new persistence backend, authentication, or campaign synchronization.
- Generalizing the application into a multi-character system.
- Refactoring unrelated legacy pages.

## Visual direction

The page should feel like an **oracle's field dossier**: pale vellum surfaces, charcoal structural lines, restrained oxblood accents, aged-brass details, and subtle cartographic or card-line textures. Typography should pair a condensed, authoritative display face with a highly readable text face. The result should feel tactile and purpose-built for play, not like a generic dashboard or a purple gradient fantasy template.

The screenshots determine the layout rhythm and hierarchy, not the brand treatment:

- dense persistent statistics;
- strong outlined containers;
- a dark character header;
- a large working panel;
- slide-over management surfaces;
- high-contrast, touch-sized controls.

## Information architecture

### 1. Character header

The full-width dark header contains:

- portrait;
- Vasha Taltos;
- Reborn Vistani;
- Wild Oracle 12;
- Fate of the Chosen;
- Hermit background;
- a compact link to the classic interface;
- short-rest and long-rest entry points.

### 2. Persistent quick-stat strip

Immediately below the header:

- Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma;
- score and modifier for each ability;
- proficiency bonus;
- movement speed with secondary movement modes;
- inspiration toggle;
- current/max/temporary HP summary.

All rollable values are buttons with an accessible name, visible focus state, and touch target of at least 44 by 44 CSS pixels.

### 3. Persistent reference columns

The main sheet uses the screenshot's three-zone structure.

**Left reference rail**

- saving throws with proficiency and advantage states;
- passive Perception, Investigation, and Insight;
- armor, weapon, tool, and language proficiencies.

**Center skill rail**

- all skills in one dense list;
- governing ability, proficiency indicator, and modifier;
- each row is locally rollable.

**Right workspace and combat summary**

- initiative;
- armor class;
- spell save DC and spell attack modifier;
- defenses, resistances, immunities, and active conditions;
- the large in-page content workspace described below.

On narrower layouts the reference rails become collapsible sections above the workspace rather than horizontal overflow.

### 4. In-page content workspace

The workspace changes content without changing routes. Its top-level tabs are:

1. **Actions**
   - attacks and equipped weapons;
   - cantrips and spell-like actions;
   - Draw Card;
   - bonus actions;
   - reactions;
   - campaign-specific actions;
   - feature-use controls relevant during play.

2. **Cards & Tarot**
   - current deck first;
   - cards outside the deck second;
   - search and level filters;
   - card art and full effects;
   - a reading mode containing the existing tarot interpretations;
   - clear visual distinction between game effects and readings.

3. **Inventory**
   - equipped equipment summary;
   - all inventory items;
   - equip/unequip;
   - attune/unattune;
   - quantities, categories, and notes;
   - additional-inventory notes;
   - wealth and wealth adjustments.

4. **Features & Traits**
   - Wild Oracle class features;
   - Fate of the Chosen subclass features;
   - Reborn racial traits;
   - Telepathic feat;
   - campaign-specific gifts and charms;
   - background feature;
   - ASI history;
   - limited-use controls alongside the relevant feature.

5. **Notes**
   - existing freeform additional-inventory text;
   - concise current-state reminders derived from the character, such as active conditions and unattuned required items;
   - no new general-purpose campaign database in this slice.

Tabs are URL-independent page state. Refreshing `/new-view` may return to the default Actions tab; tab persistence is not required.

## Management drawers

Drawers slide in from the right, matching the supplied interaction model. They trap focus while open, close via a visible button and Escape, and restore focus to the triggering control.

### HP drawer

- current, maximum, and temporary HP;
- damage and healing amount;
- preview of the resulting value before applying;
- maximum-HP modifier;
- death-save successes and failures;
- reset death saves.

### Rest drawer

- short-rest and long-rest explanations;
- current and maximum hit dice;
- hit-die adjustments;
- a concise list of character resources each rest will restore;
- explicit confirmation before applying the rest.

### Conditions drawer

- every condition currently supported by `SourceCharacterState`;
- active/inactive toggles;
- disabled states for relevant immunities;
- resistances, immunities, and advantage reminders.

### Settings drawer

- character-state reset behind a destructive confirmation;
- no raw state JSON in the player-facing interface.

## Local dice behavior

- Selecting an ability, saving throw, skill, initiative, attack, damage expression, or supported action rolls locally.
- Advantage and disadvantage are available from the roll interaction.
- Results show the individual dice, modifier, total, and label.
- A compact recent-roll history is available during the session.
- Roll history is ephemeral and need not survive refresh.
- No integration-warning label is displayed.
- The dice implementation remains isolated behind a small local service so a future destination can be added without changing the sheet components.

## State and architecture

- `CharacterService` remains the single source of truth.
- `/new-view` reads the existing computed `character` signal.
- Existing service mutations are reused for HP, temporary HP, rests, hit dice, death saves, conditions, inspiration, rage, wealth, feature uses, equipment, attunement, inventory notes, and reset.
- If the new UI needs a missing mutation, add the smallest explicit method to `CharacterService`; do not mutate returned state from the component.
- The existing local-storage schema and version behavior remain unchanged unless a new persisted field is strictly required. Local roll history is not persisted.
- Internal presentation components may be split for maintainability, but they compose one route and one visible page.

## Application-shell behavior

The current root component always renders the legacy navigation. Implementation must make route chrome conditional:

- classic routes render the existing navigation and toast/scroll affordances;
- `/new-view` renders only its standalone sheet chrome;
- direct navigation and browser refresh work for both modes;
- no global styling change may unintentionally restyle classic pages.

New-view styles should be scoped under the page component or a route-specific root class. Shared global tokens are acceptable only when they do not alter the existing interface.

## Accessibility and interaction quality

- Semantic buttons for every interactive statistic.
- Visible keyboard focus.
- Drawer focus management and Escape handling.
- Text alternatives for portrait and tarot-card images.
- Sufficient text and control contrast.
- Touch targets of at least 44 by 44 CSS pixels.
- Reduced-motion handling for the entrance sequence, tab transitions, drawers, and dice animation.
- No horizontal page scrolling at supported tablet widths.

## Error and edge-case behavior

- Empty numeric mutation fields do nothing rather than applying `NaN`.
- HP remains within zero and calculated maximum.
- Hit dice remain within zero and total level.
- Death saves display no more than three successes or failures.
- Rest and reset actions require confirmation because they change several values at once.
- Missing card images retain readable card names and effects.
- Long card and feature text scrolls within the workspace without moving persistent statistics off-screen on landscape tablets.
- Existing immunity rules continue disabling impossible condition toggles.

## Verification

### Automated

- Route test confirms `/new-view` renders the standalone page.
- Shell test confirms legacy navigation is hidden only on `/new-view`.
- Focused component tests cover tab changes, drawer opening/closing, and the primary mutations.
- Dice tests cover modifiers, advantage, disadvantage, damage expressions, and invalid expressions.
- Existing test suite remains green.
- Production build succeeds.

### Functional and visual

- Launch the real Angular application.
- Validate `/new-view` in the shared browser at a landscape tablet viewport close to 2048 by 1152.
- Validate a narrower tablet/portrait viewport.
- Exercise HP, short rest, long rest, conditions, inspiration, death saves, feature counters, equipment, attunement, inventory notes, wealth, tabs, card filtering, and local rolls.
- Refresh and confirm character state persists through the existing service.
- Navigate to classic routes and verify their previous UI and behavior are intact.
- Capture screenshots for visual review and iterate on overflow, density, and touch behavior.

## Acceptance criteria

The feature is complete when:

1. `/new-view` is a standalone route with no legacy navigation or shell chrome.
2. The player can reach every existing player-facing datum and action without leaving `/new-view`.
3. All mutations use the shared `CharacterService` and remain visible in the classic interface.
4. The supplied screenshot interaction model is recognizable in the hierarchy, workspace, and drawers, while the visual identity is original to the Wild Oracle.
5. The landscape tablet layout has no page-level horizontal overflow and the narrower layout remains usable.
6. Local rolls work for core statistics and supported actions.
7. Existing tests pass and a production build succeeds.
8. Real-browser functional and visual QA passes for the primary player workflow.

## Implementation coordination

Once implementation is explicitly started, create one Codex goal with the objective of delivering and verifying the complete standalone `/new-view` experience. Use bounded subagents only for non-overlapping work:

- one agent for the isolated local dice service and focused tests;
- one agent for route-shell behavior and its regression tests;
- one agent for a read-only inventory of content/state coverage or, once file ownership is explicit, a separate presentational component slice;
- the primary agent owns the page composition, visual system, integration, review, real-browser QA, and final verification.

Subagent output must be reviewed and integrated by the primary agent. Shared files such as `CharacterService`, the route table, global styles, and the top-level page component have one owner at a time.

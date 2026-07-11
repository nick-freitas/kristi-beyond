import { A11yModule } from '@angular/cdk/a11y';
import { DOCUMENT, CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../core/character.service';
import { CharacterState } from '../core/character-state.model';
import {
  Inventory,
  SourceCharacterState,
} from '../core/source-character-state.model';
import { ability } from '../data/dnd5e.system.data';
import { CardsPanelComponent } from './cards-panel.component';
import { LocalDiceService, RollMode } from './local-dice.service';

type WorkspaceTab =
  | 'actions'
  | 'spells'
  | 'cards'
  | 'inventory'
  | 'features'
  | 'notes';
type DrawerName = 'hp' | 'rest' | 'conditions' | 'settings' | 'coin';
type ActionFilter =
  | 'all'
  | 'attack'
  | 'action'
  | 'bonus'
  | 'reaction'
  | 'other'
  | 'limited';
type SkillKey = keyof CharacterState['skillModifiers'];
type ConditionKey = Exclude<
  keyof SourceCharacterState['conditions'],
  'exhaustion'
>;
type FeatureUsageKey = keyof SourceCharacterState['featureUsages'];
type Currency = keyof SourceCharacterState['wealth'];

interface SkillDefinition {
  readonly key: SkillKey;
  readonly label: string;
  readonly ability: ability;
  readonly shortAbility: string;
}

interface ConditionDefinition {
  readonly key: ConditionKey;
  readonly label: string;
  readonly icon: string;
}

interface FeatureDefinition {
  readonly name: string;
  readonly source: string;
  readonly level?: string;
  readonly description: string;
  readonly details?: readonly string[];
  readonly usage?: {
    readonly key: FeatureUsageKey;
    readonly max: number | 'proficiency';
    readonly recovery: string;
  };
}

interface FeatureGroup {
  readonly name: string;
  readonly subtitle: string;
  readonly features: readonly FeatureDefinition[];
}

export const NEW_VIEW_WALLPAPERS = [
  '/assets/wallpapers/happy-clouds.webp',
  '/assets/wallpapers/hermit-lantern.webp',
  '/assets/wallpapers/celestial-cats.webp',
  '/assets/wallpapers/moonlit-hands.webp',
  '/assets/wallpapers/floral-world.webp',
  '/assets/wallpapers/three-of-wands.webp',
  '/assets/wallpapers/lovers-heart.webp',
] as const;

export function selectNewViewWallpaper(
  randomValue: number,
): (typeof NEW_VIEW_WALLPAPERS)[number] {
  return NEW_VIEW_WALLPAPERS[
    Math.floor(randomValue * NEW_VIEW_WALLPAPERS.length)
  ];
}

@Component({
  selector: 'app-new-view',
  standalone: true,
  imports: [
    A11yModule,
    CardsPanelComponent,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './new-view.page.html',
  styleUrl: './new-view.page.scss',
})
export class NewViewPage {
  private readonly document = inject(DOCUMENT);
  readonly characterService = inject(CharacterService);
  readonly dice = inject(LocalDiceService);
  readonly character = this.characterService.character;
  readonly wallpaperUrl = selectNewViewWallpaper(Math.random());
  readonly wallpaperStyle = `url("${this.wallpaperUrl}")`;

  readonly activeTab = signal<WorkspaceTab>('actions');
  readonly activeDrawer = signal<DrawerName | null>(null);
  readonly rollMode = signal<RollMode>('normal');
  readonly diceTrayOpen = signal(false);
  readonly restConfirmation = signal<'short' | 'long' | null>(null);
  readonly resetConfirmation = signal(false);
  readonly actionFilter = signal<ActionFilter>('all');
  readonly inventorySearch = signal('');
  readonly inventoryFilter = signal<'all' | 'equipped' | 'attunement'>('all');
  readonly referenceCollapsed = signal(true);
  readonly skillsCollapsed = signal(true);

  hpAmount: number | null = 0;
  tempHpDraft: number | null = 0;
  maxHpModifierDraft: number | null = 0;
  wealthAmount: number | null = 0;
  wealthCurrency: Currency = 'gold';
  coinDraft: Record<Currency, number | null> = {
    gold: 0,
    silver: 0,
    copper: 0,
  };
  private drawerTrigger: HTMLElement | null = null;
  private readonly drawerScrollLock = effect((onCleanup) => {
    if (!this.activeDrawer()) return;

    const body = this.document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    onCleanup(() => {
      body.style.overflow = previousOverflow;
    });
  });

  readonly workspaceTabs: readonly WorkspaceTab[] = [
    'actions',
    'spells',
    'cards',
    'inventory',
    'features',
    'notes',
  ];

  readonly actionFilters: readonly {
    id: ActionFilter;
    label: string;
  }[] = [
    { id: 'all', label: 'All' },
    { id: 'attack', label: 'Attack' },
    { id: 'action', label: 'Action' },
    { id: 'bonus', label: 'Bonus Action' },
    { id: 'reaction', label: 'Reaction' },
    { id: 'other', label: 'Other' },
    { id: 'limited', label: 'Limited Use' },
  ];

  readonly abilityDefinitions: readonly {
    key: ability;
    short: string;
  }[] = [
    { key: 'Strength', short: 'STR' },
    { key: 'Dexterity', short: 'DEX' },
    { key: 'Constitution', short: 'CON' },
    { key: 'Intelligence', short: 'INT' },
    { key: 'Wisdom', short: 'WIS' },
    { key: 'Charisma', short: 'CHA' },
  ];

  readonly skills: readonly SkillDefinition[] = [
    {
      key: 'acrobatics',
      label: 'Acrobatics',
      ability: 'Dexterity',
      shortAbility: 'DEX',
    },
    {
      key: 'animalHandling',
      label: 'Animal Handling',
      ability: 'Wisdom',
      shortAbility: 'WIS',
    },
    {
      key: 'arcana',
      label: 'Arcana',
      ability: 'Intelligence',
      shortAbility: 'INT',
    },
    {
      key: 'athletics',
      label: 'Athletics',
      ability: 'Strength',
      shortAbility: 'STR',
    },
    {
      key: 'deception',
      label: 'Deception',
      ability: 'Charisma',
      shortAbility: 'CHA',
    },
    {
      key: 'history',
      label: 'History',
      ability: 'Intelligence',
      shortAbility: 'INT',
    },
    {
      key: 'insight',
      label: 'Insight',
      ability: 'Wisdom',
      shortAbility: 'WIS',
    },
    {
      key: 'intimidation',
      label: 'Intimidation',
      ability: 'Charisma',
      shortAbility: 'CHA',
    },
    {
      key: 'investigation',
      label: 'Investigation',
      ability: 'Intelligence',
      shortAbility: 'INT',
    },
    {
      key: 'medicine',
      label: 'Medicine',
      ability: 'Wisdom',
      shortAbility: 'WIS',
    },
    {
      key: 'nature',
      label: 'Nature',
      ability: 'Intelligence',
      shortAbility: 'INT',
    },
    {
      key: 'perception',
      label: 'Perception',
      ability: 'Wisdom',
      shortAbility: 'WIS',
    },
    {
      key: 'performance',
      label: 'Performance',
      ability: 'Charisma',
      shortAbility: 'CHA',
    },
    {
      key: 'persuasion',
      label: 'Persuasion',
      ability: 'Charisma',
      shortAbility: 'CHA',
    },
    {
      key: 'religion',
      label: 'Religion',
      ability: 'Intelligence',
      shortAbility: 'INT',
    },
    {
      key: 'sleightOfHand',
      label: 'Sleight of Hand',
      ability: 'Dexterity',
      shortAbility: 'DEX',
    },
    {
      key: 'stealth',
      label: 'Stealth',
      ability: 'Dexterity',
      shortAbility: 'DEX',
    },
    {
      key: 'survival',
      label: 'Survival',
      ability: 'Wisdom',
      shortAbility: 'WIS',
    },
  ];

  readonly conditions: readonly ConditionDefinition[] = [
    { key: 'blinded', label: 'Blinded', icon: '◉' },
    { key: 'charmed', label: 'Charmed', icon: '♡' },
    { key: 'deafened', label: 'Deafened', icon: '◖' },
    { key: 'frightened', label: 'Frightened', icon: '!' },
    { key: 'grappled', label: 'Grappled', icon: '⌁' },
    { key: 'incapacitated', label: 'Incapacitated', icon: '×' },
    { key: 'invisible', label: 'Invisible', icon: '◌' },
    { key: 'paralyzed', label: 'Paralyzed', icon: '‡' },
    { key: 'petrified', label: 'Petrified', icon: '◆' },
    { key: 'poisoned', label: 'Poisoned', icon: '☠' },
    { key: 'prone', label: 'Prone', icon: '⌄' },
    { key: 'restrained', label: 'Restrained', icon: '⌗' },
    { key: 'stunned', label: 'Stunned', icon: '✦' },
    { key: 'unconscious', label: 'Unconscious', icon: '☾' },
    { key: 'magicalSleep', label: 'Magical Sleep', icon: 'z' },
  ];

  readonly featureGroups: readonly FeatureGroup[] = [
    {
      name: 'Wild Oracle',
      subtitle: 'Class features · Wisdom is your oracle ability',
      features: [
        {
          name: 'Scrying',
          source: 'Wild Oracle',
          level: 'Level 2',
          description:
            'Study your wild tarot deck for at least 10 minutes. Reveal cards equal to your proficiency bonus, then place each on the top or bottom of the deck in any order.',
          usage: { key: 'scry', max: 1, recovery: 'Short or long rest' },
        },
        {
          name: "Fate's Hand",
          source: 'Fate of the Chosen',
          level: 'Level 3',
          description:
            'After a long rest, draw up to four cards face up into your hand. When you take the Draw Card action, you may play one of these instead of drawing from the deck.',
          details: ['Maximum hand size: 4 cards at level 12.'],
        },
        {
          name: 'Enhanced Card Selection',
          source: 'Fate of the Chosen',
          level: 'Level 3',
          description:
            'Whenever you gain a Wild Oracle level, add up to two cards to your deck and/or remove up to two cards from it.',
        },
        {
          name: 'Convergent Return',
          source: 'Fate of the Chosen',
          level: 'Level 6',
          description:
            'As a bonus action, expend one or more uses. For each use, reshuffle one expended card back into your deck.',
          usage: {
            key: 'convergentReturn',
            max: 2,
            recovery: 'Short or long rest',
          },
        },
        {
          name: 'Altered Outcome',
          source: 'Fate of the Chosen',
          level: 'Level 6',
          description:
            'As a reaction after learning whether your attack, check, or save succeeded, discard the top card and reroll. You must use the second result. This does not consume a Draw Card action.',
        },
        {
          name: 'Shared Destiny',
          source: 'Fate of the Chosen',
          level: 'Level 10',
          description:
            'As part of Draw Card, choose a willing ally within 30 feet. They activate the expended card as though they had drawn it.',
          usage: {
            key: 'sharedDestiny',
            max: 2,
            recovery: 'Short or long rest',
          },
        },
      ],
    },
    {
      name: 'Reborn Vistani',
      subtitle: 'Lineage traits and faded memory',
      features: [
        {
          name: 'Touch of Death',
          source: 'Reborn Vistani',
          description:
            'As an action, make an unarmed strike. On a hit at level 12, deal an additional 3d10 necrotic damage. Your necrotic attacks ignore resistance, and a creature grappling you or grappled by you takes 1d10 necrotic damage at the start of your turn.',
          details: [
            'Your bare touch carries pain that you cannot fully control. A creature damaged by it is temporarily scarred with the mark of a group, fiend, deity, or other force that has taken an interest in you.',
          ],
        },
        {
          name: 'Faded Memories',
          source: 'Reborn Vistani',
          description:
            'Moments of peace, stress, or excitement can surface dreamlike fragments from before your rebirth. Choose or roll among these lost-memory prompts:',
          details: [
            '1. You recall a physically painful moment. What mark or scar on your body does it relate to?',
            '2. A memory brings tears to your eyes. Is it bitter or cheerful, and does recalling it make you feel the same way?',
            '3. You recall a childhood memory. What about the event, or who you were then, still influences you?',
            '4. A memory brings the voice of someone once close to you. How do they advise you?',
            '5. You recall enjoying something you cannot stand doing now. What is it, and why do you dislike it now?',
            '6. A memory carries a vivid smell or sensation. What will you do to recreate that experience?',
          ],
        },
        {
          name: 'Deathless Nature',
          source: 'Reborn Vistani',
          description:
            'You have advantage against disease and poison, resistance to poison damage, and advantage on death saves. You do not need to eat, drink, breathe, or sleep; magic cannot put you to sleep. A conscious, motionless 4-hour rest can complete a long rest.',
        },
        {
          name: 'Knowledge from a Past Life',
          source: 'Reborn Vistani',
          description:
            'After seeing the d20 result of a skill check, roll a d6 and add it to the check.',
          usage: {
            key: 'pastKnowledge',
            max: 'proficiency',
            recovery: 'Long rest',
          },
        },
      ],
    },
    {
      name: 'Campaign & Background',
      subtitle: 'Gifts, secrets, and hermitage',
      features: [
        {
          name: 'Charm of the Creeping Hand',
          source: 'Supernatural Charm',
          description:
            'Once per turn when a weapon or unarmed strike hits, deal an extra 1d10 necrotic damage and gain 5 temporary HP. After five uses, the charm vanishes.',
          usage: { key: 'creepingHand', max: 5, recovery: 'Charm expires' },
        },
        {
          name: "Vecna's Link",
          source: 'Campaign Gift',
          description:
            'You have advantage on Insight checks and may cast See Invisibility as an action without a slot or components. Secrets can also be spent for specific advantages, but are erased from every mind when used.',
          usage: { key: 'vecnasLink', max: 1, recovery: 'Long rest' },
        },
        {
          name: 'Discover',
          source: 'Hermit Background',
          description:
            'Your seclusion revealed a unique and powerful truth, site, relic, or forgotten fact. Work with the DM to determine the discovery and its campaign impact.',
        },
      ],
    },
    {
      name: 'Feat & Advancement',
      subtitle: 'Telepathy and ability score history',
      features: [
        {
          name: 'Telepathic',
          source: "Tasha's Cauldron of Everything",
          level: 'Level 1 feat',
          description:
            'Speak telepathically to a creature you can see within 60 feet in a language you know. It understands only if it knows that language and cannot reply telepathically from this feature.',
          details: [
            'Increase Intelligence, Wisdom, or Charisma by 1, to a maximum of 20. Vasha selected Wisdom.',
            'Cast Detect Thoughts without a spell slot or components; Wisdom is the spellcasting ability.',
          ],
          usage: {
            key: 'telepathicDetectThoughts',
            max: 1,
            recovery: 'Long rest',
          },
        },
        {
          name: 'Ability Score Improvements',
          source: 'Wild Oracle',
          description:
            'Level 4: +1 Wisdom, +1 Dexterity. Level 8: +1 Wisdom, +1 Charisma. Level 12: +1 Wisdom, +1 Strength.',
        },
      ],
    },
  ];

  readonly filteredInventory = computed(() => {
    const search = this.inventorySearch().trim().toLowerCase();
    const filter = this.inventoryFilter();

    return this.character().inventory.filter((item) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'equipped' && item.equipped) ||
        (filter === 'attunement' && item.requiresAttunement);
      const matchesSearch =
        !search ||
        [item.name, item.category, item.notes]
          .join(' ')
          .toLowerCase()
          .includes(search);
      return matchesFilter && matchesSearch;
    });
  });

  readonly attunedInventory = computed(() =>
    this.filteredInventory().filter((item) => item.isAttuned),
  );

  readonly otherInventory = computed(() =>
    this.filteredInventory().filter((item) => !item.isAttuned),
  );

  readonly inventoryGroups = computed(() => [
    {
      id: 'attuned',
      label: 'Attuned Items',
      items: this.attunedInventory(),
    },
    {
      id: 'other',
      label: 'Other Inventory',
      items: this.otherInventory(),
    },
  ]);

  readonly carriedWeight = computed(() =>
    this.character().inventory.reduce(
      (total, item) => total + item.weight * item.qty,
      0,
    ),
  );

  readonly coinValueInGold = computed(() => {
    const wealth = this.character().wealth;
    return wealth.gold + wealth.silver / 10 + wealth.copper / 100;
  });

  readonly activeConditionLabels = computed(() => {
    const labels = this.conditions
      .filter((condition) =>
        Boolean(this.character().conditions[condition.key]),
      )
      .map((condition) => condition.label);
    const exhaustion = this.character().conditions.exhaustion || 0;
    return exhaustion > 0 ? [...labels, `Exhaustion ${exhaustion}`] : labels;
  });

  readonly unattunedItems = computed(() =>
    this.character().inventory.filter(
      (item) => item.requiresAttunement && !item.isAttuned,
    ),
  );

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.activeDrawer()) {
      this.closeDrawer();
    } else if (this.diceTrayOpen()) {
      this.diceTrayOpen.set(false);
    }
  }

  setActiveTab(tab: WorkspaceTab): void {
    this.activeTab.set(tab);
  }

  actionMatches(...categories: readonly ActionFilter[]): boolean {
    const selected = this.actionFilter();
    return selected === 'all' || categories.includes(selected);
  }

  inventoryWeight(items: readonly Inventory[]): number {
    return items.reduce((total, item) => total + item.weight * item.qty, 0);
  }

  onWorkspaceTabKeydown(event: KeyboardEvent, current: WorkspaceTab): void {
    const currentIndex = this.workspaceTabs.indexOf(current);
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % this.workspaceTabs.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex =
        (currentIndex - 1 + this.workspaceTabs.length) %
        this.workspaceTabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = this.workspaceTabs.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    const next = this.workspaceTabs[nextIndex];
    this.setActiveTab(next);
    window.setTimeout(() => document.getElementById(`nv-tab-${next}`)?.focus());
  }

  openDrawer(name: DrawerName, source: EventTarget | null): void {
    this.drawerTrigger = source instanceof HTMLElement ? source : null;
    this.restConfirmation.set(null);
    this.resetConfirmation.set(false);

    if (name === 'hp') {
      this.tempHpDraft = this.character().tempHp;
      this.maxHpModifierDraft = this.character().maxHpModifier;
    }

    if (name === 'coin') this.clearCoinDraft();

    this.activeDrawer.set(name);
  }

  openRestDrawer(type: 'short' | 'long', source: EventTarget | null): void {
    this.openDrawer('rest', source);
    this.restConfirmation.set(type);
  }

  closeDrawer(): void {
    this.activeDrawer.set(null);
    this.restConfirmation.set(null);
    this.resetConfirmation.set(false);
    const trigger = this.drawerTrigger;
    this.drawerTrigger = null;
    window.setTimeout(() => trigger?.focus());
  }

  formatModifier(value: number): string {
    return value >= 0 ? `+${value}` : `${value}`;
  }

  abilityIsProficient(key: ability): boolean {
    return Boolean(this.character().saveProficiencies[key]);
  }

  skillIsProficient(skill: SkillKey): boolean {
    return Boolean(this.character().skillProficiencies[skill]);
  }

  abilityRollMode(key: ability): RollMode {
    return this.character().abilityAdvantages[key] ? 'advantage' : 'normal';
  }

  saveRollMode(key: ability): RollMode {
    return this.character().saveAdvantages[key] ? 'advantage' : 'normal';
  }

  hasInitiativeAdvantage(): boolean {
    return this.characterService
      .getGearMods(this.character().equipped)
      .some((item) => Boolean(item.intiativeAdv));
  }

  rollAbility(key: ability): void {
    this.rollD20(
      `${key} check`,
      this.character().abilityModifiers[key],
      this.abilityRollMode(key),
    );
  }

  rollSave(key: ability): void {
    this.rollD20(
      `${key} saving throw`,
      this.character().saveModifiers[key],
      this.saveRollMode(key),
    );
  }

  rollSkill(skill: SkillDefinition): void {
    this.rollD20(
      `${skill.label} check`,
      this.character().skillModifiers[skill.key],
      this.skillRollMode(skill),
    );
  }

  skillRollMode(skill: SkillDefinition): RollMode {
    if (this.abilityRollMode(skill.ability) === 'advantage') return 'advantage';
    if (skill.key === 'insight') return 'advantage';

    const hasEquipmentAdvantage =
      skill.key === 'perception' &&
      this.characterService
        .getGearMods(this.character().equipped)
        .some((item) => Boolean(item.skillAdv?.[skill.ability]));
    return hasEquipmentAdvantage ? 'advantage' : 'normal';
  }

  rollInitiative(): void {
    this.rollD20(
      'Initiative',
      this.character().initiative,
      this.hasInitiativeAdvantage() ? 'advantage' : 'normal',
    );
  }

  rollSpellAttack(label: string): void {
    this.rollD20(label, this.character().spellAttackModifier);
  }

  rollWeaponAttack(item: Inventory): void {
    this.rollD20(`${item.name} attack`, item.itemSpecific.attackMod || 0);
  }

  rollWeaponDamage(item: Inventory): void {
    const damage = item.itemSpecific.damage;
    if (!damage) return;
    this.rollDamage(
      `${item.name} damage`,
      damage,
      item.itemSpecific.damageMod || 0,
    );
  }

  rollDamage(label: string, dice: string, modifier = 0): void {
    const notation = this.diceNotation(dice, modifier);
    if (this.dice.rollExpression(label, notation)) {
      this.diceTrayOpen.set(true);
    }
  }

  rollKnowledgeFromPastLife(): void {
    this.rollDamage('Knowledge from a Past Life', '1d6');
  }

  rollDeathSave(): void {
    this.rollD20(
      'Death saving throw',
      0,
      this.character().advantages.deathSaves ? 'advantage' : 'normal',
    );
  }

  rollD20(
    label: string,
    modifier: number,
    suggestedMode: RollMode = 'normal',
  ): void {
    this.dice.rollD20(
      label,
      modifier,
      this.combineRollModes(this.rollMode(), suggestedMode),
    );
    this.diceTrayOpen.set(true);
  }

  diceNotation(dice: string, modifier: number): string {
    if (modifier === 0) return dice;
    return `${dice}${modifier > 0 ? '+' : ''}${modifier}`;
  }

  hpPreview(kind: 'heal' | 'damage'): number {
    const amount = this.positiveNumber(this.hpAmount);
    const current = this.character().currentHp || 0;
    if (kind === 'heal') {
      return Math.min(this.character().totalMaxHP, current + amount);
    }

    return Math.max(0, current - Math.max(0, amount - this.character().tempHp));
  }

  applyHealing(): void {
    const amount = this.positiveNumber(this.hpAmount);
    if (!amount) return;
    this.characterService.heal(amount);
    this.hpAmount = 0;
  }

  applyDamage(): void {
    const amount = this.positiveNumber(this.hpAmount);
    if (!amount) return;
    this.characterService.takeDamage(amount);
    this.hpAmount = 0;
  }

  applyTempHp(): void {
    if (this.tempHpDraft === null) return;
    const tempHp = this.positiveNumber(this.tempHpDraft);
    this.tempHpDraft = tempHp;
    this.characterService.changeTempHp(tempHp);
  }

  applyMaxHpModifier(): void {
    if (this.maxHpModifierDraft === null) return;
    const value = Number(this.maxHpModifierDraft);
    if (!Number.isFinite(value)) return;
    this.maxHpModifierDraft = Math.trunc(value);
    this.characterService.changeMaxHpMod(this.maxHpModifierDraft);
    this.maxHpModifierDraft = this.character().maxHpModifier;
  }

  requestRest(type: 'short' | 'long'): void {
    this.restConfirmation.set(type);
  }

  applyRest(): void {
    const type = this.restConfirmation();
    if (!type) return;
    if (type === 'short') this.characterService.takeShortRest();
    else this.characterService.takeLongRest();
    this.restConfirmation.set(null);
  }

  changeHitDice(change: number): void {
    const current = this.character().currentHitDie || 0;
    const next = Math.max(
      0,
      Math.min(this.character().totalLevel, current + change),
    );
    if (next !== current) this.characterService.changeHitDie(next - current);
  }

  spendHitDie(): void {
    if ((this.character().currentHitDie || 0) < 1) return;
    const hitDie = this.character().classes[0]?.hitDie || 8;
    const result = this.dice.rollExpression(
      'Hit die recovery',
      this.diceNotation(
        `1d${hitDie}`,
        this.character().abilityModifiers.Constitution,
      ),
    );
    if (!result) return;
    this.characterService.changeHitDie(-1);
    this.characterService.heal(Math.max(0, result.total));
    this.diceTrayOpen.set(true);
  }

  toggleCondition(condition: ConditionDefinition): void {
    if (this.conditionIsDisabled(condition.key)) return;
    this.characterService.toggleCondition(condition.key);
  }

  conditionIsDisabled(condition: ConditionKey): boolean {
    return (
      (condition === 'magicalSleep' &&
        Boolean(this.character().immunities.magicalSleep)) ||
      (condition === 'poisoned' && Boolean(this.character().immunities.poison))
    );
  }

  changeExhaustion(change: number): void {
    this.characterService.changeExhaustion(change);
  }

  useFeature(feature: FeatureDefinition): void {
    const key = feature.usage?.key;
    if (!key || this.featureUses(feature) >= this.featureMax(feature)) return;

    switch (key) {
      case 'scry':
        this.characterService.scry();
        return;
      case 'convergentReturn':
        this.characterService.convergentReturn();
        return;
      case 'sharedDestiny':
        this.characterService.shareDestiny();
        return;
      case 'pastKnowledge':
        this.characterService.pastKnowledge();
        return;
      case 'telepathicDetectThoughts':
        this.characterService.telepathicDetectThoughts();
        return;
      case 'creepingHand':
        this.characterService.creepHand();
        return;
      case 'vecnasLink':
        this.characterService.useVecnaLink();
        return;
    }
  }

  featureUses(feature: FeatureDefinition): number {
    const key = feature.usage?.key;
    return key ? this.character().featureUsages[key] : 0;
  }

  featureMax(feature: FeatureDefinition): number {
    const max = feature.usage?.max;
    return max === 'proficiency' ? this.character().proficiency : max || 0;
  }

  toggleEquipment(item: Inventory): void {
    if (item.equipped) this.characterService.unequip(item);
    else this.characterService.equip(item);
  }

  toggleAttunement(item: Inventory): void {
    if (!item.requiresAttunement) return;
    if (item.isAttuned) this.characterService.unattune(item);
    else this.characterService.attune(item);
  }

  applyWealth(direction: 1 | -1): void {
    const amount = this.positiveNumber(this.wealthAmount) * direction;
    if (!amount) return;
    if (this.wealthCurrency === 'gold') this.characterService.modGold(amount);
    else if (this.wealthCurrency === 'silver')
      this.characterService.modSilver(amount);
    else this.characterService.modCopper(amount);
    this.wealthAmount = 0;
  }

  applyCoinDraft(direction: 1 | -1): void {
    const currencies: readonly Currency[] = ['gold', 'silver', 'copper'];

    for (const currency of currencies) {
      const amount = this.positiveNumber(this.coinDraft[currency]);
      const current = this.character().wealth[currency];
      const change =
        direction === 1 ? amount : -Math.min(amount, Math.max(0, current));
      if (change) this.modifyCurrency(currency, change);
    }

    this.clearCoinDraft();
  }

  clearCoinDraft(): void {
    this.coinDraft = { gold: 0, silver: 0, copper: 0 };
  }

  resetCharacter(): void {
    if (!this.resetConfirmation()) {
      this.resetConfirmation.set(true);
      return;
    }

    this.characterService.reloadCharacter();
    this.resetConfirmation.set(false);
    this.closeDrawer();
  }

  resistanceLabels(): readonly string[] {
    const defenses = this.character().resistances;
    return Object.entries(defenses)
      .filter(([, active]) => active)
      .map(([name]) => this.titleCase(name));
  }

  immunityLabels(): readonly string[] {
    const defenses = this.character().immunities;
    return Object.entries(defenses)
      .filter(([, active]) => active)
      .map(([name]) => this.titleCase(name));
  }

  advantageLabels(): readonly string[] {
    const advantages = this.character().advantages;
    return Object.entries(advantages)
      .filter(([, active]) => active)
      .map(([name]) => this.titleCase(name));
  }

  private titleCase(value: string): string {
    return value
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (letter) => letter.toUpperCase());
  }

  private modifyCurrency(currency: Currency, change: number): void {
    if (currency === 'gold') this.characterService.modGold(change);
    else if (currency === 'silver') this.characterService.modSilver(change);
    else this.characterService.modCopper(change);
  }

  private combineRollModes(selected: RollMode, inherent: RollMode): RollMode {
    if (selected === 'normal') return inherent;
    if (inherent === 'normal' || selected === inherent) return selected;
    return 'normal';
  }

  private positiveNumber(value: number | null | undefined): number {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? Math.max(0, Math.trunc(numeric)) : 0;
  }
}

import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CharacterState } from '../core/character-state.model';
import { CharacterService, SpeciesProfile } from '../core/character.service';
import { Inventory } from '../core/source-character-state.model';
import { abilities, ability } from '../data/dnd5e.system.data';

type BuilderStep =
  | 'home'
  | 'class'
  | 'background'
  | 'species'
  | 'abilities'
  | 'equipment'
  | 'next';

type InventoryFilter = 'all' | 'equipped' | 'attunement' | 'unequipped';
type SkillKey = keyof CharacterState['skillProficiencies'];
type SaveKey = ability;
type SpeedKey = keyof CharacterState['speeds'];

interface BuilderStepDefinition {
  readonly id: BuilderStep;
  readonly label: string;
  readonly shortLabel: string;
}

interface AbilityDefinition {
  readonly key: ability;
  readonly short: string;
  readonly label: string;
}

interface SkillDefinition {
  readonly key: SkillKey;
  readonly label: string;
  readonly ability: string;
}

@Component({
  selector: 'app-modify-character',
  standalone: true,
  imports: [A11yModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './modify-character.page.html',
  styleUrl: './modify-character.page.scss',
})
export class ModifyCharacterPage implements AfterViewInit {
  readonly characterService = inject(CharacterService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly character = this.characterService.character;

  readonly steps: readonly BuilderStepDefinition[] = [
    {
      id: 'home',
      label: 'Home',
      shortLabel: 'Home',
    },
    {
      id: 'class',
      label: '1. Class',
      shortLabel: 'Class',
    },
    {
      id: 'background',
      label: '2. Background',
      shortLabel: 'Background',
    },
    {
      id: 'species',
      label: '3. Species',
      shortLabel: 'Species',
    },
    {
      id: 'abilities',
      label: '4. Abilities',
      shortLabel: 'Abilities',
    },
    {
      id: 'equipment',
      label: '5. Equipment',
      shortLabel: 'Equipment',
    },
    {
      id: 'next',
      label: 'What’s Next',
      shortLabel: 'Review',
    },
  ];

  readonly abilities: readonly AbilityDefinition[] = [
    { key: 'Strength', short: 'STR', label: 'Strength' },
    { key: 'Dexterity', short: 'DEX', label: 'Dexterity' },
    { key: 'Constitution', short: 'CON', label: 'Constitution' },
    { key: 'Intelligence', short: 'INT', label: 'Intelligence' },
    { key: 'Wisdom', short: 'WIS', label: 'Wisdom' },
    { key: 'Charisma', short: 'CHA', label: 'Charisma' },
  ];

  readonly skills: readonly SkillDefinition[] = [
    { key: 'acrobatics', label: 'Acrobatics', ability: 'DEX' },
    { key: 'animalHandling', label: 'Animal Handling', ability: 'WIS' },
    { key: 'arcana', label: 'Arcana', ability: 'INT' },
    { key: 'athletics', label: 'Athletics', ability: 'STR' },
    { key: 'deception', label: 'Deception', ability: 'CHA' },
    { key: 'history', label: 'History', ability: 'INT' },
    { key: 'insight', label: 'Insight', ability: 'WIS' },
    { key: 'intimidation', label: 'Intimidation', ability: 'CHA' },
    { key: 'investigation', label: 'Investigation', ability: 'INT' },
    { key: 'medicine', label: 'Medicine', ability: 'WIS' },
    { key: 'nature', label: 'Nature', ability: 'INT' },
    { key: 'perception', label: 'Perception', ability: 'WIS' },
    { key: 'performance', label: 'Performance', ability: 'CHA' },
    { key: 'persuasion', label: 'Persuasion', ability: 'CHA' },
    { key: 'religion', label: 'Religion', ability: 'INT' },
    { key: 'sleightOfHand', label: 'Sleight of Hand', ability: 'DEX' },
    { key: 'stealth', label: 'Stealth', ability: 'DEX' },
    { key: 'survival', label: 'Survival', ability: 'WIS' },
  ];

  readonly alignmentOptions = [
    { value: 'UK', label: 'Unknown' },
    { value: 'LG', label: 'Lawful Good' },
    { value: 'NG', label: 'Neutral Good' },
    { value: 'CG', label: 'Chaotic Good' },
    { value: 'LN', label: 'Lawful Neutral' },
    { value: 'N', label: 'Neutral' },
    { value: 'CN', label: 'Chaotic Neutral' },
    { value: 'LE', label: 'Lawful Evil' },
    { value: 'NE', label: 'Neutral Evil' },
    { value: 'CE', label: 'Chaotic Evil' },
    { value: 'U', label: 'Unaligned' },
  ] as const;
  readonly backgroundOptions = [
    'Acolyte',
    'Charlatan',
    'Criminal',
    'Entertainer',
    'Folk Hero',
    'Guild Artisan',
    'Hermit',
    'Noble',
    'Outlander',
    'Sage',
    'Sailor',
    'Soldier',
    'Urchin',
  ] as const;
  readonly levelOptions = Array.from({ length: 20 }, (_, index) => index + 1);
  readonly speciesProfiles: readonly SpeciesProfile[] = [
    {
      race: 'Reborn Vistani',
      speeds: { land: 30, climb: 15, swim: 15 },
      racialAsis: { Constitution: 1, Intelligence: 1, Wisdom: 1 },
      resistances: { poison: true },
      immunities: { magicalSleep: true },
      advantages: { deathSaves: true, diseasePoison: true },
    },
    {
      race: 'Human',
      speeds: { land: 30 },
      racialAsis: {
        Strength: 1,
        Dexterity: 1,
        Constitution: 1,
        Intelligence: 1,
        Wisdom: 1,
        Charisma: 1,
      },
      resistances: {},
      immunities: {},
      advantages: {},
    },
    {
      race: 'High Elf',
      speeds: { land: 30 },
      racialAsis: { Dexterity: 2, Intelligence: 1 },
      resistances: {},
      immunities: { magicalSleep: true },
      advantages: {},
    },
    {
      race: 'Hill Dwarf',
      speeds: { land: 25 },
      racialAsis: { Constitution: 2, Wisdom: 1 },
      resistances: { poison: true },
      immunities: {},
      advantages: { diseasePoison: true },
    },
    {
      race: 'Lightfoot Halfling',
      speeds: { land: 25 },
      racialAsis: { Dexterity: 2, Charisma: 1 },
      resistances: {},
      immunities: {},
      advantages: {},
    },
  ];
  readonly speedDefinitions: readonly {
    key: SpeedKey;
    label: string;
  }[] = [
    { key: 'land', label: 'Walking' },
    { key: 'climb', label: 'Climb' },
    { key: 'swim', label: 'Swim' },
    { key: 'fly', label: 'Fly' },
    { key: 'burrow', label: 'Burrow' },
  ];

  readonly activeStep = signal<BuilderStep>(
    this.parseStep(this.route.snapshot.queryParamMap.get('step')),
  );
  readonly inventorySearch = signal('');
  readonly inventoryFilter = signal<InventoryFilter>('all');
  readonly inventoryRemoval = signal<Inventory | null>(null);
  newLanguage = '';
  newTool = '';
  newArmourProficiency = '';
  newWeaponProficiency = '';
  private inventoryRemovalTrigger: HTMLElement | null = null;

  readonly currentStepIndex = computed(() =>
    this.steps.findIndex((step) => step.id === this.activeStep()),
  );
  readonly previousStep = computed(() =>
    this.currentStepIndex() > 0
      ? this.steps[this.currentStepIndex() - 1]
      : null,
  );
  readonly nextStep = computed(() =>
    this.currentStepIndex() < this.steps.length - 1
      ? this.steps[this.currentStepIndex() + 1]
      : null,
  );
  readonly completedStepCount = computed(() => {
    const character = this.character();
    return [
      Boolean(character.name.trim() && character.alignment.trim()),
      Boolean(character.classes[0]?.class && character.totalLevel > 0),
      Boolean(character.background.trim()),
      Boolean(character.race.trim()),
      Object.values(character.rolledStats).every((score) => score > 0),
      true,
      true,
    ].filter(Boolean).length;
  });

  readonly filteredInventory = computed(() => {
    const query = this.inventorySearch().trim().toLowerCase();
    const filter = this.inventoryFilter();
    return this.character().inventory.filter((item) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'equipped' && item.equipped) ||
        (filter === 'attunement' && item.requiresAttunement) ||
        (filter === 'unequipped' && !item.equipped);
      const matchesSearch =
        !query ||
        [item.name, item.category, item.notes]
          .join(' ')
          .toLowerCase()
          .includes(query);
      return matchesFilter && matchesSearch;
    });
  });
  readonly inventoryGroups = computed(() => {
    const inventory = this.filteredInventory();
    return [
      {
        id: 'attuned',
        label: 'Attuned Items',
        items: inventory.filter((item) => item.isAttuned),
      },
      {
        id: 'other',
        label: 'Other Inventory',
        items: inventory.filter((item) => !item.isAttuned),
      },
    ].filter((group) => group.items.length);
  });
  readonly carriedWeight = computed(() =>
    this.character().inventory.reduce(
      (total, item) => total + item.weight * item.qty,
      0,
    ),
  );
  readonly attunedCount = computed(
    () => this.character().inventory.filter((item) => item.isAttuned).length,
  );
  readonly inventoryQuantity = computed(() =>
    this.character().inventory.reduce((total, item) => total + item.qty, 0),
  );
  readonly coinGoldEquivalent = computed(() => {
    const wealth = this.character().wealth;
    return wealth.gold + wealth.silver / 10 + wealth.copper / 100;
  });
  readonly reviewWarnings = computed(() => {
    const character = this.character();
    const warnings: string[] = [];
    if (!character.name.trim()) warnings.push('Character name is missing.');
    if (!character.classes[0]?.class) warnings.push('Class is missing.');
    if (!character.race.trim()) warnings.push('Species is missing.');
    if (!character.background.trim()) warnings.push('Background is missing.');
    if (character.rolledHP.length !== character.totalLevel) {
      warnings.push('Hit point rolls do not match the current level.');
    }
    if (
      character.inventory.some(
        (item) => item.isAttuned && !item.requiresAttunement,
      )
    ) {
      warnings.push('An attuned item no longer requires attunement.');
    }
    return warnings;
  });

  @HostListener('document:keydown.alt.arrowleft', ['$event'])
  handlePreviousShortcut(event: KeyboardEvent): void {
    if (!this.previousStep()) return;
    event.preventDefault();
    this.goPrevious();
  }

  @HostListener('document:keydown.alt.arrowright', ['$event'])
  handleNextShortcut(event: KeyboardEvent): void {
    if (!this.nextStep()) return;
    event.preventDefault();
    this.goNext();
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.inventoryRemoval()) this.cancelInventoryRemoval();
  }

  ngAfterViewInit(): void {
    window.setTimeout(() => this.scrollStepTabIntoView(this.activeStep()));
  }

  setStep(step: BuilderStep, focusTab = false, focusPanel = false): void {
    if (!this.steps.some((candidate) => candidate.id === step)) return;
    this.activeStep.set(step);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { step },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => {
      const tab = this.scrollStepTabIntoView(step);
      if (focusTab) tab?.focus();
      if (focusPanel) document.getElementById('builder-active-panel')?.focus();
    });
  }

  goPrevious(): void {
    const previous = this.previousStep();
    if (previous) this.setStep(previous.id, false, true);
  }

  goNext(): void {
    const next = this.nextStep();
    if (next) this.setStep(next.id, false, true);
  }

  onTabKeydown(event: KeyboardEvent, current: BuilderStep): void {
    const currentIndex = this.steps.findIndex((step) => step.id === current);
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % this.steps.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + this.steps.length) % this.steps.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = this.steps.length - 1;
    }
    if (nextIndex === null) return;
    event.preventDefault();
    this.setStep(this.steps[nextIndex].id, true);
  }

  private scrollStepTabIntoView(step: BuilderStep): HTMLElement | null {
    const tab = document.getElementById(`builder-tab-${step}`);
    tab?.scrollIntoView({ block: 'nearest', inline: 'center' });
    return tab;
  }

  formatModifier(value: number): string {
    return value >= 0 ? `+${value}` : `${value}`;
  }

  numberValue(value: unknown, fallback = 0): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  optionalNumber(value: unknown): number | undefined {
    if (value === '' || value === null || value === undefined) return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  checked(event: Event): boolean {
    return event.target instanceof HTMLInputElement && event.target.checked;
  }

  updateSkill(key: SkillKey, enabled: boolean): void {
    this.characterService.updateSkillProficiencies({ [key]: enabled });
  }

  updateSave(key: SaveKey, enabled: boolean): void {
    this.characterService.updateSaveProficiencies({ [key]: enabled });
  }

  addLanguage(): void {
    const language = this.newLanguage.trim();
    if (!language) return;
    if (
      !this.character().languages.some(
        (entry) => entry.toLowerCase() === language.toLowerCase(),
      )
    ) {
      this.characterService.setLanguages([
        ...this.character().languages,
        language,
      ]);
    }
    this.newLanguage = '';
  }

  removeLanguage(language: string): void {
    this.characterService.setLanguages(
      this.character().languages.filter((entry) => entry !== language),
    );
  }

  addTool(): void {
    const tool = this.newTool.trim();
    if (!tool) return;
    if (
      !this.character().tools.some(
        (entry) => entry.toLowerCase() === tool.toLowerCase(),
      )
    ) {
      this.characterService.setTools([...this.character().tools, tool]);
    }
    this.newTool = '';
  }

  removeTool(tool: string): void {
    this.characterService.setTools(
      this.character().tools.filter((entry) => entry !== tool),
    );
  }

  addArmourProficiency(): void {
    const value = this.newArmourProficiency.trim();
    if (!value) return;
    this.characterService.setArmourProficiencies(
      this.uniqueAppend(this.character().armourProficiencies, value),
    );
    this.newArmourProficiency = '';
  }

  removeArmourProficiency(value: string): void {
    this.characterService.setArmourProficiencies(
      this.character().armourProficiencies.filter((entry) => entry !== value),
    );
  }

  addWeaponProficiency(): void {
    const value = this.newWeaponProficiency.trim();
    if (!value) return;
    this.characterService.setWeaponProficiencies(
      this.uniqueAppend(this.character().weaponProficiencies, value),
    );
    this.newWeaponProficiency = '';
  }

  removeWeaponProficiency(value: string): void {
    this.characterService.setWeaponProficiencies(
      this.character().weaponProficiencies.filter((entry) => entry !== value),
    );
  }

  selectSpecies(race: string): void {
    const profile = this.speciesProfiles.find(
      (candidate) => candidate.race === race,
    );
    if (profile) this.characterService.updateSpeciesProfile(profile);
  }

  updateBaseAbility(key: ability, value: unknown): void {
    this.characterService.updateRolledStats({
      [key]: this.numberValue(value, 1),
    });
  }

  updateAbilityOverride(key: ability, value: unknown): void {
    this.characterService.updateOverrideAbilityScores({
      [key]: this.optionalNumber(value),
    });
  }

  updateInventoryField<K extends keyof Inventory>(
    item: Inventory,
    field: K,
    value: Inventory[K],
  ): void {
    const index = this.character().inventory.indexOf(item);
    if (index < 0) return;
    const changes: Partial<Inventory> = { [field]: value };
    if (field === 'requiresAttunement' && !value) changes.isAttuned = false;
    this.characterService.updateInventoryItem(index, changes);
  }

  updateInventoryNumber(
    item: Inventory,
    field: 'qty' | 'weight' | 'value',
    value: unknown,
  ): void {
    const parsed = Math.max(0, this.numberValue(value));
    this.updateInventoryField(
      item,
      field,
      (field === 'qty'
        ? Math.trunc(parsed)
        : parsed) as Inventory[typeof field],
    );
  }

  addInventoryItem(): void {
    this.characterService.addInventoryItem({
      qty: 1,
      name: 'New Item',
      value: 0,
      weight: 0,
      notes: '',
      requiresAttunement: false,
      isAttuned: false,
      equipped: false,
      category: 'Gear',
      itemSpecific: {},
    });
  }

  requestInventoryRemoval(item: Inventory, source: EventTarget | null): void {
    this.inventoryRemovalTrigger =
      source instanceof HTMLElement ? source : null;
    this.inventoryRemoval.set(item);
  }

  cancelInventoryRemoval(): void {
    this.inventoryRemoval.set(null);
    const trigger = this.inventoryRemovalTrigger;
    this.inventoryRemovalTrigger = null;
    window.setTimeout(() => trigger?.focus());
  }

  confirmInventoryRemoval(): void {
    const item = this.inventoryRemoval();
    if (!item) return;
    const index = this.character().inventory.indexOf(item);
    if (index >= 0) this.characterService.removeInventoryItem(index);
    this.inventoryRemoval.set(null);
    this.inventoryRemovalTrigger = null;
    window.setTimeout(() =>
      document.querySelector<HTMLElement>('.builder-add-item')?.focus(),
    );
  }

  inventoryWeight(items: readonly Inventory[]): number {
    return items.reduce((total, item) => total + item.weight * item.qty, 0);
  }

  featContribution(key: ability): number {
    return this.character().feats.filter((feat) => feat.asi === key).length;
  }

  asiContribution(key: ability): number {
    return this.character().asis.reduce(
      (total, entry) => total + (entry[key] ?? 0),
      0,
    );
  }

  equipmentOverride(key: ability): number | undefined {
    return this.characterService
      .getGearMods(this.character().equipped)
      .map((item) => item.overrideAbilityScore?.[key])
      .find((value): value is number => value !== undefined);
  }

  trackInventoryItem(index: number, item: Inventory): string {
    return `${index}-${item.name}`;
  }

  private parseStep(value: string | null): BuilderStep {
    return this.steps.some((step) => step.id === value)
      ? (value as BuilderStep)
      : 'home';
  }

  private uniqueAppend(values: readonly string[], value: string): string[] {
    return values.some((entry) => entry.toLowerCase() === value.toLowerCase())
      ? [...values]
      : [...values, value];
  }
}

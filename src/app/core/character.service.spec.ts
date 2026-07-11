import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { provideExperimentalCheckNoChangesForDebug } from '@angular/core';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterService);
  });

  afterEach(() => localStorage.clear());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calcProficiencyModifier', () => {
    it('works', () => {
      expect(service.calcProficiencyModifier(1)).toBe(2);
      expect(service.calcProficiencyModifier(2)).toBe(2);
      expect(service.calcProficiencyModifier(3)).toBe(2);
      expect(service.calcProficiencyModifier(4)).toBe(2);

      expect(service.calcProficiencyModifier(5)).toBe(3);
      expect(service.calcProficiencyModifier(6)).toBe(3);
      expect(service.calcProficiencyModifier(7)).toBe(3);
      expect(service.calcProficiencyModifier(8)).toBe(3);

      expect(service.calcProficiencyModifier(9)).toBe(4);
      expect(service.calcProficiencyModifier(10)).toBe(4);
      expect(service.calcProficiencyModifier(11)).toBe(4);
      expect(service.calcProficiencyModifier(12)).toBe(4);

      expect(service.calcProficiencyModifier(13)).toBe(5);
      expect(service.calcProficiencyModifier(14)).toBe(5);
      expect(service.calcProficiencyModifier(15)).toBe(5);
      expect(service.calcProficiencyModifier(16)).toBe(5);

      expect(service.calcProficiencyModifier(17)).toBe(6);
      expect(service.calcProficiencyModifier(18)).toBe(6);
      expect(service.calcProficiencyModifier(19)).toBe(6);
      expect(service.calcProficiencyModifier(20)).toBe(6);
    });
  });

  describe('calcModifier', () => {
    it('returns 0 for 10 and 11', () => {
      expect(service.calcModifier(10)).toBe(0);
      expect(service.calcModifier(11)).toBe(0);
    });

    it('returns positive for 12+', () => {
      expect(service.calcModifier(12)).toBe(1);
      expect(service.calcModifier(13)).toBe(1);
      expect(service.calcModifier(14)).toBe(2);
      expect(service.calcModifier(15)).toBe(2);
      expect(service.calcModifier(16)).toBe(3);
      expect(service.calcModifier(17)).toBe(3);
      expect(service.calcModifier(18)).toBe(4);
      expect(service.calcModifier(19)).toBe(4);
      expect(service.calcModifier(20)).toBe(5);
    });

    it('returns negative for 9-', () => {
      expect(service.calcModifier(9)).toBe(-1);
      expect(service.calcModifier(8)).toBe(-1);
      expect(service.calcModifier(7)).toBe(-2);
      expect(service.calcModifier(6)).toBe(-2);
      expect(service.calcModifier(5)).toBe(-3);
      expect(service.calcModifier(4)).toBe(-3);
      expect(service.calcModifier(3)).toBe(-4);
      expect(service.calcModifier(2)).toBe(-4);
      expect(service.calcModifier(1)).toBe(-5);
      expect(service.calcModifier(0)).toBe(-5);
    });
  });

  describe('changeExhaustion', () => {
    it('tracks exhaustion between zero and six', () => {
      service.changeExhaustion(2);
      expect(service.character().conditions.exhaustion).toBe(2);

      service.changeExhaustion(10);
      expect(service.character().conditions.exhaustion).toBe(6);

      service.changeExhaustion(-20);
      expect(service.character().conditions.exhaustion).toBe(0);
    });
  });

  it('restores a fresh bundled state after mutable condition and gear changes', () => {
    service.toggleCondition('blinded');
    const equippedItem = service
      .character()
      .inventory.find((item) => item.equipped)!;
    service.unequip(equippedItem);

    service.reloadCharacter();

    expect(service.character().conditions.blinded).toBeFalsy();
    expect(
      service
        .character()
        .inventory.find((item) => item.name === equippedItem.name)?.equipped,
    ).toBeTrue();
  });

  it('keeps maximum and current HP above zero for extreme modifiers', () => {
    service.changeMaxHpMod(-999);

    expect(service.character().totalMaxHP).toBe(1);
    expect(service.character().currentHp).toBe(1);
    expect(service.character().maxHpModifier).toBe(
      1 - service.character().totalInitialHP,
    );
  });

  it('writes mutations to the shared local character record', () => {
    service.takeDamage(7);
    const currentHp = service.character().currentHp;
    const saved = JSON.parse(localStorage.getItem('character')!);

    expect(saved.currentHp).toBe(currentHp);
  });

  it('restores mutations when the service is recreated', () => {
    const startingHp = service.character().currentHp!;
    service.takeDamage(7);
    const currentHp = service.character().currentHp;

    const restoredService = new CharacterService();

    expect(currentHp).toBe(startingHp - 7);
    expect(restoredService.character().currentHp).toBe(currentHp);
  });

  it('updates required identity fields and persists them immediately', () => {
    const originalRace = service.character().race;

    service.updateIdentity({
      name: '  Vasha Rewritten  ',
      race: '   ',
      background: 'Outlander',
      alignment: 'Neutral Good',
    });

    const saved = JSON.parse(localStorage.getItem('character')!);
    expect(service.character().name).toBe('Vasha Rewritten');
    expect(service.character().race).toBe(originalRace);
    expect(saved.name).toBe('Vasha Rewritten');
    expect(saved.background).toBe('Outlander');
    expect(saved.alignment).toBe('Neutral Good');
  });

  it('applies a species profile as one persisted derived-state update', () => {
    service.updateSpeciesProfile({
      race: 'Hill Dwarf',
      speeds: { land: 25 },
      racialAsis: {
        Strength: undefined,
        Dexterity: undefined,
        Constitution: 2,
        Intelligence: undefined,
        Wisdom: undefined,
        Charisma: undefined,
      },
      resistances: { poison: true },
      immunities: {},
      advantages: { diseasePoison: true },
    });

    const character = service.character();
    expect(character.race).toBe('Hill Dwarf');
    expect(character.speeds).toEqual({ land: 25 });
    expect(character.racialAsis.Constitution).toBe(2);
    expect(character.immunities.magicalSleep).toBeUndefined();
    expect(character.advantages.diseasePoison).toBeTrue();
    expect(JSON.parse(localStorage.getItem('character')!).race).toBe(
      'Hill Dwarf',
    );
  });

  it('preserves an existing saved character while migrating in one Shortsword', () => {
    const saved = structuredClone(service.character());
    saved.version = '250329A';
    saved.name = 'Vasha Preserved';
    saved.inventory = saved.inventory.filter(
      (item) => item.name.toLowerCase() !== 'shortsword',
    );
    localStorage.setItem('character', JSON.stringify(saved));

    const migrated = new CharacterService();
    const restoredAgain = new CharacterService();

    expect(migrated.character().name).toBe('Vasha Preserved');
    expect(
      migrated
        .character()
        .inventory.filter((item) => item.name.toLowerCase() === 'shortsword')
        .length,
    ).toBe(1);
    expect(
      migrated.character().inventory.find((item) => item.name === 'Shortsword')
        ?.equipped,
    ).toBeTrue();
    expect(
      restoredAgain
        .character()
        .inventory.filter((item) => item.name.toLowerCase() === 'shortsword')
        .length,
    ).toBe(1);
  });

  it('bundles one unequipped pair of Goggles of Night', () => {
    const goggles = service
      .character()
      .inventory.filter((item) => item.name === 'Goggles of Night');

    expect(goggles.length).toBe(1);
    expect(goggles[0]).toEqual(
      jasmine.objectContaining({
        qty: 1,
        category: 'Eyewear',
        requiresAttunement: false,
        isAttuned: false,
        equipped: false,
      }),
    );
    expect(goggles[0].notes).toContain('60 feet of darkvision');
  });

  it('migrates Goggles of Night into an existing saved character once', () => {
    const saved = structuredClone(service.character());
    saved.version = '250711B';
    saved.name = 'Vasha Preserved';
    saved.inventory = saved.inventory.filter(
      (item) => item.name.toLowerCase() !== 'goggles of night',
    );
    localStorage.setItem('character', JSON.stringify(saved));

    const migrated = new CharacterService();
    const restoredAgain = new CharacterService();

    expect(migrated.character().name).toBe('Vasha Preserved');
    expect(
      migrated
        .character()
        .inventory.filter(
          (item) => item.name.toLowerCase() === 'goggles of night',
        ).length,
    ).toBe(1);
    expect(
      restoredAgain
        .character()
        .inventory.filter(
          (item) => item.name.toLowerCase() === 'goggles of night',
        ).length,
    ).toBe(1);
  });

  it('clamps the primary class and aligns its HP progression', () => {
    service.updatePrimaryClass({
      class: 'Wizard',
      subclass: 'School of Divination',
      level: 99,
      hitDie: 99,
    });

    expect(service.character().classes[0]).toEqual({
      class: 'Wizard',
      subclass: 'School of Divination',
      level: 20,
      hitDie: 12,
    });
    expect(service.character().rolledHP.length).toBe(20);
    expect(service.character().rolledHP.at(-1)).toBe(7);
    expect(service.character().currentHitDie).toBeLessThanOrEqual(20);
    expect(JSON.parse(localStorage.getItem('character')!).hitDieType).toBe(
      'd12',
    );

    service.updatePrimaryClass({ level: -4, hitDie: 1 });
    expect(service.character().classes[0].level).toBe(1);
    expect(service.character().classes[0].hitDie).toBe(6);
    expect(service.character().rolledHP).toEqual([6]);
    expect(service.character().currentHitDie).toBeLessThanOrEqual(1);
  });

  it('updates individual HP rolls within the active hit die bounds', () => {
    service.updateRolledHp(1, 999);
    service.updateRolledHp(-1, 2);

    expect(service.character().rolledHP[1]).toBe(8);
    expect(service.character().rolledHP.length).toBe(
      service.character().classes[0].level,
    );
    expect(JSON.parse(localStorage.getItem('character')!).rolledHP[1]).toBe(8);
  });

  it('clamps base, racial, and override ability mutations', () => {
    service.updateRolledStats({ Strength: -20, Charisma: 200 });
    service.updateRacialAsis({ Strength: -20, Charisma: 200 });
    service.updateOverrideAbilityScores({
      Strength: 40,
      Dexterity: undefined,
    });

    expect(service.character().rolledStats.Strength).toBe(1);
    expect(service.character().rolledStats.Charisma).toBe(20);
    expect(service.character().racialAsis.Strength).toBe(-5);
    expect(service.character().racialAsis.Charisma).toBe(5);
    expect(service.character().overrideAbilityScores.Strength).toBe(30);
    expect(service.character().overrideAbilityScores.Dexterity).toBeUndefined();
    expect(
      JSON.parse(localStorage.getItem('character')!).rolledStats.Charisma,
    ).toBe(20);
  });

  it('normalises origin lists, speeds, proficiencies, and species traits', () => {
    service.setLanguages([' Common ', 'Sylvan', 'Common', '']);
    service.setTools([' Herbalism Kit ', 'Herbalism Kit', '']);
    service.updateSpeeds({ land: -10, climb: 35, fly: undefined });
    service.updateSkillProficiencies({ athletics: true, religion: false });
    service.updateSaveProficiencies({ Strength: true, Wisdom: false });
    service.setArmourProficiencies([' Light Armour ', 'Light Armour']);
    service.setWeaponProficiencies(['Simple Weapons', ' Simple Weapons ']);
    service.updateResistances({ poison: false, piercing: true });
    service.updateImmunities({ poison: true });
    service.updateAdvantages({ deathSaves: false, diseasePoison: true });

    expect(service.character().languages).toEqual(['Common', 'Sylvan']);
    expect(service.character().tools).toEqual(['Herbalism Kit']);
    expect(service.character().speeds.land).toBe(0);
    expect(service.character().speeds.climb).toBe(35);
    expect(service.character().speeds.fly).toBeUndefined();
    expect(service.character().skillProficiencies.athletics).toBeTrue();
    expect(service.character().skillProficiencies.religion).toBeFalse();
    expect(service.character().saveProficiencies.Strength).toBeTrue();
    expect(service.character().saveProficiencies.Wisdom).toBeFalse();
    expect(service.character().armourProficiencies).toEqual(['Light Armour']);
    expect(service.character().weaponProficiencies).toEqual(['Simple Weapons']);
    expect(service.character().resistances.piercing).toBeTrue();
    expect(service.character().immunities.poison).toBeTrue();
    expect(service.character().advantages.diseasePoison).toBeTrue();
    expect(JSON.parse(localStorage.getItem('character')!).speeds.land).toBe(0);
  });

  it('sets non-negative wealth totals and records their deltas', () => {
    const startingSilver = service.character().wealth.silver;

    service.setWealth({ gold: -50, silver: startingSilver + 17 });

    expect(service.character().wealth.gold).toBe(0);
    expect(service.character().wealth.silver).toBe(startingSilver + 17);
    expect(service.character().wealthTransaction.silver[0]).toBe(17);
    expect(JSON.parse(localStorage.getItem('character')!).wealth.gold).toBe(0);
  });

  it('updates HP settings and armour type without allowing an invalid maximum', () => {
    service.updateHpSettings({ maxHpModifier: -9999, maxHpOverride: -50 });
    service.setEquippedArmourType('  Padded  ');

    expect(service.character().maxHpModifier).toBe(
      1 - service.character().totalInitialHP,
    );
    expect(service.character().maxHpOverride).toBe(0);
    expect(service.character().totalMaxHP).toBe(1);
    expect(service.character().equippedArmourType).toBe('Padded');
    const saved = JSON.parse(localStorage.getItem('character')!);
    expect(saved.maxHpOverride).toBe(0);
    expect(saved.equippedArmourType).toBe('Padded');
  });

  it('adds, edits, and removes inventory by stable index', () => {
    const firstIndex = service.addInventoryItem({
      name: 'Duplicate Name',
      qty: -4,
      value: -2,
      weight: -1,
      requiresAttunement: false,
      isAttuned: true,
      itemSpecific: { damage: '1d6' },
    });
    const secondIndex = service.addInventoryItem({ name: 'Duplicate Name' });

    expect(service.character().inventory[firstIndex].qty).toBe(0);
    expect(service.character().inventory[firstIndex].value).toBe(0);
    expect(service.character().inventory[firstIndex].weight).toBe(0);
    expect(service.character().inventory[firstIndex].isAttuned).toBeFalse();

    expect(
      service.updateInventoryItem(firstIndex, {
        name: 'Renamed Item',
        qty: 3,
        requiresAttunement: true,
        isAttuned: true,
      }),
    ).toBeTrue();
    expect(service.character().inventory[firstIndex].name).toBe('Renamed Item');
    expect(service.character().inventory[firstIndex].itemSpecific.damage).toBe(
      '1d6',
    );
    expect(service.character().inventory[secondIndex].name).toBe(
      'Duplicate Name',
    );
    expect(service.updateInventoryItem(-1, { name: 'Nope' })).toBeFalse();

    expect(service.removeInventoryItem(firstIndex)).toBeTrue();
    expect(service.removeInventoryItem(9999)).toBeFalse();
    expect(
      service
        .character()
        .inventory.some((item) => item.name === 'Renamed Item'),
    ).toBeFalse();
    expect(
      JSON.parse(localStorage.getItem('character')!).inventory.some(
        (item: { name: string }) => item.name === 'Renamed Item',
      ),
    ).toBeFalse();
  });
});

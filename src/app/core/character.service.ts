import {
  computed,
  Injectable,
  isDevMode,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { sumReducer } from './utils';
import {
  Inventory,
  SourceCharacterState,
} from './source-character-state.model';
import { CharacterState } from './character-state.model';
import { initialCharacter } from './initial-character.data';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly sourceState$$: WritableSignal<SourceCharacterState>;
  public readonly character: Signal<CharacterState>;

  constructor() {
    let savedCharacter = localStorage.getItem('character');
    if (isDevMode()) savedCharacter = null;

    if (savedCharacter) {
      this.sourceState$$ = signal(JSON.parse(savedCharacter));
    } else {
      this.sourceState$$ = signal(initialCharacter);
    }

    this.character = computed(() => {
      const character = this.sourceState$$();
      const totalLevel = sumReducer(
        character.classes.map((c) => c.level).filter((x) => x),
      );

      const proficiency = this.calcProficiencyModifier(totalLevel);
      let equipped = character.inventory.filter((i) => i.equipped);

      // if (character.rolledHP.length !== totalLevel) {
      //   this.errors.set(
      //     `Expected list of Rolled HP to match character level; saw ${character.rolledHP.length} but expected ${totalLevel}`,
      //   );
      // }

      let abilityScores = this.calcAbilityScores(
        character.rolledStats,
        character.racialAsis,
        character.feats,
        character.asis,
      );

      const gearOverrides = this.getGearMods(equipped)
        .map((e) => e.overrideAbilityScore)
        .filter((e) => e);
      for (const override of gearOverrides) {
        if (override) {
          for (const attr of Object.keys(override)) {
            // @ts-ignore
            abilityScores[attr] = override[attr];
          }
        }
      }

      abilityScores = {
        str: character.overrideAbilityScores.str
          ? character.overrideAbilityScores.str
          : abilityScores.str,
        dex: character.overrideAbilityScores.dex
          ? character.overrideAbilityScores.dex
          : abilityScores.dex,
        con: character.overrideAbilityScores.con
          ? character.overrideAbilityScores.con
          : abilityScores.con,
        int: character.overrideAbilityScores.int
          ? character.overrideAbilityScores.int
          : abilityScores.int,
        wis: character.overrideAbilityScores.wis
          ? character.overrideAbilityScores.wis
          : abilityScores.wis,
        cha: character.overrideAbilityScores.cha
          ? character.overrideAbilityScores.cha
          : abilityScores.cha,
      };

      const abilityModifiers = {
        str: this.calcModifier(abilityScores.str),
        dex: this.calcModifier(abilityScores.dex),
        con: this.calcModifier(abilityScores.con),
        int: this.calcModifier(abilityScores.int),
        wis: this.calcModifier(abilityScores.wis),
        cha: this.calcModifier(abilityScores.cha),
      };

      equipped = equipped.map((i) => {
        i.itemSpecific.attackMod = 0;
        if (i.itemSpecific.attackModStat) {
          i.itemSpecific.attackMod +=
            // @ts-ignore
            abilityModifiers[i.itemSpecific.attackModStat];
        }

        if (i.itemSpecific.proficient) {
          i.itemSpecific.attackMod += proficiency;
        }

        i.itemSpecific.damageMod =
          // @ts-ignore
          abilityModifiers[i.itemSpecific.attackModStat];

        return { ...i };
      });

      const totalInitialHP = sumReducer(
        character.rolledHP
          .filter((x) => x)
          .map((x) => x + abilityModifiers.con),
      );

      // if (totalInitialHP <= 0) {
      //   this.errors.set(`Rolled HP plus Con Modifier is less than or equal to 0`);
      // }

      const totalMaxHP = character.maxHpOverride
        ? character.maxHpOverride
        : totalInitialHP + character.maxHpModifier;

      if (character.currentHp === undefined) character.currentHp = totalMaxHP;
      if (character.currentHp! > totalMaxHP) character.currentHp = totalMaxHP;

      let saveModifiers = {
        str:
          abilityModifiers.str +
          (character.saveProficiencies.str ? proficiency : 0),
        dex:
          abilityModifiers.dex +
          (character.saveProficiencies.dex ? proficiency : 0),
        con:
          abilityModifiers.con +
          (character.saveProficiencies.con ? proficiency : 0),
        int:
          abilityModifiers.int +
          (character.saveProficiencies.int ? proficiency : 0),
        wis:
          abilityModifiers.wis +
          (character.saveProficiencies.wis ? proficiency : 0),
        cha:
          abilityModifiers.cha +
          (character.saveProficiencies.cha ? proficiency : 0),
      };

      const skillModifiers = {
        acrobatics:
          abilityModifiers.dex +
          (character.skillProficiencies.acrobatics ? proficiency : 0),
        animalHandling:
          abilityModifiers.wis +
          (character.skillProficiencies.animalHandling ? proficiency : 0),
        arcana:
          abilityModifiers.int +
          (character.skillProficiencies.arcana ? proficiency : 0),
        athletics:
          abilityModifiers.str +
          (character.skillProficiencies.athletics ? proficiency : 0),
        deception:
          abilityModifiers.cha +
          (character.skillProficiencies.deception ? proficiency : 0),
        history:
          abilityModifiers.int +
          (character.skillProficiencies.history ? proficiency : 0),
        insight:
          abilityModifiers.wis +
          (character.skillProficiencies.insight ? proficiency : 0),
        intimidation:
          abilityModifiers.cha +
          (character.skillProficiencies.intimidation ? proficiency : 0),
        investigation:
          abilityModifiers.int +
          (character.skillProficiencies.investigation ? proficiency : 0),
        medicine:
          abilityModifiers.wis +
          (character.skillProficiencies.medicine ? proficiency : 0),
        nature:
          abilityModifiers.int +
          (character.skillProficiencies.nature ? proficiency : 0),
        perception:
          abilityModifiers.wis +
          (character.skillProficiencies.perception ? proficiency : 0),
        performance:
          abilityModifiers.cha +
          (character.skillProficiencies.performance ? proficiency : 0),
        persuasion:
          abilityModifiers.cha +
          (character.skillProficiencies.persuasion ? proficiency : 0),
        religion:
          abilityModifiers.int +
          (character.skillProficiencies.religion ? proficiency : 0),
        sleightOfHand:
          abilityModifiers.dex +
          (character.skillProficiencies.sleightOfHand ? proficiency : 0),
        stealth:
          abilityModifiers.dex +
          (character.skillProficiencies.stealth ? proficiency : 0),
        survival:
          abilityModifiers.wis +
          (character.skillProficiencies.survival ? proficiency : 0),
      };

      const passives = {
        investigation: 10 + skillModifiers.investigation,
        perception: 10 + skillModifiers.perception,
        insight: 10 + skillModifiers.insight,
      };

      const deathFails = character.deathSaves.filter((x) => !x).length;
      const deathPasses = character.deathSaves.filter((x) => x).length;

      const gearModAC = sumReducer(this.getGearMods(equipped).map((m) => m.ac));
      const gearAcOffset = sumReducer(
        this.getGearMods(equipped).map((m) => m.acOffset),
      );

      // Dex Mod; find a way to combine equippedArmourType with inventory
      const maxDexMod = this.getMaxDexFromArmour(character.equippedArmourType);
      const dexMod = Math.min(abilityModifiers.dex, maxDexMod);
      const ac = 10 + dexMod + gearModAC + gearAcOffset;

      const totalToAllSaveMods = sumReducer(
        this.getGearMods(equipped).map((m) => m.saveMod),
      );
      for (const key of Object.keys(saveModifiers)) {
        // @ts-ignore
        saveModifiers[key] += totalToAllSaveMods;
      }

      if (character.currentHitDie === undefined)
        character.currentHitDie = totalLevel;

      localStorage.setItem('character', JSON.stringify(character));

      return {
        ...character,
        totalLevel,
        abilityScores,
        abilityModifiers,
        totalInitialHP,
        totalMaxHP,
        ac,
        proficiency,
        initiative: abilityModifiers.dex,
        saveModifiers,
        skillModifiers,
        passives,
        deathFails,
        deathPasses,
        equipped,
      };
    });
  }

  private calcAbilityScores(
    rolledStats: any,
    racialAsis: any,
    feats: any[],
    asis: any[],
  ) {
    let abilityScores = {
      str: rolledStats.str,
      dex: rolledStats.dex,
      con: rolledStats.con,
      int: rolledStats.int,
      wis: rolledStats.wis,
      cha: rolledStats.cha,
    };

    // racials
    abilityScores = {
      str: abilityScores.str + (racialAsis.str || 0),
      dex: abilityScores.dex + (racialAsis.dex || 0),
      con: abilityScores.con + (racialAsis.con || 0),
      int: abilityScores.int + (racialAsis.int || 0),
      wis: abilityScores.wis + (racialAsis.wis || 0),
      cha: abilityScores.cha + (racialAsis.cha || 0),
    };

    // feats
    abilityScores = {
      str:
        abilityScores.str +
        (sumReducer(feats.filter((f) => f.asi === 'str').map((f) => 1)) || 0),
      dex:
        abilityScores.dex +
        (sumReducer(feats.filter((f) => f.asi === 'dex').map((f) => 1)) || 0),
      con:
        abilityScores.con +
        (sumReducer(feats.filter((f) => f.asi === 'con').map((f) => 1)) || 0),
      int:
        abilityScores.int +
        (sumReducer(feats.filter((f) => f.asi === 'int').map((f) => 1)) || 0),
      wis:
        abilityScores.wis +
        (sumReducer(feats.filter((f) => f.asi === 'wis').map((f) => 1)) || 0),
      cha:
        abilityScores.cha +
        (sumReducer(feats.filter((f) => f.asi === 'cha').map((f) => 1)) || 0),
    };

    // asis
    abilityScores = {
      str: abilityScores.str + (sumReducer(asis.map((a) => a.str)) || 0),
      dex: abilityScores.dex + (sumReducer(asis.map((a) => a.dex)) || 0),
      con: abilityScores.con + (sumReducer(asis.map((a) => a.con)) || 0),
      int: abilityScores.int + (sumReducer(asis.map((a) => a.int)) || 0),
      wis: abilityScores.wis + (sumReducer(asis.map((a) => a.wis)) || 0),
      cha: abilityScores.cha + (sumReducer(asis.map((a) => a.cha)) || 0),
    };

    // cap at 20
    abilityScores = {
      str: abilityScores.str > 20 ? 20 : abilityScores.str,
      dex: abilityScores.dex > 20 ? 20 : abilityScores.dex,
      con: abilityScores.con > 20 ? 20 : abilityScores.con,
      int: abilityScores.int > 20 ? 20 : abilityScores.int,
      wis: abilityScores.wis > 20 ? 20 : abilityScores.wis,
      cha: abilityScores.cha > 20 ? 20 : abilityScores.cha,
    };

    return abilityScores;
  }

  heal(health: number) {
    if (isNaN(+health)) return;

    this.sourceState$$.update((character) => ({
      ...character,
      currentHp:
        (character.currentHp || 0) + health > this.character().totalMaxHP
          ? this.character().totalMaxHP
          : (character.currentHp || 0) + health,
    }));
  }

  takeDamage(health: number) {
    if (isNaN(+health)) return;

    let newTempHp = this.sourceState$$().tempHp;
    if (health >= newTempHp) {
      health -= newTempHp;
      newTempHp = 0;
    } else {
      newTempHp -= health;
      health = 0;
    }

    this.sourceState$$.update((character) => ({
      ...character,
      tempHp: newTempHp,
      currentHp:
        (character.currentHp || 0) - health < 0
          ? 0
          : (character.currentHp || 0) - health,
    }));
  }

  getGearMods(equipped: Inventory[]) {
    return equipped
      .filter((e) => e.equipped)
      .filter((e) => !e.requiresAttunement || e.isAttuned)
      .map((e) => e.itemSpecific);
  }

  calcModifier(score: number) {
    return Math.floor((score - 10) / 2);
  }

  calcSpellSaveDc(wis: number, proficiency: number) {
    return 8 + proficiency + wis;
  }

  calcSpellAtkModifier(wis: number, proficiency: number) {
    return proficiency + wis;
  }

  takeShortRest() {
    this.sourceState$$.update((c) => ({
      ...c,
      featureUsages: {
        ...c.featureUsages,
        scry: 0,
        convergentReturn: 0,
        sharedDestiny: 0,
      },
    }));
  }

  takeLongRest() {
    this.takeShortRest();

    const maxHitDieRecovery = this.character().totalLevel / 2;
    let maxHitDie = Math.min(
      (this.character().currentHitDie || 0) + maxHitDieRecovery,
      this.character().totalLevel,
    );

    this.sourceState$$.update((c) => ({
      ...c,
      currentHitDie: maxHitDie,
      currentHp: undefined,
      featureUsages: {
        ...c.featureUsages,
        pastKnowledge: 0,
        telepathicDetectThoughts: 0,
      },
    }));
  }

  calcProficiencyModifier(totalLevel: number): number {
    return Math.ceil(totalLevel / 4) + 1;
  }

  private getAcBaseFromArmour(equippedArmourType: string): number {
    switch (equippedArmourType.toLowerCase()) {
      case 'padded':
      case 'leather':
        return 11;

      case 'studded leather':
      case 'hide':
        return 12;

      case 'chain shirt':
        return 13;

      case 'scale mail':
      case 'breastplate':
      case 'ring mail':
        return 14;

      case 'half plate':
        return 15;

      case 'chain mail':
        return 16;

      case 'splint':
        return 17;

      case 'plate':
        return 18;

      default:
        return 0;
    }
  }

  private getMaxDexFromArmour(equippedArmourType: string): number {
    switch (equippedArmourType.toLowerCase()) {
      case 'padded':
      case 'leather':
      case 'studded leather':
        return 100;

      case 'hide':
      case 'chain shirt':
      case 'scale mail':
      case 'breastplate':
      case 'half plate':
        return 2;

      default:
        return 0;
    }
  }

  failDeathSave() {
    this.sourceState$$.update((c) => ({
      ...c,
      deathSaves: [...c.deathSaves, false],
    }));
  }

  resetDeathSaves() {
    this.sourceState$$.update((c) => ({
      ...c,
      deathSaves: [],
    }));
  }

  passDeathSave() {
    this.sourceState$$.update((c) => ({
      ...c,
      deathSaves: [...c.deathSaves, true],
    }));
  }

  modGold(change: number) {
    this.sourceState$$.update((c) => ({
      ...c,
      wealth: { ...c.wealth, gold: c.wealth.gold + change },
      wealthTransaction: {
        ...c.wealthTransaction,
        gold: [change, ...c.wealthTransaction.gold],
      },
    }));
  }

  modSilver(change: number) {
    this.sourceState$$.update((c) => ({
      ...c,
      wealth: { ...c.wealth, silver: c.wealth.silver + change },
      wealthTransaction: {
        ...c.wealthTransaction,
        silver: [change, ...c.wealthTransaction.silver],
      },
    }));
  }

  modCopper(change: number) {
    this.sourceState$$.update((c) => ({
      ...c,
      wealth: { ...c.wealth, copper: c.wealth.copper + change },
      wealthTransaction: {
        ...c.wealthTransaction,
        copper: [change, ...c.wealthTransaction.copper],
      },
    }));
  }

  modAdditionalInventory(inv: string) {
    this.sourceState$$.update((c) => ({
      ...c,
      additionalInventory: inv,
    }));
  }

  toggleCondition(condition: string) {
    this.sourceState$$.update((c) => {
      // @ts-ignore; trust me bro
      c.conditions[condition] = !c.conditions[condition];
      return { ...c };
    });
  }

  changeTempHp(tempHp: number) {
    this.sourceState$$.update((c) => ({ ...c, tempHp }));
  }

  changeHitDie(change: number) {
    this.sourceState$$.update((c) => ({
      ...c,
      currentHitDie: (c.currentHitDie || 0) + change,
    }));
  }

  reloadCharacter() {
    this.sourceState$$.set(initialCharacter);
    return true;
  }

  changeMaxHpMod(maxHpModifier: any) {
    this.sourceState$$.update((c) => ({
      ...c,
      maxHpModifier,
    }));
  }

  toggleInspiration() {
    this.sourceState$$.update((c) => ({
      ...c,
      inspiration: c.inspiration ^ 1,
    }));
  }

  scry() {
    this.sourceState$$.update((c) => ({
      ...c,
      featureUsages: { ...c.featureUsages, scry: c.featureUsages.scry + 1 },
    }));
  }

  convergentReturn() {
    this.sourceState$$.update((c) => ({
      ...c,
      featureUsages: {
        ...c.featureUsages,
        convergentReturn: c.featureUsages.convergentReturn + 1,
      },
    }));
  }

  shareDestiny() {
    this.sourceState$$.update((c) => ({
      ...c,
      featureUsages: {
        ...c.featureUsages,
        sharedDestiny: c.featureUsages.sharedDestiny + 1,
      },
    }));
  }

  pastKnowledge() {
    this.sourceState$$.update((c) => ({
      ...c,
      featureUsages: {
        ...c.featureUsages,
        pastKnowledge: c.featureUsages.pastKnowledge + 1,
      },
    }));
  }

  telepathicDetectThoughts() {
    this.sourceState$$.update((c) => ({
      ...c,
      featureUsages: {
        ...c.featureUsages,
        telepathicDetectThoughts: c.featureUsages.telepathicDetectThoughts + 1,
      },
    }));
  }

  unattune(item: Inventory) {
    item.isAttuned = false;
    this.updateInventory(item);
  }

  attune(item: Inventory) {
    item.isAttuned = true;
    this.updateInventory(item);
  }

  unequip(item: any) {
    item.equipped = false;
    this.updateInventory(item);
  }

  equip(item: any) {
    item.equipped = true;
    this.updateInventory(item);
  }

  updateInventory(item: Inventory) {
    this.sourceState$$.update((c) => ({
      ...c,
      inventory: [...c.inventory.map((i) => (i.name === item.name ? item : i))],
    }));
  }
}

// todo: add in Charm of the Creeping Hand logic

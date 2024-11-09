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
import { initialCharacter } from '../data/initial-character.data';
import { abilities, ability } from '../data/dnd5e.system.data';

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

      let abilityScores: abilities<number> = this.calcAbilityScores(
        character.rolledStats,
        character.racialAsis,
        character.feats.map((f) => f.asi),
        character.asis as abilities<number>[],
      );

      const gearOverrides = this.getGearMods(equipped)
        .map((e) => e.overrideAbilityScore)
        .filter((e) => e);

      for (const override of gearOverrides) {
        if (override) {
          for (const attr of Object.keys(override)) {
            // @ts-ignore
            if (override[attr]) {
              // @ts-ignore
              abilityScores[attr] = override[attr];
            }
          }
        }
      }

      abilityScores = {
        Strength: character.overrideAbilityScores.Strength
          ? character.overrideAbilityScores.Strength
          : abilityScores.Strength,
        Dexterity: character.overrideAbilityScores.Dexterity
          ? character.overrideAbilityScores.Dexterity
          : abilityScores.Dexterity,
        Constitution: character.overrideAbilityScores.Constitution
          ? character.overrideAbilityScores.Constitution
          : abilityScores.Constitution,
        Intelligence: character.overrideAbilityScores.Intelligence
          ? character.overrideAbilityScores.Intelligence
          : abilityScores.Intelligence,
        Wisdom: character.overrideAbilityScores.Wisdom
          ? character.overrideAbilityScores.Wisdom
          : abilityScores.Wisdom,
        Charisma: character.overrideAbilityScores.Charisma
          ? character.overrideAbilityScores.Charisma
          : abilityScores.Charisma,
      };

      const abilityModifiers: abilities<number> = {
        Strength: this.calcModifier(abilityScores.Strength),
        Dexterity: this.calcModifier(abilityScores.Dexterity),
        Constitution: this.calcModifier(abilityScores.Constitution),
        Intelligence: this.calcModifier(abilityScores.Intelligence),
        Wisdom: this.calcModifier(abilityScores.Wisdom),
        Charisma: this.calcModifier(abilityScores.Charisma),
      };

      console.log(abilityModifiers);

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

        if (i.itemSpecific.additionalMod) {
          i.itemSpecific.attackMod += i.itemSpecific.additionalMod;
        }

        i.itemSpecific.damageMod =
          // @ts-ignore
          abilityModifiers[i.itemSpecific.attackModStat] || 0;

        if (i.itemSpecific.additionalMod) {
          i.itemSpecific.damageMod =
            (i.itemSpecific.damageMod || 0) + i.itemSpecific.additionalMod;
        }

        return { ...i };
      });

      const totalInitialHP = sumReducer(
        character.rolledHP
          .filter((x) => x)
          .map((x) => x + abilityModifiers.Constitution),
      );

      // if (totalInitialHP <= 0) {
      //   this.errors.set(`Rolled HP plus Con Modifier is less than or equal to 0`);
      // }

      const totalMaxHP = character.maxHpOverride
        ? character.maxHpOverride
        : totalInitialHP + character.maxHpModifier;

      if (character.currentHp === undefined) character.currentHp = totalMaxHP;
      if (character.currentHp! > totalMaxHP) character.currentHp = totalMaxHP;

      let saveModifiers: abilities<number> = {
        Strength:
          abilityModifiers.Strength +
          (character.saveProficiencies.Strength ? proficiency : 0),
        Dexterity:
          abilityModifiers.Dexterity +
          (character.saveProficiencies.Dexterity ? proficiency : 0),
        Constitution:
          abilityModifiers.Constitution +
          (character.saveProficiencies.Constitution ? proficiency : 0),
        Intelligence:
          abilityModifiers.Intelligence +
          (character.saveProficiencies.Intelligence ? proficiency : 0),
        Wisdom:
          abilityModifiers.Wisdom +
          (character.saveProficiencies.Wisdom ? proficiency : 0),
        Charisma:
          abilityModifiers.Charisma +
          (character.saveProficiencies.Charisma ? proficiency : 0),
      };

      const skillModifiers = {
        acrobatics:
          abilityModifiers.Dexterity +
          (character.skillProficiencies.acrobatics ? proficiency : 0),
        animalHandling:
          abilityModifiers.Wisdom +
          (character.skillProficiencies.animalHandling ? proficiency : 0),
        arcana:
          abilityModifiers.Intelligence +
          (character.skillProficiencies.arcana ? proficiency : 0),
        athletics:
          abilityModifiers.Strength +
          (character.skillProficiencies.athletics ? proficiency : 0),
        deception:
          abilityModifiers.Charisma +
          (character.skillProficiencies.deception ? proficiency : 0),
        history:
          abilityModifiers.Intelligence +
          (character.skillProficiencies.history ? proficiency : 0),
        insight:
          abilityModifiers.Wisdom +
          (character.skillProficiencies.insight ? proficiency : 0),
        intimidation:
          abilityModifiers.Charisma +
          (character.skillProficiencies.intimidation ? proficiency : 0),
        investigation:
          abilityModifiers.Intelligence +
          (character.skillProficiencies.investigation ? proficiency : 0),
        medicine:
          abilityModifiers.Wisdom +
          (character.skillProficiencies.medicine ? proficiency : 0),
        nature:
          abilityModifiers.Intelligence +
          (character.skillProficiencies.nature ? proficiency : 0),
        perception:
          abilityModifiers.Wisdom +
          (character.skillProficiencies.perception ? proficiency : 0),
        performance:
          abilityModifiers.Charisma +
          (character.skillProficiencies.performance ? proficiency : 0),
        persuasion:
          abilityModifiers.Charisma +
          (character.skillProficiencies.persuasion ? proficiency : 0),
        religion:
          abilityModifiers.Intelligence +
          (character.skillProficiencies.religion ? proficiency : 0),
        sleightOfHand:
          abilityModifiers.Dexterity +
          (character.skillProficiencies.sleightOfHand ? proficiency : 0),
        stealth:
          abilityModifiers.Dexterity +
          (character.skillProficiencies.stealth ? proficiency : 0),
        survival:
          abilityModifiers.Wisdom +
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
      const dexMod = Math.min(abilityModifiers.Dexterity, maxDexMod);
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
        initiative: abilityModifiers.Dexterity,
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
    rolledStats: abilities<number>,
    racialAsis: abilities<number | undefined>,
    featAsis: ability[],
    asis: abilities<number>[],
  ): abilities<number> {
    let abilityScores: abilities<number> = {
      Strength: rolledStats.Strength,
      Dexterity: rolledStats.Dexterity,
      Constitution: rolledStats.Constitution,
      Intelligence: rolledStats.Intelligence,
      Wisdom: rolledStats.Wisdom,
      Charisma: rolledStats.Charisma,
    };

    // racials
    abilityScores = {
      Strength: abilityScores.Strength + (racialAsis.Strength || 0),
      Dexterity: abilityScores.Dexterity + (racialAsis.Dexterity || 0),
      Constitution: abilityScores.Constitution + (racialAsis.Constitution || 0),
      Intelligence: abilityScores.Intelligence + (racialAsis.Intelligence || 0),
      Wisdom: abilityScores.Wisdom + (racialAsis.Wisdom || 0),
      Charisma: abilityScores.Charisma + (racialAsis.Charisma || 0),
    };

    // feats
    abilityScores = {
      Strength:
        abilityScores.Strength +
        (featAsis.filter((a) => a === 'Strength')[0] ? 1 : 0),
      Dexterity:
        abilityScores.Dexterity +
        (featAsis.filter((a) => a === 'Dexterity')[0] ? 1 : 0),
      Constitution:
        abilityScores.Constitution +
        (featAsis.filter((a) => a === 'Constitution')[0] ? 1 : 0),
      Intelligence:
        abilityScores.Intelligence +
        (featAsis.filter((a) => a === 'Intelligence')[0] ? 1 : 0),
      Wisdom:
        abilityScores.Wisdom +
        (featAsis.filter((a) => a === 'Wisdom')[0] ? 1 : 0),
      Charisma:
        abilityScores.Charisma +
        (featAsis.filter((a) => a === 'Charisma')[0] ? 1 : 0),
    };

    // asis
    abilityScores = {
      Strength:
        abilityScores.Strength + (sumReducer(asis.map((a) => a.Strength)) || 0),
      Dexterity:
        abilityScores.Dexterity +
        (sumReducer(asis.map((a) => a.Dexterity)) || 0),
      Constitution:
        abilityScores.Constitution +
        (sumReducer(asis.map((a) => a.Constitution)) || 0),
      Intelligence:
        abilityScores.Intelligence +
        (sumReducer(asis.map((a) => a.Intelligence)) || 0),
      Wisdom:
        abilityScores.Wisdom + (sumReducer(asis.map((a) => a.Wisdom)) || 0),
      Charisma:
        abilityScores.Charisma + (sumReducer(asis.map((a) => a.Charisma)) || 0),
    };

    // cap at 20
    abilityScores = {
      Strength: abilityScores.Strength > 20 ? 20 : abilityScores.Strength,
      Dexterity: abilityScores.Dexterity > 20 ? 20 : abilityScores.Dexterity,
      Constitution:
        abilityScores.Constitution > 20 ? 20 : abilityScores.Constitution,
      Intelligence:
        abilityScores.Intelligence > 20 ? 20 : abilityScores.Intelligence,
      Wisdom: abilityScores.Wisdom > 20 ? 20 : abilityScores.Wisdom,
      Charisma: abilityScores.Charisma > 20 ? 20 : abilityScores.Charisma,
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
        vecnasLink: 0,
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

  useVecnaLink() {
    this.sourceState$$.update((c) => ({
      ...c,
      featureUsages: {
        ...c.featureUsages,
        vecnasLink: c.featureUsages.vecnasLink + 1,
      },
    }));
  }

  creepHand() {
    this.sourceState$$.update((c) => ({
      ...c,
      featureUsages: {
        ...c.featureUsages,
        creepingHand: c.featureUsages.creepingHand + 1,
      },
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

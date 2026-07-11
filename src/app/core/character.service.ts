import {
  computed,
  Injectable,
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

export type SpeciesProfile = Pick<
  SourceCharacterState,
  'race' | 'speeds' | 'resistances' | 'immunities' | 'advantages'
> & {
  racialAsis: Partial<SourceCharacterState['racialAsis']>;
};

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly sourceState$$: WritableSignal<SourceCharacterState>;
  public readonly character: Signal<CharacterState>;
  private readonly latestVersion = '250711C';

  constructor() {
    let savedCharacter = localStorage.getItem('character');

    if (savedCharacter) {
      const migrated = this.migrateSavedCharacter(JSON.parse(savedCharacter));
      this.sourceState$$ = signal(migrated);
      localStorage.setItem('character', JSON.stringify(migrated));
    } else {
      this.sourceState$$ = signal(this.freshInitialCharacter());
    }

    this.character = computed(() => {
      const character = this.sourceState$$();
      const totalLevel = sumReducer(
        character.classes.map((c) => c.level).filter((x) => x),
      );

      const oracleLevel = character.classes.find((c) =>
        c.class.toLocaleLowerCase().includes('oracle'),
      )?.level;
      const primaryFeatureLevel = oracleLevel ?? character.classes[0]?.level;
      if (!primaryFeatureLevel || primaryFeatureLevel < 1) {
        throw new Error('Could not find Oracle Level');
      } else if (primaryFeatureLevel < 9) {
        character.rageDamage = 2;
      } else if (primaryFeatureLevel < 16) {
        character.rageDamage = 3;
      } else if (primaryFeatureLevel < 21) {
        character.rageDamage = 4;
      } else {
        throw new Error('Oracle Level exceeds 20');
      }

      const saveAdvantages = {
        ...character.saveAdvantages,
        Strength: character.rage ? true : character.saveAdvantages.Strength,
      };
      const abilityAdvantages = {
        ...character.abilityAdvantages,
        Strength: character.rage ? true : character.abilityAdvantages.Strength,
      };
      const resistances = {
        ...character.resistances,
        bludgeoning: character.rage ? true : character.resistances.bludgeoning,
        piercing: character.rage ? true : character.resistances.piercing,
        slashing: character.rage ? true : character.resistances.slashing,
      };

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

        i.itemSpecific.damageMod ??= 0;
        if (i.itemSpecific.additionalMod) {
          i.itemSpecific.damageMod += i.itemSpecific.additionalMod;
        }

        if (character.rage) {
          i.itemSpecific.damageMod += character.rageDamage;
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

      const totalMaxHP = Math.max(
        1,
        character.maxHpOverride
          ? character.maxHpOverride
          : totalInitialHP + character.maxHpModifier,
      );

      if (character.currentHp === undefined) character.currentHp = totalMaxHP;
      if (character.currentHp! < 0) character.currentHp = 0;
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

      const spellSaveDC = 8 + proficiency + abilityModifiers.Wisdom;
      const spellAttackModifier = proficiency + abilityModifiers.Wisdom;

      if (character.currentHitDie === undefined)
        character.currentHitDie = totalLevel;

      localStorage.setItem('character', JSON.stringify(character));

      return {
        ...character,
        saveAdvantages,
        abilityAdvantages,
        resistances,
        totalLevel,
        abilityScores,
        abilityModifiers,
        totalInitialHP,
        totalMaxHP,
        ac,
        proficiency,
        spellSaveDC,
        spellAttackModifier,
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

  updateIdentity(
    changes: Partial<
      Pick<SourceCharacterState, 'name' | 'race' | 'background' | 'alignment'>
    >,
  ) {
    this.updateSourceState((character) => ({
      ...character,
      name: this.requiredText(changes.name, character.name),
      race: this.requiredText(changes.race, character.race),
      background: this.requiredText(changes.background, character.background),
      alignment: this.requiredText(changes.alignment, character.alignment),
    }));
  }

  updateSpeciesProfile(profile: SpeciesProfile) {
    this.updateSourceState((character) => {
      const speeds: SourceCharacterState['speeds'] = {
        land: this.clampInteger(
          profile.speeds.land,
          0,
          Number.MAX_SAFE_INTEGER,
          character.speeds.land,
        ),
      };
      for (const key of ['burrow', 'climb', 'fly', 'swim'] as const) {
        const value = profile.speeds[key];
        if (value !== undefined) {
          speeds[key] = this.clampInteger(value, 0, Number.MAX_SAFE_INTEGER, 0);
        }
      }

      return {
        ...character,
        race: this.requiredText(profile.race, character.race),
        speeds,
        racialAsis: this.updateOptionalAbilities(
          {
            Strength: undefined,
            Dexterity: undefined,
            Constitution: undefined,
            Intelligence: undefined,
            Wisdom: undefined,
            Charisma: undefined,
          },
          profile.racialAsis,
          -5,
          5,
        ),
        resistances: { ...profile.resistances },
        immunities: { ...profile.immunities },
        advantages: { ...profile.advantages },
      };
    });
  }

  updatePrimaryClass(
    changes: Partial<SourceCharacterState['classes'][number]>,
  ) {
    this.updateSourceState((character) => {
      const current = character.classes[0] ?? {
        class: 'Wild Oracle',
        subclass: 'Fate of the Chosen',
        level: 1,
        hitDie: 8,
      };
      const level = this.clampInteger(changes.level, 1, 20, current.level);
      const hitDie = this.supportedHitDie(changes.hitDie, current.hitDie);
      const rolledHP = this.alignRolledHp(character.rolledHP, level, hitDie);

      return {
        ...character,
        classes: [
          {
            class: this.requiredText(changes.class, current.class),
            subclass: this.requiredText(changes.subclass, current.subclass),
            level,
            hitDie,
          },
          ...character.classes.slice(1),
        ],
        hitDieType: `d${hitDie}`,
        rolledHP,
        currentHitDie: this.clampInteger(
          character.currentHitDie,
          0,
          level,
          level,
        ),
      };
    });
  }

  updateRolledHp(levelIndex: number, roll: number) {
    this.updateSourceState((character) => {
      const index = Math.trunc(Number(levelIndex));
      if (
        !Number.isFinite(index) ||
        index < 0 ||
        index >= character.classes[0].level
      ) {
        return character;
      }

      const hitDie = character.classes[0].hitDie;
      const rolledHP = this.alignRolledHp(
        character.rolledHP,
        character.classes[0].level,
        hitDie,
      );
      rolledHP[index] = this.clampInteger(roll, 1, hitDie, rolledHP[index]);
      return { ...character, rolledHP };
    });
  }

  updateRolledStats(changes: Partial<abilities<number>>) {
    this.updateSourceState((character) => ({
      ...character,
      rolledStats: this.updateAbilities(character.rolledStats, changes, 1, 20),
    }));
  }

  updateRacialAsis(changes: Partial<abilities<number | undefined>>) {
    this.updateSourceState((character) => ({
      ...character,
      racialAsis: this.updateOptionalAbilities(
        character.racialAsis,
        changes,
        -5,
        5,
      ),
    }));
  }

  updateOverrideAbilityScores(changes: Partial<abilities<number | undefined>>) {
    this.updateSourceState((character) => ({
      ...character,
      overrideAbilityScores: this.updateOptionalAbilities(
        character.overrideAbilityScores,
        changes,
        1,
        30,
      ),
    }));
  }

  setLanguages(languages: string[]) {
    this.updateSourceState((character) => ({
      ...character,
      languages: this.cleanStringList(languages),
    }));
  }

  setTools(tools: string[]) {
    this.updateSourceState((character) => ({
      ...character,
      tools: this.cleanStringList(tools),
    }));
  }

  updateSpeeds(changes: Partial<SourceCharacterState['speeds']>) {
    this.updateSourceState((character) => {
      const speeds = { ...character.speeds };
      for (const key of ['land', 'burrow', 'climb', 'fly', 'swim'] as const) {
        if (!(key in changes)) continue;
        const value = changes[key];
        if (value === undefined && key !== 'land') {
          delete speeds[key];
        } else {
          speeds[key] = this.clampInteger(
            value,
            0,
            Number.MAX_SAFE_INTEGER,
            speeds[key] ?? 0,
          );
        }
      }
      return { ...character, speeds };
    });
  }

  updateSkillProficiencies(
    changes: Partial<SourceCharacterState['skillProficiencies']>,
  ) {
    this.updateSourceState((character) => ({
      ...character,
      skillProficiencies: {
        ...character.skillProficiencies,
        ...changes,
      },
    }));
  }

  updateSaveProficiencies(
    changes: Partial<SourceCharacterState['saveProficiencies']>,
  ) {
    this.updateSourceState((character) => ({
      ...character,
      saveProficiencies: {
        ...character.saveProficiencies,
        ...changes,
      },
    }));
  }

  setArmourProficiencies(proficiencies: string[]) {
    this.updateSourceState((character) => ({
      ...character,
      armourProficiencies: this.cleanStringList(proficiencies),
    }));
  }

  setWeaponProficiencies(proficiencies: string[]) {
    this.updateSourceState((character) => ({
      ...character,
      weaponProficiencies: this.cleanStringList(proficiencies),
    }));
  }

  updateResistances(changes: Partial<SourceCharacterState['resistances']>) {
    this.updateSourceState((character) => ({
      ...character,
      resistances: { ...character.resistances, ...changes },
    }));
  }

  updateImmunities(changes: Partial<SourceCharacterState['immunities']>) {
    this.updateSourceState((character) => ({
      ...character,
      immunities: { ...character.immunities, ...changes },
    }));
  }

  updateAdvantages(changes: Partial<SourceCharacterState['advantages']>) {
    this.updateSourceState((character) => ({
      ...character,
      advantages: { ...character.advantages, ...changes },
    }));
  }

  updateHpSettings(
    changes: Partial<
      Pick<SourceCharacterState, 'maxHpModifier' | 'maxHpOverride'>
    >,
  ) {
    const minimumModifier = 1 - this.character().totalInitialHP;
    this.updateSourceState((character) => ({
      ...character,
      maxHpModifier:
        changes.maxHpModifier === undefined
          ? character.maxHpModifier
          : this.clampInteger(
              changes.maxHpModifier,
              minimumModifier,
              Number.MAX_SAFE_INTEGER,
              character.maxHpModifier,
            ),
      maxHpOverride:
        changes.maxHpOverride === undefined
          ? character.maxHpOverride
          : this.clampInteger(
              changes.maxHpOverride,
              0,
              Number.MAX_SAFE_INTEGER,
              character.maxHpOverride,
            ),
    }));
  }

  setEquippedArmourType(value: string) {
    this.updateSourceState((character) => ({
      ...character,
      equippedArmourType: this.requiredText(
        value,
        character.equippedArmourType,
      ),
    }));
  }

  setWealth(changes: Partial<SourceCharacterState['wealth']>) {
    this.updateSourceState((character) => {
      const wealth = { ...character.wealth };
      const wealthTransaction = { ...character.wealthTransaction };

      for (const currency of ['gold', 'silver', 'copper'] as const) {
        if (!(currency in changes)) continue;
        const nextValue = this.clampInteger(
          changes[currency],
          0,
          Number.MAX_SAFE_INTEGER,
          wealth[currency],
        );
        const delta = nextValue - wealth[currency];
        wealth[currency] = nextValue;
        if (delta !== 0) {
          wealthTransaction[currency] = [delta, ...wealthTransaction[currency]];
        }
      }

      return { ...character, wealth, wealthTransaction };
    });
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

  // private getAcBaseFromArmour(equippedArmourType: string): number {
  //   switch (equippedArmourType.toLowerCase()) {
  //     case 'padded':
  //     case 'leather':
  //       return 11;
  //
  //     case 'studded leather':
  //     case 'hide':
  //       return 12;
  //
  //     case 'chain shirt':
  //       return 13;
  //
  //     case 'scale mail':
  //     case 'breastplate':
  //     case 'ring mail':
  //       return 14;
  //
  //     case 'half plate':
  //       return 15;
  //
  //     case 'chain mail':
  //       return 16;
  //
  //     case 'splint':
  //       return 17;
  //
  //     case 'plate':
  //       return 18;
  //
  //     default:
  //       return 0;
  //   }
  // }

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

  changeExhaustion(change: number) {
    if (!Number.isFinite(change)) return;

    this.sourceState$$.update((c) => ({
      ...c,
      conditions: {
        ...c.conditions,
        exhaustion: Math.min(
          6,
          Math.max(0, (c.conditions.exhaustion || 0) + change),
        ),
      },
    }));
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
    this.sourceState$$.set(this.freshInitialCharacter());
    return true;
  }

  changeMaxHpMod(maxHpModifier: number) {
    const requestedModifier = Number(maxHpModifier);
    if (!Number.isFinite(requestedModifier)) return;

    const minimumModifier = 1 - this.character().totalInitialHP;
    this.sourceState$$.update((c) => ({
      ...c,
      maxHpModifier: Math.max(minimumModifier, Math.trunc(requestedModifier)),
    }));
  }

  toggleInspiration() {
    this.sourceState$$.update((c) => ({
      ...c,
      inspiration: c.inspiration ^ 1,
    }));
  }

  toggleRage() {
    this.sourceState$$.update((c) => ({
      ...c,
      rage: c.rage ^ 1,
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

  updateInventoryItem(index: number, changes: Partial<Inventory>): boolean {
    let updated = false;
    this.updateSourceState((character) => {
      const safeIndex = Math.trunc(Number(index));
      if (
        !Number.isFinite(safeIndex) ||
        safeIndex < 0 ||
        safeIndex >= character.inventory.length
      ) {
        return character;
      }

      const current = character.inventory[safeIndex];
      const inventory = [...character.inventory];
      inventory[safeIndex] = this.normaliseInventoryItem(
        {
          ...current,
          ...changes,
          itemSpecific: changes.itemSpecific
            ? { ...current.itemSpecific, ...changes.itemSpecific }
            : current.itemSpecific,
        },
        current,
      );
      updated = true;
      return { ...character, inventory };
    });
    return updated;
  }

  addInventoryItem(item: Partial<Inventory> = {}): number {
    let addedIndex = -1;
    this.updateSourceState((character) => {
      const defaultItem: Inventory = {
        qty: 1,
        name: 'New Item',
        value: 0,
        weight: 0,
        notes: '',
        requiresAttunement: false,
        isAttuned: false,
        equipped: false,
        category: 'Adventuring Gear',
        itemSpecific: {},
      };
      const added = this.normaliseInventoryItem(
        {
          ...defaultItem,
          ...item,
          itemSpecific: { ...defaultItem.itemSpecific, ...item.itemSpecific },
        },
        defaultItem,
      );
      addedIndex = character.inventory.length;
      return { ...character, inventory: [...character.inventory, added] };
    });
    return addedIndex;
  }

  removeInventoryItem(index: number): boolean {
    let removed = false;
    this.updateSourceState((character) => {
      const safeIndex = Math.trunc(Number(index));
      if (
        !Number.isFinite(safeIndex) ||
        safeIndex < 0 ||
        safeIndex >= character.inventory.length
      ) {
        return character;
      }

      removed = true;
      return {
        ...character,
        inventory: character.inventory.filter((_, itemIndex) => {
          return itemIndex !== safeIndex;
        }),
      };
    });
    return removed;
  }

  private updateSourceState(
    update: (character: SourceCharacterState) => SourceCharacterState,
  ) {
    this.sourceState$$.update(update);
    this.character();
  }

  private requiredText(value: string | undefined, fallback: string): string {
    if (typeof value !== 'string') return fallback;
    return value.trim() || fallback.trim() || 'Unknown';
  }

  private clampInteger(
    value: number | undefined,
    minimum: number,
    maximum: number,
    fallback: number,
  ): number {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return fallback;
    return Math.min(maximum, Math.max(minimum, Math.trunc(numericValue)));
  }

  private clampNumber(
    value: number | undefined,
    minimum: number,
    maximum: number,
    fallback: number,
  ): number {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return fallback;
    return Math.min(maximum, Math.max(minimum, numericValue));
  }

  private supportedHitDie(value: number | undefined, fallback: number): number {
    const supported = [6, 8, 10, 12];
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return fallback;
    return supported.reduce((nearest, candidate) =>
      Math.abs(candidate - numericValue) < Math.abs(nearest - numericValue)
        ? candidate
        : nearest,
    );
  }

  private alignRolledHp(
    currentRolls: number[],
    level: number,
    hitDie: number,
  ): number[] {
    const averageRoll = Math.floor(hitDie / 2) + 1;
    return Array.from({ length: level }, (_, index) =>
      this.clampInteger(currentRolls[index], 1, hitDie, averageRoll),
    );
  }

  private updateAbilities(
    current: abilities<number>,
    changes: Partial<abilities<number>>,
    minimum: number,
    maximum: number,
  ): abilities<number> {
    const updated = { ...current };
    for (const abilityName of this.abilityNames()) {
      if (!(abilityName in changes)) continue;
      updated[abilityName] = this.clampInteger(
        changes[abilityName],
        minimum,
        maximum,
        current[abilityName],
      );
    }
    return updated;
  }

  private updateOptionalAbilities(
    current: abilities<number | undefined>,
    changes: Partial<abilities<number | undefined>>,
    minimum: number,
    maximum: number,
  ): abilities<number | undefined> {
    const updated = { ...current };
    for (const abilityName of this.abilityNames()) {
      if (!(abilityName in changes)) continue;
      const value = changes[abilityName];
      updated[abilityName] =
        value === undefined
          ? undefined
          : this.clampInteger(
              value,
              minimum,
              maximum,
              current[abilityName] ?? minimum,
            );
    }
    return updated;
  }

  private abilityNames(): ability[] {
    return [
      'Strength',
      'Dexterity',
      'Constitution',
      'Intelligence',
      'Wisdom',
      'Charisma',
    ];
  }

  private cleanStringList(values: string[]): string[] {
    if (!Array.isArray(values)) return [];
    return Array.from(
      new Set(
        values
          .filter((value): value is string => typeof value === 'string')
          .map((value) => value.trim())
          .filter(Boolean),
      ),
    );
  }

  private normaliseInventoryItem(
    item: Inventory,
    fallback: Inventory,
  ): Inventory {
    const requiresAttunement = Boolean(item.requiresAttunement);
    return {
      ...item,
      name: this.requiredText(item.name, fallback.name),
      category: this.requiredText(item.category, fallback.category),
      qty: this.clampInteger(
        item.qty,
        0,
        Number.MAX_SAFE_INTEGER,
        fallback.qty,
      ),
      value: this.clampNumber(
        item.value,
        0,
        Number.MAX_SAFE_INTEGER,
        fallback.value,
      ),
      weight: this.clampNumber(
        item.weight,
        0,
        Number.MAX_SAFE_INTEGER,
        fallback.weight,
      ),
      notes: typeof item.notes === 'string' ? item.notes : fallback.notes,
      requiresAttunement,
      isAttuned: requiresAttunement && Boolean(item.isAttuned),
      equipped: Boolean(item.equipped),
      itemSpecific: { ...fallback.itemSpecific, ...item.itemSpecific },
    };
  }

  private freshInitialCharacter(): SourceCharacterState {
    const character = JSON.parse(
      JSON.stringify(initialCharacter),
    ) as SourceCharacterState;
    return { ...character, version: this.latestVersion };
  }

  private migrateSavedCharacter(
    character: SourceCharacterState,
  ): SourceCharacterState {
    if (character.version === this.latestVersion) return character;

    const inventory = Array.isArray(character.inventory)
      ? [...character.inventory]
      : [];
    for (const itemName of ['Shortsword', 'Goggles of Night']) {
      const hasItem = inventory.some(
        (item) =>
          item.name?.trim().toLocaleLowerCase() ===
          itemName.toLocaleLowerCase(),
      );
      const bundledItem = initialCharacter.inventory.find(
        (item) => item.name === itemName,
      );
      if (!hasItem && bundledItem) {
        inventory.push(structuredClone(bundledItem));
      }
    }

    return { ...character, inventory, version: this.latestVersion };
  }
}

// todo: add in Charm of the Creeping Hand logic

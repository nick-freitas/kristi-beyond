import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { sumReducer } from './utils';

const initialCharacter: SourceCharacterState = {
  name: 'Vasha Taltos',
  race: 'Reborn Vistani',
  background: 'Hermit',
  alignment: 'UK',
  inspiration: 0,
  additionalInventory: '',
  classes: [
    {
      class: 'Wild Oracle',
      subclass: 'Fate of the Chosen',
      level: 10,
      hitDie: 8,
    },
  ],
  rolledStats: {
    str: 12,
    dex: 13,
    con: 13,
    int: 9,
    wis: 15,
    cha: 9,
  },
  featureUsages: {
    pastKnowledge: 0,
    sharedDestiny: 0,
    scry: 0,
    convergentReturn: 0,
    telepathicDetectThoughts: 0,
  },
  currentHp: undefined,
  currentHitDie: undefined,
  hitDieType: 'd8',
  conditions: {},
  overrideAbilityScores: {},
  asis: [
    { level: 4, wis: 1, con: 1 },
    { level: 8, wis: 1, con: 1 },
  ],
  saveProficiencies: {
    wis: true,
    cha: true,
  },
  feats: [
    {
      level: 1,
      name: 'Telepathic',
      description: `
          You awaken the ability to mentally connect with others, granting you the following benefits:

          * Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.
          * You can speak telepathically to any creature you can see within 60 feet of you. Your telepathic utterances are in a language you know, and the creature understands you only if it knows that language. Your communication doesn't give the creature the ability to respond to you telepathically.
          * You can cast the Detect Thoughts spell, requiring no spell slot or components, and you must finish a long rest before you can cast it this way again. Your spellcasting ability for the spell is the ability increased by this feat. If you have spell slots of 2nd level or higher, you can cast this spell with them.
          `,
      asi: 'wis',
    },
  ],
  languages: ['Common', 'Sylvan', 'Orcish', 'Telepathic (60ft)'],
  tools: ['Herbalism Kit', "Calligrapher's Set", 'Playing Cards'],
  armourProficiencies: ['Light Armour'],
  weaponProficiencies: [
    'Simple Weapons',
    'Hand Crossbows',
    'Heavy Crossbows',
    'Glaives',
    'Whips',
    'Shortswords',
  ],
  tempHp: 0,
  speeds: { land: 30, swim: 15, climb: 15 },
  resistances: { poison: true },
  immunities: { magicalSleep: true },
  advantages: {
    deathSaves: true,
    diseasePoison: true,
  },
  rolledHP: [8, 5, 2, 6, 8, 4, 2, 6, 3, 2],
  maxHpModifier: 0,
  maxHpOverride: 0,
  skillProficiencies: {
    arcana: true, //wild oracle
    insight: true, //wild oracle
    investigation: true, //reborn
    medicine: true, //hermit
    persuasion: true, //reborn
    religion: true, //hermit
  },
  racialAsis: {
    con: 1,
    int: 1,
    wis: 1,
  },
  equippedArmourType: 'Leather',
  deathSaves: [],
  wealth: {
    gold: 1950,
    silver: 0,
    copper: 0,
  },
  inventory: [
    {
      qty: 1,
      name: 'Leather Armour',
      notes: 'Light, AC 11',
      type: '',
      weight: 10,
      value: 0,
      requiresAttunement: false,
    },
    {
      qty: 1,
      name: "Explorer's Pack",
      notes:
        'Backpack,bedroll,mess kit,tinderbox,torch (10),rations (10),waterskin,hempen rope',
      type: '',
      weight: 0,
      value: 0,
      requiresAttunement: false,
    },
    {
      qty: 1,
      name: 'Glaive',
      notes: 'Marial, Melee, Heavy, Reach, Two-Handed',
      type: '',
      weight: 6,
      value: 0,
      requiresAttunement: false,
    },
    {
      qty: 1,
      name: 'Wild Tarot Deck',
      notes: '',
      type: '',
      weight: 0,
      value: 0,
      requiresAttunement: false,
    },
    {
      qty: 2,
      name: 'Greater Potions of Healing',
      notes: 'Potion, Healing, Consumable, 4d4 + 4',
      type: '',
      weight: 0,
      value: 0,
      requiresAttunement: false,
    },
  ],
};

type SourceCharacterState = {
  name: string;
  race: string;
  background: string;
  alignment: string;
  classes: {
    class: string;
    subclass: string;
    level: number;
    hitDie: number;
  }[];
  additionalInventory: string;
  featureUsages: {
    telepathicDetectThoughts: number;
    pastKnowledge: number;
    sharedDestiny: number;
    scry: number;
    convergentReturn: number;
  };
  inspiration: number;
  tempHp: number;
  currentHp: number | undefined;
  currentHitDie: number | undefined;
  hitDieType: string;
  deathSaves: boolean[];
  rolledStats: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  asis: {
    level: number;
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
  }[];
  feats: {
    level: number;
    name: string;
    description: string;
    asi: string;
  }[];

  languages: string[];
  tools: string[];
  speeds: {
    land: number;
    burrow?: number;
    climb?: number;
    fly?: number;
    swim?: number;
  };
  resistances: {
    poison?: boolean;
    magicalSleep?: boolean;
  };
  immunities: {
    poison?: boolean;
    magicalSleep?: boolean;
  };
  advantages: {
    deathSaves?: boolean;
    diseasePoison?: boolean;
  };
  rolledHP: number[];
  maxHpModifier: number;
  maxHpOverride: number;
  skillProficiencies: {
    acrobatics?: boolean;
    animalHandling?: boolean;
    arcana?: boolean;
    athletics?: boolean;
    deception?: boolean;
    history?: boolean;
    insight?: boolean;
    intimidation?: boolean;
    investigation?: boolean;
    medicine?: boolean;
    nature?: boolean;
    perception?: boolean;
    performance?: boolean;
    persuasion?: boolean;
    religion?: boolean;
    sleightOfHand?: boolean;
    stealth?: boolean;
    survival?: boolean;
  };
  racialAsis: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
  };
  saveProficiencies: {
    str?: boolean;
    dex?: boolean;
    con?: boolean;
    int?: boolean;
    wis?: boolean;
    cha?: boolean;
  };
  inventory: {
    qty: number;
    name: string;
    value: number;
    weight: number;
    notes: string;
    requiresAttunement: boolean;
    type: string;
  }[];
  overrideAbilityScores: {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
  };
  armourProficiencies: string[];
  weaponProficiencies: string[];
  equippedArmourType: string;
  wealth: {
    gold: number;
    silver: number;
    copper: number;
  };
  conditions: {
    blinded?: boolean;
    charmed?: boolean;
    deafened?: boolean;
    frightened?: boolean;
    grappled?: boolean;
    incapacitated?: boolean;
    invisible?: boolean;
    paralyzed?: boolean;
    petrified?: boolean;
    poisoned?: boolean;
    prone?: boolean;
    restrained?: boolean;
    stunned?: boolean;
    unconscious?: boolean;
    magicalSleep?: boolean;
    exhaustion?: number;
  };
};

type CharacterState = SourceCharacterState & {
  totalLevel: number;
  abilityScores: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  abilityModifiers: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  deathFails: number;
  deathPasses: number;
  totalInitialHP: number;
  totalMaxHP: number;
  ac: number;
  proficiency: number;
  initiative: number;
  passives: {
    investigation: number;
    perception: number;
    insight: number;
  };
  saveModifiers: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  skillModifiers: {
    acrobatics: number;
    animalHandling: number;
    arcana: number;
    athletics: number;
    deception: number;
    history: number;
    insight: number;
    intimidation: number;
    investigation: number;
    medicine: number;
    nature: number;
    perception: number;
    performance: number;
    persuasion: number;
    religion: number;
    sleightOfHand: number;
    stealth: number;
    survival: number;
  };
};

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  public readonly errors: WritableSignal<string | null> = signal(null);
  private readonly sourceState$$: WritableSignal<SourceCharacterState> =
    signal(initialCharacter);
  public readonly character: Signal<CharacterState> = computed(() => {
    const character = this.sourceState$$();
    const totalLevel = sumReducer(
      character.classes.map((c) => c.level).filter((x) => x),
    );

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

    const totalInitialHP = sumReducer(
      character.rolledHP.filter((x) => x).map((x) => x + abilityModifiers.con),
    );

    // if (totalInitialHP <= 0) {
    //   this.errors.set(`Rolled HP plus Con Modifier is less than or equal to 0`);
    // }

    const totalMaxHP = character.maxHpOverride
      ? character.maxHpOverride
      : totalInitialHP + character.maxHpModifier;

    if (character.currentHp === undefined) character.currentHp = totalMaxHP;
    if (character.currentHp! > totalMaxHP) character.currentHp = totalMaxHP;

    let ac = this.getAcBaseFromArmour(character.equippedArmourType);
    const maxDexMod = this.getMaxDexFromArmour(character.equippedArmourType);
    const dexMod = Math.min(abilityModifiers.dex, maxDexMod);
    ac += dexMod;

    const proficiency = this.calcProficiencyModifier(totalLevel);

    const saveModifiers = {
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
    };
  });

  constructor() {
    const savedCharacter = localStorage.getItem('character');
    if (savedCharacter) {
      this.sourceState$$.set(JSON.parse(savedCharacter));
    }
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
    }));
  }

  modSilver(change: number) {
    this.sourceState$$.update((c) => ({
      ...c,
      wealth: { ...c.wealth, silver: c.wealth.silver + change },
    }));
  }

  modCopper(change: number) {
    this.sourceState$$.update((c) => ({
      ...c,
      wealth: { ...c.wealth, copper: c.wealth.copper + change },
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
}

// todo: add in Charm of the Creeping Hand logic

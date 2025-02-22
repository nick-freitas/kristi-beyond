import { abilities, ability } from '../data/dnd5e.system.data';

export type Inventory = {
  qty: number;
  name: string;
  value: number;
  weight: number;
  notes: string;
  requiresAttunement: boolean;
  isAttuned: boolean;
  equipped: boolean;
  category: string;
  itemSpecific: {
    proficient?: boolean;
    ac?: number;
    acOffset?: number;
    Strength?: number;
    stealthDis?: boolean;
    armourType?: 'Light' | 'Medium' | 'Heavy';
    attackMod?: number;
    damageMod?: number;
    attackModStat?: string;
    damage?: string;
    damageType?: string;
    properties?: string;
    saveMod?: number;
    intiativeAdv?: boolean;
    additionalMod?: number;
    skillAdv?: abilities<boolean | undefined>;
    overrideAbilityScore?: abilities<number | undefined>;
  };
};

export type SourceCharacterState = {
  abilityAdvantages: abilities<boolean>;
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
    creepingHand: number;
    vecnasLink: number;
  };
  inspiration: number;
  rage: number;
  tempHp: number;
  currentHp: number | undefined;
  currentHitDie: number | undefined;
  hitDieType: string;
  deathSaves: boolean[];
  rolledStats: abilities<number>;
  asis: Array<
    {
      level: number;
    } & abilities<number | undefined>
  >;
  feats: {
    level: number;
    name: string;
    description: string;
    asi: ability;
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
    bludgeoning?: boolean;
    piercing?: boolean;
    slashing?: boolean;
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
  racialAsis: abilities<number | undefined>;
  saveProficiencies: abilities<boolean | undefined>;
  saveAdvantages: abilities<boolean | undefined>;
  inventory: Inventory[];
  overrideAbilityScores: abilities<number | undefined>;
  armourProficiencies: string[];
  weaponProficiencies: string[];
  equippedArmourType: string;
  wealth: {
    gold: number;
    silver: number;
    copper: number;
  };
  wealthTransaction: {
    gold: number[];
    silver: number[];
    copper: number[];
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
  rageDamage: number;
};

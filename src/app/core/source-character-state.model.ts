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
    str?: number;
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
    skillAdv?: {
      wis?: boolean;
    };
    overrideAbilityScore?: {
      con?: number;
      str?: number;
    };
  };
};

export type SourceCharacterState = {
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
  inventory: Inventory[];
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
};

import { SourceCharacterState } from '../core/source-character-state.model';
import { vashaInventory } from './vasha.inventory.data';
import { abilities } from './dnd5e.system.data';

const rolledStats: abilities<number> = {
  Strength: 12,
  Dexterity: 13,
  Constitution: 13,
  Intelligence: 9,
  Wisdom: 15,
  Charisma: 9,
};

export const initialCharacter: SourceCharacterState = {
  version: '',
  name: 'Vasha Taltos',
  race: 'Reborn Vistani',
  background: 'Hermit',
  alignment: 'UK',
  inspiration: 0,
  rage: 0,
  additionalInventory: '',
  classes: [
    {
      class: 'Wild Oracle',
      subclass: 'Fate of the Chosen',
      level: 12,
      hitDie: 8,
    },
  ],
  rolledStats,
  featureUsages: {
    pastKnowledge: 0,
    sharedDestiny: 0,
    scry: 0,
    convergentReturn: 0,
    telepathicDetectThoughts: 0,
    creepingHand: 0,
    vecnasLink: 0,
  },
  currentHp: undefined,
  currentHitDie: undefined,
  hitDieType: 'd8',
  conditions: {},
  overrideAbilityScores: {
    Strength: undefined,
    Constitution: undefined,
    Dexterity: undefined,
    Intelligence: undefined,
    Wisdom: undefined,
    Charisma: undefined,
  },
  asis: [
    {
      level: 4,
      Strength: undefined,
      Constitution: undefined,
      Dexterity: 1,
      Intelligence: undefined,
      Wisdom: 1,
      Charisma: undefined,
    },
    {
      level: 8,
      Strength: undefined,
      Constitution: undefined,
      Dexterity: undefined,
      Intelligence: undefined,
      Wisdom: 1,
      Charisma: 1,
    },
  ],
  saveProficiencies: {
    Strength: undefined,
    Constitution: undefined,
    Dexterity: undefined,
    Intelligence: undefined,
    Wisdom: true,
    Charisma: true,
  },
  saveAdvantages: {
    Strength: undefined,
    Constitution: undefined,
    Dexterity: undefined,
    Intelligence: undefined,
    Wisdom: undefined,
    Charisma: undefined,
  },
  abilityAdvantages: {
    Strength: false,
    Constitution: false,
    Dexterity: false,
    Intelligence: false,
    Wisdom: false,
    Charisma: false,
  },
  feats: [
    {
      level: 1,
      name: 'Telepathic',
      description: '',
      asi: 'Wisdom',
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
  rolledHP: [8, 5, 2, 6, 8, 4, 2, 6, 3, 2, 5, 5],
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
    Strength: undefined,
    Constitution: 1,
    Dexterity: undefined,
    Intelligence: 1,
    Wisdom: 1,
    Charisma: undefined,
  },
  equippedArmourType: 'Leather',
  deathSaves: [],
  wealth: {
    gold: 285,
    silver: 0,
    copper: 0,
  },
  wealthTransaction: {
    gold: [45, 100, 1850, 10000, -1200, -100, -320, -10000],
    silver: [],
    copper: [],
  },
  rageDamage: -9999,
  inventory: vashaInventory,
};

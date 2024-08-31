import {
  Inventory,
  SourceCharacterState,
} from './source-character-state.model';

const rolledStats = {
  str: 12,
  dex: 13,
  con: 13,
  int: 9,
  wis: 15,
  cha: 9,
};

const inventory: Inventory[] = [
  {
    qty: 1,
    name: 'Cloak of Protection',
    notes:
      'You gain a +1 bonus to AC and saving throws while you wear this cloak.',
    weight: 0,
    value: 0,
    requiresAttunement: true,
    isAttuned: true,
    equipped: true,
    category: 'Cloak',
    itemSpecific: {
      ac: 1,
      saveMod: 1,
    },
  },
  {
    qty: 1,
    name: 'Sentinel Shield',
    notes:
      'While holding this shield, you have advantage on initiative rolls and Wisdom (Perception) checks. The shield is emblazoned with the symbol of an eye.',
    weight: 0,
    value: 0,
    requiresAttunement: false,
    isAttuned: false,
    equipped: true,
    category: 'Shield',
    itemSpecific: {
      ac: 2,
      intiativeAdv: true,
      skillAdv: {
        wis: true,
      },
    },
  },
  {
    qty: 1,
    name: '(X) Ring Of Spell Storing',
    notes: `This ring stores spells cast into it, holding them until the attuned wearer uses them. The ring can store up to 5 levels worth of spells at a time. When found, it contains 1d6 - 1 levels of stored spells chosen by the DM.

    Any creature can cast a spell of 1st through 5th level into the ring by touching the ring as the spell is cast. The spell has no effect, other than to be stored in the ring. If the ring can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses.

    While wearing this ring, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The spell cast from the ring is no longer stored in it, freeing up space.
    `,
    weight: 0,
    value: 0,
    requiresAttunement: true,
    isAttuned: true,
    equipped: true,
    category: 'Ring',
    itemSpecific: {},
  },
  {
    qty: 1,
    name: 'Amulet of Health',
    notes:
      'Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution is already 19 or higher without it.',
    weight: 0,
    value: 0,
    requiresAttunement: true,
    isAttuned: true,
    equipped: true,
    category: 'Ring',
    itemSpecific: {
      overrideAbilityScore: {
        con: 19,
      },
    },
  },
  {
    qty: 1,
    name: '(X) Clockwork Amulet',
    notes: `This copper amulet contains tiny interlocking gears and is powered by magic from Mechanus, a plane of clockwork predictability. A creature that puts an ear to the amulet can hear faint ticking and whirring noises coming from within.

    When you make an attack roll while wearing the amulet, you can forgo rolling the d20 to get a 10 on the die. Once used, this property can't be used again until the next dawn.`,
    weight: 0,
    value: 0,
    requiresAttunement: false,
    isAttuned: false,
    equipped: true,
    category: 'Amulet',
    itemSpecific: {},
  },
  {
    qty: 1,
    name: '(X) Everbright Lantern',
    notes: `This bullseye lantern contains an Eberron dragonshard that sheds light comparable to that produced by a Continual Flame spell. An everbright lantern sheds light in a 120-foot cone; the closest 60 feet is bright light, and the farthest 60 feet is dim light.`,
    weight: 0,
    value: 0,
    requiresAttunement: false,
    isAttuned: false,
    equipped: true,
    category: 'Vision',
    itemSpecific: {},
  },

  {
    qty: 1,
    name: 'Pot of Awakening',
    notes: `If you plant an ordinary shrub in this 10-pound clay pot and let it grow for 30 days, the shrub magically transforms into an awakened shrub (see the Monster Manual for statistics) at the end of that time. When the shrub awakens, its roots break the pot, destroying it.

The awakened shrub is friendly toward you. Absent commands from you, it does nothing.`,
    weight: 0,
    value: 0,
    requiresAttunement: false,
    isAttuned: false,
    equipped: false,
    category: '',
    itemSpecific: {},
  },
  {
    qty: 1,
    name: 'Leather Armour',
    notes: 'Light, AC 11',
    weight: 10,
    value: 0,
    requiresAttunement: false,
    isAttuned: false,
    equipped: false,
    category: 'Armour',
    itemSpecific: {
      ac: 11,
      acOffset: -10,
      stealthDis: false,
      str: 1,
      armourType: 'Light',
    },
  },
  {
    qty: 1,
    name: 'Studded Leather',
    notes: 'Light, AC 12',
    weight: 10,
    value: 0,
    requiresAttunement: false,
    isAttuned: false,
    equipped: true,
    category: 'Armour',
    itemSpecific: {
      ac: 12,
      acOffset: -10,
      stealthDis: false,
      str: 1,
      armourType: 'Light',
    },
  },
  {
    qty: 1,
    name: "Explorer's Pack",
    notes:
      'Backpack,bedroll,mess kit,tinderbox,torch (10),rations (10),waterskin,hempen rope',
    weight: 0,
    value: 0,
    requiresAttunement: false,
    isAttuned: false,
    equipped: false,
    category: '',
    itemSpecific: {},
  },
  {
    qty: 1,
    name: 'Glaive',
    notes: 'Martial, Melee, Heavy, Reach, Two-Handed',
    weight: 6,
    value: 20,
    requiresAttunement: false,
    isAttuned: false,
    category: 'Weapon',
    equipped: true,
    itemSpecific: {
      proficient: true,
      attackModStat: 'str',
      damage: '1d10',
      damageType: 'Slashing',
      properties: 'Heavy, Reach, Two-Handed',
    },
  },
  {
    qty: 1,
    name: 'Wild Tarot Deck',
    notes: 'Max Card Level: 4; Card Draws: 5; Cantrips Known: 4',
    weight: 0,
    value: 0,
    requiresAttunement: false,
    isAttuned: false,
    category: 'Tarot',
    equipped: true,
    itemSpecific: {},
  },
  {
    qty: 2,
    name: 'Greater Potions of Healing',
    notes: 'Potion, Healing, Consumable, 4d4 + 4',
    weight: 0,
    value: 0,
    requiresAttunement: false,
    isAttuned: false,
    category: '',
    equipped: false,
    itemSpecific: {},
  },
];

export const initialCharacter: SourceCharacterState = {
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
  rolledStats,
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
    { level: 4, wis: 1, dex: 1 },
    { level: 8, wis: 1, cha: 1 },
  ],
  saveProficiencies: {
    wis: true,
    cha: true,
  },
  feats: [
    {
      level: 1,
      name: 'Telepathic',
      description: '',
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
  wealthTransaction: {
    gold: [100, 1850],
    silver: [],
    copper: [],
  },
  inventory,
};
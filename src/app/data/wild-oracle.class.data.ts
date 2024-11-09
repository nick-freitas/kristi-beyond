export const wildOracleClass: any = {
  hitDie: 8,
  subclasses: [
    {
      name: 'Fate of the Chosen',
    },
  ],
  featureUsages: {
    sharedDestiny: 0,
    scry: 0,
    convergentReturn: 0,
  },
  proficiencies: {
    save: {
      wis: true,
      cha: true,
    },
    armour: ['Light Armour'],
    weapons: [
      'Simple Weapons',
      'Hand Crossbows',
      'Heavy Crossbows',
      'Glaives',
      'Whips',
      'Shortswords',
    ],
    tools: ["Calligrapher's Set", 'Playing Cards'],
    skills: {
      choose: 2,
      options: [
        'Arcana',
        'History',
        'Insight',
        'Investigation',
        'Perception',
        'Religion',
        'Sleight of Hand',
      ],
    },
  },
  startingEquipment: [
    { type: 'choose', options: ['Heavy Crossbow', 'Glaive', 'Whip'] },
    { type: 'choose', options: ['Padded Armour', 'Leather Armour'] },
    { type: 'choose', options: ["Scholar's Pack", "Explorer's Pack"] },
    { type: 'all', options: ['Wild Tarot Deck'] },
    {
      type: 'choose',
      options: [
        'Club',
        'Dagger',
        'Greatclub',
        'Handaxe',
        'Javelin',
        'Light Hammer',
        'Mace',
        'Quarterstaff',
        'Sickle',
        'Spear',
      ],
    },
  ],
  spellcasting: {
    abilityModifier: 'wis',
  },
  ////

  feats: [
    {
      level: 1,
      name: 'Telepathic',
      description: '',
      asi: 'wis',
    },
  ],
  languages: ['Common', 'Sylvan', 'Orcish', 'Telepathic (60ft)'],
  resistances: { poison: true },
  advantages: {
    deathSaves: true,
    diseasePoison: true,
  },
  skillProficiencies: {
    arcana: true, //wild oracle
    insight: true, //wild oracle
    investigation: true, //reborn
    medicine: true, //hermit
    persuasion: true, //reborn
    religion: true, //hermit
  },
  equippedArmourType: 'Leather',
};

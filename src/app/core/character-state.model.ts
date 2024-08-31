import {
  Inventory,
  SourceCharacterState,
} from './source-character-state.model';

export type CharacterState = SourceCharacterState & {
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
  equipped: Inventory[];
};

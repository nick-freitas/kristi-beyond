import {
  Inventory,
  SourceCharacterState,
} from './source-character-state.model';
import { abilities } from '../data/dnd5e.system.data';

export type CharacterState = SourceCharacterState & {
  totalLevel: number;
  abilityScores: abilities<number>;
  abilityAdvantages: abilities<boolean>;
  abilityModifiers: abilities<number>;
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
  saveModifiers: abilities<number>;
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

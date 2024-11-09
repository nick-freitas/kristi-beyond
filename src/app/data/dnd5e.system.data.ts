export type ability =
  | 'Strength'
  | 'Constitution'
  | 'Dexterity'
  | 'Intelligence'
  | 'Wisdom'
  | 'Charisma';

export type abilities<T> = {
  Strength: T;
  Constitution: T;
  Dexterity: T;
  Intelligence: T;
  Wisdom: T;
  Charisma: T;
};

export type skill = 'Acrobatics' | 'Animal Handling' | 'Arcana';

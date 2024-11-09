import { OracleCard } from '../core/oracle-card.model';

export const deck: OracleCard[] = [
  {
    id: 23,
    name: 'I of Aberrations',
    path: '/assets/cards/aberrations1.webp',
    effect: `
You gain the Blinding Spittle feature.

A large glob of phlegm is lodged in your throat. You gain the ability tom as a bonus action, spit the glob at a point you can see within 15 feet. The glob explodes in a blinding flash of light on impact. Each creature within 5 feet of the flash must succeed on a Dexterity saving throw or be blinded until the end of your next turn.

If you do not spit the glob within one minute of gaining the feature, you are forced to swallow it inflicting 1d4 acid damage on yourself, and losing the ability to spit it.
  `,
  },

  {
    id: 19,
    name: 'II of Beasts',
    path: '/assets/cards/beasts2.webp',
    effect: `
Twisting Talons.

Your fingers transform into wickedly sharp three-inch talons. These talons count as simple weapons that you are in proficent in. Your talons have the following statistics:

Oracle Talons. Melee Weapon Attack: reach 5ft., one target. Hit 2d6 +Strength modifier slashing damage. The target must make a Consitution saving throw or suffer an additional 2d6 slashing damage as the claws rend their flesh.

If this card is drawn by a 8th or higher level wild oracle, the talons instead deal magical slashing damage. The Talons will stay for eight hours.
  `,
  },

  {
    id: 30,
    name: 'II of Fiends',
    path: '/assets/cards/fiends2.webp',
    effect: `
Best Fiends.

One humanoid you can see within 30 feet must make a Wisdom saving throw or is magically charmed for the next 10 minutes. The charmed creature obeys your commands unless it involves self-harm or harming one of their allies. When the spell ends, the creature knows you charmed them.
  `,
  },
  {
    id: 28,
    name: 'I of Celestials',
    path: '/assets/cards/celestials1.webp',
    effect: `
Divine Regeneration.

For the next minute, at the start of each of your turns, you regain a number of hit points equal to your Wisdom modifier. If you drop below 0 hit points or are incapacitated, this effect ends.
  `,
  },
  {
    id: 18,
    name: 'Familiar',
    path: '/assets/cards/familiar.webp',
    effect: `
A familiar materializes and will aid you as with the spell find familiar until the end of your next long rest. You may name the familiar while it is present. If you do, whenever this card comes up again, the same familiar will return to aid you. To determine which familiar appears, roll a 1d8:

1: Owl
2: Cat
3: Octopus
4: Crab
5: Imp
6: Pseudodragon
7: Gazer
8: Almarij
  `,
  },
  {
    id: 24,
    name: 'I of Plants',
    path: '/assets/cards/plants1.webp',
    effect: `
Choose a point within 90 feet of you. Weeds and vines sprout from the 30-ft square of ground centered on that point, turning the area into difficult terrain. A creature in the area where the plants sprout must make a Strength saving throw or be Restrained by the plants. A creature Restrained by the plants can use its action to make a Strength check against your spell save DC. On a success, it frees itself. After a minute, the conjured plants wither away .
  `,
  },
  {
    id: 23,
    name: 'III of Aberrations',
    path: '/assets/cards/aberrations3.webp',
    effect: `
Eye Stalk.

After you draw this card, an eye stalk emerges from an exposed area of your flesh. You may determine where this stalk appears. It extends one foot and gives you the ability to see 360 degrees with darkvision out to a range of 120 feet. The additional eyesight grants you +2 bonus to Armor Class, allows you to take the Dodge action as a bonus action on each of your turns, and makes you immune to the blind condition. The eye stalk sticks around until you use an action to dismiss it, or at the end of your next short or long rest.
  `,
  },
  {
    id: 17,
    name: 'Companion',
    path: '/assets/cards/companion.webp',
    effect: `
Heroic Companion

For the next minute, you are immune to being frightened and gain temporary hit points equal to your Wisdom modifier at the start of each of your turns.
  `,
  },
  {
    id: 27,
    name: 'II of Fey',
    path: '/assets/cards/fey2.webp',
    effect: `
Blink Dog Teleport.

As an action, you may magically teleport, along with any equipment you are wearing or carrying, to an unoccupied space you can see within 40 feet. Before or after teleporting, as a bonus action, you may make an attack action.
  `,
  },
  {
    id: 21,
    name: 'I of Undead',
    path: '/assets/cards/undead1.webp',
    effect: `
You are instilled with the unquenchable stamina of a zombie and gain the Undying feature for 1 hour. While this effect is active, if damage reduces you to Ohit points, you do not fall unconscious, instead you may continue fighting until the end of your next turn. If you are not healed by the end of your next turn, you fall unconscious and lose the Undying feature.
  `,
  },
  {
    id: 12,
    name: 'I of Adversaries',
    path: '/assets/cards/adversaries1.webp',
    effect: `
Reversed Polarities.

For the next minute, gravity is warped within a 5 foot radius around you. Any large or smaller creature that ends its turn within the radius, or that is within the radius when you end your turn, must make a Strength saving throw. On a failed save, the creature is pushed 10 feet away from you and is knocked prone.
  `,
  },
  {
    id: 26,
    name: 'I of Constructs',
    path: '/assets/cards/constructs1.webp',
    effect: `
Constructed Shield.

An animated shield appears before you. The shield leaps in front of you and hovers in your space to protect you from incoming attacks, giving you a +2 bonus to AC. After one minute, the shield disappears.
  `,
  },
  {
    id: 3,
    name: 'Fighter',
    path: '/assets/cards/fighter.webp',
    effect: `
For the next ten minutes, your weapon attacks score a critical hit on a roll of 19 or 20. In addition, twice before the end of your next short or long rest, you may take an additional action on your turn.
  `,
  },
  {
    id: 21,
    name: 'III of Undead',
    path: '/assets/cards/undead3.webp',
    effect: `
For the next one minute, you have resistance to magical and non-magical bludgeoning, slashing, and piercing attacks. However, you also gain vulnerability to radiant damage.
  `,
  },
  {
    id: 16,
    name: 'Ally',
    path: '/assets/cards/ally.webp',
    effect: `
A creature of your choice within 30 feet of you immediately regains a number of hit points equal to 1d8 + your Wisdom modifier. This ability has no effect on Undead or Constructs. The healing increases to 2d8 at 5th level, 3d8 at 10th level, and 4d8 at 15th level.
  `,
  },
  {
    id: 7,
    name: 'Druid',
    path: '/assets/cards/druid.webp',
    effect: `
You immediately activate the Druid's Wild Shape ability, using your Wild Oracle level instead of your Druid level to determine which beasts you can transform into. While you are in beast shape, you have the added restriction that you may not take the draw card action.
  `,
  },
  {
    id: 31,
    name: 'II of Giants',
    path: '/assets/cards/giants2.webp',
    effect: `
Chieftan's Frenzy.

You immediately grow to double your current size. This newfound size bestows advantage on all Strength skill checks and saving throws, and adds one damage die on successful melee attacks. This effect lasts 10 minutes.
  `,
  },
  {
    id: 33,
    name: 'Wild Oracle',
    path: '/assets/cards/wild_oracle.webp',
    effect: `
For the next one hour, as an action you may see the auras of creatures around you. Auras indicate a creature's general disposition towards you.

Blue: The creature views you favorably and is willing to aid you.
Green: The creature intends you no harm and is not attempting to deceive you.
Yellow: The creature is wary of your intentions, and may be hiding something from you.
Red: The creature intends you harm.
Flashing Colors: The creature is currently taking action to harm you, or your allies.
  `,
  },
  {
    id: 6,
    name: 'Barbarian',
    path: '/assets/cards/barbarian.webp',
    effect: `
You immediately enter a barbarian rage, gaining all of the benefits listed in the barbarian's Rage feature, using your Wild Oracle level instead of barbarian level to determine the bonus damage bestowed by your Rage. Additionally, when you attack with a melee weapon, you may use your Wisdom modifier for both attack and damage rolls. After drawing this card, you may immedietely make take a melee attack action.
  `,
  },
  {
    id: 25,
    name: 'I of Elemental',
    path: '/assets/cards/elemental1.webp',
    effect: `
You may immedietely cast one of the following spells at your highest card level: burning hands, thunderwave, or witch bolt.
  `,
  },
  {
    id: 32,
    name: 'II of Monstrosities',
    path: '/assets/cards/monstrosities2.webp',
    effect: `
Grip of Horror.

Tentacles erupt from your torso. As a bonus action, you may command these tentacles to restrain a Large or smaller creature within 10 feet of you. The creature must succeed on a Strength saving throw or recieve the restrain condition. On a restrained creature's turn, they may use an action to retry the saving throw. You must use a bonus action on your turn to maintain the restrained condition on a creature. At any time, you may use your reaction to release a restrained creature. The tentacles last for four hours.
  `,
  },
  {
    id: 14,
    name: 'Blood Hunter',
    path: '/assets/cards/blood_hunter.webp',
    effect: `
This card calls on you to sacrifice your blood to imbue your weapon with crackling psychic power. Immediately lose 1d8 hit points. Aweapon you are holding is imbued with Rite of the Oracle, and deals an additional 2d8 psychic damage on hit. This can be used to charge a melee or ranged weapon. Your blood keeps the blade imbued for one minute. You can further extend the duration by cutting yourself again and taking another 1d8 psychic damage. Each additional cut adds one minute to the duration.
  `,
  },
  {
    id: 25,
    name: 'II of Elementals',
    path: '/assets/cards/elementals2.webp',
    effect: `
You may immediately cast one of the following spells at your current card level: flaming sphere, gust of wind, or Melf's acid arrow.
  `,
  },
  {
    id: 9,
    name: 'Paladin',
    path: '/assets/cards/paladin.webp',
    effect: `
Aura of Protection.

Whenever you or a friendly creature within 10 feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your Wisdom modifier (with a minimum bonus of +1). You must be conscious to grant this bonus. If you are 18th or higher level, the range increases to 30 feet. Access to the feature lasts 4 hours.
  `,
  },
];

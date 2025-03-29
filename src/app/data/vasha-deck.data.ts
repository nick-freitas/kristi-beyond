import { OracleCard } from '../core/oracle-card.model';

export const deck: OracleCard[] = [
  {
    id: 0,
    equipped: false,
    level: 2,
    name: 'The Bard',
    effect: `You gain the bard's Bardic Inspiration feature. You may use this feature a number of times equivalent to your Wisdom modifier. Any unexpended uses at the end of your next long rest are lost. Your Bardic inspiration die starts at a d6, and increases with your wild oracle level; at level 5, it becomes a d8, at level 10 a d10, and at level 15 a d12.`,
    readings: [
      {
        header: 'NEW EXPERIENCES',
        content:
          'The carefree Bard\n' +
          'symbolizes the beginning of a new\n' +
          'adventure. Perhaps you are learning\n' +
          'something new, meeting new\n' +
          'people, or looking at a challenge\n' +
          'with a newfound perspective.',
      },
      {
        header: 'RECKLESSNESS',
        content:
          'Now is the time to start something\n' +
          'new, even if you are unsure of the\n' +
          'outcome. Trust in your performance,\n' +
          'but also take time to make sure\n' +
          'that you are well prepared.',
      },
    ],
  },
  {
    id: 1,
    equipped: false,
    level: 5,
    name: 'The Ranger',
    effect: `For the next ten minutes, you gain the sense True Sight out toa range of 120 feet. You can see in normal and magical darkness, see invisible creatures and objects, automatically detect visual illusions, and succeed on saving throws against them. You also perceive the original form of any shape changer or creature transformed by magic.`,
    readings: [
      {
        header: 'SELF-RELIANCE',
        content:
          'The independent Ranger shines\n' +
          'a light into the darkness. Although\n' +
          'you walk alone, you are not afraid.\n' +
          'You have a trusted companion\n' +
          'who supports you on your journey,\n' +
          'whether you know it or not. ',
      },
      {
        header: 'ISOLATION',
        content:
          'Solitude has become\n' +
          'desolation. Take the time and\n' +
          'effort to reconnect with someone\n' +
          'who has been a positive part\n' +
          'of your journey',
      },
    ],
  },
  {
    id: 2,
    equipped: false,
    level: 1,
    name: 'The Monk',
    effect: `For the next hour, you gain up to two of the effects below:

Monk Feet - your speed increased by 10 feet.

Slow Fall - as a reaction you can reduce any falling damage taken by five times your wild oracle level.

Ki-Imbued - your weapon attacks become magical.

Monastic Endurance - gain advantage on Strength and Dexterity saving throws.
  `,
    readings: [
      {
        header: 'BALANCE',
        content:
          'The duality of the Monk brings\n' +
          'forces into balance. If you meditate\n' +
          'on the inner truth, you can\n' +
          'bring your mind and body into\n' +
          'focus. Whatever challenge you\n' +
          'face is intuitively achievable. ',
      },
      {
        header: 'WITHDRAWAL',
        content:
          'When your world is out of\n' +
          'balance, withdraw into your inner\n' +
          'sanctum in order to clear your\n' +
          'mind and quiet the storm. You\n' +
          'will be ready to face the tempest\n' +
          'with renewed calm energy. ',
      },
    ],
  },
  {
    id: 3,
    equipped: true,
    name: 'The Fighter',
    level: 2,
    effect: `For the next ten minutes, your weapon attacks score a critical hit on a roll of 19 or 20. In addition, twice before the end of your next short or long rest, you may take an additional action on your turn.`,
    readings: [
      {
        header: 'COMMANDER',
        content:
          'The Fighter is a natural leader\n' +
          'and protector. You are unafraid of\n' +
          'conflict, and your life experience\n' +
          'grows because of it. You seek\n' +
          'fairness and peace, although there\n' +
          'is often turmoil in your path.',
      },
      {
        header: 'WARMAKER',
        content:
          'Beware an ascent into tyranny.\n' +
          'Are you restricting the freedoms\n' +
          'of another for your own benefit?\n' +
          'Or perhaps there is a different\n' +
          'figure of authority in your life\n' +
          'that you must fight to dethrone.',
      },
    ],
  },
  {
    id: 4,
    equipped: false,
    level: 2,
    name: 'The Cleric',
    effect: `Before the end of the turn, as a Free Action may cause a 30 foot sphere of daylight to erupt from your hand. You may use the Cleric's Channel Divinity: Turn Undead and Destroy Undead features on all undead within the sphere of daylight. Use your Wild Oracle level instead of your Cleric level for consulting the Destroy Undead Table. Alternatively, instead of using those features, you may cast healing word at your current card level. If you choose not to Turn Undead or cast healing word, the sphere disappears after one minute, otherwise it disappears at the end of your turn.`,
    readings: [
      {
        header: 'WISDOM',
        content:
          'The pious Cleric has plenty of\n' +
          'knowledge to absorb and divulge.\n' +
          'Seeking unity and a common goal,\n' +
          'you are a pillar of support for your\n' +
          'group or community. What else can\n' +
          'you do to help those around you?',
      },
      {
        header: 'CONFORMITY',
        content:
          'Be careful not to fall into an\n' +
          'echo chamber of reverberating\n' +
          'thoughts and dogma. Challenge\n' +
          'what you have been taught, for\n' +
          'it is the only way to gain new\n' +
          'insight and find your own voice.',
      },
    ],
  },
  {
    id: 5,
    equipped: false,
    name: 'The Rogue',
    level: 1,
    effect: `For the next hour, your appearance and your voice change. You determine the specifics of the changes, including your skin type, hair length, and sex. You can also adjust your height and weight, but not so much that your size changes. You can make yourself appear as a member of another humanoid race, though none of your game statistics change. Your clothing and equipment aren’t affected by this change. You gain advantage on Intimidation, Persuasion and Deception checks made to convince others of your new identity. Alternatively, you can forgo this transformation and instead become invisible for the next hour. The invisibility ends if you cast a spell or make an attack. (Contributed by Michael Stybert)`,
    readings: [
      {
        header: 'DECEPTION',
        content:
          'Born from turmoil, the Rogue\n' +
          'adapts quickly to any challenge.\n' +
          'Although you appear aloof, you\n' +
          'carry a painful past that you\n' +
          'would rather avoid than confront,\n' +
          'and you employ a whole host\n' +
          'of subversive skills to do so.',
      },
      {
        header: 'LIBERATION',
        content:
          'Break the shackles that bind\n' +
          'you by facing the challenge\n' +
          'you have been evading. Once\n' +
          'you do, you will feel lighter and\n' +
          'more powerful than before.',
      },
    ],
  },
  {
    id: 6,
    equipped: true,
    level: 1,
    name: 'The Barbarian',
    effect: `You immediately enter a barbarian rage, gaining all of the benefits listed in the barbarian's Rage feature, using your Wild Oracle level instead of barbarian level to determine the bonus damage bestowed by your Rage. Additionally, when you attack with a melee weapon, you may use your Wisdom modifier for both attack and damage rolls. After drawing this card, you may immedietely make take a melee attack action.`,
    readings: [
      {
        header: 'STRENGTH',
        content:
          'The Barbarian’s unparalleled\n' +
          'stamina and power are great\n' +
          'forces; with them, you are fearless\n' +
          'and confident. Protect others,\n' +
          'and they will repay you with\n' +
          'friendship and loyalty',
      },
      {
        header: 'EXHAUSTION',
        content:
          'Your animal instincts and rage\n' +
          'may be detrimental to you and\n' +
          'your goals. Be careful not to push\n' +
          'yourself too hard; you may end\n' +
          'up exhausting your energy and in\n' +
          'deeper water than you thought.',
      },
    ],
  },
  {
    id: 7,
    equipped: true,
    level: 2,
    name: 'The Druid',
    effect: `You immediately activate the Druid's Wild Shape ability, using your Wild Oracle level instead of your Druid level to determine which beasts you can transform into. While you are in beast shape, you have the added restriction that you may not take the draw card action.

To determine what beast you turn into roll on the following tables. You may choose to roll on a lower table than your current Wild Oracle level.

Wild Oracle Level 2 (Roll 1d8)
1 Axe Beak | 2 Boar
3 Cow | 4 Elk
5 Giant Frog | 6 Giant Poisonous Snake
7 Giant Wolf Spider | 8 Wolf

Wild Oracle Level 4 (Roll 1d6)
1 Ape | 2 Black Bear
3 Crocodile | 4 Giant Badger
5 Giant Goat | 6 War Horse

Wild Oracle Level 8 (Roll 1d10)
1 Brown Bear | 2 Deinonychus
3 Giant Bat | 4 Giant Hyena
5 Giant Owl | 6 Giant Spider
7 Giant Toad | 8 Giant Wasp
9 Lion | 10 Tiger`,
    readings: [
      {
        header: 'FAIRNESS',
        content:
          'The Druid seeks harmony and\n' +
          'justice. However, not everything is\n' +
          'clearly good or evil. Delve into the\n' +
          'murky waters of your situation to\n' +
          'uncover the truths. Don’t be afraid\n' +
          'to ask for guidance from others.',
      },
      {
        header: 'NEGLIGENCE',
        content:
          'It is easier to remain neutral\n' +
          'instead of taking a stance for\n' +
          'one side or another. But inaction\n' +
          'can lead to imbalance. Seek out\n' +
          'your voice and stand with those\n' +
          'who need your assistance.',
      },
    ],
  },
  {
    id: 8,
    equipped: false,
    level: 1,
    name: 'The Wizard',
    effect: `You immediately cast the spell magic missile. You cast this spell at the highest card level you have access to. (So, if you have access to level 4 cards, the magic missile must be cast as a level 4 spell.)

Note: you must target a creature with this spell, this includes allies, or even yourself. In the rare scenario there are no valid targets, the spell fizzles.`,
    readings: [
      {
        header: 'MANIFESTATION',
        content:
          'The ingenious Wizard uses the\n' +
          'tools at their disposal to create\n' +
          'magic. Be resourceful and your\n' +
          'magic will be greater than the\n' +
          'sum of its parts. Concentrate on\n' +
          'your goals and you will succeed.',
      },
      {
        header: 'ANALYSIS PARALYSIS',
        content:
          'Presented with too many\n' +
          'options or paths, you may find\n' +
          'yourself paralyzed with uncertainty.\n' +
          'Concentrate on your main goal and\n' +
          'don’t be afraid to step outside\n' +
          'of your comfort zone to\n' +
          'take a risk.',
      },
    ],
  },

  {
    id: 9,
    equipped: true,
    name: 'The Paladin',
    level: 3,
    effect: `Aura of Protection

Whenever you or a friendly creature within 10 feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your Wisdom modifier (with a minimum bonus of +1). You must be conscious to grant this bonus. If you are 18th or higher level, the range increases to 30 feet. Access to the feature lasts 4 hours.`,
    readings: [
      {
        header: 'GUIDANCE',
        content:
          'The righteous Paladin is often\n' +
          'guided by a higher power, but\n' +
          'also trusts in her own wisdom\n' +
          'and judgement. Seek guidance\n' +
          'from others, but do what you\n' +
          'think is right for yourself.',
      },
      {
        header: 'VIGILANCE',
        content:
          'At times you may be lost in the\n' +
          'darkness of your own self-doubts,\n' +
          'regrets, or guilt. The harshest\n' +
          'judgement comes from within,\n' +
          'so you must learn to forgive\n' +
          'yourself, just as you would forgive\n' +
          'others for their mistakes.',
      },
    ],
  },
  {
    id: 10,
    equipped: false,
    name: 'The Warlock',
    level: 3,
    effect: `Eldritch Orbs

Six globes of black eldritch energy begin swirling around you. On your turn, as a bonus action you can expend one of the globes to perform one of the following actions:

* Send the orb to a point you can see up to 120 feet away. You may close your eyes and see through the orb. While looking through the orb, you have darkvision out to a distance of 120 feet. The orb evaporates at the end of your turn.
* Fire the orb at a creature within 60 feet, make a ranged spell attack against that creature. On a hit, you deal 2d10 + your Wisdom modifier force damage.
* Harvest the eldritch energy of one orb to cast the spell mage armor on yourself.

This effect ends at the end of your next long or short rest.`,
    readings: [
      {
        header: 'CONNECTION',
        content:
          'The domineering Warlock is\n' +
          'bound to a patron from whom\n' +
          'they draw their power. Bind\n' +
          'yourself to a mentor or a loved one\n' +
          'who empowers you. Strengthen\n' +
          'your bond through mutual\n' +
          'trust and communication.',
      },
      {
        header: 'CONTROL',
        content:
          'A successful Warlock must\n' +
          'balance their relationships well;\n' +
          'imbalance will break bonds. If the\n' +
          'bond is no longer beneficial for\n' +
          'both parties, it is time to part ways\n' +
          'and seek a new path forward.',
      },
    ],
  },
  {
    id: 11,
    equipped: false,
    name: 'The Sorcerer',
    level: 3,
    effect: `When you draw this card, you gain unlimited uses of the Sorcerer's Tides of Chaos for the next 10 minutes. You manipulate the Fates to gain advantage on an attack roll, ability roll, or saving throw. Each time you utilize this feature, you must roll on the Wild Magic Surge table as described in the sorcerer entry of the Player’s Handbook. Roll on the table, and resolve the result. Like with the regular version of the table, you may only use this card with permission from your Dungeon Master.`,
    readings: [
      {
        header: 'INTUITION',
        content:
          'Magic comes naturally to the\n' +
          'gifted Sorcerer. Leverage your\n' +
          'innate talent and creative energy\n' +
          'in your endeavors. Put your plans\n' +
          'into action and watch the flame of\n' +
          'your soul burn bright.',
      },
      {
        header: 'DEVASTATION',
        content:
          'If you lack a clear plan or goal,\n' +
          'your untrained power may manifest\n' +
          'haphazardly, causing destruction\n' +
          'around you. Focus on your original\n' +
          'vision and center yourself so that\n' +
          'your magic will find its mark.',
      },
    ],
  },
  {
    id: 12,
    equipped: true,
    name: 'The Adversary',
    level: 1,
    effect: `Reversed Polarities

For the next minute, gravity is warped within a 5 foot radius around you. Any large or smaller creature that ends its turn within the radius, or that is within the radius when you end your turn, must make a Strength saving throw. On a failed save, the creature is pushed 10 feet away from you and is knocked prone.`,
    readings: [
      {
        header: 'GROWTH',
        content:
          'Facing the Adversary will give\n' +
          'you new experiences and insight.\n' +
          'Engage obstacles you face without\n' +
          'fear, especially if you have your\n' +
          'allies there to support you.',
      },
      {
        header: 'DEATH',
        content:
          'You face the end of something\n' +
          'important in your life. It may be\n' +
          'a difficult and harrowing ordeal,\n' +
          'but it will not last forever or be\n' +
          'without purpose. Learn from the\n' +
          'experience of pain and loss so\n' +
          'that you may ascend to\n' +
          'greater heights.',
      },
    ],
  },
  {
    id: 12,
    equipped: false,
    name: 'II of Adversaries',
    level: 2,
    effect: `Rendererak’s Revenge

For the next ten minutes, you become charged with electricity. Whenever an enemy hits you with a melee attack, you may use your reaction to send a bolt of lightning at the attacker, forcing them to make a Dexterity saving throw. On a fail, they take 4d8 lightning damage.`,
  },
  {
    id: 12,
    equipped: false,
    name: 'III of Adversaries',
    level: 3,
    effect: `Noj’s Dismay

Before the end of your turn, you point at a creature you can see within 30 feet of you. The creature must make a Wisdom saving throw. If they fail, they lose the ability to use one of their features for the next 24 hours. The feature lost is determined by the Dungeon Master.`,
  },
  {
    id: 12,
    equipped: false,
    name: 'IV of Adversaries',
    level: 4,
    effect: `A bead of force materializes into your hand. (See Magic Items in the Dungeon Master’s Guide.) The bead must be thrown within one minute, or it detonates in your hand.`,
  },
  {
    id: 12,
    equipped: false,
    name: 'V of Adversaries',
    level: 5,
    effect: `Rogers’ Lament

Once within the next hour, you maycast the greater restoration spell.`,
  },
  {
    id: 12,
    equipped: false,
    name: 'VI of Adversaries',
    level: 6,
    effect: `Katonic’s Dark Bargain

For the next minute, you are transformed into a greasy, hairy, demonic monstrosity with wings, and are surrounded with a dark aura.While transformed, you gain a flying speed of 60 feet, your Strength becomes 21 (+5), you gain advantage on all Charisma saving throws, and you can attack twice whenever you take the Attack action on your turn. When you hit a target with a melee attack, it takes an additional 2d12 necrotic damage,and you gain that many temporary hit points. While transformed, you may make a Darker Bargain as a free action. If you do,the transformation lasts for 10 minutes, but once the transformation ends, you suffer one level of exhaustion.`,
  },

  {
    id: 13,
    equipped: false,
    level: 5,
    name: 'The Mystic',
    effect: `Spectral Form

You, along with anything you are wearing or carrying, dematerialize into an unearthly state, for the next 10 minutes. This form gives you resistance to all damage,you move at half speed, and you can pass through objects and creatures while moving, but you cannot end your turn in another creature's space. Additionally, you gain flying speed equal to half your regular movement speed. While in Spectral Form, you can only make spell attacks, and you cannot draw additional cards. Also while you are in Spectral Form, you can read the surface thoughts of any creature within 60 feet of you. This allows you to perceive the general temperament a creature has towards you, detect lies, and understand motivations, even if the creature is alien to you, or does not speak your language.If you spend an action focusing on anyone creature,deeper thoughts maybe revealed at the Dungeon Master's discretion.`,
    readings: [
      {
        header: 'INTUITION',
        content:
          'The Mystic turns her mind’s\n' +
          'eye toward others in order to\n' +
          'find the answers she seeks. Trust\n' +
          'your insight and the instincts of\n' +
          'others to achieve your goals.',
      },
      {
        header: 'INDIFFERENCE',
        content:
          'Feeling too intuitive and right\n' +
          'can cause you to become cynical, if\n' +
          'you believe you can predict others’\n' +
          'thoughts and behaviors. Don’t jump\n' +
          'to conclusions based purely on\n' +
          'instinct. If you give others room\n' +
          'to prove themselves, they\n' +
          'can surprise you.',
      },
    ],
  },
  {
    id: 14,
    equipped: true,
    level: 4,
    name: 'The Blood Hunter',
    effect: `This card calls on you to sacrifice your blood to imbue your weapon with crackling psychic power. Immediately lose 1d8 hit points. A weapon you are holding is imbued with Rite of the Oracle, and deals an additional 2d8 psychic damage on hit. This can be used to charge a melee or ranged weapon. Your blood keeps the blade imbued for one minute. You can further extend the duration by cutting yourself again and taking another 1d8 psychic damage. Each additional cut adds one minute to the duration. When drawing this card, you may make an Attack as a free action before the end of the turn.`,
    readings: [
      {
        header: 'SACRIFICE',
        content:
          'The misunderstood Blood Hunter\n' +
          'sacrifices everything in order to\n' +
          'pursue her own form of justice.\n' +
          'Is your goal worth the pain and\n' +
          'suffering you create for yourself?',
      },
      {
        header: 'REDEMPTION',
        content:
          'If you have sacrificed any of your\n' +
          'values to achieve your goals, seek\n' +
          'atonement for your transgressions.\n' +
          'Repair any of the boundaries\n' +
          'that you have broken, especially\n' +
          'if you have broken your own.',
      },
    ],
  },
  {
    id: 15,
    equipped: false,
    level: 2,
    name: 'The Artificer',
    effect: `Before the end of your turn, you imbue five weapons within 30 feet of you with the Technology of Magic. This manifests itself in a multitude of ways; a longbow may magically acquire a scope, a hammer, wicked buzzsaw blades; a flail's striking heads may elongate and sharpen. For the next minute, the weapons are considered magical and gains a +1 bonus to attack and damage rolls (stacking up to +4.)`,
    readings: [
      {
        header: 'PRODUCTION',
        content:
          'The Artificer uses her innate\n' +
          'ingenuity to create magic from\n' +
          'mundane things in order to help\n' +
          'others. Can you see a new use for\n' +
          'something in your life that you\n' +
          'may have overlooked before?',
      },
      {
        header: 'DESTRUCTION',
        content:
          'Progress should not come at the\n' +
          'expense of morality. Be careful\n' +
          'you do not use your intellect\n' +
          'to harm others. You may feel\n' +
          'powerful with your arsenal of\n' +
          'weapons, but at the cost of\n' +
          'peace with those around you.',
      },
    ],
  },
  {
    id: 16,
    equipped: true,
    level: 1,
    name: 'The Ally',
    effect: `A creature of your choice within 30 feet of you immediately regains a number of hit points equal to 1d8 + your Wisdom modifier. This ability has no effect on Undead or Constructs. The healing increases to 2d8 at 5th level, 3d8 at 10th level, and 4d8 at 15th level.`,
    readings: [
      {
        header: 'SUPPORT',
        content:
          'Companionship can make\n' +
          'even a difficult journey enjoyable.\n' +
          'Find someone who is on the\n' +
          'same quest as you, and use your\n' +
          'alliance to your advantage.',
      },
      {
        header: 'BURDEN',
        content:
          'On your journey you may find\n' +
          'yourself saddled with an inept\n' +
          'companion who proves to be\n' +
          'more of a burden than a helping\n' +
          'hand. Your could jettison them\n' +
          'and continue alone, or work to\n' +
          'find a hidden strength you both\n' +
          'may have overlooked.',
      },
    ],
  },
  {
    id: 17,
    equipped: true,
    name: 'The Companion',
    level: 1,
    effect: `Heroic Companion

For the next minute, you are immune to being frightened and gain temporary hit points equal to your Wisdom modifier at the start of each of your turns.`,
    readings: [
      {
        header: 'PROTECTION',
        content:
          'You have a stalwart Companion\n' +
          'who fights alongside you on\n' +
          'your journey. Recognize who\n' +
          'they are, and let them know that\n' +
          'you appreciate their support.',
      },
      {
        header: 'INSECURITY',
        content:
          'Without proper nurturing\n' +
          'and care, even the most special\n' +
          'bonds can be broken. Do not take\n' +
          'your relationship with your loyal\n' +
          'Companion for granted, lest they\n' +
          'retreat back to the wilderness to\n' +
          'better care for themselves.',
      },
    ],
  },
  {
    id: 18,
    equipped: true,
    name: 'The Familiar',
    level: 1,
    effect: `A familiar materializes and will aid you as with the spell find familiar until the end of your next long rest. You may name the familiar while it is present. If you do, whenever this card comes up again, the same familiar will return to aid you. To determine which familiar appears, roll a 1d8:

1: Owl | 2: Cat
3: Octopus | 4: Crab
5: Imp | 6: Pseudodragon
7: Gazer | 8: Almarij`,
    readings: [
      {
        header: 'ASSISTANCE',
        content:
          'There is someone important\n' +
          'in your life who is with you every\n' +
          'step of the way. It could be a\n' +
          'person, a pet, or even yourself.\n' +
          'Appreciating this individual\n' +
          'is essential in your journey',
      },
      {
        header: 'ALTER EGO',
        content:
          'Your magical Familiar is your\n' +
          'trusted assistant, and it also\n' +
          'takes the shape of what you see\n' +
          'yourself as or who you secretly\n' +
          'want to be. How can you use your\n' +
          'alter ego to achieve your goals?',
      },
    ],
  },
  {
    id: 19,
    equipped: false,
    level: 1,
    name: 'The Beast',
    effect: `You gain the feature Spider Climb. You gain the ability to move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free. You also gain a climbing speed equal to your walking speed. This effect lasts for four hours.`,
    readings: [
      {
        header: 'SOLIDARITY',
        content:
          'The pack is strongest when it is\n' +
          'united. Whatever your fight is,\n' +
          'seek harmony with yourself or\n' +
          'others and use teamwork in order\n' +
          'to prevail against all odds.',
      },
      {
        header: 'SOLITARY',
        content:
          'A lone wolf may be stronger and\n' +
          'more intelligent, but without the\n' +
          'help of a pack she will never be able\n' +
          'to take down a serious adversary.\n' +
          'You can retain your independence,\n' +
          'but remember that you can turn\n' +
          'to others for help, especially if\n' +
          'the alliance is beneficial for all.',
      },
    ],
  },
  {
    id: 19,
    equipped: true,
    level: 2,
    name: 'II of Beasts',
    effect: `Twisting Talons

Your fingers transform into wickedly sharp three-inch talons. These talons count as simple weapons that you are in proficent in. Your talons have the following statistics:

Oracle Talons. Melee Weapon Attack: reach 5ft., one target. Hit 2d6 +Strength modifier slashing damage. The target must make a Consitution saving throw or suffer an additional 2d6 slashing damage as the claws rend their flesh.

If this card is drawn by a 8th or higher level wild oracle, the talons instead deal magical slashing damage. The Talons will stay for eight hours.`,
  },
  {
    id: 19,
    equipped: false,
    level: 3,
    name: 'III of Beasts',
    effect: `Friend of Elephants

You summon an elephant to fight by your side for the next hour. The elephant appears in an unoccupied space within 30 feet of you. The elephant comes equipped with a saddle to allow you to ride it, and it obeys your every verbal command. If you choose to name your elephant while you are controlling it, the same elephant will return when you draw the card again. If the elephant reaches 0 hitpoints or at the end of an hour, it disappears into a gray mist.`,
  },
  {
    id: 19,
    equipped: false,
    level: 4,
    name: 'IV of Beasts',
    effect: `Before the end of the turn, you grant the feature Pack Tactics to six creatures within 60 feet of you for the next minute. Creatures with the feature gain advantage on attack rolls against a creature as long as at least one of their allies is within 5 feet of the creature, and the ally is not incapacitated.`,
  },
  {
    id: 20,
    equipped: false,
    level: 3,
    name: 'The Dragon',
    effect: `Wing Attack

Gigantic 20 foot phantasmal dragon wings sprout from your shoulders. As an action, you may beat your wings creating tremendous wind forces. Each creature within 10 feet of you must make a Dexterity saving throw or take 2d6 bludgeoning damage and be knocked prone. As part of this action, you may immediately fly up to half of your speed. The wings last one minute.`,
    readings: [
      {
        header: 'ABUNDANCE',
        content:
          'The Dragon symbolizes fertility\n' +
          'and abundance. Take stock of the\n' +
          'bounty that surrounds you and\n' +
          'be grateful for what you have, for\n' +
          'genuine appreciation will bring\n' +
          'more good things into your life.',
      },
      {
        header: 'STARVATION',
        content:
          'The Dragon compulsively hoards\n' +
          'treasures, although she has no real\n' +
          'use for her collection. If you are\n' +
          'unwilling to share what you have,\n' +
          'be it love, attention, or wealth, it\n' +
          'will ultimately lead to unhappiness\n' +
          'or even devastating loss.',
      },
    ],
  },
  {
    id: 20,
    equipped: false,
    level: 4,
    name: 'II of Dragons',
    effect: `You immediately use Fire Breath, exhaling superheated gas in a 90-foot cone. Each creature in that area must make a Dexterity saving throw, taking 10d6 fire damage on a failed save, or half as much damage on a successful one.`,
  },
  {
    id: 20,
    equipped: false,
    level: 5,
    name: 'III of Dragons',
    effect: `Sleep Breath

You must immediately exhale sleep gas in a 60-foot cone in a direction you choose. Each creature in the area must succeed on a Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.`,
  },
  {
    id: 20,
    equipped: false,
    level: 6,
    name: 'IV of Dragons',
    effect: `Soul of The Five-Headed Dragon

You summon the presence of a frightful dragon who grants you the ability to use one of its five heads to make an immediate attack:

Black Dragon: You breathe acid in a 120-foot line that is 10 feet wide. Each creature in that line must make a Dexterity saving throw, taking 10d8 acid damage or half as much on a successful one.

Blue Dragon: You breathe lightning in a 120-foot line that is 10 feet wide. Each creature in that line must make a Dexterity saving throw, taking 10d8 lightning damage or half as much on a successful one.

Green Dragon: You breathe poisonous gas in a 90-foot cone. Each creature in that area must make a Constitution saving throw, taking 8d6poison damage or half as much on a successful one.

Red Dragon: You breathe fire in a 90-foot cone. Each creature in that area must make a Dexterity saving throw, taking 10d6 fire damage or half as much on a successful one.

White Dragon: You breathe an icy blast in a 90-foot cone. Each creature in that area must make a Dexterity saving throw, taking 8d8cold damage or half as much on a successful one.`,
  },
  {
    id: 21,
    equipped: true,
    name: 'The Undead',
    level: 1,
    effect: `You are instilled with the unquenchable stamina of a zombie and gain the Undying feature for 1 hour. While this effect is active, if damage reduces you to Ohit points, you do not fall unconscious, instead you may continue fighting until the end of your next turn. If you are not healed by the end of your next turn, you fall unconscious and lose the Undying feature.`,
    readings: [
      {
        header: 'REBIRTH',
        content:
          'Death is inevitable. Embrace the\n' +
          'change you are afraid of, and take\n' +
          'the chance to start anew. You never\n' +
          'know what new opportunities\n' +
          'and adventures await you.',
      },
      {
        header: 'PURGE',
        content:
          'Start over by releasing the control\n' +
          'that your past has over you. You\n' +
          'may be hesitant to let go of your\n' +
          'past traumas because you believe\n' +
          'they define you, but you are not\n' +
          'your trauma and you are not\n' +
          'your ego. Find out who you truly\n' +
          'are in this present moment.',
      },
    ],
  },
  {
    id: 21,
    equipped: false,
    name: 'II of Undead',
    level: 3,
    effect: `As a bonus action, you may cast the death ward spell twice in the next one minute.`,
  },
  {
    id: 21,
    equipped: true,
    level: 4,
    name: 'III of Undead',
    effect: `For the next one minute, you have resistance to magical and non-magical bludgeoning, slashing, and piercing attacks. However, you also gain vulnerability to radiant damage.`,
  },
  {
    id: 21,
    equipped: false,
    level: 6,
    name: 'IV of Undead',
    effect: `Frightful Presence

A terrifying totem of a powerful dracolich surrounds your body. Each creature you choose that is within 30 feet and aware of you, must make a Wisdom saving throw or become frightened for one minute. Any creature frightened in this way takes 3d8 psychic damage at the beginning of each of their turns. A creature can repeat the saving throw at the end of each of its turns, ending the effect on a success.`,
  },
  {
    id: 22,
    equipped: false,
    name: 'The Ooze',
    level: 3,
    effect: `Oozing Terrain

Before the end of your turn, choose a point that you can see within 120 feet. The ground within a 30-foot radius from that point takes on the properties of an ooze. Creatures sink into the terrain like it is quicksand. They must make a Strength saving throw at the start of their turn or have their movement reduced to 0 and take 2d6 acid damage as their feet sink into the terrain. If a creature has failed two of these saving throws in a row, they become engulfed, and take 3d6 acid damage at the end of teach of their turns. An engulfed creature can attempt to escape by succeeding on a Strength saving throw.`,
    readings: [
      {
        header: 'NURTURE',
        content:
          'Like water, the Ooze changes shape\n' +
          'to fit any situation. Embrace your\n' +
          'intuition and empathy, and let\n' +
          'your emotions guide you. Don’t\n' +
          'be afraid to feel and express your\n' +
          'feelings, because they are valid.',
      },
      {
        header: 'ENGULFMENT',
        content:
          'If you are too empathetic and\n' +
          'accommodating, you may feel\n' +
          'overwhelmed. Remember that you\n' +
          'should not take on everyone else’s\n' +
          'problems, and that you need to\n' +
          'care for yourself first and foremost.',
      },
    ],
  },
  {
    id: 22,
    equipped: false,
    name: 'II of Oozes',
    level: 4,
    effect: `Corrosive Blood

This card turns your blood to acid (but does not harm you). For the next one minute, any creature that hits you with an attack must make a Dexterity saving throw. If they fail, they take 4d6 acid damage, or half that on a successful save. Additionally, if they attack you with a non-magical melee metal weapon, and fail the save, the weapon is destroyed.`,
  },
  {
    id: 22,
    equipped: false,
    name: 'III of Oozes',
    level: 5,
    effect: `Paralyzing Goo

A toxic blast of black goo erupts from your hand. You may immediately turn this stream onto a creature within 60 feet.The black goo coalesces on the target; it must make a Constitution saving throw or be completely paralyzed for the next one minute. At the beginning of each of a trapped creature's turns they suffer 6d6 Acid damage, at the end of each of its turns, it may repeat the saving throw to escape the goo.`,
  },
  {
    id: 22,
    equipped: false,
    name: 'IV of Oozes',
    level: 6,
    effect: `Restorative Slime

Choosing a creature you can see within 60 feet, you project a column of gelatinous goo on to them. The goo is completely restorative, mending wounds, instantly salving burns, and revitalizing their fortitude. The creature regains 100 hit points, loses a level of exhaustion, and any active poisons are cured.`,
  },
  {
    id: 23,
    equipped: true,
    name: 'The Aberration',
    level: 1,
    effect: `You gain the Blinding Spittle feature.

A large glob of phlegm is lodged in your throat. You gain the ability tom as a bonus action, spit the glob at a point you can see within 15 feet. The glob explodes in a blinding flash of light on impact. Each creature within 5 feet of the flash must succeed on a Dexterity saving throw or be blinded until the end of your next turn.

If you do not spit the glob within one minute of gaining the feature, you are forced to swallow it inflicting 1d4 acid damage on yourself, and losing the ability to spit it.
  `,
    readings: [
      {
        header: 'RESISTANCE',
        content:
          'Something stands in the way\n' +
          'of your evolution. Be mindful of\n' +
          'what is holding you back; are you\n' +
          'clinging to old beliefs that no\n' +
          'longer ring true? Are you waiting\n' +
          'on someone else to change or\n' +
          'make a decision?',
      },
      {
        header: 'SURRENDER',
        content:
          'You might resist metamorphosis,\n' +
          'but change is inevitable. Embrace\n' +
          'your transformation and use this\n' +
          'newfound perspective to your\n' +
          'advantage in your endeavors.\n' +
          'friendship with those around you.',
      },
    ],
  },
  {
    id: 23,
    equipped: false,
    name: 'II of Aberrations',
    level: 2,
    effect: `Helper

You grow an extra arm. The arm creates a hole in any armor you are wearing, which disappears along with the arm at the end of the effect. This arm is controlled by a separate consciousness, but will follow your orders precisely. If you give it a melee weapon, as a bonus action, you can command it to attack using your Wisdom modifier in place of a Strength or Dexterity modifier. Alternatively, you may give the arm a shield and receive the bonuses of the shield, even if you are not proficient in shields. It is not possible for the arm to attune to an item you give it. This effect lasts for one hour.`,
  },
  {
    id: 23,
    equipped: true,
    level: 3,
    name: 'III of Aberrations',
    effect: `Eye Stalk

After you draw this card, an eye stalk emerges from an exposed area of your flesh. You may determine where this stalk appears. It extends one foot and gives you the ability to see 360 degrees with darkvision out to a range of 120 feet. The additional eyesight grants you +2 bonus to Armor Class, allows you to take the Dodge action as a bonus action on each of your turns, and makes you immune to the blind condition. The eye stalk sticks around until you use an action to dismiss it, or at the end of your next short or long rest.`,
  },
  {
    id: 23,
    equipped: false,
    level: 6,
    name: 'IV of Aberrations',
    effect: `Anti-Magic Cone

A 3rd eye emerges from your forehead, much larger than your two normal eyes. For the next one minute, you may project a 90-foot Anti-Magic cone from this eye at will. At the start of each of your turns, you decide if you want to keep the cone active or not. The direction you are facing at the end of your turn determines the direction of the cone. Within this cone,all magic is divorced from the magical energy of the multiverse. Magic items become mundane,summoned creatures disappear, and spells can't be cast.`,
  },
  {
    id: 24,
    equipped: true,
    name: 'The Plant',
    level: 1,
    effect: `Choose a point within 90 feet of you. Weeds and vines sprout from the 30-ft square of ground centered on that point, turning the area into difficult terrain. A creature in the area where the plants sprout must make a Strength saving throw or be Restrained by the plants. A creature Restrained by the plants can use its action to make a Strength check against your spell save DC. On a success, it frees itself. After a minute, the conjured plants wither away .`,
    readings: [
      {
        header: 'PRODUCTIVITY',
        content:
          'The Plant epitomizes slow and\n' +
          'steady growth. Hard work and\n' +
          'responsibility yield a beautiful\n' +
          'bounty if you put in the time and\n' +
          'commitment. Trust in yourself\n' +
          'that you are on the right path.',
      },
      {
        header: 'SNARE',
        content:
          'If you are feeling entangled\n' +
          'in your routine or too crowded\n' +
          'to grow properly, feel free\n' +
          'to break away and embrace\n' +
          'spontaneity. Send your shoots\n' +
          'out in search of new sources\n' +
          'of light and fertile soils.',
      },
    ],
  },
  {
    id: 24,
    equipped: false,
    name: 'II of Plants',
    level: 2,
    effect: `Spore Blight

Spore sacs erupt from along your arms. You have control over these sacs, and may use an action to release a spore cloud at a creature they can see within 120 feet. A targeted creature must make a Constitution saving throw. A target suffers 1d8 necrotic damage and 1d8 poison damage or half that much on a successful save. You may use this feature four times. After using spore blight four times, or eight hours pass, your arms return to normal. If the Wild Oracle draws this card has access to level 4 cards, the damage increases to 2d8 for each type; at level 6, the damage increases to 4d8`,
  },
  {
    id: 24,
    equipped: false,
    name: 'III of Plants',
    level: 4,
    effect: `Apple-Thing

You turn into an apple tree for one minute. While an apple tree you are 5-feet in diameter and 30 feet tall. If you are in a place that does not have enough room to grow to that height, you grow to the maximum available height. While you are an apple tree, you have 8 AC and 160 hitpoints and are vulnerable to fire damage. Additionally, your movement becomes 0 feet. If your hitpoints are reduced to 0, you revert back to your normal form. As an action on each of your turns, you may make a ranged spell attack to throw a poisoned apple at a creature within 30 feet. On a hit, the creature takes 1d4 bludgeoning damage, and must succeed on a Constitution saving throw or be poisoned. A creature poisoned in this way immediately takes 2d8 poison damage, and takes an additional 1d8 poison damage at the start of each of their turns. A target can repeat its saving throw at the end of each of its turns, ending the effect on itself on a success.`,
  },
  {
    id: 24,
    equipped: false,
    name: 'IV of Plants',
    level: 5,
    effect: `Your limbs and torso bulge, grow, and turn green as you are magically transformed into a Shambling Mound. While you are the Mound, your statistics are replaced by the statistics of the Plant. When you transform, you assume the Mound's hit points. While the effect is active, you may not cast spells or draw additional cards. This effect lasts one minute, and you cannot transform back into your normal form until the one minute has elapsed or you drop to 0 hit points. If you revert as a result of dropping to 0 hit points, any excess damage carries over to your normal form.`,
  },
  {
    id: 25,
    equipped: true,
    name: 'The Elemental',
    level: 1,
    effect: `You may immediately cast one of the following spells at your current card level as a free action:

* Burning Hands;
* Thunderwave; or
* Witch Bolt.`,
    readings: [
      {
        header: 'COMPLETION',
        content:
          'The four Elements come together\n' +
          'to celebrate the completion of\n' +
          'a major goal in your life. Reflect\n' +
          'positively upon what you have\n' +
          'achieved, and be open to whatever\n' +
          'exciting adventure comes next.',
      },
      {
        header: 'CLOSURE',
        content:
          'You are struggling to let go of the\n' +
          'past and move on. Channel the\n' +
          'power of the Elements for help:\n' +
          'Fire: Courage, Passion, Exercise.\n' +
          'Water: Empathy, Peace, Self-Care.\n' +
          'Air: Connection, Imagination, Meditation.\n' +
          'Earth: Strength, Logic, Sustenance.',
      },
    ],
  },
  {
    id: 25,
    equipped: true,
    level: 2,
    name: 'II of Elementals',
    effect: `You may immediately cast one of the following spells at your current card level as a free action:

* Flaming Sphere;
* Gust of Wind; or
* Melf's Acid Arrow.`,
  },
  {
    id: 25,
    equipped: false,
    level: 3,
    name: 'III of Elementals',
    effect: `Before the end of your turn, you may cast one of the following spells at your current card level as a free action:

* Sleet Storm;
* Fireball; or
* Lightning Bolt`,
  },
  {
    id: 25,
    equipped: false,
    level: 4,
    name: 'IV of Elementals',
    effect: `Before the end of your turn, you may cast one of the following spells at your current card level as a free action:

* Control Water;
* Fire Shield;
* Ice Storm; or
* Wall of Stone
`,
  },
  {
    id: 26,
    equipped: true,
    name: 'The Construct',
    level: 1,
    effect: `Constructed Shield.

An animated shield appears before you. The shield leaps in front of you and hovers in your space to protect you from incoming attacks, giving you a +2 bonus to AC. After one minute, the shield disappears.
  `,
    readings: [
      {
        header: 'DOMINATION',
        content:
          'Use your inner power and\n' +
          'courage to assert yourself. Define\n' +
          'your boundaries, needs, and goals\n' +
          'in order to achieve what you\n' +
          'deserve. Have faith in yourself\n' +
          'and all that you stand for.',
      },
      {
        header: 'SUBMISSION',
        content:
          'If you are gripping the controls\n' +
          'too tightly, your rigidity will cost\n' +
          'you your freedom. Learn to let\n' +
          'go, and let the automaton run its\n' +
          'course. Appreciate your journey\n' +
          'and the company of your\n' +
          'fellow travelers.',
      },
    ],
  },
  {
    id: 26,
    equipped: false,
    name: 'II of Constructs',
    level: 2,
    effect: `Marvelous Clockwork Animals

Gears form from the artwork on this card, unfold, and shape into three whirring automatons. The automatons come as an owl, a weasel, and a cat, and they share the statistics of their animal counterparts except the automatons have a size of Tiny. As an action you can pick up an automaton, wind its clockwork, and whisper a command into its mechanical ear. It will follow your directions as best as possible for one minute. After one minute, the magic of the automaton's clockwork expires, and the creature no longer functions. If you still have an unused automaton at the end of your next long rest, it disappears.`,
  },
  {
    id: 26,
    equipped: false,
    name: 'III of Constructs',
    level: 3,
    effect: `Carpet of Flying

As you draw this card, it transforms into a small carpet of flying. This carpet is 3 feet x 5 feet and can carry up to 200 pounds with a flying speed of 80 feet, or up to 400lb with a flying speed of 40 feet. The carpet moves according to your spoken directions provided you are within 30 feet of it. The carpet lasts for 10 minutes.`,
  },
  {
    id: 26,
    equipped: false,
    name: 'IV of Constructs',
    level: 6,
    effect: `Armor of Aveneg

Animated gray and bronze enchanted armor materializes out of thin air and encases your body with perfect-fitting invulnerable armor. If you are wearing armor, it disappears until the end of the effect. The armor has a duration of 4 hours. While this effect is active,you have resistance to fire, cold, electricity, and force damage,as well as bludgeoning, slashing, and piercing damage from non-magical sources.`,
  },
  {
    id: 27,
    equipped: false,
    name: 'The Fey',

    level: 2,
    effect: `Healing Sparks

For the next minute, at the start each of your turns you may point your finger and fire a pastel-colored bubble at a creature within 60 feet. The bubble drifts toward the creature and pops in an explosion of healing magic, restoring 1d4 + Wisdom modifier hitpoints.`,
    readings: [
      {
        header: 'TRANSFORMATION',
        content:
          'The seasons change, and so\n' +
          'will you. You are embarking on a\n' +
          'journey of personal growth, so shed\n' +
          'any negative beliefs or fears that\n' +
          'hold you back; allow yourself the\n' +
          'freedom to chase your dreams.',
      },
      {
        header: 'REFLECTION',
        content:
          'The Fey gazes at her starry\n' +
          'reflection in the pond. Take the\n' +
          'time to reconnect yourself and your\n' +
          'goals. If you feel stagnant, renew\n' +
          'your energy with a purification\n' +
          'ritual; take a bath, go skinny\n' +
          'dipping, or swim in a lake.',
      },
    ],
  },
  {
    id: 27,
    equipped: true,
    level: 3,
    name: 'II of Fey',
    effect: `Blink Dog Teleport

As an action, you may magically teleport, along with any equipment you are wearing or carrying, to an unoccupied space you can see within 40 feet. Before or after teleporting, as a bonus action, you may make an attack action.`,
  },
  {
    id: 27,
    equipped: false,
    level: 4,
    name: 'III of Fey',
    effect: `Fey Flight

Before the end of your turn, you may touch up to six willing creatures. Each target gains a flying speed of 60 feet for the next 10 minutes. When the spell ends, the target falls if it is still aloft.`,
  },
  {
    id: 27,
    equipped: false,
    level: 6,
    name: 'IV of Fey',
    effect: `Hag's Glare

You are compelled to immediately target a creature within 30 feet. The target creature must succeed on a Wisdom saving throw or become frightened. If the creature fails this saving throw and becomes frightened, they must succeed on another Wisdom saving throw or their hit points drop to 0.`,
  },
  {
    id: 28,
    equipped: true,
    name: 'The Celestial',
    level: 1,
    effect: `Divine Regeneration

For the next minute, at the start of each of your turns, you regain a number of hit points equal to your Wisdom modifier. If you drop below 0 hit points or are incapacitated, this effect ends.`,
    readings: [
      {
        header: 'RADIANCE',
        content:
          'The Celestial represents success\n' +
          'and power, which radiate from\n' +
          'you and draw others to your warm\n' +
          'presence. Be steadfast in who you\n' +
          'are and what you stand for, and\n' +
          'your allies will rally behind you.',
      },
      {
        header: 'SUPER EGO',
        content:
          'You feel guilt, shame, or like a\n' +
          'failure due to rigid rules or values\n' +
          'others have created for you. Spread\n' +
          'your wings and break free from the\n' +
          'shadowy clutches of your former\n' +
          'captors; you don’t have to be\n' +
          'the person they told you to be.',
      },
    ],
  },
  {
    id: 28,
    equipped: false,
    name: 'II of Celestials',
    level: 2,
    effect: `Once within the next 10 minutes, you may cast the calm emotions spell, affecting all creatures within a 30 ft sphere.`,
  },
  {
    id: 28,
    equipped: false,
    name: 'III of Celestials',
    level: 4,
    effect: `Aura of Impenetrability

All Aberrations, Fiends, and Undead within 30 feet of you must make a wisdom saving throw, or have their speed reduced to 0 feet for the next one minute. At the start of the turn, if an affected creature is not within 30 feet of you, their speed returns to normal. No outside effect can increase the speed of a creature affected by this ability.`,
  },
  {
    id: 28,
    equipped: false,
    name: 'IV of Celestials',
    level: 6,
    effect: `Exalt

All non hostile creatures within 120 feet of you are exalted and filled with celestial power until the end of your next turn. Exalted creatures can't be charmed or frightened, and gain advantage on attack rolls, ability checks, and saving throws until the end of your next turn. Additionally, all hostile creatures must succeed on a Wisdom saving throw or suffer 4d8 radiant damage.`,
  },
  {
    id: 29,
    equipped: false,
    level: 1,
    name: 'The Humanoid',
    effect: `Inspiring Leader

For the next 10 minutes, as a bonus action, you may inspire an ally within 30 feet of you. That ally gains advantage on their next attack roll.`,
    readings: [
      {
        header: 'PERCEPTION',
        content:
          'The Humanoid seeks knowledge,\n' +
          'and the truth, cutting through any\n' +
          'nonsense to get to the heart of the\n' +
          'matter. An unbiased and logical\n' +
          'approach garners respect. Others\n' +
          'may come to you for advice.',
      },
      {
        header: 'EGOISM',
        content:
          'Realize that anything you\n' +
          'experience is only seen through\n' +
          'the lens of your own past. It is not\n' +
          'possible to truly see things from\n' +
          'another’s perspective. Just have\n' +
          'compassion and hold space for\n' +
          'others without passing judgement.',
      },
    ],
  },
  {
    id: 29,
    equipped: false,
    level: 2,
    name: 'II of Humanoids',
    effect: `Commander's Strike

For the next 10 min, as a bonus action, you may rally an ally. That ally may immediately make one weapon attack.`,
  },
  {
    id: 29,
    equipped: false,
    level: 4,
    name: 'III of Humanoids',
    effect: `Butcher’s Wisdom

For the next minute, you reveal your opponents' weaknesses telepathically to your allies. All allies within 30 feet of you may add your proficiency modifier to their own weapon damage rolls. Additionally, you know the damage vulnerabilities and resistances of all creatures within 60 feet of you.`,
  },
  {
    id: 29,
    equipped: true,
    level: 5,
    name: 'IV of Humanoids',
    effect: `Weave of Protection

As you draw this card, a weave of arcane symbols creates a loose protective sphere around you and your companions. For the next minute, all allies within 15 feet of you gain advantage on saving throws against spells and other magical effects. Additionally, when an affected creature succeeds on a saving throw made against a spell or magical effect that allows it to take only half damage, it instead takes no damage if it succeeds on the saving throw.`,
  },
  {
    id: 30,
    equipped: false,
    level: 3,
    name: 'The Fiend',
    effect: `Gravitation

As a free action before the end of your turn, you can cause up to 12 creatures that you can see within 60 feet to immediately fly upward as if gravity has reversed. A creature can make a Dexterity saving throw to grab onto a fixed object it can reach, thus avoiding the effect. You can elevate the creatures up to 40 feet off the ground. You drop the targets to the ground automatically at the end of your next turn, at which time they each take falling damage.`,
    readings: [
      {
        header: 'DARKNESS',
        content:
          'If you think you have lost control\n' +
          'to addictions or negative thoughts,\n' +
          'acknowledge your dire situation\n' +
          'and shine your light on the Fiend.\n' +
          'She will loosen her grip on you. It\n' +
          'takes willpower and time to regain\n' +
          'your freedom, but it is possible.',
      },
      {
        header: 'ID',
        content:
          'The delicious fruit of instant\n' +
          'gratification is extremely appealing,\n' +
          'but at times it is prudent to keep\n' +
          'your priorities in check and refuse\n' +
          'temptations that might cause\n' +
          'you to stray from your path.',
      },
    ],
  },
  {
    id: 30,
    equipped: true,
    level: 4,
    name: 'II of Fiends',
    effect: `Best Fiends

One humanoid you can see within 30 feet must make a Wisdom saving throw or is magically charmed for the next 10 minutes. The charmed creature obeys your commands unless it involves self-harm or harming one of their allies. When the spell ends, the creature knows you charmed them.`,
  },
  {
    id: 30,
    equipped: false,
    level: 5,
    name: 'III of Fiends',
    effect: `Blood War Gaze

Your eyes glaze into two sparkling black spheres. As a bonus action, you may target one creature within 30 feet.If the target can see you, it must make a Wisdom saving throw, or be paralyzed until the beginning of your next turn. Ifa creature succeeds on a saving throw against the feature, it is immune to its effects for the next 24 hours. This feature lasts for one minute.`,
  },
  {
    id: 30,
    equipped: false,
    level: 6,
    name: 'IV of Fiends',
    effect: `Burning Vision

Your eyes glow bright red. As an action on each of your turns for the next minute, you may release a beam of fiery red energy from both eyes at a single target. Make a ranged spell attack. On a hit,the target suffers 5d10 fire damage and its clothing or fur, if any, ignites; until someone takes an action to douse the fire, the target takes 2d6 fire damage at the start of each of its turns.`,
  },
  {
    id: 31,
    equipped: false,
    level: 2,
    name: 'The Giant',
    effect: `You gain the strength of a Hill Giant.

Your strength becomes 21 (+5) for 1 hour.`,
    readings: [
      {
        header: 'CONSTITUTION',
        content:
          'Resilience is one of your greatest\n' +
          'strengths. However, that is not\n' +
          'to say that you are not sensitive\n' +
          'as well. Don’t neglect your own\n' +
          'wellbeing while you attempt\n' +
          'to uphold your goals or values.\n' +
          'Remember that you, too, can fall.',
      },
      {
        header: 'LETHARGY',
        content:
          'It’s good to take your time and\n' +
          'mull over decisions if you have that\n' +
          'luxury, but be careful not to take\n' +
          'too long to make up your mind, lest\n' +
          'smaller and faster creatures take\n' +
          'advantage of your sluggishness.',
      },
    ],
  },
  {
    id: 31,
    equipped: true,
    level: 3,
    name: 'II of Giants',
    effect: `
Chieftan's Frenzy

You immediately grow to double your current size. This newfound size bestows advantage on all Strength skill checks and saving throws, and adds one damage die on successful melee attacks. This effect lasts 10 minutes.`,
  },
  {
    id: 31,
    equipped: false,
    level: 3,
    name: 'III of Giants',
    effect: `Cloud Giant's Strength

Your strength becomes 27 (+9) for the next hour.`,
  },
  {
    id: 31,
    equipped: false,
    level: 6,
    name: 'IV of Giants',
    effect: `Lightning Strike

For the next 30 seconds, asan action, you can hurl a giant magical lightning bolt ata point you can see within 500 feet. Each creature within 10 feet of that point must make a Dexterity saving throw, taking 12d8 lightning damage on a failed save, or half as much damage on a successful one.`,
  },
  {
    id: 32,
    equipped: false,
    name: 'The Monstrosity',
    level: 1,
    effect: `Two-Headed

A second head grows out of your shoulders. The head is a perfect facsimile of your own, but the eyes rove independently. For the next four hours, the head is silent, but you automatically tap into its senses. You have advantage on Wisdom (Perception) checks, and on saving throws against being blinded, charmed, deafened, frightened, stunned, or knocked unconscious`,
    readings: [
      {
        header: 'TRANSFORMATION',
        content:
          'The Monstrosity signifies upheaval\n' +
          'and chaos, an event that threatens\n' +
          'to destroy your life as you know\n' +
          'it, unless you view her through\n' +
          'a different lens and accept the\n' +
          'change as an experience to\n' +
          'overcome and grow from.',
      },
      {
        header: 'PETRIFICATION',
        content:
          'You are currently undergoing a\n' +
          'personal transformation; however\n' +
          'something is holding you back, old\n' +
          'beliefs, fears, or opinions. Shed\n' +
          'whatever is not working for you so\n' +
          'that you can grow and evolve.',
      },
    ],
  },
  {
    id: 32,
    equipped: true,
    level: 3,
    name: 'II of Monstrosities',
    effect: `Grip of Horror

Tentacles erupt from your torso. As a bonus action, you may command these tentacles to restrain a Large or smaller creature within 10 feet of you. The creature must succeed on a Strength saving throw or recieve the restrain condition. On a restrained creature's turn, they may use an action to retry the saving throw. You must use a bonus action on your turn to maintain the restrained condition on a creature. At any time, you may use your reaction to release a restrained creature. The tentacles last for four hours.`,
  },
  {
    id: 32,
    equipped: false,
    level: 5,
    name: 'III of Monstrosities',
    effect: `Medusa's Petrifying Gaze

When a creature that can see your eyes starts its turn within 30 feet of you, you can force it to make a Constitution saving throw. If the saving throw fails by5 or more, the creature is instantly petrified; otherwise, a creature that fails the save begins to turn to stone and is restrained. The restrained creature must repeat the saving throw at the end of its next turn, becoming petrified on a failure,or ending the effect on a success. If the creature is immune to the stun condition, it is immune to this effect.For rules on targets averting their eyes, and seeing your own reflection in the mirror, see the main Medusa entry in the Monster Manual. This feature lasts until the end of your next turn.`,
  },
  {
    id: 32,
    equipped: false,
    level: 6,
    name: 'IV of Monstrosities',
    effect: `Chilling Gaze

For the next 30 seconds, you may use an action to target one creature within 30 feet of you, focusing your gaze on it. If the target can see you, it must succeed on a Constitution saving throw against this magic or take 6d6 cold damage, and then be paralyzed for 1 minute, unless it is immune to cold damage. The target can repeat the saving throw at the end of each of its turns, ending the effect on a success. If the target’s saving throw is successful, that creature is immune to this card's effect for 24 hours.`,
  },
  {
    id: 33,
    equipped: true,
    level: 2,
    name: 'The Wild Oracle',
    effect: `For the next one hour, as an action you may see the auras of creatures around you. Auras indicate a creature's general disposition towards you.

Blue: The creature views you favorably and is willing to aid you.

Green: The creature intends you no harm and is not attempting to deceive you.

Yellow: The creature is wary of your intentions, and may be hiding something from you.

Red: The creature intends you harm.

Flashing Colors: The creature is currently taking action to harm you, or your allies.`,
    readings: [
      {
        header: 'DESTINY',
        content:
          'Acknowledge that your destiny is\n' +
          'in the hands of the Universe, and\n' +
          'as much as you may try to control\n' +
          'your life, there is no way to change\n' +
          'it. Learn to be flexible and accept\n' +
          'what Fate has to offer you.',
      },
      {
        header: 'LUCK',
        content:
          'Belief in good luck provides\n' +
          'optimism and a better outlook\n' +
          'on life. Believing you are unlucky\n' +
          'leads to anxiety and hesitance to\n' +
          'take advantage of opportunity.\n' +
          'Why believe you have bad luck?',
      },
    ],
  },
  {
    id: 101,
    equipped: false,
    level: 100,
    name: 'The Designer',
    effect: '',
    readingsOnly: true,
    readingsId: 'BH',
    readings: [
      {
        header: 'COMPLIMENT',
        content:
          'Give genuine compliments\n' +
          'generously; they boost your own\n' +
          'self-confidence and reinforce the\n' +
          'self-esteem of your peers. Accept\n' +
          'compliments gracefully and charm\n' +
          'others with your positivity. ',
      },
      {
        header: 'CRITICISM',
        content:
          'We criticize others harshly for\n' +
          'the things we most loathe about\n' +
          'ourselves. If you find yourself\n' +
          'becoming aggravated by someone\n' +
          'else’s mistakes or actions, stop and\n' +
          'consider if you are projecting your\n' +
          'own shortcomings on your victim.',
      },
    ],
  },
  {
    id: 101,
    equipped: false,
    level: 100,
    name: 'The Developer',
    effect: '',
    readingsOnly: true,
    readingsId: 'TD',
    readings: [
      {
        header: 'ANALYSIS',
        content:
          'All the facts are right in\n' +
          'front of you, waiting for an ocular\n' +
          'inspection from your eyestalks.\n' +
          'Use the problem to build a castle\n' +
          'in your mind and use its halls\n' +
          'to find the best path to\n' +
          'solve the problem.',
      },
      {
        header: 'ESCAPISM',
        content:
          'It’s easy to lose track of the\n' +
          'outside world when you’re enjoying\n' +
          'personal time in your private lair.\n' +
          'Don’t forget to venture outside\n' +
          'once in a while and reconnect\n' +
          'with the rest of your party!',
      },
    ],
  },
  {
    id: 101,
    equipped: false,
    level: 100,
    name: 'The Dungeon Mistress',
    effect: '',
    readingsOnly: true,
    readingsId: 'SP',
    readings: [
      {
        header: 'CREATION',
        content:
          'The Dungeon Mistress is the\n' +
          'Creator of infinite worlds. Tap into\n' +
          'your creative powers and create\n' +
          'the ideal outcome to your story.',
      },
      {
        header: 'JUDGEMENT',
        content:
          'When you are in control of your\n' +
          'dominion, be careful not to be too\n' +
          'harsh to those who inhabit it. Use\n' +
          'compassion and understanding in\n' +
          'your judgement, for all humanoids\n' +
          'are prone to making mistakes.',
      },
    ],
  },
];

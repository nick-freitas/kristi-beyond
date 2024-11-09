import { Component, inject } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { CharacterService } from '../core/character.service';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [MessagesModule, CardModule],
  template: `
    <span class="text-3xl">Actions</span>
    <p-card header="Thaumaturgy" class="grow ">
      <div class="flex justify-between text-xl">
        <span>Casting Time: 1 action</span>
        <span>Range: 30 feet</span>
        <span>Components: V</span>
        <span>Duration: Up to 1 minute</span>
      </div>
      <div>
        <span>
          You manifest a minor wonder, a sign of supernatural power, within
          range. You create one of the following magical effects within range:
          Your voice booms up to three times as loud as normal for 1 minute. You
          cause flames to flicker, brighten, dim, or change color for 1 minute.
          You cause harmless tremors in the ground for 1 minute. You create an
          instantaneous sound that originates from a point of your choice within
          range, such as a rumble of thunder, the cry of a raven, or ominous
          whispers. You instantaneously cause an unlocked door or window to fly
          open or slam shut. You alter the appearance of your eyes for 1 minute.
          If you cast this spell multiple times, you can have up to three of its
          1-minute effects active at a time, and you can dismiss such an effect
          as an action.
        </span>
      </div>
    </p-card>
    <p-card header="Shocking Grasp" class="grow ">
      <div class="flex justify-between text-xl">
        <span>Casting Time: 1 action</span>
        <span>Range: Touch</span>
        <span>Target: A creature you try to touch</span>
        <span>Components: VS</span>
        <span>Duration: Instantaneous</span>
        <span>
          Hit: +{{
            characterService.character().abilityModifiers.Wisdom +
              characterService.character().proficiency
          }}
        </span>
        <span> Damage: 2d8 lightning </span>
      </div>
      <div>
        <span>
          Lightning springs from your hand to deliver a shock to a creature you
          try to touch. Make a melee spell attack against the target. You have
          advantage on the attack roll if the target is wearing armor made of
          metal. On a hit, the target takes 1d8 lightning damage, and it can’t
          take reactions until the start of its next turn.
        </span>
      </div>
    </p-card>
    <p-card header="Ray of Frost" class="grow ">
      <div class="flex justify-between text-xl">
        <span>Casting Time: 1 action</span>
        <span>Range: 60 feet</span>
        <span>Target: A creature within range</span>
        <span>Components: VS</span>
        <span>Duration: Instantaneous</span>
        <span>
          Hit: +{{
            characterService.character().abilityModifiers.Wisdom +
              characterService.character().proficiency
          }}
        </span>
        <span>Damage: 2d8 cold</span>
      </div>
      <div>
        <span>
          A frigid beam of blue-white light streaks toward a creature within
          range. Make a ranged spell attack against the target. On a hit, it
          takes 1d8 cold damage, and its speed is reduced by 10 feet until the
          start of your next turn.
        </span>
      </div>
    </p-card>
    <p-card header="Resistance" class="grow ">
      <div class="flex justify-between text-xl">
        <span>Casting Time: 1 action</span>
        <span>Range: Touch</span>
        <span>Target: One Willing Creature</span>
        <span>Components: VSM (A mini cloak)</span>
        <span>Duration: Up to 1 minute</span>
      </div>
      <div>
        <span>
          You touch one willing creature. Once before the spell ends, the target
          can roll a d4 and add the number rolled to one saving throw of its
          choice. It can roll the die before or after making the saving throw.
          The spell then ends.
        </span>
      </div>
    </p-card>
    <p-card header="Glaive (Melee Attack)" class="grow ">
      <div class="flex justify-between text-xl">
        <span>10ft Reach</span>
        <span>
          +{{
            characterService.character().abilityModifiers.Strength +
              characterService.character().proficiency
          }}
          to hit
        </span>
        <span>
          1d10 + {{ characterService.character().abilityModifiers.Strength }}
          Bludgeoning Dmg
        </span>
      </div>
    </p-card>
    <p-card header="Unarmed Strike (Melee Attack)" class="grow ">
      <div class="flex justify-between text-xl">
        <span>5ft Reach</span>
        <span>
          +{{
            characterService.character().abilityModifiers.Strength +
              characterService.character().proficiency
          }}
          to hit
        </span>
        <span>
          {{ 1 + characterService.character().abilityModifiers.Strength }}
          Bludgeoning Dmg
        </span>
      </div>
    </p-card>
    <p-card header="Draw Card" class="grow ">
      <div class="flex justify-between text-xl">
        <span>
          As an action, you may draw from the top of the deck and reveal a card.
          Use the Wild Oracle card list to determine the effect that activates
          from the card. The Wild Oracle table shows how many draw actions you
          can perform. You regain all of your draw actions when you finish a
          short or long rest.
        </span>
      </div>
    </p-card>

    <span class="text-3xl">Bonus Actions</span>
    <p-card header="Two-Weapon Fighting" class="grow ">
      <div class="flex justify-between text-xl">
        <span>
          When you take the Attack action and attack with a light melee weapon
          that you're holding in one hand, you can use a bonus action to attack
          with a different light melee weapon that you're holding in the other
          hand. You don't add your ability modifier to the damage of the bonus
          attack, unless that modifier is negative. If either weapon has the
          thrown property, you can throw the weapon, instead of making a melee
          attack with it.
        </span>
      </div>
    </p-card>

    <span class="text-3xl">Reactions</span>
    <p-card header="Fate of the Chosen" class="grow ">
      <div class="flex flex-col justify-between text-xl">
        <p>
          Starting at 6th level, you gain the power to reverse the tide of bad
          fortune. As a reaction, you may discard the top card from your deck,
          and reroll any attack roll, ability check, or saving throw you have
          just made. This feature may only be used once per roll, and you must
          take the results of your second roll. You may choose to use this
          feature after determining whether or not the roll was successful.
        </p>
        <p class="pt-4">
          You regain uses after completing a short or long rest. Performing this
          action does not use one of your draw actions.
        </p>
      </div>
    </p-card>
    <span class="text-3xl">Others</span>
  `,
  styles: `
    :host {
      @apply p-8 gap-8 grid;
    }
  `,
})
export class ActionsComponent {
  characterService: CharacterService = inject(CharacterService);
}

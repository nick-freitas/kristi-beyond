import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { Button } from 'primeng/button';
import { CharacterService } from '../core/character.service';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-abilities',
  standalone: true,
  imports: [CardModule, FieldsetModule, Button, MessagesModule],
  template: `
    <p-card header="Campaign Specifics">
      <div class="grid gap-8">
        <p-fieldset
          legend="Charm of Creeping Hand (Supernatural Gift/Charm)"
          [toggleable]="true"
        >
          <p>
            Once per turn, when you hit a creature with an attack roll using a
            weapon or an unarmed strike, you can infuse your strike with
            life-stealing energy. Your attack then deals an extra 1d10 necrotic
            damage, and you gain 5 temporary hit points. Once used five times,
            the charm vanishes.
          </p>

          <div class="pt-8">
            <p-button
              (click)="characterService.creepHand()"
              [disabled]="
                characterService.character().featureUsages.creepingHand >= 5
              "
            >
              {{ characterService.character().featureUsages.creepingHand }} / 5
            </p-button>
          </div>
        </p-fieldset>
        <p-fieldset legend="Vecna's Link" [toggleable]="true">
          <p>
            You gain a special intuition for secrets. You have advantage on
            insight checks. In addition an action to cast See Invisibility
            without expanding a spell slot and without components. You can do
            this once per long rest.
          </p>

          <p>
            You also acquire the ability to use the power of secrets. You are
            allowed to spend secrets to gain specific advantages depending on
            the secret. Once you use that secret, it is lost from everyone's
            mind.
          </p>

          <div class="pt-8">
            <p-button
              (click)="characterService.useVecnaLink()"
              [disabled]="
                characterService.character().featureUsages.vecnasLink >= 1
              "
            >
              {{ characterService.character().featureUsages.vecnasLink }} / 1
            </p-button>
          </div>
        </p-fieldset>
      </div>
    </p-card>
    <p-card header="Class Abilities">
      <div class="grid gap-8">
        <p-fieldset legend="Scrying (Level 2)" [toggleable]="true">
          <p>
            At 2nd level, you gain the ability to scry your wild tarot deck. If
            you spend at least 10 minutes studying your deck, you see glimpses
            of the future. You may reveal a number of cards from the top of the
            deck equal to your proficiency bonus. Then, in any order, place each
            revealed card on either the top or bottom of the deck.
          </p>
          <p class="pt-4">
            You may use this feature once. You regain the use of this feature at
            the end of a short or long rest.
          </p>

          <div class="pt-8">
            <p-button
              (click)="characterService.scry()"
              [disabled]="characterService.character().featureUsages.scry >= 1"
            >
              {{ characterService.character().featureUsages.scry }} / 1
            </p-button>
          </div>
        </p-fieldset>

        <p-fieldset legend="Fate's Hand (Level 3)" [toggleable]="true">
          <p class="pb-4 italic">Fate of the Chosen</p>

          <p>
            Also at 3rd level, you may place cards in your Fate's Hand. To
            create a Fate's Hand, after a long rest draw cards to your maximum
            hand size, and place them face up next to your deck. When taking the
            draw action, instead of drawing a card from your deck, you may
            instead play a card from your Fate's Hand, acting as if it were
            drawn from the top of your deck.
          </p>
          <p class="pt-4">
            Your maximum hand size is three cards. Your maximum hand size
            changes when you reach certain levels in this class. It becomes four
            cards at 10th level, and five cards at 15th level.
          </p>

          <div class="pt-8 font-bold">Max Hand Size: 4</div>
        </p-fieldset>
        <p-fieldset
          legend="Enhanced Card Selection (Level 3)"
          [toggleable]="true"
        >
          <p class="pb-4 italic">Fate of the Chosen</p>

          <p>
            When you commit to the Fate of the Chosen, starting at 3rd level and
            every wild oracle level gained thereafter, you may pick up to two
            cards to add to your deck, and/or remove up to two cards from your
            deck. This replaced the base rules of "Further Advancement" in the
            Wild Oracle class.
          </p>
        </p-fieldset>
        <p-fieldset legend="Convergent Return (Level 6)" [toggleable]="true">
          <p>
            At 6th level, you have begun to feel a flicker of connection with
            the Fates themselves. You control fate, and are able to return
            expended cards to your deck. As a bonus action, you may expend one
            or more uses of this feature. For each use expended, reshuffle one
            expended card back into your deck.
          </p>
          <p class="pt-4">
            You have one use of this feature at 3rd level, and gain a second use
            at 9th level and a third use at 13th level You regain all expended
            uses of this feature when you finish a short or long rest.
          </p>

          <div class="pt-8">
            <p-button
              (click)="characterService.convergentReturn()"
              [disabled]="
                characterService.character().featureUsages.convergentReturn >= 2
              "
            >
              {{ characterService.character().featureUsages.convergentReturn }}
              / 2
            </p-button>
          </div>
        </p-fieldset>

        <p-fieldset legend="Altered Outcome (Level 6)" [toggleable]="true">
          <p class="pb-4 italic">Fate of the Chosen</p>
          <p>
            Starting at 6th level, you gain the power to reverse the tide of bad
            fortune. As a reaction, you may discard the top card from your deck,
            and reroll any attack roll, ability check, or saving throw you have
            just made. This feature may only be used once per roll, and you must
            take the results of your second roll. You may choose to use this
            feature after determining whether or not the roll was successful.
          </p>
          <p class="pt-4">
            You regain uses after completing a short or long rest. Performing
            this action does not use one of your draw actions.
          </p>
        </p-fieldset>
        <p-fieldset legend="Shared Destiny (Level 10)" [toggleable]="true">
          <p class="pb-4 italic">Fate of the Chosen</p>
          <p>
            Starting at 10th level, as a part of the normal card draw action,
            you can allow one of your allies to use your deck's power. Choose a
            willing creature within 30 feet of you. That creature activates the
            effect of the card expended as if they had used it themselves.
          </p>
          <p class="pt-4">
            You may take this action twice. You regain uses after completing a
            short or long rest.
          </p>

          <div class="pt-8">
            <p-button
              (click)="characterService.shareDestiny()"
              [disabled]="
                characterService.character().featureUsages.sharedDestiny >= 2
              "
            >
              {{ characterService.character().featureUsages.sharedDestiny }}
              / 2
            </p-button>
          </div>
        </p-fieldset>
      </div>
    </p-card>
    <p-card header="Racial Abilities">
      <div class="grid gap-8">
        <p-fieldset legend="Touch of Death" [toggleable]="true">
          <p>
            Your touch is pain, harming whoever you come in contact with. The
            deathly power within you is beyond your control, afflicting any who
            touch your bare skin. By the same token, you can deliver death to
            your enemies with your touch.
          </p>
          <p class="pt-4">
            You're the harbinger of a grim prophecy. Any creature your touch
            damages is marked with a temporary scar of a group, fiend, deity, or
            other force that takes an interest in you.
          </p>
          <p class="pt-8">
            <b>Death Touch</b> You can focus your deadly touch against your
            foes. As an action, make one unarmed strike. On a hit, the target
            takes an additional 1d10 necrotic damage. This damage increases by
            1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th
            level (4d10). <b>Damage</b> 2d10
          </p>
          <p class="pt-4">
            <b>Inescapable Death</b> When you hit a target with an attack roll
            and deal necrotic damage, you ignore the target's resistance to that
            damage.
          </p>
          <p class="pt-4">
            <b>Withering Contact</b> When you start your turn grappling a
            creature or grappled by it, the creature takes 1d10 necrotic damage.
          </p>
        </p-fieldset>
        <p-fieldset legend="Faded Memories" [toggleable]="true">
          <p>
            Reborn suffer from some manner of discontinuity, an interruption of
            their lives or physical state that their minds are ill equipped to
            deal with. Their memories of events before this interruption are
            often vague or absent. Occasionally, the most unexpected experiences
            might cause sensations or visions of the past to come rushing back.
          </p>
          <p class="pt-4">
            Rather than sleeping, reborn regularly sit and dwell on the past,
            hoping for some revelation of what came before. Most of the time,
            these are dark, silent stretches. Occasionally, though, in a moment
            of peace, stress, or excitement, a reborn gains a glimpse of what
            came before. When you desire to have such a dreamlike vision, roll
            on the Lost Memories table to inspire its details.
          </p>
          <ol class="list-decimal pl-8 pt-8">
            <li>
              You recall a physically painful moment. What mark or scar on your
              body does it relate to?
            </li>
            <li>
              A memory brings tears to your eyes. Is it a bitter or cheerful
              memory? Does recalling it make you feel the same way?
            </li>
            <li>
              You recall a childhood memory. What about that event or who you
              were still influences you?
            </li>
            <li>
              A memory brings with it the voice of someone once close to you.
              How do they advise you?
            </li>
            <li>
              You recall enjoying something that you can’t stand doing now. What
              is it? Why don’t you like it now?
            </li>
            <li>
              A memory carries a vivid smell or sensation. What are you going to
              do to recreate that experience?
            </li>
          </ol>
        </p-fieldset>
        <p-fieldset legend="Deathless Nature" [toggleable]="true">
          <p>
            You have escaped death, a fact represented by the following
            benefits:
          </p>
          <ul class="list-disc pl-8">
            <li>
              You have advantage on saving throws against disease and being
              poisoned, and you have resistance to poison damage.
            </li>
            <li>You have advantage on death saving throws.</li>
            <li>You don’t need to eat, drink, or breathe.</li>
            <li>You don’t need to sleep, and magic can’t put you to sleep.</li>
            <li>
              You can finish a long rest in 4 hours if you spend those hours in
              an inactive, motionless state, during which you retain
              consciousness.
            </li>
          </ul>
        </p-fieldset>
        <p-fieldset legend="Knowledge from a Past Life" [toggleable]="true">
          <p>
            You temporarily remember glimpses of the past, perhaps faded
            memories from ages ago or a previous life. When you make an ability
            check that uses a skill, you can roll a d6 immediately after seeing
            the number on the d20 and add the number on the d6 to the check.
          </p>
          <p class="pt-4">
            You can use this feature a number of times equal to your proficiency
            bonus, and you regain all expended uses when you finish a long rest.
          </p>

          <div class="pt-8">
            <p-button
              (click)="characterService.pastKnowledge()"
              [disabled]="
                characterService.character().featureUsages.pastKnowledge >=
                characterService.character().proficiency
              "
            >
              {{ characterService.character().featureUsages.pastKnowledge }}
              / {{ characterService.character().proficiency }}
            </p-button>
          </div>
        </p-fieldset>
      </div>
    </p-card>
    <p-card header="Background Abilities">
      <div class="grid gap-8">
        <p-fieldset legend="Discover" [toggleable]="true">
          <p>
            The quiet seclusion of your extended hermitage gave you access to a
            unique and powerful discovery. The exact nature of this revelation
            depends on the nature of your seclusion. It might be a great truth
            about the cosmos, the deities, the powerful beings of the outer
            planes, or the forces of nature. It could be a site that no one else
            has ever seen. You might have uncovered a fact that has long been
            forgotten, or unearthed some relic of the past that could rewrite
            history. It might be information that would be damaging to the
            people who or consigned you to exile, and hence the reason for your
            return to society.
          </p>
          <p class="pt-4">
            Work with your DM to determine the details of your discovery and its
            impact on the campaign.
          </p>
        </p-fieldset>
      </div>
    </p-card>
    <p-card header="Features">
      <div class="grid gap-8">
        <p-fieldset legend="Telepathic (Level 1)" [toggleable]="true">
          <p class="pb-4 italic">Source: Tasha's Cauldron of Everything</p>
          <p>
            You awaken the ability to mentally connect with others, granting you
            the following benefits:
          </p>
          <ul class="list-disc pl-8">
            <li>
              Increase your Intelligence, Wisdom, or Charisma score by 1, to a
              maximum of 20.
            </li>
            <li>
              You can speak telepathically to any creature you can see within 60
              feet of you. Your telepathic utterances are in a language you
              know, and the creature understands you only if it knows that
              language. Your communication doesn't give the creature the ability
              to respond to you telepathically.
            </li>
            <li>
              You can cast the Detect Thoughts spell, requiring no spell slot or
              components, and you must finish a long rest before you can cast it
              this way again. Your spellcasting ability for the spell is the
              ability increased by this feat. If you have spell slots of 2nd
              level or higher, you can cast this spell with them.
            </li>
          </ul>
          <div class="pt-8">
            <p-button
              (click)="characterService.telepathicDetectThoughts()"
              [disabled]="
                characterService.character().featureUsages
                  .telepathicDetectThoughts >= 1
              "
            >
              {{
                characterService.character().featureUsages
                  .telepathicDetectThoughts
              }}
              / 1
            </p-button>
          </div>
        </p-fieldset>
        <p-fieldset legend="ASI (Level 4)" [toggleable]="true">
          <p>+1 Wisdom / +1 Dexterity</p>
        </p-fieldset>
        <p-fieldset legend="ASI (Level 8)" [toggleable]="true">
          <p>+1 Wisdom / +1 Charisma</p>
        </p-fieldset>
        <p-fieldset legend="ASI (Level 12)" [toggleable]="true">
          <p>+1 Wisdom / +1 Strength</p>
        </p-fieldset>
      </div>
    </p-card>
  `,
  styles: `
    :host {
      @apply p-8 gap-8 grid;
    }
  `,
})
export class AbilitiesPage {
  characterService: CharacterService = inject(CharacterService);
}

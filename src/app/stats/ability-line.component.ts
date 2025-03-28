import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CharacterService } from '../core/character.service';

@Component({
  selector: 'app-ability-line',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Strength" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().abilityModifiers.Strength }}
        </span>
        <span>
          ({{ characterService.character().abilityScores.Strength }})
        </span>
        @if (characterService.character().abilityAdvantages.Strength) {
          <span class="text-red-400 flex content-center text-2xl mt-8">
            Adv
          </span>
        }
      </div>
    </p-card>
    <p-card header="Constitution" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().abilityModifiers.Constitution }}
        </span>
        <span>
          ({{ characterService.character().abilityScores.Constitution }})
        </span>
        @if (characterService.character().abilityAdvantages.Constitution) {
          <span class="text-sm"> Adv </span>
        }
      </div>
    </p-card>
    <p-card header="Dexterity" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().abilityModifiers.Dexterity }}
        </span>
        <span>
          ({{ characterService.character().abilityScores.Dexterity }})
        </span>
        @if (characterService.character().abilityAdvantages.Dexterity) {
          <span class="text-sm"> Adv </span>
        }
      </div>
    </p-card>
    <p-card header="Intelligence" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().abilityModifiers.Intelligence }}
        </span>
        <span>
          ({{ characterService.character().abilityScores.Intelligence }})
        </span>
        @if (characterService.character().abilityAdvantages.Intelligence) {
          <span class="text-sm"> Adv </span>
        }
      </div>
    </p-card>
    <p-card header="Wisdom" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().abilityModifiers.Wisdom }}
        </span>
        <span> ({{ characterService.character().abilityScores.Wisdom }}) </span>
        @if (characterService.character().abilityAdvantages.Wisdom) {
          <span class="text-sm"> Adv </span>
        }
      </div>
    </p-card>
    <p-card header="Charisma" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().abilityModifiers.Charisma }}
        </span>
        <span>
          ({{ characterService.character().abilityScores.Charisma }})
        </span>
        @if (characterService.character().abilityAdvantages.Charisma) {
          <span class="text-sm"> Adv </span>
        }
      </div>
    </p-card>
  `,
  styles: `
    :host {
      @apply grid gap-8 lg:grid-cols-6 md:grid-cols-3;
    }
  `,
})
export class AbilityLineComponent {
  characterService: CharacterService = inject(CharacterService);
}

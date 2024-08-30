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
          {{ characterService.character().abilityModifiers.str }}
        </span>
        <span> ({{ characterService.character().abilityScores.str }}) </span>
      </div>
    </p-card>
    <p-card header="Constitution" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().abilityModifiers.con }}
        </span>
        <span> ({{ characterService.character().abilityScores.con }}) </span>
      </div>
    </p-card>
    <p-card header="Dexterity" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().abilityModifiers.dex }}
        </span>
        <span> ({{ characterService.character().abilityScores.dex }}) </span>
      </div>
    </p-card>
    <p-card header="Intelligence" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().abilityModifiers.int }}
        </span>
        <span> ({{ characterService.character().abilityScores.int }}) </span>
      </div>
    </p-card>
    <p-card header="Wisdom" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().abilityModifiers.wis }}
        </span>
        <span> ({{ characterService.character().abilityScores.wis }}) </span>
      </div>
    </p-card>
    <p-card header="Charisma" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().abilityModifiers.cha }}
        </span>
        <span> ({{ characterService.character().abilityScores.cha }}) </span>
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

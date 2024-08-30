import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CharacterService } from '../core/character.service';

@Component({
  selector: 'app-proficiencies',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Weapons" class="grow">
      <div class="flex flex-col">
        @for (
          weapon of characterService.character().weaponProficiencies;
          track weapon
        ) {
          <span> {{ weapon }} </span>
        }
      </div>
    </p-card>
    <p-card header="Armour" class="grow">
      <div class="flex flex-col">
        @for (
          armour of characterService.character().armourProficiencies;
          track armour
        ) {
          <span> {{ armour }} </span>
        }
      </div>
    </p-card>
    <p-card header="Tools/Others" class="grow">
      <div class="flex flex-col">
        @for (tool of characterService.character().tools; track tool) {
          <span> {{ tool }} </span>
        }
      </div>
    </p-card>
    <p-card header="Languages" class="grow">
      <div class="flex flex-col">
        @for (lang of characterService.character().languages; track lang) {
          <span> {{ lang }} </span>
        }
      </div>
    </p-card>
  `,
  styles: `
    :host {
      @apply grid gap-8 md:grid-cols-4;
    }
  `,
})
export class ProficienciesComponent {
  characterService: CharacterService = inject(CharacterService);
}

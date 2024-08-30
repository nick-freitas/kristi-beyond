import { Component, inject } from '@angular/core';
import { CharacterService } from '../core/character.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-passive-line',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Passive Perception" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().passives.perception }}
        </span>
      </div>
    </p-card>
    <p-card header="Passive Investigation" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().passives.investigation }}
        </span>
      </div>
    </p-card>
    <p-card header="Passive Insight" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().passives.insight }}
        </span>
      </div>
    </p-card>
  `,
  styles: `
    :host {
      @apply grid gap-8 md:grid-cols-3;
    }
  `,
})
export class PassiveLineComponent {
  characterService: CharacterService = inject(CharacterService);
}

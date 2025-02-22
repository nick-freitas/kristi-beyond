import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CharacterService } from '../core/character.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-spell-stats-line',
  standalone: true,
  imports: [CardModule, RatingModule, FormsModule],
  template: `
    <p-card header="Spell Stats" class="grow">
      <div class="flex flex-col gap-3 text-2xl">
        <span>
          Spell Save DC: {{ characterService.character().spellSaveDC }}
        </span>
        <span>
          Spell Attack Modifier:
          {{ characterService.character().spellAttackModifier }}
        </span>
      </div>
    </p-card>

    <p-card header="Rage" class="lg:max-w-[14rem]">
      <div class="flex justify-center items-center">
        <p-rating
          [ngModel]="characterService.character().rage"
          (ngModelChange)="characterService.toggleRage()"
          [cancel]="false"
          [stars]="1"
        >
          <ng-template pTemplate="onicon">
            <i class="pi pi-circle-on" style="font-size: 10rem"></i>
            <span class="text-red-400 flex content-center text-2xl mt-8">
              RAGING
            </span>
          </ng-template>
          <ng-template pTemplate="officon">
            <i class="pi pi-circle-off" style="font-size: 10rem"></i>
          </ng-template>
        </p-rating>
      </div>
    </p-card>
  `,
  styles: `
    :host {
      @apply md:flex grid gap-8 md:flex grid-cols-1;
    }
  `,
})
export class SpellStatsComponent {
  characterService: CharacterService = inject(CharacterService);
}

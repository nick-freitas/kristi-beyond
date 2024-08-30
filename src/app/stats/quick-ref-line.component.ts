import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CharacterService } from '../core/character.service';

@Component({
  selector: 'app-quick-ref-line',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Armour Class" class="">
      <div class="flex flex-row gap-3 text-3xl justify-center">
        <span> {{ characterService.character().ac }} </span>
      </div>
    </p-card>
    <p-card header="Speed" class="">
      <div class="flex flex-col gap-3 text-3xl justify-center items-center">
        <span> Land: {{ characterService.character().speeds.land }} </span>
        <div class="text-xl items-end flex">
          @if (characterService.character().speeds.fly) {
            <span> Fly: {{ characterService.character().speeds.fly }} </span>
            |
          }
          @if (characterService.character().speeds.burrow) {
            <span>
              Burrow: {{ characterService.character().speeds.burrow }}
            </span>
            |
          }
          @if (characterService.character().speeds.swim) {
            <span> Swim: {{ characterService.character().speeds.swim }} </span>
            &nbsp;&nbsp;|&nbsp;&nbsp;
          }
          @if (characterService.character().speeds.climb) {
            <span>
              Climb: {{ characterService.character().speeds.climb }}
            </span>
          }
        </div>
      </div>
    </p-card>
    <p-card header="Proficiency" class="">
      <div class="flex flex-row gap-3 text-3xl justify-center">
        <span> +{{ characterService.character().proficiency }} </span>
      </div>
    </p-card>
    <p-card header="Initiative" class="">
      <div class="flex flex-row gap-3 text-3xl justify-center">
        <span> +{{ characterService.character().initiative }} </span>
      </div>
    </p-card>
  `,
  styles: `
    :host {
      @apply grid gap-8 lg:grid-cols-4 md:grid-cols-2;
    }
  `,
})
export class QuickRefLineComponent {
  characterService: CharacterService = inject(CharacterService);
}

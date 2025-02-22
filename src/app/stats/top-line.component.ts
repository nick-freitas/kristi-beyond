import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CharacterService } from '../core/character.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-line',
  standalone: true,
  imports: [CardModule, RatingModule, FormsModule],
  template: `
    <p-card [header]="characterService.character().name" class="grow">
      <div class="flex flex-col gap-3 text-2xl">
        <span> Race: {{ characterService.character().race }} </span>
        <span> Background: {{ characterService.character().background }} </span>
        <span>
          Character Level: {{ characterService.character().totalLevel }}
        </span>
      </div>
    </p-card>
    <p-card header="Classes" class="grow">
      @for (c of characterService.character().classes; track c) {
        <div class="flex flex-col gap-3 text-2xl">
          <span> Class: {{ c.class }} </span>
          <span> Subclass: {{ c.subclass }} </span>
          <span> Class Level: {{ c.level }} </span>
        </div>
      }
    </p-card>
    <p-card header="Inspiration" class="lg:max-w-[14rem]">
      <div class="flex justify-center items-center">
        <p-rating
          [ngModel]="characterService.character().inspiration"
          (ngModelChange)="characterService.toggleInspiration()"
          [cancel]="false"
          [stars]="1"
        >
          <ng-template pTemplate="onicon">
            <i class="pi pi-star-fill" style="font-size: 10rem"></i>
          </ng-template>
          <ng-template pTemplate="officon">
            <i class="pi pi-star" style="font-size: 10rem"></i>
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
export class TopLineComponent {
  characterService: CharacterService = inject(CharacterService);
}

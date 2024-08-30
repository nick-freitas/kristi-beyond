import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CharacterService } from '../core/character.service';

@Component({
  selector: 'app-save-line',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Str Save" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().saveModifiers.str }}
        </span>
        @if (characterService.character().saveProficiencies.str) {
          <span class="text-sm"> Prof </span>
        } @else {
          <span class="text-sm"> &nbsp;</span>
        }
      </div>
    </p-card>
    <p-card header="Con Save" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().saveModifiers.con }}
        </span>
        @if (characterService.character().saveProficiencies.con) {
          <span class="text-sm"> Prof </span>
        } @else {
          <span class="text-sm"> &nbsp;</span>
        }
      </div>
    </p-card>
    <p-card header="Dex Save" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().saveModifiers.dex }}
        </span>
        @if (characterService.character().saveProficiencies.dex) {
          <span class="text-sm"> Prof </span>
        } @else {
          <span class="text-sm"> &nbsp;</span>
        }
      </div>
    </p-card>
    <p-card header="Int Save" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().saveModifiers.int }}
        </span>
        @if (characterService.character().saveProficiencies.int) {
          <span class="text-sm"> Prof </span>
        } @else {
          <span class="text-sm"> &nbsp;</span>
        }
      </div>
    </p-card>
    <p-card header="Wis Save" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().saveModifiers.wis }}
        </span>
        @if (characterService.character().saveProficiencies.wis) {
          <span class="text-sm"> Prof </span>
        } @else {
          <span class="text-sm"> &nbsp;</span>
        }
      </div>
    </p-card>
    <p-card header="Cha Save" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().saveModifiers.cha }}
        </span>
        @if (characterService.character().saveProficiencies.cha) {
          <span class="text-sm"> Prof </span>
        } @else {
          <span class="text-sm"> &nbsp;</span>
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
export class SaveLineComponent {
  characterService: CharacterService = inject(CharacterService);
}

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
          {{ characterService.character().saveModifiers.Strength }}
        </span>
        @if (characterService.character().saveProficiencies.Strength) {
          <span class="text-sm"> Prof </span>
        }

        @if (characterService.character().saveAdvantages.Strength) {
          <span class="text-red-400 flex content-center text-2xl mt-8">
            Adv
          </span>
        }
      </div>
    </p-card>
    <p-card header="Con Save" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().saveModifiers.Constitution }}
        </span>
        @if (characterService.character().saveProficiencies.Constitution) {
          <span class="text-sm"> Prof </span>
        }

        @if (characterService.character().saveAdvantages.Constitution) {
          <span class="text-sm"> Adv </span>
        }
      </div>
    </p-card>
    <p-card header="Dex Save" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().saveModifiers.Dexterity }}
        </span>
        @if (characterService.character().saveProficiencies.Dexterity) {
          <span class="text-sm"> Prof </span>
        }

        @if (characterService.character().saveAdvantages.Dexterity) {
          <span class="text-sm"> Adv </span>
        }
      </div>
    </p-card>
    <p-card header="Int Save" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().saveModifiers.Intelligence }}
        </span>
        @if (characterService.character().saveProficiencies.Intelligence) {
          <span class="text-sm"> Prof </span>
        }

        @if (characterService.character().saveAdvantages.Intelligence) {
          <span class="text-sm"> Adv </span>
        }
      </div>
    </p-card>
    <p-card header="Wis Save" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().saveModifiers.Wisdom }}
        </span>
        @if (characterService.character().saveProficiencies.Wisdom) {
          <span class="text-sm"> Prof </span>
        }

        @if (characterService.character().saveAdvantages.Wisdom) {
          <span class="text-sm"> Adv </span>
        }
      </div>
    </p-card>
    <p-card header="Cha Save" class="grow">
      <div class="flex flex-col gap-3 text-3xl items-center">
        <span>
          {{ characterService.character().saveModifiers.Charisma }}
        </span>
        @if (characterService.character().saveProficiencies.Charisma) {
          <span class="text-sm"> Prof </span>
        }

        @if (characterService.character().saveAdvantages.Charisma) {
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
export class SaveLineComponent {
  characterService: CharacterService = inject(CharacterService);
}

import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CharacterService } from '../core/character.service';

@Component({
  selector: 'app-conditions-line',
  standalone: true,
  imports: [Button, CardModule],
  template: `
    <p-card header="Conditions" class="flex w-full">
      <div class="flex justify-around h-full w-full pb-8">
        <div class="grid 2xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 grow">
          <p-button
            label="Blinded"
            [outlined]="true"
            (click)="characterService.toggleCondition('blinded')"
            [severity]="
              characterService.character().conditions.blinded
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Charmed"
            [outlined]="true"
            (click)="characterService.toggleCondition('charmed')"
            [severity]="
              characterService.character().conditions.charmed
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Deafened"
            [outlined]="true"
            (click)="characterService.toggleCondition('deafened')"
            [severity]="
              characterService.character().conditions.deafened
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Frightened"
            [outlined]="true"
            (click)="characterService.toggleCondition('frightened')"
            [severity]="
              characterService.character().conditions.frightened
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Grappled"
            [outlined]="true"
            (click)="characterService.toggleCondition('grappled')"
            [severity]="
              characterService.character().conditions.grappled
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Incapacitated"
            [outlined]="true"
            (click)="characterService.toggleCondition('incapacitated')"
            [severity]="
              characterService.character().conditions.incapacitated
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Invisible"
            [outlined]="true"
            (click)="characterService.toggleCondition('invisible')"
            [severity]="
              characterService.character().conditions.invisible
                ? 'success'
                : 'secondary'
            "
          />
          <p-button
            label="Paralyzed"
            [outlined]="true"
            (click)="characterService.toggleCondition('paralyzed')"
            [severity]="
              characterService.character().conditions.paralyzed
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Petrified"
            [outlined]="true"
            (click)="characterService.toggleCondition('petrified')"
            [severity]="
              characterService.character().conditions.petrified
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Poisoned"
            [outlined]="true"
            (click)="characterService.toggleCondition('poisoned')"
            [disabled]="characterService.character().immunities.poison"
            [severity]="
              characterService.character().conditions.poisoned
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Prone"
            [outlined]="true"
            (click)="characterService.toggleCondition('prone')"
            [severity]="
              characterService.character().conditions.prone
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Restrained"
            [outlined]="true"
            (click)="characterService.toggleCondition('restrained')"
            [severity]="
              characterService.character().conditions.restrained
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Stunned"
            [outlined]="true"
            (click)="characterService.toggleCondition('stunned')"
            [severity]="
              characterService.character().conditions.stunned
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Unconsious"
            [outlined]="true"
            (click)="characterService.toggleCondition('unconscious')"
            [severity]="
              characterService.character().conditions.unconscious
                ? 'danger'
                : 'secondary'
            "
          />
          <p-button
            label="Magical Sleep"
            [outlined]="true"
            (click)="characterService.toggleCondition('magicalSleep')"
            [disabled]="characterService.character().immunities.magicalSleep"
            [severity]="
              characterService.character().conditions.magicalSleep
                ? 'danger'
                : 'secondary'
            "
          />
        </div>
      </div>
    </p-card>
    <div class="grid grid-cols-1 gap-8">
      <p-card header="Resistances" class="">
        <div class="flex flex-col text-2xl justify-center">
          @if (characterService.character().resistances.poison) {
            <span>(R) Poison</span>
          }
        </div>
      </p-card>
      <p-card header="Immunities" class="">
        <div class="flex flex-col text-2xl justify-center">
          @if (characterService.character().immunities.magicalSleep) {
            <span>(I) Magical Sleep</span>
          }
        </div>
      </p-card>
    </div>
    <div class="grid grid-cols-1 gap-8">
      <p-card header="Advantages" class="grow">
        <div class="flex flex-col text-2xl justify-center">
          @if (characterService.character().advantages.deathSaves) {
            <span>(A) Death Saves</span>
          }

          @if (characterService.character().advantages.diseasePoison) {
            <span>(A) Disease/Poison</span>
          }
        </div>
      </p-card>
      <p-card header="Disadvantages" class="grow">
        <div class="flex flex-col text-2xl justify-center">None</div>
      </p-card>
    </div>
  `,
  styles: `
    :host {
      @apply grid gap-8 md:grid-cols-3;
    }
  `,
})
export class ConditionsLineComponent {
  characterService: CharacterService = inject(CharacterService);
}

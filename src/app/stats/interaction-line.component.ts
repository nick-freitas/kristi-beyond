import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CharacterService } from '../core/character.service';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { JsonPipe } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-interaction-line',
  standalone: true,
  imports: [
    CardModule,
    ButtonDirective,
    Ripple,
    Button,
    KnobModule,
    FormsModule,
    InputTextModule,
    JsonPipe,
    FloatLabelModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <p-card
      [header]="'HP (' + characterService.character().totalMaxHP + ')'"
      class="flex"
    >
      <div
        class="flex flex-col gap-3 text-3xl justify-around items-center h-full pb-8"
      >
        <div class="grid lg:grid-cols-2 md:grid-cols-1 gap-8 ">
          <p-knob
            [ngModel]="characterService.character().currentHp"
            [min]="0"
            [max]="characterService.character().totalMaxHP"
            [disabled]="true"
            size="200"
          />
          <div class="grid-cols-1 grid gap-8">
            <p-floatLabel>
              <input
                id="tempHp"
                type="number"
                pInputText
                class="text-center"
                [ngModel]="characterService.character().tempHp"
                (ngModelChange)="characterService.changeTempHp($event)"
              />
              <label for="tempHp">Temp HP</label>
            </p-floatLabel>
            <p-floatLabel>
              <input
                id="maxMod"
                type="number"
                pInputText
                class="text-center"
                [ngModel]="characterService.character().maxHpModifier"
                (ngModelChange)="characterService.changeMaxHpMod($event)"
              />
              <label for="tempHp">Max HP Mod</label>
            </p-floatLabel>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <p-button
            label="-"
            [outlined]="true"
            severity="danger"
            (click)="takeDamage()"
          />
          <input
            type="number"
            class="text-center"
            pInputText
            [(ngModel)]="hpMod"
          />
          <p-button
            label="+"
            [outlined]="true"
            severity="success"
            (click)="heal()"
          />
        </div>
      </div>
    </p-card>
    <div class="flex gap-8 flex-col">
      <div class="grid lg:grid-cols-2 gap-8 md:grid-cols-1">
        <p-card header="Death Saves" class="grow">
          <div class="grid grid-cols-1 gap-8">
            <div class="flex flex-row gap-8 justify-around">
              <div class="flex-col flex items-center gap-8 text-2xl w-full">
                <p-button
                  label="Fail"
                  [outlined]="true"
                  class="w-full"
                  severity="danger"
                  (click)="characterService.failDeathSave()"
                />
                <span>{{ characterService.character().deathFails }}</span>
              </div>
              <div class="flex-col flex items-center gap-8 text-2xl w-full">
                <p-button
                  label="Pass"
                  [outlined]="true"
                  class="w-full"
                  severity="success"
                  (click)="characterService.passDeathSave()"
                />
                <span>{{ characterService.character().deathPasses }}</span>
              </div>
            </div>
            <div class="flex-col flex items-center gap-8 text-2xl w-full">
              <p-button
                label="Reset"
                [outlined]="true"
                severity="secondary"
                class="w-full"
                (click)="characterService.resetDeathSaves()"
              />
            </div>
          </div>
        </p-card>
        <p-card header="Rest" class="flex grow ">
          <p-toast />
          <div class="flex flex-row justify-around gap-8">
            <div class="flex-col flex items-center gap-8 text-2xl w-full">
              <p-button
                label="Long"
                [outlined]="true"
                severity="primary"
                class="w-full"
                (click)="takeLongRest()"
              />
            </div>
            <div class="flex-col flex items-center gap-8 text-2xl w-full">
              <p-button
                label="Short"
                [outlined]="true"
                class="w-full"
                severity="secondary"
                (click)="takeShortRest()"
              />
            </div>
          </div>
          <div
            class="text-2xl text-center pt-8 flex flex-row justify-center items-center gap-8"
          >
            <p-button
              label="-"
              [outlined]="true"
              severity="danger"
              (click)="characterService.changeHitDie(-1)"
            />
            <div>
              Hit Dice:
              <span
                >{{ characterService.character().currentHitDie
                }}{{ characterService.character().hitDieType }}</span
              >
            </div>
            <p-button
              label="+"
              [outlined]="true"
              severity="success"
              (click)="characterService.changeHitDie(1)"
            />
          </div>
        </p-card>
      </div>
      <p-card header="Wealth" class="grow ">
        <div class="flex-col flex gap-2">
          <div class="text-2xl flex justify-around">
            <span class="text-yellow-600">
              G: {{ characterService.character().wealth.gold }}
            </span>
            <span class="text-gray-400">
              S: {{ characterService.character().wealth.silver }}
            </span>
            <span class="text-yellow-800">
              C: {{ characterService.character().wealth.copper }}
            </span>
          </div>
          <div class="flex flex-col">
            <input
              type="number"
              class="w-full text-center"
              pInputText
              [(ngModel)]="goldMod"
            />
            <div
              class="grid lg:grid-cols-2 md:grid-cols-1 lg:gap-16 gap-4 pt-4"
            >
              <div class="grid grid-flow-col gap-4">
                <p-button
                  label="G"
                  [outlined]="true"
                  severity="danger"
                  (click)="modGold(-1)"
                />
                <p-button
                  label="S"
                  [outlined]="true"
                  severity="danger"
                  (click)="modSilver(-1)"
                />
                <p-button
                  label="C"
                  [outlined]="true"
                  severity="danger"
                  (click)="modCopper(-1)"
                />
              </div>
              <div class="grid grid-flow-col gap-4">
                <p-button
                  label="G"
                  [outlined]="true"
                  severity="success"
                  (click)="modGold(1)"
                />
                <p-button
                  label="S"
                  [outlined]="true"
                  severity="success"
                  (click)="modSilver(1)"
                />
                <p-button
                  label="C"
                  [outlined]="true"
                  severity="success"
                  (click)="modCopper(1)"
                />
              </div>
            </div>
          </div>
        </div>
      </p-card>
    </div>
  `,
  styles: `
    :host {
      @apply grid gap-8 md:grid-cols-2;
    }
  `,
})
export class InteractionLineComponent {
  messageService: MessageService = inject(MessageService);
  characterService: CharacterService = inject(CharacterService);
  hpMod: number | undefined;
  goldMod: number | undefined;

  takeDamage() {
    this.characterService.takeDamage(this.hpMod!);
    this.hpMod = undefined;
  }

  heal() {
    this.characterService.heal(this.hpMod!);
    this.hpMod = undefined;
  }

  modCopper(sign: number) {
    this.characterService.modCopper(this.goldMod! * sign);
    this.goldMod = undefined;
  }

  modSilver(sign: number) {
    this.characterService.modSilver(this.goldMod! * sign);
    this.goldMod = undefined;
  }

  modGold(sign: number) {
    this.characterService.modGold(this.goldMod! * sign);
    this.goldMod = undefined;
  }

  takeLongRest() {
    this.characterService.takeLongRest();

    this.messageService.add({
      severity: 'success',
      summary: 'Long Rest Completed',
    });
  }

  takeShortRest() {
    this.characterService.takeShortRest();

    this.messageService.add({
      severity: 'success',
      summary: 'Short Rest Completed',
    });
  }
}

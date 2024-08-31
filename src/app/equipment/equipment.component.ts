import { Component, inject } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { Button } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { NgClass, NgForOf } from '@angular/common';
import { CharacterService } from '../core/character.service';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [
    MessagesModule,
    Button,
    DataViewModule,
    NgClass,
    TagModule,
    NgForOf,
    CardModule,
    FloatLabelModule,
  ],
  template: `
    @for (item of characterService.character().equipped; track item) {
      @if (item.equipped && (!item.requiresAttunement || item.isAttuned)) {
        @if (item.category === 'Armour') {
          <p-card header="Equipped Armour" class="grow order-1">
            <div class="grid grid-flow-col gap-3 text-2xl">
              <span> Armour: {{ item.name }} </span>
              <span> Type: {{ item.itemSpecific.armourType }} </span>
              <span> AC: {{ item.itemSpecific.ac }} </span>
              <span> Strength: {{ item.itemSpecific.str }} </span>
              <span>
                Stealth Disadvantage:
                {{ item.itemSpecific.stealthDis ? 'Yes' : 'No' }}
              </span>
            </div>
          </p-card>
        }

        @if (item.category === 'Shield') {
          <p-card header="Equipped Shield" class="grow order-2">
            <div class="grid grid-flow-col gap-3 text-2xl">
              <span> Shield: {{ item.name }} </span>
              <!--            <span> Type: {{ item.itemSpecific.armourType }} </span>-->
              <span> AC: {{ item.itemSpecific.ac }} </span>
              <span> Strength: {{ item.itemSpecific.str }} </span>
              <span>
                Stealth Disadvantage:
                {{ item.itemSpecific.stealthDis ? 'Yes' : 'No' }}
              </span>
            </div>
          </p-card>
        }

        <!--      @if (item.category === 'Special Weapon') {-->
        <!--        <p-card header="Special Weapon" class="grow order-3">-->
        <!--          <div class="grid grid-flow-col gap-3 text-2xl">-->
        <!--            <span> Weapon: {{ item.name }} </span>-->
        <!--            <span> Type: {{ item.itemSpecific.armourType }} </span>-->
        <!--            <span> AC: {{ item.itemSpecific.ac }} </span>-->
        <!--            <span> Strength: {{ item.itemSpecific.str }} </span>-->
        <!--            <span>-->
        <!--              Stealth Disadvantage:-->
        <!--              {{ item.itemSpecific.stealthDis ? 'Yes' : 'No' }}-->
        <!--            </span>-->
        <!--          </div>-->
        <!--        </p-card>-->
        <!--      }-->

        @if (item.category === 'Weapon') {
          <p-card header="Weapon" class="grow order-4">
            <div class="grid grid-flow-col gap-3 text-2xl">
              <span> Weapon: {{ item.name }} </span>
              <span> Attack Mod: {{ item.itemSpecific.attackMod }} </span>
              <span>
                Damage: {{ item.itemSpecific.damage }} +
                {{ item.itemSpecific.damageMod }}
              </span>
              <span> Damage Type: {{ item.itemSpecific.damageType }} </span>
            </div>
            <div class="grid grid-flow-col gap-3 text-2xl pt-8">
              <span> Properties: {{ item.itemSpecific.properties }} </span>
            </div>
          </p-card>
        }
      }
    }
  `,
  styles: `
    :host {
      @apply p-8 gap-8 grid;
    }
  `,
})
export class EquipmentComponent {
  characterService: CharacterService = inject(CharacterService);
}

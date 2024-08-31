import { Component, inject } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { CharacterService } from '../core/character.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    MessagesModule,
    TableModule,
    InputTextareaModule,
    FormsModule,
    Button,
  ],
  template: `
    <p-table
      [value]="characterService.character().inventory"
      [tableStyle]="{ 'min-width': '50rem' }"
    >
      <ng-template pTemplate="header" let-rowspan="2">
        <tr>
          <th>Qty.</th>
          <th>Item</th>
          <!--          <th>Value</th>-->
          <th>Equipped</th>
          <th>Attunement</th>
          <!--          <th>Weight</th>-->
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-item>
        <tr>
          <td rowspan="2">{{ item.qty }}</td>
          <td>{{ item.name }}</td>
          <!--          <td>{{ item.value }}</td>-->
          <td>
            @if (item.equipped) {
              <p-button
                label="Unequip"
                [outlined]="true"
                (click)="characterService.unequip(item)"
              />
            } @else {
              <p-button
                label="Equip"
                [outlined]="true"
                severity="secondary"
                (click)="characterService.equip(item)"
              />
            }
          </td>
          <td>
            @if (item.requiresAttunement) {
              @if (item.isAttuned) {
                <p-button
                  label="Unattune"
                  [outlined]="true"
                  (click)="characterService.unattune(item)"
                />
              } @else {
                <p-button
                  label="Attune"
                  [outlined]="true"
                  severity="secondary"
                  (click)="characterService.attune(item)"
                />
              }
            }
          </td>

          <!--          <td>{{ item.weight }}</td>-->
        </tr>
        <tr>
          <td colspan="3" class="whitespace-pre-line">{{ item.notes }}</td>
        </tr>
      </ng-template>
    </p-table>
    <textarea
      rows="5"
      cols="30"
      pInputTextarea
      [ngModel]="characterService.character().additionalInventory"
      (ngModelChange)="characterService.modAdditionalInventory($event)"
    ></textarea>
  `,
  styles: `
    :host {
      @apply p-8 gap-8 grid;
    }
  `,
})
export class InventoryComponent {
  characterService: CharacterService = inject(CharacterService);
}

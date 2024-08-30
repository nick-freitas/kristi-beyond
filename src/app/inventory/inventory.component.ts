import { Component, inject } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { CharacterService } from '../core/character.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MessagesModule, TableModule, InputTextareaModule, FormsModule],
  template: `
    <p-table
      [value]="characterService.character().inventory"
      [tableStyle]="{ 'min-width': '50rem' }"
    >
      <ng-template pTemplate="header">
        <tr>
          <th>Qty.</th>
          <th>Item</th>
          <th>Value</th>
          <th>Weight</th>
          <th>Notes</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-item>
        <tr>
          <td>{{ item.qty }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
          <td>{{ item.weight }}</td>
          <td>{{ item.notes }}</td>
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

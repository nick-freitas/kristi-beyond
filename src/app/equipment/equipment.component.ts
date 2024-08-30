import { Component } from '@angular/core';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [MessagesModule],
  template: ` <p>equipment works!</p> `,
  styles: `
    :host {
      @apply p-8 gap-8 grid;
    }
  `,
})
export class EquipmentComponent {}

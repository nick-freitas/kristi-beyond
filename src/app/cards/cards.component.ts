import { Component } from '@angular/core';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MessagesModule],
  template: `<span class="text-4xl pt-8">No</span>`,
  styles: `
    :host {
      @apply p-8 gap-8 grid;
    }
  `,
})
export class CardsComponent {}

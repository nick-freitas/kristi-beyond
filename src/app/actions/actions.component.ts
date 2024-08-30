import { Component } from '@angular/core';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [MessagesModule],
  template: ` <p>actions works!</p> `,
  styles: `
    :host {
      @apply p-8 gap-8 grid;
    }
  `,
})
export class ActionsComponent {}

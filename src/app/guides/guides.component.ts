import { Component } from '@angular/core';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-guides',
  standalone: true,
  imports: [MessagesModule],
  template: ` <p>guides works!</p> `,
  styles: `
    :host {
      @apply p-8 gap-8 grid;
    }
  `,
})
export class GuidesComponent {}

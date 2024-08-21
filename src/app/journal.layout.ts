import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="block h-full bg-journalPages">
      <router-outlet />
    </div>
  `,
  styles: `
    :host {
      @apply block p-10 h-dvh;
    }
  `,
})
export class JournalLayout {}

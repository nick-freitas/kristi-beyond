import { Component, Input } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { OracleCard } from '../core/oracle-card.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MessagesModule],
  template: `
    @if (card) {
      <div
        class="p-5 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700"
      >
        <div class="py-2 flex flex-row justify-between">
          <h3 class="text-2xl dark:text-white">
            {{ card.name }} ({{ card.id }})
          </h3>
          <h3 class="text-2xl dark:text-white">Lvl {{ card.level }}</h3>
        </div>
        <img class=" w-full" [src]="card.path" alt="Template Image" />

        <p
          class="mt-1 sm:mt-3 text-gray-500 dark:text-neutral-400 text-lg whitespace-break-spaces"
        >
          {{ card.effect }}
        </p>
      </div>
    }
  `,
  styles: `
    :host {
    }
  `,
})
export class CardComponent {
  @Input() card: OracleCard | undefined;
}

import { Component } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { deck } from '../data/vasha-deck.data';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MessagesModule],
  template: `
    @for (card of cards; track card) {
      <!-- Card -->
      <div
        class="p-5 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700"
      >
        <div class="grid sm:grid-cols-12 gap-4">
          <div class="sm:col-span-5 sm:order-2">
            <div
              class="bg-gray-100 rounded-xl overflow-hidden dark:bg-neutral-700"
            >
              <img class=" w-full" [src]="card.path" alt="Template Image" />
            </div>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-7 sm:order-1">
            <div class="h-full flex flex-col justify-between space-y-3">
              <div>
                <h3
                  class="text-lg sm:text-lg font-semibold text-gray-800 dark:text-neutral-200"
                >
                  {{ card.id }}: {{ card.name }}
                </h3>
                <p
                  class="mt-1 sm:mt-3 text-gray-500 dark:text-neutral-400 text-lg whitespace-break-spaces"
                >
                  {{ card.effect }}
                </p>
              </div>
            </div>
          </div>
          <!-- End Col -->
        </div>
      </div>
      <!-- End Card -->
    }

    <!--    @for (path of paths; track path) {-->
    <!--      <img [src]="path" />-->
    <!--    }-->
  `,
  styles: `
    :host {
      @apply p-8 gap-8 grid grid-cols-1 md:grid-cols-2;
    }
  `,
})
export class CardsComponent {
  cards = deck.sort((a, b) => a.id - b.id);
}

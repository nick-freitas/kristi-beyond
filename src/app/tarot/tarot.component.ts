import { Component } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { OracleCard } from '../core/oracle-card.model';
import { deck } from '../data/vasha-deck.data';

@Component({
  selector: 'app-tarot',
  standalone: true,
  imports: [MessagesModule],
  template: `
    <div class="flex flex-col md:flex-row gap-4 pb-8">
      <div
        class=" w-full bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg p-4 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500"
        role="alert"
        tabindex="-1"
        aria-labelledby="hs-soft-color-info-label"
      >
        <span id="hs-soft-color-info-label" class="font-bold">
          THREE CARD SPREADS
        </span>
        <div class="flex flex-col">
          <span>past * present * future</span>
          <span>problem * cause * solution</span>
          <span>mind * body * spirit</span>
          <span>strengths * weaknesses * advice</span>
          <span>you * other person * relationship</span>
          <span>head * heart * path</span>
          <span>you * lover * dynamic</span>
          <span>quest * challenge * reward</span>
        </div>
      </div>
      <div
        class=" w-full  bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg p-4 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500"
        role="alert"
        tabindex="-1"
        aria-labelledby="hs-soft-color-info-label"
      >
        <span id="hs-soft-color-info-label" class="font-bold">
          SINGLE CARD READINGS
        </span>
        <div class="flex flex-col">
          <span>
            * Ask the deck a question of your choice, and draw a card for your
            answer.
          </span>
          <span>
            * Draw a card each day as a part of your morning ritual. What does
            the card tell you?
          </span>
        </div>
      </div>
    </div>

    <div class="card-grid">
      @for (card of readings; track card) {
        <div
          class="p-5 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700"
        >
          <div class="py-2 flex flex-row justify-between">
            <h3 class="text-2xl dark:text-white">
              {{ card.name }} ({{
                card.readingsId ? card.readingsId : card.id
              }})
            </h3>
          </div>
          <img class=" w-full" [src]="card.path" alt="Template Image" />

          @for (reading of card.readings; track reading) {
            <p
              class="pt-4 text-gray-500 dark:text-neutral-400 text-xl whitespace-break-spaces flex justify-center"
            >
              {{ reading.header }}
            </p>

            <p
              class="pt-4 text-gray-500 dark:text-neutral-400 text-md whitespace-break-spaces flex justify-center pb-8"
            >
              {{ reading.content }}
            </p>
          }
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      @apply p-8 grid;
    }

    .card-grid {
      @apply grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4;
    }
  `,
})
export class TarotComponent {
  readings: OracleCard[] = deck
    .filter((c) => c.readings)
    .map((c) => ({ ...c, path: this.fixPath(c) }))
    .sort((a, b) => a.id - b.id);

  fixPath(card: OracleCard) {
    const folder = '/assets/cards';
    const zeroPaddedId = ('0' + card.id).slice(-2);
    let fileName = `${card.name} (${card.readingsId ? card.readingsId : zeroPaddedId})`;
    fileName += '.jpg';
    return `${folder}/${fileName}`;
  }
}

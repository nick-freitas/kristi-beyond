import { Component } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { deck } from '../data/vasha-deck.data';
import { CardComponent } from './card.component';
import { OracleCard } from '../core/oracle-card.model';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MessagesModule, CardComponent],
  template: `
    <h1 class="text-4xl dark:text-white p-4">Cards in Deck</h1>
    <div class="card-grid">
      @for (card of equippedCards; track card) {
        <!-- Card -->
        <app-card [card]="card" />
        <!-- End Card -->
      }
    </div>

    <h1 class="text-4xl dark:text-white p-4">Cards not in Deck</h1>
    <div class="card-grid">
      @for (card of nonEquippedCards; track card) {
        <!-- Card -->
        <app-card [card]="card" />
        <!-- End Card -->
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
export class CardsComponent {
  equippedCards: OracleCard[] = deck
    .filter((c) => c.equipped)
    .map((c) => ({ ...c, path: this.fixPath(c) }))
    .sort((a, b) => a.id - b.id);

  nonEquippedCards: OracleCard[] = deck
    .filter((c) => !c.equipped && !c.readingsOnly)
    .map((c) => ({ ...c, path: this.fixPath(c) }))
    .sort((a, b) => a.id - b.id);

  fixPath(card: OracleCard, useAlt?: boolean) {
    const folder = '/assets/cards';
    const zeroPaddedId = ('0' + card.id).slice(-2);
    let fileName = `${card.name} (${zeroPaddedId})`;
    if (useAlt) fileName += ' (alt)';
    fileName += '.jpg';
    return `${folder}/${fileName}`;
  }
}

import { Component } from '@angular/core';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MessagesModule],
  template: `
    @for (path of paths; track path) {
      <img [src]="path" />
    }
  `,
  styles: `
    :host {
      @apply p-8 gap-8 grid grid-cols-2;
    }
  `,
})
export class CardsComponent {
  paths = [
    '/assets/cards/aberrations1.png	',
    '/assets/cards/celestials1.png',
    '/assets/cards/familiar.png',
    '/assets/cards/plants1.png',
    '/assets/cards/aberrations3.png	',
    '/assets/cards/companion.png',
    '/assets/cards/fey2.png',
    '/assets/cards/undead1.png',
    '/assets/cards/adversaries1.png	',
    '/assets/cards/constructs1.png',
    '/assets/cards/fighter.png',
    '/assets/cards/undead3.png',
    '/assets/cards/ally.png',
    '/assets/cards/druid.png',
    '/assets/cards/giants2.png',
    '/assets/cards/wild_oracle.png',
    '/assets/cards/barbarian.png',
    '/assets/cards/elemental1.png',
    '/assets/cards/monstrosities2.png',
    '/assets/cards/blood_hunter.png	',
    '/assets/cards/elementals2.png',
    '/assets/cards/paladin.png',
  ];
}

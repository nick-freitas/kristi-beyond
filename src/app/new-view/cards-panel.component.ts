import { Component, computed, signal } from '@angular/core';
import { OracleCard } from '../core/oracle-card.model';
import { deck } from '../data/vasha-deck.data';

type CardsPanelMode = 'deck' | 'pool' | 'readings';
type LevelFilter = 'all' | number;

@Component({
  selector: 'app-new-view-cards-panel',
  standalone: true,
  template: `
    <section class="card-sheet" aria-label="Cards and tarot">
      <header class="card-sheet-header">
        <div class="modes" role="tablist" aria-label="Card archive view">
          @for (option of modes; track option.id) {
            <button
              type="button"
              role="tab"
              [id]="'cards-tab-' + option.id"
              [attr.aria-controls]="'cards-mode-' + option.id"
              [attr.aria-selected]="mode() === option.id"
              [tabIndex]="mode() === option.id ? 0 : -1"
              [class.active]="mode() === option.id"
              (click)="setMode(option.id)"
              (keydown)="onModeKeydown($event, option.id)"
            >
              {{ option.label }}
            </button>
          }
        </div>
      </header>

      <div class="toolbar">
        <label class="field search-field">
          <span>Search the archive</span>
          <input
            type="search"
            autocomplete="off"
            placeholder="Card number, name, effect, or reading"
            [value]="query()"
            (input)="onSearch($event)"
          />
        </label>

        @if (mode() !== 'readings') {
          <label class="field level-field">
            <span>Game-card level</span>
            <select [value]="level()" (change)="onLevelChange($event)">
              <option value="all">All levels</option>
              @for (cardLevel of levels; track cardLevel) {
                <option [value]="cardLevel">Level {{ cardLevel }}</option>
              }
            </select>
          </label>
        }

        <label class="field draw-level-field">
          <span>Draw level</span>
          <select [value]="drawLevel()" (change)="onDrawLevelChange($event)">
            <option value="all">Any level</option>
            @for (cardLevel of drawLevels; track cardLevel) {
              <option [value]="cardLevel">Level {{ cardLevel }}</option>
            }
          </select>
        </label>

        <button type="button" class="draw-card" (click)="drawCard()">
          Draw card
        </button>

        <p class="result-count" aria-live="polite">
          {{ visibleCards().length }}
          {{ visibleCards().length === 1 ? 'card' : 'cards' }}
        </p>
      </div>

      <div
        class="workspace"
        role="tabpanel"
        [id]="'cards-mode-' + mode()"
        [attr.aria-labelledby]="'cards-tab-' + mode()"
      >
        @if (visibleCards().length && activeCard(); as selected) {
          <nav
            class="card-index"
            role="listbox"
            [attr.aria-label]="modeLabel() + ' cards'"
          >
            @for (card of visibleCards(); track cardKey(card)) {
              <button
                [id]="'nv-card-option-' + $index"
                type="button"
                class="index-card"
                role="option"
                [class.selected]="isSelected(card)"
                [attr.aria-selected]="isSelected(card)"
                [tabIndex]="isSelected(card) ? 0 : -1"
                (click)="selectCard(card)"
                (keydown)="onCardKeydown($event, $index)"
              >
                <span class="card-number">{{ cardMark(card) }}</span>
                <span class="card-name">{{ card.name }}</span>
                <span class="card-kind">
                  {{ card.readingsOnly ? 'Reading' : 'Level ' + card.level }}
                </span>
              </button>
            }
          </nav>

          <article class="card-detail" aria-live="polite">
            <figure class="card-art">
              @if (!hasImageError(selected)) {
                <img
                  [src]="imagePath(selected)"
                  [alt]="selected.name + ' card artwork'"
                  (error)="markImageMissing(selected)"
                />
              } @else {
                <div
                  class="missing-art"
                  role="img"
                  [attr.aria-label]="'Artwork unavailable for ' + selected.name"
                >
                  <span>{{ cardMark(selected) }}</span>
                  <strong>{{ selected.name }}</strong>
                  <small>Artwork unavailable</small>
                </div>
              }
            </figure>

            <div class="card-copy">
              <header class="card-heading">
                <p>
                  {{
                    selected.readingsOnly
                      ? 'Tarot interpretation'
                      : 'Wild Oracle card'
                  }}
                </p>
                <h3>{{ selected.name }}</h3>
                @if (!selected.readingsOnly) {
                  <span class="level-seal">Level {{ selected.level }}</span>
                }
              </header>

              @if (mode() === 'readings') {
                <section class="reading-copy" aria-label="Tarot readings">
                  @for (
                    reading of readingsFor(selected);
                    track reading.header
                  ) {
                    <div class="reading">
                      <h4>{{ reading.header }}</h4>
                      <p>{{ reading.content }}</p>
                    </div>
                  }
                </section>

                @if (selected.effect) {
                  <section class="effect secondary-copy">
                    <h4>Game effect</h4>
                    <p>{{ selected.effect }}</p>
                  </section>
                }
              } @else {
                <section class="effect">
                  <h4>Game effect</h4>
                  <p>
                    {{
                      selected.effect ||
                        'No game effect is recorded for this card.'
                    }}
                  </p>
                </section>
              }
            </div>
          </article>
        } @else {
          <div class="empty-state">
            <span aria-hidden="true">◇</span>
            <h3>No cards found</h3>
            <p>Try another search or return to all game-card levels.</p>
            <button type="button" (click)="clearFilters()">
              Clear filters
            </button>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    :host {
      --card-ink: #20272c;
      --card-line: #5a6062;
      --card-soft: #d1d6d9;
      --card-paper: #ffffff;
      --card-raised: #f7f7f5;
      --card-accent: #367eaa;
      --card-muted: #65727a;
      --card-violet: #75658f;
      --card-display: var(
        --nv-display-font,
        'Arial Narrow',
        'Aptos Narrow',
        'Roboto Condensed',
        'Helvetica Neue',
        sans-serif
      );
      --card-body: var(--nv-body-font, 'Avenir Next', 'Segoe UI', sans-serif);
      display: block;
      min-height: 0;
      color: var(--card-ink);
      font-family: var(--card-body);
    }
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    button,
    input,
    select {
      font: inherit;
    }
    h3,
    h4,
    .card-heading p,
    .field span,
    .result-count,
    .modes button,
    .draw-card,
    .empty-state button {
      font-family: var(--card-display);
      font-stretch: condensed;
    }
    .card-sheet {
      min-height: 0;
      background: var(--card-paper);
    }
    .card-sheet-header {
      display: flex;
      align-items: end;
      min-height: 45px;
      padding: 0;
      border-bottom: 1px solid var(--card-soft);
      background: var(--card-paper);
    }
    .card-heading p {
      margin: 0;
      color: var(--card-muted);
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    h3,
    h4,
    p {
      margin-top: 0;
    }
    .modes {
      display: flex;
      align-self: stretch;
      align-items: end;
      gap: 0.1rem;
      flex-wrap: wrap;
    }
    .modes button,
    .empty-state button {
      min-height: 44px;
      padding: 0.55rem 0.75rem;
      color: var(--card-muted);
      font-size: 0.74rem;
      font-weight: 800;
      letter-spacing: 0.045em;
      text-transform: uppercase;
      cursor: pointer;
    }
    .modes button {
      border: 0;
      border-bottom: 3px solid transparent;
      background: transparent;
    }
    .modes button:hover {
      color: var(--card-ink);
      background: #f1f3f3;
    }
    .modes button.active {
      color: var(--card-ink);
      background: transparent;
      border-bottom-color: var(--card-line);
    }
    button:focus-visible,
    input:focus-visible,
    select:focus-visible {
      outline: 3px solid var(--card-accent);
      outline-offset: 2px;
      box-shadow: 0 0 0 5px var(--card-paper);
    }
    .toolbar {
      display: grid;
      grid-template-columns:
        minmax(12rem, 1fr) minmax(8rem, 0.28fr) minmax(8rem, 0.28fr)
        auto auto;
      align-items: end;
      gap: 0.75rem;
      padding: 0.7rem 0.9rem;
      border-bottom: 1px solid var(--card-soft);
      background: var(--card-raised);
    }
    .field {
      display: grid;
      gap: 0.25rem;
    }
    .field span,
    .result-count {
      color: var(--card-muted);
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.065em;
      text-transform: uppercase;
    }
    .field input,
    .field select {
      width: 100%;
      min-height: 44px;
      border: 1px solid #777e81;
      border-radius: 0;
      padding: 0.5rem 0.65rem;
      color: inherit;
      background: var(--card-paper);
    }
    .field input::placeholder {
      color: #89949b;
    }
    .draw-card {
      min-height: 44px;
      padding: 0.5rem 0.8rem;
      color: #fff;
      background: var(--card-accent);
      border: 1px solid #286584;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      cursor: pointer;
    }
    .draw-card:hover {
      background: #286584;
    }
    .result-count {
      margin: 0;
      padding: 0 0.1rem 0.8rem;
      white-space: nowrap;
    }
    .workspace {
      display: grid;
      grid-template-columns: minmax(13.5rem, 0.58fr) minmax(0, 1.7fr);
      min-height: 33rem;
      background: var(--card-paper);
    }
    .card-index {
      max-height: 60vh;
      overflow: auto;
      padding: 0;
      border-right: 1px solid var(--card-line);
      background: var(--card-raised);
      scrollbar-color: #aeb8bf transparent;
    }
    .index-card {
      display: grid;
      grid-template-columns: 2.65rem minmax(0, 1fr);
      width: 100%;
      min-height: 52px;
      margin: 0;
      padding: 0.45rem 0.65rem;
      text-align: left;
      border: 0;
      border-bottom: 1px solid var(--card-soft);
      background: transparent;
      color: inherit;
      cursor: pointer;
    }
    .index-card:hover {
      background: #eef1f2;
    }
    .index-card.selected {
      background: var(--card-raised);
      box-shadow: inset 3px 0 var(--card-accent);
    }
    .card-number {
      grid-row: 1/3;
      align-self: center;
      color: var(--card-muted);
      font: 800 0.76rem/1 var(--card-display);
      letter-spacing: 0.04em;
    }
    .index-card.selected .card-number {
      color: var(--card-accent);
    }
    .card-name {
      overflow: hidden;
      font-size: 0.9rem;
      font-weight: 750;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-kind {
      color: var(--card-muted);
      font-family: var(--card-display);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.035em;
      text-transform: uppercase;
    }
    .card-detail {
      display: grid;
      grid-template-columns: minmax(9rem, 13rem) minmax(0, 1fr);
      gap: 0;
      align-items: start;
      padding: 0;
      min-width: 0;
      background: linear-gradient(
          132deg,
          rgba(117, 101, 143, 0.07),
          transparent 8.5rem
        ),
        var(--card-paper);
    }
    .card-art {
      margin: 0;
    }
    .card-art img,
    .missing-art {
      display: block;
      width: 100%;
      aspect-ratio: 2/3;
      border: 1px solid var(--card-line);
      background: #dfe3e5;
      box-shadow: 3px 3px 0 #d6dbde;
      clip-path: polygon(
        7px 0,
        100% 0,
        100% calc(100% - 7px),
        calc(100% - 7px) 100%,
        0 100%,
        0 7px
      );
      object-fit: cover;
    }
    .card-copy {
      padding: clamp(1rem, 2vw, 1.35rem);
    }
    .missing-art {
      display: grid;
      place-content: center;
      gap: 0.6rem;
      padding: 1rem;
      text-align: center;
      background: repeating-linear-gradient(
        135deg,
        #f2f3f3 0 12px,
        #e7eaeb 12px 24px
      );
    }
    .missing-art span {
      color: var(--card-violet);
      font-size: 2.2rem;
    }
    .missing-art small {
      color: var(--card-muted);
    }
    .card-heading {
      position: relative;
      padding-bottom: 0.7rem;
      border-bottom: 1px solid var(--card-soft);
    }
    .card-heading h3 {
      margin: 0.2rem 4.5rem 0 0;
      font-size: clamp(1.45rem, 2.6vw, 2rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.05;
    }
    .level-seal {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.38rem 0.48rem;
      border: 1px solid var(--card-line);
      color: var(--card-muted);
      background: var(--card-raised);
      font-family: var(--card-display);
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .effect,
    .reading-copy {
      padding-top: 0.9rem;
    }
    .effect h4,
    .reading h4 {
      margin-bottom: 0.35rem;
      color: var(--card-muted);
      font-size: 0.74rem;
      font-weight: 800;
      letter-spacing: 0.075em;
      text-transform: uppercase;
    }
    .effect p,
    .reading p {
      margin: 0;
      font-size: 0.92rem;
      line-height: 1.5;
      white-space: pre-line;
    }
    .reading {
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--card-soft);
    }
    .secondary-copy {
      margin-top: 0.85rem;
      border-top: 1px solid var(--card-line);
    }
    .empty-state {
      grid-column: 1/-1;
      display: grid;
      place-items: center;
      place-content: center;
      min-height: 26rem;
      padding: 2rem;
      text-align: center;
    }
    .empty-state span {
      color: var(--card-violet);
      font-size: 2.5rem;
    }
    .empty-state h3 {
      margin: 0.5rem 0 0.2rem;
      font-size: 1.25rem;
    }
    .empty-state p {
      color: var(--card-muted);
    }
    .empty-state button {
      border: 1px solid var(--card-line);
      background: var(--card-raised);
    }
    .empty-state button:hover {
      color: var(--card-paper);
      background: var(--card-line);
    }
    @media (max-width: 800px) {
      .toolbar {
        grid-template-columns: 1fr 1fr 1fr;
      }
      .search-field {
        grid-column: 1/-1;
      }
      .result-count {
        grid-column: 1/-1;
        padding: 0;
      }
      .workspace {
        grid-template-columns: 1fr;
      }
      .card-index {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        max-height: 14rem;
        border-right: 0;
        border-bottom: 1px solid var(--card-line);
      }
      .index-card {
        border-right: 1px solid var(--card-soft);
      }
      .card-detail {
        grid-template-columns: minmax(8rem, 11rem) minmax(0, 1fr);
      }
    }
    @media (max-width: 540px) {
      .toolbar {
        grid-template-columns: 1fr;
      }
      .search-field,
      .result-count {
        grid-column: auto;
      }
      .card-detail {
        grid-template-columns: 1fr;
      }
      .card-art {
        max-width: 13rem;
        margin: auto;
      }
      .card-index {
        grid-template-columns: 1fr;
      }
      .index-card {
        border-right: 0;
      }
    }
    @media (prefers-reduced-motion: no-preference) {
      .modes button,
      .index-card,
      .empty-state button {
        transition:
          color 120ms ease-out,
          background-color 120ms ease-out,
          border-color 120ms ease-out;
      }
    }
  `,
})
export class CardsPanelComponent {
  readonly modes: ReadonlyArray<{ id: CardsPanelMode; label: string }> = [
    { id: 'deck', label: 'Current deck' },
    { id: 'pool', label: 'Card pool' },
    { id: 'readings', label: 'Readings' },
  ];

  readonly levels = Array.from(
    new Set(
      deck.filter((card) => !card.readingsOnly).map((card) => card.level),
    ),
  ).sort((a, b) => a - b);
  readonly drawLevels = Array.from(
    new Set(
      deck
        .filter((card) => card.equipped && !card.readingsOnly)
        .map((card) => card.level),
    ),
  ).sort((a, b) => a - b);

  readonly mode = signal<CardsPanelMode>('deck');
  readonly query = signal('');
  readonly level = signal<LevelFilter>('all');
  readonly drawLevel = signal<LevelFilter>('all');
  private readonly selectedKey = signal<string | null>(null);
  private readonly missingImages = signal<ReadonlySet<string>>(new Set());

  readonly visibleCards = computed(() => {
    const mode = this.mode();
    const query = this.query().trim().toLocaleLowerCase();
    const normalizedMarkQuery = /^\d+$/.test(query)
      ? query.padStart(2, '0')
      : query;
    const hasExactMark =
      !!query &&
      deck.some(
        (card) =>
          this.cardMark(card).toLocaleLowerCase() === normalizedMarkQuery,
      );
    const level = this.level();

    return deck
      .filter((card) => {
        if (mode === 'deck') return !!card.equipped && !card.readingsOnly;
        if (mode === 'pool') return !card.equipped && !card.readingsOnly;
        return !!card.readings?.length;
      })
      .filter(
        (card) =>
          mode === 'readings' || level === 'all' || card.level === level,
      )
      .filter(
        (card) =>
          !query ||
          (hasExactMark
            ? this.cardMark(card).toLocaleLowerCase() === normalizedMarkQuery
            : this.searchText(card).includes(query)),
      )
      .slice()
      .sort((a, b) => a.id - b.id || a.name.localeCompare(b.name));
  });

  readonly activeCard = computed(() => {
    const cards = this.visibleCards();
    const selectedKey = this.selectedKey();
    return cards.find((card) => this.cardKey(card) === selectedKey) ?? cards[0];
  });

  setMode(mode: CardsPanelMode): void {
    this.mode.set(mode);
    this.selectedKey.set(null);
  }

  onModeKeydown(event: KeyboardEvent, current: CardsPanelMode): void {
    const currentIndex = this.modes.findIndex(
      (option) => option.id === current,
    );
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % this.modes.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + this.modes.length) % this.modes.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = this.modes.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    const next = this.modes[nextIndex].id;
    this.setMode(next);
    window.setTimeout(() =>
      document.getElementById(`cards-tab-${next}`)?.focus(),
    );
  }

  setSearch(query: string): void {
    this.query.set(query);
    this.selectedKey.set(null);
  }

  setLevel(level: LevelFilter): void {
    this.level.set(level);
    this.selectedKey.set(null);
  }

  onSearch(event: Event): void {
    const input = event.target;
    if (input instanceof HTMLInputElement) this.setSearch(input.value);
  }

  onLevelChange(event: Event): void {
    const select = event.target;
    if (!(select instanceof HTMLSelectElement)) return;
    this.setLevel(select.value === 'all' ? 'all' : Number(select.value));
  }

  setDrawLevel(level: LevelFilter): void {
    this.drawLevel.set(level);
  }

  onDrawLevelChange(event: Event): void {
    const select = event.target;
    if (!(select instanceof HTMLSelectElement)) return;
    this.setDrawLevel(select.value === 'all' ? 'all' : Number(select.value));
  }

  drawCard(): OracleCard | undefined {
    const drawLevel = this.drawLevel();
    const candidates = deck.filter(
      (card) =>
        card.equipped &&
        !card.readingsOnly &&
        (drawLevel === 'all' || card.level === drawLevel),
    );
    if (!candidates.length) return undefined;

    const card = candidates[Math.floor(Math.random() * candidates.length)];
    this.mode.set('deck');
    this.query.set('');
    this.level.set(drawLevel);
    this.selectedKey.set(this.cardKey(card));
    return card;
  }

  selectCard(card: OracleCard): void {
    this.selectedKey.set(this.cardKey(card));
  }

  onCardKeydown(event: KeyboardEvent, currentIndex: number): void {
    const cards = this.visibleCards();
    let nextIndex: number | null = null;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % cards.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + cards.length) % cards.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = cards.length - 1;
    }

    if (nextIndex === null || !cards[nextIndex]) return;
    event.preventDefault();
    this.selectCard(cards[nextIndex]);
    window.setTimeout(() =>
      document.getElementById(`nv-card-option-${nextIndex}`)?.focus(),
    );
  }

  clearFilters(): void {
    this.query.set('');
    this.level.set('all');
    this.selectedKey.set(null);
  }

  modeLabel(): string {
    return (
      this.modes.find((option) => option.id === this.mode())?.label ?? 'Tarot'
    );
  }

  readingsFor(card: OracleCard): NonNullable<OracleCard['readings']> {
    return card.readings ?? [];
  }

  cardKey(card: OracleCard): string {
    return `${card.readingsId ?? card.id}:${card.name}:${card.level}`;
  }

  isSelected(card: OracleCard): boolean {
    const selected = this.activeCard();
    return !!selected && this.cardKey(selected) === this.cardKey(card);
  }

  cardMark(card: OracleCard): string {
    return card.readingsId ?? String(card.id).padStart(2, '0');
  }

  imagePath(card: OracleCard): string {
    return `/assets/cards/${card.name} (${this.cardMark(card)}).jpg`;
  }

  hasImageError(card: OracleCard): boolean {
    return this.missingImages().has(this.cardKey(card));
  }

  markImageMissing(card: OracleCard): void {
    this.missingImages.update((missing) => {
      const next = new Set(missing);
      next.add(this.cardKey(card));
      return next;
    });
  }

  private searchText(card: OracleCard): string {
    const readings =
      card.readings?.flatMap((reading) => [reading.header, reading.content]) ??
      [];
    return [
      this.cardMark(card),
      String(card.id),
      card.readingsId ?? '',
      card.name,
      card.effect ?? '',
      ...readings,
    ]
      .join(' ')
      .toLocaleLowerCase();
  }
}

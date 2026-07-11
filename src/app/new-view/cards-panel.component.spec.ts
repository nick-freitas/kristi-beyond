import { ComponentFixture, TestBed } from '@angular/core/testing';
import { deck } from '../data/vasha-deck.data';
import { CardsPanelComponent } from './cards-panel.component';

describe('CardsPanelComponent', () => {
  let component: CardsPanelComponent;
  let fixture: ComponentFixture<CardsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('keeps current deck, pool, and reading membership distinct', () => {
    expect(component.visibleCards().length).toBeGreaterThan(0);
    expect(
      component
        .visibleCards()
        .every((card) => card.equipped && !card.readingsOnly),
    ).toBeTrue();

    component.setMode('pool');
    expect(component.visibleCards().length).toBeGreaterThan(0);
    expect(
      component
        .visibleCards()
        .every((card) => !card.equipped && !card.readingsOnly),
    ).toBeTrue();

    component.setMode('readings');
    expect(
      component.visibleCards().every((card) => !!card.readings?.length),
    ).toBeTrue();
    expect(
      component.visibleCards().some((card) => card.readingsOnly),
    ).toBeTrue();
  });

  it('supports roving keyboard navigation for modes and cards', () => {
    component.onModeKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowRight' }),
      'deck',
    );
    expect(component.mode()).toBe('pool');

    const first = component.visibleCards()[0];
    const second = component.visibleCards()[1];
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    component.selectCard(first);
    component.onCardKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowDown' }),
      0,
    );
    expect(component.activeCard()).toBe(second);
  });

  it('searches card number, names, effects, and reading text from the accessible search field', () => {
    component.setMode('pool');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const search = element.querySelector<HTMLInputElement>(
      'input[type="search"]',
    )!;
    expect(
      search.getAttribute('aria-label') ?? search.labels?.[0]?.textContent,
    ).toContain('Search the archive');

    search.value = 'bardic inspiration';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.visibleCards().map((card) => card.name)).toContain(
      'The Bard',
    );
    expect(
      component.visibleCards().every((card) => card.name === 'The Bard'),
    ).toBeTrue();

    component.setSearch('00');
    expect(component.visibleCards().map((card) => card.name)).toContain(
      'The Bard',
    );
    expect(
      component.visibleCards().every((card) => card.name === 'The Bard'),
    ).toBeTrue();
  });

  it('draws an eligible equipped card at the chosen card level', () => {
    const level = component.drawLevels[0];
    component.setDrawLevel(level);
    spyOn(Math, 'random').and.returnValue(0);

    const drawn = component.drawCard();

    expect(drawn).toBeDefined();
    expect(drawn?.equipped).toBeTrue();
    expect(drawn?.level).toBe(level);
    expect(component.mode()).toBe('deck');
    expect(component.activeCard()).toBe(drawn!);
  });

  it('filters game cards by level without hiding reading-only cards in reading mode', () => {
    component.setMode('pool');
    component.setLevel(5);

    expect(component.visibleCards().length).toBeGreaterThan(0);
    expect(
      component.visibleCards().every((card) => card.level === 5),
    ).toBeTrue();

    component.setMode('readings');
    expect(
      component.visibleCards().some((card) => card.readingsOnly),
    ).toBeTrue();
  });

  it('selects a reading card and presents all of its interpretations', () => {
    component.setMode('readings');
    const readingCard = deck.find(
      (card) => card.readingsOnly && card.readings?.length,
    );
    expect(readingCard).toBeDefined();
    const selectedReading = readingCard!;

    component.selectCard(selectedReading);
    fixture.detectChanges();

    expect(component.activeCard()).toBe(selectedReading);
    const element = fixture.nativeElement as HTMLElement;
    const detail = element.querySelector<HTMLElement>('.card-detail')!;
    expect(detail.querySelector('h3')?.textContent).toContain(
      selectedReading.name,
    );
    expect(detail.querySelectorAll('.reading').length).toBe(
      selectedReading.readings!.length,
    );
  });

  it('opens with the first current-deck card selected and no repeated panel title', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(component.activeCard()).toBe(component.visibleCards()[0]);
    expect(element.querySelector('#cards-panel-title')).toBeNull();
    expect(element.textContent).not.toContain(
      'Game effects and divinations, kept in separate hands.',
    );
  });
});

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CharacterService } from '../core/character.service';
import { ModifyCharacterPage } from './modify-character.page';

describe('ModifyCharacterPage', () => {
  let fixture: ComponentFixture<ModifyCharacterPage>;
  let component: ModifyCharacterPage;
  let characterService: CharacterService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ModifyCharacterPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyCharacterPage);
    component = fixture.componentInstance;
    characterService = TestBed.inject(CharacterService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    localStorage.clear();
  });

  it('renders the complete seven-step builder and shared character', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('[role="tab"]').length).toBe(7);
    expect(element.textContent).toContain('Character Builder');
    expect(element.textContent).toContain('Vasha Taltos');
    expect(element.querySelector('.builder-masthead')).toBeNull();
    expect(element.querySelector('.builder-page__heading')).toBeNull();
    expect(component.activeStep()).toBe('home');
  });

  it('uses one name editor and finite selects for identity choices', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(
      element.querySelectorAll('input[aria-label="Character name"]').length,
    ).toBe(1);
    expect(
      element.querySelector('select[aria-label="Alignment"]'),
    ).toBeTruthy();
    expect(element.textContent).not.toContain(
      'This builder edits the same locally stored Vasha',
    );
  });

  it('navigates with next, previous, and keyboard tab controls', () => {
    component.goNext();
    expect(component.activeStep()).toBe('class');

    component.goPrevious();
    expect(component.activeStep()).toBe('home');

    component.onTabKeydown(
      new KeyboardEvent('keydown', { key: 'End' }),
      'home',
    );
    expect(component.activeStep()).toBe('next');

    component.onTabKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowRight' }),
      'next',
    );
    expect(component.activeStep()).toBe('home');
  });

  it('exposes the active tab panel without stale aria relationships', () => {
    const element = fixture.nativeElement as HTMLElement;
    const tabs = Array.from(
      element.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
    );

    expect(tabs.filter((tab) => tab.hasAttribute('aria-controls')).length).toBe(
      1,
    );
    expect(tabs[0].getAttribute('aria-controls')).toBe('builder-active-panel');
    expect(
      tabs.slice(1).every((tab) => !tab.hasAttribute('aria-controls')),
    ).toBeTrue();
  });

  it('renders every requested builder section without repeated page descriptions', () => {
    const element = fixture.nativeElement as HTMLElement;
    const expectedText: Record<string, string> = {
      home: 'Current character',
      class: 'Hit points',
      background: 'Stored skill proficiencies',
      species: 'Lineage defenses',
      abilities: 'Base score',
      equipment: 'Attuned Items',
      next: 'Open play sheet',
    };

    for (const [step, text] of Object.entries(expectedText)) {
      component.setStep(step as Parameters<ModifyCharacterPage['setStep']>[0]);
      fixture.detectChanges();
      expect(element.textContent).withContext(step).toContain(text);
      expect(element.querySelector('.builder-page__heading')).toBeNull();
    }
  });

  it('locks class identity and species-derived facts behind guided choices', () => {
    const element = fixture.nativeElement as HTMLElement;

    component.setStep('class');
    fixture.detectChanges();
    expect(
      element.querySelector('select[aria-label="Character level"]'),
    ).toBeTruthy();
    expect(element.querySelector('input[aria-label="Class name"]')).toBeNull();
    expect(element.querySelector('input[aria-label="Subclass"]')).toBeNull();
    expect(element.querySelector('select[aria-label="Hit die"]')).toBeNull();
    const proficiencies = Array.from(
      element.querySelectorAll<HTMLDetailsElement>('details'),
    ).find((details) => details.textContent?.includes('Proficiencies'));
    expect(proficiencies?.open).toBeTrue();

    component.setStep('background');
    fixture.detectChanges();
    expect(
      element.querySelector('select[aria-label="Background"]'),
    ).toBeTruthy();

    component.setStep('species');
    fixture.detectChanges();
    expect(element.querySelector('select[aria-label="Species"]')).toBeTruthy();
    expect(element.querySelector('.builder-speed-grid input')).toBeNull();
    expect(element.querySelector('.builder-racial-grid input')).toBeNull();
    expect(element.querySelector('.builder-trait-grid input')).toBeNull();
  });

  it('updates identity and currency through the shared persisted service', () => {
    characterService.updateIdentity({
      name: 'Vasha Rewritten',
      alignment: 'N',
    });
    characterService.setWealth({ gold: 321, silver: 12, copper: 8 });
    fixture.detectChanges();

    expect(component.character().name).toBe('Vasha Rewritten');
    expect(component.character().alignment).toBe('N');
    expect(component.character().wealth).toEqual({
      gold: 321,
      silver: 12,
      copper: 8,
    });
    expect(JSON.parse(localStorage.getItem('character') || '{}').name).toBe(
      'Vasha Rewritten',
    );
  });

  it('edits class level and keeps HP rolls aligned', () => {
    characterService.updatePrimaryClass({ level: 14, hitDie: 10 });
    fixture.detectChanges();

    expect(component.character().totalLevel).toBe(14);
    expect(component.character().classes[0].hitDie).toBe(10);
    expect(component.character().rolledHP.length).toBe(14);
    expect(component.character().hitDieType).toBe('d10');
  });

  it('adds unique background languages and tools and removes them', () => {
    component.newLanguage = 'Draconic';
    component.addLanguage();
    component.newLanguage = 'draconic';
    component.addLanguage();
    component.newTool = "Thieves' Tools";
    component.addTool();

    expect(
      component
        .character()
        .languages.filter((language) => language.toLowerCase() === 'draconic')
        .length,
    ).toBe(1);
    expect(component.character().tools).toContain("Thieves' Tools");

    component.removeLanguage('Draconic');
    component.removeTool("Thieves' Tools");
    expect(component.character().languages).not.toContain('Draconic');
    expect(component.character().tools).not.toContain("Thieves' Tools");
  });

  it('updates species movement, racial bonuses, and defenses as one profile', () => {
    component.selectSpecies('Hill Dwarf');

    expect(component.character().race).toBe('Hill Dwarf');
    expect(component.character().speeds.land).toBe(25);
    expect(component.character().speeds.fly).toBeUndefined();
    expect(component.character().racialAsis.Constitution).toBe(2);
    expect(component.character().racialAsis.Wisdom).toBe(1);
    expect(component.character().resistances.poison).toBeTrue();
    expect(component.character().advantages.diseasePoison).toBeTrue();
  });

  it('updates base and override ability values and recalculates derived state', () => {
    component.updateBaseAbility('Intelligence', 18);
    component.updateAbilityOverride('Strength', 20);

    expect(component.character().rolledStats.Intelligence).toBe(18);
    expect(component.character().overrideAbilityScores.Strength).toBe(20);
    expect(component.character().abilityScores.Strength).toBe(20);

    component.updateAbilityOverride('Strength', '');
    expect(
      component.character().overrideAbilityScores.Strength,
    ).toBeUndefined();
  });

  it('groups attuned inventory first and supports search and filters', () => {
    component.setStep('equipment');
    fixture.detectChanges();

    expect(component.inventoryGroups()[0].id).toBe('attuned');
    component.inventorySearch.set('cloak');
    expect(
      component
        .filteredInventory()
        .every((item) =>
          [item.name, item.category, item.notes]
            .join(' ')
            .toLowerCase()
            .includes('cloak'),
        ),
    ).toBeTrue();

    component.inventorySearch.set('');
    component.inventoryFilter.set('equipped');
    expect(
      component.filteredInventory().every((item) => item.equipped),
    ).toBeTrue();
  });

  it('adds, edits, and confirms removal of an inventory item by identity', () => {
    const startingCount = component.character().inventory.length;
    component.addInventoryItem();
    const added = component.character().inventory.at(-1)!;
    component.updateInventoryField(added, 'name', 'Moon Thread');
    component.updateInventoryNumber(
      component.character().inventory.at(-1)!,
      'qty',
      3,
    );

    const updated = component.character().inventory.at(-1)!;
    expect(updated.name).toBe('Moon Thread');
    expect(updated.qty).toBe(3);

    component.requestInventoryRemoval(updated, null);
    expect(component.inventoryRemoval()).toBe(updated);
    component.confirmInventoryRemoval();
    expect(component.character().inventory.length).toBe(startingCount);
  });

  it('treats inventory removal as a dismissible modal and restores focus', fakeAsync(() => {
    component.setStep('equipment');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const trigger = element.querySelector<HTMLButtonElement>(
      '.builder-remove-item',
    );
    expect(trigger).toBeTruthy();
    const focus = spyOn(trigger!, 'focus');

    component.requestInventoryRemoval(
      component.character().inventory[0],
      trigger,
    );
    fixture.detectChanges();
    tick();
    const dialog = element.querySelector('[role="alertdialog"]');
    expect(dialog).toBeTruthy();
    const cancelButton = dialog!.querySelector('button');
    expect(cancelButton).toBeTruthy();
    expect(document.activeElement).toBe(cancelButton);
    expect(
      element.querySelector('.builder-app')?.hasAttribute('inert'),
    ).toBeTrue();

    component.handleEscape();
    fixture.detectChanges();
    tick();
    expect(component.inventoryRemoval()).toBeNull();
    expect(focus).toHaveBeenCalled();
  }));

  it('shows a valid final review with links to both character sheets', () => {
    component.setStep('next');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const links = Array.from(element.querySelectorAll('a')).map((link) =>
      link.getAttribute('href'),
    );

    expect(component.reviewWarnings()).toEqual([]);
    expect(element.textContent).toContain('Vasha is ready to play');
    expect(links).toContain('/new-view');
    expect(links).toContain('/stats');
  });

  it('keeps visible builder controls touch-friendly without page overflow', () => {
    component.setStep('equipment');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const controls = Array.from(
      element.querySelectorAll<HTMLElement>(
        'button, a, summary, .builder-field input, .builder-field select, .builder-field textarea',
      ),
    ).filter((control) => control.offsetParent !== null);

    expect(controls.length).toBeGreaterThan(10);
    for (const control of controls.slice(0, 30)) {
      expect(control.getBoundingClientRect().height)
        .withContext(control.textContent?.trim() || control.tagName)
        .toBeGreaterThanOrEqual(44);
    }
    expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(
      document.documentElement.clientWidth + 1,
    );
  });
});

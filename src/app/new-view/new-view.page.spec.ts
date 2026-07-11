import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CharacterService } from '../core/character.service';
import {
  NEW_VIEW_WALLPAPERS,
  NewViewPage,
  selectNewViewWallpaper,
} from './new-view.page';

describe('NewViewPage', () => {
  let component: NewViewPage;
  let fixture: ComponentFixture<NewViewPage>;
  let characterService: CharacterService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [NewViewPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NewViewPage);
    component = fixture.componentInstance;
    characterService = TestBed.inject(CharacterService);
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('selects one known wallpaper for the component lifetime', () => {
    const selectedWallpaper = component.wallpaperUrl;
    const sheet = (fixture.nativeElement as HTMLElement).querySelector(
      '.nv-sheet',
    ) as HTMLElement;

    expect(NEW_VIEW_WALLPAPERS.length).toBe(7);
    expect(NEW_VIEW_WALLPAPERS).toContain(selectedWallpaper);
    expect(sheet.style.getPropertyValue('--nv-wallpaper')).toContain(
      selectedWallpaper,
    );

    component.setActiveTab('cards');
    fixture.detectChanges();

    expect(component.wallpaperUrl).toBe(selectedWallpaper);
  });

  it('maps deterministic random values to the wallpaper manifest', () => {
    expect(selectNewViewWallpaper(0)).toBe(NEW_VIEW_WALLPAPERS[0]);
    expect(selectNewViewWallpaper(0.999999)).toBe(
      NEW_VIEW_WALLPAPERS[NEW_VIEW_WALLPAPERS.length - 1],
    );
  });

  it('renders the standalone play sheet with all six in-page workspaces', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Vasha Taltos');
    expect(element.querySelectorAll('[role="tab"]').length).toBe(6);
    expect(element.textContent).toContain('Saving Throws');
    expect(element.textContent).toContain('Skills');

    component.setActiveTab('cards');
    fixture.detectChanges();
    expect(element.querySelector('app-new-view-cards-panel')).toBeTruthy();
  });

  it('does not repeat active tab names and explanatory copy inside workspaces', () => {
    const element = fixture.nativeElement as HTMLElement;
    for (const tab of [
      'actions',
      'spells',
      'inventory',
      'features',
      'notes',
    ] as const) {
      component.setActiveTab(tab);
      fixture.detectChanges();
      expect(element.querySelector('.nv-section-intro'))
        .withContext(tab)
        .toBeNull();
    }
  });

  it('shows the equipped Shortsword as an action and opens detail cards by default', () => {
    const element = fixture.nativeElement as HTMLElement;
    component.setActiveTab('actions');
    fixture.detectChanges();
    expect(element.textContent).toContain('Shortsword');
    expect(
      Array.from(
        element.querySelectorAll<HTMLDetailsElement>(
          '.nv-compact-actions details',
        ),
      ).every((details) => details.open),
    ).toBeTrue();

    component.setActiveTab('features');
    fixture.detectChanges();
    expect(
      Array.from(
        element.querySelectorAll<HTMLDetailsElement>('.nv-feature-card'),
      ).every((details) => details.open),
    ).toBeTrue();
  });

  it('supports arrow-key navigation across the workspace tabs', () => {
    component.onWorkspaceTabKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowRight' }),
      'actions',
    );

    expect(component.activeTab()).toBe('spells');
  });

  it('keeps Rage beside Inspiration instead of inside the workspace tabs', () => {
    const element = fixture.nativeElement as HTMLElement;
    const inspiration = element.querySelector('.nv-fact--inspiration');
    const rage = element.querySelector<HTMLButtonElement>('.nv-fact--rage');

    expect(rage).toBeTruthy();
    expect(inspiration?.nextElementSibling).toBe(rage);
    expect(element.querySelector('.nv-workspace .nv-rage-button')).toBeNull();
    expect(rage?.textContent).toContain('Enter rage');

    rage?.click();
    fixture.detectChanges();

    expect(characterService.character().rage).toBe(1);
    expect(rage?.textContent).toContain('Rage active');
  });

  it('keeps the settings drawer free of redundant explanatory copy', () => {
    component.openDrawer('settings', null);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent || '';
    expect(text).not.toContain(
      'All changes use the same locally saved character as the classic sheet.',
    );
    expect(text).not.toContain(
      "Restore Vasha's bundled starting state, including HP, resources, equipment, conditions, inventory notes, and wealth.",
    );
  });

  it('moves character spells into a dedicated workspace', () => {
    component.setActiveTab('spells');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const text = element.textContent || '';
    expect(element.querySelector('#nv-tab-spells')).toBeTruthy();
    expect(text).toContain('Spell Save DC');
    expect(text).toContain('Spell Attack');
    expect(text).toContain('Shocking Grasp');
    expect(text).toContain('Ray of Frost');
    expect(text).toContain('Thaumaturgy');
    expect(text).toContain('Resistance');
  });

  it('filters action entries by timing and limited use', () => {
    expect(component.actionMatches('attack')).toBeTrue();

    component.actionFilter.set('reaction');
    expect(component.actionMatches('reaction')).toBeTrue();
    expect(component.actionMatches('attack', 'action')).toBeFalse();

    component.actionFilter.set('limited');
    expect(component.actionMatches('bonus', 'limited')).toBeTrue();
    expect(component.actionMatches('reaction')).toBeFalse();
  });

  it('rolls a statistic locally and exposes the result in the dice tray', () => {
    const element = fixture.nativeElement as HTMLElement;
    const strengthButton = element.querySelector<HTMLButtonElement>(
      'button[aria-label^="Roll Strength check"]',
    );

    strengthButton?.click();
    fixture.detectChanges();

    expect(component.dice.recentHistory().length).toBe(1);
    expect(component.dice.recentHistory()[0].label).toBe('Strength check');
    expect(element.querySelector('#local-dice-tray')).toBeTruthy();
  });

  it('applies inherent skill advantage and cancels opposing roll modes', () => {
    const athletics = component.skills.find(
      (skill) => skill.key === 'athletics',
    )!;
    characterService.toggleRage();

    component.rollSkill(athletics);
    expect(component.dice.recentHistory()[0].mode).toBe('advantage');

    component.rollMode.set('disadvantage');
    component.rollSkill(athletics);
    expect(component.dice.recentHistory()[0].mode).toBe('normal');

    component.rollMode.set('normal');
    const perception = component.skills.find(
      (skill) => skill.key === 'perception',
    )!;
    component.rollSkill(perception);
    expect(component.dice.recentHistory()[0].mode).toBe('advantage');
  });

  it('keeps primary tablet controls at touch-friendly sizes', () => {
    component.skillsCollapsed.set(false);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const controls = [
      element.querySelector<HTMLElement>('.nv-ability'),
      element.querySelector<HTMLElement>('.nv-skill'),
      element.querySelector<HTMLElement>('.nv-tabs button'),
      element.querySelector<HTMLElement>('.nv-dice-launcher'),
    ];

    for (const control of controls) {
      expect(control).withContext('expected control to render').not.toBeNull();
      expect(control!.getBoundingClientRect().height).toBeGreaterThanOrEqual(
        44,
      );
    }
  });

  it('keeps collapsed tablet rails above the workspace without horizontal overflow', () => {
    const element = fixture.nativeElement as HTMLElement;
    const sheet = element.querySelector<HTMLElement>('.nv-sheet')!;
    const playSpace = element.querySelector<HTMLElement>('.nv-play-space')!;
    const referenceRail =
      element.querySelector<HTMLElement>('.nv-reference-rail')!;
    const skillsPanel = element.querySelector<HTMLElement>('.nv-skills-panel')!;
    const reference = element.querySelector<HTMLElement>(
      '.nv-reference-content',
    )!;

    expect(window.matchMedia('(max-width: 1060px)').matches).toBeTrue();
    expect(
      referenceRail.compareDocumentPosition(skillsPanel) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      skillsPanel.compareDocumentPosition(playSpace) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(getComputedStyle(reference).display).toBe('none');
    expect(sheet.scrollWidth).toBeLessThanOrEqual(sheet.clientWidth + 1);
  });

  it('opens the requested rest in the shared recovery drawer', () => {
    const element = fixture.nativeElement as HTMLElement;
    const shortRest = Array.from(element.querySelectorAll('button')).find(
      (button) => button.textContent?.includes('Short rest'),
    );

    shortRest?.click();
    fixture.detectChanges();

    expect(component.activeDrawer()).toBe('rest');
    expect(component.restConfirmation()).toBe('short');
    expect(element.querySelector('[role="dialog"]')).toBeTruthy();
    expect(document.body.style.overflow).toBe('hidden');

    component.closeDrawer();
    fixture.detectChanges();
    expect(document.body.style.overflow).toBe('');
  });

  it('applies short and long rest recovery through confirmation', () => {
    characterService.scry();
    characterService.convergentReturn();
    characterService.shareDestiny();
    characterService.pastKnowledge();
    characterService.telepathicDetectThoughts();
    characterService.useVecnaLink();
    characterService.takeDamage(10);

    component.requestRest('short');
    component.applyRest();

    expect(characterService.character().featureUsages.scry).toBe(0);
    expect(characterService.character().featureUsages.convergentReturn).toBe(0);
    expect(characterService.character().featureUsages.sharedDestiny).toBe(0);
    expect(characterService.character().featureUsages.pastKnowledge).toBe(1);

    component.requestRest('long');
    component.applyRest();

    expect(characterService.character().currentHp).toBe(
      characterService.character().totalMaxHP,
    );
    expect(characterService.character().featureUsages.pastKnowledge).toBe(0);
    expect(
      characterService.character().featureUsages.telepathicDetectThoughts,
    ).toBe(0);
    expect(characterService.character().featureUsages.vecnasLink).toBe(0);
  });

  it('manages feature uses, inspiration, death saves, and hit dice', () => {
    const usageFeatures = component.featureGroups
      .flatMap((group) => group.features)
      .filter((feature) => feature.usage);
    const scryFeature = usageFeatures.find(
      (feature) => feature.usage?.key === 'scry',
    )!;

    for (const feature of usageFeatures) component.useFeature(feature);
    component.useFeature(scryFeature);
    characterService.toggleInspiration();
    characterService.passDeathSave();
    characterService.failDeathSave();
    const hitDiceBefore = characterService.character().currentHitDie || 0;
    component.changeHitDice(-1);

    for (const feature of usageFeatures) {
      expect(characterService.character().featureUsages[feature.usage!.key])
        .withContext(feature.name)
        .toBe(1);
    }
    expect(characterService.character().inspiration).toBe(1);
    expect(characterService.character().deathPasses).toBe(1);
    expect(characterService.character().deathFails).toBe(1);
    expect(characterService.character().currentHitDie).toBe(hitDiceBefore - 1);

    characterService.resetDeathSaves();
    expect(characterService.character().deathSaves).toEqual([]);
  });

  it("offers Shared Destiny and Vecna's Link where their actions are used", () => {
    const element = fixture.nativeElement as HTMLElement;
    const actionDetails = Array.from(element.querySelectorAll('details'));
    const drawCard = actionDetails.find((details) =>
      details.querySelector('summary')?.textContent?.includes('Draw Card'),
    )!;
    const sharedDestiny = Array.from(drawCard.querySelectorAll('button')).find(
      (button) => button.textContent?.includes('Use Shared Destiny'),
    )!;
    const vecna = actionDetails.find((details) =>
      details.querySelector('summary')?.textContent?.includes("Vecna's Link"),
    )!;
    const useVecna = vecna.querySelector('button')!;

    sharedDestiny.click();
    sharedDestiny.click();
    useVecna.click();
    fixture.detectChanges();

    expect(characterService.character().featureUsages.sharedDestiny).toBe(2);
    expect(characterService.character().featureUsages.vecnasLink).toBe(1);
    expect(sharedDestiny.disabled).toBeTrue();
    expect(useVecna.disabled).toBeTrue();
  });

  it('keeps the complete character-specific memory and feat details', () => {
    component.setActiveTab('features');
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent || '';
    expect(text).toContain('temporarily scarred');
    expect(text).toContain('1. You recall a physically painful moment');
    expect(text).toContain('6. A memory carries a vivid smell or sensation');
    expect(text).toContain('Vasha selected Wisdom');
  });

  it('manages equipment, attunement, inventory notes, and wealth', () => {
    const stowedItem = characterService
      .character()
      .inventory.find((item) => !item.equipped)!;
    const attunedItem = characterService
      .character()
      .inventory.find((item) => item.requiresAttunement && item.isAttuned)!;
    const startingGold = characterService.character().wealth.gold;

    component.toggleEquipment(stowedItem);
    component.toggleAttunement(attunedItem);
    characterService.modAdditionalInventory('QA: silver prophecy token');
    component.wealthCurrency = 'gold';
    component.wealthAmount = 12;
    component.applyWealth(1);

    expect(
      characterService
        .character()
        .inventory.find((item) => item.name === stowedItem.name)?.equipped,
    ).toBeTrue();
    expect(
      characterService
        .character()
        .inventory.find((item) => item.name === attunedItem.name)?.isAttuned,
    ).toBeFalse();
    expect(characterService.character().additionalInventory).toContain(
      'silver prophecy token',
    );
    expect(characterService.character().wealth.gold).toBe(startingGold + 12);
  });

  it('groups attuned inventory before remaining items and calculates weight', () => {
    component.setActiveTab('inventory');
    fixture.detectChanges();

    expect(component.attunedInventory().length).toBeGreaterThan(0);
    expect(
      component.attunedInventory().every((item) => item.isAttuned),
    ).toBeTrue();
    expect(
      component.otherInventory().every((item) => !item.isAttuned),
    ).toBeTrue();
    expect(component.carriedWeight()).toBeGreaterThan(0);

    const element = fixture.nativeElement as HTMLElement;
    const groups = Array.from(element.querySelectorAll('.nv-inventory-group'));
    expect(groups[0]?.textContent).toContain('Attuned Items');
    expect(groups[1]?.textContent).toContain('Other Inventory');
  });

  it('manages GP, SP, and CP together in the coin drawer without negative totals', () => {
    const starting = { ...characterService.character().wealth };
    component.openDrawer('coin', null);
    component.coinDraft.gold = 5;
    component.coinDraft.silver = 4;
    component.coinDraft.copper = 3;
    component.applyCoinDraft(1);

    expect(characterService.character().wealth).toEqual({
      gold: starting.gold + 5,
      silver: starting.silver + 4,
      copper: starting.copper + 3,
    });
    expect(component.coinDraft).toEqual({ gold: 0, silver: 0, copper: 0 });

    component.coinDraft.gold = characterService.character().wealth.gold + 100;
    component.applyCoinDraft(-1);
    expect(characterService.character().wealth.gold).toBe(0);

    component.coinDraft.silver = 9;
    component.clearCoinDraft();
    expect(component.coinDraft).toEqual({ gold: 0, silver: 0, copper: 0 });
  });

  it('requires confirmation and restores the complete bundled state', () => {
    characterService.toggleCondition('blinded');
    characterService.modAdditionalInventory('temporary QA note');

    component.resetCharacter();
    expect(component.resetConfirmation()).toBeTrue();
    expect(characterService.character().conditions.blinded).toBeTrue();

    component.resetCharacter();
    expect(characterService.character().conditions.blinded).toBeFalsy();
    expect(characterService.character().additionalInventory).toBe('');
  });

  it('applies damage through the HP drawer using the shared character state', () => {
    const startingHp = characterService.character().currentHp || 0;
    component.openDrawer('hp', null);
    component.hpAmount = 5;
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    element
      .querySelector<HTMLButtonElement>('[data-testid="apply-damage"]')
      ?.click();
    fixture.detectChanges();

    expect(characterService.character().currentHp).toBe(startingHp - 5);
    expect(component.activeDrawer()).toBe('hp');

    component.hpAmount = 3;
    component.applyHealing();
    component.tempHpDraft = 4;
    component.applyTempHp();

    expect(characterService.character().currentHp).toBe(startingHp - 2);
    expect(characterService.character().tempHp).toBe(4);
  });

  it('ignores empty numeric management fields', () => {
    const before = characterService.character();
    component.tempHpDraft = null;
    component.maxHpModifierDraft = null;
    component.wealthAmount = null;

    component.applyTempHp();
    component.applyMaxHpModifier();
    component.applyWealth(1);

    expect(characterService.character().tempHp).toBe(before.tempHp);
    expect(characterService.character().maxHpModifier).toBe(
      before.maxHpModifier,
    );
    expect(characterService.character().wealth.gold).toBe(before.wealth.gold);
  });

  it('tracks every condition type, including bounded exhaustion', () => {
    const blinded = component.conditions.find(
      (condition) => condition.key === 'blinded',
    );
    expect(blinded).toBeDefined();

    component.toggleCondition(blinded!);
    component.changeExhaustion(1);

    expect(characterService.character().conditions.blinded).toBeTrue();
    expect(characterService.character().conditions.exhaustion).toBe(1);
    expect(component.activeConditionLabels()).toContain('Exhaustion 1');
    expect(component.conditionIsDisabled('magicalSleep')).toBeTrue();
  });
});

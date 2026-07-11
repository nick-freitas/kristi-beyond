import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './routes';
import { NewViewPage } from './new-view/new-view.page';
import { ModifyCharacterPage } from './modify-character/modify-character.page';

describe('application routes', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('renders the standalone character sheet at /new-view', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });

    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/new-view', NewViewPage);

    expect(page).toBeTruthy();
    expect(harness.routeNativeElement?.tagName).toBe('APP-NEW-VIEW');
    expect(harness.routeNativeElement?.textContent).toContain('Vasha Taltos');
  });

  it('renders the standalone builder at /modify-character', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });

    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl(
      '/modify-character',
      ModifyCharacterPage,
    );

    expect(page).toBeTruthy();
    expect(harness.routeNativeElement?.tagName).toBe('APP-MODIFY-CHARACTER');
    expect(harness.routeNativeElement?.textContent).toContain(
      'Character Builder',
    );
  });

  it('persists a builder edit into the standalone play sheet', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/modify-character', ModifyCharacterPage);

    const nameInput = harness.routeNativeElement?.querySelector(
      'input[aria-label="Character name"]',
    ) as HTMLInputElement;
    nameInput.value = 'Vasha QA';
    nameInput.dispatchEvent(new Event('change', { bubbles: true }));
    harness.detectChanges();

    expect(localStorage.getItem('character')).toContain('Vasha QA');

    await harness.navigateByUrl('/new-view', NewViewPage);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe(
      'Vasha QA',
    );
  });
});

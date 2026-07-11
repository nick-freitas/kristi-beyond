import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { provideRouter } from '@angular/router';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links to the new view next to the classic portrait', () => {
    const actions = fixture.nativeElement.querySelector(
      '.classic-sheet-actions',
    ) as HTMLElement | null;

    expect(actions).withContext('classic sheet actions').not.toBeNull();
    if (!actions) return;

    const link = actions.querySelector('a') as HTMLAnchorElement | null;
    const portrait = actions.querySelector('p-avatar');

    expect(link?.textContent?.trim()).toBe('New View');
    expect(link?.getAttribute('href')).toBe('/new-view');
    expect(link?.nextElementSibling).toBe(portrait);
  });
});

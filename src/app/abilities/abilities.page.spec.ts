import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesPage } from './abilities.page';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AbilitiesComponent', () => {
  let component: AbilitiesPage;
  let fixture: ComponentFixture<AbilitiesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilitiesPage, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AbilitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

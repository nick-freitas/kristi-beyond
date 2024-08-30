import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesPage } from './abilities.page';

describe('AbilitiesComponent', () => {
  let component: AbilitiesPage;
  let fixture: ComponentFixture<AbilitiesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilitiesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AbilitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

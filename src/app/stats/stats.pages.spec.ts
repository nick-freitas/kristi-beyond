import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPages } from './stats.pages';

describe('StatsComponent', () => {
  let component: StatsPages;
  let fixture: ComponentFixture<StatsPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsPages],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

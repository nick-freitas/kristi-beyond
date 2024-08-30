import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityLineComponent } from './ability-line.component';

describe('AbilityLineComponent', () => {
  let component: AbilityLineComponent;
  let fixture: ComponentFixture<AbilityLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilityLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbilityLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

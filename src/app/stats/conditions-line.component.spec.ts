import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsLineComponent } from './conditions-line.component';

describe('ConditionsLineComponent', () => {
  let component: ConditionsLineComponent;
  let fixture: ComponentFixture<ConditionsLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionsLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

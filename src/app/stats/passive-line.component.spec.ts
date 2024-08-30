import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveLineComponent } from './passive-line.component';

describe('PassiveLineComponent', () => {
  let component: PassiveLineComponent;
  let fixture: ComponentFixture<PassiveLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassiveLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassiveLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionLineComponent } from './interaction-line.component';

describe('InteractionLineComponent', () => {
  let component: InteractionLineComponent;
  let fixture: ComponentFixture<InteractionLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractionLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

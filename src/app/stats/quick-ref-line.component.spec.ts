import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRefLineComponent } from './quick-ref-line.component';

describe('QuickRefLineComponent', () => {
  let component: QuickRefLineComponent;
  let fixture: ComponentFixture<QuickRefLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickRefLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickRefLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

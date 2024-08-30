import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLineComponent } from './save-line.component';

describe('SaveLineComponent', () => {
  let component: SaveLineComponent;
  let fixture: ComponentFixture<SaveLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

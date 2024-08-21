import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalLayout } from './journal.layout';

describe('JournalLayout', () => {
  let component: JournalLayout;
  let fixture: ComponentFixture<JournalLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalLayout]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

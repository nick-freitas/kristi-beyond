import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-standalone-sheet-stub',
  standalone: true,
  template: '<p>Standalone sheet</p>',
})
class StandaloneSheetStub {}

@Component({
  selector: 'app-classic-stats-stub',
  standalone: true,
  template: '<p>Classic stats</p>',
})
class ClassicStatsStub {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [
        provideRouter([
          { path: 'new-view', component: StandaloneSheetStub },
          { path: 'stats', component: ClassicStatsStub },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('hides global chrome only on the standalone sheet route', async () => {
    await router.navigateByUrl('/new-view');
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-nav')).toBeNull();
    expect(element.querySelector('p-toast')).toBeNull();
    expect(element.querySelector('p-scrolltop')).toBeNull();
    expect(element.textContent).toContain('Standalone sheet');

    await router.navigateByUrl('/stats');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelector('app-nav')).not.toBeNull();
    expect(element.querySelector('p-toast')).not.toBeNull();
    expect(element.querySelector('p-scrolltop')).not.toBeNull();
    expect(element.textContent).toContain('Classic stats');
  });
});

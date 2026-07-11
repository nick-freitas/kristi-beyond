import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ToastModule } from 'primeng/toast';
import { filter, map, startWith } from 'rxjs';
import { NavComponent } from './core/nav.component';
import { isStandaloneSheetRoute } from './core/route-shell';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    ScrollTopModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    @if (showGlobalChrome()) {
      <p-toast />
      <app-nav />
    }
    <router-outlet />
    @if (showGlobalChrome()) {
      <p-scrollTop />
    }
  `,
  styles: ``,
})
export class AppComponent implements OnInit {
  private readonly primengConfig = inject(PrimeNGConfig);
  private readonly router = inject(Router);

  protected readonly showGlobalChrome = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(
        (event) => !isStandaloneSheetRoute(event.url, event.urlAfterRedirects),
      ),
      startWith(!isStandaloneSheetRoute(window.location.pathname)),
    ),
    { requireSync: true },
  );

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}

import { bootstrapApplication } from '@angular/platform-browser';
import { Component, inject, OnInit } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app/routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavComponent } from './app/core/nav.component';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ScrollTopModule } from 'primeng/scrolltop';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

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
    <p-toast />

    <app-nav />
    <router-outlet />
    <p-scrollTop />
  `,
  styles: ``,
})
class AppComponent implements OnInit {
  primengConfig = inject(PrimeNGConfig);

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideAnimationsAsync()],
}).catch((err) => console.error(err));

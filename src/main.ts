import { bootstrapApplication } from '@angular/platform-browser';
import { Component} from "@angular/core";
import {provideRouter, RouterOutlet} from "@angular/router";
import { routes } from './app/app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: `
  `
})
class AppComponent {
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}).catch((err) => console.error(err));

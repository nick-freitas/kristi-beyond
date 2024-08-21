import { Routes } from '@angular/router';
import { StatsComponent } from './stats.component';
import { JournalLayout } from './journal.layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: JournalLayout,
    children: [{ path: '', pathMatch: 'full', component: StatsComponent }],
  },
];

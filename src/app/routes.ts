import { Routes } from '@angular/router';
import { StatsPages } from './stats/stats.pages';
import { ConfigPage } from './config/config.page';
import { AbilitiesPage } from './abilities/abilities.page';
import { ActionsComponent } from './actions/actions.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { InventoryComponent } from './inventory/inventory.component';
import { CardsComponent } from './cards/cards.component';
import { TarotComponent } from './tarot/tarot.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'stats' },
  { path: 'stats', pathMatch: 'full', component: StatsPages },
  { path: 'abilities', pathMatch: 'full', component: AbilitiesPage },
  { path: 'actions', pathMatch: 'full', component: ActionsComponent },
  { path: 'equipment', pathMatch: 'full', component: EquipmentComponent },
  { path: 'inventory', pathMatch: 'full', component: InventoryComponent },
  { path: 'cards', pathMatch: 'full', component: CardsComponent },
  { path: 'tarot', pathMatch: 'full', component: TarotComponent },
  { path: 'configs', pathMatch: 'full', component: ConfigPage },
];

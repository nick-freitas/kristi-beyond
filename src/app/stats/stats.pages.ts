import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';
import { AbilityLineComponent } from './ability-line.component';
import { SaveLineComponent } from './save-line.component';
import { QuickRefLineComponent } from './quick-ref-line.component';
import { InteractionLineComponent } from './interaction-line.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { SkillsComponent } from './skills.component';
import { ConditionsLineComponent } from './conditions-line.component';
import { ProficienciesComponent } from './proficiencies.component';
import { TopLineComponent } from './top-line.component';
import { PassiveLineComponent } from './passive-line.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  imports: [
    CardModule,
    NgIf,
    AbilityLineComponent,
    SaveLineComponent,
    QuickRefLineComponent,
    InteractionLineComponent,
    SpeedDialModule,
    ToastModule,
    SkillsComponent,
    ConditionsLineComponent,
    ProficienciesComponent,
    TopLineComponent,
    PassiveLineComponent,
    ScrollTopModule,
    MessagesModule,
  ],
  providers: [MessageService],
  template: `
    <app-top-line />
    <app-interaction-line />
    <app-conditions-line />
    <app-quick-ref-line />
    <app-ability-line />
    <app-save-line />
    <app-skills />
    <app-passive-line />
    <app-proficiencies />
  `,
  styles: `
    :host {
      @apply p-8 gap-8 grid;
    }
  `,
})
export class StatsPages {}

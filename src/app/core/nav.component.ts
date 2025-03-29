import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
  ],
  template: `
    <nav class="border-0">
      <p-menubar [model]="items">
        <ng-template pTemplate="item" let-item>
          <ng-container *ngIf="item.route; else urlRef">
            <a [routerLink]="item.route" class="p-menuitem-link">
              <span [class]="item.icon"></span>
              <span>{{ item.label }}</span>
            </a>
          </ng-container>
          <ng-template #urlRef>
            <a
              *ngIf="item.url; else noLink"
              [href]="item.url"
              class="p-menuitem-link"
            >
              <span [class]="item.icon"></span>
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </ng-template>
          <ng-template #noLink>
            <div class="p-menuitem-link">
              <span [class]="item.icon"></span>
              <span class="ml-2">{{ item.label }}</span>
              <span class="pi pi-fw pi-angle-down ml-2"></span>
            </div>
          </ng-template>
        </ng-template>
        <ng-template pTemplate="end">
          <div class="flex align-items-center gap-2">
            <p-avatar image="/assets/propic.png" size="xlarge" />
          </div>
        </ng-template>
      </p-menubar>
    </nav>
  `,
  styles: ``,
})
export class NavComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Stats',
        route: 'stats',
      },
      {
        label: 'Abilities',
        route: 'abilities',
      },
      {
        label: 'Actions',
        route: 'actions',
        // disabled: true,
      },
      {
        label: 'Equipment',
        route: 'equipment',
      },
      {
        label: 'Inventory',
        route: 'inventory',
      },
      {
        label: 'Cards',
        route: 'cards',
      },
      {
        label: 'Tarot',
        route: 'tarot',
      },
      {
        label: 'Configs',
        route: 'configs',
      },
    ];
  }
}

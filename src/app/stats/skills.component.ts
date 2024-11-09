import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CharacterService } from '../core/character.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { NgIf } from '@angular/common';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CardModule,
    InputSwitchModule,
    FormsModule,
    ChipModule,
    NgIf,
    BadgeModule,
  ],
  template: `
    <p-card header="Skills" class="grow">
      <div
        class="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 text-3xl gap-6"
      >
        <!--Acrobatics-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Acrobatics (Dex) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.acrobatics"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.acrobatics
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Animal Handling-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Animal Handling (Wis) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.animalHandling"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.animalHandling
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Arcana-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Arcana (Int) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.arcana"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.arcana
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Athletics-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Athletics (Str) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.athletics"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.athletics
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Deception-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Deception (Cha) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.deception"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.deception
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--History-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> History (Int) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.history"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.history
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Insight-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Insight (Wis) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.insight"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.insight
                ? 'success'
                : 'secondary'
            "
          />
          <p-badge value="x2 Adv" badgeSize="large" />
        </div>

        <!--Intimidation-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Intimidation (Cha) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.intimidation"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.intimidation
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Investigation-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Investigation (Int) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.investigation"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.investigation
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Medicine-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Medicine (Wis) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.medicine"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.medicine
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Nature-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Nature (Int) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.nature"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.nature
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Perception-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Perception (Wis) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.perception"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.perception
                ? 'success'
                : 'secondary'
            "
          />
          <p-badge value="x2 Adv" badgeSize="large" />
        </div>

        <!--Performance-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Performance (Cha) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.performance"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.performance
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Persuasion-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Persuasion (Cha) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.persuasion"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.persuasion
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Religion-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Religion (Int) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.religion"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.religion
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Sleight of Hand-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium">Sleight of Hand (Dex)</span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.sleightOfHand"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.sleightOfHand
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Stealth-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Stealth (Dex) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.stealth"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.stealth
                ? 'success'
                : 'secondary'
            "
          />
        </div>

        <!--Survival-->
        <div>
          <p-chip styleClass="pl-0 pr-3">
            <span class="ml-2 font-medium"> Survival (Wis) </span>
          </p-chip>
          <p-badge
            [value]="characterService.character().skillModifiers.survival"
            badgeSize="large"
            [severity]="
              characterService.character().skillProficiencies.survival
                ? 'success'
                : 'secondary'
            "
          />
        </div>
      </div>
    </p-card>
  `,
  styles: `
    :host {
      @apply grid;
    }
  `,
})
export class SkillsComponent {
  characterService: CharacterService = inject(CharacterService);
}

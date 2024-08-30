import { Component, inject } from '@angular/core';
import { ChipsModule } from 'primeng/chips';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../core/character.service';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [ChipsModule, Button, FormsModule, MessagesModule],
  template: `
    <div>
      <div class="flex flex-row w-full">
        <input
          type="text"
          class="grow flex w-full"
          pInputText
          [(ngModel)]="cmd"
        />
        <p-button label="Submit" (click)="submit()" />
      </div>
      <p class="text-sm italic">
        'reload' to reload the initial character sheet
      </p>
    </div>
  `,
  styles: `
    :host {
      @apply p-8 grid;
    }

    p-button button {
      width: 100%;
    }
  `,
})
export class ConfigPage {
  characterService: CharacterService = inject(CharacterService);
  cmd: string | undefined;

  submit() {
    switch (this.cmd?.trim()?.toLowerCase()) {
      case 'reload':
        this.characterService.reloadCharacter();
        this.cmd = 'RELOADED FRESH CHARACTER';
        return;
      default:
        this.cmd = 'UNKNOWN CMD ' + this.cmd;
    }
  }
}

import {Component, output} from '@angular/core';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-mod-filter',
  imports: [
    MatCheckbox,
    MatCard
  ],
  templateUrl: './mod-filter.html',
  styleUrl: './mod-filter.css'
})
export class ModFilter {

  mods: Mod[] = [
    {
      id: 'HOF-general',
      name: "Heaps of Food",
      isSelected: true
    },
    {
      id: 'HOF-gorge',
      name: 'Heaps of Food - Gorge',
      isSelected: true
    },
    {
      id: 'HOF-hallowedNights',
      name: 'Heaps of Food - Hallowed Nights',
      isSelected: false
    },
    {
      id: 'HOF-hamlet',
      name: 'Heaps of Food - Hamlet',
      isSelected: true
    },
    {
      id: 'HOF-shipwrecked',
      name: 'Heaps of Food - Shipwrecked',
      isSelected: true
    },
    {
      id: 'HOF-winterFeast',
      name: 'Heaps of Food - Winter Feast',
      isSelected: false
    }]

  selection: ModName[] = ["HOF-general", "HOF-gorge", "HOF-hamlet", "HOF-shipwrecked"];
  selectedMods = output<ModName[]>();

  onModChange(event: MatCheckboxChange): void {
    let modId = event.source.value as ModName;
    this.mods.find(mod => mod.id === modId)!.isSelected = event.checked;
    if (event.checked) {
      this.selection.push(modId);
    } else {
      const index = this.selection.indexOf(modId);
      if (index > -1) {
        this.selection.splice(index, 1);
      }
    }
    this.selectedMods.emit(this.selection);
  }
}

export type Mod = {
  id: ModName;
  name: string;
  isSelected: boolean;
}

export type ModName =
  'HOF-general'
  | 'HOF-gorge'
  | 'HOF-hallowedNights'
  | 'HOF-hamlet'
  | 'HOF-shipwrecked'
  | 'HOF-winterFeast';

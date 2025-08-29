import {Component, input, output} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {CookingStation, cookingStationNames} from '../../dish/dish.service';
import {CollectibleDish} from '../completion-help';

@Component({
  selector: 'app-completion-grid',
  imports: [
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './completion-grid.html',
  styleUrl: './completion-grid.css'
})
export class CompletionGrid {
  dishes = input.required<CollectibleDish[]>();
  columnsToDisplay = ['select', 'image', 'name', 'cookingStation', 'requirements'];
  completeDish = output<CollectibleDish>()
  uncompleteDish = output<CollectibleDish>()

  onSelectDish(dish: CollectibleDish) {
    if (!dish.completed) {
      this.completeDish.emit(dish);
    } else {
      this.uncompleteDish.emit(dish);
    }
  }

  getCookingStationName(name: string): string {
    return cookingStationNames[name as CookingStation] || name;
  }
}

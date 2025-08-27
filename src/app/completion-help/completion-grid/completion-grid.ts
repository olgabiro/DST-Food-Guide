import {Component, input, OnInit, output} from '@angular/core';
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
import {CookingStation, cookingStationNames, Dish} from '../../dish/dish.service';
import {SelectionModel} from '@angular/cdk/collections';
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
export class CompletionGrid implements OnInit {
  dishes = input.required<CollectibleDish[]>();
  columnsToDisplay = ['select', 'name', 'cookingStation', 'requirements'];
  selection = new SelectionModel<Dish>(true, []);
  completeDish = output<CollectibleDish>()
  uncompleteDish = output<CollectibleDish>()

  ngOnInit() {
    this.dishes()
      .filter(dish => dish.completed)
      .forEach(dish => this.selection.select(dish));
  }

  onSelectDish(dish: CollectibleDish) {
    this.selection.toggle(dish);
    if (this.selection.isSelected(dish)) {
      this.completeDish.emit(dish);
    } else {
      this.uncompleteDish.emit(dish);
    }
  }

  getCookingStationName(name: string): string {
    return cookingStationNames[name as CookingStation] || name;
  }
}

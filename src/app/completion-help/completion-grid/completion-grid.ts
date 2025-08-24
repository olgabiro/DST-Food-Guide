import {Component, input, OnInit} from '@angular/core';
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
import {Dish, DishesService} from '../../dish/dishes.service';
import {SelectionModel} from '@angular/cdk/collections';

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
  dishes = input.required<Dish[]>();
  columnsToDisplay = ['select', 'name'];
  selection = new SelectionModel<Dish>(true, []);

  constructor(private readonly dishesService: DishesService) {

  }

  ngOnInit() {
    this.dishes()
      .filter(dish => localStorage.getItem(dish.name) !== null)
      .forEach(dish => this.selection.select(dish));
  }

  onSelectDish(dish: Dish) {
    this.selection.toggle(dish);
    if (this.selection.isSelected(dish)) {
      localStorage.setItem(dish.name, "completed");
    } else {
      localStorage.removeItem(dish.name);
    }
  }
}

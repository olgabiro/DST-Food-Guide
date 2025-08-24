import {Component, signal} from '@angular/core';
import {CompletionGrid} from './completion-grid/completion-grid';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {Dish, DishService} from '../dish/dish.service';


@Component({
  selector: 'app-completion-help',
  imports: [
    CompletionGrid,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatCheckbox
  ],
  templateUrl: './completion-help.html',
  styleUrl: './completion-help.css'
})
export class CompletionHelp {
  filterText: string = "";
  hideSelected: boolean = false;
  allDishes: Dish[] = [];
  dishes = signal<Dish[]>([]);

  constructor(private readonly dishesService: DishService) {
    this.allDishes = this.dishesService.getDishes().sort((a, b) => a.name.localeCompare(b.name));
    this.dishes.set(this.allDishes);
  }

  onHideSelectedChange() {
    this.hideSelected = !this.hideSelected;
    this.updateDishes();
  }

  onSearchChange() {
    this.updateDishes();
  }

  private updateDishes() {
    const filter = this.filterText.toLowerCase();
    this.dishes.set(this.allDishes
      .filter(dish => dish.name.toLowerCase().includes(filter) || dish.requirements?.toLowerCase().includes(filter))
      .filter(dish => this.hideSelected ? localStorage.getItem(dish.name) === null : true)
    );
  }
}

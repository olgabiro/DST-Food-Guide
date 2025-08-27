import {Component, signal} from '@angular/core';
import {CompletionGrid} from './completion-grid/completion-grid';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {CookingStation, cookingStationNames, Dish, DishService} from '../dish/dish.service';
import {ModFilter, ModName} from '../mod-filter/mod-filter';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {PercentPipe} from '@angular/common';

@Component({
  selector: 'app-completion-help',
  imports: [
    CompletionGrid,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatCheckbox,
    ModFilter,
    MatSelect,
    MatOption,
    PercentPipe
  ],
  templateUrl: './completion-help.html',
  styleUrl: './completion-help.css'
})
export class CompletionHelp {
  filterText: string = "";
  hideCompleted: boolean = false;
  allDishes: CollectibleDish[] = [];
  completedCount = 0;
  selectedMods: ModName[] = ["HOF-general", "HOF-gorge", "HOF-hamlet", "HOF-shipwrecked"];
  selectedCookingStations: CookingStation[] = [];
  dishes = signal<CollectibleDish[]>([]);

  constructor(private readonly dishesService: DishService) {
    this.loadDishes();
    this.dishes.set(this.allDishes);
  }

  onHideCompletedChange() {
    this.hideCompleted = !this.hideCompleted;
    this.updateDishes();
  }

  onSearchChange() {
    this.updateDishes();
  }

  private updateDishes() {
    const filter = this.filterText.toLowerCase();
    this.dishes.set(this.allDishes
      .filter(dish => dish.name.toLowerCase().includes(filter) || dish.requirements?.toLowerCase().includes(filter))
      .filter(dish => this.selectedCookingStations.length === 0 ? true : this.selectedCookingStations.includes(dish.cookingStation))
      .filter(dish => this.hideCompleted ? !dish.completed : true)
    );
  }

  private loadDishes() {
    this.allDishes = this.dishesService.getDishes(this.selectedMods)
      .map(dish => this.dishToCollectibleDish(dish))
      .sort((a, b) => a.name.localeCompare(b.name));
    this.completedCount = this.allDishes.filter(dish => dish.completed).length
  }

  onModsSelected(mods: ModName[]) {
    this.selectedMods = mods;
    this.loadDishes();
    this.updateDishes();
  }

  onCookingStationsSelected(event: MatSelectChange) {
    this.selectedCookingStations = event.value;
    this.updateDishes();
  }

  onCompletedDish(dish: CollectibleDish) {
    let dishName = dish.name;
    localStorage.setItem(dishName, "completed");
    dish.completed = true;
    this.completedCount++;
    this.updateDishes();
  }

  onUncompletedDish(dish: CollectibleDish) {
    let dishName = dish.name;
    localStorage.removeItem(dishName);
    dish.completed = false;
    this.completedCount--;
    this.updateDishes();
  }

  protected readonly cookingStationNames = cookingStationNames;

  dishToCollectibleDish(dish: Dish): CollectibleDish {
    return {
      ...dish,
      completed: localStorage.getItem(dish.name) !== null
    };
  }
}


export interface CollectibleDish extends Dish {
  completed: boolean
}

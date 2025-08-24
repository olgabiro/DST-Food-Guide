import {Component, OnInit} from '@angular/core';
import {Dish, DishService} from '../dish.service';
import {DishComponent} from '../dish';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatFormField, MatLabel, MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-dish-list',
  imports: [
    DishComponent,
    MatGridList,
    MatGridTile,
    MatSelect,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
    MatOption,
    MatCheckbox
  ],
  templateUrl: './dish-list.html',
  styleUrl: './dish-list.css'
})
export class DishList implements OnInit {

  dishes: Dish[] = [];
  searchTerm: string = '';
  sortBy: keyof Dish = 'name';
  ascending: boolean = true;

  constructor(private readonly service: DishService) {
  }

  ngOnInit() {
    this.dishes = this.service.getDishes();
    this.onSortChange();
  }

  onSearchChange(event: Event) {
    this.dishes = this.service.getDishes().filter(dish =>
      dish.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.onSortChange()
  }

  onSortChange() {
    this.dishes.sort((a, b) => {
      return this.ascending ? this.compareDishesAscending(a, b) : this.compareDishesAscending(b, a);
    });
  }

  private compareDishesAscending(a: Dish, b: Dish): 1 | -1 | 0 {
    let valueA = a[this.sortBy] ?? "";
    let valueB = b[this.sortBy] ?? "";
    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  }

  onAscendingChange() {
    this.ascending = !this.ascending;
    this.onSortChange();
  }
}

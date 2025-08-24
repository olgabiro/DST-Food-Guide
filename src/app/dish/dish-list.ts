import {Component, OnInit} from '@angular/core';
import {Dish, DishesService} from './dishes.service';
import {DishComponent} from './dish';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatFormField, MatLabel, MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

@Component({
  selector: 'app-dish-list',
  imports: [
    DishComponent,
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardContent,
    MatSelect,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
    MatOption,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton
  ],
  templateUrl: './dish-list.html',
  styleUrl: './dish-list.css'
})
export class DishList implements OnInit {

  dishes: Dish[] = [];
  searchTerm: string = '';
  sortBy: keyof Dish = 'name';
  ascending: boolean = true;

  constructor(private readonly service: DishesService) {
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

  private compareDishesAscending(a: Dish, b: Dish) : 1 | -1 | 0 {
    if (a[this.sortBy] < b[this.sortBy]) return -1;
    if (a[this.sortBy] > b[this.sortBy]) return 1;
    return 0;
  }

  onAscendingChange() {
    this.ascending = !this.ascending;
    this.onSortChange();
  }
}

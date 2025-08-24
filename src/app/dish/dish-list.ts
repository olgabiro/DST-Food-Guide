import {Component, OnInit} from '@angular/core';
import {Dish, DishesService} from './dishes.service';
import {DishComponent} from './dish';

@Component({
  selector: 'app-dish-list',
  imports: [
    DishComponent
  ],
  templateUrl: './dish-list.html',
  styleUrl: './dish-list.css'
})
export class DishList implements OnInit {

  dishes: Dish[] = [];

  constructor(private readonly service: DishesService) {
  }

  ngOnInit() {
    this.dishes = this.service.getDishes();
  }
}

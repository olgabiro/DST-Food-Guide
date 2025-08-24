import {Component, OnInit} from '@angular/core';
import {Dish, DishesService} from './dishes.service';
import {DishComponent} from './dish';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

@Component({
  selector: 'app-dish-list',
  imports: [
    DishComponent,
    MatGridList,
    MatGridTile
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

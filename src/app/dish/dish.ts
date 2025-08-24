import {Component, input} from '@angular/core';
import {Dish} from './dishes.service';

@Component({
  selector: 'app-dish',
  imports: [],
  templateUrl: './dish.html',
  styleUrl: './dish.css'
})
export class DishComponent {
  dish = input.required<Dish>();

}

import {Component, input} from '@angular/core';
import {cookingStationNames, Dish} from './dish.service';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';

@Component({
  selector: 'app-dish',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './dish.html',
  styleUrl: './dish.css'
})
export class DishComponent {
  dish = input.required<Dish>();
  protected readonly cookingStationNames = cookingStationNames;
}

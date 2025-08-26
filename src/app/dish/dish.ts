import {Component, input} from '@angular/core';
import {Dish} from './dish.service';
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

  cookingStationNames = {
    'crockPot': 'Crock Pot',
    'portableCrockPot': 'Portable Crock Pot',
    'keg': 'Wooden Keg',
    'preservesJar': 'Preserves Jar'
  }
}

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  getDishes(): Dish[] {
    return [
      {
        name: 'Coffee',
        hungerValue: 9.375,
        sanityValue: -10,
        healthValue: 5
      }
    ];
  }
}

export interface Dish {
  name: string;
  hungerValue: number;
  sanityValue: number;
  healthValue: number;
}

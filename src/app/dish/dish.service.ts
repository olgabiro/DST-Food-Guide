import {Injectable} from '@angular/core';
import {GENERAL_DISHES} from './dishes-general';
import {HAMLET_DISHES} from './dishes-hamlet';
import {SHIPWRECKED_DISHES} from './dishes-shipwrecked';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Dish[] {
    return GENERAL_DISHES.concat(HAMLET_DISHES).concat(SHIPWRECKED_DISHES);
  }
}

export interface Dish {
  name: string;
  hungerValue: number;
  sanityValue: number;
  healthValue: number;
  cookingTime?: number;
  requirements?: string;
}

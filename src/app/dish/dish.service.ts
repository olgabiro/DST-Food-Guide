import {Injectable} from '@angular/core';
import {GENERAL_DISHES} from './dishes-general';
import {HAMLET_DISHES} from './dishes-hamlet';
import {SHIPWRECKED_DISHES} from './dishes-shipwrecked';
import {GORGE_DISHES} from './dishes-gorge';
import {KEG_DISHES} from './dishes-keg';
import {PRESERVES_DISHES} from './dishes-preserves';
import {HALLOWED_NIGHTS_DISHES} from './dishes-hallowedNights';
import {WINTER_FEAST_DISHES} from './dishes-winterFeast';
import {ModName} from '../mod-filter/mod-filter';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  dishMapping = {
    'HOF-general': GENERAL_DISHES.concat(KEG_DISHES).concat(PRESERVES_DISHES),
    'HOF-gorge': GORGE_DISHES,
    'HOF-hallowedNights': HALLOWED_NIGHTS_DISHES,
    'HOF-hamlet': HAMLET_DISHES,
    'HOF-shipwrecked': SHIPWRECKED_DISHES,
    'HOF-winterFeast': WINTER_FEAST_DISHES
  }

  getDishes(mods: ModName[] = ["HOF-general"]): Dish[] {
    let dishes: Dish[] = []
    mods.forEach(mod => {
      if (this.dishMapping[mod]) {
        dishes = dishes.concat(this.dishMapping[mod]);
      }
    })
    return dishes;
  }
}

export interface Dish {
  name: string;
  hungerValue: number;
  sanityValue: number;
  healthValue: number;
  cookingTime?: number;
  requirements?: string;
  effects?: string;
  cookingStation: CookingStation;
}

export type CookingStation = "crockPot" | "portableCrockPot" | "keg" | "preservesJar";

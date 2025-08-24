import { Dish } from './dish.service';

export const SHIPWRECKED_DISHES: Dish[] = [
  { name: 'Coffee', hungerValue: 9.375, sanityValue: -10, healthValue: 5, requirements: '3-4 Units of Cooked Coffee Beans and 1 Unit of Dairy, Sweetener or Sugar. Can\'t have Raw Coffee Beans.', effects: 'Speeds the body, warms the body and wards off sleep.' },
  { name: 'Bisque', hungerValue: 18.75, sanityValue: 5, healthValue: 60, requirements: '3 Units of Limpets and 1 Unit of Ice.' },
  { name: 'Jelly-o Pop', hungerValue: 12.5, sanityValue: 0, healthValue: 20, requirements: '1 Unit of Fish, 1 Unit of Ice and 1 Unit of Twigs.', effects: 'Cools the body.' },
  { name: 'Shark Fin Soup', hungerValue: 12.5, sanityValue: -10, healthValue: 40, requirements: '1 Unit of Shark Fin.', effects: 'Increases naughtiness.' },
  { name: 'Caviar', hungerValue: 12.5, sanityValue: 15, healthValue: 3, requirements: '1 Unit of Roe and 1 Unit of Veggie. Can\'t have Sweetener and Dairy.' },
  { name: 'Tropical Bouillabaisse', hungerValue: 37.5, sanityValue: 15, healthValue: 60, requirements: '1 Unit of Fish, 1 Unit of Eel, 1 Unit of Wobster and 1 Unit of Barnacle.', effects: 'Speeds the body. (Configurable) and Cools the body.' },
];

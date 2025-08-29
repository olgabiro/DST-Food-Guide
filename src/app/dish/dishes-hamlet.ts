import { Dish } from './dish.service';

export const HAMLET_DISHES: Dish[] = [
  { name: 'Feijoada', hungerValue: 75, sanityValue: 15, healthValue: 20, requirements: '3 Units of Bean Bugs and 1 Unit of Meat.', cookingStation: "crockPot", image: "feijoada.png" },
  { name: 'Fire Nettle Rolls', hungerValue: 25, sanityValue: -10, healthValue: 20, requirements: '1 Unit of Fire Nettle Fronds. Can\'t have Meat.', effects: 'Warms the body.', cookingStation: "crockPot", image: "nettlelosange.png" },
  { name: 'Gummy Cake', hungerValue: 150, sanityValue: -5, healthValue: -3, requirements: '1 Unit of Gummy Slug and 1 Unit of Sweetener.', cookingStation: "crockPot", image: "gummy_cake.png" },
  { name: 'Hard Shell Tacos', hungerValue: 37.5, sanityValue: 5, healthValue: 20, requirements: '2 Units of Broken Shell and 1 Unit of Veggie.', cookingStation: "crockPot", image: "hardshell_tacos.png" },
  { name: 'Meated Fire Nettle', hungerValue: 37.5, sanityValue: -5, healthValue: 20, requirements: '2 Units of Fire Nettle Fronds and 1 Unit of Meat. Can\'t have more than 1 Unit of Monster Food or Inedible.', effects: 'Warms the body.', cookingStation: "crockPot", image: "" },
  { name: 'Iced Tea', hungerValue: 12.5, sanityValue: 33, healthValue: 25, requirements: '2 Units of Tea Leaves, 1 Unit of Sweetener and 1 Unit of Ice.', effects: 'Cools the body.', cookingStation: "crockPot", image: "icedtea.png" },
  { name: 'Steamed Ham Sandwich', hungerValue: 62.5, sanityValue: 15, healthValue: 30, requirements: '2 Units of Meat, 1 Unit of Foliage and 1 Unit of Veggie.', cookingStation: "crockPot", image: "steamedhamsandwich.png" },
  { name: 'Tea', hungerValue: 12.5, sanityValue: 33, healthValue: 25, requirements: '2 Units of Tea Leaves and 1 Unit of Sweetener. Can\'t have Ice.', effects: 'Warms the body.', cookingStation: "crockPot", image: "tea.png" },
  { name: 'Worm Bone Soup', hungerValue: 80, sanityValue: 20, healthValue: 40, requirements: '2 Units of Worm Bone and 2 Units of Meat.', effects: 'Increased damage to worms.', cookingStation: "crockPot", image: "snakebonesoup.png" },
];

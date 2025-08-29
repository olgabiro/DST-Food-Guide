import { Dish } from './dish.service';

export const HALLOWED_NIGHTS_DISHES: Dish[] = [
  { name: 'Brain Noodles', hungerValue: 32.5, sanityValue: 30, healthValue: 10, requirements: '1 Unit of Flour, 1 Unit of Spot Spice, 1 Unit of Bean Bugs and 1 Unit of Meat.', cookingStation: "crockPot", image: "" },
  { name: 'Burgerzilla', hungerValue: 80, sanityValue: -20, healthValue: -20, requirements: '1 Unit of Bread, 1 Unit of Monster Meat, 1 Unit of Sea Cucumber and 1 Unit of Onion.', cookingStation: "crockPot", image: "" },
  { name: 'Eyebeans', hungerValue: 15, sanityValue: 0, healthValue: 15, requirements: '1 Unit of Royal Jelly, 1 Unit of Sugar and 2 Units of Nightmare Fuel.', effects: 'Decreases sanity over time.', cookingStation: "crockPot", image: "" },
  { name: 'Leifsicle', hungerValue: 12.5, sanityValue: -20, healthValue: 40, requirements: '1 Unit of Living Log, 1 Unit of Sugar, 1 Unit of Ice and 1 Unit of Dairy.', effects: 'Cools the body.', cookingStation: "crockPot", image: "" },
  { name: 'Jack-o\'-Cream', hungerValue: 0, sanityValue: 0, healthValue: 0, requirements: '1 Unit of Pumpkin, 1 Unit of Halved Pineapple, 1 Unit of Pomegranate and 1 Unit of Dairy. Can\'t have Hot Pumpkin.', cookingStation: "crockPot", image: "" },
  { name: 'Tacodile', hungerValue: 50, sanityValue: 10, healthValue: 15, requirements: '1 Unit of Flour, 1 Unit of Spot Spice, 1 Unit of Pepper and 1 Unit of Onion.', effects: 'Warms the body.', cookingStation: "crockPot", image: "" },
  { name: 'Pan de Muerto', hungerValue: 65, sanityValue: -30, healthValue: 40, requirements: '1 Unit of Flour, 1 Unit of Bone Shards, 1 Unit of Sugar and 1 Unit of Butter.', cookingStation: "crockPot", image: "" },
  { name: 'Skull Candy', hungerValue: 15, sanityValue: -15, healthValue: 5, requirements: '2 Units of Sugar, 1 Unit of Bone Shards and 1 Unit of Nightmare Fuel.', effects: 'Gives 2 Units when cooked.', cookingStation: "crockPot", image: "" },
];

import { Routes } from '@angular/router';
import {CompletionHelp} from './completion-help/completion-help';
import {DishList} from './dish/dish-list/dish-list';

export const routes: Routes = [
  { path: '', component: CompletionHelp },
  { path: 'completion', component: CompletionHelp },
  { path: 'dishes', component: DishList },
  { path: 'ingredients', component: DishList }
];

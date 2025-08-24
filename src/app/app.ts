import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DishList} from './dish/dish-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DishList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dst-food-guide');
}

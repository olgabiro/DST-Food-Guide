import {Component} from '@angular/core';
import {DishList} from './dish/dish-list';

@Component({
  selector: 'app-root',
  imports: [DishList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

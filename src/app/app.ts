import {Component} from '@angular/core';
import {DishList} from './dish/dish-list';
import {CompletionHelp} from './completion-help/completion-help';

@Component({
  selector: 'app-root',
  imports: [DishList, CompletionHelp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

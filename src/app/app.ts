import {Component} from '@angular/core';
import {CompletionHelp} from './completion-help/completion-help';

@Component({
  selector: 'app-root',
  imports: [CompletionHelp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

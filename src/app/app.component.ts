import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvailableBooksListComponent } from './available-books-list/available-books-list.component';
import { ReadingListComponent } from './reading-list/reading-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AvailableBooksListComponent, ReadingListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Ub-Reader-Angular';
}

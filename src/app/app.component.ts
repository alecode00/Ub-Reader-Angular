import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './models/book.model';
import { ApiServiceService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  booksList: Book[] = [];
  constructor(private _apiService: ApiServiceService) {}

  title = 'Ub-Reader-Angular';
  ngOnInit(): void {
    this._apiService.getBooks().subscribe((data) => {
      this.booksList = data;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { BooksList } from '../models/book.model';
import { ApiServiceService } from '../services/api-service.service';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-reading-list',
  standalone: true,
  imports: [],
  templateUrl: './reading-list.component.html',
  styleUrl: './reading-list.component.css',
})
export class ReadingListComponent implements OnInit {
  booksList: BooksList = {
    error: '0',
    total: '0',
    books: [],
  };
  constructor(
    private _libraryService: LibraryService,
    private _apiService: ApiServiceService
  ) {}

  handleUncheckBook(bookId: string) {
    console.log('Hola');
  }

  ngOnInit(): void {
    this._apiService.getBooks().subscribe((data) => {
      for (const book of data.books) {
        book.isAdded = false;
      }
      this.booksList = data;
    });
  }
}

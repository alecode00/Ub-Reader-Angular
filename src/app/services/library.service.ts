import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Book, BooksList } from '../models/book.model';
@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private baseURL = 'https://api.itbook.store/1.0/';
  constructor(private _httpClient: HttpClient) {
    this._httpClient
      .get<BooksList>(`${this.baseURL}/search/mongodb`)
      .subscribe((data) => {
        for (const book of data.books) {
          book.isAdded = false;
        }
        console.log(data.books);
        this.booksList.set(data.books);
      });
  }

  booksList = signal<Book[]>([]);
  public getBooksList() {
    return this.booksList();
  }
  public setBooks(newBooks: Book[]) {
    this.booksList.set(newBooks);
  }
}

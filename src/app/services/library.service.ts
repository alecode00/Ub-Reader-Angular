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
        for (const [index, book] of data.books.entries()) {
          book.isAdded = false;
          if (index == 0 || index == 1 || index == 8) {
            book.genre = 'Fantasía';
          }
          if (index == 2 || index == 3) {
            book.genre = 'Ciencia Ficción';
          }
          if (index == 4 || index == 5 || index == 9) {
            book.genre = 'Terror';
          }
          if (index == 6 || index == 7) {
            book.genre = 'Zombies';
          }
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

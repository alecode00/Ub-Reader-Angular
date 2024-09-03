import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Book, BooksList } from '../models/book.model';
@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private baseURL = 'https://api.itbook.store/1.0/';
  private dataLength = 0;

  constructor(private _httpClient: HttpClient) {
    this._httpClient
      .get<BooksList>(`${this.baseURL}/search/mongodb`)
      .subscribe((data) => {
        for (const [index, book] of data.books.entries()) {
          book.isAdded = false;
          if (index == 0 || index == 5 || index == 8) {
            book.genre = 'Base de Datos';
          }
          if (index == 2 || index == 3) {
            book.genre = 'Node Js';
          }
          if (index == 4 || index == 1 || index == 9) {
            book.genre = 'Python';
          }
          if (index == 6 || index == 7) {
            book.genre = 'Angular';
          }
        }
        console.log(data.books);
        this.booksList.set(data.books);
        this.availableBooksCounter.set(data.books.length);
        this.availableBooksForGenreCounter.set(data.books.length);
        this.dataLength = data.books.length;
      });
  }

  booksList = signal<Book[]>([]);
  public getBooksList() {
    return this.booksList();
  }
  public setBooks(newBooks: Book[]) {
    this.booksList.set(newBooks);
  }
  availableBooksCounter = signal<number>(0);
  increaseAvailableBooksCounter() {
    this.availableBooksCounter.update((value) => value + 1);
  }
  decreaseAvailableBooksCounter() {
    this.availableBooksCounter.update((value) => value - 1);
  }
 

  readingListCounter = signal<number>(0);
  increaseReadingListCounter() {
    this.readingListCounter.update((value) => value + 1);
  }
  decreaseReadingListCounter() {
    this.readingListCounter.update((value) => value - 1);
  }

  availableBooksForGenreCounter = signal<number>(0);
  increaseAvailableBooksForGenreCounter() {
    this.availableBooksForGenreCounter.update((value) => value + 1);
  }
  decreaseAvailableBooksForGenreCounter() {
    this.availableBooksForGenreCounter.update((value) => value - 1);
  }
  restartAvailableBooksForGenreCounter() {
    this.availableBooksForGenreCounter.set(0);
  }
}

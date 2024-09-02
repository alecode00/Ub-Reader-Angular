import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Book, BooksList } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private baseURL = 'https://api.itbook.store/1.0/';
  constructor(private _httpClient: HttpClient) {
    this.fetchInitialData();
  }
  fetchInitialData() {
    this._httpClient
      .get<BooksList>(`${this.baseURL}/search/mongodb`)
      .subscribe((data) => {
        for (const book of data.books) {
          book.isAdded = false;
        }
        console.log(data.books);
        this.bookList.set(data.books);
      });
  }
  bookList = signal<Book[] | null>(null);
  count = signal<number>(0);
  vaciar() {
    this.bookList.set([]);
  }
  aumentar() {
    this.count.update((value) => value + 1);
  }
}

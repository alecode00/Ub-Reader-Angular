import { Injectable, OnInit } from '@angular/core';
import { Book, BooksList } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  booksList: BooksList = { error: '0', total: '20', books: [] };
  
  public getBooksList() {
    return this.booksList;
  }
  public setBooks(newBooks: Book[]) {
    this.booksList.books = newBooks;
  }
  public setBooksList(newBooks: BooksList) {
    this.booksList = newBooks;
  }

  constructor() {}
  
}

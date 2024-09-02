import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { LibraryService } from '../services/library.service';
import { BooksList } from '../models/book.model';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-available-books-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './available-books-list.component.html',
  styleUrl: './available-books-list.component.css',
})
export class AvailableBooksListComponent implements OnInit {
  booksList: BooksList = {
    error: '0',
    total: '0',
    books: [],
  };

  constructor(
    private _libraryService: LibraryService,
    private _apiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this._apiService.getBooks().subscribe((data) => {
      for (const book of data.books) {
        book.isAdded = false;
      }
      this.booksList = data;
      this._libraryService.setBooksList(data);
    });
    /* this.booksList = this._libraryService.getBooksList(); */
  }
  handleBookClick(bookId: string) {
    console.log(this.booksList.books.find((book) => book.isbn13 === bookId)?.isAdded);
    console.log(this.booksList.books.find((book) => book.isbn13 === bookId));
    console.log(this.booksList.books.find((book) => book.isbn13 === bookId));
    if (this.booksList.books.find((book) => book.isbn13 === bookId)?.isAdded) {
      console.log('El libro ya está agregado');
      return;
    } else {
      const newBooks = this.booksList.books.map((book) => {
        if (book.isbn13 === bookId) {
          //Al hacer click en un libro se disminuye el contador de libros disponibles
          /*  handleSetAvailableBooksCounter(availableBooksCounter - 1); */
          //Al hacer click en un libro se aumenta el contador de libros en la lista de lectura
          /* handleSetReadingListCounter(readingListCounter + 1); */
          console.log('Se actualizó un libro');
          return {
            ...book,
            isAdded: true,
          };
        } else {
          return {
            ...book,
          };
        }
      });
      this._libraryService.setBooks(newBooks);
      console.log('Se actualizó librería');
    }
  }
}
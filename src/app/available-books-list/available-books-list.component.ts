import { Component, computed, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { LibraryService } from '../services/library.service';
import { Book, BooksList } from '../models/book.model';
import { ApiServiceService } from '../services/api-service.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-available-books-list',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './available-books-list.component.html',
  styleUrl: './available-books-list.component.css',
})
export class AvailableBooksListComponent implements OnInit {
  constructor(private _libraryService: LibraryService) {}

  booksList = computed(() => this._libraryService.booksList());

  ngOnInit(): void {
    console.log(this._libraryService.booksList());
  }

  genre: string = 'No Seleccionado';
  onGenreChange() {
    console.log('Nuevo género seleccionado: ', this.genre);
  }

  handleBookClick(bookId: string) {
    console.log(
      this.booksList().find((book) => book.isbn13 === bookId)?.isAdded
    );
    console.log(this.booksList().find((book) => book.isbn13 === bookId));
    if (this.booksList().find((book) => book.isbn13 === bookId)?.isAdded) {
      console.log('El libro ya está agregado');
      return;
    } else {
      const newBooks = this.booksList().map((book) => {
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

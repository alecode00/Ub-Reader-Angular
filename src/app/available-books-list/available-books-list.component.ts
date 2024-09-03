import { Component, computed, effect, OnInit, runInInjectionContext, signal } from '@angular/core';
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
  constructor(private _libraryService: LibraryService) {
    this.changeEffect = effect(() => {
      console.log('El nuevo genre es: ', this.genre);
    }
  )
  }

  booksList = computed(() => this._libraryService.booksList());

  ngOnInit(): void {
    console.log(this._libraryService.booksList());
  }

  genre: string = 'No Seleccionado';
  onGenreChange() {
    

    this._libraryService.restartAvailableBooksForGenreCounter();

    if (this.genre === 'No Seleccionado') {
      for (const book of this.booksList()) {
        if (!book.isAdded) {
          this._libraryService.increaseAvailableBooksForGenreCounter();
        }
      }
    } else {
      for (const book of this.booksList()) {
        if (book.genre === this.genre && !book.isAdded) {
          this._libraryService.increaseAvailableBooksForGenreCounter();
        }
      }
    }
  }

  changeEffect: any;

  availableBooksCounter = computed(() =>
    this._libraryService.availableBooksCounter()
  );

  readingListCounter = computed(() =>
    this._libraryService.readingListCounter()
  );
  availableBooksForGenreCounter = computed(() =>
    this._libraryService.availableBooksForGenreCounter()
  );

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
          this._libraryService.decreaseAvailableBooksCounter();
          //Al hacer click en un libro se aumenta el contador de libros en la lista de lectura
          this._libraryService.increaseReadingListCounter();
          this._libraryService.decreaseAvailableBooksForGenreCounter();
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

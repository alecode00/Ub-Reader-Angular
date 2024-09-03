import { Component, computed } from '@angular/core';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-reading-list',
  standalone: true,
  imports: [],
  templateUrl: './reading-list.component.html',
  styleUrl: './reading-list.component.css',
})
export class ReadingListComponent {
  booksList = computed(() => this._libraryService.booksList());

  constructor(private _libraryService: LibraryService) {}

  handleUncheckBook(bookId: string) {
    const newBooks = this.booksList().map((book) => {
      if (book.isbn13 === bookId) {
        //Al hacer click en un libro se disminuye el contador de libros disponibles
        /*  handleSetAvailableBooksCounter(availableBooksCounter - 1); */
        //Al hacer click en un libro se aumenta el contador de libros en la lista de lectura
        /* handleSetReadingListCounter(readingListCounter + 1); */
        console.log('Se actualizó un libro');
        return {
          ...book,
          isAdded: false,
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

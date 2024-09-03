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
        this._libraryService.increaseAvailableBooksCounter();
        this._libraryService.decreaseReadingListCounter();
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
  }
}

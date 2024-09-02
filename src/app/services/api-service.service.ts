import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BooksList } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private baseURL = 'https://api.itbook.store/1.0/';
  private _httpClient = inject(HttpClient);
  /* constructor(private _httpClient: HttpClient) {} */

  public getBooks(): Observable<BooksList> {
    return this._httpClient.get<BooksList>(`${this.baseURL}/search/mongodb`);
  }
}

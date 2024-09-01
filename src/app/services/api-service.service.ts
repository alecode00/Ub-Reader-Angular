import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private baseURL = 'https://freetestapi.com/api/v1/books';
  //private _apiClient: HttpClient = Inject(HttpClient);
  constructor(private _httpClient: HttpClient) {}

  public getBooks(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(`${this.baseURL}`);
  }
}

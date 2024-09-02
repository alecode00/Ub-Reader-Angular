import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Book } from '../models/book.model';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './text.component.html',
  styleUrl: './text.component.css',
})
export class TextComponent implements OnInit {
  private _testService = inject(TestService);

  bookList = computed(() => this._testService.bookList());
  count = computed(() => this._testService.count());
  ngOnInit(): void {
    console.log(this._testService.bookList());
  }
  conseguirArreglo() {
    console.log('Hola');
    console.log(this._testService.bookList());
    /* this.bookList = this._testService.bookList(); */
    /* this._testService.getBooks(); */
    /* this.bookList.update((value) => {
      value.push({
        title: 'Hola',
        subtitle: 'Hola2',
        isbn13: '2635827465',
        price: '5',
        image: 'string',
        url: 'string',
        isAdded: false,
      });
    }); */
  }

  cambiarArreglo() {
    this._testService.vaciar();
  }
  aumentar() {
    this._testService.aumentar();
  }
}

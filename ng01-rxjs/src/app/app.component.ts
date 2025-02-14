import { Component } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  firstValueFrom,
  map,
} from 'rxjs';

type Options = Record<string, string>;

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // --------------------------------------------------
  readonly options$ = new BehaviorSubject<Options>({
    r: 'red',
    g: 'green',
    b: 'blue',
  });
  readonly selectedKey$ = new BehaviorSubject<string>('b');
  readonly selectedValue$ = combineLatest([
    this.options$,
    this.selectedKey$,
  ]).pipe(
    debounceTime(0), // debounceTime(0) is a trick to make combineLatest emit immediately
    map(([options, key]) => options[key])
  );

  switchOptions() {
    if (this.selectedKey$.value == 'b') {
      this.options$.next({ m: 'magenta', y: 'yellow', c: 'cyan' });
      this.selectedKey$.next('y');
    } else {
      this.options$.next({
        r: 'red',
        g: 'green',
        b: 'blue',
      });
      this.selectedKey$.next('b');
    }
  }
  // --------------------------------------------------

  readonly a$ = new BehaviorSubject<number>(1);
  readonly b$ = new BehaviorSubject<number>(2);

  readonly sum$ = combineLatest([this.a$, this.b$]).pipe(
    map(([a, b]) => a + b)
  );

  async incrementA() {
    const sum = await firstValueFrom(this.sum$);
    // BAD => can cause race conditions
    if (sum < 10) {
      this.a$.next(this.a$.value + 1);
    }
  }
  // --------------------------------------------------

  constructor() {
    this.selectedValue$.subscribe(console.log);
  }
}

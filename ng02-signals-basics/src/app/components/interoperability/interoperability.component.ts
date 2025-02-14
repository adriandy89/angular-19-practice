import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ApiService } from './api.service';

@Component({
  selector: 'app-interoperability',
  imports: [],
  templateUrl: './interoperability.component.html',
  styleUrl: './interoperability.component.css',
})
export class InteroperabilityComponent {
  readonly number = signal(10);
  readonly number$ = toObservable(this.number);

  readonly results$ = this.number$.pipe(
    switchMap((n) => this.api.getPrimeFactors(n))
  );

  readonly api = inject(ApiService);

  readonly primeFactors = toSignal(this.results$, { initialValue: [] });

  increase() {
    this.number.update((n) => n + 1);
  }

  decrease() {
    this.number.update((n) => Math.max(n - 1, 3));
  }

  constructor() {
    this.number$.subscribe((n) => {
      console.log('Number changed to', n);
    });
  }
}

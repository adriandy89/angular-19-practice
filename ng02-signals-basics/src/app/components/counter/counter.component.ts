import { Component, DestroyRef, inject } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  readonly destroyRef = inject(DestroyRef);
  constructor() {
    // or: private destroyRef: DestroyRef
    const sub = interval(1000).subscribe((value) => {
      console.log('Counter: ', value);
    });
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}

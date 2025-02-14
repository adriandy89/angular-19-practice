import { Component, computed, effect, signal } from '@angular/core';
import { CounterComponent } from './components/counter/counter.component';
import { Counter2Component } from './components/counter2/counter2.component';
import { InteroperabilityComponent } from './components/interoperability/interoperability.component';
import { ImmutabilityComponent } from './components/immutability/immutability.component';

@Component({
  selector: 'app-root',
  imports: [
    CounterComponent,
    Counter2Component,
    InteroperabilityComponent,
    ImmutabilityComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly firstSignal = signal(10);
  readonly secondSignal = signal('String Signal');
  readonly computedSignal = computed(
    () => this.firstSignal() + ' ' + this.secondSignal()
  );
  readonly showContent = signal(true);
  readonly showContent2 = signal(true);

  readonly isLarge = computed(() => this.firstSignal() > 11);

  constructor() {
    effect(() => {
      if (this.firstSignal() > 11) {
        console.log('My First Signal: ', this.firstSignal());
        console.log('My Second Signal: ', this.secondSignal());
      }
      console.log('Is Large: ', this.isLarge());
    });
  }

  increment() {
    // this.firstSignal.set(this.firstSignal() + 1);
    this.firstSignal.update((value) => value + 1);
  }

  toggleContent() {
    this.showContent.update((value) => !value);
  }

  toggleContent2() {
    this.showContent2.update((value) => !value);
  }
}

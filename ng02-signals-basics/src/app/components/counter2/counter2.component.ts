import {
  Component,
  effect,
  EffectRef,
  inject,
  Injector,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-counter2',
  imports: [],
  templateUrl: './counter2.component.html',
  styleUrl: './counter2.component.css',
})
export class Counter2Component {
  readonly value = signal(0);

  readonly injector = inject(Injector);
  effectRef: EffectRef | null = null;

  constructor() {
    setInterval(() => {
      this.value.update((value) => value + 1);
    }, 1000);
  }

  startEffect() {
    if (this.effectRef) {
      return;
    }
    this.effectRef = effect(
      () => {
        console.log('Counter 2 Value: ', this.value());
      },
      { injector: this.injector }
    );
  }

  stopEffect() {
    if (this.effectRef) {
      this.effectRef?.destroy();
      this.effectRef = null;
    }
  }
}

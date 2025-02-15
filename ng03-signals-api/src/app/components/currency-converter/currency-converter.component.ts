import {
  Component,
  computed,
  effect,
  EffectRef,
  inject,
  Injector,
  input,
  output,
  viewChild,
} from '@angular/core';
import { RATES } from './rates';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-currency-converter',
  imports: [CurrencyPipe],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css',
})
export class CurrencyConverterComponent {
  readonly injector = inject(Injector);

  readonly refreshRequired = output<void>();
  effectRef: EffectRef | null = null;

  readonly amount = input.required<number>();
  readonly currency = input.required<string>();

  readonly rate = computed(() => RATES[this.currency()]);
  readonly convertedAmount = computed(() => this.amount() * this.rate());

  refresh() {
    this.refreshRequired.emit();
  }

  start() {
    if (this.effectRef) return;
    this.effectRef = effect(
      () => {
        console.log('Amount:', this.amount());
      },
      { injector: this.injector }
    );
  }

  stop() {
    if (!this.effectRef) return;
    this.effectRef?.destroy();
    this.effectRef = null;
  }
}

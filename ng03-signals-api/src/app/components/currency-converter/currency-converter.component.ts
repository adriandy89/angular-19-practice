import { Component, computed, input, output } from '@angular/core';
import { RATES } from './rates';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-currency-converter',
  imports: [CurrencyPipe],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css',
})
export class CurrencyConverterComponent {
  readonly refreshRequired = output<void>();

  readonly amount = input.required<number>();
  readonly currency = input.required<string>();

  readonly rate = computed(() => RATES[this.currency()]);
  readonly convertedAmount = computed(() => this.amount() * this.rate());

  refresh() {
    this.refreshRequired.emit();
  }
}

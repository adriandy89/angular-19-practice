import { Component } from '@angular/core';
import { RATES } from './components/currency-converter/rates';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CurrencyConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly currencies = Object.keys(RATES);

  amount = new FormControl(50);
  currency = new FormControl('USD');

  refresh() {
    this.amount.reset(50);
    this.currency.reset('USD');
    console.log('Refreshed!');
  }
}

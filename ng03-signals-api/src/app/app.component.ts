import {
  Component,
  ElementRef,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { RATES } from './components/currency-converter/rates';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { OptionSelectorComponent } from './components/option-selector/option-selector.component';
import { OptionDirective } from './components/option-selector/option.directive';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    CurrencyConverterComponent,
    OptionSelectorComponent,
    OptionDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // currencyConverterChild = viewChild.required(CurrencyConverterComponent); // for one
  currenciesConvertersChildren = viewChildren(CurrencyConverterComponent);
  divRefChild = viewChild.required('refDiv', {
    read: ElementRef,
  });
  // revRefChild = viewChild.required('refDiv', { read: ViewContainerRef });

  readonly currencies = Object.keys(RATES);

  amount = new FormControl(50);
  currency = signal('USD');

  refresh() {
    this.amount.reset(50);
    this.currency.set('USD');
    this.divRefChild().nativeElement.style.backgroundColor = '';
    console.log('Refreshed!');
  }

  startRefEffect() {
    // this.currencyConverterChild().start(); // for one
    this.currenciesConvertersChildren().forEach((child) => child.start());
  }
  stopRefEffect() {
    // this.currencyConverterChild().stop(); // for one
    this.currenciesConvertersChildren().forEach((child) => child.stop());
  }

  testDivRef() {
    this.divRefChild().nativeElement.style.backgroundColor = 'red';
    console.log('Div Ref:', this.divRefChild().nativeElement);
  }
}

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
import { InputManagerComponent } from './components/input-manager/input-manager.component';
import { ManagedInputDirective } from './components/input-manager/managed-input.directive';
import { RgbDirective } from './directives/rgb.directive';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    CurrencyConverterComponent,
    OptionSelectorComponent,
    OptionDirective,
    InputManagerComponent,
    ManagedInputDirective,
    RgbDirective,
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

  // EXERCISE:
  // add a proper view query (hint, use the # reference string)
  txtInputRef = viewChild.required('txtInput', {
    read: ElementRef,
  });

  onSelect() {
    // use the view query to select the input
    // hint, use the 'select' method on the native element
    this.txtInputRef().nativeElement.select();
  }
}
